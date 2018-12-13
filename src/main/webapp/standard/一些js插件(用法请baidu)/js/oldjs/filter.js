function hors() {
	if ($(".select-result dd").length > 1) {
		$(".select-no").hide();
	} else {
		$(".select-no").show();
	}
}
console.log("filter.js run.");
function reset_filter() {
	//console.log("reset_filter");
	// //$(".select1-all").addClass("selected").siblings().removeClass("selected");
	// $(".select2-all").addClass("selected").siblings().removeClass("selected");
	// $(".select3-all").addClass("selected").siblings().removeClass("selected");
	$(".select-no").show();
	// //$(".selectA").remove();
	$(".selectB").remove();
	$(".selectC").remove();
	$(".selectA").remove();
	$(".selectD").remove();
	var dl2 = $('<dl id="select2">' + '<dt>数据来源：</dt>'
		+ '<dd class="select2-all selected">' + '<a href="#">全部</a>' + '</dd>'
		+ '<dd id="327">' + '<a href="#">327</a>' + '</dd>'
		+ '<dd id="hw">' + '<a href="#">hw</a>' + '</dd>'
		+ '<dd id="B3">' + '<a href="#">B3</a>' + '</dd>'
		+ '<dd id="B7">' + '<a href="#">B7</a>' + '</dd>'
		+ '<dd id="fz_ly">' + '<a href="#">福州</a>' + '</dd>'
		+ '<dd id="qd_ly">' + '<a href="#">青岛</a>' + '</dd>'
		+ '</dl>');
	var dl3 = $('<dl id="select3">' + '<dt>应用：</dt>'
		+ '<dd class="select3-all selected">' + '<a href="#">全部</a>'
		+ '</dd>' + '<dd id="fmbgl">' + '<a href="#">fmbgl</a>' + '</dd>'
		+ '<dd id="ydhlwmbzk">' + '<a href="#">ydhlwmbzk</a>' + '</dd>'
		+ '<dd id="mmmqjkyj">' + '<a href="#">mmmqjkyj</a>' + '</dd>'
		+ '<dd id="gjtxwxzc">' + '<a href="#">gjtxwxzc</a>' + '</dd>'
		+ '</dl>');
	var dl1 = $('<dl id="select1">' + '<dt>数据层级：</dt>'
			+ '<dd class="select1-all selected">' + '<a href="#">全部</a>' + '</dd>'
			+ '<dd id="1jk">' + '<a href="#">1级库</a>' + '</dd>'
			+ '<dd id="2jk">' + '<a href="#">2级库</a>' + '</dd>'
			+ '<dd id="3jk">' + '<a href="#">3级库</a>' + '</dd>'
			+ '</dl>');
	var dl4 = $('<dl id="select4">' + '<dt>数据中心：</dt>'
			+ '<dd class="select4-all selected">' + '<a href="#">全部</a>' + '</dd>'
			+ '<dd id="bj">' + '<a href="#">北京主数据中心</a>' + '</dd>'
			+ '<dd id="fz">' + '<a href="#">福州区域中心</a>' + '</dd>'
			+ '</dl>');
	$("#select2").remove();
	$("#select3").remove();
	$("#select1").remove();
	$("#select4").remove();
	$("#select-list2").append(dl2);
	$("#select-list3").append(dl3);
	$("#select-list1").append(dl1);
	$("#select-list4").append(dl4);
}

function filter_query() // 函数必须在tree和table都初始化完毕后调用，否则会出错
{
	console.log("filter_query");
	var arr = $('#tree').treeview('getSelected');
	var arrid = new Array();
	for (var key in arr) {
		// alert(arr[key].id);
		arrid[key] = arr[key].id;
	}
	var query_obj = new Object();
	query_obj.item = "tree";
	query_obj.query_array = arrid;

	var filter_obj = new Object();
	filter_obj.item = "filter";
	var filter_array = new Array();
	var i = 0;
	$(".select-result dd").each(function () {
		if ($(this).text() != "暂时没有选择过滤条件") {
			// filter_array[i] = $(this).children("a").text();
			// console.log($(this).children("a").text());
			filter_array[i] = $(this).attr("id");
			i++;
		}
	});
	filter_obj.query_array = filter_array;

	var query_obj_array = new Array();
	query_obj_array[0] = query_obj;
	query_obj_array[1] = filter_obj;
	//console.log(query_obj_array);
	function queryParams(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, // 页面大小
			offset: params.offset, // 页码
			query: query_obj_array,
		};
		return temp;
	}
	$("#tb_departments").bootstrapTable('refreshOptions', {
		url: "../../api/GetResource", // 重设数据来源
		queryParams: queryParams, // 传递参数（*）
		pageNumber : 1
	});
}

