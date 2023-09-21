// import { Session } from '@supabase/supabase-js'
// import Vue from 'vue'

// export const AuthMixin = Vue.extend({
//   methods: {
//     async handleLoginSuccess(session: Session) {
//       if (
//         session &&
//         session.user &&
//         [this.Enums.Role.SuperAdmin, this.Enums.Role.Admin].includes(
//           session.user.app_metadata.role
//         ) &&
//         !(session.user.app_metadata.is_disabled === 'true')
//       ) {
//         this.$cookies.set(
//           this.ConstantsCommon.ACCESS_TOKEN_KEY,
//           session.access_token
//         )
//         await this.$store.dispatch('auth/getInfo', session.access_token)
//         this.$notify.success({
//           title: this.$t('common.notify.loginSuccess.title').toString(),
//           message: this.$t('common.notify.loginSuccess.message', {
//             name: session.user.email,
//           }).toString(),
//         })
//         // this.$router.push(this.RoutePage.PRODUCTS)
//       } else {
//         await this.$store.dispatch('logout')
//         this.$notify.error({
//           title: this.$t('common.notify.notPermission.title').toString(),
//           message: this.$t('common.notify.notPermission.message').toString(),
//         })
//       }
//     },
//   },
// })
