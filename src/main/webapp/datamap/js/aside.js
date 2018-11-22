// $(document).ready(function () {
//   var parames = {
//     "type1": "paramer1", "type2": "paramer2"
//   };

$(".treeview-menu a").click(function () {
    $(this).parent().addClass("active").siblings().removeClass("active");
    if (!($(this).parent().parent().parent().hasClass("active"))) {
        $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
    }
    $(".content-header h1").html($(this).html());
    var list_name = $(this).parents(".treeview").find("span").eq(0).text();
    var list_icon = $(this).parents(".treeview").children("a").children("i").prop("outerHTML");
    $(".breadcrumb a").html(list_icon + " " + list_name);
    $(".breadcrumb li").filter(".active").text($(this).text());
    var url_str = "";
    switch ($.trim($(this).text())) {
        case "信用卡统计":
            url_str = "sub_add_modalAndaudit.html";
            break;
        case "信用卡申请统计":
            url_str = "sub_add_bmck.html";
            break;
        case "借记卡统计":
            url_str = "sub_add_bmxg.html";
            break;
        case "资产统计":
            url_str = "sub_data_list.html";
            break;
        case "批量标记":
            url_str = "sub_add_remove.html";
            break;
        case "标签管理":
            url_str = "sub_label_edit.html";
            break;
        case "综合统计":
            url_str = "sub_add_testEchart.html";
            break;
        case "血缘关系":
            url_str = "";
            break;
        case "报销管理1":
            url_str = "sub_add_bxgl.html";
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
                $("#content0").html(data);
                // $("#content0").append(data);
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