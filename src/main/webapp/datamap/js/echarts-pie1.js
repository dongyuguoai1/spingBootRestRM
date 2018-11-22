var echartsContainer1 = document.getElementById('echarts5');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
// var resizeechartsContainer1 = function () {
//     //dom.style.width = window.innerWidth * 0.95 + 'px';
//     echartsContainer1.style.height = window.innerHeight * 0.2 + 'px';
// };
// //设置容器高宽
// resizeechartsContainer1();
// //基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(echartsContainer1);

var data_arr;
var name_arr =new Array();
// $.ajax({
// 	type : 'POST',
// 	url : "../../api/pie1",
// 	// data: data,
// 	async : false,
// 	success : function(post_data, status) {
//         data_arr = $.parseJSON(post_data);
//         for(var i in data_arr)
//         {
//             name_arr.push(data_arr[i].name);
//         }
//         //data_arr[1].value = 3;
// 	},
// 	dataType : "text"
// });

// 指定图表的配置项和数据
var option = {
    // title : {
    //     text: '各应用资源数量',
    //     subtext: '',
    //     x:'center'
    // },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        //data: ['东南地区','西南地区','东北地区','西北地区','中部地区']
        data:name_arr
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'东南地区'},
                {value:310, name:'西南地区'},
                {value:234, name:'东北地区'},
                {value:135, name:'西北地区'},
                {value:1548, name:'中部地区'}
            ],
            // data:data_arr,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option);

//用于使chart自适应高度和宽度
// window.onresize = function() {
//     //重置容器高宽
//     resizeechartsContainer1();
//     myChart1.resize();
// };

var pie1_list = {fmbgl:"fmbgl",ydhlwmbzk:"ydhlwmbzk",mmmqjkyj:"mmmqjkyj",gjtxwxzc:"gjtxwxzc"};
// myChart1.on('click', function (params) {
//     //console.log(points);
//     console.log(params.name);
//     url = "data_list.html?mapquery=" + encodeURI(pie1_list[params.name]);
//     window.open(url, "_blank");
// });