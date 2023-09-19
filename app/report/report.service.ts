import { ReportModel } from './report.model'
import { ConstantsCommon } from '~/common/constants'
import { IListQuery } from '~/common/core/IListQuery'
import { TableName } from '~/common/enums'
import { supabase } from '~/common/utils/supabase'
// import { formatDateTime } from '~/common/utils/helper'

const ReportService = {
  /**
   * Get all users
   * @returns
   */
  async all({
    page = 1,
    limit = ConstantsCommon.RECORD_PER_PAGE,
    filters,
  }: IListQuery): Promise<{
    data: ReportModel[]
    count: number
  }> {
    const rangeFrom = (page - 1) * limit
    const rangeTo = page * limit - 1

    console.log(filters)

    const qb = supabase
      .from(TableName.FinanceReports)
      .select('*', {
        count: 'exact',
      })
      .ilike('edinet_code', `%${filters?.filtersByCompany}%`)

    if (page) {
      qb.range(rangeFrom, rangeTo)
    }

    // if (filters?.search) {

    // }

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

    // if (sort) {
    //   const { column, option } = sort

    //   qb.order(column, { ascending: option })
    // }

    const { data, count, error } = await qb.returns<ReportModel[]>()

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
   * Get all industry of company
   * @returns
   */
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
  // async getAllReport(id: string) {
  //   const { data, error } = await supabase
  //     .from(TableName.FinanceReports)
  //     .select('*', {
  //       count: 'exact',
  //     })
  //     .ilike('edinet_code', `%${id}%`)

  //   if (error || !data) {
  //     console.log('CompanyService.getAllReport', error)
  //     throw error
  //   }

  //   return data
  // },

  /**
   * Find one report by id
   * @param name
   * @returns
   */
  async findOne(id: string) {
    const { data, error } = await supabase
      .from(TableName.FinanceReports)
      .select('*')
      .ilike('edinet_code', `%${id}%`)
      .order('date_time_submit', { ascending: false })
      .limit(1)

    console.log('data tra ve', data)

    if (error || !data) {
      console.log('ReportService.findOne', error)
      throw error
    }

    // return data
  },
  /**
   * Create a new user
   * @param user
   * @returns
   */
  create() {
    return new ReportModel()
  },

  /**
   * Update a user
   * @param id
   * @param user
   * @returns
   */
  update() {
    return new ReportModel()
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

export default ReportService
