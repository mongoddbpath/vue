<template>
    <el-row>
      <el-tag @click="toHotTai"
      effect="plain" style='font-size:15px;cursor: pointer;' type='success'>登录</el-tag>
    </el-row>
</template>
<script>
import { weblogin } from '@api/webSiteLogin'
// import _lodash from 'lodash'
export default {
  data () {
    return {
    }
  },
  props: {
    value: {
      type: String
    },
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    }
  },
  // 子组件的更新需要依靠watch来实现监听与操作
  watch: {
    value () {
      // this.mountedOK()
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    // 防抖
    // throttledMethod: _lodash.debounce(function () {
    //   let that = this
    //   that.toHotTai()
    // }, 3000),
    toHotTai () {
      let h = this.$createElement
      let webid = this.scope.row.id
      weblogin(webid).then(res => {
        window.open(res)
      }).catch(() => {
        this.$notify({
          title: '登录后台失败',
          type: 'error',
          message: h('b', { style: 'color: teal' }, '请稍后再试')
        })
      })
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center
</style>
