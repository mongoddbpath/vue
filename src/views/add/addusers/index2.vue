<template>
<d2-container type="card">
<!-- 网站信息表单 -->
<el-row class="formv">
<el-col :span="spanok" :offset="offsetok">
<el-form :model="rulesForm" :rules="rules" ref="rulesForm">
<el-form-item v-if="checkid" prop="group">
<div class="typename required">身份：</div>
<el-radio-group v-model="rulesForm.group">
    <el-radio :label="1">客户</el-radio>
    <el-radio :label="3">客服</el-radio>
    <el-radio :label="6">业务员</el-radio>
</el-radio-group>
</el-form-item>
<el-form-item v-if="checkid">
<div class="typename required">网站授权：</div>
<el-radio-group v-model="au">
    <el-radio :label="false">否</el-radio>
    <el-radio :label="true">是</el-radio>
</el-radio-group>
</el-form-item>
<el-form-item v-if="au" prop="checkok">
  <div class="typename required">网站选择：</div>
    <el-select v-model="rulesForm.siteid" filterable>
    <el-option v-for="(item,index) in sitearr" :label="item.hxn"
    :value="item.id" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item prop="username" required>
  <div class="typename required">账户名：</div>
    <el-input v-model="rulesForm.username"></el-input>
</el-form-item>
<el-form-item prop="realName" required>
  <div class="typename required">真实姓名：</div>
    <el-input v-model="rulesForm.realName"></el-input>
</el-form-item>
<el-form-item prop="tel" required>
  <div class="typename required">手机号：</div>
    <el-input v-model="rulesForm.tel"></el-input>
</el-form-item>
<el-form-item prop="company" required>
  <div class="typename required">公司名：</div>
    <el-input v-model="rulesForm.company"></el-input>
</el-form-item>
<el-form-item prop="password" required>
  <div class="typename required">密码：</div>
    <el-input v-model="rulesForm.password"  show-password></el-input>
</el-form-item>
<el-form-item prop="cpassword" required>
  <div class="typename required">密码确认：</div>
    <el-input v-model="rulesForm.cpassword"  show-password></el-input>
</el-form-item>
  <!-- 操作按钮 -->
  <el-form-item>
  <div class="buttonok2">
    <el-button type="primary" @click="next1" class="buttonok">确定</el-button>
    <el-button @click="reset" class="buttonok" style="margin-right:12px;">重置</el-button>
    </div>
  </el-form-item>
  <!-- 操作按钮 -->
  </el-form>
  </el-col>
</el-row>
<!-- 网站信息表单 -->
</d2-container>
</template>

