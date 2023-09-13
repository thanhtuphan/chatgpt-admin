import Vue from 'vue'
import { currencyFilter } from '~/filters/currency'
import { dateTimeFilter } from '~/filters/date-time'

Vue.filter('datetime', dateTimeFilter)
Vue.filter('currency', currencyFilter)
