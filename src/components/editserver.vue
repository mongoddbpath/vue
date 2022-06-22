<template>
<div>
<el-row>
    <el-button type="primary" v-if="this.$util.checkjur2(['null', 0])" @click="dialogFormVisible2 = true">编辑</el-button>
  </el-row>
<!-- 添加服务器表单dialog -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible2" :append-to-body='true'>
    <el-form :model="rulesForm" status-icon ref="rulesForm" label-width="100px" class="demo-rulesForm">
      <el-form-item label="状态">
    <el-select v-model="rulesForm.status" style="width: 100%" placeholder="请选择服务器所在的区域">
    <el-option v-for="(item,index) in status1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="区域">
    <el-select v-model="rulesForm.region" style="width: 100%" placeholder="请选择服务器所在的区域">
    <el-option v-for="(item,index) in region1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="备注" prop="note">
    <el-input
  type="textarea"
  placeholder="请输入备注"
  v-model="rulesForm.note">
</el-input>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </div>
</el-dialog>
    <!-- 添加服务器表单dialog -->
</div>
</template>

<script>
// import { addNode } from '@api/addNode'
export default {
  data () {
    return {
      title: `【${this.scope.row.ip}】服务器编辑`,
      dialogFormVisible2: false,
      region1: ['大陆', '香港', '其他国家'],
      status1: ['使用中', '满载', '归档停用'],
      ckey: '',
      rulesForm: {
        ip: '',
        auth: '',
        note: '',
        region: '',
        status: ''
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
    if (this.scope.row.status === 1) {
      this.rulesForm.status = '使用中'
    } else {
      this.rulesForm.status = '归档停用'
    }
    this.rulesForm.region = this.scope.row.region
    this.rulesForm.note = this.scope.row.note
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
        // let euser = `${this.rulesForm.ip}添加失败`
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
          // addNode(this.rulesForm).then(() => {
          this.$notify({
            title: '服务器添加成功',
            type: 'success',
            duration: 0,
            message: h('b', { style: 'color: teal' }, suser)
          })
          // }).catch(() => {
          //   this.$notify({
          //     title: '服务器添加失败',
          //     type: 'error',
          //     message: h('b', { style: 'color: teal' }, euser)
          //   })
          // })
        }).catch(() => {
          this.$notify({
            title: '服务器添加取消',
            type: 'info',
            message: h('b', { style: 'color: teal' }, cuser)
          })
        })
      }
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