<script>
import { register } from '@api/register'
import { sitelist } from '@api/sitelist'
// 添加用户授权
import { userAddSite } from '@api/userAddSite'
import util from '@/libs/util.js'
export default {
  data () {
    // 验证password
    var checkpassword = (rule, value, callback) => {
      if (this.rulesForm.password !== this.rulesForm.cpassword) {
        callback(new Error('两个密码不一致，请修改'))
      } else {
        callback()
      }
    }
    // 授权网站的必要
    var checkokk = (rule, value, callback) => {
      if (this.au && this.rulesForm.siteid === '') {
        callback(new Error('授权请选择网站'))
      } else if (!this.au && this.rulesForm.siteid === '') {
        callback()
      } else {
        callback()
      }
    }
    return {
      // 网站名的回显
      checkname: '',
      au: false,
      // 选中的
      sitearra: '',
      // 回显
      sitearr: [],
      checkid: parseInt(this.$util.cookies.get('uid')) === 2,
      // 步骤条
      active: 0,
      userid: util.cookies.get('uuid'),
      // 网站信息表单校验规则
      rules: {
        group: [
          { required: true, message: '必选' }
        ],
        username: [
          { required: true, message: '必填' },
          { min: 3, max: 28, message: '长度至少为3个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '必填' }
        ],
        tel: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '必填' }
        ],
        password: [
          { required: true, message: '必填' },
          { min: 8, max: 28, message: '长度至少为8个字符', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: '必填' },
          { min: 8, max: 28, message: '长度至少为8个字符', trigger: 'blur' },
          { validator: checkpassword, trigger: 'blur' }
        ],
        checkok: [{ validator: checkokk, trigger: 'blur' }]
      },
      rulesForm: {
        // 用户创建OK
        group: '',
        origincheckok: '',
        username: '',
        realName: '',
        tel: '',
        password: '',
        cpassword: '',
        siteid: ''
        // 用户创建OK
      },
      // 校正日期
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > this.startTime || time.getTime() < Date.now()
        }
      }
    }
  },
  // OK
  watch: {
    au () {
      if (!this.au) {
        this.rulesForm.siteid = ''
      }
    }
  },
  computed: {
    textok () {
      if (this.rulesForm.group === 1) {
        return `同时已经将${this.checkname}【所属授权】给${this.rulesForm.realName}`
      } else {
        return `同时已经将${this.checkname}授权给${this.rulesForm.realName}`
      }
    },
    confirmtextok () {
      if (this.au && this.rulesForm.group === 1) {
        return '添加用户同时【专属授权】网站'
      } else if (this.au) {
        return '添加用户同时授权网站'
      } else {
        return '请确认用户参数'
      }
    },
    groupname () {
      switch (parseInt(this.rulesForm.group)) {
        case 1:
          return '客户'
        case 3:
          return '客服'
        case 6:
          return '业务员'
        default:
          return '未添加'
      }
    },
    // 设置不同屏幕的偏移量
    spanok () {
      return document.body.clientWidth > 1500 ? 8 : 10
    },
    offsetok () {
      return document.body.clientWidth > 1500 ? 8 : 7
    }
  },
  created () {
    // 鉴权
    this.$util.authen(['null', 0, 2])
  },
  mounted () {
    // 准备
    // 8位数随机字符串
    // this.rulesForm.name = Math.random().toString(36).slice(-8)
    sitelist().then(res => {
      let arr = res.data
      // 站点数组sitearr
      for (var a1 = 0; a1 < arr.length; a1++) {
        if (arr[a1].company === null) {
          this.sitearr[a1] = {}
          this.sitearr[a1].name = arr[a1].url
          this.sitearr[a1].hxn = arr[a1].url
          this.sitearr[a1].id = arr[a1].id
        } else {
          this.sitearr[a1] = {}
          this.sitearr[a1].name = arr[a1].url
          this.sitearr[a1].hxn = `${arr[a1].url}【${arr[a1].company}】`
          this.sitearr[a1].id = arr[a1].id
        }
      }
      // console.dir(this.sitearr)
    }).catch(err => {
      console.log('err', err)
      this.loading = false
      this.$notify({
        message: `获取数据失败`
      })
    })
  },
  methods: {
    // 用户信息校验
    next1 () {
      this.$refs.rulesForm.validate((valid) => {
        if (valid) {
          if (this.au && this.rulesForm.group === 1) {
            this.rulesForm.origincheckok = 1
          } else {
            this.rulesForm.origincheckok = ''
          }
          // console.dir(this.rulesForm)
          this.submitForm()
        }
      })
    },
    submitForm () {
      if (this.au) {
        // 快速筛选数组
        this.checkname = this.sitearr.filter(item => item.id === this.rulesForm.siteid)[0].hxn
      } else {
        this.rulesForm.siteid = ''
      }
      let h = this.$createElement
      // 先解构
      const { username, tel, company, password, realName } = this.rulesForm
      // 再赋值-传给后端的参数
      var confirmText = [
        `身份：${this.groupname}`,
        `公司名：${company}`,
        `账户名：${username}`,
        `真实姓名：${realName}`,
        `手机号：${tel}`,
        `密码：${password}`
      ]
      if (this.au) {
        confirmText = [`授权的网站：${this.checkname}`, ...confirmText]
        // confirmText.push(`授权的网站：${this.checkname}`)
      }
      const newDatas = []
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      let text = h('div', null, newDatas)
      let euser = `${this.rulesForm.username}添加失败`
      let cuser = `用户${this.rulesForm.username}添加取消`
      let suser = `用户${this.rulesForm.username}添加成功`
      // 添加提示
      this.$confirm(text, this.confirmtextok, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        let that = this
        // console.dir(this.rulesForm)
        if (this.rulesForm.siteid !== '' && this.au) {
          register(this.rulesForm).then((res) => {
            this.$notify({
              title: '用户添加成功',
              type: 'success',
              duration: 7000,
              message: h('b', { style: 'color: teal' }, suser)
            })
            if (parseInt(res) > 1) {
              let info = that.rulesForm
              info.userid = res
              userAddSite(that.rulesForm).then((res) => {
                that.$notify({
                  title: '授权成功',
                  type: 'success',
                  duration: 0,
                  message: h('b', { style: 'color: teal' }, that.textok)
                })
              }).catch(() => {
                this.$notify({
                  title: '授权失败',
                  type: 'error'
                })
              })
            } else {}
          }).catch(() => {
            this.$notify({
              title: '用户添加失败',
              type: 'error',
              message: h('b', { style: 'color: teal' }, euser)
            })
          })
        } else {
          // 只是添加用户的情况
          register(this.rulesForm).then(() => {
            this.$notify({
              title: '用户添加成功',
              type: 'success',
              duration: 7000,
              message: h('b', { style: 'color: teal' }, suser)
            })
          }).catch(() => {
            this.$notify({
              title: '用户添加失败',
              type: 'error',
              message: h('b', { style: 'color: teal' }, euser)
            })
          })
        }
      }).catch(() => {
        this.$notify({
          title: '用户添加取消',
          type: 'info',
          message: h('b', { style: 'color: teal' }, cuser)
        })
      })
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    prev () {
      if (this.active-- < 0) this.active = 0
    },
    reset () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.rulesForm).forEach( key => { this.rulesForm[key] = '' })
    }
  }
}
</script>

