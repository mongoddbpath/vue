<template>
  <d2-container>
    <template slot="header">分页</template>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
  </d2-container>
</template>

<script>
// import { BusinessTable1List } from '@api/demo.business.table.1'
import { UserLogin } from '@api/login'
export default {
  data () {
    return {
      columns: [
        {
          title: '卡密',
          key: 'key',
          width: 320
        },
        {
          title: '面值',
          key: 'value'
        },
        {
          title: '管理员',
          key: 'admin'
        },
        {
          title: '创建时间',
          key: 'dateTimeCreat'
        },
        {
          title: '使用时间',
          key: 'dateTimeUse'
        }
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      let userinfo = {
        username: 'test9',
        password: 'admin236'
      }
      // this.$axios.post('http://admin.qwyx.cn/register', data)
      //   .then(function (response) {
      //     console.log(response)
      //     let dataAxios = response.data
      //     let { username } = dataAxios
      //     console.log(username)
      //     // HTTP状态码
      //     console.log(response.status)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      UserLogin(userinfo).then(res => {
        console.log(res)
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  }
}
</script>
