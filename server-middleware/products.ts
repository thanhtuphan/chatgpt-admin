import { Express } from 'express'
import { SupabaseClient } from '@supabase/supabase-js'
import { authGuard } from './common/helper'

interface UpdateProductMedia {
  id?: string
  media_url: string
  media_type: 'image/jpg' | 'image/png' | 'video/mp4'
  is_removed?: boolean
}

export const initProducts = (
  app: Express,
  supabase: SupabaseClient<any, 'public', any>
) => {
  /**
   * Handle remove product
   */
  app.delete('/products/:id', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )

    const productId = req.params.id

    const { data } = await supabase
      .from('ProductMedia')
      .select('media_url')
      .eq('product_id', productId)
      .returns<Array<{ media_url: string }>>()

    if (data) {
      const removeIds = data.map((item) =>
        item.media_url.replace(/^.*\/products\/(.*$)/g, '$1')
      )

      await supabase.storage.from('products').remove(removeIds)
    }

    const resDelete = await supabase
      .from('Products')
      .delete()
      .eq('id', productId)

    res.json(resDelete)
  })

  /**
   * Handle update product
   */
  app.put('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id
      const product = req.body

      const productMedia = product.product_media

      const newFiles = productMedia.filter(
        (item: UpdateProductMedia) => !item.id
      )

      newFiles
        .map((item: UpdateProductMedia) =>
          item.media_url.replace(/^.*\/products\/tmp\/(.*$)/g, '$1')
        )
        .forEach(async (item: string) => {
          const { error: moveError } = await supabase.storage
            .from('products')
            .move(`tmp/${item}`, `${item}`)

          if (moveError) {
            throw moveError
          }
        })

      const removedFiles = productMedia.filter(
        (item: UpdateProductMedia) => item.is_removed
      )

      if (removedFiles.length > 0) {
        const { error: removeError } = await supabase.storage
          .from('products')
          .remove(
            removedFiles.map((item: UpdateProductMedia) =>
              item.media_url.replace(/^.*\/products\/(.*$)/g, '$1')
            )
          )

        if (removeError) {
          throw removeError
        }
      }

      const oldFilesIds = removedFiles.map(
        (item: UpdateProductMedia) => item.id
      )

      const promises = [
        supabase
          .from('Products')
          .update({
            title: product.title,
            tags: product.tags,
            description: product.description,
            stock: product.stock,
            stock_remain: product.stock_remain,
            price: product.price,
            price_unit: product.price_unit,
            updated_at: new Date().toISOString(),
          })
          .eq('id', productId),

        supabase.from('ProductMedia').insert(
          newFiles.map((item: UpdateProductMedia) => ({
            product_id: productId,
            media_url: item.media_url.replace('/tmp', ''),
            media_type: item.media_type,
          }))
        ),
      ]

      if (oldFilesIds.length > 0) {
        promises.push(
          supabase.from('ProductMedia').delete().in('id', oldFilesIds)
        )
      }

      // Update Product
      await Promise.all(promises)

      res.send({ message: 'success' })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}
