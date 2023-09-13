<template>
  <div>Chat History</div>
  <!--
 <div class="users-page">
    <the-table>
      <template #toolbar-filter>
        <el-select
          v-model="filters.valueSelected"
          class="the-toolbar__social-select"
          size="small"
          multiple
          collapse-tags
          filterable
          clearable
          :placeholder="$t('common.placeholderFields.socialNetwork')"
        >
          <el-option
            v-for="item in optionsSelected"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="filters.valueSelectedCountry"
          class="the-toolbar__country-select"
          size="small"
          multiple
          collapse-tags
          filterable
          clearable
          :placeholder="$t('common.placeholderFields.countrySelect')"
        >
          <el-option
            v-for="item in optionsCountry"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="filters.valueDatePicker"
          class="the-toolbar__date-picker"
          size="small"
          type="daterange"
          :start-placeholder="$t('common.placeholderFields.startDate')"
          :end-placeholder="$t('common.placeholderFields.endDate')"
          :picker-options="pickerOptions"
          @change="handlePickDate"
        >
        </el-date-picker>
      </template>
      <el-table-column
        :label="$t('companyPage.content.proposerName')"
        min-width="80"
        prop="user_id"
      />
      <el-table-column
        :label="$t('companyPage.content.proposerNameEnglish')"
        min-width="150"
        prop="user_name"
      />
      <el-table-column
        :label="$t('companyPage.content.stockCode')"
        min-width="100"
        prop="email"
      />
      <el-table-column
        :label="$t('companyPage.content.submitterIndustry')"
        min-width="100"
        prop="country"
      />
      <el-table-column
        :label="$t('companyPage.content.LatestFinancialReports')"
        min-width="160"
        prop="created_at"
      >
        <template slot-scope="scope">
          {{ scope.row.created_at | datetime }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('common.table.action')"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="danger" size="small">{{
            $t('common.actions.product')
          }}</el-button>
        </template>
      </el-table-column>
    </the-table>
  </div>
--></template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { UserModel } from '@/app/user/user.model'
// import { SocialProvider } from '~/common/enums'
// import UserService from '~/app/user/user.service'

// interface ValueProps {
//   value: string
//   label: string
// }

// interface FilterProps {
//   search: string
//   valueSelected: string[]
//   valueSelectedCountry: string[]
//   valueDatePicker: Date[]
// }

// interface DataProps {
//   data: Array<UserModel>
//   loading: boolean
//   pagination: {
//     page: number
//     total: number
//   }
//   defaultSort: Record<string, string>
//   sort: {
//     column: string
//     option: boolean
//   } | null
//   selected: Array<UserModel>
//   optionsSelected: Array<ValueProps>
//   optionsCountry: Array<ValueProps>
//   pickerOptions: {
//     disabledDate: (time: Date) => boolean
//   }
//   filters: FilterProps
// }

export default Vue.extend({
  name: 'UsersPage',

  // data(): DataProps {
  //   return {
  //     data: [],
  //     loading: false,
  //     pagination: {
  //       page: 1,
  //       total: 0,
  //     },

  //     defaultSort: {
  //       created_at: 'ascending',
  //     },

  //     sort: {
  //       column: 'created_at',
  //       option: false,
  //     },

  //     optionsSelected: [
  //       {
  //         value: SocialProvider.Facebook,
  //         label: SocialProvider.Facebook,
  //       },
  //       {
  //         value: SocialProvider.Instagram,
  //         label: SocialProvider.Instagram,
  //       },
  //       {
  //         value: SocialProvider.Twitter,
  //         label: SocialProvider.Twitter,
  //       },
  //     ],

  //     optionsCountry: [],
  //     pickerOptions: {
  //       disabledDate(time: Date) {
  //         return time.getTime() > Date.now()
  //       },
  //     },

  //     selected: [],
  //     filters: {
  //       search: '',
  //       valueSelected: [],
  //       valueSelectedCountry: [],
  //       valueDatePicker: [],
  //     },
  //   }
  // },

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },

  // created() {
  //   this.onFetch()
  //   this.onFetchCountry()
  // },

  // methods: {
  //   async onFetch() {
  //     try {
  //       this.loading = true
  //       const { count, data } = await UserService.all({
  //         page: this.pagination.page,
  //         limit: this.ConstantsCommon.RECORD_PER_PAGE,
  //         sort: this.sort,
  //         filters: this.filters,
  //       })

  //       this.data = data
  //       this.pagination.total = count
  //     } catch (error: any) {
  //       this.$message.error(error.message)
  //     } finally {
  //       this.loading = false
  //     }
  //   },

  //   async onFetchCountry() {
  //     try {
  //       const listCountry = await UserService.getAllCountry()
  //       const uniqueCountries = Array.from(
  //         new Set(listCountry?.map((item: { country: string }) => item.country))
  //       )

  //       this.optionsCountry = uniqueCountries?.map((item) => {
  //         return {
  //           value: item,
  //           label: item,
  //         }
  //       })
  //     } catch (error: any) {
  //       this.$message.error(error.message)
  //     }
  //   },

  //   onPageChange(page: number) {
  //     this.pagination.page = page
  //     this.onFetch()
  //   },

  //   openSocialMedia(id: string, platform: string) {
  //     let url: string | null = null

  //     switch (platform) {
  //       case SocialProvider.Instagram:
  //         url = this.ConstantsCommon.SOCIAL_NETWORK_URL.INSTAGRAM_URL + id
  //         break

  //       case SocialProvider.Facebook:
  //         url = this.ConstantsCommon.SOCIAL_NETWORK_URL.FACEBOOK_URL + id
  //         break

  //       case SocialProvider.Twitter:
  //         url = this.ConstantsCommon.SOCIAL_NETWORK_URL.TWITTER_URL + id
  //         break

  //       default:
  //         break
  //     }
  //     if (url) {
  //       window.open(url, '_blank')
  //     }
  //   },

  //   handleSortChange({ prop, order }: { prop: string; order: string }) {
  //     this.sort =
  //       order !== null
  //         ? {
  //             column: prop,
  //             option: order === 'ascending',
  //           }
  //         : null
  //     this.onFetch()
  //   },

  //   onProduct(id: string) {
  //     this.$router.push({
  //       path: this.RoutePage.PRODUCTS,
  //       query: { user: id },
  //     })
  //   },

  //   handlePickDate(value: Date[]) {
  //     if (value && value[0].getTime() === value[1].getTime()) {
  //       value[1].setHours(23, 59, 59)
  //     }
  //   },

  //   handleSubmit(value: string) {
  //     this.filters.search = value
  //     this.filters.valueDatePicker = this.filters.valueDatePicker || []
  //     this.onFetch()
  //   },
  // },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/users/index.scss';
</style>
