<template slot-scope='scope'>
<div>
<el-tooltip class="item" effect="dark" content="点击修改订单状态" placement="top">
<el-tag style="cursor: pointer" :type=type @click="dialogVisible = true">{{ this.scope.row.dstatus }}</el-tag>
</el-tooltip>
<el-dialog :title=dialogtitle :visible.sync="dialogVisible" :modal="false">
<el-steps :active=active finish-status="success" style="height:136px">
  <el-step title="已签单" :description=this.scope.row.startTime></el-step>
  <el-step title="建站中" :description=this.scope.row.jztime></el-step>
  <el-step title="建站完成" :description=this.scope.row.webtime></el-step>
  <el-step title="已交付" :description=this.scope.row.donetime></el-step>
  <el-step title="优化中" :description=this.scope.row.seotime></el-step>
</el-steps>
<div style="margin-bottom:26px">
  <el-button style="float:right;" @click="next">下一步</el-button>
</div>
</el-dialog>
</div>
</template>
<script>
export default {
  props: {
    value: {
      // type: String
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
  data () {
    return {
      active: this.scope.row.active,
      dialogVisible: false,
      dialogtitle: `【${this.scope.row.domain}】订单状态修改`,
      type: this.scope.row.dstatus === '已交付' || this.scope.row.dstatus === '优化中' ? 'success' : 'text'
    }
  },
  methods: {
    next () {
      if (this.active++ > 4) this.active = 0
    }
  }
}
</script>
<style scope lang='stylus'>

</style>
