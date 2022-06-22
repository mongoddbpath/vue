<template>
  <d2-container>
    <template slot='header'>模板列表</template>
    <d2-crud
      ref='d2Crud'
      :loading='loading'
      :pagination='pagination'
      :columns='columns'
      :data='
        data.filter(
          data =>
            !search ||
            data.spic.toLowerCase().includes(search.toLowerCase()) ||
            data.mbh.toLowerCase().includes(search.toLowerCase())
        )'
      :rowHandle="rowHandle"
      edit-title="我的修改"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @dialog-open="handleDialogOpen"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
    >
      <!-- 表格搜索框 -->
      <el-input
        slot='header'
        v-model='search'
        placeholder='输入关键字搜索(模板名 或 编号)'
        style='margin-bottom: 6px'
      ></el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
// 引入启停MyTag组件
import MuBan from '@/components/MuBan'
export default {
  name: 'MuBan',
  components: {
    // CheckWeb
  },
  data () {
    return {
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 3
      },
      search: '', // 搜索
      columns: [
        {
          title: '类型',
          key: 'mtype',
          width: '168',
          fixed: 'left',
          filters: [
            { text: '电子/电器/网络', value: '电子/电器/网络' },
            { text: '家具/装饰/地产', value: '家具/装饰/地产' },
            { text: '建筑/建材/五金', value: '建筑/建材/五金' },
            { text: '工业/机械/设备', value: '工业/机械/设备' },
            { text: '服装/服饰/箱包', value: '服装/服饰/箱包' },
            { text: '培训/教育/传媒', value: '培训/教育/传媒' },
            { text: '汽车/配件/运输', value: '汽车/配件/运输' },
            { text: '珠宝/钻石/字画', value: '珠宝/钻石/字画' },
            { text: '旅游/酒店/饮食', value: '旅游/酒店/饮食' },
            { text: '政府/公共/服务', value: '政府/公共/服务' },
            { text: '医疗/整形/美容', value: '医疗/整形/美容' },
            { text: '礼品/艺术/文化', value: '礼品/艺术/文化' },
            { text: '制造/印刷/包装', value: '制造/印刷/包装' },
            { text: '副食/酒水/饮料', value: '副食/酒水/饮料' },
            { text: '宠物/家禽/养殖', value: '宠物/家禽/养殖' },
            { text: '生活/办公/用品', value: '生活/办公/用品' }
          ],
          filterMethod (value, row) {
            return row.mtype === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '模板名',
          key: 'mname',
          width: '266'
        },
        {
          title: '编号',
          key: 'mbh',
          width: '100',
          fixed: 'left'
        },
        {
          title: '缩略图',
          key: 'spic',
          component: {
            name: MuBan,
            props: {
              myProps: ''
            }
          }
        }
      ],
      data: [
        {
          mtype: '电子/电器/网络',
          mname: '电子/电器/网络类型模板',
          mubanurl: 'www.chuangli.net/template/pcmuban/mbzhengji/zhangwc/PC128/',
          spic: 'http://www.chuangli.net/d/file/template/dianzi/2017-02-10/0afbd3f11df0d5d92dbd1c779fd5a55e.jpg',
          mbh: 'muban128',
          forbidEdit: false,
          showEditButton: true
        },
        {
          mtype: '旅游/酒店/饮食',
          mname: '旅游/酒店/饮食类型模板',
          mubanurl: 'www.chuangli.net/template/pcmuban/mbzhengji/kongyy/PC082/',
          spic: 'http://www.chuangli.net/d/file/template/lvyou/2017-02-09/5244645a030bd2991495923e10216e78.jpg',
          mbh: 'muban129',
          forbidEdit: false,
          showEditButton: true
        },
        {
          mtype: '副食/酒水/饮料',
          mname: '副食/酒水/饮料类型模板',
          mubanurl: 'www.chuangli.net/template/pcmuban/xinzeng/PC174/',
          spic: 'http://www.chuangli.net/d/file/template/yxxwzjs/2017-02-13/6898e1cd001b3026331c09f257f98049.jpg',
          mbh: 'muban136',
          forbidEdit: false,
          showEditButton: true
        }
      ],
      rowHandle: {
        columnHeader: '编辑模板参数',
        edit: {
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
      },
      editTemplate: {
        mtype: {
          title: '类型',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '电子/电器/网络'
              },
              {
                value: '家具/装饰/地产'
              },
              {
                value: '建筑/建材/五金'
              },
              {
                value: '工业/机械/设备'
              },
              {
                value: '服装/服饰/箱包'
              },
              {
                value: '培训/教育/传媒'
              },
              {
                value: '汽车/配件/运输'
              },
              {
                value: '珠宝/钻石/字画'
              },
              {
                value: '旅游/酒店/饮食'
              },
              {
                value: '政府/公共/服务'
              },
              {
                value: '医疗/整形/美容'
              },
              {
                value: '礼品/艺术/文化'
              },
              {
                value: '制造/印刷/包装'
              },
              {
                value: '副食/酒水/饮料'
              },
              {
                value: '宠物/家禽/养殖'
              },
              {
                value: '生活/办公/用品'
              }
            ]
          }
        },
        mname: {
          title: '模板名',
          value: ''
        },
        // mubanurl: {
        //   title: '模板地址',
        //   value: ''
        // },
        // spic: {
        //   title: '缩略图地址',
        //   value: ''
        // },
        mbh: {
          title: '模板编号',
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
    editRowWithNewTemplate () {
      this.$refs.d2Crud.showDialog({
        mode: 'edit',
        rowIndex: 2,
        template: {
          mtype: {
            title: '类型',
            value: ''
          },
          mname: {
            title: '模板名',
            value: ''
          },
          mubanurl: {
            title: '模板地址',
            value: ''
          },
          spic: {
            title: '缩略图地址',
            value: ''
          },
          mbh: {
            title: '模板编号',
            value: ''
          }
        }
      })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          address: '我是通过done事件传入的数据！'
        })
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
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }
    // 以上定义方法
  }
}
</script>
