<template>
<d2-container>
<div>
  <!-- 详情dialog -->
  <el-dialog :title="detailTitle" :visible.sync="dialogFormVisibleok" :modal="false">
    <el-row>
    <el-col :span="8"><div class="o1">代理详情：</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="12"><div class="o2">公司名：{{rulesForm2.companyName}}</div></el-col>
    <el-col :span="12"><div class="o2">绑定域名：{{rulesForm2.domain}}</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="12"><div class="o2">创建时间：{{rulesForm2.created_at}}</div></el-col>
    <el-col :span="12"><div class="o2">LOGO：<img src="/image/theme/d2/logo/all.png"></div></el-col>
    </el-row>
    <el-row>
    <el-col :span="8"><div class="o1 o6">其他：</div></el-col>
    </el-row>
    <el-row>
    <el-col :span="12"><div class="o2">电话：<span>{{rulesForm2.tel}}</span>
    </div></el-col>
    </el-row>
  </el-dialog>
    <!-- 详情dialog -->
  <!-- 更新代理dialog -->
<el-dialog :title="title" :visible.sync="dialogFormVisible2" :append-to-body='true'>
<el-form :model="rulesForm" :rules="rules" ref="rulesForm">
<el-form-item prop="companyName" required>
  <div class="typename required">公司名：</div>
    <el-input v-model="rulesForm.companyName"></el-input>
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
        :on-success="createSuccess"
        :file-list="fileList">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
</el-form-item>
<!-- 代理上传Logo和域名 -->
  </el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="next1">更新</el-button>
  </div>
</el-dialog>
<!-- 更新代理dialog -->
</div>
    <!-- 搜索 -->
    <el-card class="m-box-card" shadow="hover" style="padding:0;margin-bottom:6px;">
    <el-row>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">代理名：</div>
      <el-input v-model="formdata.name" class="input3"></el-input></div>
      </el-col>
      <el-col class="searchok">
      <div class="search">
      <el-button type="primary" @click="searchok2">刷新</el-button>
      <el-button type="primary" @click="searchok">查询</el-button>
      <el-button @click="emptysearch">重置</el-button>
      </div>
      </el-col>
    </el-row>
    </el-card>
    <!-- 搜索 -->
  <el-table
    :data="tableData1"
    v-loading = "loading"
    row-key="try"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="companyName"
      label="代理名"
      width="300">
    </el-table-column>
    <el-table-column
      prop="rid"
      label="上级代理">
    </el-table-column>
    <el-table-column
      prop="domain"
      label="域名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="余额">
    </el-table-column>
    <el-table-column
      prop="level"
      label="级别">
    </el-table-column>
    <el-table-column
      prop="region"
      label="区域">
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="注册时间"
      width="200">
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="330">
      <template slot-scope="scope">
        <el-button size="mini" @click="agentLogin(scope.row)">登录</el-button>
        <el-button size="mini" @click="agentEdit(scope.row)">编辑</el-button>
        <el-button size="mini" @click="agentDetail(scope.row)">详情</el-button>
        <el-button size="mini" type="danger"
          @click="agentDeleteok(scope.row)">删除</el-button>
        <el-button size="mini" @click="changerStatus(scope.row)"
          :type="parseInt(scope.row.status) === 1 ? 'success' : 'danger'">
          {{ parseInt(scope.row.status) === 1 ? '启' : '停' }}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  style="margin-top:6px;"
      :page-size="pagination.pageSize"
      layout="prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
