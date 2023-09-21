import { ReportModel } from './report.model'
import { $axios } from '~/common/utils/axios'
import { IListQuery } from '~/common/core/IListQuery'

const ReportService = {
  /**
   * Get all reports
   * @returns
   */
  async all({ page = 1 }: IListQuery): Promise<{
    data: ReportModel[]
    // count: number
  }> {
    const {
      data: { data, error },
    } = await $axios.get('/companies')

    if (error) {
      console.log('UserService.all', error)
      throw error
    }

    return {
      data: data || [],
      // count: count || 0,
    }
  },

  /**
   * Find one report by id
   * @param name
   * @returns
   */

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
