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
      @search-change="handleSearchChange"
      @selection-change="handleSelectionChange"
    >
      <template #toolbar-filter>
        <el-select
          v-model="valueSelected"
          class="the-toolbar__industry-select"
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
        prop="jp_name"
      />
      <el-table-column
        :label="$t('companyPage.content.nameEnglish')"
        min-width="250"
        prop="en_name"
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
        prop="sub_industry"
      />
      <el-table-column
        :label="$t('companyPage.content.capital')"
        min-width="150"
        prop="capital_stock"
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
            @click="handleOpenPdf(scope.row.pdf_url)"
          >
            <icon class="tw-text-2xl" icon="bi:filetype-pdf" />
          </el-button>
          <el-button
            v-if="scope.row.csv_name"
            class="tw-m-0 tw-p-0 tw-border-none"
            @click="handleOpenCsv(scope.row.csv_url)"
          >
            <icon class="tw-text-2xl" icon="bi:filetype-csv" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('companyPage.content.corporateNumber')"
        min-width="180"
        prop="sub_corporate_number"
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

interface ValueProps {
  value: string
  label: string
}

interface FilterProps {
  search: string
  valueSelected: string[]
}

interface DataProps {
  data: Array<CompanyModel>
  loading: boolean
  pagination: {
    page: number
    total: number
  }
  sort: {
    sorted: string
    sortType: string
  }
  defaultSort: Record<string, string>
  selected: Array<CompanyModel>
  optionsIndustry: Array<ValueProps>
  filters: FilterProps
  listReport: any
  selectedReport: string
  searchPlaceholder: string
  valueSelected: string[]
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

      sort: {
        sorted: '',
        sortType: '',
      },

      defaultSort: {
        created_at: 'ascending',
      },

      optionsIndustry: [],

      selected: [],
      filters: {
        search: '',
        valueSelected: [],
      },

      listReport: [],
      selectedReport: 'all',
      searchPlaceholder: this.$t(
        'common.placeholderFields.searchList'
      ).toString(),

      valueSelected: [],
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },

  created() {
    this.onFetch()
    this.getAllIndustries()
  },

  methods: {
    async onFetch() {
      try {
        this.loading = true
        const { data, total } = await CompanyService.all({
          page: this.pagination.page,
          sort: this.sort,
          filters: this.filters,
        })

        this.data = data
        this.pagination.total = total
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async getAllIndustries() {
      try {
        const { data } = await CompanyService.getAllIndustries()

        this.optionsIndustry = data?.map((item: string) => {
          return {
            value: item,
            label: item,
          }
        })
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

    handleSortChange({ prop, order }: { prop: string; order: string }) {
      if (order) {
        this.sort = {
          sorted: prop,
          sortType: order,
        }
      } else {
        this.sort = {
          sorted: '',
          sortType: '',
        }
      }
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
    },

    handleSearchChange(value: string) {
      this.filters.search = value
      this.filters.valueSelected = this.valueSelected
      this.onFetch()
    },

    handleOpenPdf(url: string) {
      window.open(url)
    },

    handleOpenCsv(url: string) {
      window.open(url)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/companies/index.scss';
</style>
