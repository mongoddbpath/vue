<template>
  <div style="cursor: pointer">
    <div v-bind:class="[activeClass]">{{ text }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // statusok: '运行中'
    }
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
    text () {
      let textval = '运行中'
      let text1 = parseInt(this.scope.row.status)
      if (text1 === 1) {
        textval = '待审核'
      } else if (text1 === 2) {
        textval = '已审核'
      } else if (text1 === 3) {
        textval = '欠费'
      } else if (text1 === 0) {
        textval = '已审核'
      }
      return textval
    },
    activeClass () {
      let activeClassval = 'st1'
      let text2 = parseInt(this.scope.row.status)
      if (text2 === 1) {
        activeClassval = 'st2'
      } else if (text2 === 2) {
        activeClassval = 'st1'
      } else if (text2 === 3) {
        activeClassval = 'st3'
      } else if (text2 === 0) {
        activeClassval = 'st4'
      }
      return activeClassval
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
.st1:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #00A854;
    vertical-align: middle;
    margin-right: 7px;
    border-radius: 8px;
}
.st2:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #F04134;
    vertical-align: middle;
    margin-right: 7px;
    border-radius: 8px;
}
.st3:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #0E77D1;
    vertical-align: middle;
    margin-right: 7px;
    border-radius: 8px;
}
.st4:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #e6a23c;
    vertical-align: middle;
    margin-right: 7px;
    border-radius: 8px;
}
.st5:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #FFBF00;
    vertical-align: middle;
    margin-right: 7px;
    border-radius: 8px;
}
</style>
