<template>
    <div class="calendar">
        <div class="month">
            <ul>
                <li @click="pickPre(currentYear,currentMonth)"> ❮ </li>
                <li>
                    <span>{{currentYear}}年</span>
                    <span>{{currentMonth}}月</span>
                </li>
                <li @click="pickNext(currentYear,currentMonth)"> ❯ </li>
            </ul>
        </div>
        <ul class="weekdays">
            <li style="color:#ccc"><a>日</a></li>
            <li><a>一</a></li>
            <li><a>二</a></li>
            <li><a>三</a></li>
            <li><a>四</a></li>
            <li><a>五</a></li>
            <li style="color:#ccc"><a>六</a></li>
        </ul>
        <div class="date">
            <ul class="days">
                <li v-for="dayobject in days">
                    <!--本月-->
                    <!--如果不是本月  改变类名加灰色-->
                    <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                    <!--如果是本月  还需要判断是不是这一天-->
                    <span v-else>
                        <!--今天同年同月同日-->
                        <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                        <span v-else>{{ dayobject.day.getDate() }}</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"date",
    props:[],
    data () {
        return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days:[],
        }
    },
    created () {
        this.initDate(null);
    },
    methods: {
        initDate (cur) {
            var leftcount=0; //存放剩余数量
                var date;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now=new Date();
                    var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(42);
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
                console.log(date);
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 周日放在第一行第1个位置
                //初始化本周
                for (var i = this.currentWeek; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day=d;
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = 1; i <= 41 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                    dayobject.day=d;
                    this.days.push(dayobject);
                }
                console.log(this.days);
        },
        pickPre: function(year, month) {
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(0);
            this.initDate(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickNext: function(year, month) {
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(35);
            this.initDate(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickYear: function(year, month) {
            alert(year + "," + month);
        },
        // 返回类似2018-05-04格式的字符串
        formatDate: function(year,month,day){
            var y = year;
            var m = month;
            if(m<10) m = "0" + m;
            var d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },

    }
  
}
</script>
<style lang="scss" scoped>
$seven:14.28%;
.calendar{
    width:100%;
    margin:0;
    .month{
        width:100%;
        height:3rem;
        padding:0.3rem 0;
        ul{
            width:100%;
            height:100%;
            line-height: 3rem;
            li{
                width:80%;
                text-align: center;
                font-size: 20px;
                &:first-child{
                    float: left;
                    width:10%;
                }
                &:last-child{
                    float: right;
                    width:10%;
                }
            }
        }
    }
    .weekdays{
        width:100%;
        height:auto;
    }
    .date{
        padding-top:2rem;
        .days{
            li{
                height:3rem;
                line-height: 3rem;
                .other-month{
                    color:#ccc;
                }
                .active{
                    padding: 0.6rem 0.85rem;
                    border-radius: 1.5rem;
                    background:#00de00;
                    color:#fff;
                }
            }
        }
    }
}
ul{
    margin:0;
    padding:0;
}
li{
    list-style-type: none;
    width:$seven;
    float:left;
}

</style>



