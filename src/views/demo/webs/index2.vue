<template>
<d2-container type="card">
<!-- 步骤条 -->
<el-row>
  <el-col :span="16" :offset="4">
  <el-steps :active="active" finish-status="success"  align-center>
  <el-step title="填写网站信息"></el-step>
  <el-step title="填写业务信息(可跳过)"></el-step>
  <el-step title="提交"></el-step>
  </el-steps>
  </el-col>
</el-row>
<!-- 步骤条 -->
<!-- 网站信息表单 -->
<el-row v-show="active==0" class="formv">
  <el-col :span="spanok" :offset="offsetok">
  <el-form :model="rulesForm2" :rules="rules2" ref="rulesForm2">
<el-form-item required prop="appNameOK">
  <div class="typename required">类型：</div>
    <el-select v-model="rulesForm.appNameOK"
    placeholder="竞价站一般用来做竞价">
    <el-option v-for="(item,index) in appName1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item v-if="checkid">
<div class="typename required">测试站：</div>
<el-radio-group v-model="rulesForm.isTest">
    <el-radio :label="0">否</el-radio>
    <el-radio :label="1">是</el-radio>
</el-radio-group>
</el-form-item>
<el-form-item prop="domain" required>
  <div class="typename required">{{domaintitle}}</div>
    <el-input v-model="rulesForm.domain"
    :placeholder="domainmessage"></el-input>
</el-form-item>
<el-form-item required prop="serve">
    <div class="typename required">服务器：</div>
    <el-select v-model="serve" filterable
    placeholder="只有竞价站部署本机服务器">
    <el-option v-for="(item,index) in serve1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item required prop="plan">
  <div class="typename required">套餐：</div>
    <el-select v-model="rulesForm.plan" filterable>
    <el-option type="String" v-for="(item,index) in plan1" :label="item.nameok"
    :value="item.id" :key="index"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item required>
    <div class="typename required">合同时间：</div>
    <div class="time1">
      <el-form-item prop="startTime" style="margin: 0;">
        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
        placeholder="开始日期"
        v-model="rulesForm.startTime">
        </el-date-picker></el-form-item></div>
        <div class="timeok">至</div>
        <div class="time2">
          <el-form-item prop="endTime" style="margin: 0;">
        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
        placeholder="结束日期"
        v-model="rulesForm.endTime"
        :picker-options="pickerOptions1">
        </el-date-picker></el-form-item></div>
  </el-form-item>
  <!-- 操作按钮 -->
  <el-form-item>
  <div class="buttonok2">
    <el-button type="primary" @click="next1" class="buttonok">下一步</el-button></div>
  </el-form-item>
  <!-- 操作按钮 -->
  </el-form>
  </el-col>
</el-row>
<!-- 网站信息表单 -->

<!-- 网站业务信息表单 -->
<el-row v-show="active==1" class="formv">
  <el-col :span="spanok" :offset="offsetok">
  <el-form :model="rulesForm3" :rules="rules3" ref="rulesForm3">
<el-form-item>
    <div class="typename">维护者：</div>
    <el-select v-model="rulesForm.kf"
    placeholder="指派成功后该用户将获得网站的控制权">
    <el-option v-for="(item,index) in kf1" :label="item.username"
    :value="item.id" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item>
    <div class="typename">业务员：</div>
    <el-select v-model="rulesForm.ywy" placeholder="请选择业务员">
    <el-option v-for="(item,index) in ywy1" :label="item"
    :value="item" :key="index"></el-option>
    </el-select>
</el-form-item>
<el-form-item>
    <div class="typename">公司名：</div>
    <el-input v-model="rulesForm.company"
    placeholder="请输入某某某公司"></el-input>
  </el-form-item>
