<template>
  <div class="users-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="tw-text-#8a65e3" :to="{ path: '/' }"
        >Dashboard</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/companies' }"
        >Company Management</el-breadcrumb-item
      >
    </el-breadcrumb>
    <h1 class="tw-text-4xl tw-font-semibold tw-mt-[10px] tw-mb-[30px]">
      Company List
    </h1>
    <div class="tw-mb-[15px]">
      <span>All (575)</span>
      <span class="tw-mx-[30px]">Listed (475)</span>
      <span>Unlisted (100)</span>
    </div>
    <the-table
      v-loading="loading"
      class="tw-mt-[20px]"
      :data="data"
      :pagination="pagination"
      :default-sort="defaultSort"
      @page-change="onPageChange"
      @sort-change="handleSortChange"
      @submit-form="handleSubmit"
      @selection-change="handleSelectionChange"
    >
      <template #toolbar-filter>
        <el-select
          v-model="filters.valueSelected"
          class="the-toolbar__social-select"
          size="small"
          multiple
          collapse-tags
          filterable
          clearable
          :placeholder="$t('common.placeholderFields.industrySelect')"
        >
          <el-option
            v-for="item in optionsIndustry"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <el-table-column
        :label="$t('companyPage.content.name')"
        min-width="250"
        prop="proposer_name"
        sortable="custom"
      />
      <el-table-column
        :label="$t('companyPage.content.nameEnglish')"
        min-width="250"
        prop="proposer_name_english"
        sortable="custom"
      />
      <el-table-column
        :label="$t('companyPage.content.stockCode')"
        min-width="130"
        prop="stock_code"
      />
      <el-table-column
        :label="$t('companyPage.content.industry')"
        min-width="120"
        prop="submitter_industry"
      />
      <el-table-column
        :label="$t('companyPage.content.capital')"
        min-width="100"
        prop="capital"
        sortable="custom"
      />
      <el-table-column
        :label="$t('companyPage.content.latestReports')"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-for="tag in tags"
            :key="tag.name"
            plain
            :type="
              tag.name === 'CSV'
                ? 'success'
                : tag.name === 'PDF'
                ? 'danger'
                : ''
            "
            class="tw-mr-1 tw-h-[37px]"
            @click="handleClick(scope.row.edinet_code, tag.name)"
          >
            {{ tag.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('companyPage.content.corporateNumber')"
        min-width="180"
        prop="submitter_corporate_number"
      />
      <el-table-column
        fixed="right"
        :label="$t('common.table.action')"
        width="85"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="onDetail(scope.row.edinet_code)"
            >{{ $t('common.actions.detail') }}</el-button
          >
        </template>
      </el-table-column>
    </the-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { CompanyModel } from '~/app/company/company.model'
import { SocialProvider } from '~/common/enums'
import CompanyService from '~/app/company/company.service'
import { ReportModel } from '~/app/report/report.model'
import ReportService from '~/app/report/report.service'

// import ProductService from '~/app/product/product.service'
// import CompanyService from '~/app/company/company.service'

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
  selected: Array<CompanyModel>
  optionsSelected: Array<ValueProps>
  optionsIndustry: Array<ValueProps>
  pickerOptions: {
    disabledDate: (time: Date) => boolean
  }
  filters: FilterProps
  tags: Array<tagProps>
  listReport: any
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

      optionsIndustry: [],
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

      listReport: [],
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },

  created() {
    this.onFetch()
    // this.onFetchIndustry()
  },

  methods: {
    async onFetch() {
      try {
        this.loading = true
        const { count, data } = await CompanyService.all({
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

    async findReport(id: any) {
      try {
        const report = await ReportService.findOne(id)

        console.log(report)

        return {
          report,
        }
      } catch (error: any) {
        this.$message.error(error.message)
      }
    },

    // async onFetchIndustry() {
    //   try {
    //     const listIndustry = await CompanyService.getAllIndustry()

    //     // console.log(listIndustry)

    //     const uniqueIndustry = Array.from(
    //       new Set(listIndustry?.map((item: any) => item.submitter_industry))
    //     )

    //     // console.log(uniqueIndustry)

    //     this.optionsIndustry = uniqueIndustry?.map((item) => {
    //       return {
    //         value: item,
    //         label: item,
    //       }
    //     })
    //   } catch (error: any) {
    //     this.$message.error(error.message)
    //   }
    // },

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

    handleSelectionChange(selection: Array<CompanyModel>) {
      this.selected = selection
    },

    handlePickDate(value: Date[]) {
      if (value && value[0].getTime() === value[1].getTime()) {
        value[1].setHours(23, 59, 59)
      }
    },

    onDetail(id: string) {
      this.$router.push(
        this.$format(this.RoutePage.COMPANIES_DETAIL_EDIT, { id })
      )
    },

    handleClick(id: any, type: any) {
      console.log('hahah', id, type)
      this.findReport(id).then((data) => {
        console.log('data tra ve ..............', data)
      })
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
