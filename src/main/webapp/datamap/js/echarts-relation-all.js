var echartsContainer = document.getElementById('echarts2');

// 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var resizeechartsContainer = function() {
	// dom.style.width = window.innerWidth * 0.95 + 'px';
	echartsContainer.style.height = window.innerHeight * 0.6 + 'px';
};
// //设置容器高宽
resizeechartsContainer();
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(echartsContainer);

myChart.showLoading();

var webkitDep;
var datain = {
	// "refType" : [ "生产", "引用", "自定义", "外键" ]
	"refType" : [ "生产" ]
};
$.ajax({
	type : 'POST',
	url : "../../api/ref",
	data : JSON.stringify(datain),
	contentType : "application/json",
	async : false,
	success : function(post_data, status) {
		webkitDep = $.parseJSON(post_data);
	},
	dataType : "text"
});
// var webkitDep = {
// "type": "force",
// "categories": [ //关系网类别，可以写多组
// {
// "name": "人物关系1", //关系网名称
// "keyword": {},
// "base": "人物关系2"
// },
// {
// "name": "人物关系2", //关系网名称
// "keyword": {},
// "base": "人物关系2"
// }
// ],
// "nodes": [ //展示的节点
// {
// "name": "刘烨", //节点名称
// "value": 3,
// "category": 0 //与关系网类别索引对应，此处只有一个关系网所以这里写0
// },
// {
// "name": "霓娜",
// "value": 1,
// "category": 0
// },
// {
// "name": "诺一",
// "value": 1,
// "category": 0
// },
// {
// "name": "霓娜1",
// "value": 1,
// "category": 1
// },
// {
// "name": "诺一2",
// "value": 1,
// "category": 1
// },
// {
// "name": "霓娜3",
// "value": 1,
// "category": 1
// },
// {
// "name": "诺一3",
// "value": 1,
// "category": 1
// }
// ],
// "links": [ //节点之间连接
// {
// "source": "诺一2", //起始节点，0表示第一个节点
// "target": "霓娜3" //目标节点，1表示与索引为1的节点进行连接
// },
// {
// "source": "霓娜3", //起始节点，0表示第一个节点
// "target": "诺一2" //目标节点，1表示与索引为1的节点进行连接
// }
// // ,
// // {
// // "source": 0, //起始节点，0表示第一个节点
// // "target": 1 //目标节点，1表示与索引为1的节点进行连接
// // },
// // {
// // "source": 0,
// // "target": 2
// // },
// // {
// // "source": 0, //起始节点，0表示第一个节点
// // "target": 3 //目标节点，1表示与索引为1的节点进行连接
// // },
// // {
// // "source": 3,
// // "target": 4
// // },
// // {
// // "source": 4, //起始节点，0表示第一个节点
// // "target": 5 //目标节点，1表示与索引为1的节点进行连接
// // },
// // {
// // "source": 1,
// // "target": 6
// // }
// ]
// };

myChart.hideLoading();

var option = {
	title : {
		text : '表关系测试图',
		subtext : 'Default layout',
		top : 'bottom',
		left : 'right'
	},
	tooltip : {},
	legend : [ {
		data : [ '目标', '生产' ]
	// 此处的数据必须和关系网类别中name相对应
	// height: echartsContainer.style.height,
	// width: echartsContainer.style.width
	} ],
	animation : false,
	series : [ {
		name : '表关系测试图',
		type : 'graph',
		// layout: 'circular',
		layout : 'force',
		// animation: false,
		label : {
			normal : {
				show : true,
				position : 'right'
			}
		},
		lineStyle : {
			normal : {
				color : '#000',
				width : 1,
				type : 'solid'
			}
		},
		draggable : true, // 是否可以拖动
		// data: webkitDep.nodes.map(function(node, idx) {
		// node.id = idx;
		// return node;
		// }),
		categories : [ // 关系网类别，可以写多组
		{
			"name" : "目标", // 关系网名称
			"keyword" : {},
			"base" : "目标"
		}, {
			"name" : "生产", // 关系网名称
			"keyword" : {},
			"base" : "生产"
		}

		],
		roam : true,
		force : {
			// edgeLength: 105, //连线的长度
			repulsion : 100
		// 子节点之间的间距
		},
		nodes : webkitDep.nodes,
		links : webkitDep.links
	// edges: webkitDep.links
	} ]
};

myChart.setOption(option);

