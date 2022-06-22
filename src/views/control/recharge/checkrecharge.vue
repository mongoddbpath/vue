<template>
  <d2-container>
    <div>
<!-- 在线充值dialog -->
    <el-dialog :title="dialogtitle" :visible.sync="dialogFormVisible2" :append-to-body='true'>
    <el-form :model="rulesForm" :rules="rules" status-icon ref="rulesForm" label-width="100px" class="demo-rulesForm">
    <el-form-item label="充值渠道">
    <el-select v-model="rulesForm.qd" style="width: 100%">
    <el-option v-for="(item,index) in status1ok" :label="item.name"
    :value="item.id" :key="index"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="金额" prop="rmb">
    <el-input
    v-model.number="rulesForm.rmb">
    </el-input>
  </el-form-item>
    <el-form-item label="备注">
    <el-input
  type="textarea"
  placeholder="请输入备注"
  v-model="rulesForm.note">
    </el-input>
    </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">充值</el-button>
  </div>
</el-dialog>
<!-- 在线充值dialog -->
<!-- 手动扣减dialog -->
    <el-dialog :title="dialogtitle2" :visible.sync="dialogFormVisible2j" :append-to-body='true'>
    <el-form :model="rulesFormj" :rules="rules2" status-icon ref="rulesFormj" label-width="100px" class="demo-rulesForm">
    <el-form-item label="扣减方式">
    <el-select v-model="rulesFormj.type" style="width: 100%">
    <el-option v-for="(item,index) in status1j" :label="item.name"
    :value="item.id" :key="index"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="扣减渠道">
    <el-select v-model="rulesFormj.qd" style="width: 100%">
    <el-option v-for="(item,index) in status1" :label="item.name"
    :value="item.id" :key="index"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="扣减账号" prop="accountabout">
    <el-select v-model="rulesFormj.accountabout" filterable style="width: 100%">
    <el-option v-for="(item,index) in status2j" :label="item.username"
    :value="item.id" :key="index"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="金额" prop="rmb">
    <el-input
    v-model.number="rulesFormj.rmb">
    </el-input>
  </el-form-item>
    <el-form-item label="备注">
    <el-input
  type="textarea"
  placeholder="请输入备注"
  v-model="rulesFormj.note">
    </el-input>
    </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2j = false">取 消</el-button>
    <el-button type="primary" @click="submitForm2">手动扣减</el-button>
  </div>
