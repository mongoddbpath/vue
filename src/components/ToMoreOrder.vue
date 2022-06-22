<template>
<el-popover trigger="click" placement='left-end'>
          <el-row>
            <el-button v-if="this.$util.checkjur2(['null', 0,2])" type="primary">
              疑惑反馈</el-button>
          </el-row>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='success'>更多</el-tag>
          </div>
        </el-popover>
<!-- 修改 -->
</template>
<script>
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
    }
  },
  computed: {
    text () {
      return this.scope.row.status === 1 ? '状态：启' : '状态：停'
    }
  },
  mounted () {
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
