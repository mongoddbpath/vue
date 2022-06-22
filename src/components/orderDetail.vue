<template>
<div>
    <el-row>
      <el-tag effect="plain"  @click="dialogVisible=true"
      style='font-size:15px;cursor: pointer;' type='success'>详情</el-tag>
    </el-row>
    <!-- 排名dialog -->
  <el-dialog fullscreen :title="title" :visible.sync="dialogVisible" :modal="false">
    <el-row>
    <el-col :span="8"><div class="o1">订单详情：</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="12"><div class="o2">订单编号：{{this.scope.row.fromId}}</div></el-col>
    <el-col :span="12"><div class="o2">订单类型：{{orderType2}}</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="12"><div class="o2">创建时间：{{this.scope.row.payTime}}</div></el-col>
    <el-col :span="12"><div class="o2">订单描述：{{this.scope.row.title}}</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="8"><div class="o1 o6">订单来源：</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="12"><div class="o2">支付状态：<span :class="o31">{{appNameOK}}{{this.scope.row.amount}}元</span>
    </div></el-col>
    </el-row>
  </el-dialog>
    <!-- 排名dialog -->
</div>
</template>
<script>
export default {
  data () {
    return {
      iframeurl: '',
      dialogVisible: false
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
    }
  },
  computed: {
    title () {
      return `【${this.scope.row.fromId}-${this.scope.row.title}】订单详情：`
    },
    orderType2 () {
      switch (parseInt(this.scope.row.orderType)) {
        case 1:
          return '充值'
        case 2:
          return '订单'
        default:
          return '充值'
      }
    },
    appNameOK () {
      switch (parseInt(this.scope.row.status)) {
        case 0:
          return '待定'
        case 1:
          return '有效'
        case 2:
          return '无效'
        default:
          return '有效'
      }
    },
    o31 () {
      switch (parseInt(this.scope.row.status)) {
        case 0:
          return 'o32'
        case 1:
          return 'o3'
        case 2:
          return 'o32'
        default:
          return 'o32'
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scope>
.el-tag {
  width:100%;
  text-align:center;}
.el-table__fixed-right::before, .el-table__fixed::before {
    background-color: transparent !important;
}
.el-dialog__close:before {
    font-size: 28px !important;
    font-weight: bold;
    color: #f56c6c;
}
.o1{
  font-size: 22px;
  font-weight: bold;
  margin-top: 12px;
}
.o2{
  font-size: 18px;
  margin-top: 20px;
}
.o3{
  font-size: 20px;
  color: #67c23a;
}
.o32{
  font-size: 20px;
  color: #f56c6c;
}
.o6{
  margin-top: 28px;
}
</style>
