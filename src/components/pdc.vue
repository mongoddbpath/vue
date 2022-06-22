<template slot-scope='scope'>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag style='font-size:15px;'>{{ appNameOK }}</el-tag>
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
      switch (parseInt(this.scope.row.status)) {
        case 1:
          return '正常'
        case 0:
          return '停用'
        default:
          return '正常'
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
