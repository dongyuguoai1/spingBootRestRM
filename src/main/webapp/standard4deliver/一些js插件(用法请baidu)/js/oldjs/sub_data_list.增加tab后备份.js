//下面的方法可以使一个js文件只运行一次
// window["data_list.js"] || (function () {
//     window["data_list.js"] = true;
//     //代码。。。。。。。。。。
// })();


//Initialize Select2 Elements
$('.select2').select2();

//*目录部分 *//
//select2第一个下拉菜单初始化
$.ajax({
    type: 'GET',
    url: "../label_api/category/0",
    // data: JSON.stringify(saveData),
    contentType: "application/json",
    dataType: "text",
    success: function (data, status) {
        var json = $.parseJSON(data);
        // console.log(json);
        var option_str = "";
        for (i = 0; i < json.length; i++) {
            option_str = option_str + '<option value="' + json[i].id + '">' + json[i].name + '</option>'
        }
        $("#catalog").append('<div class="form-group col-md-3">'
            + '<label>目录</label>'
            + '<select class="form-control select2" style="width: 100%;">'
            + '<option selected="selected">全部</option>'
            + option_str
            + '</select>'
            + '</div>');
        $('.select2').select2();
    },
    error: function () {
        console.log("ajax失败！");
    }
});

$("#catalog").on("select2:select", function (e) {
    //e的话就是一个对象 然后需要什么就“e.参数”形式进行获取
    var div_this = $(e.target).parent();
    div_this.nextAll().remove();
    if (e.params.data.text != "全部") {
        // var div_this = $(e.target).parent();
        // console.log($(e.target).parent());
        // console.log(e);
        $.ajax({
            type: 'GET',
            url: "../label_api/category/" + e.params.data.id,
            // data: JSON.stringify(saveData),
            contentType: "application/json",
            dataType: "text",
            success: function (data, status) {
                var json = $.parseJSON(data);
                // console.log(json);
                if (json.length > 0) {
                    var option_str = "";
                    for (i = 0; i < json.length; i++) {
                        option_str = option_str + '<option value="' + json[i].id + '">' + json[i].name + '</option>'
                    }
                    if (div_this.next().length == 0) {
                        div_this.after('<div class="form-group col-md-3">'
                            + '<label>目录</label>'
                            + '<select class="form-control select2" style="width: 100%;">'
                            + '<option selected="selected">全部</option>'
                            + option_str
                            + '</select>'
                            + '</div>');
                        $('.select2').select2();
                    }
                    else {
                        div_this.next().replaceWith('<div class="form-group col-md-3">'
                            + '<label>目录</label>'
                            + '<select class="form-control select2" style="width: 100%;">'
                            + '<option selected="selected">全部</option>'
                            + option_str
                            + '</select>'
                            + '</div>');
                        $('.select2').select2();
                    }
                }
                else {
                    div_this.next().remove();
                }
            },
            error: function () {
                console.log("ajax失败！");
            }
        });
    }
    else {
        // var div_this = $(e.target).parent();
        div_this.nextAll().remove();
    }
});

//*搜索部分 *//
var btn_plus_click = 0;
$(".btn_plus").click(function () {
    if (btn_plus_click < 6) {
        $(this).parents(".row").nextAll("hr").before('<div class="div-search row">'
            + '<div class="form-group col-md-3">'
            + '<select class="form-control select2" style="width: 100%;">'
            + '<option selected="selected">无</option>'
            + '<option value="">ID</option>'
            + '<option value="">编码</option>'
            + '<option value="">名称</option>'
            + '<option value="">英文名称</option>'
            + '<option value="">创建人</option>'
            + '<option value="">更新人</option>'
            + '<option value="">描述</option>'
            + '</select>'
            + '</div>'
            + '<div class="form-group col-md-3">'
            + '<input type="text" class="form-control" placeholder="输入 ...">'
            + '</div>'
            + '<div>'
            + '<button type="button" class="btn_minus btn btn-default btn-flat" style="width: 36px;padding-left: 11px;padding-right: 11px;">'
            + '<i class="fa fa-minus"></i>'
            + '</div>'
            + '</div >');
        btn_plus_click++;
        $('.select2').select2();
    }
});

$("#box1-body").on("click", ".btn_minus", function () {
    $(this).parent().parent().remove();
    btn_plus_click--;
});

//*标签部分 *//
//标签菜单初始化
$.ajax({
    type: 'GET',
    url: "../label_api/label/type",
    // data: JSON.stringify(saveData),
    contentType: "application/json",
    dataType: "text",
    success: function (data, status) {
        var json = $.parseJSON(data);
        // console.log(json);
        var option_str = "";
        for (i = 0; i < json.length; i++) {
            option_str = option_str + '<option>' + json[i].label_classifications + '</option>'
        }
        $("#label").prepend('<div class="form-group col-md-3">'
            + '<label>标签分类</label>'
            + '<select class="form-control select2" style="width: 100%;">'
            + '<option selected="selected">无</option>'
            + option_str
            + '</select>'
            + '</div>');
        $('.select2').select2();
    },
    error: function () {
        console.log("ajax失败！");
    }
});

