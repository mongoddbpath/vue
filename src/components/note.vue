<template slot-scope='scope'>
  <el-popover
    placement="left"
    width="200"
    trigger="click">
    <p>域名：{{ this.scope.row.url}}</p>
    <p>公司名：{{ this.scope.row.company}}</p>
    <p>套餐：{{ this.scope.row.planName === false ? this.scope.row.plan:this.scope.row.planName}}</p>
    <p>所属：{{ this.scope.row.user}}</p>
    <p>维护：{{''}}</p>
    <p>业务员：{{ this.scope.row.ywy}}</p>
    <p>开站时间：{{ this.scope.row.startTime}}</p>
    <p>到期时间：{{ this.scope.row.endTime}}</p>
    <p prop='customer' v-if="this.$util.checkjur2(['null', 0])">初始账号：admin</p>
    <p prop='customer' v-if="this.$util.checkjur2(['null', 0])">初始密码：{{ this.scope.row.db_pass }}</p>
    <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='success'>详情</el-tag>
    </div>
    </el-popover>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  // watch监听数据的变化并支持操作
  watch: {
    value () {
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
  computed: {
  },
  mounted () {

  },
  methods: {
    handleClick () {
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center

</style>
