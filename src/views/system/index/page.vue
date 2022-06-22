<template>
<d2-container>
  <div class="m-home">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-money" style="color: rgba(251, 144, 67, 0.86);"></i>
          </div>
          <div class="m-content">
            <p>{{rmbtitle}}</p>
            <p class="m-count">
              {{rmb}}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-s-platform" style="color: #67C23A;"></i>
          </div>
          <div class="m-content">
            <p>站点数</p>
            <p class="m-count">
              {{ pagination.total }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-if="this.$util.checkjur2(['null',0,2])">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-user-solid" style="color: #F56C6C;"></i>
          </div>
          <div class="m-content">
            <p>用户数</p>
            <p class="m-count">
              {{ usernum }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-s-data" style="color: #409EFF;"></i>
          </div>
          <div class="m-content">
            <p>访问量</p>
            <p class="m-count">
              {{ Visitsnum }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-if="this.$util.checkjur2([1,3])">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-time" style="color: #ff4097db;"></i>
          </div>
          <div class="m-content">
            <p>上次登录时间</p>
            <p class="m-count">
              {{ loginTime }}
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="18" v-if="this.$util.checkjur2(['null',0,2,3])">
        <el-card class="m-box-card" shadow="hover">
          <div slot="header" class="clearfix">
              <span><b>站点访问详情</b></span>
          </div>
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="6">
        <el-row :gutter="20" align>
          <el-col :sm="12" :lg="24">
            <div class="m-box-card cardok" shadow="hover"
                     style="color:#ba2640;">
              <div slot="header">
                <p style="text-align: center">
                  <i class="el-icon-user-solid" style="color: #F56C6C;font-size: 35px;"></i>
                </p>
                <div>
                  <p><b>账号：{{ user.name }}</b></p>
                  <p><b>身份：{{ identity }}</b></p>
                  <p v-if="this.$util.checkjur2(['null',0,2])"><b>上次登录时间：{{ loginTime}}</b></p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :sm="12" :lg="24" v-if="this.$util.checkjur2(['null',0,2,3])">
            <el-card class="m-box-card" shadow="hover">
              <div slot="header" class="clearfix">
              <span><b>系统更新日志</b></span>
              </div>
              <div style="margin: -20px;padding-top:16px;color:#ffffff;overflow: auto">
              <div class="block">
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
</div>
</div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20" v-if="this.$util.checkjur2(['null',0,2,3])">
      <el-col :sm="24" :lg="12">
        <el-card class="m-box-card" shadow="hover" style="height: 300px;">
          <div slot="header" class="clearfix">
              <span><b>相关人员信息</b></span>
          </div>
              <div style="margin-top:-16px;">
          <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="name" label="姓名" width="60"></el-table-column>
            <el-table-column prop="qq" label="QQ" width="100"></el-table-column>
            <el-table-column prop="work" label="业务" width="100"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
          </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="m-box-card" shadow="hover" style="height: 300px">
          <div slot="header" class="clearfix">
              <span><b>系统以及建站进度通知</b></span>
          </div>
          <el-carousel height="210px" :interval="5000">
      <el-carousel-item v-for="item in itemmessage" :key="item.content">
        <p class="small" style="height:140px;">{{ item.content }}</p>
        <p class="small1" style="text-align:right;">{{ item.time }}</p>
      </el-carousel-item>
    </el-carousel>
        </el-card>
      </el-col>
    </el-row> -->
    <!-- <el-row v-if="this.$util.checkjur2(['null',0,2,3])">
      <el-col :span="24">
        <el-card class="m-box-card" shadow="hover">
          <div slot="header" class="clearfix">
              <span><b>站点地区分布</b></span>
          </div>
          <ve-scatter :data="chartData2" :settings="chartSettings2"></ve-scatter>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
  </d2-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// eslint-disable-next-line
import echarts from 'echarts'
import util from '@/libs/util.js'
import VeLine from 'v-charts/lib/histogram.common'
// import VeScatter from 'v-charts/lib/scatter.common'
// 引入数字增加动画组件
// import count from '@/components/count'
// 引入启停MyTag组件
import MyTag2 from '@/components/MyTag2'
// import CheckWeb from '@/components/CheckWeb'
// 引入前往站点后台组件
import Goto from '@/components/Goto'
import ToHoutai from '@/components/ToHoutai'
import appName from '@/components/appName'
// 引入续费组件
import renew from '@/components/renew'
// 根据不同的身份渲染不同的路由菜单
import selectmenu from '@/menu/selectMenu'
import { sitelist } from '@api/sitelist'
import { userlist } from '@api/userlist'
import { rechargelist } from '@api/rechargelist'
// 获取对应的身份
import { getidentity } from '@/plugin/commonfuc/getidentity'
export default {
  created () {
  },
  mounted () {
    let that = this
    sitelist({ page: 1 }).then(res => {
      that.pagination.total = res.total
    }).catch()
    userlist().then(res => {
      this.usernum = res.total
    }).catch(err => {
      console.log('err', err)
    })
    rechargelist().then(res => {
      this.rmb = res.sumamount
    }).catch(err => {
      console.log('err', err)
    })
    this.getData()
    this.getidentity()
    selectmenu()
    // 鉴权判断是否需要关闭菜单
    this.closeallmenu()
  },
  name: 'PageHome',
  components: {
    VeLine
    // VeScatter
    // count
  },
  data () {
    return {
      rmb: '',
      usernum: '',
      Visitsnum: '',
      loginTime: '',
      loading: true,
      search: '', // 搜索
      identity: '身份',
      pagination: {
        background: true,
        currentPage: 1,
        pageSize: 15,
        total: ''
      },
      columns: [
        {
          title: '站点类型',
          component: {
            name: appName,
            props: {
              myProps: ''
            }
          },
          key: 'appName',
          width: '100',
          filters: [
            { text: '企业站', value: 'site' },
            { text: '竞价站', value: 'dirSite' }
          ],
          filterMethod (value, row) {
            return row.appName === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '域名',
          key: 'url',
          width: '226',
          component: {
            name: ToHoutai,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '前往后台',
          key: 'lang',
          width: '168',
          component: {
            name: Goto,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: 'HTTPS服务',
          key: 'isSsl',
          width: '128',
          component: {
            name: MyTag2,
            props: {
              myProps: ''
            }
          },
          filters: [
            { text: '启', value: 1 },
            { text: '否', value: 0 }
          ],
          filterMethod (value, row) {
            return row.isSsl === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '续费',
          key: 'renewnum',
          width: '168',
          component: {
            name: renew,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '到期时间',
          key: 'endTime',
          sortable: true,
          width: '126'
        }
      ],
      data: [],
      rowHandle: {
        columnHeader: '操作',
        width: '236',
        // 编辑数据
        edit: [
          {
            icon: 'el-icon-edit',
            text: '点我进行编辑',
            size: 'small',
            show (index, row) {
              if (row.showEditButton) {
                return true
              }
              return false
            },
            disabled (index, row) {
              if (row.forbidEdit) {
                return true
              }
              return false
            }
          }
        ],

        // 删除数据
        remove: [
          {
            icon: 'el-icon-delete',
            size: 'small',
            fixed: 'right',
            confirm: false,
            show (index, row) {
              if (row.showRemoveButton) {
                return true
              }
              return false
            },
            disabled (index, row) {
              if (row.forbidRemove) {
                return true
              }
              return false
            }
          }
        ]
      },

      editTemplate: {
        url: {
          title: '域名',
          value: ''
        },
        endTime: {
          title: '到期时间',
          value: ''
        },
        plan: {
          title: '套餐',
          value: ''
        },
        lang: {
          title: '语种',
          value: ''
        },
        ywy: {
          title: '业务员',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '钟总'
              },
              {
                value: '杨总'
              },
              {
                value: '陈总'
              }
            ]
          }
        },
        user: {
          title: '客户',
          value: ''
        },
        uphone: {
          title: '手机号',
          value: ''
        },
        styleId: {
          title: '模板',
          value: ''
        },
        customer: {
          title: '客服',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '海华'
              },
              {
                value: '丽欣'
              },
              {
                value: '小贤'
              }
            ]
          }
        },
        note: {
          title: '备注',
          value: ''
        },
        forbidEdit: {
          title: '禁用按钮',
          value: false,
          component: {
            show: false
          }
        },
        showEditButton: {
          title: '显示按钮',
          value: true,
          component: {
            show: false
          }
        }
      },
      formOptions: {
        labelWidth: '86px',
        labelPosition: 'left',
        saveLoading: false
      },
      activities: [
        {
          content: 'V1.0.3-完善站点创建模块',
          timestamp: '2022-09-12',
          color: '#0bbd87'
        }, {
          content: 'V1.0.4-完善站点管理模块',
          timestamp: '2022-09-16',
          size: 'large'
        },
        {
          content: 'V1.0.5-完善用户鉴权',
          timestamp: '2022-10-16',
          size: 'large'
        }],
      itemmessage: [{
        content: 'SaasCms系统已经测试完成，可通过其一键开站和创建订单，实现对于建站订单的人性化迅捷管理',
        time: '2022-12-28'
      }, {
        content: 'SaasCms系统用户数超过1000，站点数超过600，转化量破一万',
        time: '2021-01-26'
      }, {
        content: 'SaasCms系统用户数超过2000，站点数超过4000，访问量破三十万，转化量破二十万',
        time: '2021-04-26'
      }, {
        content: 'SaasCms系统在市场上取得重大成功，自从诞生以来不断迭代进化，逐步添加关键词挖掘，站点各指标(百度权重，百度访问量，百度收录量等等)精确查询等功能，已为超过两千家中小企业提供快速建站以及后期优化与百度竞价服务，获得众多中小企业的青睐',
        time: '2021-08-28'
      }],
      user: {
        name: util.cookies.get('name'),
        company: '广州创力信息科技有限公司',
        loginTime: '2022-10-01 12:00:00',
        lastTime: '2022-10-01',
        lastIp: '172.28.12.34'
      },
      chartData: {
        columns: ['日期', 'PV总数', 'UV总数', '转化量'],
        rows: [
          { '日期': '2022-10-01', 'PV总数': 1000, '转化量': 800, 'UV总数': 800 },
          { '日期': '2022-10-02', 'PV总数': 1200, '转化量': 1000, 'UV总数': 1000 },
          { '日期': '2022-10-03', 'PV总数': 1600, '转化量': 1000, 'UV总数': 1200 },
          { '日期': '2022-10-04', 'PV总数': 2000, '转化量': 1600, 'UV总数': 1800 },
          { '日期': '2022-10-05', 'PV总数': 2600, '转化量': 1800, 'UV总数': 2000 },
          { '日期': '2022-10-06', 'PV总数': 3000, '转化量': 2000, 'UV总数': 2200 },
          { '日期': '2022-10-07', 'PV总数': 6000, '转化量': 5000, 'UV总数': 4000 }
        ]
      },
      chartSettings: {
        showLine: ['转化量'],
        label: { show: true, position: 'top' }
      },
      chartData2: {
        columns: ['日期', '用户数', '站点数'],
        rows: {
          '广州': [
            { '日期': '2022-10-01', '用户数': 123, '站点数': 100 },
            { '日期': '2022-10-02', '用户数': 200, '站点数': 300 },
            { '日期': '2022-10-03', '用户数': 210, '站点数': 400 },
            { '日期': '2022-10-04', '用户数': 300, '站点数': 600 },
            { '日期': '2022-10-05', '用户数': 500, '站点数': 800 },
            { '日期': '2022-10-06', '用户数': 1000, '站点数': 2000 }
          ],
          '北京': [
            { '日期': '2022-10-01', '用户数': 100, '站点数': 200 },
            { '日期': '2022-10-02', '用户数': 120, '站点数': 220 },
            { '日期': '2022-10-03', '用户数': 220, '站点数': 300 },
            { '日期': '2022-10-04', '用户数': 230, '站点数': 330 },
            { '日期': '2022-10-05', '用户数': 240, '站点数': 400 },
            { '日期': '2022-10-06', '用户数': 250, '站点数': 800 }
          ],
          '上海': [
            { '日期': '2022-10-01', '用户数': 200, '站点数': 280 },
            { '日期': '2022-10-02', '用户数': 230, '站点数': 300 },
            { '日期': '2022-10-03', '用户数': 250, '站点数': 400 },
            { '日期': '2022-10-04', '用户数': 280, '站点数': 600 },
            { '日期': '2022-10-05', '用户数': 300, '站点数': 1000 },
            { '日期': '2022-10-06', '用户数': 350, '站点数': 1200 }
          ]
        }
      },
      chartSettings2: {
        dimension: '日期',
        metrics: ['站点数', '用户数']
      },
      tableData2: [{
        qq: '2891162695',
        name: '嘉敏',
        work: '美工设计',
        company: '广州创力信息科技有限公司'
      }, {
        qq: '2891162696',
        name: '小贤',
        work: 'SEO优化',
        company: '广州创力信息科技有限公司'
      }, {
        qq: '2891162697',
        name: '海华',
        work: 'SEO优化',
        company: '广州创力信息科技有限公司'
      }, {
        qq: '2891162698',
        name: '小梅',
        work: '网站建设',
        company: '广州创力信息科技有限公司'
      }]
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ]),
    rmbtitle () {
      if (parseInt(this.info.uid) === 2) {
        return '总额'
      } else {
        return '余额'
      }
    }
  },
  methods: {
    // 鉴权关闭所有菜单
    ...mapActions('d2admin/page', [
      'closeAll'
    ]),
    closeallmenu () {
      if (this.$route.params.cauthen === 'closeall') {
        this.closeAll()
      }
    },
    // 获取对应的身份
    getidentity () {
      let groupy = util.cookies.get('group')
      let idy = getidentity(groupy)
      if (String(idy) === 'null') {
        idy = '管理员'
      }
      this.identity = idy
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // console.log(index)
        // console.log(row)
        // console.log(typeof row)
        // 网站修改的按钮
        let edittext = `你确定要修改【${row.url}】网站吗`
        let edits = `【${row.url}】网站修改成功`
        this.$confirm(edittext,
          '你正在修改网站',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.$alert(edits, '网站修改成功', {
              dangerouslyUseHTMLString: true,
              type: 'success'
            }).catch()
            // 之后加入数据的前后端部分
            // 之前加入数据的前后端部分
            // 编辑成功后的前端显示操作
            done()
          })
          .catch(() => {
            this.$message({
              type: 'success',
              message: '网站修改已取消'
            })
          })
        // 交互判断按钮
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      done()
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        const h = this.$createElement
        let delmessage = `该网站是否已经停止维护？这个操作后【${row.url}】
        该网站记录将会从数据库中删除，网站服务也会停止，这是个危险的操作，你确定要这么做吗？`
        let delsuccess = `【${row.url}】网站已经被删除`
        let delerror = `【${row.url}】网站删除取消`
        this.$confirm(delmessage, `删除【${row.url}】网站`, {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消删除',
          confirmButtonClass: 'confirmType',
          type: 'success'
        }).then(() => {
          // 删除网站接口
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 0,
            message: h('b', { style: 'color: teal' }, delsuccess)
          })
          done()
        }).catch(() => {
          this.$notify({
            title: '删除取消',
            type: 'info',
            message: h('b', { style: 'color: teal' }, delerror)
          })
        })
      }, 300)
    },
    // 传入Mytag组件测试
    handleDataChange (data) {
      console.log('Mytag' + data)
    },
    // 获取最近一周的数组
    getDay (day) {
      var today = new Date()
      var targetday = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday)
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tYear + '-' + tMonth + '-' + tDate
    },
    doHandleMonth (month) {
      var m = month
      if (month.toString().length === 1) {
        m = '0' + month
      }
      return m
    },
    getData () {
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
.m-content {
    height: 128px;
}
.cardok {
    padding: 20px;
    border: 1px solid #EBEEF5;
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
