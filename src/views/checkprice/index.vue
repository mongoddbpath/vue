<template>
<d2-container>
  <template slot="header">站拓宝百度竞价智能查价，输入关键词一搜即达
  </template>
  <div class="m-home">
    <el-card class="m-box-card" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="17">
  <el-button
  type="danger"
    @click="resetCity"
  >
    重置(不选为全国)
  </el-button>
  <el-checkbox-group
    v-model="baseinfo.lang"
  >
    <el-checkbox-button
    class="bordery"
      v-for="city in cities"
      :label="city.lang"
      :key="city.lang"
      style="margin:1.2px;"
    >
      {{city.name}}
    </el-checkbox-button>
  </el-checkbox-group>
      </el-col>
      <el-col :span="4">
          <el-input v-model="baseinfo.keyword" placeholder="请输入关键词"></el-input><br>
      </el-col>
      <el-col :span="1">
          <el-button type="success" round @click="getdata">点击查询</el-button>
      </el-col>
    </el-row>
    </el-card>
    <div v-loading="loading">
    <el-row v-if="word!==''" style="margin-top:28px;"><p class="word"><b>[{{word}}]的查询结果
      (购买时长-费用)</b></p></el-row>
    <el-row :gutter="20" style="margin-top:28px;">
      <el-col :span="6" v-for="item in datay" :key="item.duration">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-time" style="color: #F56C6C;"></i>
          </div>
          <div class="m-content">
            <span class="m1-count"><b>{{item.duration}}</b></span>
            <p class="m-count" v-if="item.pcprice !== 0"><b>
              电脑端：{{item.pcprice}}元({{item.pcprice_d}}/天)</b>
            </p>
            <p class="m-count" v-if="item.mbprice !== 0"><b>
              移动端：{{item.mbprice}}元({{item.mbprice_d}}/天)</b>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 相关词语部分 -->
    <el-row  v-if="words !== ''" :gutter="20" style="margin-top:28px;">
  <el-button v-for="item in words" :key='item' class="words" @click="checkw(item)">{{ item }}</el-button>
    </el-row></div>
  </div>
  </d2-container>
</template>

<script>
// eslint-disable-next-line
import axios from 'axios'
export default {
  mounted () {},
  data () {
    return {
      // 相关词语
      words: '',
      word: '',
      // 接口得来的数据
      datay: '',
      // 前端显示的语种名，这是一个数组
      CName: [],
      // 传给后端的语种参数，这是一个数组
      lang: [],
      isIndeterminate: true,
      checkAll: false,
      cities: [
        { id: 1, name: '北京', lang: 1000 },
        { id: 2, name: '上海', lang: 2000 },
        { id: 3, name: '天津', lang: 3000 },
        { id: 4, name: '广东', lang: 4000 },
        { id: 5, name: '福建', lang: 5000 },
        { id: 6, name: '海南', lang: 8000 },
        { id: 7, name: '安徽', lang: 9000 },
        { id: 8, name: '贵州', lang: 10000 },
        { id: 9, name: '甘肃', lang: 11000 },
        { id: 10, name: '广西', lang: 12000 },
        { id: 11, name: '河北', lang: 13000 },
        { id: 12, name: '河南', lang: 14000 },
        { id: 13, name: '黑龙江', lang: 15000 },
        { id: 14, name: '湖北', lang: 16000 },
        { id: 15, name: '湖南', lang: 17000 },
        { id: 16, name: '吉林', lang: 18000 },
        { id: 17, name: '江苏', lang: 19000 },
        { id: 18, name: '江西', lang: 20000 },
        { id: 19, name: '辽宁', lang: 21000 },
        { id: 20, name: '内蒙古', lang: 22000 },
        { id: 21, name: '宁夏', lang: 23000 },
        { id: 22, name: '青海', lang: 24000 },
        { id: 23, name: '山东', lang: 25000 },
        { id: 24, name: '山西', lang: 26000 },
        { id: 25, name: '陕西', lang: 27000 },
        { id: 26, name: '四川', lang: 28000 },
        { id: 27, name: '西藏', lang: 29000 },
        { id: 28, name: '新疆', lang: 30000 },
        { id: 29, name: '云南', lang: 31000 },
        { id: 30, name: '浙江', lang: 32000 },
        { id: 31, name: '重庆', lang: 33000 }],
      baseinfo: {
        lang: [],
        keyword: ''
      },
      loading: false
    }
  },
  methods: {
    resetCity () {
      this.baseinfo.lang = []
    },
    getdata () {
      let that = this
      that.loading = true
      let codeurl = 'http://www.21cl.net/getdata.php'
      var urly = 'http://www.jiugongge.org/plus/tools/getprice_data.php?dopost=getdata&type=3&keyword='
      var urly2 = urly + that.baseinfo.keyword + '&area=' + String(that.baseinfo.lang)
      that.baseinfo.url = urly2
      if (that.baseinfo.keyword !== '') {
        axios.post(codeurl, that.baseinfo)
          .then(function (res) {
            that.datay = res.data.data
            that.words = res.data.upwords
            that.word = that.baseinfo.keyword
            that.loading = false
          }).catch(function (error) {
            console.log(error)
          })
      }
    },
    checkw (item) {
      this.baseinfo.keyword = item
      this.word = item
      this.getdata()
    }
  }
}
</script>

<style scoped lang="scss">
.bordery {
    border: 1px solid #DCDFE6 !important;
}
.words {
margin-top:8px;float:left;margin-left:12px;
}
.word {
  font-size: 20px;
  text-align: center;
  line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background: #FFF;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
}
.m-home {
  .m-box-card {
    margin-bottom: 10px;
    color: #666666;

    .m-icon {
      float: left;
      width: 60px;

      i {
        font-size: 40px;
      }
    }

    .m-content {
      margin-left: 0px;
      margin-top: 7px;
      .m1-count {
        font-size: 20px;
        // margin-top: -1px;
      }
      .m-count {
        font-size: 18px;
      }
    }
  }

  .m-task-box {
    margin-bottom: 20px;

    .m-task-text {
      float: left;
      line-height: 16px;
    }

    .m-task-pro {
      margin-left: 60px;
    }
  }
}
</style>
