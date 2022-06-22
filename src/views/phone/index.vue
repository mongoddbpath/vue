<template>
<d2-container>
  <template slot='header'>该页面如果直接访问将不会产生数据</template>
  <div class="m-home">
<!-- 添加账号密码 -->
    <el-card class="m-box-card" shadow="hover">
    <el-row :gutter="24" v-if="this.$util.checkjur2(['null', 0, 2]) ||
     info.uname === 'pub'">
      <el-col style="width:268px;">
<el-input v-model="info.password" placeholder="请输入关键词进行查询"></el-input>
      </el-col>
      <el-col style="width:128px;">
          <el-button type="success" round @click="cbaseData">点击查询</el-button>
      </el-col>
      <el-col style="width:158px;">
          <el-button type="success" round @click="baseData3">查看全部记录</el-button>
      </el-col>
      <el-col style="width:158px;">
          <el-button type="success" round @click="baseDataok">查看最近一周记录</el-button>
      </el-col>
    </el-row>
    </el-card>
<!-- 添加账号密码 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-user-solid" style="color: #F56C6C;"></i>
          </div>
          <div class="m-content">
            <p>通话总数</p>
            <p class="m-count">
              {{info.phoneNum}}
              <!-- <d2-count-up :end=info.phoneNum></d2-count-up> -->
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="m-box-card" shadow="hover"
                     style="height: 192px;color:#ba2640;">
              <div slot="header" style="margin-top:-14px">
                <p style="text-align: center">
                  <i class="el-icon-user-solid" style="color: #F56C6C;font-size: 35px;"></i>
                </p>
                <div>
                  <p><b>400通话记录</b></p>
                  <p><b>{{ info.password }}</b></p>
                  <p><b>{{ info.username }}</b></p>
                </div>
              </div>
            </el-card>
      </el-col>
    </el-row>

    <!-- 添加站点管理 -->
    <el-row>
      <el-col :span="24">
        <el-card class="m-box-card" shadow="hover">
          <div slot="header" class="clearfix">
              <span><b>通话详情</b></span>
          </div>
          <d2-crud
      style="margin-top:-28px"
      ref='d2Crud'
      :loading="loading"
      :columns='columns'
      :pagination='pagination'
      :options="options"
      :data='
        data.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.domain.toLowerCase().includes(search.toLowerCase()) ||
            data.styleId.toLowerCase().includes(search.toLowerCase())
        )
      '
      edit-title='通话详情'
      :form-options='formOptions'
      @pagination-current-change='paginationCurrentChange'
    >
      <!-- 表格搜索框 -->
      <!-- 表格搜索框 -->
    </d2-crud>
        </el-card>
      </el-col>
    </el-row>
  </div>
  </d2-container>
</template>

