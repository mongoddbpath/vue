<template>
<div>
<el-row>
    <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='danger' @click="submitForm">审核</el-tag>
  </el-row>
</div>
</template>

<script>
import { checkrecharge } from '@api/checkrecharge'
export default {
  data () {
    return {
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
  mounted () {
    this.$util.authen(['null', 0, 2])
  },
  methods: {
    submitForm () {
      // 审核订单交易
      let h = this.$createElement
      let cuser = `【${this.scope.row.ordernum}】审核取消`
      // 审核订单交易
      let that = this
      let text = `你要审核的单号为：【${this.scope.row.ordernum},
      金额：${this.scope.row.rmb},公司：${this.scope.row.company}】`
      this.$confirm(text, '审核', {
        confirmButtonText: '确定审核',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        // 审核接口
        checkrecharge({ ordernum: this.scope.row.ordernum }).then(res => {
          if (res.code === 0) {
            this.$notify({
              title: '审核',
              type: 'success',
              duration: 7000,
              message: h('b', { style: 'color: teal' }, res.msg)
            })
            // 子组件触发父组件刷新
            that.$parent.$props.props.fetchData()
          } else {
            this.$notify({
              title: res.msg,
              type: 'danger',
              duration: 7000
            })
          }
        }).catch(err => {
          console.log('err', err)
        })
      }).catch(() => {
        this.$notify({
          title: '审核取消',
          type: 'info',
          message: h('b', { style: 'color: teal' }, cuser)
        })
      })
    }
  }
}
</script>

<style scope lang="stylus">
img
  cursor: pointer
.el-form-item__label
  font-size: 17px
  font-weight: bold
.form-view
  width: 400px
  margin: 0 auto
  margin-top:12px
  background-color: #9e9e9e4f
  padding: 10px
  border-radius: 10px
  min-height: calc(100vh - 200px)

@media screen and (max-width: 500px) {
  .form-view {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
