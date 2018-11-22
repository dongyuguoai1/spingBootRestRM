var table1 = $("#table1").DataTable({
    "ajax": {
        "url": "../label_api/label/all",
        "contentType": "application/json",
        "type": "GET",
        "dataSrc": function (json) {  //用来修改服务器传过来的数据
            // console.log(json);
            return json.data;
        }
        // "data": function (d) {
        //     return JSON.stringify(d);
    },
    // "columns": [{ "data": "number", "orderable": false, "width": "100px", "searchable": false }],
    // "data": [
    //     {
    //         "label_id": 11,
    //         "label_name": "label1",
    //         "label_classifications": "System Architect",
    //         "label_description": "$3,120",
    //         "create_person": "2011/04/25",
    //         "create_time": "Edinburgh",
    //         "update_time": 5421,
    //         "111": "a"
    //     },
    //     {
    //         "label_id": 12,
    //         "label_name": "Garrett Winters",
    //         "label_classifications": "Director",
    //         "label_description": "5300",
    //         "create_person": "2011/07/25",
    //         "create_time": "Edinburgh",
    //         "update_time": "8422",
    //         "button111": "a"
    //     },
    // ],
    "columns": [            //注意每一列的数据类型必须前后一致，第一次传入的是字符串，后面也必须是字符串
        {
            "data": "label_id",
            "title": "标签ID"
        },
        {
            "data": "label_name",
            "title": "标签名"
        },
        {
            "data": "label_classifications",
            "title": "标签类别"
        },
        {
            "data": "label_description",
            "title": "标签描述"
        },
        {
            "data": "create_person",
            "title": "创建人"
        },
        {
            "data": "create_time",
            "title": "创建时间"
        },
        {
            "data": "update_time",
            "title": "更新时间"
        },
        {
            "data": null,
            "title": "操作"
        }
    ],
    columnDefs: [
        {
            "targets": -1,
            render: function (data, type, row, meta) {
                var label_ui;
                if (table1_new1_click) {
                    label_ui = row.button;
                    table1_new1_click = false;
                }
                else {
                    label_ui = '<button type="button" class="btn btn-primary btn-xs">'
                        + '<i class="fa fa-pencil"></i> 修改</button>'
                        + ' <button id="data_delete" type="button" class="btn btn-danger btn-xs">'
                        + '<i class="fa fa-close"></i> 删除</button>'
                }
                return label_ui;
            }
        },
        {
            "targets": -1,
            "searchable": false,
            "orderable": false,   //设置最后一列不可排序、不可搜索
        }],
    "language": {
        "url": "DataTables.json"
    },
    "scrollX": true,
    "autoWidth": false,
    "order": [[6, 'desc']]
});

//浏览器窗口大小调整后，重绘表格
window.onresize = function () {
    table1.draw("page");
};

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // var myDate = new Date();
    // var uuid = myDate.getTime() + parseInt(s.join(""),16);
    // console.log(s.join(""));
    // console.log(myDate.getTime());
    // console.log(parseInt(s.join(""),16));
    // return uuid.toString(16);
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    // uuid = uuid.replace(/-/g, "");
    // uuid = uuid.replace(new RegExp("-", 'g'), "");  //等于uuid.replace(/-/g, "");
    return uuid;
}

var table1_new1_click = false;
$("#new1").click(
    function () {
        table1_new1_click = true;
        table1.row.add({
            "label_id": uuid(),
            "label_name": '<input type="text" name="label_name" value="" />',         // placeholder="提示文字"
            "label_classifications": '<input type="text" name="label_classifications" value="" />',
            "label_description": '<input type="text" name="label_description" value="" />',
            "create_person": '<input type="text" name="create_person" value="" />',
            "create_time": '保存时自动生成',
            "update_time": '保存时自动生成',
            "button": '<button type="button" class="btn btn-success btn-xs">'
                + '<i class="fa fa-save"></i> 保存'
                + '</button>'
                + ' <button id="new_delete" type="button" class="btn btn-danger btn-xs">'
                + '<i class="fa fa-close"></i> 删除'
                + '</button>'
        }).draw();
    });

$('#table1 tbody').on('click', '#data_delete', function () {
    var td_label_id;
    $(this).parents('td').siblings().each(function (i, e) {
        if (i == 0) {
            td_label_id = $(this).text();
        }
    });

    $(this).parents('tr').prop("id", td_label_id);  //将label_id存到tr行的id属性里面
    $.ajax({
        type: "DELETE",
        url: "../label_api/label/" + td_label_id,
        dataType: "text",
        contentType: "application/json",
        success: function (data, status) {
            var json = $.parseJSON(data);
            if (1 == json.status) {
                table1.row($("#" + json.label_id)).remove().draw("page");

                //更新vue的数据
                $.ajax({
                    type: "GET",
                    url: "../label_api/label/all_select",
                    dataType: "text",
                    contentType: "application/json",
                    success: function (data, status) {
                        var json = $.parseJSON(data);
                        vm.freeTag = json;
                        // console.log(vm.freeTag);
                    },
                    error: function () {
                        vm.freeTag = [];
                    }
                });

                console.log("已有标签行删除");
            }
            else {
                console.log("%c已有标签行删除失败", "color:red");
            }
            // table1.ajax.reload();
        },
        error: function () {
            console.log("DELETE label_api/label ajax失败！");
        }
    });
});

