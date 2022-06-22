<template>
<d2-container>
<template slot='header'><b>【{{url}}】</b>网站{{text}}编辑</template>
  <d2-container-frame :src="frameSrc"/>
</d2-container>
</template>
<script>
export default {
  data  () {
    return {
      url: this.$route.params.url
    }
  },
  computed: {
    frameSrc () {
      return this.$route.params.is_nginx === 1 ? process.env.VUE_APP_API + 'file/?id=' + this.$route.params.id + '&is_nginx=1'
        : process.env.VUE_APP_API + 'file/?id=' + this.$route.params.id
    },
    text () {
      return this.$route.params.is_nginx === 1 ? 'Nginx'
        : '文件'
    }
  },
  mounted () {
    if (this.$route.params.is_nginx === 1) {
      this.$util.authen(['null', 0])
    } else {
      this.$util.authen(['null', 0, 2])
    }
  }
}
</script>
<style scope lang='stylus'>
.d2-container-full {
    right: 0px !important;
}
</style>
