import { NoticeModel } from './notice.model'
import { UpdateNoticeDto } from './dto/update-notice.dto'
import { ConstantsCommon } from '~/common/constants'
import { IListQuery } from '~/common/core/IListQuery'
import { TableName } from '~/common/enums'
import { $axios } from '~/common/utils/axios'
import { supabase } from '~/common/utils/supabase'

const prefix = '/notices'

const NoticeService = {
  /**
   * Get all notices
   * @returns
   */
  async all({
    page = 1,
    limit = ConstantsCommon.RECORD_PER_PAGE,
    filters,
    sort,
  }: IListQuery): Promise<{
    data: NoticeModel[]
    count: number
  }> {
    const rangeFrom = (page - 1) * limit
    const rangeTo = page * limit - 1

    const qb = supabase.from(TableName.Notice).select('*', {
      count: 'exact',
    })

    if (page) {
      qb.range(rangeFrom, rangeTo)
    }

    if (filters?.search) {
      qb.ilike('content_en', `%${filters.search}%`)
    }

    if (sort) {
      const { column, option } = sort

      qb.order(column, { ascending: option })
    }

    const { data, count, error } = await qb.returns<NoticeModel[]>()

    if (error) {
      console.log('NoticeService.all', error)
      throw error
    }

    return {
      data: data || [],
      count: count || 0,
    }
  },

  /**
   * Find one notice by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    const { data, error } = await supabase
      .from(TableName.Notice)
      .select('*')
      .eq('id', id)
      .single<NoticeModel>()

    if (error || !data) {
      console.log('NoticeService.findOne', error)
      throw error
    }

    return data
  },

  /**
   * Create a new notice
   * @param notice
   * @returns
   */
  async create(notice: UpdateNoticeDto) {
    const {
      data: { data, error },
    } = await $axios.post(prefix, notice)

    if (error) {
      console.log('NoticeService.update', error)
      throw error
    }

    return data
  },

  /**
   * Update a notice
   * @param id
   * @param notice
   * @returns
   */
  async update(id: string, notice: UpdateNoticeDto) {
    const {
      data: { data, error },
    } = await $axios.put(`${prefix}/${id}`, notice)

    if (error) {
      console.log('NoticeService.update', error)
      throw error
    }

    return data
  },

  /**
   * Delete a notice
   * @param id
   * @returns
   */
  async delete(id: string) {
    const {
      data: { data, error },
    } = await $axios.delete(`${prefix}/${id}`)

    if (error) {
      console.log('NoticeService.delete', error)
      throw error
    }

    return data
  },
}

export default NoticeService
