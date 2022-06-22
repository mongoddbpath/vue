<template>
  <d2-container>
    <template slot='header'><strong style="font-size:28px;">
      【{{ siteurl }}】的站点授权管理</strong></template>
    <d2-crud
      ref='d2Crud'
      :pagination='pagination'
      :columns='columns'
      :data='
        data.filter(
          data =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      '
      edit-title='站点授权管理'
      :form-options='formOptions'
      @pagination-current-change='paginationCurrentChange'
    >
      <!-- 表格搜索框 -->
      <el-input
        slot='header'
        v-model='search'
        placeholder='输入用户名搜索'
        style='margin-bottom: 6px'
      >
      </el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
import { userlist } from '@api/userlist'
import { viewmanager } from '@api/viewmanager'
import util from '@/libs/util.js'
// 引入站点授权的状态组件
import WebStatus from '@/components/webstatus'
// 专属授权
import webowner from '@/components/webowner'
export default {
  name: 'webcontrol',
  components: {
  },
  data () {
    return {
      sitey: {
        siteid: this.$route.params.id
      },
      // 用户站点的名字
      siteurl: this.$route.params.url,
      search: '', // 搜索
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      columns: [
        {
          title: '账号',
          key: 'username'
        },
        {
          title: '真实姓名',
          key: 'realName'
        },
        {
          title: '公司',
          key: 'company',
          width: 300
        },
        {
          title: '普通授权',
          key: 'webstatus',
          width: '100',
          component: {
            name: WebStatus,
            props: {
              myProps: ''
            }
          },
          filters: [
            { text: '已授权', value: 1 },
            { text: '未授权', value: 0 }
          ],
          filterMethod (value, row) {
            return Number(row.webstatus) === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '所属授权',
          key: 'origincheckok',
          width: '100',
          component: {
            name: webowner,
            props: {
              myProps: ''
            }
          },
          filters: [
            { text: '已授权', value: true },
            { text: '未授权', value: false }
          ],
          filterMethod (value, row) {
            return row.origincheckok === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '用户电话',
          key: 'tel'
        },
        {
          title: '所属组',
          key: 'group',
          filters: [
            { text: '客户', value: '客户' },
            { text: '代理', value: '代理' },
            { text: '客服', value: '客服' }
          ],
          filterMethod (value, row) {
            return row.group === value
          },
          filterPlacement: 'bottom-end'
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
  mounted () {
    if (this.siteurl === undefined) {
      this.$router.push({
        name: 'index'
      })
    }
    this.fetchData()
  },
  methods: {
    // 获取第N页的数据
    fetchData () {
      let groupy = util.cookies.get('group')
      this.loading = true
      userlist(this.pagination.currentPage).then(res => {
        var datay = res.data
        this.pagination.total = res.total
        viewmanager(this.sitey).then(res => {
          let webjur = res
          // es6筛选出唯一的专属授权
          let arryok = datay.filter(item => webjur.some(ele => ele.origin !== null && parseInt(ele.origin) === item.id))
          // es6筛选两组之间一样的部分,已授权的部分
          let arry = datay.filter(item => webjur.some(ele => ele.userid === item.id && parseInt(ele.origin) !== item.id))
          // es6筛选两组之间一样的部分,未授权的部分
          let arry2 = datay.filter(item => !webjur.some(ele => ele.userid === item.id))
          // console.dir(arryok)
          // console.dir(arry)
          // console.dir(arry2)
          for (let l = 0; l < arryok.length; l++) {
            arryok[l].siteid = this.sitey.siteid
            arryok[l].userid = arryok[l].id
            arryok[l].siteurl = this.siteurl
            arryok[l].origincheck = true
            // origincheck为站点专属授权状态
            // arryok[l].webstatus = 1
            if (arryok[l].group === null || arryok[l].group === 0) {
              if (String(groupy) === 'null' || Number(groupy) === 0) {
                arryok[l].group = '管理员'
              } else { delete arryok[l] }
            } else if (arryok[l].group === 1) {
              arryok[l].group = '客户'
            } else if (arryok[l].group === 2) {
              arryok[l].group = '代理'
            } else if (arryok[l].group === 3) {
              arryok[l].group = '客服'
            }
          }
          for (var l = 0; l < arry.length; l++) {
            arry[l].origincheck = false
            arry[l].siteid = this.sitey.siteid
            arry[l].userid = arry[l].id
            arry[l].siteurl = this.siteurl
            // 1暂定为站点授权状态
            arry[l].webstatus = 1
            if (arry[l].group === null || arry[l].group === 0) {
              if (String(groupy) === 'null' || Number(groupy) === 0) {
                arry[l].group = '管理员'
              } else { delete arry[l] }
            } else if (arry[l].group === 1) {
              arry[l].group = '客户'
            } else if (arry[l].group === 2) {
              arry[l].group = '代理'
            } else if (arry[l].group === 3) {
              arry[l].group = '客服'
            }
          }
          for (var l1 = 0; l1 < arry2.length; l1++) {
            arry2[l1].origincheck = false
            arry2[l1].siteid = this.sitey.siteid
            arry2[l1].userid = arry2[l1].id
            arry2[l1].siteurl = this.siteurl
            // 0暂定为站点未授权状态
            arry2[l1].webstatus = 0
            if (arry2[l1].group === null || arry2[l1].group === 0) {
              if (String(groupy) === 'null' || Number(groupy) === 0) {
                arry2[l1].group = '管理员'
              } else { delete arry2[l1] }
            } else if (arry2[l1].group === 1) {
              arry2[l1].group = '客户'
            } else if (arry2[l1].group === 2) {
              arry2[l1].group = '代理'
            } else if (arry2[l1].group === 3) {
              arry2[l1].group = '客服'
            }
          }
          // this.data = arry
          let arrall = arryok.concat(arry)
          let arryes = arrall.concat(arry2)
          this.data = arryes
        })
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
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }
    // 以上定义方法
  }
}
</script>

<style scoped>
>>> .el-table .cell {
    white-space: pre;
}
</style>
