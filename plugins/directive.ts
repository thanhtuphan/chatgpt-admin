import Vue from 'vue'
import directiveNumber from '@/directives/v-number'
import directiveTrim from '@/directives/v-trim'

Vue.directive('number', directiveNumber)
Vue.directive('trim', directiveTrim)