<script>
// eslint-disable-next-line
import axios from 'axios'
import util from '@/libs/util.js'
import count from '@/components/count'
import { weblist } from '@api/weblist'
export default {
  mounted () {
    this.baseData()
    this.info.password = this.text
    // 测试分类型
  },
  name: 'PageHome',
  components: {
    // eslint-disable-next-line
    count
  },
  data () {
    return {
      options: {
        maxHeight: '328'
      },
      // 接应过来的数据
      text: this.$route.params.note,
      name: this.$route.params.name,
      fenjiarr: '',
      // 400平台接口的密码
      baserurl: 'http://www.c4006.com/',
      // 通话详情
      info: {
        uname: util.cookies.get('name'),
        phoneNum: '',
        userNum: 2600,
        visitNum: 300000,
        rateNum: 200000,
        username: '在这里查看竞价的通话记录详情',
        password: ''
      },
      baseinfo: {
        username: '',
        password: '',
        nodesid: '',
        currentPage: 1,
        type: 'a',
        cd: ''
      },
      loading: true,
      search: '', // 搜索
      pagination: {
        background: true,
        currentPage: 1,
        pageSize: 20,
        total: 12
      },
      columns: [
        {
          title: '分机号',
          key: 'node_code'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '主叫号码',
          key: 'caller'
        },
        {
          title: '被叫号码',
          key: 'called',
          width: 168
        },
        {
          title: '主叫所在地',
          key: 'caller_from'
        },
        {
          title: '通话开始时间',
          key: 'begin_time',
          width: '200',
          sortable: true
        },
        // {
        //   title: '通话结束时间',
        //   key: 'end_time',
        //   width: '200',
        //   sortable: true
        // },
        {
          title: '通话时长',
          key: 'talklen_min',
          sortable: true
        }
        // {
        //   title: '通话费用',
        //   key: 'minmoney',
        //   sortable: true
        // }
      ],
      data: [],
      formOptions: {
        labelWidth: '86px',
        labelPosition: 'left',
        saveLoading: false
      },
      user: {
        name: util.cookies.get('name'),
        company: '广州创力信息科技有限公司',
        loginTime: '2020-10-01 12:00:00',
        lastTime: '2020-10-01',
        lastIp: '172.28.12.34'
      }
    }
  },
  methods: {
    // 获取数据
    fetchData () {
      this.loading = true
      weblist(this.pagination.currentPage).then(res => {
        this.data = res.data
        this.pagination.total = res.total
        // 等待条
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
        this.$notify({
          message: `获取数据失败`
        })
      })
    },
    cbaseData () {
      let that = this
      that.loading = true
      let ok = that.fenjiarr.filter(item => item.text.indexOf(that.info.password) !== -1)
      that.baseinfo.nodesid = ok[0].id
      that.baseinfo.cd = 'a'
      that.baseData2()
    },
    baseData () {
      let that = this
      that.loading = true
      let carr1 = ['昊景模型', '利文模型', '天仁',
        '新锐', '康记', '新古楼材料', '力臣模型']
      let carr2 = ['hjmx', 'lwweb', 'tianren',
        'xinrui', 'kangji', 'glxcl', 'lcweb']
      for (let x = 0; x < carr2.length; x++) {
        if (carr2[x] === that.name) {
          that.text = carr1[x]
        }
      }
      if (that.name === 'mukeliji' || that.name === 'hongganji' || that.name === 'sisuiji') {
        that.text = '耀邦'
      }
      let code = 'http://api.21cl.cn/phone.php'
      axios.post(code, that.baseinfo)
        .then(function (res) {
          let ok1 = res.data.fenji[0].children
          that.fenjiarr = res.data.fenji[0].children
          let ok = ok1.filter(item => item.text === that.text)
          that.baseinfo.nodesid = ok[0].id
          that.info.password = ok[0].text
          that.baseData2()
        }).catch(function (error) {
          console.log(error)
        })
    },
    baseData2 () {
      let that = this
      that.loading = true
      let code = 'http://api.21cl.cn/phone.php'
      axios.post(code, that.baseinfo)
        .then(function (res) {
          console.log(res)
          that.info.phoneNum = res.data.count
          that.pagination.total = res.data.count
          let data1 = res.data.data
          // 添加名称参数
          for (var a = 0; a < data1.length; a++) {
            for (var b = 0; b < that.fenjiarr.length; b++) {
              if (data1[a].node_id === that.fenjiarr[b].id) {
                data1[a].name = that.fenjiarr[b].text
              }
            }
          }
          // 添加名称参数
          that.data = data1
          that.loading = false
        }).catch(function (error) {
          console.log(error)
        })
    },
    baseData3 () {
      let that = this
      that.loading = true
      this.info.password = '全部'
      that.baseinfo.nodesid = ''
      that.baseinfo.cd = 'a'
      that.baseData2()
    },
    baseDataok () {
      let that = this
      that.loading = true
      that.baseinfo.nodesid = ''
      this.info.password = '最近一周'
      that.baseinfo.cd = 'ok'
      that.baseData2()
    },
    // 当分页进行改变的时候
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.baseinfo.currentPage = currentPage
      // console.log(`currentpage:${currentPage}`)
      this.baseData2()
    }
  }
}
</script>

<style scoped lang="scss">
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
      margin-left: 60px;

      .m-count {
        font-size: 36px;
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
