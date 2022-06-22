<template>
<div>
    <el-row>
      <el-tag effect="plain"  @click="CheckPaiming"
      style='font-size:15px;cursor: pointer;' type='success'>排名</el-tag>
    </el-row>
    <!-- 排名dialog -->
  <el-dialog fullscreen :title="title" :visible.sync="dialogVisible" :modal="false">
    <iframe style="width: 100%;min-height:90vh;" frameborder='0'
              scrolling='auto' :src="iframeurl" />
  </el-dialog>
    <!-- 排名dialog -->
</div>
</template>
<script>
// eslint-disable-next-line
import axios from 'axios'
export default {
  data () {
    return {
      iframeurl: '',
      dialogVisible: false
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
  // 子组件的更新需要依靠watch来实现监听与操作
  watch: {
    value () {
    }
  },
  computed: {
    title () {
      return `【${this.scope.row.url}】关键词排名情况`
    }
  },
  mounted () {
  },
  methods: {
    // 获取数据
    fetchData () {
      let that = this
      this.loading = true
      let code = 'http://api.21cl.cn/paiming.php'
      axios.post(code, { url: this.scope.row.url })
        .then(function (res) {
          let id = parseFloat(res.data)
          that.iframeurl = 'http://info.chuangli.net//index.php/Home/Index/paiming/wid/' + id
          // console.log(that.iframeurl)
        }).catch(function (error) {
          console.log(error)
        })
    },
    CheckPaiming () {
      if (this.scope.row.appName !== 'dirSite') {
        // this.$router.push({
        //   name: 'paiming',
        //   path: 'paiming',
        //   params: { url: this.scope.row.url }
        // })
        this.dialogVisible = true
        this.fetchData()
      } else {}
    }
  }
}
</script>
<style scope>
.el-tag {
  width:100%;
  text-align:center;}
.el-table__fixed-right::before, .el-table__fixed::before {
    background-color: transparent !important;
}
.el-dialog__close:before {
    font-size: 28px !important;
    font-weight: bold;
    color: #f56c6c;
}
</style>
