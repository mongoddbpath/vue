<template slot-scope='scope'>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <div style='font-size:15px;' class="ok1">{{ company }}</div>
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
  computed: {
    company () {
      return this.scope.row.company ? this.scope.row.company : this.scope.row.url
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scope>
.ok1{
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
