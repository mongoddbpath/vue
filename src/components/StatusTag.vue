<template>
<el-popover trigger="hover" placement='left'>
          <el-row>
          <el-button type="primary" @click="open2">
              临时登录</el-button>
          </el-row>
          <el-row>
          <el-button style="margin-top:8px;"
          type="primary" @click="openok">
            临时访问</el-button>
          </el-row>
  <div style="cursor: pointer" slot='reference' class='name-wrapper'>
    <div v-bind:class="[activeClass]">{{ text }}</div>
  </div>
</el-popover>
</template>

<script>
import { weblogin } from '@api/webSiteLogin'
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
        textval = '运行中'
      } else if (text1 === 2) {
        textval = '停用中'
      } else if (text1 === 3) {
        textval = '欠费'
      } else if (text1 === 0) {
        textval = '部署中'
      }
      return textval
    },
    activeClass () {
      let activeClassval = 'st1'
      let text2 = parseInt(this.scope.row.status)
      if (text2 === 1) {
        activeClassval = 'st1'
      } else if (text2 === 2) {
        activeClassval = 'st2'
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
    open2 () {
      let h = this.$createElement
      let webid = this.scope.row.id
      let url2 = this.scope.row.url
      let url1 = `${this.scope.row.url}.ztb.net`
      weblogin(webid).then(res => {
        let urlres = res.replace(url2, url1)
        console.dir(res)
        console.dir(urlres)
        window.open(urlres)
      }).catch(() => {
        this.$notify({
          title: '登录后台失败',
          type: 'error',
          message: h('b', { style: 'color: teal' }, '请稍后再试')
        })
      })
    },
    openok () {
      let url = `http://${this.scope.row.url}.ztb.net`
      window.open(url)
    }
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
