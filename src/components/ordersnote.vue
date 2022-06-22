<template slot-scope='scope'>
  <el-popover
    placement="left"
    width="200"
    trigger="click">
    <p>订单号：{{ this.scope.row.ordernum}}</p>
    <p>官网价：{{ this.scope.row.price}}</p>
    <p>应付金额：{{ this.scope.row.rmb}}</p>
    <p>公司名：{{ this.scope.row.company}}</p>
    <p>账号：{{ this.scope.row.account}}</p>
    <p>关联账号：{{ this.scope.row.accountabout}}</p>
    <p>类型：{{ this.scope.row.type}}</p>
    <!-- <p>渠道：{{ this.scope.row.qd}}</p> -->
    <p>交易时间：{{ this.scope.row.time}}</p>
    <p>备注：{{ this.scope.row.note}}</p>
    <div slot='reference' class='name-wrapper' style='cursor: pointer'>
    <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='info'>详情</el-tag>
    </div>
    </el-popover>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  // watch监听数据的变化并支持操作
  watch: {
    value () {
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
  computed: {
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
