import { CompanyModel } from './company.model'
import { ConstantsCommon } from '~/common/constants'
import { IListQuery } from '~/common/core/IListQuery'
import { TableName } from '~/common/enums'
import { supabase } from '~/common/utils/supabase'
// import { formatDateTime } from '~/common/utils/helper'

const CompanyService = {
  /**
   * Get all users
   * @returns
   */
  async all({
    page = 1,
    limit = ConstantsCommon.RECORD_PER_PAGE,
    filters,
    sort,
  }: IListQuery): Promise<{
    data: CompanyModel[]
    count: number
  }> {
    const rangeFrom = (page - 1) * limit
    const rangeTo = page * limit - 1

    const qb = supabase.from(TableName.Companies).select('*', {
      count: 'exact',
    })

    console.log(sort)

    if (filters?.filtersByCompany) {
      qb.ilike('edinet_code', `%${filters?.filtersByCompany}%`)
    }

    if (page) {
      console.log(page)

      qb.range(rangeFrom, rangeTo)
    }

    if (filters?.search) {
      qb.or(
        `or(proposer_name.ilike.%${filters?.search}%,proposer_name_english.ilike.%${filters?.search}%),and(proposer_name.ilike.%${filters?.search}%,proposer_name_english.ilike.%${filters?.search}%)`
      )
    }

    // if (filters?.valueSelected?.length) {
    //   filters.valueSelected.forEach((item: string) => {
    //     switch (item) {
    //       case SocialProvider.Facebook:
    //         qb.neq('facebook_id', '')
    //         break

    //       case SocialProvider.Instagram:
    //         qb.neq('instagram_id', '')
    //         break

    //       case SocialProvider.Twitter:
    //         qb.neq('twitter_id', '')
    //         break

    //       default:
    //         break
    //     }
    //   })
    // }

    // if (filters?.valueSelectedCountry?.length) {
    //   qb.in('country', filters.valueSelectedCountry)
    // }

    // if (filters?.valueDatePicker?.length) {
    //   qb.filter(
    //     'created_at',
    //     'gte',
    //     formatDateTime(filters.valueDatePicker[0])
    //   ).filter('created_at', 'lte', formatDateTime(filters.valueDatePicker[1]))
    // }

    if (sort) {
      const { column, option } = sort

      qb.order(column, { ascending: option })
    }

    const { data, count, error } = await qb.returns<CompanyModel[]>()

    if (error) {
      console.log('UserService.all', error)
      throw error
    }

    return {
      data: data || [],
      count: count || 0,
    }
  },

  // /**
  //  * Get all industry of company
  //  * @returns
  //  */
  // async getAllIndustry() {
  //   const { data, error } = await supabase
  //     .from(TableName.Companies)
  //     .select('submitter_industry')
  //     .order('submitter_industry')

  //   if (error || !data) {
  //     console.log('CompanyService.getAllIndustry', error)
  //     throw error
  //   }

  //   return data
  // },

  /**
   * Get all report of company
   * @returns
   */
  async getAllReport(id: string) {
    const { data, error } = await supabase
      .from(TableName.FinanceReports)
      .select('*', {
        count: 'exact',
      })
      .ilike('edinet_code', `%${id}%`)

    if (error || !data) {
      console.log('CompanyService.getAllReport', error)
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
    return new CompanyModel()
  },

  /**
   * Update a user
   * @param id
   * @param user
   * @returns
   */
  update() {
    return new CompanyModel()
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

export default CompanyService
