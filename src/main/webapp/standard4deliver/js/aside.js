$.ajax({
    url: "bzgl_bzck.html",
    type: 'get',
    dataType: 'html',
    // cache: false,
    // beforeSend: function (xmlHttp) {
    //     xmlHttp.setRequestHeader("If-Modified-Since", "0");
    //     xmlHttp.setRequestHeader("Cache-Control", "no-cache");
    // },
    //async: true,
    //data: parames,
    //error: function () { alert('error'); },
    success: function (data) {
        // $(".content-wrapper").html(data);
        $("#content0").html(data);
    }
});

//$(".treeview-menu a").click(function () {
//    //https://q.cnblogs.com/q/97751/ (点击哪个，哪个高亮，其他不高亮)
//    //http://www.w3school.com.cn/jquery/traversing_siblings.asp (siblings遍历)
//    $(this).parent().addClass("active").siblings().removeClass("active");
//    console.log($(this).parent());
//    if (!($(this).parent().parent().parent().hasClass("active"))) {
//        $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
//    }
//    //更改内容标题
//    $(".content-header h1").html($(this).html());
//    console.log($(this).html());
//    //http://www.w3school.com.cn/tiy/t.asp?f=jquery_traversing_eq (eq用法)
//    //一级目录（父目录）的名称和图标
//    //var list_name = $(this).parents(".treeview").find("span").eq(0).text();
//    //http://www.runoob.com/jquery/html-prop.html (添加、查询或删除属性)
//    //var list_icon = $(this).parents(".treeview").children("a").children("i").prop("outerHTML");
//    //显示当前位置导航
//    //http://www.runoob.com/jquery/misc-trim.html （trim用法，删除首尾空格）
//    //$(".breadcrumb").html('<li>' +
//    //    '<a href="javascript:void(0)">' +
//    //    list_icon + " " + list_name + '</a>' +
//    //    '</li>' +
//    //    '<li class="active">' + $.trim($(this).text()) + '</li>');
//    // $(".breadcrumb a").html(list_icon + " " + list_name);
//    // $(".breadcrumb li").filter(".active").text($(this).text());
//
//    var url_str = "";
//    //switch：高级if用法
//    switch ($.trim($(this).text())) {
//        case "资源查看":
//            url_str = "sub_category_view.html";
//            break;
//        case "数据标准查询":
//            url_str = "sub_register_audit.html";
//            break;
//        case "目录修改":
//            url_str = "sub_category_edit.html";
//            break;
//        case "数据源查看":
//            url_str = "sub_datasource_view.html";
//            break;
//        case "标签导航":
//            url_str = "sub_data_tag.html";
//            break;
//        case "精确导航":
//            url_str = "sub_data_search.html";
//            break;
//        case "批量标记":
//            url_str = "sub_add_remove.html";
//            break;
//        case "标签管理":
//            url_str = "sub_label_edit.html";
//            break;
//        case "血缘关系":
//            url_str = "sub_relation.html";
//            break;
//        case "数据流转":
//            url_str = "sub_data_exchange.html";
//            break;
//        case "我的数据":
//            url_str = "sub_my_data.html";
//            break;
//        case "授权管理":
//            url_str = "sub_authority_edit.html";
//            break;
//    }
//    //切换页面内容，用来显示子页面
//    if (url_str != "") {
//        $.ajax({
//            url: url_str,
//            type: 'get',
//            dataType: 'html',
//            // cache: false,
//            // beforeSend: function (xmlHttp) {
//            //     xmlHttp.setRequestHeader("If-Modified-Since", "0");
//            //     xmlHttp.setRequestHeader("Cache-Control", "no-cache");
//            // },
//            //async: true,
//            //data: parames,
//            //error: function () { alert('error'); },
//            success: function (data) {
//                // $(".content-wrapper").html(data);
//                $("#content0").html(data);
//            }
//        });
//    }
//});

$("[data-a='single']").click(function () {
    // console.log("click");
    //高亮
    $(this).parent().addClass("active").siblings().removeClass("active");
    //折叠？
    $(this).parent().siblings().removeClass("menu-open");
    //隐藏显示元素 https://blog.csdn.net/kungfu_panda/article/details/38554297
    $(this).parent().siblings().children("ul").css("display", "none");
    //内容标题
    $(".content-header h1").html($(this).html());
    //位置导航
    //$(".breadcrumb").html("");

    var url_str = "";
    switch ($.trim($(this).text())) {
        case "数据标准查询1":
            url_str = "bzgl_bzck.html";
            break;
        case "数据标准管理":
            url_str = "bzgl_bzgl.html";
            break;
    }
    if (url_str != "") {
        $.ajax({
            url: url_str,
            type: 'get',
            dataType: 'html',
            // cache: false,
            // beforeSend: function (xmlHttp) {
            //     xmlHttp.setRequestHeader("If-Modified-Since", "0");
            //     xmlHttp.setRequestHeader("Cache-Control", "no-cache");
            // },
            //async: true,
            //data: parames,
            //error: function () { alert('error'); },
            success: function (data) {
                // $(".content-wrapper").html(data);
                $("#content0").html(data);
            }
        });
    }
});
// $("#statistics_all").click(function () {
//     $(this).parent().addClass("active").siblings().removeClass("active");
//     if (!($(this).parent().parent().parent().hasClass("active"))) {
//         $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
//     }
//     $.ajax({
//         url: 'sub_statistics_all.html',
//         type: 'get',
//         dataType: 'html',
//         // async: false,
//         success: function (data) {
//             $("#content0").html(data);
//         }
//     });
// });
// $("#relation").click(function () {
//     $(this).parent().addClass("active").siblings().removeClass("active");
//     if (!($(this).parent().parent().parent().hasClass("active"))) {
//         $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
//     }
//     $.ajax({
//         url: 'sub_relation.html',
//         type: 'get',
//         dataType: 'html',
//         // async: false,
//         success: function (data) {
//             $("#content0").html(data);
//         }
//     });
// });
// });
// $("#content0").load("sub_data_list.html");