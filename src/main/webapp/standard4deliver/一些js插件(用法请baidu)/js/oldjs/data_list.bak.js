function buildtree(data) {
	// console.log(data);
	var json = $.parseJSON(data);
	// return json.nodes;
	// console.log(json.text);
	// console.log(json.nodes);
	// var jsonArray = new Array();
	// jsonArray[0] = json;
	// var json_out = new Object();
	var json_out2_arr = new Array();
	// for(var x in json)
	for (var i = 0; i < json.length; i++) {
		json_out2_arr[i] = builtTreeJSON(json[i]);
	}
	// var json_out2 = builtTreeJSON(json[0]);
	// json_out2_arr[0]=json_out2;
	return json_out2_arr;
}

// 递归遍历json
function builtTreeJSON(json) {
	var json_out = new Object();
	json_out.id = json.id;
	json_out.text = json.text;
	json_out.tags = json.tags;
	if (json.nodes.length == 0)
		return json_out;
	else {
		json_out.nodes = new Array();
		for (var i = 0; i < json.nodes.length; i++) {
			json_out.nodes[i] = builtTreeJSON(json.nodes[i]);
		}
	}
	return json_out;
}

$.ajax({
	type: 'POST',
	url: "../api/tree_list",
	// data: data,
	async: false,
	success: function (post_data, status) {
		$("#tree").treeview({
			data: buildtree(post_data), // data is not optional
			// data : getTree(),
			onNodeSelected: function (event, data) {

				var arr = $('#tree').treeview('getSelected');
				// alert(JSON.stringify(arr));
				var arrid = Array();
				for (var key in arr) {
					// alert(arr[key].id);
					arrid[key] = arr[key].id;
				}
				var query_obj = new Object();
				query_obj.item = "tree";
				query_obj.query_array = arrid;

				var query_obj_array = new Array();
				query_obj_array[0] = query_obj;

				// console.log("click");
				// alert(data.text);
				// console.log(data.text);
				// 点击后页面跳转到数据列表页面，并用data.text作为查询字符串查询数据库
				// window.location.href = "demo_data_list.html";
				function queryParams(params) {
					var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
						limit: params.limit, // 页面大小
						// offset: 0,
						offset: params.offset, // 页码
						// sortable:params.sortable,
						query: query_obj_array,
						// statu: $("#txt_search_statu").val()
					};
					return temp;
				}

				$("#tb_departments").bootstrapTable('refreshOptions', {
					url: "../api/GetResource", // 重设数据来源
					queryParams: queryParams, // 传递参数（*）
					pageNumber: 1
				});
				// $("#tb_departments").bootstrapTable('refresh');
				// $("#tb_departments").bootstrapTable('refresh', {
				// url : "/api/GetResource", // 重设数据来源
				// query : {
				// //这个query字符串是在bootstrapTable定义的查询函数的查询条件的基础上再加3个字符串作为查询条件
				// username : 11111,
				// realname : "22222",
				// mobile : "asdsada"
				// }
				// 传到后台的参数
				// });
			},
			// levels: 5,
			multiSelect: false,
			showTags: true
		});
	},
	dataType: "text"
});

//提取url中的查询参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(decodeURI(r[2]));
	return null;
}

$(function () {

	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	// var oButtonInit = new ButtonInit();
	// oButtonInit.Init();

	// 初始化页面上面的按钮事件
	// $("#btn_add").click(function () {
	// //新增
	// });
	// $("#btn_edit").click(function () {
	// //编辑
	// });
	// $("#btn_info").click(function () {
	// //详情
	// });
	// $("#btn_delete").click(function () {
	// //删除
	// });

});

var TableInit = function () {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function () {
		$('#tb_departments').bootstrapTable({
			url: '../api/GetResourceFirst', // 请求后台的URL（*）
			// data:"test.json",
			method: 'post', // 请求方式（*）
			toolbar: '#toolbar', // 工具按钮用哪个容器
			striped: true, // 是否显示行间隔色
			cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: true, // 是否显示分页（*）
			sortable: false, // 是否启用排序
			sortOrder: "asc", // 排序方式
			queryParams: oTableInit.queryParams, // 传递参数（*）
			// queryParamsType: 'limit', //发送标准restful风格的请求
			sidePagination: "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, // 初始化加载第一页，默认第一页
			pageSize: 10, // 每页的记录行数（*）
			pageList: [10, 25, 50, 100], // 可供选择的每页的行数（*）
			search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: true,
			showColumns: true, // 是否显示所有的列
			showRefresh: true, // 是否显示刷新按钮
			minimumCountColumns: 2, // 最少允许的列数
			clickToSelect: true, // 是否启用点击选中行
			// height: 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: "id", // 每一行的唯一标识，一般为主键列
			showToggle: true, // 是否显示详细视图和列表视图的切换按钮
			cardView: false, // 是否显示详细视图
			detailView: false, // 是否显示父子表
			// striped: true, //表格显示条纹
			columns: [{
				checkbox: true
			}, {
				field: 'schemaCode',
				title: '模型编码'
			}, {
				field: 'schemaName',
				title: '模型中文名'
			}, {
				field: 'dataSource',
				title: '数据源'
			}, {
				field: 'updateTime',
				title: '更新时间'
			}
			]
		});
	};

	// 得到查询的参数
	oTableInit.queryParams = function (params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, // 页面大小
			offset: params.offset, // 页码
			// sortable:params.sortable,
			queryfirst: GetQueryString("parm1"),
			// statu: $("#txt_search_statu").val()
		};
		return temp;
	};
	return oTableInit;
};

