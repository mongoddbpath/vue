<template>
  <d2-container>
    <template slot='header'>管理员列表</template>
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
      :rowHandle='rowHandle'
      edit-title='管理员列表修改'
      :edit-template='editTemplate'
      :form-options='formOptions'
      @dialog-open='handleDialogOpen'
      @row-edit='handleRowEdit'
      @dialog-cancel='handleDialogCancel'
      @row-remove='handleRowRemove'
      @pagination-current-change='paginationCurrentChange'
    >
      <!-- 表格搜索框 -->
      <el-input
        slot='header'
        v-model='search'
        placeholder='输入管理员名搜索'
        style='margin-bottom: 6px'
      >
      </el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
import { adminlist } from '@api/adminlist'
// 引入用户的状态组件
import UserStatus from '@/components/userstatus'
export default {
  name: 'webcontrol',
  components: {
    // MyTag,
    // CheckWeb
    // ToHoutai
  },
  data () {
    return {
      search: '', // 搜索
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      columns: [
        {
          title: '管理员名',
          key: 'username'
        },
        {
          title: '管理员状态',
          key: 'status',
          width: '136',
          component: {
            name: UserStatus,
            props: {
              myProps: ''
            }
          },
          filters: [
            { text: '启用', value: 1 },
            { text: '禁用', value: 0 }
          ],
          filterMethod (value, row) {
            return Number(row.status) === value
          },
          filterPlacement: 'bottom-end'
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
        group: {
          title: '所属组',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '业务员'
              },
              {
                value: '建站'
              },
              {
                value: '客服'
              }
            ]
          }
        },
        username: {
          title: '管理员名',
          value: ''
        },
        tel: {
          title: '手机号',
          value: ''
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
        labelWidth: '100px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  mounted () {
    // 鉴权
    this.$util.authen(['null', 0])
    adminlist().then(res => {
      let datay = res.data
      for (var l = 0; l < res.data.length; l++) {
        if (datay[l].group === null || datay[l].group === 0) {
          datay[l].group = '管理员'
        } else if (datay[l].group === 1) {
          datay[l].group = '客户'
        } else if (datay[l].group === 2) {
          datay[l].group = '代理'
        } else if (datay[l].group === 3) {
          datay[l].group = '客服'
        }
      }
      this.data = datay
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
    handleDialogOpen ({ mode, row }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // 管理员的信息
        // console.log(row)
        // 管理员修改的按钮
        this.$confirm(
          '管理员的信息正在被修改，请问您确定要这么做吗？',
          '您正在修改管理员',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            let text = `管理员${row.username}修改成功！`
            this.$alert(text, '管理员修改', {
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
              message: '管理员修改已取消'
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
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }
    // 以上定义方法
  }
}
</script>
