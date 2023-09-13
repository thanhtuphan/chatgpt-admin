<template>
  <div class="admin-create-page">
    <the-container size="sm">
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-form-item :label="$t('common.fields.email')" prop="email">
          <el-input
            v-model="form.email"
            :placeholder="$t('common.fields.email')"
          />
        </el-form-item>
        <el-form-item :label="$t('common.fields.password')" prop="password">
          <el-input
            v-model="form.password"
            :placeholder="$t('common.fields.password')"
            type="password"
          />
        </el-form-item>
        <el-form-item :label="$t('common.fields.role')" prop="role">
          <el-select v-model="form.role">
            <el-option :label="Enums.Role.Admin" :value="Enums.Role.Admin" />
            <el-option
              :label="Enums.Role.SuperAdmin"
              :value="Enums.Role.SuperAdmin"
            />
          </el-select>
        </el-form-item>

        <div class="tw-text-center">
          <el-button :loading="loading" type="info" @click="onSubmit">{{
            $t('common.actions.create')
          }}</el-button>
        </div>
      </el-form>
    </the-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import AdminUserService from '~/app/admin-user/admin-user.service'
import { CreateAdminUserDto } from '~/app/admin-user/dto/create-admin-user.dto'
import { Role } from '~/common/enums'

interface DataProps {
  form: {
    email: string
    password: string
    role: Role
  }
  rules: Record<string, any>
  loading: boolean
}

export default Vue.extend({
  name: 'AdminCreatePage',

  middleware: ['super-admin'],

  data(): DataProps {
    return {
      form: {
        email: '',
        password: '',
        role: this.Enums.Role.Admin,
      },

      rules: {
        email: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.email').toString(),
          }),
          this.Utils.Validate.email(),
        ],

        password: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.password').toString(),
          }),
        ],
      },

      loading: false,
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('adminCreatePage.title').toString(),
    }
  },

  methods: {
    async onSubmit() {
      const refForm = this.$refs.form as any

      try {
        await refForm.validate()
        this.loading = true
        await AdminUserService.create(
          new CreateAdminUserDto({
            email: this.form.email,
            password: this.form.password,
            role: this.form.role,
          })
        )

        this.$router.push(this.RoutePage.ADMIN)
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/admin/create/index.scss';
</style>
