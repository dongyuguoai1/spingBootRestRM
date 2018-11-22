var table1 = $("#table1").DataTable({
    // "ajax": {
    // "url": ""
    // "contentType": "application/json",
    // "type": "POST",
    // "data": function (d) {
    //     return JSON.stringify(d);
    // }
    // },
    "data": [],
    // "ajax": "test1.json",
    // "columns": [{ "data": "number", "orderable": false, "width": "100px", "searchable": false }],
    "columns": [
        {
            "data": null,
            "title": '<input id="check_all" type="checkbox" name="table_check" />',
        },
        {
            "data": "resType",
            "title": "资源类型"
        },
        {
            "data": "code",
            "title": "表名"
        },
        {
            "data": "name",
            "title": "名称"
        },
        {
            "data": "createPerson",
            "title": "创建人"
        },
        {
            "data": "updateTime",
            "title": "更新时间"
        },
        {
            "data": "description",
            "title": "描述"
        },
        {
            "data": null,
            "title": "标签"
        }
    ],
    columnDefs: [{
        //指定第一列，从0开始，0表示第一列，1表示第二列……
        "targets": 0,
        "width": "18px",
        // "defaultContent": '<input type="checkbox" class="minimal" />',
        render: function (data, type, row, meta) {
            // console.log(data);
            return '<input type="checkbox" name="table_check" value="' + row.id + '" />';
        }
    },
    {
        "targets": -1,
        render: function (data, type, row, meta) {
            var label_ui = "";
            var temp = "";
            for (var i = 0; i < row.labelList.length; i++) {
                temp = '<span style="padding-bottom:1px" class="label label-info">' + row.labelList[i].label_name + '</span> '
                label_ui = label_ui + temp;
            }
            label_ui = '<p>' + label_ui + '</p>'

            return label_ui;
        }
    },
    {
        "targets": 0,
        "searchable": false,
        "orderable": false,   //设置第一列和最后一列不可排序、不可搜索
    }],
    "language": {
        "url": "DataTables.json"
    },
    "scrollX": true,
    "autoWidth": false,
    "order": [[5, 'asc']],
    "drawCallback": function (settings) {     //initComplete也能实现修改checkbox样式为iCheck的功能
        $("[name=table_check]:checkbox").iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue'
        });
        $('#check_all').on('ifChecked ifUnchecked', function (event) {
            if (event.type == 'ifChecked') {
                $("[name=table_check]:checkbox").iCheck('check');
            } else {
                $("[name=table_check]:checkbox").iCheck('uncheck');
            }
        });
        // console.log("drawCallback");
    }
});

//表格翻页消息
$('#table1').on('page.dt', function () {
    $('#check_all').iCheck('uncheck');
    $("[name=table_check]:checkbox").iCheck('uncheck');
    // console.log("page.dt");
}).DataTable();

//浏览器窗口大小调整后，重绘表格
window.onresize = function () {
    table1.draw("page");
};

function buildTree(data) {
    var json = $.parseJSON(data);
    var json_out2_arr = new Array();
    json_out2_arr[0] = builtTreeJSON(json);
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
    type: 'GET',
    url: "../label_api/treelist",
    // data: data,
    // async: false,
    success: function (post_data, status) {
        $("#tree").treeview({
            data: buildTree(post_data),
            // data: test,
            onNodeSelected: function (event, data) {
                console.log(data.id);
                table1.ajax.url("../label_api/resources/" + data.id).load();
            },
            // levels: 5,
            multiSelect: false,
            showTags: true
        });
    },
    dataType: "text"
});

$("#btn_add").click(
    function () {
        var model_array = new Array();
        var i0 = 0;
        $("#table1 tbody").find("tr").each(function (i, e) {
            if ($(this).find("td").eq(0).find("input").is(':checked')) {
                model_array[i0] = $(this).find("td").eq(0).find("input").val();
                i0++;
            }
        });

        var label_array = new Array();
        $(".select-result dd").find("span").each(function (i) {
            label_array[i] = $(this).text();
        });

        var tdata = { tableItems: model_array, label: label_array };
        var strdata = JSON.stringify(tdata);
        var count = model_array.length * label_array.length;

        $.ajax({
            type: 'POST',
            url: "../label_api/label_relation",
            data: strdata,
            dataType: "text",
            // async: false,
            contentType: "application/json",
            success: function (data, status) {
                // console.log(data);
                // console.log(count);
                if (count == data)
                    console.log("添加标签成功");
                else
                    console.log("%c添加标签关系数据库表出错！", "color:red");
                table1.ajax.reload(null, false);
            },
            error: function () {
                console.log("POST label_api/label_relation ajax失败！");
            }
        });
    });

$("#btn_delete").click(
    function () {
        var model_array = new Array();
        var i0 = 0;
        $("#table1 tbody").find("tr").each(function (i, e) {
            if ($(this).find("td").eq(0).find("input").is(':checked')) {
                model_array[i0] = $(this).find("td").eq(0).find("input").val();
                i0++;
            }
        });

        var label_array = new Array();
        $(".select-result dd").find("span").each(function (i) {
            label_array[i] = $(this).text();
        });

        var tdata = { tableItems: model_array, label: label_array };
        var strdata = JSON.stringify(tdata);
        var count = model_array.length * label_array.length;

        $.ajax({
            type: "DELETE",
            url: "../label_api/label_relation",
            dataType: "text",
            data: strdata,
            contentType: "application/json",
            success: function (data, status) {
                // console.log(data);
                // console.log(count);
                if (count == data)
                    console.log("删除标签成功");
                else {
                    console.log("%c计划删除" + count + "条，" + "实际删除" + data + "条。", "color:red");
                }
                table1.ajax.reload(null, false);
            },
            error: function () {
                console.log("DELETE label_api/label_relation ajax失败！");
            }
        });
    });

$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue'
});

$("#btn_add").show();
$("#btn_delete").hide();

$("#checkbox1").on("ifChanged", function () {
    if ($(this).is(":checked")) {
        $("#alert-info1").remove();
        $(".col-sm-9.col-md-9.column").prepend('<div id="alert-info1" class="alert alert-info alert-dismissible">'
            + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
            + '<h4>'
            + '<i class="icon fa fa-info"></i> 删除模式</h4>'
            + '当前为<b>“删除模式”</b>模式。通过目录或搜索找到资源，选择资源并选择标签，点击“删除标签”按钮将会删除该资源上的所选标签。'
            + '</div>');
        $("#btn_add").hide();
        $("#btn_delete").show();
    } else {
        $("#alert-info1").remove();
        $(".col-sm-9.col-md-9.column").prepend('<div id="alert-info1" class="alert alert-info alert-dismissible">'
            + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
            + '<h4>'
            + '<i class="icon fa fa-info"></i> 标注模式</h4>'
            + '当前为<b>“标签标注”</b>模式。通过目录或搜索找到资源，选择资源并选择标签，点击“添加标签”按钮将会使用选择的标签标注该资源。'
            + '</div>');
        $("#btn_add").show();
        $("#btn_delete").hide();

    }
});

//提取url中的查询参数
// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null)
//         return unescape(decodeURI(r[2]));
//     return null;
// }

//立即执行函数：从url里面取值然后执行点击按钮操作
// (function () {
//     var mq = decodeURI(GetQueryString("mapquery"));
//     $("#" + mq).click();
//     var test2 = 0;
// })();

//等于$(document).ready(function () {});
// $(function () {
// });