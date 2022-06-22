<template slot-scope='scope'>
  <el-popover
    placement="left"
    width="200"
    trigger="click">
    <p>产品名：{{ this.scope.row.name}}</p>
    <p>描述：{{ this.scope.row.description}}</p>
    <div slot='reference' class='name-wrapper' style='cursor: pointer'>
    <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='info'>描述</el-tag>
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
    type () {
      switch (parseInt(this.scope.row.type)) {
        case 1:
          return '充值'
        case 2:
          return '支出'
        default:
          return '支出'
      }
    },
    qd () {
      switch (parseInt(this.scope.row.qd)) {
        case 1:
          return '手动'
        case 2:
          return '支付宝'
        case 3:
          return '微信'
        case 4:
          return '余额'
        default:
          return '手动'
      }
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
