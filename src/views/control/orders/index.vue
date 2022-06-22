<template>
  <d2-container>
    <!-- 搜索 -->
    <el-card class="m-box-card" shadow="hover" style="padding:0">
    <el-row>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">公司名：</div>
      <el-input v-model="formdata.company" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">账号：</div>
      <el-input v-model="formdata.account" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">关联账号：</div>
      <el-input v-model="formdata.accountabout" class="input3"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">收支类型：</div>
      <el-select class="input3" v-model="formdata.orderType" placeholder="请选择">
      <el-option
      v-for="item in formok.statusoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">类型：</div>
      <el-select class="input3" v-model="formdata.payType" placeholder="请选择">
      <el-option
      v-for="item in formok.typeoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select></div>
      </el-col>
    </el-row>
    <el-row style="margin-top:12px;">
      <el-col class="time">
      <div class="inputok"><div class="input2 input2j">交易时间：</div>
      <el-date-picker
      value-format="yyyy-MM-dd"
      v-model="formdata.time"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      :picker-options="pickerOptions">
    </el-date-picker></div>
      </el-col>
      <el-col class="company">
      <div class="inputok"><div class="input2">单号：</div>
      <el-input v-model="formdata.fromId" class="input3"></el-input></div>
      </el-col>
      <el-col class="searchok">
      <div class="search">
      <el-tag v-if="checkw2" effect="plain" type="success" class="tagok">订单数：{{pagination.total}}</el-tag>
      <el-button type="primary" @click="searchok">查询</el-button>
      <el-button @click="emptysearch">重置</el-button>
      </div>
      </el-col>
    </el-row>
    </el-card>
    <!-- 搜索 -->
    <!-- 多选信息 -->
    <el-row style="margin-top:12px;">
    <el-col :span="24"><el-tag class="tag1"><i class="el-icon-warning i1"></i>
    <div class="el1">已选择</div><div id="getnumok">0</div><div class="el1">项</div>
    <div class="el1 el2" @click="nullall">删除</div>
    <span v-if="checkw" class="el1" style="float:right;">订单数：{{pagination.total}}</span>
    <!-- 刷新与防抖 -->
    <span class="el1 refresh2" @click="throttledMethod" style="float:right;">刷新</span>
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
      edit-title=''
      :form-options='formOptions'
      selection-row
      @selection-change="handleSelectionChange"
      @row-edit='handleRowEdit'
      @dialog-cancel='handleDialogCancel'
      @row-remove='handleRowRemove'
      @pagination-current-change='paginationCurrentChange'
    >
    </d2-crud>
  </d2-container>
</template>

