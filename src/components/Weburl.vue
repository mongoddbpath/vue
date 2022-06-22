<template slot-scope='scope'>
  <el-popover
    placement="top-start"
    :title="this.scope.row.dstatus==='已交付' ? '建站已完成' : '请耐心地等待建站的过程'"
    width="200"
    trigger="hover">
    <p prop='dstatus'>当前订单状态: {{ this.scope.row.dstatus }}</p>
    <div slot='reference' class='name-wrapper' style='cursor: pointer'>
<el-tag :type="this.scope.row.dstatus==='已交付' ? 'success' : ''">{{ this.scope.row.weburl }}</el-tag>
    </div>
    </el-popover>
      </template>
<script>
export default {
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
  mounted () {

  },
  methods: {
    handleClick () {
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center

</style>