$("#label").on("select2:select", function (e) {
    //e的话就是一个对象 然后需要什么就“e.参数”形式进行获取
    var div_this = $(e.target).parent();
    if (div_this.hasClass("col-md-3")) {
        if (e.params.data.text != "无") {
            // var div_this = $(e.target).parent();
            // console.log($(e.target).parent());
            // console.log(e);
            $.ajax({
                type: 'POST',
                url: "../label_api/label/classification",
                data: JSON.stringify({ classification: e.params.data.text }),
                contentType: "application/json",
                dataType: "text",
                success: function (data, status) {
                    var json = $.parseJSON(data);
                    // console.log(json);
                    var option_str = "";
                    for (i = 0; i < json.length; i++) {
                        option_str = option_str + '<option value="' + json[i].label_id + '">' + json[i].label_name + '</option>'
                    }
                    div_this.next().replaceWith('<div class="form-group col-md-6">'
                        + '<label>标签</label>'
                        + '<select class="form-control select2" multiple="multiple" data-placeholder="&nbsp;&nbsp;选择一个标签" style="width: 100%;">'
                        + option_str
                        + '</select>'
                        + '</div>');
                    $('.select2').select2();
                },
                error: function () {
                    console.log("ajax失败！");
                }
            });
        }
        else {
            div_this.next().find("select").html("");
        }
    }
});

//*搜索按钮*//
$("#btn-search").click(function () {
    // console.log($("#catalog").children().find("select").select2('data')[0].text);
    // console.log($("#catalog").children().find("select").select2('data')[0].id);
    var search_all = { category_id: "", ID: "", code: "", name: "", en_name: "", create_person: "", update_person: "", description: "", label: [] };
    if ($("#catalog").children().find("select").length == 1) {
        if ($("#catalog").children().find("select").select2('data')[0].text == "全部") {
            search_all.category_id = "0";
        }
        else {
            search_all.category_id = $("#catalog").children().find("select").select2('data')[0].id;
        }
    } else if ($("#catalog").children().find("select").length > 1) {
        if ($("#catalog").children().find("select").eq(-1).select2('data')[0].text == "全部") {
            search_all.category_id = $("#catalog").children().find("select").eq(-2).select2('data')[0].id;
        }
        else {
            search_all.category_id = $("#catalog").children().find("select").eq(-1).select2('data')[0].id;
        }
    }

    $(".div-search").each(function () {
        // console.log($(this).find(select).select2('data')[0].text);
        switch ($(this).find("select").select2('data')[0].text) {
            case "ID":
                search_all.ID = $(this).find("input").val();
                break;
            case "编码":
                search_all.code = $(this).find("input").val();
                break;
            case "名称":
                search_all.name = $(this).find("input").val();
                break;
            case "英文名称":
                search_all.en_name = $(this).find("input").val();
                break;
            case "创建人":
                search_all.create_person = $(this).find("input").val();
                break;
            case "更新人":
                search_all.update_person = $(this).find("input").val();
                break;
            case "描述":
                search_all.description = $(this).find("input").val();
                break;
            default:
                break;
        }
    });

    $($("#label .col-md-6").find("select").select2('data')).each(function (i) {
        search_all.label[i] = $(this)[0].id;
        // search_all.label.push($(this)[0].id);
    });

    console.log(search_all);
    ajax_list("../label_api/resources/search_condition", search_all);

});

//查看区域鼠标悬停高亮
$(".invoice").on("mouseover", ".list-unstyled li", function () {
    //如果鼠标移到class为list的表格的tr上时，执行函数 ，给该行添加class  
    $(this).addClass("highlight");
});
$(".invoice").on("mouseout", ".list-unstyled li", function () {
    //当鼠标移出该行时执行函数  ,移除class  
    $(this).removeClass("highlight");
});

$(".list-unstyled").on("click", "p .label", function () {
    // console.log($(this).text());
    // console.log($(this).prop("id"));
    //$("[href]") 选取所有带有 href 属性的元素。
    var label = $(this);
    var model_id = $(this).parent().parent().find("a[id]").prop("id");
    $("#del-label .modal-body").text("确定要删除标签 " + $(this).text() + " 吗？");
    $("#del-label").modal();
    $("#del-label .btn-primary").unbind();
    $("#del-label .btn-primary").click(function () {
        console.log("确定");
        var tdata = { tableItems: [model_id], label: [label.prop("id")] };
        $.ajax({
            type: "DELETE",
            url: "../label_api/label_relation",
            dataType: "text",
            data: JSON.stringify(tdata),
            contentType: "application/json",
            success: function (data, status) {
                if ("1" == data) {
                    label.remove();
                    console.log("删除标签成功");
                }
            },
            error: function () {
                console.log("DELETE label_api/label_relation ajax失败！");
            }
        });
    });
});

