<template>
<div>
<el-popover trigger="click" placement='left-end'>
          <el-row>
            <el-button v-if="this.$util.checkjur2(['null', 0,2])" style="margin-top:8px;" type="primary"
            @click="dialogFormVisible2 = true">
              产品编辑</el-button>
          </el-row>
          <el-row>
            <el-button v-if="this.$util.checkjur2(['null', 0,2])" style="margin-top:8px;" :type="stoptype"
            @click="stop">
              {{isstop}}</el-button>
          </el-row>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag effect="plain" style='font-size:15px;cursor: pointer;' type='success'>更多</el-tag>
          </div>
        </el-popover>
<!-- 在线充值dialog -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible2" :append-to-body='true'>
    <el-form :model="rulesForm" :rules="rules" status-icon ref="rulesForm" label-width="100px" class="demo-rulesForm">
    <el-form-item label="产品类型" required prop="type">
    <el-select v-model="rulesForm.type" style="width: 100%">
    <el-option v-for="(item,index) in status1ok" :label="item.name"
    :value="item.id" :key="index"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="产品名" required prop="name">
    <el-input
    v-model.number="rulesForm.name">
    </el-input>
  </el-form-item>
  <el-form-item label="基础金额" required prop="price">
    <el-input
    v-model.number="rulesForm.price">
    </el-input>
  </el-form-item>
  <el-form-item label="折扣金额" prop="discount">
    <el-input
    v-model="rulesForm.discount" placeholder='例子：1:0.8,2:0.7,3:0.6'>
    </el-input>
  </el-form-item>
    <el-form-item label="描述" prop="description">
    <el-input
  type="textarea"
  placeholder="请输入描述"
  v-model="rulesForm.description">
    </el-input>
    </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">更新</el-button>
  </div>
</el-dialog>
<!-- 在线充值dialog -->
</div>
</template>

<script>
import { productupdate } from '@api/productupdate'
import { productstop } from '@api/productstop'
export default {
  data () {
    return {
      status1ok: [
        { name: '站点套餐', id: 1 },
        { name: 'SEO', id: 2 },
        { name: '快排', id: 3 },
        { name: '其它', id: 4 }
      ],
      title: `产品编辑`,
      dialogFormVisible2: false,
      region1: ['充值', '支出'],
      status1: ['手动', '余额', '支付宝', '微信'],
      ckey: '',
      rulesForm: {
        type: '',
        name: '',
        price: '',
        discount: '',
        description: ''
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
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    },
    fetchData: {
      default: null
    }
  },
  mounted () {
    this.$util.authen(['null', 0, 2])
    // 一开始加载父组件的数据
    this.rulesForm.id = this.scope.row.id
    this.rulesForm.type = this.scope.row.type
    this.rulesForm.name = this.scope.row.name
    this.rulesForm.price = this.scope.row.price
    this.rulesForm.discount = this.scope.row.discount
    this.rulesForm.description = this.scope.row.description
  },
  computed: {
    // 设置不同屏幕的偏移量
    stoptype () {
      return parseInt(this.scope.row.status) === 0 ? 'primary' : 'danger'
    },
    isstop () {
      return parseInt(this.scope.row.status) === 0 ? '开启产品' : '停用产品'
    },
    info () {
      return parseInt(this.scope.row.status) === 0 ? '开启' : '停用'
    },
    checkw () {
      return document.body.clientWidth > 1500 ? '' : 'mini'
    },
    checkw2 () {
      return document.body.clientWidth > 1500
    }
  },
  methods: {
    stop () {
      // 停用订单交易
      let h = this.$createElement
      let cuser = `产品【${this.scope.row.name}】${this.info}取消`
      // 停用订单交易
      let text = `你要${this.info}的产品为：【${this.scope.row.name}】`
      this.$confirm(text, this.info, {
        confirmButtonText: `确定${this.info}`,
        cancelButtonText: '取消',
        type: this.scope.row.status === 0 ? 'success' : 'error'
      }).then(() => {
        let info = { id: this.scope.row.id }
        productstop(info).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              duration: 7000,
              message: h('b', { style: 'color: teal' }, res.msg)
            })
            this.fetchData()
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
      }).catch(() => {
        this.$notify({
          title: '产品停用取消',
          type: 'info',
          message: h('b', { style: 'color: teal' }, cuser)
        })
      })
    },
    submitForm () {
      this.$refs.rulesForm.validate((valid) => {
        // 表单校验
        if (valid) {
          let h = this.$createElement
          // 先解构
          this.rulesForm.qdtype = this.status1ok.filter(item => item.id === this.rulesForm.type)[0].name
          const { name, price, qdtype, discount, description } = this.rulesForm
          // 再赋值-传给后端的参数
          const confirmText = [
            `产品名：${name}`,
            `类型：${qdtype}`,
            `基础金额：${price}`,
            `折扣金额：${discount || ''}`,
            `描述：${description}`
          ]
          const newDatas = []
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          let text = h('div', null, newDatas)
          let cuser = `产品${name}更新取消`
          // 更新提示
          this.$confirm(text, '请确定你要更新的产品参数', {
            confirmButtonText: '确定更新',
            cancelButtonText: '取消更新',
            type: 'success'
          }).then(() => {
            // 数据
            // console.dir(this.rulesForm)
            this.dialogFormVisible2 = false
            // 产品更新接口
            productupdate(this.rulesForm).then(res => {
              if (res.code === 0) {
                this.$notify({
                  title: '产品更新',
                  type: 'success',
                  duration: 7000,
                  message: h('b', { style: 'color: teal' }, res.msg)
                })
                this.fetchData()
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
          }).catch(() => {
            this.$notify({
              title: '产品更新取消',
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
