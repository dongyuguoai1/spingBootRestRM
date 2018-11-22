

//申请记录tab内容
$('#tab_sqjl').off("click").on("click", function () {
    //alert(1);
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: "http://localhost:18080/ywsjglprj/apply/list",
        timeout: 3000,
        success: function (data, status) {
            dwspDT = "#dt_sqjl";
            var nodeDT = data;
            var tables = creatTable(dwspDT, nodeDT);
            // tables.draw();
            // console.log(tables);
        }
    });

});

//我已处理tab内容
$('#tab_wycl').off("click").on("click", function () {
    //alert(1);
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: "http://localhost:18080/ywsjglprj/apply/processedlist",
        timeout: 3000,
        success: function (data, status) {
            dwspDT = "#dt_wycl";
            var nodeDT = data;
            creatTable(dwspDT, nodeDT);
        }
    });

});

//收回权限tab内容
$('#tab_shqx').off("click").on("click", function () {
    //alert(1);
    // $.ajax({
    //     async: false,
    //     type: "GET",
    //     dataType: "json",
    //     url: "http://localhost:18080/ywsjglprj/process/list",
    //     timeout: 3000,
    //     success: function (data, status) {
    //         dwspDT = "#dt_shqx";
    //         var nodeDT = data.data;
    //         creatTable(dwspDT, nodeDT);
    //     }
    // });

});

//创建不带操作的DT


//创建不带操作的DT
function creatTable(DTname, mylist) {
    //将创建的表格存放到tables变量中
    var tables = $(DTname).DataTable({
        //控制分页、搜索、每页显示数量、显示信息等四个插件的dom

        //数据传入
        "autoWidth": true,
        "data": mylist,
        "lengthMenu": [15, 25, 50, 75, 100],
        //允许重建
        "destroy": true,
        // "scrollX": true,
        //设置列数据
        "columns": [
            { "data": "userid" },
            { "data": "createtime" },
            { "data": "resourceid" },
            { "data": "resourcename" },
            {"data": "resourcetype"},
            { "data": "state" },
            { "data": "processid" },
            

            // { "data": "createPerson" },
            // { "data": "updateTime" },
            // { "data": "updatePerson" },
            // { "data": "description" },
            // { "data": "bmid" },
        ],
        //设置排序
        "order": [[1, 'asc']],
        //设置语言
        "language": {
            "lengthMenu": "每页_MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "search": "搜索：",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页"
            }
        },
    });//表格tables创建完毕
    return tables;
}

//创建带操作的DT
function creatTable_Op(DTname, mylist) {
    //将创建的表格存放到tables变量中
    var tables = $(DTname).DataTable({
        //控制分页、搜索、每页显示数量、显示信息等四个插件的dom

        //数据传入
        "data": mylist,
        "lengthMenu": [15, 25, 50, 75, 100],
        //允许重建
        "destroy": true,
        // "scrollX": true,
        //设置列数据
        "columns": [
            // { "data": "code" },
            // { "data": "name" },
            // { "data": "enName" },
            // { "data": "createTime" },
            // { "data": "createPerson" },
            // { "data": "updateTime" },
            // { "data": "updatePerson" },
            // { "data": "description" },
            // { "data": "bmid" },
            { "data": "name" },
            { "data": "createTime" },
            { "data": "assignee" },
            { "data": "table" },
            {
                "data": null,
                // "title": "操作",
                "render": function (data, type, row, meta) {
                    return data = '<button type="button"  style = "margin:0px;display:inline" class="btn bt_pass btn-primary btn-xs" id="dt_pass"><i class="fa fa-check"></i> 通过 </button>' +
                        ' <button type="button" style="display:inline" class="btn bt_unpass btn-danger btn-xs"  id="dt_unpass"><i class="fa fa-times"></i> 拒绝 </button>';
                }
            },
        ],
        //设置排序
        "order": [[1, 'asc']],
        //设置语言
        "language": {
            "lengthMenu": "每页_MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "search": "搜索：",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页"
            }
        },
    });//表格tables创建完毕
    return tables;
}


//执行特定操作后，刷新表格
function UpdateDT() {
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: "http://localhost:18080/ywsjglprj/process/list",
        timeout: 3000,
        success: function (data, status) {
            dwspDT = "#dt_dwsp";
            var nodeDT = data;
            creatTable_Op(dwspDT, nodeDT);
        }
    });
}


//“通过”操作，调用服务器特定接口
$("#dt_dwsp").off("click", ".bt_pass").on("click", ".bt_pass", function () {
    var id = $('#dt_dwsp').DataTable().row($(this).parents().parents("tr")).data().id;
    console.log(id);
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: "http://localhost:18080/ywsjglprj/process/pass/"+id,
        timeout: 3000,
        success: function (data, status) {
            //请求执行成功后，刷新表格
            UpdateDT();
        }
    });

});

//“拒绝”操作，调用服务器特定接口
$("#dt_dwsp").off("click", ".bt_unpass").on("click", ".bt_unpass", function () {
    var id = $('#dt_dwsp').DataTable().row($(this).parents().parents("tr")).data().id;
    console.log(id);
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: "http://localhost:18080/ywsjglprj/process/unpass/"+id,
        timeout: 3000,
        success: function (data, status) {
            //请求执行成功后，刷新表格
            UpdateDT();
        }
    });
});

//初始化网页
$(document).ready(function () {

    UpdateDT();


});

