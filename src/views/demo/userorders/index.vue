<template>
  <d2-container>
    <template slot='header'>订单列表<br>
    建站过程中有任何问题可以通过QQ与建站人员与客服进行沟通</template>
    <step></step>
    <d2-crud
      ref='d2Crud'
      :loading="loading"
      :pagination='pagination'
      :columns='columns'
      :data='
        data.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.domain.toLowerCase().includes(search.toLowerCase()) ||
            data.username.toLowerCase().includes(search.toLowerCase()) ||
            data.ywy.toLowerCase().includes(search.toLowerCase())
        )'
      edit-title='我的修改'
      :form-options='formOptions'
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
// 引入启停MyTag组件
import faddressok from '@/components/FaddRess'
import moneyTag from '@/components/MoneyTag'
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
      loading: false, // 加载状态
      search: '', // 搜索
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 4
      },
      columns: [
        {
          title: '客户手机号',
          key: 'uphone',
          width: '128'
        },
        {
          title: '网址',
          key: 'domain',
          width: '168'
        },
        {
          title: '网站名',
          key: 'name',
          width: '236'
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
          title: '需缴金额',
          key: 'money',
          width: '128'
        },
        {
          title: '已缴金额',
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
      data: [
        {
          name: '广州飞凡文化传播有限公司1',
          domain: 'www.chuangli.net',
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
          name: '广州飞凡文化传播有限公司2',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
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
          name: '广州飞凡文化传播有限公司3',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
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
          name: '广州飞凡文化传播有限公司6',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
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
          name: '广州飞凡文化传播有限公司8',
          domainok: '192.168.0.1:9966',
          domain: 'www.chuangli.net',
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
      formOptions: {
        labelWidth: '66px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }
    // 以上定义方法
  }
}
</script>
