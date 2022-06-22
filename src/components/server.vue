<template>
  <div style="cursor: pointer">
    <el-tag :type="type">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: '',
      value: true,
      statusok: this.scope.row.status,
      text: '' }
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
    // type () {
    //   return this.value ? 'success' : 'danger'
    // },
    // text () {
    //   return this.value ? '使用中' : '异常'
    // }
  },
  // watch监听数据的变化并支持操作
  watch: {
    scope () {
      if (this.scope.row.status === 0) {
        this.text = '配置中'
        this.type = 'info'
      } else if (this.scope.row.status === 1) {
        this.text = '使用中'
        this.type = 'success'
      } else if (this.scope.row.status === 2) {
        this.text = '存档'
        this.type = 'danger'
      } else if (this.scope.row.status === 3) {
        this.text = '废弃'
        this.type = 'danger'
      }
    }
  },
  mounted () {
    this.ok()
  },
  methods: {
    ok () {
      if (this.statusok === 0) {
        this.text = '配置中'
        this.type = 'info'
      } else if (this.statusok === 1) {
        this.text = '使用中'
        this.type = 'success'
      } else if (this.statusok === 2) {
        this.text = '存档'
        this.type = 'danger'
      } else if (this.statusok === 3) {
        this.text = '废弃'
        this.type = 'danger'
      }
    }
  }
}
</script>
