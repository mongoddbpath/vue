<template>
<div>
<el-row>
    <el-tag effect="plain" style='font-size:15px;cursor: pointer;' @click="dialogFormVisible2 = true">编辑</el-tag>
  </el-row>
<!-- 更新充值明细表单dialog -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible2" :append-to-body='true'>
    <el-form :model="rulesForm" :rules="rules" status-icon ref="rulesForm" label-width="100px" class="demo-rulesForm">
      <el-form-item label="渠道">
    <el-select v-model="rulesForm.qd" style="width: 100%">
    <el-option v-for="(item,index) in status1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="类型">
    <el-select v-model="rulesForm.type" style="width: 100%">
    <el-option v-for="(item,index) in region1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="金额" prop="rmb">
    <el-input
    v-model.number="rulesForm.rmb">
    </el-input>
  </el-form-item>
  <el-form-item label="时间" prop="time">
  <el-date-picker
      value-format="yyyy-MM-dd"
      v-model="rulesForm.time"
      type="date"
      placeholder="选择日期">
    </el-date-picker></el-form-item>
  <el-form-item label="公司名" prop="company">
    <el-input
    v-model="rulesForm.company">
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
    <el-button type="primary" @click="submitForm">更新</el-button>
  </div>
</el-dialog>
<!-- 更新充值明细表单dialog -->
</div>
</template>

<script>
// import { addNode } from '@api/addNode'
export default {
  data () {
    return {
      title: `【${this.scope.row.ordernum}-${this.scope.row.company}】充值编辑`,
      dialogFormVisible2: false,
      region1: ['充值', '支出'],
      status1: ['手动', '余额', '支付宝', '微信'],
      ckey: '',
      rulesForm: {
        type: '',
        qd: '',
        time: '',
        rmb: '',
        company: '',
        note: ''
      },
      // 表单校验规则
      rules: {
        time: [
          { required: true, message: '必选' }
        ],
        company: [
          { required: true, message: '必填' }
        ],
        rmb: [
          { required: true, type: 'number', message: '必须为数字值' }
        ]
      }
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
  mounted () {
    this.$util.authen(['null', 0, 2])
    // 一开始加载父组件的数据
    this.rulesForm.ordernum = this.scope.row.ordernum
    this.rulesForm.account = this.scope.row.account
    this.rulesForm.qd = this.scope.row.qd
    this.rulesForm.type = this.scope.row.type
    this.rulesForm.time = this.scope.row.time
    this.rulesForm.company = this.scope.row.company
    this.rulesForm.rmb = this.scope.row.rmb
    this.rulesForm.note = this.scope.row.note
  },
  computed: {
    // 设置不同屏幕的偏移量
    checkw () {
      return document.body.clientWidth > 1500 ? '' : 'mini'
    },
    checkw2 () {
      return document.body.clientWidth > 1500
    }
  },
  methods: {
    submitForm () {
      // 两个充值明细密码不一样的情况
      this.$refs.rulesForm.validate((valid) => {
        // 表单校验
        if (valid) {
          let h = this.$createElement
          // 先解构
          const { ordernum, rmb, type, account, qd, time, company, note } = this.rulesForm
          // 再赋值-传给后端的参数
          const confirmText = [
            `充值明细确认：`,
            `单号：${ordernum}`,
            `金额：${rmb}`,
            `时间：${time}`,
            `账号：${account}`,
            `收支类型：${type}`,
            `渠道：${qd}`,
            `公司名：${company}`,
            `备注：${note}`
          ]
          const newDatas = []
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          let text = h('div', null, newDatas)
          let cuser = `充值明细${ordernum}更新取消`
          let suser = `充值明细${ordernum}更新成功`
          // 更新提示
          this.$confirm(text, '请确定你要更新的充值明细参数', {
            confirmButtonText: '确定更新',
            cancelButtonText: '取消更新',
            type: 'success'
          }).then(() => {
            // 数据
            console.dir(this.rulesForm)
            this.dialogFormVisible2 = false
            // 充值明细更新接口
            // this.rulesForm.owner = this.$util.cookies.get('name')
            // addNode(this.rulesForm).then(() => {
            this.$notify({
              title: '充值明细更新成功',
              type: 'success',
              duration: 0,
              message: h('b', { style: 'color: teal' }, suser)
            })
          }).catch(() => {
            this.$notify({
              title: '充值明细更新取消',
              type: 'info',
              message: h('b', { style: 'color: teal' }, cuser)
            })
          })
        }
      })
    }
  }
}
</script>

<style scope lang="stylus">
img
  cursor: pointer
.el-form-item__label
  font-size: 17px
  font-weight: bold
.form-view
  width: 400px
  margin: 0 auto
  margin-top:12px
  background-color: #9e9e9e4f
  padding: 10px
  border-radius: 10px
  min-height: calc(100vh - 200px)

@media screen and (max-width: 500px) {
  .form-view {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
