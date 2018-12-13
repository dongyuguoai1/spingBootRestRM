var echartsContainer4 = document.getElementById('echarts7');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var resizeechartsContainer4 = function () {
    //dom.style.width = window.innerWidth * 0.95 + 'px';
    echartsContainer4.style.height = window.innerHeight * 0.2 + 'px';
};
//设置容器高宽
resizeechartsContainer4();
//基于准备好的dom，初始化echarts实例
var myChart4 = echarts.init(echartsContainer4);

var data_arr3;
var name_arr3 =new Array();
$.ajax({
	type : 'POST',
	url : "../../api/pie3",
	// data: data,
	async : false,
	success : function(post_data, status) {
        data_arr3 = $.parseJSON(post_data);
        for(var i in data_arr3)
        {
            name_arr3.push(data_arr3[i].name);
        }
        //data_arr[1].value = 3;
	},
	dataType : "text"
});

// 指定图表的配置项和数据
var option = {
    title : {
        text: '数据中心',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:name_arr3
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:data_arr3,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            color:['#D4CCC5','#949FB1']
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart4.setOption(option);

//用于使chart自适应高度和宽度
// window.onresize = function() {
//     //重置容器高宽
//     resizeechartsContainer2();
//     myChart2.resize();
// };

var pie3_list = {主数据中心:"bj",区域中心:"fz"};
myChart4.on('click', function (params) {
    //console.log(points);
    console.log(params.name);
    url = "data_list.html?mapquery=" + encodeURI(pie3_list[params.name]);
    window.open(url, "_blank");
});


