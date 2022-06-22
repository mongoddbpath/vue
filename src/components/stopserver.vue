<template>
  <el-row>
    <el-button v-if="this.$util.checkjur2(['null', 0])" :type="type" @click.native="handleClick">{{ text }}</el-button>
  </el-row>
</template>

<script>
// import { addssl } from '@api/addssl'
// import { delssl } from '@api/delssl'
export default {
  data () {
    return {
      isSsl: true
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
    }
  },
  computed: {
    type () {
      // eslint-disable-next-line
      return this.isSsl ? 'success' : 'danger'
    },
    text () {
      // eslint-disable-next-line
      return this.isSsl ? '启' : '停'
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      let h = this.$createElement
      const webstatus = this.type
      if (webstatus === 'success') {
        let confirmWeb = `你正在停用【${this.scope.row.ip}】服务器，你确定要这么做吗？`
        let dweb = `你已成功停用【${this.scope.row.ip}】服务器`
        this.$confirm(
          confirmWeb,
          '停用服务器',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 停用服务器的操作
            this.$notify({
              title: '停用服务器',
              duration: 6000,
              type: 'success',
              message: h('b', { style: 'color: teal' }, dweb)
            })
            this.isSsl = !this.isSsl
          })
          .catch(() => {})
      } else {
        let confirmWeb2 = `你正在开启【${this.scope.row.ip}】服务器，你确定要这么做吗？`
        let dweb2 = `你已成功开启【${this.scope.row.ip}】服务器`
        this.$confirm(
          confirmWeb2,
          '开启服务器',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }
        )
          .then(() => {
            // 添加SSL操作
            // addssl(this.scope.row.id).then(res => {
            this.$notify({
              title: '开启服务器',
              duration: 6000,
              type: 'success',
              message: h('b', { style: 'color: teal' }, dweb2)
            })
            // this.$emit('input', !this.isSsl)
            this.isSsl = !this.isSsl
            // }).catch(() => {
            //   this.$notify({
            //     message: `添加SSL失败`
            //   })
            // })
          })
          .catch(() => {})
      }

      // 以上
    }

    // 以上
  }
  // if(this.type == 'success')
  // this.$emit('input', !this.isSsl)
  // console.log(this.scope)
}
</script>
