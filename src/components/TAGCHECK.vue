<template slot-scope='scope'>
<!-- <el-popover
    placement="left-end"
    trigger="hover">
    <p>强制HTTPS,<br>图标为绿色</p> -->
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag style='font-size:15px;' :type="eltagtype" effect="plain" @click="https">{{ appNameOK }}</el-tag>
          </div>
    <!-- </el-popover> -->
</template>
<script>
import { addssl } from '@api/addssl'
import { delssl } from '@api/delssl'
export default {
  data () {
    return {
      appNameOK: '',
      eltagtype: ''
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
  // watch监听数据的变化并支持操作
  watch: {
    scope () {
      if (this.scope.row.appName === 'site') {
        this.appNameOK = '企业站'
        // this.eltagtype = 'warnning'
      } else {
        this.appNameOK = '竞价站'
        // this.eltagtype = 'success'
      }
      if (parseInt(this.scope.row.isSsl) === 1) {
        this.eltagtype = 'success'
      } else {
        this.eltagtype = ''
      }
    }
  },
  mounted () {
    if (this.scope.row.appName === 'site') {
      this.appNameOK = '企业站'
      // this.eltagtype = 'warnning'
    } else {
      this.appNameOK = '竞价站'
      // this.eltagtype = 'success'
    }
    if (parseInt(this.scope.row.isSsl) === 1) {
      this.eltagtype = 'success'
    }
  },
  methods: {
    // 强制Https操作
    https () {
      let h = this.$createElement
      if (parseInt(this.scope.row.isSsl) === 0 && this.scope.row.appName === 'site') {
        this.$confirm(
          '',
          {
            title: this.scope.row.url,
            message: '你的网站正在从【HTTP】转为强制【HTTPS】',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 强制HTTPS操作
          addssl(this.scope.row.id).then(res => {
            let dweb2 = `你已成功开启【${this.scope.row.url}】的强制HTTPS`
            // console.dir(res.code)
            if (res.code === 0) {
              this.scope.row.isSsl = 1
              this.$notify({
                title: '强制HTTPS',
                duration: 6000,
                type: 'success',
                message: h('b', { style: 'color: teal' }, dweb2)
              })
            } else {
              this.$notify({
                message: `强制HTTPS失败`
              })
            }
          }).catch(() => {
            this.$notify({
              message: `强制HTTPS失败`
            })
          })
          this.eltagtype = 'success'
        }).catch(() => {})
      } else if (parseInt(this.scope.row.isSsl) === 1 && this.scope.row.appName === 'site') {
        this.$confirm(
          '',
          {
            title: this.scope.row.url,
            message: '你的网站正在关闭强制【HTTPS】',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 取消强制HTTPS操作
          delssl(this.scope.row.id).then(res => {
            let dweb = `你已成功关闭【${this.scope.row.url}】的强制HTTPS`
            if (res.code === 0) {
              this.scope.row.isSsl = 0
              this.$notify({
                title: '关闭强制HTTPS',
                duration: 6000,
                type: 'success',
                message: h('b', { style: 'color: teal' }, dweb)
              })
            } else {
              this.$notify({
                message: `关闭强制HTTPS失败`
              })
            }
          }).catch(() => {
            this.$notify({
              message: `关闭强制HTTPS失败`
            })
          })
          this.eltagtype = ''
        }).catch(() => {})
      }
    },
    mountedOK () {
      if (this.scope.row.appName === 'site') {
        this.appNameOK = '企业站'
        // this.eltagtype = 'warnning'
      } else {
        this.appNameOK = '竞价站'
        // this.eltagtype = 'success'
      }
      if (parseInt(this.scope.row.isSsl) === 1) {
        this.eltagtype = 'success'
      }
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center

</style>
