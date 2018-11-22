$(document).ready(function(){
    
    
    // var data =null;
    table1Update();
    table2Update();
    
   
});



//搜索的执行方法
// document.getElementById("btn_search").onclick = function () {
//     var moduleCode = $("#input_search").val();

//     newDatatable();
// }

// var table2DataJsonText = "";
// function newData2() {
//     var table2DataJsonArray = new Array();
//     //var table2DataJson = {};


//     var ajax1 = $.ajax({

//         type: "GET",
//         url: "http://localhost:8080/ywsjglprj/model/getAllModelInfoInner",
//         contentType: "application/json;charset=UTF-8",
//         dataType: "json",
//         async: false,
//         success: function (json) {
//             if (json.resultCode == "RESULT_SUCCESS") {
//                 var data = new Array();
//                 // for (var i = 0, ien = json.data.length, j = 0; i < ien; i++) {
//                 //     // console.log(json.data[i].registerStatus);
//                 //     if (json.data[i].registerStatus != "未注册") {

//                 //         data[j] = json.data[i];
//                 //         j++;
//                 //     }
//                 //     //console.log(data);

//                 // }
//                 table2DataJsonArray = json.data;
//             }
//         },

//         error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题

//         }
//     });
//第一个表的创建方法
function table1Update(){
    var table1 = $('#example1').DataTable({
        language: {
            "url": "./DataTables.json"
        },
        // searching: false,
        // ordering:false,
        // scrollX: 400,
        destroy: true,
        "autowidth": true,
        //  "scrollX": true,
        "lengthMenu": [ 15, 25, 50, 75, 100 ],
        "order": [[3, "desc"]],
        "ajax": {
            "url": "http://localhost:8080/ywsjglprj/model/getAllModelInfoInner",
            // "dataSrc": function (json) {
    
            //     var data = new Array();
            //     for (var i = 0, ien = json.data.length, j = 0; i < ien; i++) {
            //         // console.log(json.data[i].registerStatus);
            //         if (json.data[i].registerStatus == "未注册") {
    
            //             data[j] = json.data[i];
            //             j++;
            //         }
    
            //     }
            //     return data;
            // }
        },
        "columns": [
            { "data": "code" },
            { "data": "name" },
            { "data": "createPerson" },
            { "data": "createTime" },
            { "data": "updateTime" },
            { "data": "registerStatus" },
            {  "data": "" }
        ],
        "columnDefs": [{
            "targets": 6,
            "data": null,
            "render": function (data, type, row) {
                var id = '"' + row.id + '"';
                var registerStatus = row.registerStatus;
                if (registerStatus == "已注册") {
                    var html = "<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#editModal' onclick='editModule(" + id + "," + '"' + registerStatus + '"' + ")'><i class='fa fa-pencil'></i> 编辑</button>"
                    html += "&nbsp;<button type='button' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#modal_enter' onclick='deleteThisRowPapser(" + id + "," + '"' + registerStatus + '"' + ")'> <i class='fa fa-close'></i> 删除</button>"
                    html += "&nbsp;<button type='button' class='btn btn-success btn-xs'data-toggle='modal' data-target='#cataModal' onclick='begin_catalog(" + id + ")' disabled='disabled'><i class='fa fa-gears'></i> 发起注册</a>"
                    return html;
                } else if (registerStatus == "未注册") {
                    var html = "<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#editModal' onclick='editModule(" + id + "," + '"' + registerStatus + '"' + ")'><i class='fa fa-pencil'></i> 编辑</button>"
                    html += "&nbsp;<button type='button' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#modal_enter' onclick='deleteThisRowPapser(" + id + "," + '"' + registerStatus + '"' + ")'> <i class='fa fa-close'></i> 删除</button>"
                    html += "&nbsp;<button type='button' class='btn btn-success btn-xs'data-toggle='modal' data-target='#cataModal' onclick='begin_catalog(" + id + ")'><i class='fa fa-gears'></i> 发起注册</a>"
                    return html;
                } else {
                    var html = "<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#editModal' onclick='editModule(" + id + "," + '"' + registerStatus + '"' + ")' disabled='disabled'><i class='fa fa-pencil'></i> 编辑</button>"
                    html += "&nbsp;<button type='button' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#modal_enter' onclick='deleteThisRowPapser(" + id + "," + '"' + registerStatus + '"' + ")' disabled='disabled'> <i class='fa fa-close'></i> 删除</button>"
                    html += "&nbsp;<button type='button' class='btn btn-success btn-xs'data-toggle='modal' data-target='#cataModal' onclick='begin_catalog(" + id + ")' disabled='disabled'><i class='fa fa-gears'></i> 发起注册</a>"
                    return html;
                }
            }
        }]
    });
    
    
};
//第二个datatable的创建方法
function table2Update(){
   
    var ajax2 = $.ajax({
        type: "POST",
        url: "http://localhost:8080/ywsjglprj/audit/getRegisterInfoByUser",
        contentType: "application/json;charset=UTF-8",
        data: "{ \"userName\": \"admin\" }",
        dataType: "json",
        // async: false,
        success: function (json) {
            if (json.resultCode == "RESULT_SUCCESS") {
                var data = new Array();
                for (var j = 0; j < json.data.length; j++) {
                //     if(json.data[j].resourceContent==null||json.data[j].resourceContent==""){
                //         for (var i = 0; i < table2DataJsonArray.length; i++) {

                //             if (json.data[j].resourceId == table2DataJsonArray[i].id) {
                //                 json.data[j].code = table2DataJsonArray[i].code;
                //                 json.data[j].name = table2DataJsonArray[i].name;
                //                 // json.data[j].createPerson = table2DataJsonArray[i].createPerson;
                //                 // json.data[j].registerStatus = table2DataJsonArray[i].registerStatus;


                //             }
                //         }
                //     }else{
                        var content=JSON.parse(json.data[j].resourceContent);
                        json.data[j].code = content.code;
                        // json.data[j].name = content.name;
                        // json.data[j].createPerson = content.createPerson;
                        // json.data[j].registerStatus = "已注册";
                    }

                // }

                // var table2DataJsonText = JSON.stringify(table2DataJsonArray);
                //console.log(table2DataJsonArray);

                data = json.data;
                // table2.clear();
                // table2.rows.add(data);
                // table2.draw();
                
                
            }
            var table2 = $('#example2').DataTable({
                
                language: {
                    "url": "./DataTables.json"
                },
                // searching: false,
                // ordering:false,
                // scrollX: 400,
                // "scrollX": true,
                "autowidth": true,
                
                destroy: true,
                "lengthMenu": [ 15, 25, 50, 75, 100 ],
                "order": [[2, "desc"]],
                "data":data,
                // "ajax": {
            
            
                //     "url": "http://localhost:8080/ywsjglprj/audit/getRegisterInfoByUser",
                //     "type":"POST",
                //      "contentType": "application/json;charset=UTF-8",
                //     "data":function ( userName ) {
                //         var userName =  { "userName": "admin" };
                //         return JSON.stringify(userName);
                //       }
                  //  "dataType": "json",//服务器返回的数据类型 可选XML ,Json jsonp script htmltext等  
                    
                    // "dataSrc": function (json) {
            
                    //     var data = new Array();
                    //     for (var i = 0, ien = json.data.length, j = 0; i < ien; i++) {
                    //         // console.log(json.data[i].registerStatus);
                            
            
                    //             data[j] = json.data[i];
                                
                            
            
                    //     }
                    //     return data;
                    // }
                // },
                
                
                "columns": [
                    {data: "code",},
                    // { data: "name" },
                    // { data: "createPerson" },
                    { data: "requestPerson" },
                    { data: "requestTime" },
                    { data: "" },
                    { data: "auditPerson" },
                    // { data: "registerStatus" },
                    { data: "" }
                ],
                "columnDefs": [
                    {
                        "targets": 3,
                        "data": null,
                        "render": function (data, type, row) {
                            var resourceId = '"' + row.resourceId + '"';
                            var type = row.type;
                            var auditResult = row.auditResult;
                            if (auditResult == "审核通过") {
                                var html = "<span class='label label-primary'>" + type + "</span>"
                                html += "&nbsp;<span class='label label-success'>审核通过</span>"
                                return html;
                            } else if (auditResult == "审核拒绝") {
                                var html = "<span class='label label-primary'>" + type + "</span>"
                                html += "&nbsp;<span class='label label-danger'>审核拒绝</span>"
                                return html;
                            } else {
                                var html = "<span class='label label-primary'>" + type + "</span>"
                                html += "&nbsp;<span class='label label-warning'>等待审核</span>"
                                return html;
                            }
            
                        }
                    },
                    {
                        "targets": 5,
                        "data": null,
                        "render": function (data, type, row) {
                            var resourceId = '"' + row.resourceId + '"';
                            var id = '"' + row.id + '"';
                            var auditResult = row.auditResult;
                            // if (row.resourceContent == null || row.resourceContent == "") {
                            //     var rowJSON = null;
                            // } else {
                                var rowJSON = row.resourceContent;
                            // }
            
                            var rowMessage = '"' + row.auditMessage + '"';
                            if (auditResult == "审核通过" || auditResult == "审核拒绝") {
                            //     if (row.type == "新增") {
                            //         var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkAddModal(" + resourceId + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"
            
                            //     } else {
                                    var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkDorUmodel(" + resourceId + "," + rowJSON + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"
                            //     }
                                html += "&nbsp;<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#modal_check' onclick='begin_check(" + id + ")' disabled='disabled'><i class='fa fa-gears'></i> 审核</button>"
                                return html;
                            // } else {
                            //     if (row.type == "新增") {
                            //         var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkAddModal(" + resourceId + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"
            
                                } else {
                                    var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkDorUmodel(" + resourceId + "," + rowJSON + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"
                                // }
                                html += "&nbsp;<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#modal_check' onclick='begin_check(" + id + ")'><i class='fa fa-gears'></i> 审核</button>"
                                return html;
                            }
            
                        }
                    }
            
                ]
            });
            
        },

        error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题

        }
    });

}
//     var table2 = $('#example2').DataTable({
//         language: {
//             "url": "./datatables_language.json"
//         },
//         // searching: false,
//         // ordering:false,
//         // scrollX: 400,
//         destroy: true,
//         data: data,
//         "order": [[ 3, "desc" ]],
//         "columns": [
//             { data: "code" },
//             // { data: "name" },
//             // { data: "createPerson" },
//             { data: "requestPerson" },
//             { data: "requestTime" },
//             { data: "" },
//             { data: "auditPerson" },
//             // { data: "registerStatus" },
//             { data: "" }
//         ],
//         "columnDefs": [
//             {
//                 "targets": 3,
//                 "data": null,
//                 "render": function (data, type, row) {
//                     var resourceId = '"' + row.resourceId + '"';
//                     var type = row.type;
//                     var auditResult = row.auditResult;
//                     if (auditResult == "审核通过") {
//                         var html = "<span class='label label-primary'>"+type+"</span>"
//                         html += "&nbsp;<span class='label label-success'>审核通过</span>"
//                         return html;
//                     } else if (auditResult == "审核拒绝") {
//                         var html = "<span class='label label-primary'>"+type+"</span>"
//                         html += "&nbsp;<span class='label label-danger'>审核拒绝</span>"
//                         return html;
//                     } else {
//                         var html = "<span class='label label-primary'>"+type+"</span>"
//                         html += "&nbsp;<span class='label label-warning'>等待审核</span>"
//                         return html;
//                     }

//                 }
//             }, {
//                 "targets": 5,
//                 "data": null,
//                 "render": function (data, type, row) {
//                     var resourceId = '"' + row.resourceId + '"';
//                     var id = '"' + row.id + '"';
//                     var auditResult = row.auditResult;
//                     if(row.resourceContent==null||row.resourceContent==""){
//                         var rowJSON=null;
//                     }else{
//                         var rowJSON= row.resourceContent;
//                     }

//                     var rowMessage='"' + row.auditMessage+ '"';
//                     if (auditResult == "审核通过"||auditResult == "审核拒绝") {
//                         if(row.type=="新增"){
//                             var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkAddModal(" + resourceId + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"

//                         }else{
//                             var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkDorUmodel(" + resourceId + "," + rowJSON + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"
//                         }
//                         html += "&nbsp;<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#modal_check' onclick='begin_check(" + id + ")' disabled='disabled'><i class='fa fa-gears'></i> 审核</button>"
//                         return html;
//                     } else {
//                         if(row.type=="新增"){
//                             var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkAddModal(" + resourceId + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"

//                         }else{
//                             var html = "<button type='button' class='btn btn-info btn-xs'data-toggle='modal' data-target='#checkModal' onclick='checkDorUmodel(" + resourceId + "," + rowJSON + "," + rowMessage + ")'><i class='fa fa-eye'></i> 查看</button>"
//                         }
//                         html += "&nbsp;<button type='button' class='btn btn-primary btn-xs'data-toggle='modal' data-target='#modal_check' onclick='begin_check(" + id + ")'><i class='fa fa-gears'></i> 审核</button>"
//                         return html;
//                     }

//                 }
//             }

//         ]
//     });


//     // var table2DataJson=JSON.stringify(table2DataJsonText);

//     // console.log(table2DataJson);

// }

