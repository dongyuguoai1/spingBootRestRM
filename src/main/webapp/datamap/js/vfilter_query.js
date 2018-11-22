// window["vfilter_query.js"] || (function () {
//     window["vfilter_query.js"] = true;
//     //代码。。。。。。。。。。
// })();

var vm_q = new Vue({
    el: "#filter",
    data: {
        // classifyTag: classifyData,  //排他性质的分类标签功能暂时不需要
        freeTag: []
    },
    created: function () {
        var _self = this;
        $.ajax({
            type: "GET",
            url: "../label_api/label/all_select",
            dataType: "text",
            contentType: "application/json",
            success: function (data, status) {
                var json = $.parseJSON(data);
                _self.freeTag = json;
                console.log("vfilter_query load success");
                // this.freeTag = eval("(" + data + ")");
            },
            error: function () {
                _self.freeTag = [];
            }
        });
    }
});

function hors() {
    if ($(".select-result dd").length > 1) {
        $(".select-no").hide();
    } else {
        $(".select-no").show();
    }
}

$("#filter").on(
    "click",
    ".free-list dd",
    function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            var cls = "." + $(this).attr("class").split(" ")[0];
            $(".select-result dd").filter(cls).remove();
        }
        else {
            $(this).addClass("selected");
            var copy = $(this).clone();
            $(".select-result dl").append(copy);
        }
        hors();
        filter_query();
    }
);

$("#filter").on(
    "click",
    ".select-result dd",
    function () {
        if ($.trim($(this).text()) != "暂时没有选择过滤条件") {
            $(this).remove();
            var cls = $(this).attr("class").split(" ")[0];
            console.log(cls);
            $(".select-list dd").each(function () {
                if ($(this).hasClass(cls)) {
                    $(this).siblings(".select-all").addClass("selected").siblings().removeClass("selected");
                }
            });
            $(".free-list dd").each(function () {
                if ($(this).hasClass(cls)) {
                    $(this).removeClass("selected");
                }
            });
            hors();
            filter_query();
        }
    });

function filter_query() {

    var filter_array = new Array();
    var i = 0;
    $(".select-result dd").each(function () {
        if ($.trim($(this).text()) != "暂时没有选择过滤条件") {
            filter_array[i] = $(this).find("span").text();
            i++;
        }
    });

    var post_data = { offset: 0, limit: 5, filter_query: filter_array };
    ajax_list("../label_api/resources/labels",post_data);
    // $.ajax({
    //     type: 'POST',
    //     url: "../label_api/resources/labels",
    //     data: JSON.stringify(post_data),
    //     contentType: "application/json",
    //     dataType: "text",
    //     success: function (data, status) {
    //         var json = $.parseJSON(data);
    //         console.log(json);

    //         if (json.length > 0) {
    //             $(".list-unstyled").html(page_create(0, 10, json.length, json));

    //             $("#pagination").bootstrapPaginator({
    //                 bootstrapMajorVersion: 3,//bootstrap版本
    //                 // currentPage: page,//当前页面 
    //                 numberOfPages: 5,//一页显示几个按钮（在ul里面生成5个li） 
    //                 totalPages: Math.ceil(json.length / 10), //总页数
    //                 currentPage: 1,
    //                 itemTexts: function (type, page, current) {
    //                     switch (type) {
    //                         case "first":
    //                             return "首页";
    //                         case "prev":
    //                             return "上一页";
    //                         case "next":
    //                             return "下一页";
    //                         case "last":
    //                             return "末页";
    //                         case "page":
    //                             return page;
    //                     }
    //                 },
    //                 onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
    //                     $(".list-unstyled").html(page_create(10 * (page - 1), 10, json.length, json));
    //                     // console.log(page);
    //                 }
    //             });
    //             $("#pagination").show();
    //         }
    //         else {
    //             $(".list-unstyled").html('<li style="padding-top: 20px">'
    //                 + '<p><i class="fa fa-exclamation"></i>&nbsp;&nbsp;没有找到符合条件的数据资源</p>'
    //                 + '<p style="margin-bottom: 20px"><i class="fa fa-exclamation"></i>&nbsp;&nbsp;请更换查找条件</p>'
    //                 + '<hr style="margin-bottom: 0px;margin-top: 0px">'
    //                 + '</li>');
    //             $("#pagination").hide();
    //         }

    //     },
    //     error: function () {
    //         console.log("ajax失败！");
    //     }
    // });

}