//保存之前的删除按钮都不会删除数据库数据的，只需要删除界面上的一行即可
$('#table1 tbody').on('click', '#new_delete', function () {
    table1.row($(this).parents('tr')).remove().draw("page");
    console.log("新建标签行删除");
});

//修改按钮事件
$('#table1 tbody').on('click', '.btn-primary', function () {
    $(this).parents('td').siblings().each(function (i, e) {
        // console.log($(this).text());
        if (i != 0 && i != 5 && i != 6) {
            $(this).html('<input type="text" name="default_input_' + i + '" value="'
                + $(this).text()
                + '" />');
        }
        table1.draw('page');
    });
    $(this).parent().html('<button type="button" class="btn btn-success btn-xs">'
        + '<i class="fa fa-save"></i> 保存'
        + '</button>'
        + ' <button type="button" class="btn btn-danger btn-xs" disabled="disabled">'
        + '<i class="fa fa-close"></i> 删除'
        + '</button>');
});

//保存按钮事件（ajax写入数据之后可以不用刷新数据源）
$('#table1 tbody').on('click', '.btn-success', function () {

    //检查第1，2列必填字段是否为空
    var null_test = 1;
    $(this).parents('td').siblings().each(function (i, e) {
        // console.log($(this).children().val());
        if (i == 1 || i == 2) {
            null_test = $(this).children().val();
            if (null_test == null || null_test == undefined || null_test == "") {
                $(this).children().focus();
                $(this).children().prop("placeholder", "该字段不能为空！")
                return false;
            }
        }
    });
    if (null_test == null || null_test == undefined || null_test == "") {
        return false;
    }

    //取前5列的值存入json
    var saveData = { label_id: "", label_name: "", label_classifications: "", label_description: "", create_person: "" };
    var td_array = new Array();
    $(this).parents('td').siblings().each(function (i, e) {
        if (i != 5 && i != 6) {
            td_array[i] = $(this).children().val();
        }
        if (i == 0) {
            td_array[i] = $(this).text();
        }
    });
    $(this).parents('tr').prop("id", td_array[0]);  //将label_id存到tr行的id属性里面
    saveData.label_id = td_array[0];
    saveData.label_name = td_array[1];
    saveData.label_classifications = td_array[2];
    saveData.label_description = td_array[3];
    saveData.create_person = td_array[4];
    // console.log(saveData);
    $.ajax({
        type: 'POST',
        url: "../label_api/label",
        data: JSON.stringify(saveData),
        dataType: "text",
        contentType: "application/json",
        success: function (data, status) {
            var json = $.parseJSON(data);
            if (json.status > 0) {
                $("#" + json.label_id).children().each(function (i, e) {
                    if (i != 0 && i != 5 && i != 6) {
                        $(this).html($(this).children().val());
                        // td_array[i] = $(this).text();
                    }
                    // if (i == 7) {
                    //     $(this).html('<button type="button" class="btn btn-primary btn-xs">'
                    //         + '<i class="fa fa-pencil"></i> 修改'
                    //         + '</button>'
                    //         + ' <button id="data_delete" type="button" class="btn btn-danger btn-xs">'      //保存之后的删除按钮都是会删除数据库数据的
                    //         + '<i class="fa fa-close"></i> 删除'
                    //         + '</button>');
                    // }
                    // table1.ajax.reload(false);
                });

                //更新vue的数据
                $.ajax({
                    type: "GET",
                    url: "../label_api/label/all_select",
                    dataType: "text",
                    contentType: "application/json",
                    success: function (data, status) {
                        var json = $.parseJSON(data);
                        vm.freeTag = json;
                        // console.log(vm.freeTag);
                    },
                    error: function () {
                        vm.freeTag = [];
                    }
                });

                table1.ajax.reload(null, false);
            }
            else {
                console.log("修改标签数据库表出错！");
                $("#box2-body").prepend('<div id="alert-danger1" class="alert alert-danger alert-dismissible">'
                    + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                    + '<h4>'
                    + '<i class="icon fa fa-ban"></i> 错误！</h4>'
                    + '修改标签数据库表出错！'
                    + '</div>');
                $("#alert-danger1").fadeOut(5000, function () {
                    $("#alert-danger1").remove();
                });
            }
        },
        error: function () {
            console.log("POST label_api/label/ ajax失败！");
            $("#box2-body").prepend('<div id="alert-danger2" class="alert alert-danger alert-dismissible">'
                + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                + '<h4>'
                + '<i class="icon fa fa-ban"></i> 错误！</h4>'
                + 'POST label_api/label/ ajax失败！'
                + '</div>');
            $("#alert-danger2").fadeOut(5000, function () {
                $("#alert-danger2").remove();
            });
        }
    });

});