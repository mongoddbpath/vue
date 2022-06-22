<template>
  <d2-container>
    <template slot='header'>网站列表<br>
      建站状态可以通过订单管理列表来进行查看</template>
    <d2-crud
      ref='d2Crud'
      :loading="loading"
      :columns='columns'
      :pagination='pagination'
      :data='
        data.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.domain.toLowerCase().includes(search.toLowerCase())
        )'
      edit-title='我的修改'
      :form-options='formOptions'
      @pagination-current-change='paginationCurrentChange'
    >
      <!-- 表格搜索框 -->
      <el-input
        slot='header'
        v-model='search'
        placeholder='输入关键字搜索(网站名 或 域名)'
        style='margin-bottom: 6px'
      ></el-input>
      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
// 引入前往站点后台组件
import Goto from '@/components/Goto'
// import CheckWeb from '@/components/CheckWeb'
import ToHoutai from '@/components/ToHoutai'
import appName from '@/components/appName'
import Note from '@/components/note'
import { weblist } from '@api/weblist'
export default {
  name: 'CheckWeb',
  components: {
    // CheckWeb
  },
  data () {
    return {
      loading: true,
      search: '', // 搜索
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 3
      },
      columns: [
        {
          title: '站点类型',
          component: {
            name: appName,
            props: {
              myProps: ''
            }
          },
          key: 'appName',
          width: '100',
          filters: [
            { text: '企业站', value: 'site' },
            { text: '竞价站', value: 'dirSite' }
          ],
          filterMethod (value, row) {
            return row.appName === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '域名',
          key: 'url',
          width: '226',
          component: {
            name: ToHoutai,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '前往后台',
          key: 'lang',
          width: '168',
          component: {
            name: Goto,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '套餐',
          key: 'plan',
          width: '',
          filters: [
            { text: '外语套餐', value: '外语套餐' },
            { text: 'A套餐', value: 'A套餐' },
            { text: 'B套餐', value: 'B套餐' },
            { text: 'C套餐', vClue: 'C套餐' },
            { text: '单词套餐', value: '单词套餐' }
          ],
          filterMethod (value, row) {
            return row.plan === value
          },
          filterPlacement: 'bottom-end'
        },
        // {
        //   title: '客户电话',
        //   key: 'uphone',
        //   width: '128'
        // },
        {
          title: '业务员',
          key: 'ywy',
          fixed: 'right',
          width: '',
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
          title: '开始时间',
          key: 'startTime',
          sortable: true,
          width: '100'
        },
        {
          title: '到期时间',
          key: 'endTime',
          sortable: true,
          width: '100'
        },
        {
          title: '备注',
          key: 'note',
          width: '100',
          component: {
            name: Note,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '客户',
          key: 'user',
          width: '100'
        },
        {
          title: '公司名',
          key: 'company'
        },
        {
          title: '客服',
          key: 'customer',
          fixed: 'right',
          width: '',
          filters: [
            { text: '海华', value: '海华' },
            { text: '小闲', value: '小闲' },
            { text: '丽欣', value: '丽欣' }
          ],
          filterMethod (value, row) {
            return row.customer === value
          },
          filterPlacement: 'bottom-end'
        }
      ],
      data: [],
      formOptions: {
        labelWidth: '66px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  mounted () {
    weblist(1).then(res => {
      this.data = res.data
      this.pagination.total = res.total
      // 等待条
      this.loading = false
      console.log(res)
    }).catch(err => {
      console.log('err', err)
      this.loading = false
      this.$notify({
        message: `获取数据失败`
      })
    })
  },
  methods: {
    // 获取数据
    fetchData () {
      this.loading = true
      weblist(this.pagination.currentPage).then(res => {
        this.data = res.data
        this.pagination.total = res.total
        // 等待条
        this.loading = false
        // console.log(res.data)
        // console.log({ page: this.pagination.currentPage })
      }).catch(err => {
        console.log('err', err)
        this.loading = false
        this.$notify({
          message: `获取数据失败`
        })
      })
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