<el-form-item prop="seoKeyWords">
    <div class="typename">关键词：</div>
    <el-input type="textarea" v-model="rulesForm.seoKeyWords"
    placeholder="例子：seo,广州seo,广州网站建设"></el-input>
  </el-form-item>
  <div style="margin: 15px 0;"></div>
  <el-form-item>
    <div class="typename">生成语种：</div>
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
  <el-form-item prop="note">
    <div class="typename">网站备注：</div>
    <el-input type="textarea"
    placeholder="如果是百度竞价站点请输入百度竞价站点名称简写"
    v-model="rulesForm.note"></el-input>
  </el-form-item>
  <!-- 操作按钮 -->
  <el-form-item>
  <div class="buttonok2">
    <el-button type="primary" @click="next2" class="buttonok">下一步</el-button>
    <el-button type="warning" @click="prev" class="buttonok prevbutton">上一步</el-button>
    <el-button type="primary" @click="active=2" class="buttonok skip">跳过</el-button></div>
  </el-form-item>
  <!-- 操作按钮 -->
  </el-form></el-col></el-row>
<!-- 网站业务信息表单 -->

<!-- 网站信息确认 -->
<el-row v-show="active==2" class="formv">
  <el-col :span="spanok" :offset="offsetok">
    <div class="infoCurrent">
      <el-row>
  <el-col>
    <p class="infoCurrentOK">订单金额：{{planmoney}}</p>
    <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
      订单信息：{{isTestOK}}
    </template>
      <!-- <p>网站类型：{{rulesForm.appNameOK}}</p> -->
      <p v-if="rulesForm.appNameOK === '企业站'">域名：{{rulesForm.domain}}</p>
      <p v-if="rulesForm.appNameOK === '竞价站'">域名：{{`ztb.net/${rulesForm.domain}`}}</p>
      <p>网站套餐：{{rulesForm.planname}}</p>
      <!-- <p>服务器：{{serve}}</p> -->
      <p>合同开启时间：{{rulesForm.startTime}}</p>
      <p>合同结束时间：{{rulesForm.endTime}}</p>
      <p>公司名：{{rulesForm.company}}</p>
      <p>维护者：{{rulesForm.kfname}}</p>
      <p>业务员：{{rulesForm.ywy}}</p>
      <p>关键词：{{rulesForm.seoKeyWords}}</p>
      <p>语种：{{getlang || '中文'}}</p>
      <p>备注：{{rulesForm.note}}</p>
  </el-collapse-item></el-collapse>
  </el-col>
</el-row>
    </div>
    <!-- 操作按钮 -->
  <div class="buttonok2" style="margin-top:20px;">
    <el-button type="primary" @click="onSubmit" class="buttonok">提交订单</el-button>
    <el-button type="warning" @click="prev" class="buttonok prevbutton">上一步</el-button></div>
  <!-- 操作按钮 -->
  </el-col>
</el-row>
<!-- 网站信息确认 -->

<!-- 网站生成失败 -->
<el-row v-show="active==88" class="formv">
  <el-col :span="spanok" :offset="offsetok">
    <div class="infoCurrent fail">
      <el-row>
        <img src="https://www.chuangli.net/saascms/fail.png">
        <p>{{rulesForm.domain}}您提交的内容有如下错误:</p>
        <p v-if="errorcode===101"><img class="f1" src="https://www.chuangli.net/saascms/fail.png">
        <span class="f2">余额不足，请充值</span><a class="f3" @click="rechargeadd"> 立即充值 ></a></p><br>
        <p v-if="errorcode===100"><img class="f1" src="https://www.chuangli.net/saascms/fail.png">
        <span class="f2">网站名重复</span><a class="f3" @click="active=0"> 立即修改 ></a></p><br>
        <p v-if="errorcode===102"><img class="f1" src="https://www.chuangli.net/saascms/fail.png">
        <span class="f2">当前账号异常，无法创建</span><a class="f3" @click="active=0"> 立即修改 ></a></p>
        <el-button type="primary" @click="active=0" class="gotoweblist">返回修改</el-button>
      </el-row></div></el-col></el-row>
