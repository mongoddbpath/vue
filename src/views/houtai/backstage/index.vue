<template>
  <d2-container-frame
  :src="backStageUrl"/>
</template>

<script>
export default {
  // name : 'BackStage',
  data () {
    return {
      backStageUrl: `http://${this.$route.params.weburl}`,
      checkUrl: this.$route.params.weburl,
      preinstall: '该页面不允许直接访问，请通过站点管理来进行访问'
    }
  },
  mounted () {
    if (this.checkUrl === undefined) {
      this.$alert(this.preinstall, '请知悉', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({
            name: 'weblist'
          })
        }
      })
    }
  }
}
</script>