<style scoped lang="stylus">
img
  cursor: pointer
.el-form-item__label
  font-size: 17px
  font-weight: bold
.el-upload__tip
  font-size 14px
.el-upload-dragger
  width 400px
>>> .el-form-item
    margin-bottom: 0
>>> .el-checkbox-button__inner{
    border-left: 1px solid #DCDFE6}
>>> .el-input {
    float: left;
    width: 400px;
}
>>> .el-form-item
    margin: 20px 0;
>>> .el-select,.el-textarea
    float: left;
    width: 400px;
>>> .el-date-editor{
    width: 180px !important;
}
>>> .el-form {
    margin-top: 40px !important;
}
>>> .el-form-item__error {
    left: 88px;
}
>>> .time1 .el-form-item__error
    left 0
>>> .time2 .el-form-item__error
    left 0
>>> .el-collapse-item__header {
    font-size: 20px;}
>>> .el-collapse-item__content {
    font-size: 16px;
}
.typename
  width: 88px
  float:left
  font-size: 15px
  color: #606266
.required:before
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
.time2,.time1
  float:left
.timeok
  float left
  width 40px
  text-align center
.buttonok
  float:right
.buttonok2
  width:488px
.prevbutton
  margin-right 20px
.infoCurrent
  margin-top 40px
.dd
  font-size 20px
.fail img,.success img {
    margin: 0 auto;
    display: block;
}
.f1{
    width: 20px;
    float: left;
    padding-top: 4px;
    margin-left: 20% !important;
}
.f2{
  font-weight: normal;
    padding-left: 18px;
    height: 28px;
    line-height: 28px;
    float: left;
}
.f3 {
    float: left;
    padding-left: 10px;
    line-height: 28px;
    color: #409EFF;
    cursor: pointer;
}
.fail p,.success p {
    text-align: center;
}
.fail p{
  font-weight:bold;
}
.gotoweblist{
  margin-top: 58px !important;
  margin: 0 auto;
  display: block;
}
.formv{
  min-height: 80vh;
}
.infoCurrentOK{font-size: 20px;}
</style>
