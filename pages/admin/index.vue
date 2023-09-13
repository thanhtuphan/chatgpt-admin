<template>
  <div class="admin-page">
    <the-table v-loading="loading" :data="data" @submit-form="handleSubmit">
      <template #toolbar-action>
        <el-button
          v-if="isSuperAdmin"
          class="tw-ml-auto"
          type="info"
          size="small"
          @click="onCreateUser"
        >
          {{ $t('common.actions.createUser') }}
        </el-button>
      </template>

      <el-table-column
        :label="$t('adminPage.content.email')"
        min-width="200"
        prop="email"
      />

      <el-table-column :label="$t('adminPage.content.role')" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.raw_app_meta_data.role }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('adminPage.content.lastSignInAt')"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.last_sign_in_at | datetime }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('common.fields.createdAt')" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.created_at | datetime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.fields.updatedAt')" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.updated_at | datetime }}
        </template>
      </el-table-column>

      <el-table-column
        v-if="user?.app_metadata?.role === Enums.Role.SuperAdmin"
        fixed="right"
        :label="$t('common.table.action')"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.id !== user?.id"
            type="danger"
            size="small"
            @click="
              onToggleActive(
                scope.row.id,
                !(scope.row.raw_app_meta_data.is_disabled === 'true')
              )
            "
            >{{
              scope.row.raw_app_meta_data.is_disabled === 'true'
                ? $t('common.actions.active')
                : $t('common.actions.deactive')
            }}</el-button
          >
        </template>
      </el-table-column>
    </the-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { AdminUserModel } from '~/app/admin-user/admin-user.model'
import AdminUserService from '~/app/admin-user/admin-user.service'
import { UserModel } from '~/app/user/user.model'

interface FilterProps {
  search: string
}

interface DataProps {
  data: Array<AdminUserModel>
  loading: boolean
  search: string
  selected: Array<AdminUserModel>
  isSuperAdmin: boolean
  filters: FilterProps
}

export default Vue.extend({
  name: 'AdminPage',

  data(): DataProps {
    return {
      data: [],
      loading: false,
      search: '',

      selected: [],
      isSuperAdmin: false,
      filters: {
        search: '',
      },
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('adminPage.title').toString(),
    }
  },

  computed: {
    user(): UserModel | null {
      return this.$store.state.auth.user
    },
  },

  watch: {
    user: {
      handler(val) {
        if (val) {
          this.isSuperAdmin =
            val.app_metadata.role === this.Enums.Role.SuperAdmin
        }
      },

      immediate: true,
    },
  },

  created() {
    this.onFetch()
  },

  methods: {
    async onFetch() {
      try {
        this.loading = true
        const { data } = await AdminUserService.all({ filters: this.filters })

        this.data = data
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async onToggleActive(id: string, status: boolean) {
      try {
        this.loading = true

        await AdminUserService.toggleActive(id, status)
        this.onFetch()
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    onCreateUser() {
      this.$router.push(this.RoutePage.ADMIN_CREATE)
    },

    handleSubmit(value: string) {
      this.filters.search = value
      this.onFetch()
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/admin/index.scss';
</style>
