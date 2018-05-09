<template>
    <div class="page">
        <navbar :title="title"></navbar>
        <date></date>
        <div class="cycleTime">
            <span>周期</span>
            <input type="number" v-model="inputDay" placeholder="请输入周期">天
        </div>
        <!-- <footers></footers> --><!-- 预留功能 -->
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
        inputDay:'28',
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
<style lang="scss">
.page{
    width:100%;
    .cycleTime{
        width:80%;
        margin:90% 10% 0 10%;
        input{
            height:30px;
            border:1px solid #ccc;
            padding-left:10px;
            margin:0 7px;
        }
    }
}
</style>

