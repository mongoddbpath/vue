<template>
<d2-container>
<template slot='header'><b style="font-size:18px;">【{{data.url}}】</b>网站排名情况</template>
  <d2-container-frame :src="iframeurl" />
  待添加...
</d2-container>
</template>
<script>
// eslint-disable-next-line
import axios from 'axios'
export default {
  mounted () {
    this.fetchData()
    // this.info.password = this.text
    // 测试分类型
  },
  data  () {
    return {
      data: { url: this.$route.params.url },
      iframeurl: ''
    }
  },
  methods: {
    // 获取数据
    fetchData () {
      let that = this
      this.loading = true
      let code = 'http://api.21cl.cn/paiming.php'
      axios.post(code, that.data)
        .then(function (res) {
          let id = parseFloat(res.data)
          that.iframeurl = 'http://info.chuangli.net//index.php/Home/Index/paiming/wid/' + id
        }).catch(function (error) {
          console.log(error)
        })
    } }
}
</script>
<style scope lang='stylus'>
.d2-container-full {
    right: 0px !important;
}
</style>
