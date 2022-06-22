<template slot-scope="scope">
      <el-popover
        placement="top"
        width="166"
        title="点击下载该网站对应的附件,建站完成记得去修改订单状态哟"
        trigger="hover">
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag style='font-size:15px;' type='success' @click.native='handleClick'>点击下载附件</el-tag>
          </div>
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
      window.open('http://' + this.scope.row.faddress, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
