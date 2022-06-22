<template slot-scope="scope">
      <el-popover
        placement="right"
        title="点击该图片前往对应的模板站"
        trigger="hover">
        <img :src="scope.row.pic" alt='点击图片前往查看Demo站' @click="handleClick"/>
        <img slot="reference" :src="scope.row.pic" alt='点击图片前往查看Demo站'
        style="width:96px;height:136px;"
        target="_blank">
      </el-popover>
</template>

<script>
export default {
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
  mounted () {

  },
  methods: {
    handleClick () {
    //   this.$emit('tag', this.value)
      window.open(this.scope.row.demo, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
