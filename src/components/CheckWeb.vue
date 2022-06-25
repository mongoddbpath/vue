      <template slot-scope='scope'>
        <el-popover trigger='hover' placement='top'>
          <p prop='customer' style="font-size:16px"><b>点击前往网站</b></p>
          <p prop='customer'>初始账号：admin</p>
          <p prop='customer'>初始密码：{{ this.scope.row.db_pass }}</p>
          <p prop='customer'>套餐：{{ this.scope.row.plan}}</p>
          <p prop='customer'>语种：{{ this.scope.row.lang}}</p>
          <p prop='customer'>客户: {{ this.scope.row.username }}</p>
          <p prop='customer'>客户手机号: {{ this.scope.row.uphone }}</p>
          <p prop='customer'>QQ: {{ this.scope.row.qq }}</p>
          <p prop='customer'>邮箱: {{ this.scope.row.qq }}</p>
          <el-row>
            <el-button style="margin-top:8px;" type="success" @click="toIndex">
              点击前往站点首页</el-button>
          </el-row>
          <div slot='reference' class='name-wrapper' style='cursor: pointer'>
            <el-tag style='font-size:15px;' type='info' @click.native='handleClick'>{{ this.scope.row.url }}</el-tag>
          </div>
        </el-popover>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      default: null
    }
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    CheckPaiming () {
      this.$router.push({
        name: 'paiming',
        path: 'paiming',
        params: { url: this.scope.row.url }
      })
    },
    handleClick () {
      this.$emit('tag', this.value)
      window.open('http://' + this.scope.row.url)
    },
    toIndex () {
      if (this.scope.row.appName === 'site') {
        window.open(`http://${this.scope.row.url}`)
      } else {
        window.open(`http:///${this.scope.row.name}`)
      }
    }
  }
}
</script>
<style scope lang='stylus'>
.el-tag
  width 100%
  text-align center

</style>
