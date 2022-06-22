<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
  </div>
</template>

<script>
// 添加用户授权
import { userAddSite } from '@api/userAddSite'
// 删除用户授权
import { userDelSite } from '@api/userDelSite'
export default {
  data () {
    return {
    }
  },
  props: {
    scope: {
      default: null
    },
    myProps: {
      default: null
    }
  },
  computed: {
    type () {
      return this.scope.row.origincheck ? 'success' : 'danger'
    },
    text () {
      return this.scope.row.origincheck ? '已授权' : '未授权'
    }
  },
  mounted () {
  },
  methods: {
    handleClick2 () {
      // console.dir(this.scope.row)
    },
    handleClick () {
      let h = this.$createElement
      let that = this
      let usernameinfo = this.scope.row.realName || this.scope.row.username
      const userstatus = this.type
      if (userstatus === 'success') {
        let confirmWeb = `你正在解除【${usernameinfo}】
        对【${this.scope.row.siteurl}】的专属授权行为，
        解除之后站点信息会同步注销该用户信息，你确定要这么做吗？`
        let dweb = `你已成功
        解除【${this.scope.row.realName}】
        对【${this.scope.row.siteurl}】的授权`
        this.$confirm(
          confirmWeb,
          '解除授权',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 数据操作
            this.scope.row.origincheckok = 1
            userDelSite(this.scope.row).then(res => {
              that.scope.row.origincheck = false
            }).catch(err => {
              console.log('err', err)
              this.loading = false
              this.$notify({
                message: `接口失败`
              })
            })
            // 数据操作
            this.$notify({
              title: '解除授权成功',
              duration: 6000,
              type: 'error',
              message: h('b', { style: 'color: teal' }, dweb)
            })
          })
          .catch(() => {})
      } else {
        // 前后端数据操作
        let confirmWeb = `【${this.scope.row.siteurl}】是否是
        【${usernameinfo}】【${this.scope.row.company}】客户的站点？
        执行该操作之后站点信息(所属和公司名)会同步更新为该客户信息，你确定要这么做吗`
        let dweb = `你已成功
        启用【${usernameinfo}】
        对【${this.scope.row.siteurl}】的专属授权`
        this.$confirm(
          confirmWeb,
          '专属授权',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 数据操作
            this.scope.row.origincheckok = 1
            userAddSite(this.scope.row).then(res => {
              // 数据操作
              that.scope.row.origincheck = true
              this.$notify({
                title: '启用授权成功',
                duration: 6000,
                type: 'success',
                message: h('b', { style: 'color: teal' }, dweb)
              })
            }).catch(err => {
              console.log('err', err)
              this.loading = false
              this.$notify({
                message: `接口失败`
              })
            })
          })
          .catch(() => {})
      }
    }
  }
}
</script>
