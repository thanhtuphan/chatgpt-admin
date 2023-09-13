import { UserModel } from './user.model'
import { ConstantsCommon } from '~/common/constants'
import { IListQuery } from '~/common/core/IListQuery'
import { TableName, SocialProvider } from '~/common/enums'
import { supabase } from '~/common/utils/supabase'
import { formatDateTime } from '~/common/utils/helper'

const UserService = {
  /**
   * Get all users
   * @returns
   */
  async all({
    page = 1,
    limit = ConstantsCommon.RECORD_PER_PAGE,
    sort,
    filters,
  }: IListQuery): Promise<{
    data: UserModel[]
    count: number
  }> {
    const rangeFrom = (page - 1) * limit
    const rangeTo = page * limit - 1

    const qb = supabase.from(TableName.Profile).select('*', {
      count: 'exact',
    })

    if (page) {
      qb.range(rangeFrom, rangeTo)
    }

    if (filters?.search) {
      qb.ilike('user_name', `%${filters.search}%`)
    }

    if (filters?.valueSelected?.length) {
      filters.valueSelected.forEach((item: string) => {
        switch (item) {
          case SocialProvider.Facebook:
            qb.neq('facebook_id', '')
            break

          case SocialProvider.Instagram:
            qb.neq('instagram_id', '')
            break

          case SocialProvider.Twitter:
            qb.neq('twitter_id', '')
            break

          default:
            break
        }
      })
    }

    if (filters?.valueSelectedCountry?.length) {
      qb.in('country', filters.valueSelectedCountry)
    }

    if (filters?.valueDatePicker?.length) {
      qb.filter(
        'created_at',
        'gte',
        formatDateTime(filters.valueDatePicker[0])
      ).filter('created_at', 'lte', formatDateTime(filters.valueDatePicker[1]))
    }

    if (sort) {
      const { column, option } = sort

      qb.order(column, { ascending: option })
    }

    const { data, count, error } = await qb.returns<UserModel[]>()

    if (error) {
      console.log('UserService.all', error)
      throw error
    }

    return {
      data: data || [],
      count: count || 0,
    }
  },

  /**
   * Get all country of user
   * @returns
   */
  async getAllCountry() {
    const { data, error } = await supabase
      .from(TableName.Profile)
      .select('country')
      .order('country')

    if (error || !data) {
      console.log('UserService.getAllCountry', error)
      throw error
    }

    return data
  },

  /**
   * Create a new user
   * @param user
   * @returns
   */
  create() {
    return new UserModel()
  },

  /**
   * Update a user
   * @param id
   * @param user
   * @returns
   */
  update() {
    return new UserModel()
  },

  /**
   * Delete a user
   * @param id
   * @returns
   */
  delete() {
    return true
  },
}

export default UserService
