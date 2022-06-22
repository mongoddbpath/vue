<template>
  <d2-container>
    <div class="recharge3" style="margin-top:28px">
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
<div class="recharge3">
    <el-button type="primary" @click="submitForm" style="float:right;">充值</el-button>
</div>
    </div>
  </d2-container>
</template>

<script>
import { recharge } from '@api/recharge'
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
      }
    }
  },
  mounted () {},
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
          // 更新提示
          this.$confirm(text, '确定参数', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            // 个人充值
            let that = this
            recharge(this.rulesForm).then(res => {
              if (res.code === 0) {
                this.$notify({
                  title: '充值',
                  type: 'success',
                  duration: 7000,
                  message: h('b', { style: 'color: teal' }, res.msg)
                })
                that.emptysearch()
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
    // 清空搜索参数
    emptysearch () {
      // eslint-disable-next-line
      Object.keys(this.rulesForm).forEach( key => { this.rulesForm[key] = '' })
    },
    // 多选
    handleSelectionChange (selection) {
      if (selection.length !== undefined) {
      // console.log(selection)
        document.getElementById('getnumok').innerHTML = selection.length
        this.selection = selection
      }
    }
    // 以上定义方法
  }
}
</script>
<style scoped>
.recharge3{
  width: 30vw;
  margin: 0 auto;
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
