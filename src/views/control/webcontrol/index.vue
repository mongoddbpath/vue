<template>
  <d2-container>
    <!-- 搜索 -->
    <el-card class="m-box-card" shadow="hover" style="padding:0" v-show="searchshow2">
    <el-row>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">域名：</div>
      <el-input v-model="formdata.url" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">公司名：</div>
      <el-input v-model="formdata.company" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">所属：</div>
      <el-input v-model="formdata.kf" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">维护：</div>
      <el-input v-model="formdata.jz" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">业务员：</div>
      <el-input v-model="formdata.ywy" class="input3 input3ok"></el-input></div>
      </el-col>
    </el-row>
    <el-row style="margin-top:12px;" v-show="searchshow">
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">起始时间：</div>
      <el-date-picker class="input3"
      value-format="yyyy-MM-dd"
      v-model="formdata.startTime"
      type="date"
      placeholder="选择日期">
      </el-date-picker></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">到期时间：</div>
      <el-date-picker class="input3"
      value-format="yyyy-MM-dd"
      v-model="formdata.endTime"
      type="date"
      placeholder="选择日期">
      </el-date-picker></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">状态：</div>
      <el-select class="input3" v-model="formdata.status" placeholder="请选择">
      <el-option
      v-for="item in formok.statusoptions"
      :key="item.value"
      :label="item.label"
      :value="item.id">
      </el-option>
      </el-select></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">类型：</div>
      <el-select class="input3" v-model="formdata.type" placeholder="请选择">
      <el-option
      v-for="item in formok.typeoptions"
      :key="item.value"
      :label="item.label"
      :value="item.id">
      </el-option>
      </el-select></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">套餐：</div>
      <el-select  class="input3" v-model="formdata.plan" placeholder="请选择">
      <el-option
      v-for="item in formok.menuoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select></div>
      </el-col>
    </el-row>
    <el-row style="margin-top:12px;">
    <el-col :span="18" :offset="6">
      <div class="search">
      <el-tag effect="plain" type="success" class="tagok">网站总数：{{pagination.total}}</el-tag>
      <el-tag effect="plain" type="danger" class="tagok">周内逾期：0</el-tag>
      <el-button type="primary" icon="el-icon-refresh" @click="throttledMethod">刷新</el-button>
      <el-button v-if="this.$util.checkjur2(['null', 0,2])" type="primary" icon="el-icon-plus" @click="gotowebs">新建站点</el-button>
      <el-button type="primary" @click="searchshow = !searchshow">{{searchshow ? '关闭' : '展开'}}</el-button>
      <el-button type="primary" @click="gotosearch">查询</el-button>
      <el-button @click="emptysearch">重置</el-button></div></el-col>
    </el-row>
    </el-card>
    <!-- 搜索 -->
    <!-- 多选信息 -->
    <el-row style="margin-top:12px;">
    <el-col :span="24"><el-tag class="tag1"><i class="el-icon-warning i1"></i>
    <div class="el1">已选择</div><div id="getnumok">0</div><div class="el1">项</div>
    <div class="el1 el2" @click="nullall">停用</div>
    <span class="el1 el2" type="primary" style="float:right;"
    @click="searchshow2 = !searchshow2">{{searchshow2 ? '关闭搜索' : '展开搜索'}}</span>
    </el-tag></el-col>
    </el-row>
    <!-- 多选信息 -->
    <d2-crud
      ref='d2Crud'
      :loading="loading"
      :options="options"
      :columns='columns'
      :pagination='pagination'
      :data='
        data.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.domain.toLowerCase().includes(search.toLowerCase()) ||
            data.styleId.toLowerCase().includes(search.toLowerCase())
        )
      '
      edit-title='站点修改'
      :form-options='formOptions'
      selection-row
      @selection-change="handleSelectionChange"
      @row-edit='handleRowEdit'
      @dialog-cancel='handleDialogCancel'
      @row-remove='handleRowRemove'
      @pagination-current-change='paginationCurrentChange'
    >
      <!-- 表格搜索框 -->
      <!-- <el-input
        slot='header'
        v-model='search'
        placeholder='输入关键字搜索(公司名 或 域名)'
        style='margin-bottom: 6px'
      >
      </el-input> -->

      <!-- 表格搜索框 -->
    </d2-crud>
    <!-- <routerCheck :permission=permission></routerCheck> -->
  </d2-container>
</template>

