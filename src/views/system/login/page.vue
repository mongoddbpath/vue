<template>
  <div class="page-login">
    <!-- <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div> -->
    <!-- <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div> -->
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            <!-- 优秀的SaasCms解决方案 -->
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo" src="/image/theme/d2/logo/all.png">
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default">
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    clearable
                    placeholder="账号">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    clearable
                    show-password
                    placeholder="密码">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-input
                    type="text"
                    v-model.number="formLogin.captcha"
                    placeholder="验证码">
                    <template slot="append">
                      <img @click="changeimg" class="login-code"
                      :src="imgurl">
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="throttledMethod"
                  type="primary"
                  class="button-login">
                  登录
                </el-button>
              </el-form>
            </el-card>
            <!-- <p
              class="page-login--options"
              flex="main:justify cross:center">
              <span><d2-icon name="question-circle"/> 忘记密码</span>
              <span>注册用户</span>
            </p> -->
            <!-- <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
              快速选择用户（测试功能）
            </el-button> -->
          </div>
        </div>
        <div class="page-login--content-footer">
        </div>
      </div>
    </div>
    <el-dialog
      title="快速选择用户(供用户测试)"
      :visible.sync="dialogVisible"
      width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="page-login--quick-user" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o"/>
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import _ from 'lodash'
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [
    localeMixin
  ],
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      imgurl: `${process.env.VUE_APP_API}captcha`,
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: '管理员',
          username: '管理员',
          password: 'admin236'
        },
        {
          name: '代理商',
          username: '代理商',
          password: 'admin236'
        },
        {
          name: '业务员',
          username: '业务员',
          password: 'admin236'
        }
      ],
      // 表单
      formLogin: {
        username: '',
        password: '',
        captcha: ''
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            type: 'number',
            required: true,
            message: '请输入数字类型的验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    var _this = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key === 13) {
        _this.throttledMethod()
      }
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
     * @description 提交表单
     */
    // 防抖
    throttledMethod: _.debounce(function () {
      let that = this
      that.submit()
    }, 1000),
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let that = this
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.formLogin.captcha = Number(this.formLogin.captcha)
          this.login(this.formLogin)
            .then(() => {
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            }).catch(() => {
              that.changeimg()
            })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查')
        }
      })
    },
    // 更改验证码
    changeimg () {
      let srcok = this.imgurl + '?t=' + new Date().getTime()
      this.imgurl = ''
      this.imgurl = srcok
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