var tree2 = {
	text: "root",
	id: "0",
	nodes: [{
			text: "327",
			id: "327",
		}, 
		{
			text: "hw",
			id: "hw",
		}, 

	{
		text: "B3",
		id: "B3"
	}, 

	{
		text: "B7",
		id: "B7"
	}, 

	{
	text: "福州",
	id: "fz_ly"
},
	{
	text: "青岛",
	id: "qd_ly"
}
	]
};

function findJSON(param, tree) {
	if (param == tree.id) {
		return tree.nodes;
	} else {
		if (tree.nodes != null) {
			for (var i = 0; i < tree.nodes.length; i++) {
				var result = findJSON(param, tree.nodes[i]);
				if (result != null)
					return result;
			}
		} else {
			return null;
		}
	}
}

// 用js实现一个栈，有错误，还未调试，js的Array自带栈功能
// function treeStack()
// {
// this.treeArray = new Array();
// this.ii = 0;
// //this.j = 0;
// this.push = function(param)
// {
// this.treeArray[this.i]=param;
// this.ii++;
// };
// this.pop = function()
// {
// var popItem = this.treeArray[this.i];
// this.ii--;
// return popItem;
// };
// }

// var treeParent2;
// var treeStack0 = new treeStack();
// treeStack0.i = 0;
var treeParent = new Array();
$(document).on(
	"click",
	"#select2 dd",
	function () { // 动态生成的dom元素无法绑定到类似$("#select1 dd").click(function (){})的函数上
		// var treeStack0 = new treeStack(); //因此需要使用on函数
		$(this).addClass("selected").siblings().removeClass("selected");
		// treeParent = $(this).parent();
		var key = $(this).children("a").text();
		var id = $(this).attr("id");
		var arr = findJSON(id, tree2);
		if (arr != null) {
			// console.log("选中牛仔裤");
			// $("#select2").remove();
			$(this).parent().remove();
			// var dl = $('<dl id="select2"><dt>' + key + '：</dt><dd
			// class="select2-all selected"><a href="#">全部</a></dd></dl>');
			var dl = $('<dl id="select2"><dt>' + key + '：</dt></dl>');
			$("#select-list2").append(dl);
			for (var i = 0; i < arr.length; i++) {
				var dd = $('<dd id="' + arr[i].id + '"><a href="#">'
					+ arr[i].text + '</a></dd>');
				$("#select2").append(dd);
			}
			var ddParent = $('<dd><a href="#">返回上一级</a></dd>');
			$("#select2").append(ddParent);
			// treeParent2 = $(this).parent();
			// treeStack0.push($(this).parent());
			treeParent.push($(this).parent());
		}

		if ($(this).hasClass("select2-all")) {
			$(".selectB").remove();
		} else {
			var copyThisB = $(this).clone();
			if ($(".selectB").length > 0) {
				$(".selectB a").html($(this).children("a").text());
				$(".selectB").attr("id", $(this).attr("id"));
			} else {
				copyThisB.addClass("selectB");
				// $(".select-result dl").append(copyThisB.attr("class",
				// "selectB"));
				$(".select-result dl").append(copyThisB);
			}
		}
		var tmp;
		if (key == "返回上一级") {
			$(this).parent().remove();
			tmp = treeParent.pop();
			// tmp = treeStack0.pop();
			$("#select-list2").append(tmp);
			// treeParent = $(this).parent();
			// console.log($(treeParent).find(".selected").innerText);
			$(".selectB a").html(
				$(tmp).find(".selected").children("a").text());
			$(".selectB").attr("id", $(tmp).find(".selected").attr("id"));
		}

		hors();
		filter_query();

	});

var tree1 = {
		// 从数据库取。
		text: "root",
		id: "0",
		nodes: [{
			text: "1级库",
			id: "1jk",
		}, {
			text: "2级库",
			id: "2jk"
		}, {
			text: "3级库",
			id: "3jk"
		}]
	};

