<template>
<el-tag style='font-size:15px;cursor: pointer;' type='info' @click.native='handleClick'>{{ weburl }}</el-tag>
<!-- 修改 -->
</template>
<script>
import { weblogin } from '@api/webSiteLogin'
export default {
  data () {
    return {
      tipmessage: `后台初始账号：admin 密码：${this.scope.row.db_pass}`,
      // message: `临时域名后台账号：admin 密码：${this.scope.row.db_pass}`
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
    value () {
      this.mountedOK()
    }
  },
  computed: {
  },
  mounted () {
    if (this.scope.row.appName === 'site') {
      this.weburl = this.scope.row.url
    } else {
      this.weburl = `/${this.scope.row.name}`
    }
  },
  methods: {
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
    handleClick () {
      if (this.scope.row.appName === 'site') {
        window.open(`http://${this.scope.row.url}`)
      } else {
        window.open(`http:///${this.scope.row.name}`)
      }
    },
    mountedOK () {
      if (this.scope.row.appName === 'site') {
        this.weburl = this.scope.row.url
      } else {
        this.weburl = `/${this.scope.row.name}`
      }
    },
    toIndex () {
      if (this.scope.row.appName === 'site') {
        window.open(`http://${this.scope.row.url}`)
      } else {
        window.open(`http:///${this.scope.row.name}`)
      }
    },
    toHotTai () {
      let h = this.$createElement
      let webid = this.scope.row.id
      weblogin(webid).then(res => {
        if (res.status === 'error') {
          this.$notify({
            title: '登录后台失败',
            type: 'error',
            message: h('b', { style: 'color: teal' }, '请稍后再试')
          })
        } else {
          window.open(res[res.length - 1])
        }
      }).catch(() => {
        this.$notify({
          title: '登录后台失败',
          type: 'error',
          message: h('b', { style: 'color: teal' }, '请稍后再试')
        })
      })
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
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center
</style>
