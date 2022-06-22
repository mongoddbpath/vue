<template>
  <d2-container>
    <template slot='header'>代理商列表</template>
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
      edit-title='代理商列表修改'
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
        placeholder='输入代理商名搜索'
        style='margin-bottom: 6px'
      >
      </el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
// 引入启停MyTag组件
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
        pageSize: 5,
        total: 3
      },
      columns: [
        {
          title: '代理商名',
          key: 'username'
        },
        {
          title: '代理商电话',
          key: 'uphone'
        },
        {
          title: '代理商QQ',
          key: 'qq'
        },
        {
          title: '代理商邮箱',
          key: 'email',
          width: '100'
        },
        {
          title: '地点',
          key: 'address'
        },
        {
          title: '负责人',
          key: 'supervisor',
          width: '100',
          fixed: 'right'
        },
        {
          title: '所属组',
          key: 'group',
          filters: [
            { text: '业务员', value: '业务员' },
            { text: '建站', value: '建站' },
            { text: '客服', value: '客服' },
            { text: '代理商', value: '代理商' }
          ],
          filterMethod (value, row) {
            return row.group === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '备注',
          key: 'remarks'
        }
      ],
      data: [
        {
          username: '王彪',
          uphone: '13725141390',
          group: '代理商',
          qq: '1681681681',
          email: '168168168@163.com',
          address: '东莞',
          remarks: '东莞代理商',
          supervisor: '钟总'
        },
        {
          username: '刘红',
          uphone: '13725141393',
          group: '代理商',
          qq: '1681681682',
          email: '168168168@163.com',
          address: '深圳',
          remarks: '深圳代理商',
          supervisor: '钟总'
        },
        {
          username: '发财',
          uphone: '13725141396',
          group: '代理商',
          qq: '1681681683',
          email: '168168168@163.com',
          address: '惠州',
          remarks: '惠州代理商',
          supervisor: '钟总'
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
          title: '代理商名',
          value: ''
        },
        uphone: {
          title: '手机号',
          value: ''
        },
        qq: {
          title: '代理商QQ',
          value: ''
        },
        email: {
          title: '代理商邮箱',
          value: ''
        },
        address: {
          title: '地点',
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
        // 代理商的信息
        // console.log(row)
        // 代理商修改的按钮
        this.$confirm(
          '代理商的信息正在被修改，请问您确定要这么做吗？',
          '您正在修改代理商',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            let text = `代理商${row.username}修改成功！`
            this.$alert(text, '代理商修改', {
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
              message: '代理商修改已取消'
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