// 用于使chart自适应高度和宽度
window.onresize = function() {
	// 重置容器高宽
	resizeechartsContainer();
	myChart.resize();
};

// 多选的checkbox用下面的js函数
// $(".select-label").change(function() {
// // var option1ischecked = $("#option1").attr("checked");
// // attr不能用来获得checked是否选中
// var option1ischecked = $("#option1").prop("checked");
// var option2ischecked = $("#option2").prop("checked");
// var option3ischecked = $("#option3").prop("checked");
// var option4ischecked = $("#option4").prop("checked");
// console.log("push botton " + option1ischecked);
// });

$(".select-label").click(function() {
	var option_id = $.trim($(this).text());
	var datain2 = {
		"refType" : []
	};
	datain2.refType.push(option_id);
	console.log("push botton " + option_id);

	myChart.showLoading();
	var data_out;
	$.ajax({
		type : 'POST',
		url : "../../api/ref",
		data : JSON.stringify(datain2),
		contentType : "application/json",
		async : false,
		success : function(post_data, status) {
			data_out = $.parseJSON(post_data);
		},
		dataType : "text"
	});
	myChart.hideLoading();

	var option2 = {
		title : {
			text : '表关系测试图',
			subtext : 'Default layout',
			top : 'bottom',
			left : 'right'
		},
		tooltip : {},
		legend : [ {
			data : [ '目标', option_id ]
		// 此处的数据必须和关系网类别中name相对应
		} ],
		animation : false,
		series : [ {
			name : '表关系测试图',
			type : 'graph',
			layout : 'force',
			label : {
				normal : {
					show : true,
					position : 'right'
				}
			},
			lineStyle : {
				normal : {
					color : '#000',
					width : 1,
					type : 'solid'
				}
			},
			draggable : true, // 是否可以拖动
			categories : [ // 关系网类别，可以写多组
			{
				"name" : "目标", // 关系网名称
				"keyword" : {},
				"base" : "目标"
			}, {
				"name" : option_id, // 关系网名称
				"keyword" : {},
				"base" : option_id
			} ],
			roam : true,
			force : {
				repulsion : 100
			},
			nodes : data_out.nodes,
			links : data_out.links
		} ]
	};
	
	myChart.setOption(option2);
	
});

$(".li-btn").click(function() {
	var aa = 0;

	console.log("push botton222222");
});

$("#btn-search1").click(function() {
	var aa = $("#input-search1").val();

	myChart.showLoading();
	var webkitDep1;
	var datain1 = {
		"num" : aa
	};
	$.ajax({
		type : 'POST',
		url : "../../api/refCount",
		data : JSON.stringify(datain1),
		contentType : "application/json",
		async : false,
		success : function(post_data, status) {
			webkitDep1 = $.parseJSON(post_data);
		},
		dataType : "text"
	});
	myChart.hideLoading();

	var option1 = {
		legend : [ {
			data : [ '大于等于' + aa + '层关系' ]
		// 此处的数据必须和关系网类别中name相对应
		// height: echartsContainer.style.height,
		// width: echartsContainer.style.width
		} ],
		animation : false,
		series : [ {
			name : '表关系测试图',
			type : 'graph',
			// layout: 'circular',
			layout : 'force',
			// animation: false,
			label : {
				normal : {
					show : true,
					position : 'right'
				}
			},
			lineStyle : {
				normal : {
					color : '#000',
					width : 1,
					type : 'solid'
				}
			},
			draggable : true, // 是否可以拖动
			categories : [ // 关系网类别，可以写多组
			{
				"name" : '大于等于' + aa + '层关系', // 关系网名称
				"keyword" : {},
				"base" : '大于等于' + aa + '层关系'
			} ],
			nodes : webkitDep1.nodes,
			links : webkitDep1.links
		// data: webkitDep.nodes.map(function(node, idx) {
		// node.id = idx;
		// return node;
		// }),
		// edges: webkitDep.links
		} ]
	};
	myChart.setOption(option1);

	console.log("push查询 botton=" + aa);
});

$("#btn-search2").click(function() {
	var aa = $("#input-search2").val();

	console.log("push搜索botton==" + aa);
});

myChart.on('click', function(params) {
	// console.log(points);
	console.log(params.name);
	if (params.name.indexOf(">") >= 0) {
		console.log("点击边");
	} else {
		var arr = new Array();
		arr = params.name.split("-");
		var url = "info.html?code=" + encodeURI(arr[arr.length - 1]);
		window.open(url, "_blank");
	}

});