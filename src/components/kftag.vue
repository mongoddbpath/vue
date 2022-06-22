<template slot-scope='scope'>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <div style='font-size:15px;' class="ok">{{ username }}</div>
          </div>
</template>
<script>
import { getuserinfo } from '@api/getuserinfo'
export default {
  data () {
    return {
      username: ''
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
  // 监听
  watch: {
    scope () {
      let kfnum = parseInt(this.scope.row.kf)
      if (kfnum > 1) {
        getuserinfo(kfnum).then(res => {
          this.username = res.username
        }).catch(err => {
          console.log('err', err)
        })
      } else {
        this.username = this.scope.row.kf
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center
.ok{
  width: 100px;
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