$(".list-unstyled").on("click", "button", function () {
    var button = $(this);
    // console.log($(this).parent().parent().find("a[id]").prop("id"));
    $.ajax({
        type: 'GET',
        url: "../label_api/label/type",
        // data: JSON.stringify(saveData),
        contentType: "application/json",
        dataType: "text",
        success: function (data, status) {
            var json = $.parseJSON(data);
            // console.log(json);
            var option_str = "";
            for (i = 0; i < json.length; i++) {
                option_str = option_str + '<option>' + json[i].label_classifications + '</option>'
            }
            $("#add-body").html('<label>标签分类</label>'
                + '<select class="form-control select2" style="width: 100%;">'
                + '<option selected="selected">无</option>'
                + option_str
                + '</select>');
            $('.select2').select2();
        },
        error: function () {
            console.log("ajax失败！");
        }
    });

    $("#add-label").modal();
    $("#add-label .btn-primary").unbind();
    $("#add-label .btn-primary").click(function () {
        console.log("确定");
        var tdata = { tableItems: [], label: [] };
        var label_name = [];
        $($("#add-body").next().find("select").select2('data')).each(function (i) {
            tdata.label[i] = $(this)[0].id;
            label_name[i] = $(this)[0].text;
        });
        tdata.tableItems[0] = button.parent().parent().find("a[id]").prop("id");
        var count = tdata.tableItems.length * tdata.label.length;
        // console.log(tdata);
        $.ajax({
            type: 'POST',
            url: "../label_api/label_relation",
            data: JSON.stringify(tdata),
            dataType: "text",
            // async: false,
            contentType: "application/json",
            success: function (data, status) {
                if (count == data) {
                    var bstr = "";
                    // button.parent().find("span[id]").each(function(){
                    //     if($(this).prop("id")==tdata.label[i]);
                    // });
                    // var label2 = [];  //存放不重复的标签id
                    // var label_name2 = [];
                    // var j = 0;
                    var span = button.parent().find("span[id]");//存放含有id属性的span
                    for (var i = 0; i < tdata.label.length; i++) {
                        span.each(function () {
                            if ($(this).prop("id") == tdata.label[i]) {
                                // label2[j] = tdata.label[i];
                                // label_name2[j] = label_name[i];
                                // j++;
                                tdata.label.splice(i, 1);    //找到相同的就删除
                                label_name.splice(i, 1);
                            }
                        });
                    }
                    for (var i = 0; i < tdata.label.length; i++) {
                        bstr = bstr + '<span id="' + tdata.label[i] + '" class="label label-info">' + label_name[i] + '</span> ';
                    }

                    button.before(bstr);
                    // <span id="3264d7ca-dcdd-4bf2-a0ac-a7d7dc795168" class="label label-info">测试标签1</span>
                    console.log("添加标签成功");
                }
                else
                    console.log("%c添加标签关系数据库表出错！", "color:red");
            },
            error: function () {
                console.log("POST label_api/label_relation ajax失败！");
            }
        });
    });
});

$("#add-body").on("select2:select", function (e) {
    //e的话就是一个对象 然后需要什么就“e.参数”形式进行获取
    var div_this = $(e.target).parent();
    // console.log(e.params);
    if (e.params.data.text != "无") {
        // var div_this = $(e.target).parent();
        // console.log($(e.target).parent());
        // console.log(e);
        $.ajax({
            type: 'POST',
            url: "../label_api/label/classification",
            data: JSON.stringify({ classification: e.params.data.text }),
            contentType: "application/json",
            dataType: "text",
            success: function (data, status) {
                var json = $.parseJSON(data);
                // console.log(json);
                var option_str = "";
                for (i = 0; i < json.length; i++) {
                    option_str = option_str + '<option value="' + json[i].label_id + '">' + json[i].label_name + '</option>'
                }
                // console.log(div_this.next());
                div_this.next().html('<label>标签</label>'
                    + '<select class="form-control select2" multiple="multiple" data-placeholder="&nbsp;&nbsp;选择一个标签" style="width: 100%;">'
                    + option_str
                    + '</select>');
                $('.select2').select2();
            },
            error: function () {
                console.log("ajax失败！");
            }
        });
    }
    else {
        div_this.next().find("select").html("");
    }
});

//模态框2复位
$('#add-label').on('hidden.bs.modal', function () {
    $("#add-body").next().html('<label>标签</label>'
        + '<select class="form-control select2" multiple="multiple" data-placeholder="&nbsp;&nbsp;选择一个标签" style="width: 100%;">'
        + '</select>');
    $('.select2').select2();
});


//申请授权弹出框
$(".list-unstyled").on("click", "p a[style='color:#357ca5']", function () {
    $("#valid").val("");
    $("#reason").val("");
    $("#request").modal();

});

//点击模型名跳转到详情页面
$(".list-unstyled").on("click", "p a[id]", function () {
    // console.log($(this).prop("id"));
    url = "sub_info_model.html?model_id=" + $(this).prop("id");
    window.open(url, "_blank");
});