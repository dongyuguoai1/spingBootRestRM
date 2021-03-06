//设置row-detail的格式，这里是创建一个新的表，表的id随母表行号的改变而改变
function format(d) {
    //d是行号
    return '<table id="example' + d + '" class="table table-bordered table-hover" width="100%" >' +
        '<thead>' +
        '<tr>' +
        '<th>字段编码</th>' +
        '<th>中文名称</th>' +
        '<th>英文名称</th>' +
        '<th>是否必填</th>' +
        '<th>是否唯一</th>' +
        '<th>默认值</th>' +
        '<th>最大长度</th>' +
        '<th>类型</th>' +
        '<th>定义</th>' +
        '<th>备注</th>' +
        '<th>密级</th>' +
        '</tr>' +
        '</thead>' +

        '</table>';
}
//获取zTree
function myGetzTree() {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    return zTree;
}

//更改目录树名字
function myRenameNode(node) {

    node.name = node.name.replace(/ \(.*\)/gi, "") + " (" + node.allModelCount + ")";
    var myzTree = myGetzTree();
    myzTree.updateNode(node);
}

//递归遍历目录树
function traverseTree(node) {
    if (!node) {
        return;
    }
    myRenameNode(node);
    if (node.children && node.children.length > 0) {
        var i = 0;
        for (i = 0; i < node.children.length; i++) {
            this.traverseTree(node.children[i]);
        }
    }
}

var MoveTest = {

    updateType: function () {
        var zTree = myGetzTree(),
            nodes = zTree.getNodes();
            //默认显示的表数据
        urlStr = "http://localhost:8080/ywsjglprj/model/" + nodes[0].id + "/getAllModelsByCategoryId/";
        $.ajax({
            type: "GET",
            url: urlStr, //从服务器拿东西，地址自己写  
            dataType: 'json', //设置服务器返回的数据类型，以便在这里解析
            success: function (data) {
                var nodeDT = data;
                $(function () {
                    creatTable(nodeDT);
                });
            }
        });
        //目录树显示数目信息
        for (var j = 0; j < nodes.length; j++) {
            traverseTree(nodes[j]);
        }
    },
};
//通过id获取下拉框select对象
// var Sel = document.getElementById("modelSel");
// //获取select的index
// var selectedIdx = Sel.selectedIndex;

//DT对列进行搜索的函数
// function filterColumn(i) {
//     $('#example').DataTable().column(i).search(
//         $('#col_filter').val()
//     ).draw();
// }

