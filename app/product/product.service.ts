import { ProductModel } from './product.model'
import { UpdateProductDto } from './dto/update-product.dto'
import { IListQuery } from '~/common/core/IListQuery'
import { TableName } from '~/common/enums'
import { $axios } from '~/common/utils/axios'
import { supabase } from '~/common/utils/supabase'
import { ConstantsCommon } from '~/common/constants'

const prefix = '/products'

const ProductService = {
  /**
   * Get all products
   * @returns
   */
  async all({
    page = 1,
    limit = ConstantsCommon.RECORD_PER_PAGE,
    sort,
    filters,
  }: IListQuery): Promise<{
    data: ProductModel[]
    count: number
  }> {
    const rangeFrom = (page - 1) * limit
    const rangeTo = page * limit - 1

    const qb = supabase
      .from(TableName.Products)
      .select(
        `*,product_media:${TableName.ProductMedia}(*),user:${TableName.Profile}(user_name)`,
        {
          count: 'exact',
        }
      )

    if (filters?.search) {
      qb.ilike('title', `%${filters.search}%`)
    }

    if (sort) {
      const { column, option } = sort

      qb.order(column, { ascending: option })
    }

    if (filters?.filtersByUser) {
      qb.eq('user_id', filters?.filtersByUser)
    }

    if (page) {
      qb.range(rangeFrom, rangeTo)
    }
    const { data, count, error } = await qb.returns<ProductModel[]>()

    if (error) {
      console.log('ProductService.all', error)
      throw error
    }

    return {
      data: data || [],
      count: count || 0,
    }
  },

  /**
   * Find one product by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    const { data, error } = await supabase
      .from(TableName.Products)
      .select(`*,product_media:${TableName.ProductMedia}(*)`)
      .eq('id', id)
      .single<ProductModel>()

    if (error || !data) {
      console.log('ProductService.findOne', error)
      throw error
    }

    return data
  },

  /**
   * Create a new product
   * @param product
   * @returns
   */
  create() {
    return new ProductModel()
  },

  /**
   * Update a product
   * @param id
   * @param product
   * @returns
   */
  async update(id: string, product: UpdateProductDto) {
    const {
      data: { data, error },
    } = await $axios.put(`${prefix}/${id}`, product)

    if (error) {
      console.log('ProductService.update', error)
      throw error
    }

    return data
  },

  /**
   * Delete a product
   * @param id
   * @returns
   */
  async delete(id: string) {
    const {
      data: { data, error },
    } = await $axios.delete(`${prefix}/${id}`)

    console.log(data, error)

    if (error) {
      console.log('ProductService.delete', error)
      throw error
    }

    return data
  },
}

export default ProductService
