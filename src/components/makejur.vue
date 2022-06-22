<template>
    <el-row>
      <el-tag effect="plain" @click="checkjur"
      style='font-size:15px;cursor: pointer;' type='danger'>配置网站权限</el-tag>
    </el-row>
</template>
<script>
export default {
  data () {
    return {

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
      // this.mountedOK()
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    checkjur () {
      this.$router.push({
        name: 'checkjur',
        path: 'checkjur',
        params: {
          id: this.scope.row.id,
          url: this.scope.row.url
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
