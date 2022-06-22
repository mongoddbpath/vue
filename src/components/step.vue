<template slot-scope='scope'>
    <el-steps :active="5" align-center style="margin-bottom:16px">
    <el-step title="已签单" description="业务员根据实际需求来开站,
    该订单会生成在订单界面，此时的订单状态会显示为【已签单】"></el-step>
    <el-step title="建站中" icon="el-icon-edit" description="
    建站人员通过系统查看今天需要处理的网站,
    客户可以根据QQ与建站人员沟通，
    建站人员根据客户需求进行建站，此时的订单状态会显示为【建站中】"></el-step>
    <el-step title="建站完成" icon="el-icon-upload" description="
    通过与客户沟通和建站人员的努力完成网站的建设与构建并且在网上稳定运行,
    客户查看确认满意,此时的订单状态会显示为【建站完成】"></el-step>
    <el-step title="已交付" icon="el-icon-success" description="
    客户与业务员对接，
    建站完成并且网站或处于SEO优化状态并且交清尾款,
    此时的订单状态会显示为【已交付】"></el-step>
    <el-step title="优化中" icon="el-icon-success" description="
    当网站已经交付同时已经或者直接购买SEO套餐的,
    我司会派专业的SEO人员进行网站的优化与维护,
    此时的订单状态会显示为【优化中】"></el-step>
    </el-steps>
      </template>
<script>
export default {
}
</script>
<style scope lang='stylus'>
  .el-step__description
    font-size: 13px

</style>
