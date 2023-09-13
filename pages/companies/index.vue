<template>
  <div class="users-page">
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
          <!--
 <el-option
            v-for="item in optionsSelected"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
</el-option>
-->
        </el-select>
      </template>
      <template #toolbar-action>
        <el-button
          v-if="selected.length"
          class="the-toolbar__remove-button"
          type="danger"
          size="small"
          @click="onRemoveMultiple"
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
        min-width="100"
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
        min-width="150"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :type="tag.type"
            class="tw-mr-1"
          >
            {{ tag.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('companyPage.content.corporateNumber')"
        min-width="180"
        prop="submitter_corporate_number"
        sortable="custom"
      />
      <el-table-column
        fixed="right"
        :label="$t('common.table.action')"
        width="180"
      >
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="onDetail">{{
            $t('common.actions.report')
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
import { UserModel } from '@/app/user/user.model'
import { SocialProvider } from '~/common/enums'
import UserService from '~/app/user/user.service'

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
  selected: Array<UserModel>
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
      data: [
        {
          proposer_name: 'ＮＥＣネッツエスアイ株式会社',
          proposer_name_english: 'GAKKEN  HOLDINGS CO., LTD.',
          stock_code: 1973,
          submitter_industry: '情報・通信業',
          capital: 13122,
          submitter_corporate_number: 3120001077023,
        },
        {
          proposer_name: 'ＮＥＣネッツエスアイ株式会社',
          proposer_name_english: 'GAKKEN  HOLDINGS CO., LTD.',
          stock_code: 1973,
          submitter_industry: '情報・通信業',
          capital: 13122,
          submitter_corporate_number: 3120001077023,
        },
        {
          proposer_name: 'ＮＥＣネッツエスアイ株式会社',
          proposer_name_english: 'GAKKEN  HOLDINGS CO., LTD.',
          stock_code: 1973,
          submitter_industry: '情報・通信業',
          capital: 13122,
          submitter_corporate_number: 3120001077023,
        },
        {
          proposer_name: 'ＮＥＣネッツエスアイ株式会社',
          proposer_name_english: 'GAKKEN  HOLDINGS CO., LTD.',
          stock_code: 1973,
          submitter_industry: '情報・通信業',
          capital: 13122,
          submitter_corporate_number: 3120001077023,
        },
        {
          proposer_name: 'ＮＥＣネッツエスアイ株式会社',
          proposer_name_english: 'GAKKEN  HOLDINGS CO., LTD.',
          stock_code: 1973,
          submitter_industry: '情報・通信業',
          capital: 13122,
          submitter_corporate_number: 3120001077023,
        },
        {
          proposer_name: 'ＮＥＣネッツエスアイ株式会社',
          proposer_name_english: 'GAKKEN  HOLDINGS CO., LTD.',
          stock_code: 1973,
          submitter_industry: '情報・通信業',
          capital: 13122,
          submitter_corporate_number: 3120001077023,
        },
      ],

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
    // this.onFetch()
    // this.onFetchCountry()
  },

  methods: {
    async onFetch() {
      try {
        this.loading = true
        const { count, data } = await UserService.all({
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

    async onFetchCountry() {
      try {
        const listCountry = await UserService.getAllCountry()
        const uniqueCountries = Array.from(
          new Set(listCountry?.map((item: { country: string }) => item.country))
        )

        this.optionsCountry = uniqueCountries?.map((item) => {
          return {
            value: item,
            label: item,
          }
        })
      } catch (error: any) {
        this.$message.error(error.message)
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

    handleSelectionChange(selection: Array<ProductUser>) {
      this.selected = selection
    },

    onProduct(id: string) {
      this.$router.push({
        path: this.RoutePage.PRODUCTS,
        query: { user: id },
      })
    },

    handlePickDate(value: Date[]) {
      if (value && value[0].getTime() === value[1].getTime()) {
        value[1].setHours(23, 59, 59)
      }
    },

    onDetail() {
      this.$router.push(this.$format(this.RoutePage.USERS_DETAIL))
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
@import '@/assets/styles/pages/users/index.scss';
</style>