<script>
// eslint-disable-next-line
import deleterecharge from '@/components/deleterecharge'
// 引入更多操作组件
import ToMore from '@/components/ToMoreRecharge'
import orderType from '@/components/orderType'
import payType from '@/components/payType'
import orderstatus from '@/components/orderstatus'
import Note from '@/components/orderDetail'
import { orderlist } from '@api/orderlist'
import _lodash from 'lodash'
export default {
  data () {
    return {
      // 余额
      balance: 0,
      value2: '',
      // 日期选择的区间
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 在线充值
      // 表单校验规则
      rules: {
        rmb: [
          { required: true, type: 'number', min: 1, message: '必须为数字值', trigger: 'blur' }
        ]
      },
      dialogFormVisible2: false,
      status1: [
        { name: '手动', id: 1 },
        { name: '支付宝', id: 2 },
        { name: '微信', id: 3 },
        { name: '余额', id: 4 }
      ],
      status1ok: [
        { name: '手动', id: 1 },
        { name: '支付宝', id: 2 },
        { name: '微信', id: 3 }
      ],
      rulesForm: {
        type: '',
        qd: '',
        // time: this.getCurrentTime(),
        rmb: '',
        // company: this.$util.cookies.get('company'),
        note: ''
      },
      // 手动扣减
      firstm: '',
      dialogFormVisible2j: false,
      status1j: [
        { name: '充值', id: 1 },
        { name: '支出', id: 2 }
      ],
      status2j: [],
      rules2: {
        rmb: [
          { required: true, type: 'number', min: 1, message: '必须为数字值', trigger: 'blur' }
        ],
        accountabout: [
          { required: true, message: '必选' }
        ]
      },
      rulesFormj: {
        accountabout: '',
        type: '',
        qd: '',
        rmb: '',
        note: ''
      },
      // 搜索发送的参数
      formdata: {
        fromId: '', // 单号
        payType: '', // 收支类型
        account: '', // 账号
        accountabout: '', // 关联账号
        orderType: '', // 渠道
        time: '', // 交易时间
        company: '', // 公司名
        note: ''
      },
      // 搜索发送的参数
      // 搜索的参数
      formok: {
        statusoptions: [{
          value: '充值',
          label: '充值'
        }, {
          value: '支出',
          label: '支出'
        }],
        typeoptions: [{
          value: '充值',
          label: '充值'
        }, {
          value: '订单',
          label: '订单'
        }]
      },
      // 搜索的参数
      // 多选选中的
      selection: '',
      options: {
        maxHeight: '568'
      },
      // 权限
      permission: ['admin'],
      loading: true,
      search: '', // 搜索
      pagination: {
        background: true,
        currentPage: parseInt(localStorage.getItem('ordercontrolcurrentPage')) || 1,
        pageSize: 15,
        total: 12
      },
      columns: [
        {
          title: '类型',
          component: {
            name: orderType,
            props: {
              myProps: ''
            }
          },
          key: 'orderType',
          fixed: 'left',
          width: '100',
          filters: [
            { text: '充值', value: 1 },
            { text: '订单', value: 2 }
          ],
          filterMethod (value, row) {
            return row.orderType === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '单号',
          key: 'fromId',
          width: 168
        },
        {
          title: '描述',
          key: 'title'
        },
        {
          title: '金额',
          width: 100,
          key: 'amount',
          sortable: true
        },
        {
          title: '收支类型',
          component: {
            name: payType,
            props: {
              myProps: ''
            }
          },
          key: 'payType',
          width: 168,
          filters: [
            { text: '充值', value: 1 },
            { text: '支出', value: 2 }
          ],
          filterMethod (value, row) {
            return row.payType === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '状态',
          component: {
            name: orderstatus,
            props: {
              myProps: ''
            }
          },
          key: 'status',
          width: 168,
          filters: [
            { text: '待定', value: 0 },
            { text: '有效', value: 1 },
            { text: '无效', value: 2 }
          ],
          filterMethod (value, row) {
            return row.status === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '时间',
          width: 168,
          key: 'payTime',
          sortable: true
        },
        // {
        //   title: '操作',
        //   key: 'lang',
        //   fixed: 'right',
        //   component: {
        //     name: deleterecharge,
        //     props: {
        //       myProps: ''
        //     }
        //   }
        // },
        {
          title: '操作',
          key: 'note',
          fixed: 'right',
          width: 168,
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
          width: 168,
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
    let getcurrentPage = parseInt(localStorage.getItem('ordercontrolcurrentPage')) || 1
    this.paginationCurrentChange(getcurrentPage)
    this.loading = false
    this.fetchData()
  },
  computed: {
    dialogtitle2 () {
      return `手动扣减【余额：${this.balance}】`
    },
    // 在线充值title
    dialogtitle () {
      return `在线充值【余额：${this.balance}】`
    },
    // 设置不同屏幕的偏移量
    checkw () {
      return document.body.clientWidth < 1600
    },
    checkw2 () {
      return document.body.clientWidth > 1600
    }
  },
  methods: {
    // 刷新与防抖
    throttledMethod: _lodash.debounce(function () {
      let that = this
      that.fetchData()
    }, 1200),
    // 时间
    getCurrentTime () {
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    },
    // 查询数据
    searchok () {
      console.dir(this.formdata)
    },
    // 获取数据
    fetchData () {
      this.loading = true
      orderlist(this.pagination.currentPage).then(res => {
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
      localStorage.setItem('ordercontrolcurrentPage', currentPage)
      this.fetchData()
    },
    // 前往创建站点
    gotowebs () {
      // this.$router.push({
      //   name: 'websok'
      // })
    },
    // 提交搜索参数
    gotosearch () {
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
        let message2 = `你正在删除${length2}个订单：`
        let message3 = []
        for (let a = 0; a < length2; a++) {
          message3.push(selection[a].fromId)
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
>>> .el-dialog__body {
    padding: 0 22px;
}
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
.input22{
  width: 28px;
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
.time{
  width:20%;
}
.company{
  width: 20%;
}
.searchok {
    width: 60%;
    float: right;
}
.tagok{
  width: 118px;
  font-size: 15px;
  margin-right: 12px;
}
>>> .d2-crud-body {
    padding: 0 !important;
}
.input2j{
  margin-right: 1.2px;
}
.refresh2:hover{
  color:#409eff;
}
@media screen and (max-width: 1800px){
.time{
  width:20%;
}
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
.el-date-editor{
  width: 60% !important;
}
>>> .el-range-separator {
  min-width: 20px;
}
.input2j {
    margin-right: 1px;
}
}
</style>
