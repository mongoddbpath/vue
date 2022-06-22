<template>
  <d2-container>
    <template slot='header'>模板列表</template>
    <d2-crud
      ref='d2Crud'
      :pagination='pagination'
      :loading="loading"
      :columns='columns'
      :data='
        data.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase())
        )'
    >
      <!-- 表格搜索框 -->
      <el-input
        slot='header'
        v-model='search'
        placeholder='输入关键字搜索(编号)'
        style='margin-bottom: 6px'
      ></el-input>

      <!-- 表格搜索框 -->
    </d2-crud>
  </d2-container>
</template>

<script>
// 引入启停MyTag组件
import MuBan from '@/components/MuBan'
import { mubanlist } from '@api/mubanlist'
import Note from '@/components/note'
export default {
  name: 'MuBan',
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
          title: '类型',
          key: 'type',
          fixed: 'left',
          filters: [
            { text: '模板站', value: '模板站' },
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
            return row.type === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '编号',
          key: 'name',
          fixed: 'left'
        },
        {
          title: '缩略图',
          key: 'pic',
          component: {
            name: MuBan,
            props: {
              myProps: ''
            }
          }
        },
        {
          title: '备注',
          key: 'note',
          width: '136',
          component: {
            name: Note,
            props: {
              myProps: ''
            }
          }
        }
      ],
      data: []
    }
  },
  mounted () {
    mubanlist().then(res => {
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
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }
    // 以上定义方法
  }
}
</script>