var treeParent1 = new Array();
$(document).on(
	"click",
	"#select1 dd",
	function () { // 动态生成的dom元素无法绑定到类似$("#select1 dd").click(function (){})的函数上
		// var treeStack0 = new treeStack(); //因此需要使用on函数
		$(this).addClass("selected").siblings().removeClass("selected");
		// treeParent = $(this).parent();
		var key = $(this).children("a").text();
		var id = $(this).attr("id");
		var arr = findJSON(id, tree1);
		if (arr != null) {
			// console.log("选中牛仔裤");
			// $("#select2").remove();
			$(this).parent().remove();
			// var dl = $('<dl id="select2"><dt>' + key + '：</dt><dd
			// class="select2-all selected"><a href="#">全部</a></dd></dl>');
			var dl = $('<dl id="select1"><dt>' + key + '：</dt></dl>');
			$("#select-list1").append(dl);
			for (var i = 0; i < arr.length; i++) {
				var dd = $('<dd id="' + arr[i].id + '"><a href="#">'
					+ arr[i].text + '</a></dd>');
				$("#select1").append(dd);
			}
			var ddParent = $('<dd><a href="#">返回上一级</a></dd>');
			$("#select1").append(ddParent);
			// treeParent2 = $(this).parent();
			// treeStack0.push($(this).parent());
			treeParent1.push($(this).parent());
		}

		if ($(this).hasClass("select1-all")) {
			$(".selectA").remove();
		} else {
			var copyThisB = $(this).clone();
			if ($(".selectA").length > 0) {
				$(".selectA a").html($(this).children("a").text());
				$(".selectA").attr("id", $(this).attr("id"));
			} else {
				copyThisB.addClass("selectA");
				// $(".select-result dl").append(copyThisB.attr("class",
				// "selectB"));
				$(".select-result dl").append(copyThisB);
			}
		}
		var tmp;
		if (key == "返回上一级") {
			$(this).parent().remove();
			tmp = treeParent1.pop();
			// tmp = treeStack0.pop();
			$("#select-list1").append(tmp);
			// treeParent = $(this).parent();
			// console.log($(treeParent).find(".selected").innerText);
			$(".selectA a").html(
				$(tmp).find(".selected").children("a").text());
			$(".selectA").attr("id", $(tmp).find(".selected").attr("id"));
		}

		hors();
		filter_query();

	});

var tree4 = {
		text: "root",
		id: "0",
		nodes: [{
			text: "北京主数据中心",
			id: "bj",
		}, {
			text: "福州区域中心",
			id: "fz"
		}]
	};

var treeParent4 = new Array();
$(document).on(
	"click",
	"#select4 dd",
	function () { // 动态生成的dom元素无法绑定到类似$("#select1 dd").click(function (){})的函数上
		// var treeStack0 = new treeStack(); //因此需要使用on函数
		$(this).addClass("selected").siblings().removeClass("selected");
		// treeParent = $(this).parent();
		var key = $(this).children("a").text();
		var id = $(this).attr("id");
		var arr = findJSON(id, tree4);
		if (arr != null) {
			// console.log("选中牛仔裤");
			// $("#select2").remove();
			$(this).parent().remove();
			// var dl = $('<dl id="select2"><dt>' + key + '：</dt><dd
			// class="select2-all selected"><a href="#">全部</a></dd></dl>');
			var dl = $('<dl id="select4"><dt>' + key + '：</dt></dl>');
			$("#select-list4").append(dl);
			for (var i = 0; i < arr.length; i++) {
				var dd = $('<dd id="' + arr[i].id + '"><a href="#">'
					+ arr[i].text + '</a></dd>');
				$("#select4").append(dd);
			}
			var ddParent = $('<dd><a href="#">返回上一级</a></dd>');
			$("#select4").append(ddParent);
			// treeParent2 = $(this).parent();
			// treeStack0.push($(this).parent());
			treeParent4.push($(this).parent());
		}

		if ($(this).hasClass("select4-all")) {
			$(".selectD").remove();
		} else {
			var copyThisB = $(this).clone();
			if ($(".selectD").length > 0) {
				$(".selectD a").html($(this).children("a").text());
				$(".selectD").attr("id", $(this).attr("id"));
			} else {
				copyThisB.addClass("selectD");
				// $(".select-result dl").append(copyThisB.attr("class",
				// "selectB"));
				$(".select-result dl").append(copyThisB);
			}
		}
		var tmp;
		if (key == "返回上一级") {
			$(this).parent().remove();
			tmp = treeParent4.pop();
			// tmp = treeStack0.pop();
			$("#select-list4").append(tmp);
			// treeParent = $(this).parent();
			// console.log($(treeParent).find(".selected").innerText);
			$(".selectD a").html(
				$(tmp).find(".selected").children("a").text());
			$(".selectD").attr("id", $(tmp).find(".selected").attr("id"));
		}

		hors();
		filter_query();

	});

