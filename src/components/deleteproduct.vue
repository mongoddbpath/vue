<template>
<div>
<el-row>
    <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='danger' @click="submitForm">删除</el-tag>
  </el-row>
</div>
</template>

<script>
import { productdelete } from '@api/productdelete'
export default {
  data () {
    return {
    }
  },
  props: {
    // value: {
    //   type: Boolean,
    //   require: true
    // },
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    },
    fetchData: {
      default: null
    }
  },
  mounted () {
    this.$util.authen(['null', 0, 2])
  },
  methods: {
    submitForm () {
      // 删除订单交易
      let h = this.$createElement
      let cuser = `产品【${this.scope.row.name}】删除取消`
      // 删除订单交易
      let text = `你要删除的产品为：【${this.scope.row.name}】`
      this.$confirm(text, '删除', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        productdelete(this.scope.row.id).then(res => {
          if (res.code === 0) {
            this.$notify({
              title: '产品删除',
              type: 'success',
              duration: 7000,
              message: h('b', { style: 'color: teal' }, res.msg)
            })
            this.fetchData()
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
          title: '产品删除取消',
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