// function getparm2() {
// var url = location.href;
// var tmp1 = url.split("?")[1];
// var tmp2 = tmp1.split("&")[1];
// var tmp3 = tmp2.split("=")[1];
// var parm2 = tmp3;
// alert(parm2);
// }

// $("#tree").click(function(e) {
//
// var arr = $("#tree").treeview("getSelected");
//
// console.log("click");
// alert(arr);
// console.log(arr);
//
// })

$(function () {
	$("#btn_select").click(
		function () {
			var result_array = $("#tb_departments").bootstrapTable(
				'getAllSelections');
			// console.log('getSelections: ' + JSON.stringify(result_array));
			// alert('getSelections: ' +
			// JSON.stringify($("#tb_departments").bootstrapTable('getAllSelections')));
			// var data_list_window = window;
			for (var i = 0; i < result_array.length; i++) {
				url = "sub_info.html?code=" + result_array[i].id;
				window.open(url, "_blank");
				// data_list_window.focus();
			}
		});
	$("#btn_tag").click(
		function () {
			var select_array = $("#tb_departments").bootstrapTable(
				'getAllSelections');
			// var strdata = JSON.stringify(select_array);
			var strinput = new Array();
			var i=0;
			$(".select-result dd").find("span").each(function(){	
				strinput[i]=$(this).text();
				i++;
			});
			var tdata={tableItems:select_array,tag:strinput};
			var strdata = JSON.stringify(tdata);

			// var data = {a:1111,b:222};
			// var strdata = JSON.stringify(data);
			// $.post("../api/insertTag", strdata,function (post_data,
			// status) {
			console.log(tdata);
			// console.log(strinput);
			//		
			// }, "text");
			$.ajax({
				type: 'POST',
				url: "../api/insertTag",
				data: strdata,
				// async: false,
				contentType: "application/json",
				success: function (post_data2, status) {
					console.log(post_data2);
				},
				dataType: "text"
			});

		});

	(function () {
		var mq = decodeURI(GetQueryString("mapquery"));
		// var mq = GetQueryString("mapquery");
		// var tmp = getparm1();
		// console.log(tmp);
		// document.getElementById("B1").click();
		$("#" + mq).click();
		// $("#B1").click();
		var test2 = 0;
	})();

	$("#btn_search").click(function () {
		var id = $("#input_search1").val();
		var schemaCode = $("#input_search2").val();
		var schemaName = $("#input_search3").val();

		var query_obj = { "id": id, "schemaCode": schemaCode, "schemaName": schemaName };
		function queryParams(params) {
			var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit: params.limit, // 页面大小
				offset: params.offset, // 页码
				query: query_obj,
			};
			return temp;
		}
		$("#tb_departments").bootstrapTable('refreshOptions', {
			url: "../api/getSearchResult", // 重设数据来源
			queryParams: queryParams, // 传递参数（*）
		});
	});
});

$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
	checkboxClass: 'icheckbox_minimal-blue',
	radioClass: 'iradio_minimal-blue'
});

$("#btn_tag").hide();
$("#btn_delete").show();

$("#checkbox1").on("ifChanged", function () {
	// console.log("ifClicked");
	if ($(this).is(":checked")) {
		$("#alert-info1").remove();
		$(".col-sm-9.col-md-9.column").prepend('<div id="alert-info1" class="alert alert-info alert-dismissible">'
			+ '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
			+ '<h4>'
			+ '<i class="icon fa fa-info"></i> 标注模式</h4>'
			+ '当前为<b>“标签标注”</b>模式。通过目录或搜索找到资源，选择资源并选择标签，点击“添加标签”按钮将会使用选择的标签标注该资源。'
			+ '</div>');
			$("#btn_tag").show();
			$("#btn_delete").hide();
	} else {
		$("#alert-info1").remove();
		$(".col-sm-9.col-md-9.column").prepend('<div id="alert-info1" class="alert alert-info alert-dismissible">'
			+ '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
			+ '<h4>'
			+ '<i class="icon fa fa-info"></i> 查询模式</h4>'
			+ '当前为<b>“标签查询”</b>模式。点击标签将会筛选出被该标签标注的资源,在该模式下可以批量取消资源的标签。'
			+ '</div>');
			$("#btn_tag").hide();
			$("#btn_delete").show();
	}
});