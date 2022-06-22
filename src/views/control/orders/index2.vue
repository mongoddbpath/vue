<template>
  <d2-container>
    <template slot='header'>订单管理列表<br>在这里可以管理所有的订单</template>
    <step></step>
    <d2-crud
      ref='d2Crud'
      :pagination='pagination'
      :loading='loading'
      :columns='columns'
      :rowHandle='rowHandle'
      :data='
        data.filter(
          data =>
            !search ||
            data.webname.toLowerCase().includes(search.toLowerCase()) ||
            data.weburl.toLowerCase().includes(search.toLowerCase()) ||
            data.user.toLowerCase().includes(search.toLowerCase()) ||
            data.ywy.toLowerCase().includes(search.toLowerCase())
        )'
      edit-title='我的修改'
      :edit-template='editTemplate'
      :form-options='formOptions'
      @row-edit='handleRowEdit'
      @dialog-cancel='handleDialogCancel'
      @row-remove='handleRowRemove'
      @pagination-current-change='paginationCurrentChange'
    >
      <!-- 表格搜索框 -->
      <el-input
        slot='header'
        v-model='search'
        placeholder='输入关键字搜索(客户名 或 网站名 或 域名 或 时间)'
        style='margin-bottom: 6px'
      ></el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
import CheckWeb from '@/components/CheckWeb'
import moneyTag from '@/components/MoneyTag'
import faddressok from '@/components/FaddRess'
import step from '@/components/step'
import stepChange from '@/components/StepChange'
export default {
  name: 'Userorders',
  components: {
    // CheckWeb
    step
  },
  data () {
    return {
      loading: false,
      // 分页样式
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 4
      },
      data: [
        {
          name: '广州创力信息科技有限公司1',
          domain: 'www.chuangli.net',
          url: 'www.chuangli.net',
          domainok: '192.168.0.1:9966',
          jd: '香港阿里云3',
          startTime: '2020-04-28',
          endTime: '2026-04-28',
          plan: 'C套餐',
          money: 100000,
          cmoney: 100000,
          ywy: '钟总',
          yphone: '1861356168168',
          yqq: '1467799141',
          username: '钟总',
          uphone: '4006-373-020',
          customer: '海华',
          dstatus: '已签单',
          active: 1
        },
        {
          name: '广州创力信息科技有限公司2',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
          url: 'www.chuangli.net',
          jd: '香港阿里云3',
          plan: 'D套餐',
          startTime: '2020-04-28',
          endTime: '2026-04-28',
          money: 100000,
          cmoney: 1000,
          ywy: '杨总',
          yphone: '1861356168168',
          yqq: '1467799142',
          username: '钟总',
          uphone: '4006-373-020',
          customer: '海华',
          dstatus: '建站中',
          active: 2,
          jztime: '2020-04-28'
        },
        {
          name: '广州创力信息科技有限公司3',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
          url: 'www.chuangli.net',
          jd: '香港阿里云3',
          plan: 'A套餐',
          startTime: '2020-04-28',
          endTime: '2026-04-28',
          money: 100000,
          cmoney: 1000,
          ywy: '陈总',
          yphone: '1861356168168',
          yqq: '1467799143',
          username: '钟总',
          uphone: '4006-373-020',
          customer: '海华',
          dstatus: '建站完成',
          active: 3,
          jztime: '2020-04-28',
          webtime: '2020-05-01'
        },
        {
          name: '广州创力信息科技有限公司6',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
          url: 'www.chuangli.net',
          jd: '香港阿里云3',
          plan: 'B套餐',
          startTime: '2020-04-28',
          endTime: '2026-04-28',
          money: 100000,
          cmoney: 100000,
          ywy: '杨总',
          yqq: '1467799144',
          username: '钟总',
          uphone: '4006-373-020',
          customer: '海华',
          yphone: '1861356168168',
          dstatus: '已交付',
          active: 4,
          jztime: '2020-04-28',
          webtime: '2020-05-01',
          donetime: '2020-05-02'
        },
        {
          name: '广州创力信息科技有限公司8',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
          url: 'www.chuangli.net',
          jd: '香港阿里云3',
          plan: 'B套餐',
          startTime: '2020-04-28',
          endTime: '2026-04-28',
          money: 100000,
          cmoney: 100000,
          ywy: '杨总',
          yqq: '1467799144',
          username: '钟总',
          uphone: '4006-373-020',
          customer: '海华',
          yphone: '1861356168168',
          dstatus: '优化中',
          active: 5,
          jztime: '2020-04-28',
          webtime: '2020-05-01',
          donetime: '2020-05-02',
          seotime: '2020-05-03'
        }
      ],
      search: '', // 搜索
      columns: [
        {
          title: '客户手机号',
          key: 'uphone',
          width: '128'
        },
        {
          title: '网站名',
          key: 'name',
          width: '236'
        },
        {
          title: '申请域名',
          key: 'weburlok',
          width: '226',
          component: {
            name: CheckWeb,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '套餐',
          key: 'plan',
          width: '100',
          filters: [
            { text: 'A套餐', value: 'A套餐' },
            { text: 'B套餐', value: 'B套餐' },
            { text: 'C套餐', value: 'C套餐' },
            { text: 'D套餐', value: 'D套餐' },
            { text: '其他套餐', value: '其他套餐' }
          ],
          filterMethod (value, row) {
            return row.plan === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '附件',
          key: 'faddress',
          width: '128',
          component: {
            name: faddressok,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '需缴纳金',
          key: 'money',
          width: '128'
        },
        {
          title: '已缴纳金',
          key: 'cmoney',
          width: '126'
        },
        {
          title: '合同开启时间',
          key: 'startTime',
          width: '126'
        },
        {
          title: '合同结束时间',
          key: 'endTime',
          width: '126'
        },
        {
          title: '费用全缴',
          key: 'money',
          width: '100',
          filters: [
            { text: '是', value: '是' },
            { text: '否', value: '否' }
          ],
          filterMethod (value, row) {
            var tmoney = row.money === row.cmoney ? '是' : '否'
            return tmoney === value
          },
          filterPlacement: 'bottom-end',
          component: {
            name: moneyTag,
            props: {
              myProps: ''
            }
          },
          fixed: 'right'
        },
        {
          title: '客户',
          key: 'username',
          width: '100',
          fixed: 'left'
        },
        {
          title: '业务员',
          key: 'ywy',
          width: '100',
          fixed: 'right',
          filters: [
            { text: '钟总', value: '钟总' },
            { text: '杨总', value: '杨总' },
            { text: '陈总', value: '陈总' }
          ],
          filterMethod (value, row) {
            return row.ywy === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '当前订单状态',
          key: 'dstatus',
          width: '128',
          component: {
            name: stepChange,
            props: {
              myProps: ''
            }
          },
          fixed: 'right',
          filters: [
            { text: '已签单', value: '已签单' },
            { text: '建站中', value: '建站中' },
            { text: '建站完成', value: '建站完成' },
            { text: '已交付', value: '已交付' },
            { text: '优化中', value: '优化中' }
          ],
          filterMethod (value, row) {
            return row.dstatus === value
          },
          filterPlacement: 'bottom-end'
        }
      ],
      rowHandle: {
        columnHeader: '操作',
        width: '236',
        // 编辑数据
        edit: [
          {
            icon: 'el-icon-edit',
            text: '点我进行编辑',
            size: 'small',
            show (index, row) {
              if (row.showEditButton) {
                return true
              }
              return false
            },
            disabled (index, row) {
              if (row.forbidEdit) {
                return true
              }
              return false
            }
          }
        ],

        // 删除数据
        remove: [
          {
            icon: 'el-icon-delete',
            size: 'small',
            fixed: 'right',
            confirm: true,
            show (index, row) {
              if (row.showRemoveButton) {
                return true
              }
              return false
            },
            disabled (index, row) {
              if (row.forbidRemove) {
                return true
              }
              return false
            }
          }
        ]
      },
      editTemplate: {
        username: {
          title: '客户',
          value: ''
        },
        plan: {
          title: '套餐',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: 'A套餐'
              },
              {
                value: 'B套餐'
              },
              {
                value: 'C套餐'
              },
              {
                value: 'D套餐'
              },
              {
                value: '其他套餐'
              }
            ]
          }
        },
        startTime: {
          title: '订单开启时间',
          value: '',
          component: {
            name: 'el-date-picker'
          }
        },
        endTime: {
          title: '订单结束时间',
          value: '',
          component: {
            name: 'el-date-picker'
          }
        },
        money: {
          title: '需缴纳金',
          value: ''
        },
        cmoney: {
          title: '已缴纳金',
          value: ''
        },
        dstatus: {
          title: '订单状态',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '已创建'
              },
              {
                value: '已签单'
              },
              {
                value: '建站中'
              },
              {
                value: '建站完成'
              },
              {
                value: '已交付'
              }
            ]
          }
        },
        ywy: {
          title: '业务员',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '钟总'
              },
              {
                value: '杨总'
              },
              {
                value: '陈总'
              }
            ]
          }
        },
        forbidEdit: {
          title: '禁用按钮',
          value: false,
          component: {
            show: false
          }
        },
        showEditButton: {
          title: '显示按钮',
          value: true,
          component: {
            show: false
          }
        }
      },
      formOptions: {
        labelWidth: '136px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.data = this.data
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // console.log(index)
        console.log(row)
        console.log(typeof row)
        // 网站修改的按钮
        this.$confirm(
          '请确定是否要修改该订单？',
          '您正在修改订单',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.$alert('<strong>订单修改成功！</strong>', '网站修改成功', {
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
              message: '网站修改已取消'
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
    }
    // 以上定义方法
  }
}
</script>
