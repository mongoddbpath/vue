<template slot-scope='scope'>
<!-- <el-popover trigger="click" placement='left-end'>
              <p>{{username}}</p>
              <p>{{company}}</p> -->
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <div style='font-size:15px;'>{{ username }}</div>
          </div>
    <!-- </el-popover> -->
</template>
<script>
import { getuserinfo } from '@api/getuserinfo'
export default {
  data () {
    return {
      username: '',
      company: ''
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
    getuserinfo(parseInt(this.scope.row.account)).then(res => {
      // console.dir(res)
      this.username = res.username
      this.company = res.company
    }).catch(err => {
      console.log('err', err)
    })
  },
  computed: {
    // appNameOK () {
    //   switch (parseInt(this.scope.row.type)) {
    //     case 1:
    //       return '充值'
    //     case 2:
    //       return '支出'
    //     default:
    //       return '支出'
    //   }
    // }
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
