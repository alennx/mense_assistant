<template>
    <div class="page">
        <navbar :title="title"></navbar>
        <date></date>
        <footers></footers>
    </div>
</template>
<script>
import navbar from "../components/navbar/navbar"
import footers from "../components/footer/footer"
import date from "../components/date/date"
export default {
  data () {
      return {
        title: '测试',
      }
  },
  components: {
      navbar,
      footers,
      date
  },
  methods: {

  }
}
</script>
<style>
    .page{
        width:100%;
        height:800px;
    }
</style>


