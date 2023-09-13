import { SupabaseClient } from '@supabase/supabase-js'
import { Express } from 'express'
import { v4 as uuid } from 'uuid'
import { UploadedFile } from 'express-fileupload'
import { authGuard } from './common/helper'

export const initStorage = (
  app: Express,
  supabase: SupabaseClient<any, 'public', any>
) => {
  app.post('/storage/upload/product', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )

    if (!req.files || !req.files.file) {
      return res.status(400).send('No files were uploaded.')
    }

    const file = req.files.file as UploadedFile

    console.log(file.data)

    const fileId = uuid()
    const { error } = await supabase.storage
      .from('products/tmp')
      .upload(fileId, file.data, {
        upsert: true,
        contentType: file.mimetype,
      })

    if (error) {
      console.log(error)

      return res.status(400).send(error.message)
    }

    const { data } = supabase.storage.from('products/tmp').getPublicUrl(fileId)

    res.json({
      url: data.publicUrl,
      status: 'success',
      name: file.mimetype,
    })
  })
}
