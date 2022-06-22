<template>
  <div></div>
</template>
<script>
import util from '@/libs/util.js'
export default {
  data () {
    return {
    }
  },
  props: {
    permission: {
      type: Array
    }
  },
  mounted () {
    this.routerCheck()
  },
  methods: {
    routerCheck () {
    // 鉴别路由权限
      let name = util.cookies.get('name')
      // console.log('OK' + this.permission)
      // eslint-disable-next-line
      var v = this.permission.find( value => value === name)
      console.log(v)
      if (v === undefined) {
        this.$store.dispatch('d2admin/page/closeAll')
      }
    }
  }
}
</script>
<style scope lang='stylus'>
</style>
