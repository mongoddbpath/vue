<template>
<d2-container type="card">
<!-- 网站信息表单 -->
<el-row class="formv">
<el-col :span="spanok" :offset="offsetok">
<el-form :model="rulesForm" :rules="rules" ref="rulesForm">
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

<!-- 代理上传Logo和域名 -->
<el-form-item prop="domain" required>
  <div class="typename required">域名：</div>
    <el-input v-model="rulesForm.domain"></el-input>
</el-form-item>
<el-form-item prop="level" required>
  <div class="typename required">层级：</div>
    <el-input v-model.number="rulesForm.level"></el-input>
</el-form-item>
<!--Logo-->
<el-form-item prop="logo">
  <div class="typename required">LOGO：</div>
  <el-upload
        ref="upload"
        :action="uploadAction"
        :beforeUpload="beforeUploadPicture"
        :on-change="imageChange"
        list-type="picture-card"
        name="logo"
        :data="paramsData"
        :limit="1"
        :multiple="false"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemovePicture"
        :on-error="createerror"
        :on-success="createSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
</el-form-item>
<!-- 代理上传Logo和域名 -->
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
    // 验证上传图片是否为空
    var checkimgok = (rule, value, callback) => {
      if (this.checkimg === 0) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    return {
      uploadAction: `${process.env.VUE_APP_API}agent`,
      checkimg: 0,
      dialogImageUrl: '',
      dialogVisible: false,
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
        domain: [
          { required: true, message: '必填' },
          { pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/, message: '请输入正确的域名格式', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '必填' },
          { type: 'number', min: 1, trigger: 'blur' }
        ],
        logo: [
          { validator: checkimgok, trigger: 'blur' }
        ]
      },
      rulesForm: {
        // 代理创建OK
        group: 2,
        username: '',
        realName: '',
        tel: '',
        password: '',
        cpassword: '',
        domain: '',
        level: 2
        // 代理创建OK
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
  computed: {
    paramsData: function () {
      let params = {
        // eventCategory: this.selectedCategorySpe.categoryId,
        domain: this.rulesForm.domain,
        level: this.rulesForm.level,
        companyName: this.rulesForm.company
      }
      return params
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
  },
  methods: {
    createerror () {
      this.$notify({
        title: '代理创建失败',
        type: 'error',
        duration: 7000
      })
    },
    createSuccess (res) {
      let suser = `代理${this.rulesForm.username}【${this.rulesForm.company}】添加成功`
      this.$confirm(suser, '代理添加成功', {
        confirmButtonText: '前往查看',
        cancelButtonText: '继续添加',
        showClose: false,
        type: 'success'
      }).then(() => {
        this.$router.push({
          name: 'agent2'
        })
      }).catch(() => {
        this.reset()
      })
    },
    beforeUploadPicture (file) {
      // eslint-disable-next-line
      const isImage = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'
      const isLt2M = file.size < 1024 * 1024 * 2
      if (!isImage) {
        this.$message.error('上传只能是jpg,jpeg,png格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB')
      }
      return isImage && isLt2M
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemovePicture (file, fileList) {
      this.checkimg = fileList.length
    },
    imageChange (file, fileList, name) {
      this.checkimg = fileList.length
    },

    // 代理信息校验
    next1 () {
      this.$refs.rulesForm.validate((valid) => {
        if (valid) {
          this.submitForm() // 创建代理用户
        }
      })
    },
    submitForm () {
      let h = this.$createElement
      // 先解构
      const { username, tel, company, password, realName, domain, level } = this.rulesForm
      // 再赋值-传给后端的参数
      var confirmText = [
        `绑定域名：${domain}`,
        `代理层级：${level}`,
        `公司名：${company}`,
        `账户名：${username}`,
        `真实姓名：${realName}`,
        `手机号：${tel}`,
        `密码：${password}`
      ]
      const newDatas = []
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      let text = h('div', null, newDatas)
      let cuser = `代理${this.rulesForm.username}添加取消`
      // 添加提示
      this.$confirm(text, '代理添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        let that = this
        // console.dir(this.rulesForm)
        // 只是添加代理的情况
        register(this.rulesForm).then((res) => {
          that.paramsData.id = res
          // console.dir(that.paramsData)
          this.$refs.upload.submit() // 上传LOGO添加代理
        }).catch(() => {
          this.$notify({
            title: '代理添加失败',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$notify({
          title: '代理添加取消',
          type: 'info',
          message: h('b', { style: 'color: teal' }, cuser)
        })
      })
    },
    reset () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.rulesForm).forEach( key => { this.rulesForm[key] = '' })
      this.$refs.upload.clearFiles()
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
