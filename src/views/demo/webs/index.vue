<template>
<d2-container type="card">
  <template slot="header">网站生成<br>
 如果站点类型选择竞价站，将生成【/网站名】网站，该类型网站一般用来做SEM百度竞价服务<br>
 如果站点类型选择企业站，将生成【域名】网站，等待解析绑定域名后该类型网站一般用来做SEO优化服务
  </template>
<div class="form-view">
<el-form :model="rulesForm" :rules="rules" ref="rulesForm">
  <el-form-item label="站点类型" required>
    <el-select v-model="rulesForm.appNameOK" style="width: 100%"
    placeholder="竞价站一般用来做竞价">
    <el-option v-for="(item,index) in appName1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
  <el-form-item label="网站名(例子：www.abc.com)" prop="name" required>
    <el-tooltip class="item" effect="light"
    content="企业站生成：域名;竞价站生成：/网站名" placement="bottom">
    <el-input v-model="rulesForm.name"
    placeholder="竞价站填写一串字符串;竞价站生成：/网站名">
    </el-input></el-tooltip>
  </el-form-item>
  <el-form-item label="域名(例子：www.abc.com)" prop="domain" required>
    <el-input v-model="rulesForm.domain"
    placeholder="企业站和上方的网站名保持一致"></el-input>
  </el-form-item>
<el-form-item label="是否生成Https(一般填否)" required>
    <el-select v-model="ssl3" style="width: 100%"
    placeholder="请选择是否生成Https">
    <el-option v-for="(item,index) in ssl2" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="选择部署服务器(只有竞价站部署本机服务器)" required>
    <el-select v-model="serve" style="width: 100%"
    placeholder="如果是外贸站请选择境外的服务器">
    <el-option v-for="(item,index) in serve1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="指派给站点用户" required>
    <el-select v-model="rulesForm.kf" style="width: 100%"
    placeholder="指派成功后该用户将获得网站的控制权">
    <el-option v-for="(item,index) in kf1" :label="item.username"
    :value="item.username" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="指派给建站" required>
    <el-select v-model="rulesForm.jz" style="width: 100%"
    placeholder="请选择负责维护该网站的建站">
    <el-option v-for="(item,index) in jz1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
  <el-form-item label="站点用户名" prop="username" required>
    <el-input placeholder="一般地填写自己的名字" v-model="rulesForm.username"></el-input>
  </el-form-item>
  <el-form-item label="公司名" prop="company">
    <el-input v-model="rulesForm.company"
    placeholder="请输入某某某公司"></el-input>
  </el-form-item>
<el-form-item label="手机号" prop="uphone">
    <el-input v-model="rulesForm.uphone"></el-input>
</el-form-item>
<el-form-item label="QQ号" prop="qq">
    <el-input v-model="rulesForm.qq"></el-input>
</el-form-item>
<el-form-item label="邮箱" prop="email">
    <el-input v-model="rulesForm.email"></el-input>
</el-form-item>
<el-form-item label="所在地" prop="address">
    <el-input v-model="rulesForm.address"></el-input>
</el-form-item>
<el-form-item label="业务员">
    <el-select v-model="rulesForm.ywy" style="width: 100%" placeholder="请选择业务员">
    <el-option v-for="(item,index) in ywy1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
  <el-form-item label="套餐" required>
    <el-select v-model="rulesForm.plan" style="width: 100%" placeholder="请选择套餐">
    <el-option type="String" v-for="(item,index) in plan1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="生成语种" prop="lang">
    <el-checkbox-button
    :indeterminate="isIndeterminate"
    v-model="checkAll"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox-button>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group
    v-model="lang"
    @change="handleCheckedCitiesChange"
  >
    <el-checkbox-button
      v-for="city in cities"
      :label="city.id"
      :key="city.id"
    >
      {{city.name}}
    </el-checkbox-button>
  </el-checkbox-group>
  </el-form-item>
    <el-form-item label="合同时间" required>
      <br>
    <el-row>
      <el-col :span="11">
      <el-form-item>
        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
        placeholder="合同开始日期"
        v-model="rulesForm.startTime">
        </el-date-picker>
      </el-form-item>
       </el-col>
      <el-col :span="10">
      <el-form-item>
        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
        placeholder="合同结束日期"
        v-model="rulesForm.endTime"
        :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      </el-col>
    </el-row>
  </el-form-item>
  <el-form-item label="需缴纳金" prop="money">
    <el-input v-model="rulesForm.money" placeholder="请输入整数"></el-input>
  </el-form-item>
  <el-form-item label="已缴纳金" prop="cmoney">
    <el-input v-model="rulesForm.cmoney" placeholder="请输入整数"></el-input>
  </el-form-item>
  <!-- <el-form-item label="网站文件上传">
