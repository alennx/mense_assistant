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
                <li v-for="dayobject in filterList" @click="pickDay(dayobject)">
                    <!--本月-->
                    <!--如果不是本月  改变类名加灰色-->
                    <div :class="dayobject.className">{{ dayobject.date.getDate() }}</div>
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
            menstrualDate:5,
            cycle:28,
            limitNum:42,
            ovulatoryDay:false,
            ovulatoryDate:false,
            safetyDate:false,
            forecaseDate:false,
            days:[],
        }
    },
    created () {
        this.initDate(null);
    },
    computed:{
        filterList:function(){
            return this.days.slice(0,this.limitNum);
        }
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
                    dayobject.date = d;
                    dayobject.day=this.formatDate(d.getFullYear(),d.getMonth()+1,d.getDay());
                    dayobject.className = '';
                    if(dayobject.date.getMonth()+1 != this.currentMonth){
                        dayobject.className = 'other-month';
                    }
                    if(dayobject.date.getFullYear() == new Date().getFullYear() && dayobject.date.getMonth() == new Date().getMonth() && dayobject.date.getDate() == new Date().getDate()){
                        dayobject.className = 'active';
                    }
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = this.currentWeek; i <= 56-this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                    dayobject.day='';
                    dayobject.date = d;
                    dayobject.day=this.formatDate(d.getFullYear(),d.getMonth()+1,d.getDay());
                    dayobject.className = 'safeDay';
                    if(dayobject.date.getMonth()+1 != this.currentMonth){
                        dayobject.className = 'other-month';
                    }
                    if(dayobject.date.getFullYear() == new Date().getFullYear() && dayobject.date.getMonth() == new Date().getMonth() && dayobject.date.getDate() == new Date().getDate()){
                        dayobject.className = 'active';
                    }
                    this.days.push(dayobject);
                }
                console.log(this.days);
        },
        buildDates: function(date, options) {
            date = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
            var dates = [],
                lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 3);

            options = options || {};
            date = new Date(date);

            while (date.getDay() !== options.weekStartsOn) {
                date.setDate(date.getDate() - 1);
            }

            for (var i = 0; i < 56; i++) { // 42 == 6 rows of dates
                if (options.noExtraRows && date.getDay() === options.weekStartsOn && date > lastDate) break;

                dates.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return dates;
        },
        // 上一个月
        pickPre: function(year, month) {
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(0);
            this.initDate(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        // 下一个月
        pickNext: function(year, month) {
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(35);
            this.initDate(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        // 选择年
        pickYear: function(year, month) {
            alert(year + "," + month);
        },
        // 选择日期
        pickDay:function(dayobject){
            console.log(dayobject);
            console.log(this.days.length);
            for(let i =0;i<=this.days.length-1;i++){
                if(this.days[i].date == dayobject.date){
                    this.days[i+this.cycle].className = 'menstrualDate';
                    for(let j = 0;j<this.menstrualDate;j++){
                        this.days[i+j].className = 'menstrualDate';//月经周期
                        this.days[i+this.cycle+j].className = 'menstrualDate';//月经预判时间
                    }
                    this.days[i+this.cycle-14].className = 'ovulatoryDay';//月经预判时间
                }
            }
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
                line-height: 2.3rem;
                div{
                    width:2.3rem;
                    height:2.3rem;
                }
                .other-month{
                    color:#ccc;
                }
                .menstrualDate{
                    border-radius: 1.5rem;
                    background:#ff5983;
                    color:#fff;
                }
                .active{
                    border-radius: 1.5rem;
                    background:#ccc;
                }
                .safeDay{
                    border-radius: 1.5rem;
                    background:#3cb165;
                    color:#fff;
                }
                .ovulatoryDay{
                    border-radius: 1.5rem;
                    background:#ff7a1b;
                    color:#fff;
                }
                .ovulatoryDate{
                    border-radius: 1.5rem;
                    background:#fd9a20;
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



