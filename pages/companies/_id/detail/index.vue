<template>
  <div class="companies-detail-page">
    <the-dialog
      :visible.sync="dialog.dialogVisible"
      :title="dialog.title"
      :width="dialog.width"
      center
      @close="handleCloseDialog"
    >
      <div class="companies-detail-page__dialog-body">
        <div class="tw-flex">
          <el-input
            v-model="dialog.urlImport"
            :placeholder="$t('common.placeholderFields.inputFile')"
            clearable
            @change="handleInput"
          />
          <el-button type="primary" @click="handleUpload"
            >{{ $t('common.actions.upload')
            }}<i class="el-icon-upload el-icon-right"></i
          ></el-button>
        </div>
        <p class="tw-text-center">{{ $t('companyDetailPage.content.or') }}</p>
        <the-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="text"
          :file-list="dialog.listReport"
          :on-error="onUploadError"
          :on-success="onUploadSuccess"
          :on-remove="onMediaRemove"
          :disabled="dialog.uploadDisabled"
          drag
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            {{ $t('common.actions.dropFile')
            }}<em>{{ $t('common.actions.clickToUpload') }}</em>
          </div>
        </the-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">{{
          $t('common.actions.cancel')
        }}</el-button>
        <el-button type="primary" @click="dialog.dialogVisible = false">{{
          $t('common.actions.create')
        }}</el-button>
      </span>
    </the-dialog>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        $t('common.sidebar.menus.dashboard')
      }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/companies' }">{{
        $t('common.sidebar.menus.companyManagement')
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        dataCompany[0]?.proposer_name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="tw-text-4xl tw-font-semibold tw-mt-[20px] tw-mb-[10px]">
      {{ dataCompany[0]?.proposer_name }}
    </h1>
    <div class="tw-mb-[20px]">
      <span class="tw-text-xl tw-font-semibold tw-my-[20px]">
        {{ $t('companyDetailPage.content.englishName') }}
      </span>
      <span class="tw-text-xl tw-font-semibold tw-my-[20px]">
        {{ dataCompany[0]?.proposer_name_english }}
      </span>
    </div>
    <el-collapse
      v-model="activeName"
      class="companies-detail-page__collapse tw-mb-[30px] tw-border-b-0"
    >
      <el-collapse-item
        :title="$t('companyDetailPage.content.overview')"
        name="1"
      >
        <el-row type="flex">
          <el-col :span="12"
            ><span>{{ $t('companyDetailPage.content.stockCode') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.stock_code ||
              $t('companyDetailPage.content.unListed')
            }}</span></el-col
          >
          <el-col :span="12"
            ><span>{{ $t('companyDetailPage.content.corporateNumber') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.submitter_corporate_number
            }}</span></el-col
          >
        </el-row>
        <el-row type="flex">
          <el-col :span="12"
            ><span>{{ $t('companyDetailPage.content.location') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.location
            }}</span></el-col
          >
          <el-col :span="12"
            ><span>{{ $t('companyDetailPage.content.submitterName') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.submitter_name
            }}</span></el-col
          >
        </el-row>
        <el-row type="flex">
          <el-col :span="12"
            ><span>{{ $t('companyDetailPage.content.companyIndustry') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.submitter_industry
            }}</span></el-col
          >
          <el-col :span="12"
            ><span>{{ $t('companyDetailPage.content.companyType') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.submitter_type
            }}</span></el-col
          >
        </el-row>
        <el-row type="flex">
          <el-col :span="24"
            ><span>{{ $t('companyDetailPage.content.capital') }}</span
            ><span class="tw-font-semibold">{{
              dataCompany[0]?.capital
            }}</span></el-col
          >
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <the-table
      v-loading="loading"
      :data="data"
      :pagination="pagination"
      :default-sort="defaultSort"
      :search-placeholder="searchPlaceholder"
      @page-change="onPageChange"
      @sort-change="handleSortChange"
      @submit-form="handleSubmit"
      @selection-change="handleSelectionChange"
    >
      <template #toolbar-filter>
        <el-date-picker
          v-model="filters.valueDatePicker"
          class="the-toolbar__date-picker"
          size="small"
          type="daterange"
          :start-placeholder="$t('common.placeholderFields.startPeriod')"
          :end-placeholder="$t('common.placeholderFields.endPeriod')"
          :picker-options="pickerOptions"
          @change="handlePickDate"
        >
        </el-date-picker>
      </template>
      <template #toolbar-action>
        <el-button
          v-if="selected.length"
          class="the-toolbar__remove-button"
          type="danger"
          size="small"
        >
          {{ $t('common.actions.remove') }}
        </el-button>
        <el-button
          v-else
          class="the-toolbar__add-button"
          type="success"
          size="small"
          @click="onAdd"
        >
          {{ $t('common.actions.add') }}
        </el-button>
      </template>
      <el-table-column
        fixed="left"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        :label="$t('companyDetailPage.content.nameDocument')"
        min-width="300"
        prop="submitted_document"
        sortable="custom"
      />
      <el-table-column
        :label="$t('companyDetailPage.content.reportingPeriod')"
        min-width="320"
        prop="reporting_period"
      />
      <el-table-column
        :label="$t('companyDetailPage.content.dateSubmit')"
        min-width="180"
        prop="date_time_submit"
        sortable="custom"
      />
      <el-table-column
        :label="$t('companyPage.content.latestReports')"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.pdf_url"
            class="tw-m-0 tw-p-0 tw-mr-[10px] tw-border-none"
            @click="onOpenPsd(scope.row.pdf_url)"
          >
            <icon class="tw-text-2xl" icon="bi:filetype-psd" />
          </el-button>
          <el-button
            v-if="scope.row.csv_name"
            class="tw-m-0 tw-p-0 tw-border-none"
            @click="onOpenCsv"
          >
            <icon class="tw-text-2xl" icon="bi:filetype-csv" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('common.table.action')"
        width="170"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="onEdit(scope.row.pdf_url, scope.row.csv_name)"
            >{{ $t('common.actions.edit') }}</el-button
          >
          <el-button type="danger" size="small">{{
            $t('common.actions.remove')
          }}</el-button>
        </template>
      </el-table-column>
    </the-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { ReportModel } from '~/app/report/report.model'