<script>
// 引入SSL启停MyTag组件
// eslint-disable-next-line
// import MyTag from '@/components/MyTag'
import companytag from '@/components/companytag'
import kftag from '@/components/kftag'
import plan from '@/components/plan'
// 引入状态组件
import StatusTag from '@/components/StatusTag'
// 引入前往站点后台组件
import Goto from '@/components/Goto'
// 引入前往站点排名组件
import Goto2 from '@/components/Goto2'
// 引入更多操作组件
import ToMore from '@/components/ToMore'
// import CheckWeb from '@/components/CheckWeb'
import ToHoutai from '@/components/ToHoutai'
import appName from '@/components/appName'
import Note from '@/components/note'
import _lodash from 'lodash'
// import { weblist } from '@api/weblist'
// 搜索
import { sitelist } from '@api/sitelist'
export default {
  name: 'webcontrol',
  data () {
    return {
      // 搜索框显示
      'searchshow': false,
      'searchshow2': true,
      // 搜索发送的参数
      formdata: {
        url: '', // 域名
        company: '', // 公司名
        jz: '', // 维护
        kf: '', // 所属
        ywy: '', // 业务员
        startTime: '', // 创建时间
        endTime: '', // 到期时间
        status: '', // 状态
        type: '', // 类型
        plan: '' // 套餐
      },
      // 搜索发送的参数
      // 搜索的参数
      formok: {
        statusoptions: [{
          id: 1,
          value: '运行中',
          label: '运行中'
        }, {
          id: 0,
          value: '部署中',
          label: '部署中'
        }, {
          id: 2,
          value: '暂停',
          label: '暂停'
        }, {
          id: 3,
          value: '欠费',
          label: '欠费'
        }, {
          id: 4,
          value: '将到期',
          label: '将到期'
        }],
        typeoptions: [{
          id: 'site',
          value: '企业站',
          label: '企业站'
        }, {
          id: 'dirSite',
          value: '竞价站',
          label: '竞价站'
        }, {
          id: 'aweSite',
          value: '高端定制',
          label: '高端定制'
        }],
        menuoptions: [{
          value: 'A套餐',
          label: 'A套餐'
        }, {
          value: 'B套餐',
          label: 'B套餐'
        }, {
          value: 'C套餐',
          label: 'C套餐'
        },
        {
          value: 'D套餐',
          label: 'D套餐'
        },
        {
          value: '单词套餐',
          label: '单词套餐'
        },
        {
          value: '外贸套餐',
          label: '外贸套餐'
        }]
      },
      // 搜索的参数
      // 多选选中的
      selection: '',
      options: {
        // maxHeight: '568'
      },
      // 权限
      permission: ['admin'],
      loading: true,
      search: '', // 搜索
      pagination: {
        background: true,
        currentPage: parseInt(localStorage.getItem('webcontrolcurrentPage')) || 1,
        pageSize: 15,
        total: 0
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
          fixed: 'left',
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
          title: '公司名',
          key: 'name',
          width: '200',
          component: {
            name: companytag,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '域名',
          key: 'url',
          width: '236',
          component: {
            name: ToHoutai,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '所属',
          width: '128',
          key: 'kf',
          component: {
            name: kftag,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '维护',
          key: 'kf',
          width: '128',
          component: {
            name: kftag,
            props: {
              myProps: ''
            }
          }
          // filters: [
          //   { text: '小梅', value: '小梅' },
          //   { text: '小闲', value: '小闲' },
          //   { text: '丽欣', value: '丽欣' }
          // ],
          // filterMethod (value, row) {
          //   return row.customer === value
          // },
          // filterPlacement: 'bottom-end'
        },
        {
          title: '业务员',
          key: 'ywy',
          filters: [
            { text: '钟总', value: '钟总' },
            { text: '杨总', value: '杨总' },
            { text: '陈总', value: '陈总' }
          ],
          filterMethod (value, row) {
            return row.ywy === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '套餐',
          key: 'plan',
          component: {
            name: plan,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '到期时间',
          key: 'endTime',
          width: '100',
          sortable: true
        },
        {
          title: '状态',
          key: 'status2',
          fixed: 'right',
          component: {
            name: StatusTag,
            props: {
              myProps: ''
            }
          },
          filters: [
            { text: '运行中', value: '运行中' },
            { text: '部署中', value: '部署中' },
            { text: '暂停', value: '暂停' },
            { text: '欠费', value: '欠费' },
            { text: '将到期', value: '将到期' }
          ],
          filterMethod (value, row) {
            return parseInt(row.isSsl) === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '操作',
          key: 'lang',
          fixed: 'right',
          component: {
            name: Goto,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '',
          key: 'lang',
          fixed: 'right',
          component: {
            name: Goto2,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '',
          key: 'note',
          fixed: 'right',
          component: {
            name: Note,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '',
          key: 'url',
          fixed: 'right',
          component: {
            name: ToMore,
            props: {
              myProps: ''
            }
          }
        }
      ],
      data: [],
      formOptions: {
        labelWidth: '86px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  mounted () {
    let getcurrentPage = parseInt(localStorage.getItem('webcontrolcurrentPage')) || 1
    this.paginationCurrentChange(getcurrentPage)
    // this.fetchData()
  },
  created () {
    // 监听回车事件
    var _this = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key === 13) {
        _this.throttledMethod2()
      }
    }
  },
  watch: {
    searchshow () {
      if (this.searchshow === false) {
        this.formdata.startTime = ''
        this.formdata.endTime = ''
        this.formdata.status = ''
        this.formdata.type = ''
        this.formdata.plan = ''
      }
    }
  },
  methods: {
    // 防抖
    throttledMethod: _lodash.debounce(function () {
      let that = this
      that.emptysearch()
      this.pagination.currentPage = 1
      that.fetchData(1)
    }, 1200),
    throttledMethod2: _lodash.debounce(function () {
      let that = this
      that.gotosearch()
    }, 1200),
    // 搜索
    gotosearch () {
      this.loading = true
      this.pagination.currentPage = 1
      this.fetchData(1)
    },
    // 获取数据
    fetchData (a) {
      this.loading = true
      if (a === 1) { this.formdata.page = 1 } else {
        this.formdata.page = this.pagination.currentPage
      }
      sitelist(this.formdata).then(res => {
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
      // console.log('Mytag' + data)
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      localStorage.setItem('webcontrolcurrentPage', currentPage)
      this.fetchData()
    },
    // 前往创建站点
    gotowebs () {
      this.$router.push({
        name: 'websok'
      })
    },
    // 清空搜索参数
    emptysearch () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.formdata).forEach( key => { this.formdata[key] = '' })
    },
    // 多选
    handleSelectionChange (selection) {
      if (selection.length !== undefined) {
      // console.log(selection)
        document.getElementById('getnumok').innerHTML = selection.length
        this.selection = selection
      }
    },
    nullall () {
      // console.dir(this.selection)
      let length2 = this.selection.length
      let selection = this.selection
      if (length2 === 0) {} else {
        let message2 = `你正在停用${length2}个站点：`
        let message3 = []
        for (let a = 0; a < length2; a++) {
          message3.push(selection[a].url)
        }
        console.dir(message3)
        const newDatas = []
        const h = this.$createElement
        for (const i in message3) {
          newDatas.push(h('p', null, message3[i]))
        }
        this.$confirm(
          message2,
          {
            title: message2,
            message: h('div', null, newDatas),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {}).catch(() => {})
      }
    }
    // 以上定义方法
  }
}
</script>
<style scoped>
.confirmType {
  background: red !important;
  border-color: red !important
}
.i1{
  font-size:18px;
  float: left;
  padding-top: 5px;
}
.el1{
  float: left;
  font-size: 15px;
  margin-left: 5px;
  color: #666;
  cursor: pointer;
}
.el2:hover{
  color: #409EFF;
  font-weight: bold;
}
#getnumok{
  float: left;
  margin-left: 5px;
  font-size: 16.8px;
  font-weight: bold;
}
.input2 {
    line-height: 40px;
    width: 78px;
    font-size: 15px;
    float: left;
    padding-left: 10px;
}
.input3 {
    width: 72%;
    float: right;
}
.el-date-editor{
  width: 72% !important;
}
.search{
  float: right;
}
.tagok{
  width: 128px;
  font-size: 15px;
  margin-right: 12px;
}
>>> .d2-crud-body {
    padding: 0 !important;
}

>>> .el-dialog__body {
    padding: 0 20px;
}
/* 精简化 */
>>> .el-table td{
    padding: 10px 0;
}

>>> .el-table .cell {
  white-space: pre;
}
>>> .d2-container-full__body {
    padding: 9px 20px;
}
>>> .el-card__body {
    padding: 12px;
}
/* 精简化 */
@media screen and (max-width: 1800px){
.input2 {
    line-height: 40px;
    width: 36%;
    font-size: 1vw;
    float: left;
    padding-left: 2px;
}
.input3 {
    width: 60%;
    float: right;
    padding-right: 6px;
}
.input3ok{
  padding-right: 0;
}
.el-date-editor{
  width: 60% !important;
}
}
</style>
