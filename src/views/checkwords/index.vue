<template>
<d2-container>
  <template slot="header">站拓宝百度竞价智能选词，输入关键词一搜即达
    <div class="info1 info2"><b>{{`您选择的词语总数为：${this.value.length}`}}</b></div>
    <br>
  <div class="warning1"><b>选词请注意：(百度禁止行业、品牌词或其他不能上线推广的词语请不要选择)</b></div>
  <div>在关键词前面加上地区会更加准确，比如要搜索的是：<b class="info1">PVC板</b></div>
  <div class="warning1"><b>输入：广州PVC板 搜索结果会更准确</b></div>
  <div class="success">具体的选词结果请在底部复制然后发给我们的业务员</div>
  </template>
  <div class="m-home">
    <el-card class="m-box-card card1" shadow="hover">
    <el-row :gutter="20">
    <el-col :span="12">
          <el-input v-model="baseinfo.keyword" placeholder="请输入您要查询的竞价关键词"></el-input><br>
      </el-col>
      <el-col :span="1">
          <el-button type="success" round
          @keyup.enter.native="getdata"
          @click="getdata">点击查询</el-button>
      </el-col>
    </el-row>
    </el-card>
    <el-card class="m-box-card card1" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="24">
  <el-transfer
    v-model="value"
    v-loading="loading"
    :titles="['选词搜索结果', '您选择的词语']"
    :button-texts="['移除', '添加']"
    filterable
    filter-placeholder="请输入关键词进行筛选"
    :data="data">
    <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
    <!-- <el-button class="transfer-footer" slot="right-footer"
    @click="savedata"
    size="small">点击保存</el-button> -->
  </el-transfer>
      </el-col>
    </el-row>
    </el-card>
    <el-card class="card2">
      <el-row>
        <el-input
  type="textarea"
  placeholder="百度竞价选词"
  :value="this.value.toString().replace( /[,]/g , '\n' )">
</el-input>
      </el-row>
    </el-card>
  </div>
  </d2-container>
</template>

<script>
// eslint-disable-next-line
import axios from 'axios'
import { uniqBy } from 'lodash'
export default {
  mounted () {
  },
  data () {
    return {
      baseinfo: {
        keyword: ''
      },
      loading: false,
      data: [],
      value: []
    }
  },
  methods: {
    getdata () {
      let that = this
      // 筛选选中的部分
      let valueok = [...new Set(this.value)]
      // 客户选择的词语，穿梭框进行合并
      let arrok = this.data.filter(item => valueok.indexOf(item.key) > -1)
      // console.log('arrok:' + arrok)
      // 筛选选中的部分
      that.loading = true
      let codeurl = 'http://www.21cl.net/getdata.php'
      var urly = 'http://www.jiugongge.org/plus/tools/dingci_data.php?dopost=getsearch&keyword='
      var urly2 = urly + that.baseinfo.keyword
      that.baseinfo.url = urly2
      if (that.baseinfo.keyword !== '') {
        axios.post(codeurl, that.baseinfo)
          .then(function (res) {
            let dataok = res.data.data
            let dataok2 = []
            for (let i = 1; i < dataok.length; i++) {
              dataok2.push({
                key: dataok[i].value,
                label: dataok[i].value,
                disable: 1
              })
            }
            // 合并数组且去重到穿梭框
            that.data = uniqBy(dataok2.concat(arrok), 'key')
            that.loading = false
          }).catch(function (error) {
            console.log(error)
          })
      }
    },
    savedata () {
      // 数组去重
      // var valueok2 = [...new Set(this.value)]
      // console.log(valueok2)
    }
  }
}
</script>

<style scoped>
>>> .el-transfer-panel {
    width: 36%;
    height: 666px;
}
>>> .el-checkbox__label {
    font-size: 16px;
}
>>> .el-transfer-panel__list {
    height: 628px;
}
>>> .el-transfer-panel__list.is-filterable {
    height: 558px;
}
>>> .el-transfer-panel__header .el-checkbox .el-checkbox__label span::before {
    content: '词语总数：';
}
>>> .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label span {
    font-size: 16px;
}
>>> .el-checkbox__label {
    font-size: 16px;
}
.card1{
  margin-bottom:12px;
}
.warning1{
  color:rgb(235,0,40)
}
.info1{
  color:rgb(103, 194, 58)
}
.info2{
  padding-bottom: 12px;
  font-size: 28px;
  float: right;
  padding-right: 128px;
}
>>> textarea.el-textarea__inner {
    min-height: 528px !important;
}
>>> .el-transfer__buttons {
    width: 22.58%;
    text-align: center;
}
>>> .el-button--primary {
    width: 100px;
}
</style>