//创建DT的函数
function creatTable(modelInfo) {
    //将创建的表格存放到tables变量中
    var tables = $('#example').DataTable({
        //控制分页、搜索、每页显示数量、显示信息等四个插件的dom
        
        //数据传入
        data: modelInfo.data,
        "lengthMenu": [15, 25, 50, 75, 100],
        //允许重建
        destroy: true,
        "scrollX": true,
        //设置列数据
        "columns": [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": '',
                "width":"6px"
            },
            { "data": "code" },
            { "data": "name" },
            { "data": "enName" },
            { "data": "createTime" },
            { "data": "createPerson" },
            { "data": "updateTime" },
            { "data": "updatePerson" },
            { "data": "description" },
            { "data": "bmid" },
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

    //为row-details设置监听事件，td是DT的单元格，tr是DT的行
    $('#example tbody').off('click', 'td.details-control').on('click', 'td.details-control', function () {
        tables.draw();
        var tr = $(this).closest('tr');
        //获取这个单元格的行号
        var rowIndex = $(this).parents("tr").index();
        //获取这个行对象
        
        var row = tables.row(tr);
        //如果这个row-detail是展开的，那么点击之后就会折叠隐藏
        console.log("tr");
        console.log(tr);
        console.log("row");
        console.log(row);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        //展开row-detail
        else {
            //DT的行数据
            var rowData = row.data();
            //根据id从服务器获取ModelInfo，将fields数组通过row-details展示
            var detailRequest = "http://localhost:8080/ywsjglprj/model/getModelInfo/" + rowData.id;
            //控制row-details通过DT进行展示
            $.ajax({
                type: "GET",
                url: detailRequest, //从服务器拿东西，地址自己写  
                dataType: 'json',
                success: function (data) {
                    //先将DT的dom写出来
                    row.child(format(rowIndex)).show();
                    tr.addClass('shown');
                    //将服务器返回的数据取出来，将某些字段翻译成自然语言
                    //深拷贝出来一份服务器返回的数据
                    var detailResponse = jQuery.extend(true, {}, data);

                    var fieldsInfo = detailResponse.data[0].fields;

                    for (var dRIndex = 0; dRIndex < fieldsInfo.length; dRIndex++) {
                        if (fieldsInfo[dRIndex].required == false) {
                            fieldsInfo[dRIndex].required = "否";
                        }
                        else if (fieldsInfo[dRIndex].required == true) {
                            fieldsInfo[dRIndex].required = "是";
                        }
                        else {
                            //什么都不做
                        }
                        if (fieldsInfo[dRIndex].unique == false) {
                            fieldsInfo[dRIndex].unique = "否";
                        }
                        else if (fieldsInfo[dRIndex].unique == true) {
                            fieldsInfo[dRIndex].unique = "是";
                        }
                        else {
                            //什么都不做
                        }
                        if (fieldsInfo[dRIndex].security == 1) {
                            fieldsInfo[dRIndex].security = "公开";
                        }
                        else if (fieldsInfo[dRIndex].security == 2) {
                            fieldsInfo[dRIndex].security = "内部";
                        }
                        else if (fieldsInfo[dRIndex].security == 3) {
                            fieldsInfo[dRIndex].security = "秘密";
                        }
                        else if (fieldsInfo[dRIndex].security == 4) {
                            fieldsInfo[dRIndex].security = "机密";
                        }
                        else if (fieldsInfo[dRIndex].security == 5) {
                            fieldsInfo[dRIndex].security = "绝密";
                        }
                        else {
                            //什么都不做
                        }

                    }
                    //往DT里放数据
                    $(function () {
                        $('#example' + rowIndex).DataTable({
                            // "dom": 'rftip',
                            data: fieldsInfo,
                            destroy: true,
                            "scrollX": true,
                            "columns": [
                                { "data": "code" },
                                { "data": "name" },
                                { "data": "enName" },
                                { "data": "required" },
                                { "data": "unique" },
                                { "data": "defaultValue" },
                                { "data": "maxsize" },
                                { "data": "type" },
                                { "data": "defination" },
                                { "data": "comments" },
                                { "data": "security" }
                            ],
                            "order": [[1, 'asc']],
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
                        });
                    });
                    //DT数据设置完毕
                }
            });
            //ajax请求完毕
        }
    });
    //row-details监听事件函数完毕
}
//整个母表格创建完毕

//点击ztree后的响应函数
function zTreeOnClick(event, treeId, treeNode) {
    //调用后台服务get接口，通过该结点CategoryId的获取该结点的模型信息，treeNode.id即为CategoryId
    urlStr = "http://localhost:8080/ywsjglprj/model/" + treeNode.id + "/getAllModelsByCategoryId/";
    $.ajax({
        type: "GET",
        url: urlStr, //从服务器拿东西，地址自己写  
        dataType: 'json', //设置服务器返回的数据类型，以便在这里解析
        success: function (data) {
            //nodeDT为模型信息
            var nodeDT = data;
            //将模型信息nodeDT通过DT展示出来
            $(function () {

                //点击ztree后，先通过创建表格，来刷新母表
                creatTable(nodeDT);
                //时刻监听输入，默认搜索第一列
                // $('input.form-control').on('keyup click', function () {
                //     //搜索特定列
                //     filterColumn(parseInt(Sel.options[selectedIdx].value));
                // });

                //当下拉框改变时，对应母表中的搜索某列
                // document.getElementById("modelSel").onchange = function () {
                //     //重新加载DT
                //     creatTable(nodeDT);
                //     //获取需要搜索的列号
                //     selectedIdx = this.options.selectedIndex;
                //     //调用DT的搜索函数来搜索对应的列
                //     $('input.form-control').on('keyup click', function () {
                //         filterColumn(parseInt(Sel.options[selectedIdx].value));
                //     });
                // }

            });
            //母表DT展示完毕  
        }
    });
    //点击ztree的ajax执行完毕
}
//点击ztree的事件函数完毕

//ztree的设置函数
var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
    },
    data: {
        key: {
            name: "name",
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: ""
        }
    },
    callback: {
        //是否可以删掉
        beforeClick: function (treeId, treeNode) {
            // var zTree = $.fn.zTree.getZTreeObj("tree");
            // zTree.expandNode(treeNode);
            return true;
        },
        onClick: zTreeOnClick
    }
};

//从服务中取ztree目录数据
var zNodes = new Object();
$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "http://localhost:8080/ywsjglprj/category/getAllCategorys",
    timeout: 3000,
    success: function (data, status) {
        zNodes = data.data;
    }
});

//显示ztree目录
$(document).ready(function () {
    var zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
    $('#modelSel').select2();
    MoveTest.updateType();
    var nodes1 = zTreeObj.getNodes();
    if (nodes1.length > 0) {
        for (var i = 0; i < nodes1.length; i++) {
            zTreeObj.expandNode(nodes1[i], true, false, false);
        }
    }
});

