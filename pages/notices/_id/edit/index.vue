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
      <el-form-item
        :label="$t('common.fields.contentEnglish')"
        prop="contentEn"
      >
        <el-input
          v-model="form.contentEn"
          type="textarea"
          :rows="6"
          :maxlength="2000"
          show-word-limit
        />
      </el-form-item>
      <div class="tw-text-center">
        <el-button :loading="loading" type="info" @click="onSubmit">{{
          $t('common.actions.save')
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
    contentEn: string
  }
  rules: any
}

export default Vue.extend({
  name: 'NoticesDetailEditPage',

  async asyncData({ route, error, Enums, i18n }) {
    try {
      const notice = await NoticeService.findOne(route.params.id)

      return {
        form: {
          content: notice.content,
          contentEn: notice.content_en,
        },
      }
    } catch (err) {
      console.log(err)

      error({
        statusCode: Enums.StatusCode.PageNotFound,
        message: i18n.t('common.errors.pageNotFound').toString(),
      })
    }
  },

  data(): DataProps {
    return {
      loading: false,
      form: {
        content: '',
        contentEn: '',
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
      title: this.$t('noticesDetailEditPage.title').toString(),
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
          content_en: this.form.contentEn,
        })

        await NoticeService.update(this.$route.params.id, payload)

        this.$message.success(this.$t('common.message.editSuccess').toString())

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
