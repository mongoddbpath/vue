<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
  </div>
</template>

<script>
import { disable } from '@api/disable'
import { getidentity } from '@/plugin/commonfuc/getidentity'
export default {
  data () {
    return {
      value: true,
      stdata: {
        id: this.scope.row.id
      }
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
      return this.scope.row.status ? 'success' : 'danger'
    },
    text () {
      return this.scope.row.status ? '启用' : '禁用'
    }
  },
  watch: {
    'type': () => {
      return this.scope.row.status ? 'success' : 'danger'
    },
    'text': () => {
      return this.scope.row.status ? '启用' : '禁用'
    }
  },
  mounted () {
    // this.scope.row.status = this.scope.row.status
  },
  methods: {
    handleClick () {
      let h = this.$createElement
      const userstatus = this.type
      if (userstatus === 'success') {
        // console.log('groupnamey:' + getidentity(this.scope.row.group))
        let confirmWeb = `你正在禁用【${this.scope.row.username}】【${getidentity(this.scope.row.group)}】，禁用之后将无法登录，你确定要这么做吗？`
        let dweb = `你已成功禁用【${this.scope.row.username}】【${getidentity(this.scope.row.group)}】`
        this.$confirm(
          confirmWeb,
          '禁用',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 数据操作
            this.stdata.status = 0
            disable(this.stdata).then(res => {
              this.scope.row.status = 0
            }).catch(err => {
              console.log('err', err)
              this.loading = false
              this.$notify({
                message: `接口失败`
              })
            })
            // 数据操作
            this.$notify({
              title: '禁用',
              duration: 6000,
              type: 'error',
              message: h('b', { style: 'color: teal' }, dweb)
            })
            // this.$emit('input', !this.scope.row.status)
            this.scope.row.status = !this.scope.row.status
          })
          .catch(() => {})
      } else {
        // 前后端数据操作
        this.stdata.status = 1
        disable(this.stdata).then(res => {
          this.scope.row.status = 1
        }).catch(err => {
          console.log('err', err)
          this.loading = false
          this.$notify({
            message: `接口失败`
          })
        })
        let openweb = `你已经启用【${this.scope.row.username}】【${getidentity(this.scope.row.group)}】服务`
        this.$notify({
          title: '启用服务',
          duration: 6000,
          type: 'success',
          message: h('b', { style: 'color: teal' }, openweb)
        })
        this.scope.row.status = !this.scope.row.status
      }
    }
  }
}
</script>
