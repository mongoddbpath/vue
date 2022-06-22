<template>
  <d2-container-frame
  src="backStageUrl"/>
</template>

<script>
export default {
  // name : 'BackStage',
  data () {
    return {
      backStageUrl: this.$route.query.url
    }
  },
  watch () {
    console.log(this.$route.query.url)
    // let backStageUrl = this.$route.query.url
  }
}
</script>
