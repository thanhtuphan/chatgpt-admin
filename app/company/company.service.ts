import { CompanyModel } from './company.model'
import { $axios } from '~/common/utils/axios'
import { IListQuery } from '~/common/core/IListQuery'
const CompanyService = {
  /**
   * Get all companies
   * @returns
   */
  async all({ page = 1, filters, sort }: IListQuery): Promise<{
    data: CompanyModel[]
    total: number
  }> {
    console.log('filters', filters?.valueSelected)
    console.log('sort', sort)

    const {
      data: { data, error, total },
    } = await $axios.get('/companies', {
      params: {
        search: filters?.search,
        industry: '',
        sorted: sort?.sorted,
        sortType: sort?.sortType,
      },
    })

    if (error) {
      console.log('CompanyService.all', error)
      throw error
    }

    return {
      data: data || [],
      total: total || 0,
    }
  },

  /**
   * get all industries
   * @param
   * @returns
   */
  async getAllIndustries() {
    const {
      data: { data, error },
    } = await $axios.get('/get-industry')

    if (error) {
      console.log('CompanyService.all', error)
      throw error
    }

    return {
      data: data || [],
    }
  },

  /**
   * Create a new company
   * @param user
   * @returns
   */
  create() {
    return new CompanyModel()
  },

  /**
   * Update a company
   * @param id
   * @param user
   * @returns
   */
  update() {
    return new CompanyModel()
  },

  /**
   * Delete a company
   * @param id
   * @returns
   */
  delete() {
    return true
  },
}

export default CompanyService
