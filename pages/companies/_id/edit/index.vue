<template>
  <div class="users-page">
    <el-breadcrumb class="tw-mb-[20px]" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/companies' }"
        >Company Management</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/companies' }"
        >PCI Holdings, Inc.</el-breadcrumb-item
      >
    </el-breadcrumb>
    <the-table
      v-loading="loading"
      :data="data"
      :pagination="pagination"
      :default-sort="defaultSort"
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
        :label="$t('companyDetailPage.content.report')"
        min-width="180"
      >
        <el-button
          v-for="tag in tags"
          :key="tag.name"
          plain
          :type="
            tag.name === 'CSV' ? 'success' : tag.name === 'PDF' ? 'danger' : ''
          "
          class="tw-mr-1 tw-h-[37px]"
          @click="handleClick(scope.row.edinet_code, tag.name)"
        >
          {{ tag.name }}
        </el-button>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('common.table.action')"
        width="170"
      >
        <template slot-scope="scope">
          <el-button type="warning" size="small">{{
            $t('common.actions.edit')
          }}</el-button>
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
}

export default Vue.extend({
  name: 'UsersPage',

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
        valueSelected: [],
        valueSelectedCountry: [],
        valueDatePicker: [],
      },

      tags: [
        { name: 'CSV', type: 'success' },
        { name: 'PDF', type: 'success' },
      ],
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },

  created() {
    console.log(this.$route)

    this.filters.filtersByCompany = this.$route.params.id.toString()
    this.onFetch()

    // this.onFetchCountry()
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

        console.log(data)

        this.data = data
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

    handleSubmit(value: string) {
      this.filters.search = value
      this.filters.valueDatePicker = this.filters.valueDatePicker || []
      this.onFetch()
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/companies/index.scss';
</style>
