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
      // value: true
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
      return this.scope.row.webstatus ? 'success' : 'danger'
    },
    text () {
      return this.scope.row.webstatus ? '已授权' : '未授权'
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      let h = this.$createElement
      let that = this
      let usernameinfo = this.scope.row.realName || this.scope.row.username
      const userstatus = this.type
      if (userstatus === 'success') {
        // console.log('groupnamey:' + getidentity(this.scope.row.group))
        let confirmWeb = `你正在解除【${usernameinfo}】
        对【${this.scope.row.siteurl}】的授权行为，
        解除授权之后该用户将无法操作该网站，你确定要这么做吗？`
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
            userDelSite(this.scope.row).then(res => {
              that.scope.row.webstatus = 0
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
        let confirmWeb = `你正在启用【${usernameinfo}】
        对【${this.scope.row.siteurl}】的授权行为，
        启用授权之后该用户将获得该网站的操作权限，你确定要这么做吗`
        let dweb = `你已成功
        启用【${this.scope.row.realName}】
        对【${this.scope.row.siteurl}】的授权`
        this.$confirm(
          confirmWeb,
          '启用授权',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 数据操作
            userAddSite(this.scope.row).then(res => {
              that.scope.row.webstatus = 1
              // 数据操作
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
