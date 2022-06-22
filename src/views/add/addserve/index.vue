<template>
<d2-container type="card">
  <template slot="header">服务器添加<br>
  </template>
<div class="form-view">
<el-form :model="rulesForm" status-icon :rules="rules" ref="rulesForm" label-width="100px" class="demo-rulesForm">
  <el-form-item label="服务器IP"
  prop="ip" style="margin-top:16px;" required>
    <el-input v-model="rulesForm.ip" placeholder="输入服务器IP(格式：2.3.6.8)"></el-input>
  </el-form-item>
  <el-form-item label="区域">
    <el-select v-model="rulesForm.region" style="width: 100%" placeholder="请选择服务器所在的区域">
    <el-option v-for="(item,index) in region1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
  <el-form-item label="密码" required>
    <el-input type="password" show-password
    placeholder="这里填写购买服务器时候设定的密码"
    v-model="rulesForm.auth" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="ckey">
    <el-input type="password" show-password
    v-model="ckey"
    placeholder="请再次输入购买服务器时候设定的密码" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item label="备注" prop="note">
    <el-input
  type="textarea"
  placeholder="请输入备注"
  v-model="rulesForm.note">
</el-input>
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
import { addNode } from '@api/addNode'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入服务器密码'))
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入服务器密码'))
      } else if (this.ckey !== this.rulesForm.auth) {
        callback(new Error('两次输入服务器密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      region1: ['中国大陆', '香港', '其他区域'],
      ckey: '',
      rulesForm: {
        ip: '',
        auth: '',
        note: '',
        region: ''
      },
      rules: {
        auth: [
          { validator: validatePass, trigger: 'blur' }
        ],
        ckey: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$util.authen(['null', 0])
  },
  methods: {
    submitForm () {
      // 两个服务器密码不一样的情况
      if (this.rulesForm.auth !== this.ckey) {
        this.$alert('两者的服务器密码不一致，还请修改', '服务器密码不一致', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'warning',
              message: '请检查服务器密码'
            })
          }
        })
      } else {
        let h = this.$createElement
        // 先解构
        const { region, ip, auth, note } = this.rulesForm
        // 再赋值-传给后端的参数
        const confirmText = [
          `网站参数确认：`,
          `服务器IP地址：${ip}`,
          `服务器所属区域：${region}`,
          `服务器密码：${auth}`,
          `所有者：${this.$util.cookies.get('name')}`,
          `备注：${note}`
        ]
        const newDatas = []
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        let text = h('div', null, newDatas)
        let euser = `${this.rulesForm.ip}添加失败`
        let cuser = `服务器${this.rulesForm.ip}添加取消`
        let suser = `服务器${this.rulesForm.ip}添加成功`
        // 添加提示
        this.$confirm(text, '请确定你要添加的服务器参数', {
          confirmButtonText: '确定添加',
          cancelButtonText: '取消添加',
          type: 'success'
        }).then(() => {
          // 服务器添加接口
          this.rulesForm.owner = this.$util.cookies.get('name')
          addNode(this.rulesForm).then(() => {
            this.$notify({
              title: '服务器添加成功',
              type: 'success',
              duration: 0,
              message: h('b', { style: 'color: teal' }, suser)
            })
          }).catch(() => {
            this.$notify({
              title: '服务器添加失败',
              type: 'error',
              message: h('b', { style: 'color: teal' }, euser)
            })
          })
        }).catch(() => {
          this.$notify({
            title: '服务器添加取消',
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
      this.region1 = ['中国大陆', '香港', '其他区域']
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
