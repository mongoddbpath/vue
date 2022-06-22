<template>
  <div style="cursor: pointer">
    <el-tag :type='type'>{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      // 暂时
      // type: Number,
      require: true
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
  mounted () {
    // console.log(this.scope)
    // console.log(this.myProps)
    // console.log(this.scope.row.name);
  },
  computed: {
    type () {
      return this.scope.row.money === this.scope.row.cmoney ? 'success' : 'danger'
    },
    text () {
      return this.scope.row.money === this.scope.row.cmoney ? '是' : '否'
    }
  },
  watch: {
    'type': () => {
      return this.scope.row.money === this.scope.row.cmoney ? 'success' : 'danger'
    },
    'text': () => {
      return this.scope.row.money === this.scope.row.cmoney ? '是' : '否'
    }
  }
}
</script>
