<template>
<d2-container type="card">
  <template slot="header">管理员添加</template>
<div class="form-view">
<el-form :model="rulesForm" status-icon :rules="rules" ref="rulesForm" label-width="100px" class="demo-rulesForm">
  <el-form-item label="管理员名"
  prop="username" style="margin-top:16px;">
    <el-input v-model.number="rulesForm.username" placeholder="输入管理员名"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="tel">
    <el-input v-model="rulesForm.tel" placeholder="13616816888"></el-input>
</el-form-item>
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
  <el-form-item>
    <el-button @click="reset">重置</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </el-form-item>
</el-form>
</div>
</d2-container>
</template>

<script>
import { addadmin } from '@api/addadmin'
export default {
  // 鉴权
  mounted () {
    this.$util.authen(['null', 0])
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
        group: 0,
        password: '',
        cpassword: ''
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
        const { username, tel, password } = this.rulesForm
        // 再赋值-传给后端的参数
        const confirmText = [
          `网站参数确认：`,
          `管理员名：${username}`,
          `密码：${password}`,
          `手机号：${tel}`
        ]
        const newDatas = []
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        let text = h('div', null, newDatas)
        let euser = `${this.rulesForm.username}添加失败`
        let cuser = `管理员${this.rulesForm.username}添加取消`
        let suser = `管理员${this.rulesForm.username}添加成功`
        // 添加提示
        this.$confirm(text, '请确定你要添加的管理员参数', {
          confirmButtonText: '确定添加',
          cancelButtonText: '取消添加',
          type: 'success'
        }).then(() => {
          // 注册接口
          addadmin(this.rulesForm).then(() => {
            this.$notify({
              title: '管理员添加成功',
              type: 'success',
              duration: 0,
              message: h('b', { style: 'color: teal' }, suser)
            })
          }).catch(() => {
            this.$notify({
              title: '管理员添加失败',
              type: 'error',
              message: h('b', { style: 'color: teal' }, euser)
            })
          })
        }).catch(() => {
          this.$notify({
            title: '管理员添加取消',
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
  min-height: calc(80vh)

@media screen and (max-width: 500px) {
  .form-view {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
