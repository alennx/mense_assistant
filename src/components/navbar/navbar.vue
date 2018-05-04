<template>
    <div :class="[position ? 'fixed' : '' ,'header']">{{title}}</div>
</template>
<script>
export default {
    name: "navbar",
    props: ["title","position"],
    data () {
        return{
            
        }
    },
    created () {
        this.ceshi();
    },
    methods: {
        ceshi () {
            console.log('1');
        },
        back () {
            this.$router.go(-1);
        }
    },
    activated () {
        this.ceshi();
    }
  
}
</script>
<style>
    .header{
        width:100%;
        height:4rem;
        line-height: 4rem;
        font-size: 20px;
        background: #000;
        color:#fff;
    }
</style>


