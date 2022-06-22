<template slot-scope='scope'>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <div style='font-size:15px;'>{{ appNameOK }}</div>
          </div>
</template>
<script>
export default {
  data () {
    return {
      eltagtype: ''
    }
  },
  props: {
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    }
  },
  computed: {
    appNameOK () {
      switch (parseInt(this.scope.row.type)) {
        case 1:
          return '客户'
        case 2:
          return '客服'
        case 3:
          return '业务员'
        default:
          return '客户'
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center

</style>
