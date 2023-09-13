import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { IListQuery } from '~/common/core/IListQuery'
import { $axios } from '~/common/utils/axios'
import { supabase } from '~/common/utils/supabase'

const prefix = '/admin-users'

const AdminUserService = {
  /**
   *
   * @returns
   */
  async all({ filters }: IListQuery) {
    const { data, error } = await supabase.rpc('get_admin_users', {
      search: filters?.search,
    })

    if (error) {
      console.log('AdminUserService.all', error)
      throw error
    }

    return {
      data: data || [],
    }
  },

  async create(payload: CreateAdminUserDto) {
    const {
      data: { data, error },
    } = await $axios.post(`${prefix}`, payload.toForm())

    if (error) {
      console.log('AdminUserService.create', error)
      throw error
    }

    return {
      data,
    }
  },

  async toggleActive(userId: string, status: boolean) {
    const {
      data: { data, error },
    } = await $axios.post(`${prefix}/toggle-active`, {
      userId,
      status,
    })

    if (error) {
      console.log('AdminUserService.toggleActive', error)
      throw error
    }

    return {
      data,
    }
  },
}

export default AdminUserService