$(document).on(
		"click",
		"#select3 dd",
		function () {
			$(this).addClass("selected").siblings().removeClass(
				"selected");
			if ($(this).hasClass("select3-all")) {
				$(".selectC").remove();
			} else {
				var copyThisC = $(this).clone();
				if ($(".selectC").length > 0) {
					$(".selectC a").html(
						$(this).children("a").text());
					$(".selectC").attr("id", $(this).attr("id"));
				} else {
					copyThisC.addClass("selectC");
					$(".select-result dl").append(copyThisC);
					// $(".select-result
					// dl").append(copyThisC.attr("id", "selectC"));
				}
			}
			hors();
			filter_query();
		});

$(document).ready(
	function () {
		// $("#select1 dd").click(function () {
		// $(this).addClass("selected");
		// $(".select1-all").removeClass("selected");
		// if ($(this).hasClass("select1-all")) {
		// $(".selectA").remove();
		// $(this).siblings().removeClass("selected");
		// $(this).addClass("selected");
		// } else {
		// var copyThisA = $(this).clone();
		// //console.log($(this).children("a").text());
		// if (($(".select-result dd").text()).indexOf($(this).text()) < 0)
		// {
		// copyThisA.addClass("selectA");
		// $(".select-result dl").append(copyThisA);
		// }
		// }
		// hors();
		// //filter_query();

		// });

		// $("#select2 dd").click(function () {
		// var key = $(this).children("a").text();
		// if (key = "牛仔裤") {
		// console.log("选中牛仔裤");
		// $("#select2").remove();
		// var dl = $('<dl id="select2"><dt>'+ key+'：</dt><dd
		// class="select2-all selected"><a href="#">全部</a></dd></dl>');
		// $("#select-list2").append(dl);
		// for(var i=0;i<4;i++)
		// {
		// var dd = $('<dd><a href="#">'+'牛仔裤'+i+'</a></dd>');
		// $("#select2").append(dd);
		// }
		// }
		// $(this).addClass("selected").siblings().removeClass("selected");
		// // switch (key) {
		// // case "牛仔裤":
		// // console.log("选中牛仔裤");
		// // $("#select2").remove();
		// // break;

		// // default:
		// // break;
		// // }
		// if ($(this).hasClass("select2-all")) {
		// $("#selectB").remove();
		// } else {
		// var copyThisB = $(this).clone();
		// if ($("#selectB").length > 0) {
		// $("#selectB a").html($(this).children("a").text());
		// } else {
		// $(".select-result dl").append(copyThisB.attr("id", "selectB"));
		// }
		// }
		// hors();
		// //filter_query();

		// });

		

		// $(".selectA").bind("click", function () {
		// $(document).on("click", ".selectA", function () {
		// var delA = $(this).text();
		// $("#select1 dd").each(function () {
		// if ($(this).text() == delA)
		// $(this).removeClass("selected");
		// });
		// $(this).remove();
		// if ($(".selectA").length == 0)
		// $("#select1 .select1-all").addClass("selected");
		// hors();
		// //filter_query();
		// });

		// $("#selectB").on("click", function () {
		$(document).on(
			"click",
			".selectB",
			function () {
				$(this).remove();
				$("#select2 .select2-all").addClass("selected")
					.siblings().removeClass("selected");
				hors();
				filter_query();

			});

		// $("#selectC").on("click", function () {
		$(document).on(
			"click",
			".selectC",
			function () {
				$(this).remove();
				$("#select3 .select3-all").addClass("selected")
					.siblings().removeClass("selected");
				hors();
				filter_query();

			});
		
		$(document).on(
				"click",
				".selectA",
				function () {
					$(this).remove();
					$("#select1 .select1-all").addClass("selected")
						.siblings().removeClass("selected");
					hors();
					filter_query();

				});
		
		$(document).on(
				"click",
				".selectD",
				function () {
					$(this).remove();
					$("#select4 .select4-all").addClass("selected")
						.siblings().removeClass("selected");
					hors();
					filter_query();

				});

		// $(".select dd").on("click", function () {
		// $(document).on("click", ".select dd", function () {
		// if ($(".select-result dd").length > 1) {
		// $(".select-no").hide();
		// } else {
		// $(".select-no").show();
		// }
		// //filter_query();
		// });

		// $("#select-ul1").click(function () {

		// });
	});

// 你可以添加jquery事件啊
// $(document).ready(function(){
// $(document).on('mouserover','li元素id或class什么的',function(){
// var aobj=$(this).children("a");
// $(aobj[0]).hide();
// });
// });