</el-dialog>
<!-- 手动扣减dialog -->
    </div>
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
      <el-select class="input3" v-model="formdata.type" placeholder="请选择">
      <el-option
      v-for="item in formok.statusoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">渠道：</div>
      <el-select class="input3" v-model="formdata.qd" placeholder="请选择">
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
      start-placeholder=""
      end-placeholder=""
      :picker-options="pickerOptions">
    </el-date-picker></div>
      </el-col>
      <el-col class="company">
      <div class="inputok"><div class="input2">单号：</div>
      <el-input v-model="formdata.ordernum" class="input3"></el-input></div>
      </el-col>
      <el-col class="searchok">
      <div class="search">
      <el-tag v-if="checkw2" effect="plain" type="success" class="tagok">交易数：{{pagination.total}}</el-tag>
      <el-tag effect="plain" type="danger" style="min-width:168px;" class="tagok">余额：{{balance}}</el-tag>
      <el-button type="primary">导出</el-button>
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
    <span v-if="checkw" class="el1" style="float:right;">交易数：{{pagination.total}}</span>
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
// 引入审核组件
import checkrecharge from '@/components/checkrecharge'
// 引入更多操作组件
import ToMore from '@/components/ToMoreRecharge'
import qdtag from '@/components/qdtag'
import rechargetype from '@/components/rechargetype'
import Note from '@/components/rechragenote'
import { rechargelist } from '@api/rechargelist'
import { userlist } from '@api/userlist'
import { lowerAppreciation } from '@api/lowerAppreciation'
import { lowerDeduction } from '@api/lowerDeduction'
import { recharge } from '@api/recharge'
import _lodash from 'lodash'
export default {
  data () {
    return {
      // 余额
      balance: 120000,
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
        ordernum: '', // 单号
        type: '', // 收支类型
        account: '', // 账号
        accountabout: '', // 关联账号
        qd: '', // 渠道
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
          value: '手动',
          label: '手动'
        }, {
          value: '余额',
          label: '余额'
        }, {
          value: '支付宝',
          label: '支付宝'
        }, {
          value: '微信',
          label: '微信'
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
        currentPage: parseInt(localStorage.getItem('rechargecheckcurrentPage')) || 1,
        pageSize: 15,
        total: 12
      },
      columns: [
        {
          title: '渠道',
          component: {
            name: qdtag,
            props: {
              myProps: ''
            }
          },
          key: 'qd',
          // fixed: 'left',
          width: '100',
          filters: [
            { text: '手动', value: 1 },
            { text: '支付宝', value: 2 },
            { text: '微信', value: 3 },
            { text: '余额', value: 4 }
          ],
          filterMethod (value, row) {
            return row.qd === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '金额',
          width: 100,
          key: 'rmb',
          sortable: true
        },
        {
          title: '单号',
          key: 'ordernum',
          width: 168
        },
        {
          title: '收支类型',
          component: {
            name: rechargetype,
            props: {
              myProps: ''
            }
          },
          key: 'type',
          width: 168,
          filters: [
            { text: '充值', value: 1 },
            { text: '支出', value: 2 }
          ],
          filterMethod (value, row) {
            return row.type === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '操作账号',
          key: 'accountName'
        },
        {
          title: '流水账号',
          key: 'accountaboutName',
          width: 168
        },
        {
          title: '操作',
          key: 'lang',
          fixed: 'right',
          component: {
            name: checkrecharge,
            props: {
              myProps: '',
              // 将父组件的刷新函数传到子组件
              fetchData: this.fetchData
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
        },
        {
          title: '公司名',
          key: 'company',
          width: 168
        },
        {
          title: '时间',
          key: 'time',
          width: 200
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
  created () {
    // 鉴权
    this.$util.authen(['null', 0])
  },
  mounted () {
    userlist().then(res => {
      this.status2j = res.data
    }).catch(err => {
      console.log('err', err)
    })
    let getcurrentPage = parseInt(localStorage.getItem('rechargecheckcurrentPage')) || 1
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
    // 在线充值
    submitForm () {
      this.$refs.rulesForm.validate((valid) => {
        // 表单校验
        if (valid) {
          let h = this.$createElement
          this.rulesForm.qdtype = this.status1.filter(item => item.id === this.rulesForm.qd)[0].name
          // 先解构
          const { rmb, qdtype, note } = this.rulesForm
          // 再赋值-传给后端的参数
          const confirmText = [
            `充值明细确认：`,
            `金额：${rmb}`,
            `渠道：${qdtype}`,
            `备注：${note}`
          ]
          const newDatas = []
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          let text = h('div', null, newDatas)
          let cuser = `在线充值取消`
          let suser = `在线充值成功`
          // 更新提示
          this.$confirm(text, '确定参数', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            // 个人充值
            console.dir(this.rulesForm)
            recharge(this.rulesForm).then(res => {
              if (res.code === 0) {
                this.$notify({
                  title: '充值',
                  type: 'success',
                  duration: 7000,
                  message: h('b', { style: 'color: teal' }, suser)
                })
                this.balance = this.balance + this.rulesForm.rmb
              } else {
                this.$notify({
                  title: res.msg,
                  type: 'danger',
                  duration: 7000
                })
              }
            }).catch(err => {
              console.log('err', err)
            })
            this.dialogFormVisible2 = false
          }).catch(() => {
            this.$notify({
              title: '充值',
              type: 'info',
              message: h('b', { style: 'color: teal' }, cuser)
            })
          })
        }
      })
    },
    // 手动扣减
    submitForm2 () {
      this.$refs.rulesFormj.validate((valid) => {
        // 表单校验
        if (valid) {
          let h = this.$createElement
          // 快速筛选数组
          this.rulesFormj.accountaboutname = this.status2j.filter(item => item.id === this.rulesFormj.accountabout)[0].username
          this.rulesFormj.qdtype = this.status1.filter(item => item.id === this.rulesFormj.qd)[0].name
          this.rulesFormj.typename = this.status1j.filter(item => item.id === this.rulesFormj.type)[0].name
          // 先解构
          const { accountaboutname, typename, rmb, qdtype, note } = this.rulesFormj
          if (typename === '充值') {
            this.firstm = `你正在给【${accountaboutname}】充值${rmb}元,你的余额减少${rmb}元`
          } else {
            this.firstm = `你正在给【${accountaboutname}】扣减${rmb}元,你的余额增加${rmb}元`
          }
          // 再赋值-传给后端的参数
          const confirmText = [
            // this.firstm,
            `充值账户：${accountaboutname}`,
            `扣减方式：${typename}`,
            `金额：${rmb}`,
            `渠道：${qdtype}`,
            `备注：${note}`
          ]
          const newDatas = []
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          let text = h('div', null, newDatas)
          // let cuser = `在线充值取消`
          // let suser = `在线充值成功`
          // 校验余额是否充足
          if (this.rulesFormj.rmb > this.balance) {
            this.$notify({
              title: '余额不足',
              type: 'error',
              duration: 7000,
              message: '你的余额不足以为代理充值'
            })
          } else {
          // 更新提示
            this.$confirm(text, this.firstm, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              // 充值
              if (this.rulesFormj.type === 1) {
                lowerAppreciation(this.rulesFormj).then(res => {
                  // console.dir(res)
                  if (res.code === 0) {
                    this.$notify({
                      title: this.firstm,
                      type: 'success',
                      duration: 7000
                    })
                    this.balance = this.balance - this.rulesFormj.rmb
                  } else {
                    this.$notify({
                      title: res.msg,
                      type: 'danger',
                      duration: 7000
                    })
                  }
                }).catch(err => {
                  console.log('err', err)
                })
              } else {
                // 支出
                lowerDeduction(this.rulesFormj).then(res => {
                  if (res.code === 0) {
                    this.$notify({
                      title: this.firstm,
                      type: 'success',
                      duration: 7000
                    })
                    this.balance = this.balance + this.rulesFormj.rmb
                  } else {
                    this.$notify({
                      title: res.msg,
                      type: 'danger',
                      duration: 7000
                    })
                  }
                }).catch(err => {
                  console.log('err', err)
                })
              }
              this.dialogFormVisible2j = false
            }).catch(() => {
              this.$notify({
                title: '取消',
                type: 'info'
              })
            })
          }
        }
      })
    },
    // 查询数据
    searchok () {
      console.dir(this.formdata)
    },
    // 获取数据
    fetchData () {
      this.loading = true
      rechargelist({ page: this.pagination.currentPage, status: 1 }).then(res => {
        this.data = res.list.data
        this.pagination.total = res.list.total
        this.balance = res.sumamount
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
      localStorage.setItem('rechargecheckcurrentPage', currentPage)
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
          message3.push(selection[a].ordernum)
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
