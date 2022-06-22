<template>
<d2-container type="card">
  <template slot="header">用户添加<br>
  </template>
<div class="form-view">
<el-form :model="rulesForm" status-icon :rules="rules" ref="rulesForm" label-width="100px" class="demo-rulesForm">
  <el-form-item label="账户名"
  prop="username" style="margin-top:16px;">
    <el-input v-model.number="rulesForm.username" placeholder="输入用户名(使用英文例如：ztbuser1)"></el-input>
  </el-form-item>
  <el-form-item label="真实名字" prop="realName">
    <el-input v-model="rulesForm.realName" placeholder="真实名字"></el-input>
</el-form-item>
  <el-form-item label="所属组">
    <el-select v-model="rulesForm.group2" style="width: 100%" placeholder="请选择所属组">
    <el-option v-for="(item,index) in rulesForm.group1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="手机号" prop="tel">
    <el-input v-model="rulesForm.tel" placeholder="13616816888"></el-input>
</el-form-item>
<el-form-item label="公司名" prop="company">
    <el-input v-model="rulesForm.company" placeholder="公司名"></el-input>
</el-form-item>
<!-- <el-form-item label="用户所在地" prop="address">
    <el-input v-model="rulesForm.address" placeholder="广州"></el-input>
</el-form-item>
<el-form-item label="用户邮箱" prop="email">
    <el-input v-model="rulesForm.email" placeholder="2891162695@qq.com"></el-input>
</el-form-item> -->
  <el-form-item label="密码" prop="password">
    <el-input type="password"
    placeholder="密码长度必须在8到16个字符"
    v-model="rulesForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="cpassword">
    <el-input type="password"
    v-model="rulesForm.cpassword"
    placeholder="请再次输入密码" autocomplete="off"></el-input>
  </el-form-item>
    <!-- <el-form-item label="备注" prop="note">
    <el-input
  type="textarea"
  placeholder="请输入备注"
  v-model="rulesForm.note">
</el-input>
  </el-form-item> -->
  <el-form-item>
    <el-button @click="reset">重置</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </el-form-item>
</el-form>
</div>
</d2-container>
</template>

<script>
import { register } from '@api/register'
import util from '@/libs/util.js'
export default {
  // 鉴权
  mounted () {
    this.$util.authen(['null', 0, 2])
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.rulesForm.cpassword !== '') {
          this.$refs.rulesForm.validateField('cpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.rulesForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rulesForm: {
        username: '',
        tel: '',
        password: '',
        cpassword: '',
        note: '',
        group: '',
        group1: ['客户', '代理', '客服'],
        // 组别标志
        amount: util.cookies.get('uuid'),
        group2: '',
        zp1: ['钟总', '杨总', '陈总'],
        zp: '',
        address: '',
        email: '',
        company: '',
        realName: ''

      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        cpassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // 两个密码不一样的情况
      if (this.rulesForm.password !== this.rulesForm.cpassword) {
        this.$alert('两者的密码不一致，还请修改', '密码不一致', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'warning',
              message: '请修改密码'
            })
          }
        })
      } else {
        let h = this.$createElement
        // 先解构
        const { group2, username, tel, note, password, realName } = this.rulesForm
        // 再赋值-传给后端的参数
        const confirmText = [
          `网站参数确认：`,
          `用户类型：${group2}`,
          `账户名：${username}`,
          `真实姓名：${realName}`,
          `密码：${password}`,
          `手机号：${tel}`,
          `备注：${note}`
        ]
        const newDatas = []
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        let text = h('div', null, newDatas)
        let euser = `${this.rulesForm.username}添加失败`
        let cuser = `用户${this.rulesForm.username}添加取消`
        let suser = `用户${this.rulesForm.username}添加成功`
        // 添加提示
        this.$confirm(text, '请确定你要添加的用户参数', {
          confirmButtonText: '确定添加',
          cancelButtonText: '取消添加',
          type: 'success'
        }).then(() => {
          // 注册接口
          for (var usernum = 0; usernum < this.rulesForm.group1.length; usernum++) {
            if (this.rulesForm.group2 === this.rulesForm.group1[usernum]) {
              this.rulesForm.group = usernum + 1
            }
          }
          register(this.rulesForm).then(() => {
            this.$notify({
              title: '用户添加成功',
              type: 'success',
              duration: 0,
              message: h('b', { style: 'color: teal' }, suser)
            })
          }).catch(() => {
            this.$notify({
              title: '用户添加失败',
              type: 'error',
              message: h('b', { style: 'color: teal' }, euser)
            })
          })
        }).catch(() => {
          this.$notify({
            title: '用户添加取消',
            type: 'info',
            message: h('b', { style: 'color: teal' }, cuser)
          })
        })
      }
    },
    reset () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.rulesForm).forEach( key => { this.rulesForm[key] = '' })
      this.rulesForm.group1 = ['客户', '代理', '客服']
      this.rulesForm.zp1 = ['钟总', '杨总', '陈总']
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
