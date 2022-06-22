<template>
  <d2-container>
    <template slot='header'>客户列表</template>
    <d2-crud
      ref='d2Crud'
      :pagination='pagination'
      :columns='columns'
      :data='
        data.filter(
          data =>
            !search ||
            data.webname.toLowerCase().includes(search.toLowerCase()) ||
            data.weburl.toLowerCase().includes(search.toLowerCase()) ||
            data.user.toLowerCase().includes(search.toLowerCase()) ||
            data.date.toLowerCase().includes(search.toLowerCase()) ||
            data.ywy.toLowerCase().includes(search.toLowerCase())
        )
      '
      :rowHandle='rowHandle'
      edit-title='客户列表修改'
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
        placeholder='输入关键字搜索(客户名 或 网站名 或 域名 或 时间)'
        style='margin-bottom: 6px'
      >
      </el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
// 引入启停MyTag组件
import CheckWeb from '@/components/CheckWeb'
import ToHoutai from '@/components/ToHoutai'
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
          title: '网站名',
          key: 'webname',
          width: '266',
          component: {
            name: ToHoutai,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '域名',
          key: 'weburl',
          width: '226',
          component: {
            name: CheckWeb,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '客户名',
          key: 'user',
          width: '100',
          fixed: 'left'
        },
        {
          title: '客户电话',
          key: 'uphone',
          width: '128',
          fixed: 'left'
        },
        {
          title: '客户邮箱',
          key: 'uqq',
          width: '100'
        },
        {
          title: '地点',
          key: 'uadress',
          width: '100'
        },
        {
          title: '客服',
          key: 'customer',
          width: '100',
          fixed: 'right',
          filters: [
            { text: '海华', value: '海华' },
            { text: '小贤', value: '小贤' },
            { text: '丽欣', value: '丽欣' }
          ],
          filterMethod (value, row) {
            return row.customer === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '业务员',
          key: 'ywy',
          width: '100',
          filters: [
            { text: '钟总', value: '钟总' },
            { text: '杨总', value: '杨总' },
            { text: '陈总', value: '陈总' }
          ],
          filterMethod (value, row) {
            return row.ywy === value
          },
          filterPlacement: 'bottom-end',
          fixed: 'left'
        }
      ],
      data: [
        {
          webname: '广州飞凡文化传播有限公司1',
          weburl: 'www.feifanwh.com',
          jd: '香港阿里云3',
          package: 'D套餐',
          uqq: '168168168@163.com',
          uadress: '广州',
          packagenum: '3',
          check: true,
          date: '2023-12.23',
          ywy: '钟总',
          user: '刘总',
          uphone: '13725141390',
          muban: 'muban033',
          customer: '小贤',
          seo: ['广州模特公司:1', '广州摄影公司:1', '广州平面模特:1'],
          dstatus: '已交付',
          forbidEdit: false,
          showEditButton: true
        },
        {
          webname: '广州飞凡文化传播有限公司2',
          weburl: 'www.feifanwh.com',
          jd: '香港阿里云3',
          package: 'B套餐',
          uqq: '168168168@163.com',
          uadress: '广州',
          packagenum: '3',
          check: true,
          date: '2023-12.23',
          ywy: '杨总',
          user: '刘总',
          uphone: '13725141390',
          muban: 'muban033',
          customer: '海华',
          seo: ['广州模特公司:1', '广州摄影公司:1', '广州平面模特:1'],
          dstatus: '已交付',
          forbidEdit: false,
          showEditButton: true
        },
        {
          webname: '广州飞凡文化传播有限公司3',
          weburl: 'www.feifanwh.com',
          jd: '香港阿里云3',
          package: 'A套餐',
          uqq: '168168168@163.com',
          uadress: '广州',
          packagenum: '3',
          check: true,
          date: '2023-12.23',
          ywy: '陈总',
          user: '刘总',
          uphone: '13725141390',
          muban: 'muban033',
          customer: '丽欣',
          seo: ['广州模特公司:1', '广州摄影公司:1', '广州平面模特:1'],
          dstatus: '已交付',
          forbidEdit: false,
          showEditButton: true
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
        user: {
          title: '客户',
          value: ''
        },
        uphone: {
          title: '手机号',
          value: ''
        },
        uqq: {
          title: '客户QQ',
          value: ''
        },
        uadress: {
          title: '地点',
          value: ''
        },
        customer: {
          title: '客服',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '海华'
              },
              {
                value: '丽欣'
              },
              {
                value: '小贤'
              }
            ]
          }
        },
        webname: {
          title: '网站名',
          value: ''
        },
        weburl: {
          title: '域名',
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
        // console.log(index)
        console.log(row)
        console.log(typeof row)
        // 网站修改的按钮
        this.$confirm(
          '客户的信息正在被修改，请问您确定要这么做吗？',
          '您正在修改客户',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.$alert('<strong>网站修改成功！</strong>', '网站修改成功', {
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
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }
    // 以上定义方法
  }
}
</script>