import { SocialProvider } from '~/common/enums'
import ReportService from '~/app/report/report.service'
import CompanyService from '~/app/company/company.service'
import { CompanyModel } from '~/app/company/company.model'

interface ValueProps {
  value: string
  label: string
}

interface tagProps {
  name: string
  type: string
}

interface FilterProps {
  search: string
  filtersByCompany?: string
  valueSelected: string[]
  valueSelectedCountry: string[]
  valueDatePicker: Date[]
}

interface DataModel {}

interface DataProps {
  data: Array<DataModel>
  loading: boolean
  pagination: {
    page: number
    total: number
  }
  defaultSort: Record<string, string>
  sort: {
    column: string
    option: boolean
  } | null
  selected: Array<ReportModel>
  optionsSelected: Array<ValueProps>
  optionsCountry: Array<ValueProps>
  pickerOptions: {
    disabledDate: (time: Date) => boolean
  }
  filters: FilterProps
  tags: Array<tagProps>
  activeName: string
  dataCompany: Array<CompanyModel>
  searchPlaceholder: string
  dialog: {
    dialogVisible: boolean
    title: string
    width: string
    listReport: any
    urlImport: string
    uploadDisabled: boolean
  }
}

export default Vue.extend({
  name: 'CompaniesEditPage',

  data(): DataProps {
    return {
      data: [],

      loading: false,
      pagination: {
        page: 1,
        total: 0,
      },

      defaultSort: {
        created_at: 'ascending',
      },

      sort: {
        column: 'created_at',
        option: false,
      },

      optionsSelected: [
        {
          value: SocialProvider.Facebook,
          label: SocialProvider.Facebook,
        },
        {
          value: SocialProvider.Instagram,
          label: SocialProvider.Instagram,
        },
        {
          value: SocialProvider.Twitter,
          label: SocialProvider.Twitter,
        },
      ],

      optionsCountry: [],
      pickerOptions: {
        disabledDate(time: Date) {
          return time.getTime() > Date.now()
        },
      },

      selected: [],
      filters: {
        search: '',
        filtersByCompany: '',
        valueSelected: [],
        valueSelectedCountry: [],
        valueDatePicker: [],
      },

      tags: [
        { name: 'CSV', type: 'success' },
        { name: 'PDF', type: 'success' },
      ],

      activeName: '1',
      dataCompany: [],
      searchPlaceholder: this.$t(
        'common.placeholderFields.searchDetail'
      ).toString(),

      dialog: {
        dialogVisible: false,
        title: '',
        width: '30%',
        listReport: [],
        urlImport: '',
        uploadDisabled: false,
      },
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },

  created() {
    this.filters.filtersByCompany = this.$route.params.id.toString()
    this.onFetch()
    this.onfindCompany()
  },

  methods: {
    async onFetch() {
      try {
        this.loading = true
        const { count, data } = await ReportService.all({
          page: this.pagination.page,
          limit: this.ConstantsCommon.RECORD_PER_PAGE,
          sort: this.sort,
          filters: this.filters,
        })

        this.data = data
        this.pagination.total = count
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async onfindCompany() {
      try {
        this.loading = true
        const { count, data } = await CompanyService.all({
          page: this.pagination.page,
          limit: this.ConstantsCommon.RECORD_PER_PAGE,
          sort: this.sort,
          filters: this.filters,
        })

        this.dataCompany = data
        this.pagination.total = count
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    onPageChange(page: number) {
      this.pagination.page = page
      this.onFetch()
    },

    openSocialMedia(id: string, platform: string) {
      let url: string | null = null

      switch (platform) {
        case SocialProvider.Instagram:
          url = this.ConstantsCommon.SOCIAL_NETWORK_URL.INSTAGRAM_URL + id
          break

        case SocialProvider.Facebook:
          url = this.ConstantsCommon.SOCIAL_NETWORK_URL.FACEBOOK_URL + id
          break

        case SocialProvider.Twitter:
          url = this.ConstantsCommon.SOCIAL_NETWORK_URL.TWITTER_URL + id
          break

        default:
          break
      }
      if (url) {
        window.open(url, '_blank')
      }
    },

    handleSortChange({ prop, order }: { prop: string; order: string }) {
      this.sort =
        order !== null
          ? {
              column: prop,
              option: order === 'ascending',
            }
          : null
      this.onFetch()
    },

    handleSelectionChange(selection: Array<ReportModel>) {
      this.selected = selection
    },

    handlePickDate(value: Date[]) {
      if (value && value[0].getTime() === value[1].getTime()) {
        value[1].setHours(23, 59, 59)
      }
    },

    onOpenPsd(data: any) {
      window.open(data)
    },

    onOpenCsv(data: any) {
      window.open(data)
    },

    onEdit(pdf: string, csv: string) {
      this.dialog.dialogVisible = true
      this.dialog.title = this.$t(
        'companyDetailPage.content.editReport'
      ).toString()
      this.dialog.listReport = [
        pdf
          ? {
              name: pdf.substring(pdf.lastIndexOf('/') + 1),
              url: pdf,
            }
          : null,
        csv
          ? {
              name: csv,
              url: csv,
            }
          : null,
      ].filter(Boolean)
    },

    onAdd() {
      this.dialog.dialogVisible = true
      this.dialog.title = this.$t(
        'companyDetailPage.content.createReport'
      ).toString()
      this.dialog.listReport = []
    },

    handleCloseDialog() {
      this.dialog.listReport = []
    },

    onUploadSuccess(response: {
      url: string
      status: string
      name: 'pdf' | 'csv'
    }) {
      // this.dialog.listReport.push(response)
      // ;(this.$refs.upload as any).dispatch('ElFormItem', 'el.form.change')
    },

    onUploadError(err: any, file: any, fileList: any) {
      console.log('onUploadError', err, file, fileList)
    },

    onMediaRemove(file: any) {
      // const fileList = [...this.dialog.listReport]
      // const index = fileList.indexOf(file)
      // fileList.splice(index, 1)
      // this.dialog.listReport = [...fileList]
      // ;(this.$refs.upload as any).dispatch('ElFormItem', 'el.form.change')
    },

    handleInput(value: string) {
      if (value) {
        this.dialog.uploadDisabled = true
      } else {
        this.dialog.uploadDisabled = false
      }
    },

    handleUpload() {
      if (this.dialog.urlImport) {
      }
      this.dialog.listReport = this.dialog.urlImport
    },

    handleSubmit(value: string) {
      this.filters.search = value
      this.filters.valueDatePicker = this.filters.valueDatePicker || []
      this.onFetch()
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/companies/detail/edit/index.scss';
@import '@/assets/styles/pages/companies/index.scss';
</style>