</d2-container>
</template>
<script>
import { agentdelete } from '@api/agentdelete'
import { agentlogin } from '@api/agentlogin'
import { agentlist } from '@api/agentlist'
import { agentChild } from '@api/agentChild'
// 启停接口
import { disable } from '@api/disable'
export default {
  data () {
    // ddd
    // 验证上传图片是否为空
    var checkimgok = (rule, value, callback) => {
      if (this.checkimg === 0) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisibleok: false,
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
      dialogFormVisible2: false,
      // 代理编辑所需字段
      title: '',
      uploadAction: '/agent/20',
      fileList: [],
      checkimg: '',
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
      // 网站信息表单校验规则
      rules: {
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
        companyName: '',
        domain: '',
        level: ''
        // 代理创建OK
      },
      rulesForm2: {
        companyName: '',
        domain: '',
        level: '',
        created_at: '',
        tel: ''
      },
      // 代理所需编辑字段
      stdata: {
        id: '',
        status: ''
      },
      loading: true,
      pagination: {
        background: true,
        currentPage: parseInt(localStorage.getItem('agentcontrolcurrentPage')) || 1,
        pageSize: 15,
        total: 0,
        pageCount: ''
      },
      tableData1: []
    }
  },
  created () {
    // 鉴权
    this.$util.authen(['null', 0, 2])
    // 监听回车事件
    var _this = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key === 13) {
        _this.searchok()
      }
    }
  },
  mounted () {
    this.fetchData({ page: this.pagination.currentPage })
  },
  computed: {
    detailTitle () {
      return `【${this.rulesForm2.companyName}】代理详情：`
    },
    paramsData: function () {
      let params = {
        domain: this.rulesForm.domain,
        level: this.rulesForm.level,
        companyName: this.rulesForm.companyName
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
  watch: {
    dialogFormVisible2 () {
      if (this.dialogFormVisible2 === false) {
        this.fileList = []
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 搜索
    // 查询数据
    searchok () {
      let a = {}
      a.page = 1
      a.companyName = this.formdata.name
      this.fetchData(a)
    },
    searchok2 () {
      let a = {}
      a.page = 1
      this.fetchData(a)
      this.emptysearch()
    },
    emptysearch () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.formdata).forEach( key => { this.formdata[key] = '' })
    },
    // 搜索
    agentDetail (row) {
      this.dialogFormVisibleok = true
      this.rulesForm2.companyName = row.companyName
      this.rulesForm2.domain = row.domain
      this.rulesForm2.id = row.id
      this.rulesForm2.level = parseInt(row.level)
      this.title = `【${row.companyName}】代理详情`
    },
    agentLogin (row) {
      agentlogin(row.user_id).then(res => {
        window.open(`http://${res}`)
      }).catch(err => {
        console.log('err', err)
        this.$notify({
          message: `接口失败`
        })
      })
    },
    agentEdit (row) {
      this.dialogFormVisible2 = true
      this.rulesForm.companyName = row.companyName
      this.rulesForm.domain = row.domain
      this.rulesForm.id = row.id
      this.rulesForm.level = parseInt(row.level)
      this.title = `【${row.companyName}】代理编辑`
      // this.fileList = [{ url: '/image/theme/d2/logo/all.png' }]
    },
    agentDeleteok (row) {
      let h = this.$createElement
      let that = this
      let confirmWeb = `你正在删除【${row.companyName}】【${row.domain}】`
      let dweb = `你已成功删除【${row.companyName}】【${row.domain}】`
      this.$confirm(
        confirmWeb,
        '代理删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          agentdelete(row.id).then(res => {
            this.$notify({
              title: '删除',
              duration: 6000,
              type: 'success',
              message: h('b', { style: 'color: teal' }, dweb)
            })
            that.fetchData()
          }).catch(err => {
            console.log('err', err)
            this.loading = false
            this.$notify({
              message: `接口失败`
            })
          })
        }).catch(() => {})
    },
    changerStatus (row) {
      let h = this.$createElement
      const userstatus = parseInt(row.status)
      if (userstatus === 1) {
        let confirmWeb = `你正在禁用【${row.companyName}】，禁用之后将无法登录，你确定要这么做吗？`
        let dweb = `你已成功禁用【${row.companyName}】`
        this.$confirm(
          confirmWeb,
          '禁用',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // 数据操作
            this.stdata.status = 0
            this.stdata.id = row.user_id
            disable(this.stdata).then(res => {
              row.status = 0
            }).catch(err => {
              console.log('err', err)
              this.loading = false
              this.$notify({
                message: `接口失败`
              })
            })
            // 数据操作
            this.$notify({
              title: '禁用',
              duration: 6000,
              type: 'error',
              message: h('b', { style: 'color: teal' }, dweb)
            })
            row.status = !row.status
          }).catch(() => {})
      } else {
        // 前后端数据操作
        this.stdata.status = 1
        this.stdata.id = row.user_id
        disable(this.stdata).then(res => {
          row.status = 1
        }).catch(err => {
          console.log('err', err)
          this.loading = false
          this.$notify({
            message: `接口失败`
          })
        })
        let openweb = `你已经启用【${row.companyName}】服务`
        this.$notify({
          title: '启用服务',
          duration: 6000,
          type: 'success',
          message: h('b', { style: 'color: teal' }, openweb)
        })
        row.status = !row.status
      }
    },
    load (tree, treeNode, resolve) {
      // console.dir(tree.user_id)
      // console.dir(treeNode)
      // console.dir(resolve)
      agentChild(tree.user_id).then(res => {
        let tableData = res.data
        for (let a = 0; a < tableData.length; a++) {
          tableData[a].hasChildren = true
          tableData[a].try = Math.random().toString(36).slice(-8)
        }
        // console.dir(tableData)
        resolve(tableData)
      }).catch(err => {
        console.log('err', err)
        this.loading = false
        this.$notify({
          message: `获取数据失败`
        })
      })
    },
    // 获取数据
    fetchData (fetchDataok) {
      this.loading = true
      let that = this
      agentlist(fetchDataok).then(res => {
        let tableData1 = res.data
        for (let a = 0; a < tableData1.length; a++) {
          tableData1[a].hasChildren = true
          tableData1[a].try = Math.random().toString(36).slice(-8)
        }
        that.tableData1 = tableData1
        that.pagination.total = parseInt(res.total)
        that.pagination.pageCount = parseInt(res.last_page)
        // 等待条
        that.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
        this.$notify({
          message: `获取数据失败`
        })
      })
    },
    // 代理编辑所需
    createerror () {
      this.$notify({
        title: '代理创建失败',
        type: 'error',
        duration: 7000
      })
    },
    createSuccess (res) {
      let h = this.$createElement
      let suser = `代理${this.rulesForm.username}【${this.rulesForm.company}】更新成功`
      this.reset()
      this.$notify({
        title: '代理创建成功',
        type: 'success',
        duration: 0,
        message: h('b', { style: 'color: teal' }, suser)
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
      let that = this
      let h = this.$createElement
      // 先解构
      const { companyName, domain, level } = this.rulesForm
      // 再赋值-传给后端的参数
      var confirmText = [
        `绑定域名：${domain}`,
        `代理层级：${level}`,
        `公司名：${companyName}`
      ]
      const newDatas = []
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      let text = h('div', null, newDatas)
      // 代理更新
      this.$confirm(text, '代理更新', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        that.$refs.upload.submit() // 上传LOGO更新代理
        console.log(1)
      }).catch(() => {
        this.$notify({
          title: '代理更新取消',
          type: 'info'
        })
      })
    },
    reset () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.rulesForm).forEach( key => { this.rulesForm[key] = '' })
      this.$refs.upload.clearFiles()
    }
  // 代理编辑所需
  }
}
</script>

<style scoped>
>>> .el-table .cell {
  white-space: pre;
}
.el-table td, .el-table th {
    border: 1px solid #EBEEF5;
}
.el-table .cell {
    word-break: inherit;
}
>>> .el-dialog__body {
    padding: 0 20px;
}
/*搜索*/
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
