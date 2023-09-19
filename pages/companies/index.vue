<template>
  <div class="companies-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        $t('common.sidebar.menus.dashboard')
      }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/companies' }">{{
        $t('common.sidebar.menus.companyManagement')
      }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1 class="tw-text-4xl tw-font-semibold tw-mt-[20px]">
      {{ $t('companyPage.content.companyList') }}
    </h1>
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
        sortable="custom"
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
        min-width="120"
      >
        <template slot-scope="scope">
          <el-button
            class="tw-m-0 tw-p-0 tw-mr-[10px] tw-border-none"
            @click="onOpenPsd"
          >
            <icon class="tw-text-2xl" icon="bi:filetype-psd" />
          </el-button>
          <el-button class="tw-m-0 tw-p-0 tw-border-none" @click="onOpenCsv">
            <icon class="tw-text-2xl" icon="bi:filetype-csv" />
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
import CompanyService from '~/app/company/company.service'
// import { ReportModel } from '~/app/report/report.model'
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
  optionsIndustry: Array<ValueProps>
  pickerOptions: {
    disabledDate: (time: Date) => boolean
  }
  filters: FilterProps
  tags: Array<tagProps>
  listReport: any
  activeClass: string
  total: number
  selectedReport: string
  searchPlaceholder: string
}

export default Vue.extend({
  name: 'CompaniesPage',

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
      activeClass: '',
      total: 0,
      selectedReport: 'all',
      searchPlaceholder: this.$t(
        'common.placeholderFields.searchList'
      ).toString(),
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

        console.log(data)

        console.log('count', count)
        this.total = count
        this.data = data
        this.pagination.total = count
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    // async findReport(id: any) {
    //   try {
    //     const report = await ReportService.findOne(id)

    //     console.log(report)

    //     return {
    //       report,
    //     }
    //   } catch (error: any) {
    //     this.$message.error(error.message)
    //   }
    // },

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
      console.log(name, id)

      console.log(this.$route)

      this.$router.push(this.$format(this.RoutePage.COMPANIES_DETAIL, { id }))
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

    onOpenPsd() {},

    onOpenCsv() {},
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/companies/index.scss';
</style>
