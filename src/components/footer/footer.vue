<template>
    <div class="footer">
        <ul>
            <li>
                <img src="../../assets/logo.png">
                <div class="bottomTitle">首页</div>
            </li>
            <div class="line"></div>
            <li>
                <img src="../../assets/logo.png">
                <div class="bottomTitle">功能</div>
            </li>
            <div class="line" style="left:66.66%;"></div>
            <li>
                <img src="../../assets/logo.png">
                <div class="bottomTitle">我的</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name:"footers",
  data () {
      return {

      }
  }
}
</script>
<style scoped lang="scss">
    .footer{
        width:100%;
        height:4rem;
        position: fixed;
        bottom:0;
        border-top: 1px solid #ccc;
        >ul{
            width:100%;
            height:100%;
            margin:0;
            padding:0;
            li{
                width:33.33%;
                height:4rem;
                line-height: 2.5rem;
                float: left;
                list-style-type: none;
                text-align: center;
                padding-top:0.4rem;
                img{
                    width:2rem;
                    height:2rem;
                }
                .bottomTitle{
                    width:33.33%;
                    position: absolute;
                    bottom:-0.6rem;
                }
            }
            .line{
                width:1px;
                height:4rem;
                background: #e2e2e2;
                position: absolute;
                bottom:0;
                left:33.33%;
            }
        }
    }
</style>

