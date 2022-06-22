<template>
<el-tooltip placement="left">
  <div slot="content">
  磁盘总量：{{ total }}<br/><br/>
  剩余总量：{{ free }}<br/><br/>
  剩余磁盘：{{ used }}%</div>
  <div style="cursor: pointer">
    <el-tag :type="type">磁盘:{{ (100-used).toFixed(2) }}%&nbsp;&nbsp;cpu: 10%</el-tag>
  </div></el-tooltip>
</template>

<script>
// eslint-disable-next-line
import axios from 'axios'
export default {
  data () {
    return {
      type: '',
      total: '',
      free: '',
      used: '',
      text: ''
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
    // type () {
    //   return this.value ? 'success' : 'danger'
    // },
    // text () {
    //   return this.value ? '正常' : '异常'
    // }
  },
  // watch监听数据的变化并支持操作
  watch: {
    scope () {
    }
  },
  mounted () {
    this.ok()
  },
  methods: {
    ok () {
      let urlok = `http://${this.scope.row.ip}/DiskCheck.php`
      let url1 = { url: urlok }
      let url = 'http://api.21cl.cn/getdata.php'
      let that = this
      axios.post(url, url1)
        .then(function (res) {
          let total = res.data.disk1
          let free = res.data.disk2
          let used = ((parseInt(free) / parseInt(total)) * 100).toFixed(2)
          that.text = used + '%'
          used < 20 ? that.type = 'danger' : that.type = 'success'
          that.total = total
          that.free = free
          that.used = used
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
