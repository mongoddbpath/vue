<template>
  <div style="cursor: pointer">
    <el-tag :type="type">{{ text }}</el-tag>
  </div>
</template>

<script>
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
      return this.scope.row.isSsl ? 'success' : 'danger'
    },
    text () {
      return this.scope.row.isSsl ? '启' : '否'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
