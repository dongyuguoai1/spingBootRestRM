var echartsContainer2 = document.getElementById('echarts6');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var resizeechartsContainer2 = function () {
    //dom.style.width = window.innerWidth * 0.95 + 'px';
    echartsContainer2.style.height = window.innerHeight * 0.2 + 'px';
};
//设置容器高宽
resizeechartsContainer2();
//基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(echartsContainer2);

var data_arr2;
var name_arr2 =new Array();
$.ajax({
	type : 'POST',
	url : "../../api/pie2",
	// data: data,
	async : false,
	success : function(post_data, status) {
        data_arr2 = $.parseJSON(post_data);
        for(var i in data_arr2)
        {
            name_arr2.push(data_arr2[i].name);
        }
        //data_arr[1].value = 3;
	},
	dataType : "text"
});

// 指定图表的配置项和数据
var option = {
    title : {
        text: '数据层级',
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
        data:name_arr2
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:data_arr2,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            //color:['#F7464A', '#4D5360','#D4CCC5','#949FB1']
            color:['#F7464A', '#4D5360','#D4CCC5']
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option);

//用于使chart自适应高度和宽度
// window.onresize = function() {
//     //重置容器高宽
//     resizeechartsContainer2();
//     myChart2.resize();
// };

var pie2_list = {一级库:"1jk",二级库:"2jk",三级库:"3jk"};
myChart2.on('click', function (params) {
    //console.log(points);
    console.log(params.name);
    url = "data_list.html?mapquery=" + encodeURI(pie2_list[params.name]);
    window.open(url, "_blank");
});



