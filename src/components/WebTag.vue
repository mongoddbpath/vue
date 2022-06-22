<template>
  <el-row>
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
  </el-row>
</template>

<script>
import { addssl } from '@api/addssl'
import { delssl } from '@api/delssl'
export default {
  data () {
    return {}
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
    }
  },
  computed: {
    type () {
      // eslint-disable-next-line
      if (parseInt(this.scope.row.isSsl) == false) {
        // eslint-disable-next-line
        this.scope.row.isSsl = 0
      }
      return this.scope.row.isSsl ? 'success' : 'info'
    },
    text () {
      return this.scope.row.isSsl ? '启' : '否'
    }
  },
  mounted () {
    // console.log(this.scope)
    // console.log(this.myProps)
    // console.log(this.scope.row.url);
  },
  methods: {
    handleClick () {
      let h = this.$createElement
      const webstatus = this.type
      if (webstatus === 'success') {
        let confirmWeb = `你正在关闭【${this.scope.row.url}】网站SSL服务，HTTPS服务将会变成
        HTTP服务，安全性会降低，你确定要这么做吗？`
        let dweb = `你已成功关闭【${this.scope.row.url}】的网站SSL服务`
        this.$confirm(
          confirmWeb,
          '关闭网站SSL服务',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 删除SSL的操作
            delssl(this.scope.row.id).then(res => {
              this.$notify({
                title: '关闭网站SSL服务',
                duration: 6000,
                type: 'danger',
                message: h('b', { style: 'color: teal' }, dweb)
              })
              // this.$emit('input', !this.scope.row.isSsl)
              this.scope.row.isSsl = !this.scope.row.isSsl
            }).catch(() => {
              this.$notify({
                message: `关闭SSL失败`
              })
            })
            // 数据操作
            // this.$emit('input', !this.scope.row.isSsl)
            this.scope.row.isSsl = !this.scope.row.isSsl
          })
          .catch(() => {})
      } else {
        let confirmWeb2 = `【${this.scope.row.url}】网站HTTP服务将会强制变成
        HTTPS服务，你确定要这么做吗？`
        let dweb2 = `你已成功开启【${this.scope.row.url}】的网站SSL服务`
        this.$confirm(
          confirmWeb2,
          '强制网站HTTPS服务',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }
        )
          .then(() => {
            // 添加SSL操作
            addssl(this.scope.row.id).then(res => {
              this.$notify({
                title: '强制网站HTTPS服务',
                duration: 6000,
                type: 'success',
                message: h('b', { style: 'color: teal' }, dweb2)
              })
              // this.$emit('input', !this.scope.row.isSsl)
              this.scope.row.isSsl = !this.scope.row.isSsl
            }).catch(() => {
              this.$notify({
                message: `添加SSL失败`
              })
            })
          })
          .catch(() => {})
      }

      // 以上
    }

    // 以上
  }
  // if(this.type == 'success')
  // this.$emit('input', !this.scope.row.isSsl)
  // console.log(this.scope)
}
</script>
