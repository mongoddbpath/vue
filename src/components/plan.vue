<template slot-scope='scope'>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <div style='font-size:15px;'>{{ plan }}</div>
          </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
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
  },
  computed: {
    plan () {
      if (this.scope.row.planName === false) {
        return this.scope.row.plan
      } else {
        return this.scope.row.planName
      }
    }
  },
  methods: {
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center

</style>