<!-- 网站生成失败 -->

<!-- 网站生成成功 -->
<el-row v-show="active==100" class="formv">
  <el-col :span="spanok" :offset="offsetok">
    <div class="infoCurrent success">
      <el-row>
        <img src="https://www.chuangli.net/saascms/success.png">
        <p>{{rulesForm.domain}}建站订单已创建，如有疑问请联系客服</p>
        <el-button type="primary" @click="gotoweblist" class="gotoweblist">前往查看</el-button>
      </el-row></div></el-col></el-row>
<!-- 网站生成成功 -->

</d2-container>
</template>

<script>
import { productlist } from '@api/productlist'
// 创建网站接口
import { createSite } from '@api/createSite'
import { userlist } from '@api/userlist'
import { userAddSite } from '@api/userAddSite'
import util from '@/libs/util.js'
// 服务器接口
import { nodelist } from '@api/nodelist'
export default {
  data () {
    // 验证domain的规则
    var checkdomain = (rule, value, callback) => {
      // 验证domain的正则表达式
      // let regdomain = /^[-a-zA-Z0-9]{0,62}.21cl.cn$/
      // let regdomain2 = /^(www\.)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
      let regdomain3 = /^(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
      if (this.rulesForm.appNameOK === '企业站') {
        if (!regdomain3.test(value)) {
          callback(new Error('请填写正确的域名格式'))
        } else { callback() }
      } else {
        if (regdomain3.test(value)) {
          callback(new Error('请不要是域名格式,输入不少于四位数的字符串'))
        } else { callback() }
      }
    }
    // 验证server的规则
    var checkserver = (rule, value, callback) => {
      if (this.rulesForm.appNameOK === '企业站' && this.serve.indexOf('120.24.23.89') !== -1) {
        callback(new Error('企业站不可以部署在本机服务器上'))
      } else if (this.rulesForm.appNameOK === '竞价站' && this.serve.indexOf('120.24.23.89') === -1) {
        callback(new Error('竞价站需要部署在本机服务器上'))
      } else {
        callback()
      }
    }
    // 验证endtime
    var checkendtime = (rule, value, callback) => {
      if (this.rulesForm.endTime < this.rulesForm.startTime) {
        callback(new Error('合同截止时间要大于起始时间'))
      } else {
        callback()
      }
    }
    return {
      errorcode: '',
      checkid: parseInt(this.$util.cookies.get('uid')) === 2,
      // 步骤条
      active: 0,
      // Https与Http
      ssl1: [0, 1],
      ssl2: ['不启用Https', '启用https，系统自动生成证书并且维护'],
      ssl3: '',
      serve1: [],
      serve: '',
      hostId1: [],
      // 预存的站点用户数据
      userarr: '',
      // 建站成功后保存的id
      websiteid: '',
      userid: util.cookies.get('uuid'),
      // 网站信息表单校验规则
      rules2: {
        // name: [
        //   { required: true, message: '必填' },
        //   { min: 4, message: '长度至少为4个字符', trigger: 'blur' }
        // ],
        domain: [
          { required: true, message: '必填' },
          { min: 1, max: 100, message: '长度过长', trigger: 'blur' },
          { validator: checkdomain, trigger: 'blur' }
        ],
        plan: [
          { required: true, message: '必选' }
        ],
        serve: [
          { required: true, message: '必选' },
          { validator: checkserver, trigger: 'blur' }
        ],
        appNameOK: [
          { required: true, message: '必选' }
        ],
        startTime: [
          { required: true, message: '必选' }
        ],
        endTime: [
          { required: true, message: '必选' },
          { validator: checkendtime, trigger: 'blur' }
        ]
      },
      // 业务信息表单校验规则
      rules3: {
        company: [
          { required: true, message: '必填' }
        ],
        kf: [
          { required: true, message: '必选' }
        ],
        ywy: [
          { required: true, message: '必选' }
        ]
      },
      // 表单校验规则
      rules: {
        name: [
          { required: true, message: '必填' },
          { min: 4, message: '长度至少为4个字符', trigger: 'blur' }
        ],
        username: [
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
      plan1: [],
      ywy1: ['钟总', '杨总', '陈总'],
      kf1: [{ id: 56, username: 'TEMPORARYACCOUNT' }],
      jz1: ['小梅', '小安'],
      appName1: ['企业站', '竞价站'],
      pic: 'http://www.chuangli.net/style/img/logo.jpg',
      mburl: 'http://www.chuangli.net/',
      rulesForm: {
        isTest: 0,
        planname: '',
        kfname: '',
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
        appNameOK: '企业站',
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
  // OK
  computed: {
    planmoney () {
      let money = ''
      if (this.rulesForm.plan !== '') {
        money = this.plan1.filter(item => item.id === this.rulesForm.plan)[0].price
      } else {
        money = 0
      }
      return `${money}(${this._moneyToMsg(money)})`
    },
    isTestOK () {
      if (this.rulesForm.isTest === 1) {
        return `测试站-${this.serve}`
      } else {
        return `${this.rulesForm.appNameOK}-${this.serve}`
      }
    },
    // 企业站和竞价站的不同提示
    domaintitle () {
      if (this.rulesForm.appNameOK === '企业站') {
        return '域名：'
      } else {
        return '网站名：'
      }
    },
    domainmessage () {
      if (this.rulesForm.appNameOK === '企业站') {
        return '格式推荐：www.***.***'
      } else {
        return '网站名为四位数以上的字符串'
      }
    },
    // 设置不同屏幕的偏移量
    spanok () {
      return document.body.clientWidth > 1500 ? 8 : 10
    },
    offsetok () {
      return document.body.clientWidth > 1500 ? 8 : 7
    },
    // 值
    rulesForm2 () {
      return {
        appNameOK: this.rulesForm.appNameOK,
        domain: this.rulesForm.domain,
        name: this.rulesForm.name,
        serve: this.serve,
        plan: this.rulesForm.plan,
        startTime: this.rulesForm.startTime,
        endTime: this.rulesForm.endTime
      }
    },
    // 值
    rulesForm3 () {
      return {
        kf: this.rulesForm.kf,
        ywy: this.rulesForm.ywy,
        company: this.rulesForm.company
      }
    },
    // 计算属性的 getter
    getlang () {
      // `this` 指向 vm 实例
      let CName2 = []
      // if (this.checkAll === false) {
      for (var l = 0; l < this.cities.length; l++) {
        for (var l1 = 0; l1 < this.lang.length; l1++) {
          if (this.lang[l1] === this.cities[l].id) {
            CName2.push(this.cities[l].name)
          }
        }
      }
      return String(CName2)
    }
  },
  created () {
    // 鉴权
    // this.$util.authen(['null', 0, 2])
  },
  mounted () {
    // 准备
    productlist().then(res => {
      let planok = res.data
      for (let a = 0; a < planok.length; a++) {
        planok[a].nameok = `${planok[a].name}-${planok[a].price}元`
      }
      this.plan1 = planok
    }).catch(err => {
      console.dir(err)
    })
    // 8位数随机字符串
    // this.rulesForm.name = Math.random().toString(36).slice(-8)
    // 获取站点用户
    userlist().then(res => {
      this.userarr = res.data
      if (res.data.length < 1 || res.data.length === undefined) {
      } else {
      // es6快速筛选数组
        // let arr = res.data.filter(({ group }) => group === 3)
        // 将站点用户赋值给kf1
        this.kf1 = this.kf1.concat(res.data)
      }
    }).catch()
    // 服务器接口
    nodelist().then(res => {
      var arr = res.data
      var ok1 = ['120.24.23.89(本机服务器)']
      var ok2 = ['']
      for (var a1 = 0; a1 < arr.length; a1++) {
        ok1.push(arr[a1].ip + `(${arr[a1].region})` + `【${arr[a1].note}】`)
      }
      for (var a2 = 0; a2 < arr.length; a2++) {
        ok2.push(arr[a2].hostId)
      }
      this.serve1 = ok1
      this.hostId1 = ok2
    }).catch(err => {
      console.dir(err)
      this.loading = false
      this.$notify({
        message: `获取数据失败`
      })
    })
  },
  methods: {
    // 数字金额转成繁体
    _moneyToMsg (number, type = 'upper') {
      const confs = {
        lower: {
          num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
          unit: ['', '十', '百', '千', '万'],
          level: ['', '万', '亿']
        },
        upper: {
          num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
          unit: ['', '拾', '佰', '仟'],
          level: ['', '万', '亿']
        },
        decimal: {
          unit: ['分', '角']
        },
        maxNumber: 999999999999.99
      }
      // 过滤不合法参数
      if (Number(number) > confs.maxNumber) {
        console.error(`The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`)
        return false
      }
      const conf = confs[type]
      const numbers = String(Number(number).toFixed(2)).split('.')
      const integer = numbers[0].split('')
      const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('')
      // 四位分级
      const levels = integer.reverse().reduce((pre, item, idx) => {
        let level = pre[0] && pre[0].length < 4 ? pre[0] : []
        let value = item === '0' ? conf.num[item] : conf.num[item] + conf.unit[idx % 4]
        level.unshift(value)
        if (level.length === 1) {
          pre.unshift(level)
        } else {
          pre[0] = level
        }
        return pre
      }, [])
      // 整数部分
      const _integer = levels.reduce((pre, item, idx) => {
        let _level = conf.level[levels.length - idx - 1]
        let _item = item.join('').replace(/(零)\1+/g, '$1') // 连续多个零字的部分设置为单个零字
        // 如果这一级只有一个零字，则去掉这级
        if (_item === '零') {
          _item = ''
          _level = ''
          // 否则如果末尾为零字，则去掉这个零字
        } else if (_item[_item.length - 1] === '零') {
          _item = _item.slice(0, _item.length - 1)
        }
        return pre + _item + _level
      }, '')
      // 小数部分
      let _decimal = decimal
        .map((item, idx) => {
          const unit = confs.decimal.unit
          const _unit = item !== '0' ? unit[unit.length - idx - 1] : ''
          return `${conf.num[item]}${_unit}`
        })
        .join('')
      // 如果是整数，则补个整字
      return `${_integer}元` + (_decimal || '整')
    },
    // 数字金额转成繁体
    // 步骤条数值改变
    // 网站信息校验
    next1 () {
      this.$refs.rulesForm2.validate((valid) => {
        if (valid) {
          this.next()
          this.rulesForm.planname = this.plan1.filter(item => item.id === this.rulesForm.plan)[0].name
        }
      })
    },
    // 业务信息校验
    next2 () {
      this.$refs.rulesForm3.validate((valid) => {
        if (valid) {
          this.next()
          if (this.rulesForm.kf === '') {
            this.rulesForm.kfname = ''
          } else {
            this.rulesForm.kfname = this.kf1.filter(item => item.id === this.rulesForm.kf)[0].username
          }
        }
      })
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    prev () {
      if (this.active-- < 0) this.active = 0
    },
    // 步骤条数值改变
    // 前往站点列表
    gotoweblist () {
      this.$router.push({
        name: 'webcontrol'
      })
    },
    rechargeadd () {
      this.$router.push({
        name: 'rechargeadd'
      })
    },
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
      this.$refs.rulesForm2.validate((valid) => {
        this.rulesForm.name = this.rulesForm.domain
        // 表单校验(永恒的正确条件)
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
          // 快速筛选数组
          this.rulesForm.planname = this.plan1.filter(item => item.id === this.rulesForm.plan)[0].name
          if (this.rulesForm.kf === '') {
            this.rulesForm.kfname = ''
          } else {
            this.rulesForm.kfname = this.kf1.filter(item => item.id === this.rulesForm.kf)[0].username
          }
          // 先解构
          const { company, kfname, planname,
            ywy, name, domain, startTime, endTime, note } = this.rulesForm
          // this.rulesForm.lang = this.lang
          this.rulesForm.lang = String(this.CName) || '中文'
          // 再赋值-传给后端的参数
          const confirmText = [
            `网站参数确认：`,
            `绑定的域名：${domain}`,
            `服务器选择：${this.serve}`,
            // `Https：${this.ssl3}`,
            // `客户名：${username}`,
            `公司名：${company}`,
            // `客户手机号：${uphone}`,
            // `客户QQ：${qq}`,
            // `客户的邮箱：${email}`,
            // `客户所在地：${address}`,
            `业务员：${ywy}`,
            // `指派给建站：${jz}`,
            `维护者：${kfname}`,
            `网站套餐：${planname}`,
            `语种：${this.getlang || '中文'}`,
            `合同时间：【${startTime}】 - 【${endTime}】`,
            // `需缴纳金：${money}`,
            // `已缴纳金：${cmoney}`,
            `关键词套餐：${this.rulesForm.seoKeyWords}`,
            `备注：${note}`
          ]
          const newDatas = []
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          let text = h('div', null, newDatas)
          if (parseInt(this.rulesForm.isTest) === 1 && this.rulesForm.appNameOK === '企业站') {
            this.webCreateName = `将生成【${domain}】测试站`
            this.webCreateNameOK = `【${domain}】`
          } else if (parseInt(this.rulesForm.isTest) === 1 && this.rulesForm.appNameOK === '竞价站') {
            this.webCreateName = `将生成【ztb.net/${name}】测试站`
            this.webCreateNameOK = `【ztb.net/${name}】`
          } else if (this.rulesForm.appNameOK === '企业站') {
            this.webCreateName = `将生成【${domain}】企业站`
            this.webCreateNameOK = `【${domain}】`
          } else {
            this.webCreateName = `将生成【ztb.net/${name}】竞价站`
            this.webCreateNameOK = `【ztb.net/${name}】`
          }
          let weberror = `${this.webCreateNameOK}网站生成失败`
          // let webOK = `${this.webCreateNameOK}网站生成成功，可请前往站点管理页面来登录后台,
          // 如果建站有任何问题可通过QQ与建站与客服沟通`
          this.$confirm(text, this.webCreateName, {
            dangerouslyUseHTMLString: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            let that = this
            if (this.rulesForm.appNameOK === '企业站') {
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
            // console.dir(this.rulesForm)
            // 生成网站接口,建站部分OK
            createSite(that.rulesForm).then((res) => {
              // code判断
              if (res.code !== 0) {
                that.errorcode = parseInt(res.code)
                that.active = 88
                this.$notify({
                  message: res.msg,
                  title: '错误',
                  duration: 10000,
                  type: 'error'
                })
              } else if (res.code === 0) {
                that.active = 100
                let setdata = {}
                setdata.siteid = res.data.id
                setdata.userid = that.rulesForm.kf
                if (setdata.userid !== '') {
                // 同时给维护者授权
                  userAddSite(setdata).then(res => {
                    this.$notify({
                      title: '网站授权',
                      duration: 10000,
                      type: 'success',
                      message: `同时将该站点授权给${that.rulesForm.kfname}`
                    })
                  }).catch(err => {
                    console.dir(err)
                    this.loading = false
                  })
                }
              }
            }).catch(() => {
              this.$notify({
                title: '网站生成失败',
                type: 'error',
                message: h('b', { style: 'color: teal' }, weberror)
              })
              this.active = 88
            })
            // 建站部分OK
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
@media screen and (max-width: 1400px){
>>> .el-date-editor{
    width: 135px !important;
}
.buttonok2{
  width:400px}
}
</style>
