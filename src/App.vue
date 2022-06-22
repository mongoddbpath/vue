<template>
  <div id="app">
    <!--显示当前路由地址的内容-->
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
@media screen and (max-width: 1400px){
.input3 {
  width: 58% !important;
}}
</style>
