<template>
  <the-container size="sm">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item :label="$t('common.fields.content')" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="6"
          :maxlength="2000"
          show-word-limit
        />
      </el-form-item>
      <div class="tw-text-center">
        <el-button :loading="loading" type="info" @click="onSubmit">{{
          $t('common.actions.add')
        }}</el-button>
      </div>
    </el-form>
  </the-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { UpdateNoticeDto } from '~/app/notice/dto/update-notice.dto'
import NoticeService from '~/app/notice/notice.service'

interface DataProps {
  loading: boolean
  form: {
    content: string
  }
  rules: any
}

export default Vue.extend({
  name: 'NoticesDetailEditPage',

  data(): DataProps {
    return {
      loading: false,
      form: {
        content: '',
      },

      rules: {
        content: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.content').toString(),
          }),
        ],
      },
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('noticesCreatePage.title').toString(),
    }
  },

  methods: {
    async onSubmit() {
      const refForm = this.$refs.form as any

      try {
        await refForm.validate()

        this.loading = true

        const payload = new UpdateNoticeDto({
          content: this.form.content,
        })

        await NoticeService.create(payload)

        this.$message.success(this.$t('common.message.addSuccess').toString())

        this.$router.push(this.RoutePage.NOTICES)
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
