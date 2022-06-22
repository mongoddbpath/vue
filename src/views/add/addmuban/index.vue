<template>
<d2-container type="card">
  <template slot="header">模板上传</template>
<div class="form-view">
<el-form :model="rulesForm" :rules="rules" ref="rulesForm">
<el-form-item label="类型" required>
    <el-select v-model="rulesForm.type" style="width: 100%"
    placeholder="必选项，请选择上传模板的类型">
    <el-option v-for="(item,index) in type1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
  <el-form-item label="模板编号" prop="name" required>
    <el-input v-model="rulesForm.name" placeholder="必填项，否则上传不成功，格式：muban128"></el-input>
  </el-form-item>
  <el-form-item label="网站模板上传" required>
<el-upload
  class="upload-demo"
  accept=".temp"
  ref="upload"
  :auto-upload="false"
  :data="paramsData"
  :on-error="handleAvatarError"
  :on-success="handleAvatarSuccess"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :limit="1"
  :before-upload="beforeUpload"
  drag
  action="/style/create"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">
  请选择上传你的模板文件，单次只能上传一个Temp文件，且单个文件不超过6M</div>
</el-upload>
</el-form-item>
  <el-form-item label="备注" prop="note">
    <el-input type="textarea" v-model="rulesForm.note"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="reset">重置</el-button>
    <el-button type="primary" @click="sucessSubmit()">上传模板到服务器</el-button>
  </el-form-item>
</el-form>
</div>
</d2-container>
</template>

<script>
export default {
  data () {
    return {
      type1: [
        '电子/电器/网络',
        '家具/装饰/地产',
        '建筑/建材/五金',
        '工业/机械/设备',
        '服装/服饰/箱包',
        '培训/教育/传媒',
        '汽车/配件/运输',
        '珠宝/钻石/字画',
        '旅游/酒店/饮食',
        '政府/公共/服务',
        '医疗/整形/美容',
        '礼品/艺术/文化',
        '制造/印刷/包装',
        '副食/酒水/饮料',
        '宠物/家禽/养殖',
        '生活/办公/用品'],
      rulesForm: {
        name: '',
        type: '',
        note: ''
      },
      // 校正日期
      rules: {
        name: [{
          required: true,
          message: '请输入模板编号',
          trigger: 'blur'
        }, {
          min: 1,
          max: 36,
          message: '长度在 1 到 36 个字符'
        }
        ],
        type: [{
          required: true,
          message: '请选择改模板的类型',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  computed: {
    paramsData: function () {
      let params = this.rulesForm
      return params
    }
  },
  methods: {
    sucessSubmit () {
      this.$refs.upload.submit()
      // console.log(this.paramsData)
    },
    reset () {
      this.rulesForm.name = ''
      this.rulesForm.demo = ''
      this.rulesForm.note = ''
    },
    beforeUpload (file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'temp'
      const isLt6M = file.size / 1024 / 1024 < 6
      if (!extension) {
        this.$message({
          message: '上传文件只能是 temp格式!',
          type: 'warning'
        })
      }
      if (!isLt6M) {
        this.$message({
          message: '上传文件大小不能超过 6MB!',
          type: 'warning'
        })
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAvatarError (file, fileList) {
      this.$notify({
        title: `模板
        ${fileList.name}上传失败`
      })
    },
    handleAvatarSuccess (file, fileList) {
      this.$notify({
        title: `模板
        ${fileList.name}上传成功`
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
.el-upload__tip
  font-size 14px
.el-upload-dragger
  width 400px

@media screen and (max-width: 500px) {
  .form-view {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