//data_list页面ajax请求数据并显示，显示部分使用page_create函数，参数是ajax的url和请求字符串
function ajax_list(url,post_data){
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(post_data),
        contentType: "application/json",
        dataType: "text",
        success: function (data, status) {
            var json = $.parseJSON(data);
            console.log(json);

            if (json.length > 0) {
                $(".list-unstyled").html(page_create(0, 10, json.length, json));

                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//bootstrap版本
                    // currentPage: page,//当前页面 
                    numberOfPages: 5,//一页显示几个按钮（在ul里面生成5个li） 
                    totalPages: Math.ceil(json.length / 10), //总页数
                    currentPage: 1,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                        $(".list-unstyled").html(page_create(10 * (page - 1), 10, json.length, json));
                        // console.log(page);
                    }
                });
                $("#pagination").show();
            }
            else {
                $(".list-unstyled").html('<li style="padding-top: 20px">'
                    + '<p><i class="fa fa-exclamation"></i>&nbsp;&nbsp;没有找到符合条件的数据资源</p>'
                    + '<p style="margin-bottom: 20px"><i class="fa fa-exclamation"></i>&nbsp;&nbsp;请更换查找条件</p>'
                    + '<hr style="margin-bottom: 0px;margin-top: 0px">'
                    + '</li>');
                $("#pagination").hide();
            }

        },
        error: function () {
            console.log("ajax失败！");
        }
    });
}

//和分页控件结合，创建分页并生成每个分页的html文本
function page_create(offset, limit, total, data) {  //函数输入一个json数组
    var resource_str = "";
    for (i = offset; i < offset + Math.min(total - offset, limit); i++) {
        var label_str = "";
        for (j = 0; j < data[i].labelList.length; j++) {
            label_str = label_str
                + '<span id="' + data[i].labelList[j].label_id + '" class="label label-info">' + data[i].labelList[j].label_name + '</span>&nbsp;';
        }
        resource_str = resource_str
            + '<li style="padding-top: 20px">'
            + '<p>'
            + '<a id="' + data[i].id + '" href="javascript:void(0)" style="font-size: 18px;color:#ca195a">' + data[i].code + '</a>'
            + '&nbsp;<a href="javascript:void(0)" style="color:#357ca5">申请授权</a>'
            + '</p>'
            + '<div class="row" style="margin-bottom: 10px;margin-left: 0;margin-right: 0;color:dimgray">'
            + '<div class="col-md-2" style="padding: 0px;">'
            + '<i class="fa fa-th"></i> 数据资源种类：'
            + '<span style="color:#111111">' + data[i].resType + '</span>'
            + '</div>'
            + '<div class="col-md-2" style="padding: 0px;">'
            + '<i class="fa fa-user"></i> 所有者：'
            + '<span style="color:#111111">' + data[i].createPerson + '</span>'
            + '</div>'
            + '<div class="col-md-4" style="padding: 0px;">'
            + '<i class="fa fa-clock-o"></i> 最近更新时间：'
            + '<span style="color:#111111">' + data[i].updateTime + '</span>'
            + '</div>'
            + '</div>'
            + '<p style="color: dimgray">'
            + '<i class="fa fa-file-text"></i> 描述：'
            + '<span style="color:#111111">' + data[i].description + '</span>'
            + '</p>'
            + '<p style="color: dimgray" class="vertical-align">'
            + '<span>'
            + '<i class="fa fa-tags"></i> 标签：</span>'
            + label_str
            + '<button type="button" class="btn btn-default btn-xs" style="height: 18px;padding-bottom: 3.6px;padding-top: 0px;">'
            + '<i class="fa fa-plus"></i>'
            + '</button>'
            + '</p>'
            + '<hr style="margin-bottom: 0px;margin-top: 0px">'
            + '</li>';
    }
    return resource_str;
}