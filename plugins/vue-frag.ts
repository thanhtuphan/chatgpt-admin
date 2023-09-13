import frag, { Fragment } from 'vue-frag'
import Vue from 'vue'

Vue.directive('frag', frag)
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Fragment', Fragment)
