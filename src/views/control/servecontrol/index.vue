<template>
  <d2-container>
    <!-- 搜索 -->
    <el-card class="m-box-card" shadow="hover" style="padding:0">
    <el-row>
      <el-col style="width:auto;margin-right:28px;">
      <el-button type="primary" v-if="this.$util.checkjur2(['null', 0])" @click="dialogFormVisible = true">添加服务器</el-button>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">状态：</div>
      <el-select v-model="searchdata.status" placeholder="请选择" class="input3">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">区域：</div>
      <el-select v-model="searchdata.address" placeholder="请选择" class="input3">
      <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option></el-select></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><div class="input2">IP：</div>
      <el-input v-model="searchdata.ip" class="input3" style="margin-left:-12px;"></el-input></div>
      </el-col>
      <el-col style="width:20%;">
      <div class="inputok"><el-col style="width:auto;margin-left:28px;">
      <el-button type="success">搜索</el-button>
      <el-button type="warning" @click="resetsearch">重置</el-button>
      </el-col></div>
      </el-col>
    </el-row>
    </el-card>
    <!-- 搜索 -->
    <d2-crud
      ref='d2Crud'
      :pagination='pagination'
      :columns='columns'
      :data='
        data.filter(
          data =>
            !search ||
            data.ip.toLowerCase().includes(search.toLowerCase())
        )
      '
      edit-title='用户列表修改'
      :form-options='formOptions'
      @dialog-open='handleDialogOpen'
      @row-edit='handleRowEdit'
      @dialog-cancel='handleDialogCancel'
      @row-remove='handleRowRemove'
      @pagination-current-change='paginationCurrentChange'
    >
    </d2-crud>
    <!-- 添加服务器表单dialog -->
    <el-dialog title="添加服务器" :visible.sync="dialogFormVisible">
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
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </div>
</el-dialog>
    <!-- 添加服务器表单dialog -->
  </d2-container>
</template>

<script>
import { addNode } from '@api/addNode'
import { nodelist } from '@api/nodelist'
import server from '@/components/server'
import DiskCheckVue from '@/components/DiskCheck.vue'
// 停用服务器组件
import stopserver from '@/components/stopserver'
// 编辑服务器信息组件
import editserver from '@/components/editserver'
export default {
  name: 'webcontrol',
  components: {
  },
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
      // 添加服务器说需要到的数据
      region1: ['大陆', '香港', '其他区域'],
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
      },
      dialogFormVisible: false,
      // 搜索所使用到的数据
      options: [{
        value: '全部',
        label: '全部'
      }, {
        value: '使用中',
        label: '使用中'
      }, {
        value: '满载',
        label: '满载'
      }, {
        value: '归档停用',
        label: '归档停用'
      }],
      options2: [{
        value: '全部',
        label: '全部'
      }, {
        value: '香港',
        label: '香港'
      }, {
        value: '大陆',
        label: '大陆'
      }, {
        value: '其他国家',
        label: '其他国家'
      }],
      search: '', // 搜索
      // 搜索的参数
      searchdata: {
        status: '',
        address: '',
        ip: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 3
      },
      columns: [
        {
          title: '服务器名',
          key: 'hostId'
        },
        {
          title: '站点数',
          key: 'id',
          width: '78'
        },
        {
          title: 'IP',
          key: 'ip'
        },
        {
          title: '状态',
          key: 'status',
          width: 88,
          component: {
            name: server,
            props: {
              myProps: ''
            }
          },
          filters: [
            { text: '使用中', value: 1 },
            { text: '配置中', value: 0 },
            { text: '存档', value: 2 },
            { text: '废弃', value: 3 }
          ],
          filterMethod (value, row) {
            return row.status === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '负载',
          key: 'disk_free',
          width: 228,
          component: {
            name: DiskCheckVue,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '区域',
          key: 'region',
          filters: [
            { text: '中国大陆', value: '中国大陆' },
            { text: '香港', value: '香港' },
            { text: '其他国家', value: '其他国家' }
          ],
          filterMethod (value, row) {
            return row.region === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '备注',
          key: 'note'
        },
        {
          title: '操作',
          key: 'lang',
          width: '78',
          fixed: 'right',
          component: {
            name: stopserver,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '',
          key: 'lang',
          fixed: 'right',
          component: {
            name: editserver,
            props: {
              myProps: ''
            }
          }
        }
      ],
      data: [],
      formOptions: {
        labelWidth: '100px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  created () {
    // 鉴权
    this.$util.authen(['null', 0, 2])
  },
  mounted () {
    nodelist().then(res => {
      // console.log('数据：' + res.data)
      this.data = res.data
      this.pagination.total = res.total
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
  methods: {
    // 添加服务器操作
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
      this.ckey = ''
      this.region1 = ['大陆', '香港', '其他区域']
    },
    resetsearch () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.searchdata).forEach( key => { this.searchdata[key] = '' })
    },
    // 添加服务器操作
    handleDialogOpen ({ mode, row }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // 用户的信息
        // console.log(row)
        // 用户修改的按钮
        this.$confirm(
          '用户的信息正在被修改，请问您确定要这么做吗？',
          '您正在修改用户',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            let text = `用户${row.username}修改成功！`
            this.$alert(text, '用户修改', {
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
              message: '用户修改已取消'
            })
          })
        // 交互判断按钮
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'error',
          duration: '5000'
        })
        done()
      }, 300)
    },
    // 传入Mytag组件测试
    handleDataChange (data) {
      console.log('Mytag' + data)
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
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
    width: 58px;
    font-size: 15px;
    float: left;
    padding-left: 10px;
}
.input3 {
    width: 72%;
    float: left;
}
.el-date-editor{
  width: 72% !important;
}
.search{
  float: right;
}
.tagok{
  width: 128px;
  font-size: 14px;
  margin-right: 12px;
}
>>> .d2-crud-body {
    padding: 0 !important;
}

>>> .el-tag {
    font-size: 14px;
}

@media screen and (max-width: 1800px){
.input2 {
    line-height: 40px;
    width: 22%;
    font-size: 1vw;
    float: left;
    padding-left: 2px;
}
.input3 {
    width: 70%;
    float: right;
    padding-right: 6px;
}
.el-date-editor{
  width: 60% !important;
}
}
</style>