<el-upload
  class="upload-demo"
  accept=".zip,.gz"
  :on-error="handleAvatarError"
  :on-success="handleAvatarSuccess"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :limit="3"
  :before-upload="beforeUpload"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">
  <b>请将生成网站的文件
  (证书，案例，合同等等文件)压缩成一个到三个
  zip/gz文件，只能上传zip/gz文件，且单个文件不超过200M</b></div>
</el-upload>
</el-form-item> -->
<el-form-item label="关键词套餐" prop="seoKeyWords">
    <el-input type="textarea" v-model="rulesForm.seoKeyWords"
    placeholder="例子：seo,广州seo,广州网站建设"></el-input>
  </el-form-item>
  <el-form-item label="备注" prop="note">
    <el-input type="textarea"
    placeholder="如果是百度竞价站点请输入百度竞价站点名称简写"
    v-model="rulesForm.note"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="reset">重置</el-button>
    <el-button style="width: 120px" type="primary" @click="onSubmit">立即生成</el-button>
  </el-form-item>
</el-form>
</div>
</d2-container>
</template>

<script>
// 创建网站接口
import { createSite } from '@api/createSite'
import { userlist } from '@api/userlist'
import { weblist } from '@api/weblist'
import { userAddSite } from '@api/userAddSite'
import util from '@/libs/util.js'
// 服务器接口
import { nodelist } from '@api/nodelist'
export default {
  data () {
    return {
      // Https与Http
      ssl1: [0, 1],
      ssl2: ['不启用Https', '启用https，系统自动生成证书并且维护'],
      ssl3: '',
      serve1: ['本机部署(备案的)', '香港服务器部署(未备案的)'],
      serve: '',
      hostId1: ['', 'iZj6c4rfm2unheu6nofgkaZ'],
      // 预存的站点用户数据
      userarr: '',
      // 建站成功后保存的id
      websiteid: '',
      userid: util.cookies.get('uuid'),
      // 表单校验规则
      rules: {
        name: [
          { required: true, message: '必填' },
          { min: 4, message: '长度至少为4个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '必填' },
          { min: 1, max: 12, message: '长度至少为1到12个字符', trigger: 'blur' }
        ],
        plan: [
          { required: true, message: '必选' }
        ],
        startTime: [
          { required: true, message: '必选' }
        ],
        endTime: [
          { required: true, message: '必选' }
        ]
      },
      checkAll: false,
      // 前端显示的语种名，这是一个数组
      CName: [],
      // 传给后端的语种参数，这是一个数组
      lang: [],
      // 站点类型的提示
      webCreateName: '',
      cities: [
        { id: 'zh', name: '中文', lang: 'zh' },
        { id: 'en', name: '英语', lang: 'en' },
        { id: 'ja', name: '日语', lang: 'ja' },
        { id: 'de', name: '德语', lang: 'de' },
        { id: 'fr', name: '法语', lang: 'fr' },
        { id: 'fa', name: '波斯语', lang: 'fa' },
        { id: 'ms', name: '马来西亚语', lang: 'ms' },
        { id: 'ru', name: '俄语', lang: 'ru' },
        { id: 'th', name: '泰语', lang: 'th' },
        { id: 'vi', name: '越南语', lang: 'vi' },
        { id: 'ko', name: '朝鲜语', lang: 'ko' },
        { id: 'da', name: '丹麦语', lang: 'da' },
        { id: 'cdo', name: '闽东语', lang: 'cdo' },
        { id: 'id', name: '印尼语', lang: 'id' },
        { id: 'pt', name: '葡萄牙语', lang: 'pt' },
        { id: 'uk', name: '乌克兰语', lang: 'uk' } ],
      isIndeterminate: true,
      plan1: ['外语套餐', 'A套餐', 'B套餐', 'C套餐', 'D套餐', '单词套餐'],
      ywy1: ['钟总', '杨总', '陈总'],
      kf1: ['小贤', '海华', '丽欣'],
      jz1: ['小梅', '小安'],
      appName1: ['竞价站', '企业站'],
      pic: 'http://www.chuangli.net/style/img/logo.jpg',
      mburl: 'http://www.chuangli.net/',
      rulesForm: {
        // 绑定独立域名
        hostId: '',
        username: '',
        ssl: 0,
        company: '',
        uphone: '',
        qq: '',
        email: '',
        address: '',
        name: '',
        domain: '',
        // lang: '',
        startTime: '',
        endTime: '',
        delivery: false,
        note: '',
        plan: '',
        ywy: '',
        kf: '',
        jz: '',
        money: '',
        cmoney: '',
        appNameOK: '',
        styleId: 'styleId',
        seoKeyWords: ''
      },
      // 校正日期
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > this.startTime || time.getTime() < Date.now()
        }
      }
    }
  },
  mounted () {
    // 鉴权
    this.$util.authen(['null', 0, 2])
    // 获取站点用户
    userlist().then(res => {
      this.userarr = res.data
      // es6快速筛选数组
      let arr = res.data.filter(({ group }) => group === 1)
      // 将站点用户赋值给kf1
      this.kf1 = arr
    }).catch()
    // 服务器接口
    nodelist().then(res => {
      var arr = res.data
      var ok1 = ['120.24.23.89(本机服务器)']
      var ok2 = ['']
      for (var a1 = 0; a1 < arr.length; a1++) {
        ok1.push(arr[a1].ip + `(${arr[a1].region})`)
      }
      for (var a2 = 0; a2 < arr.length; a2++) {
        ok2.push(arr[a2].hostId)
      }
      this.serve1 = ok1
      this.hostId1 = ok2
    }).catch(err => {
      console.log('err', err)
      this.loading = false
      this.$notify({
        message: `获取数据失败`
      })
    })
  },
  methods: {
    handleCheckAllChange (val) {
      let checked = this.cities.map(item => {
        return item.id
      })
      // TRY
      this.lang = val ? checked : []
      let checkednameok = this.cities.map(item => {
        return item.name
      })
      this.CName = val ? checkednameok : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    onSubmit () {
      let h = this.$createElement
      this.$refs.rulesForm.validate((valid) => {
        // 表单校验
        if (valid) {
          if (this.checkAll === false) {
            this.CName = []
            for (var l = 0; l < this.cities.length; l++) {
              for (var l1 = 0; l1 < this.lang.length; l1++) {
                if (this.lang[l1] === this.cities[l].id) {
                  this.CName.push(this.cities[l].name)
                }
              }
            }
          }
          // Https与Http
          for (var s = 0; s < this.ssl1.length; s++) {
            if (this.ssl3 === this.ssl2[s]) {
              this.rulesForm.ssl = this.ssl1[s]
            }
          }
          // 先解构
          const { appNameOK, username, company, kf, jz, money, cmoney, uphone, plan, qq, email, address, ywy, name, domain, startTime, endTime, note } = this.rulesForm
          // this.rulesForm.lang = this.lang
          this.rulesForm.lang = String(this.CName)
          // 再赋值-传给后端的参数
          const confirmText = [
            `网站参数确认：`,
            `绑定的域名：${domain}`,
            `服务器选择：${this.serve}`,
            `站点类型：${appNameOK}`,
            `Https：${this.ssl3}`,
            `客户名：${username}`,
            `公司名：${company}`,
            `客户手机号：${uphone}`,
            `客户QQ：${qq}`,
            `客户的邮箱：${email}`,
            `客户所在地：${address}`,
            `业务员：${ywy}`,
            `指派给建站：${jz}`,
            `指派给站点用户：${kf}`,
            `网站套餐：${plan}`,
            `要生成的语种：${this.CName}`,
            `合同时间：【${startTime}】 - 【${endTime}】`,
            `需缴纳金：${money}`,
            `已缴纳金：${cmoney}`,
            `关键词套餐：${this.rulesForm.seoKeyWords}`,
            `备注：${note}`
          ]
          const newDatas = []
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          let text = h('div', null, newDatas)
          if (this.rulesForm.appNameOK === '企业站') {
            this.webCreateName = `将生成【${domain}】企业站点网站，请核对`
            this.webCreateNameOK = `【${domain}】`
          } else {
            this.webCreateName = `将生成【/${name}】竞价站点网站，请核对`
            this.webCreateNameOK = `【/${name}】`
          }
          let weberror = `${this.webCreateNameOK}网站生成失败`
          let webOK = `${this.webCreateNameOK}网站生成成功，可请前往站点管理页面来登录后台,
          如果建站有任何问题可通过QQ与建站与客服沟通`
          this.$confirm(text, this.webCreateName, {
            dangerouslyUseHTMLString: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            let that = this
            if (that.rulesForm.appNameOK == null) {
              this.$notify({
                title: '请选择你的站点类型',
                type: 'error',
                message: h('i', { style: 'color: teal' }, weberror)
              })
            } else if (this.rulesForm.appNameOK === '企业站') {
              that.rulesForm.appName = 'site'
            } else if (this.rulesForm.appNameOK === '竞价站') {
              that.rulesForm.appName = 'dirSite'
            }
            // 本机部署与香港服务器部署
            for (var bs = 0; bs < that.serve1.length; bs++) {
              if (that.serve === that.serve1[bs]) {
                that.rulesForm.hostId = that.hostId1[bs]
              }
            }
            if (that.rulesForm.hostId !== '' && that.rulesForm.appName === 'dirSite') {
              this.$notify({
                message: `香港服务器选择不可以使用竞价站`
              })
            } else {
            // 生成网站接口,建站部分
              createSite(that.rulesForm).then(() => {
              // 在这里修改接口
                weblist(1).then(res => {
                  let webarr = res.data.filter(({ name }) => name === that.rulesForm.name)
                  // console.log('webarr:' + webarr[0].id)
                  let setdata = {}
                  setdata.siteid = webarr[0].id
                  that.websiteid = setdata.siteid
                  setdata.userid = that.userid
                  userAddSite(setdata).then(res => {
                    let user2 = {}
                    user2.u = that.kf1.filter(({ username }) => username === that.rulesForm.kf)
                    user2.userid = user2.u[0].id
                    user2.siteid = that.websiteid
                    userAddSite(user2).then(res => {
                      this.$notify({
                        message: `同时站点管理权已经被添加`
                      })
                    })
                  })
                }).catch(err => {
                  console.log('err', err)
                  this.loading = false
                  this.$notify({
                    message: `获取数据失败`
                  })
                })
                this.$confirm(webOK, '网站生成成功', {
                  confirmButtonText: '确定',
                  cancelButtonText: '前往查看',
                  showClose: false,
                  type: 'success'
                }).then(() => {}).catch(() => {
                  this.$router.push({
                    name: 'webcontrol'
                  })
                })
              }).catch(() => {
                this.$notify({
                  title: '网站生成失败',
                  type: 'error',
                  message: h('b', { style: 'color: teal' }, weberror)
                })
              })
            // 建站部分OK
            }
          }).catch(() => {
            this.$notify({
              title: '网站生成取消',
              type: 'info',
              message: h('b', { style: 'color: teal' }, '网站生成已取消')
            })
          })
        } else {
          this.$notify({
            title: '请核对表单信息',
            type: 'error',
            duration: 6000,
            message: h('b', { style: 'color: #fc2828' }, '表单数据不完整或者格式有误')
          })
          return false
        }
      })
    },
    reset () {
      // 将所有属性设置为空
      // eslint-disable-next-line
      Object.keys(this.rulesForm).forEach( key => { this.rulesForm[key] = '' })
    },
    See (e) {
      window.open(e)
    },
    beforeUpload (file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'zip'
      const extension2 = testmsg === 'gz'
      const isLt200M = file.size / 1024 / 1024 < 200
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 zip、gz格式!',
          type: 'warning'
        })
      }
      if (!isLt200M) {
        this.$message({
          message: '上传文件大小不能超过 200MB!',
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
        message: `上传失败`
      })
    },
    handleAvatarSuccess (file, fileList) {
      this.$notify({
        title: `文件
        ${fileList.name}上传成功`
      })
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
