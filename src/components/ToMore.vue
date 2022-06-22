<template>
<el-popover trigger="hover" placement='left'>
          <el-row>
          <el-button v-if="this.scope.row.appName !== 'dirSite' && this.$util.checkjur2(['null', 0,2])"
          type="primary" @click="tochangefile">
            编辑文件</el-button>
          </el-row>
          <el-row>
          <el-button v-if="this.$util.checkjur2(['null', 0,2])"
          type="primary" @click="checkjur" style="margin-top:8px;">
            网站授权</el-button>
          </el-row>
          <el-row>
            <el-button v-if="this.scope.row.appName === 'dirSite'" type="primary" @click="CheckPhone" style="margin-top:8px;">
            通话记录</el-button>
          </el-row>
          <el-row>
            <el-button v-if="this.$util.checkjur2(['null', 0,1,2])" style="margin-top:8px;" type="primary" @click="open">
              网站续费</el-button>
          </el-row>
          <el-row>
          <el-button v-if="this.$util.checkjur2(['null', 0,2])" style="margin-top:8px;"
          :type="type" @click="handleClick">{{ text }}</el-button>
          </el-row>
          <el-row>
          <el-button v-if="this.scope.row.appName !== 'dirSite' && this.$util.checkjur2(['null', 0])"
          type="primary" @click="tochangefile2" style="margin-top:8px;">
            域名配置</el-button>
          </el-row>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='success'>更多</el-tag>
          </div>
        </el-popover>
<!-- 修改 -->
</template>
<script>
// 站点服务开启
import { startSite } from '@api/startSite'
// 站点服务关闭
import { stopSite } from '@api/stopSite'
export default {
  data () {
    return {
      message: `通过点击该处按钮可一键登录后台`,
      weburl: ''
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
    scope () {
      this.mountedOK()
    }
  },
  computed: {
    type () {
      return parseInt(this.scope.row.status) === 1 ? 'primary' : 'success'
    },
    text () {
      return parseInt(this.scope.row.status) === 1 ? '关闭站点' : '开启站点'
    }
  },
  mounted () {
    if (this.scope.row.appName === 'site') {
      this.weburl = this.scope.row.url
    } else {
      this.weburl = `ztb.net/${this.scope.row.name}`
    }
  },
  methods: {
    open () {
      const h = this.$createElement
      let xufei = `【${this.scope.row.url}】网站要续费的年份数(请输入一个正整数)`
      this.$prompt(xufei, '服务续费', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(0|[1-9]\d*)$/,
        inputErrorMessage: '续费年份数格式不正确'
      }).then(({ value }) => {
        let renewmessage = `您的【${this.scope.row.url}】网站服务要续费的年份数是【${value}年】,
        请确定`
        let renewsuccess = `您的【${this.scope.row.url}】网站服务要续费的年份数是【${value}年】,
        感谢您对我司的信任和支持`
        this.$confirm(renewmessage, '续费确定', {
          confirmButtonText: '确定续费',
          cancelButtonText: '取消续费',
          type: 'success'
        }).then(() => {
          // 续费接口
          this.$notify({
            title: '续费成功',
            type: 'success',
            duration: 0,
            message: h('b', { style: 'color: teal' }, renewsuccess)
          })
        }).catch(() => {
          this.$notify({
            title: '续费',
            type: 'info',
            message: h('b', { style: 'color: teal' }, '续费取消')
          })
        })
      }).catch(() => {
        this.$notify({
          title: '续费',
          type: 'info',
          message: h('b', { style: 'color: teal' }, '续费取消')
        })
      })
    },
    checkjur () {
      this.$router.push({
        name: 'checkjur',
        path: 'checkjur',
        params: {
          id: this.scope.row.id,
          url: this.scope.row.url
        }
      })
    },
    CheckPaiming () {
      this.$router.push({
        name: 'paiming',
        path: 'paiming',
        params: { url: this.scope.row.url }
      })
    },
    CheckPhone () {
      this.$router.push({
        name: 'phone',
        path: 'phone',
        params: {
          note: this.scope.row.note,
          name: this.scope.row.name }
      })
    },
    mountedOK () {
      if (this.scope.row.appName === 'site') {
        this.weburl = this.scope.row.url
      } else {
        this.weburl = `ztb.net/${this.scope.row.name}`
      }
    },
    toIndex () {
      if (this.scope.row.appName === 'site') {
        window.open(`http://${this.scope.row.url}`)
      } else {
        window.open(`http://ztb.net/${this.scope.row.name}`)
      }
    },
    tochangefile () {
      this.$router.push({
        name: 'changefile',
        path: 'changefile',
        params: {
          url: this.scope.row.url,
          id: this.scope.row.id
        }
      })
    },
    tochangefile2 () {
      this.$router.push({
        name: 'changefile',
        path: 'changefile',
        params: {
          url: this.scope.row.url,
          id: this.scope.row.id,
          is_nginx: 1
        }
      })
    },
    // 站点状态的启停
    handleClick () {
      let h = this.$createElement
      if (parseInt(this.scope.row.status) === 2 && this.scope.row.appName === 'site') {
        this.$confirm(
          '',
          {
            title: this.scope.row.url,
            message: '你正在开启网站服务',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 开启站点操作
          startSite(this.scope.row.id).then(res => {
            let dweb2 = `你已成功开启【${this.scope.row.url}】的站点`
            // console.dir(res.code)
            if (res.code === 0) {
              this.scope.row.status = 1
              this.$notify({
                title: '开启站点',
                duration: 6000,
                type: 'success',
                message: h('b', { style: 'color: teal' }, dweb2)
              })
            } else {
              this.$notify({
                message: `开启站点失败`
              })
            }
          }).catch(() => {
            this.$notify({
              message: `开启站点失败`
            })
          })
        }).catch(() => {})
      } else if (parseInt(this.scope.row.status) === 1 && this.scope.row.appName === 'site') {
        this.$confirm(
          '',
          {
            title: this.scope.row.url,
            message: '你正在停用站点',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 停用站点
          stopSite(this.scope.row.id).then(res => {
            let dweb = `你已成功关闭【${this.scope.row.url}】站点`
            if (res.code === 0) {
              this.scope.row.status = 2
              this.$notify({
                title: '停用站点',
                duration: 6000,
                type: 'success',
                message: h('b', { style: 'color: teal' }, dweb)
              })
            } else {
              this.$notify({
                message: `停用站点失败`
              })
            }
          }).catch(() => {
            this.$notify({
              message: `停用站点失败`
            })
          })
        }).catch(() => {})
      }
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center
.el-popover
  min-width: auto !important
</style>
