
new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "./js/ajax_datas.js");// 在这里引入了a.js
document.body.appendChild(new_element);
//从服务获取全目录树信息，存在zNodes对象中
zNodes = new Object();


//edit_nodes用于存储正在编辑中的节点，包括删除和修改;edit_index用于记录编辑后节点下标,index_num用于记录修改节点数目
var edit_nodes = [];
var edit_index = [];
var index_num = [];
// 获取全目录信息
function AllCategorys() {
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/ywsjglprj/category/getAllCategorys",
        headers: { userId: 121 },
        timeout: 3000,
        success: function (data, status) {
            zNodes = data.data;
            edit_nodes = zNodes;
            // datatables(zNodes);

        }
    });
}
function datatable(nodes) {
    Table =
        $('#example').DataTable({
            "data": nodes,
            "scrollX": true,
            "serverSide": false,
            "autoWidth": true,
            "destroy": true,
            "columns": [
                {
                    "data": "name",
                    "title": "编目名称",
                    "render": function (data, type, row) {
                        return data = '<p style = "margin:0px"  id = "name_data">' + data + '</p>' + '<input type="text" id="name_input" style="display:none;" class="form-control input_sm" value="' + data + '">';
                    }
                },
                {
                    "data": "bmid",
                    "title": "编目ID",
                    "render": function (data, type, row) {
                        return data = '<p style = "margin:0px" id = "bmid_data">' + data + '</p>' + '<input type="text" id="name_input" style="display:none;" class="form-control input_sm" value="' + data + '">';
                    }
                },
                {
                    "data": "createTime",
                    "title": "创建时间 "
                },
                {
                    "data": "creator",
                    "title": "创建人",
                },

                {
                    "data": "fullbmid",
                    "title": " 编辑",
                    "render": function (data, type, row, meta) {
                        return data = '<button type="button"  style = "margin:0px;display:inline" class="btn bt_edit btn-primary btn-xs" id="dt_edit"><i class="fa fa-pencil"></i> 编辑 </button>' +
                            '<button type="button" style="display:none" class="btn bt_save btn-success btn-xs"  id="dt_save"><i class="fa fa-save"></i> 保存</button>  <button type="button" style="display:none" class="btn bt_exit btn-danger btn-xs" id="dt_exit" ><i class="fa fa-reply"></i> 退出</button>';
                    }
                },
                {
                    "data": "parentId",
                    "visible": false,
                },
                {
                    "data": "id",
                    "visible": false,
                },
            ],
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

    return Table;

}

AllCategorys();
// console.log(zNodes);
//进行编辑操作前将zNode 值复制到 edit_nodes
e = deepCopy(zNodes);
for (var attr in e) {
    edit_nodes[attr] = e[attr];
};

// 深拷贝
function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
};

var Table = datatable(zNodes);






// console.log(zNodes);







function _alert(text) {
    $("#modal-default").modal('show')
    $("#modal-default .modal-body").text(text);
    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            $("#modal-default").modal('hide');
        }
    });
};


function _confirm(text) {
    flag = -1;
    $("#modal-confirm").modal('show')
    $("#modal-confirm .modal-body").text(text);
    $("#modal-confirm .btn-default").off("click");
    $("#modal-confirm .btn-default").on("click", function () {
        console.log("cancel!");

    });
    $("#modal-confirm .btn-primary").off("click");
    $("#modal-confirm .btn-primary").on("click", function () {
        console.log("sure!");

    });

    // setTimeout(function () {
    //     wait(flag);
    // }, 3000);
    return flag;
}




// 定义删除和替换数组元素数据功能

//首先查找在json数组array中id为val的对象，返回该对象在数据中的下标
function search_node(array, id) {
    for (var i in array) {
        var nop = array[i];
        if (nop.id == id) {
            return i;
        }
    };
    return -1;
};

// end of search_node


//生成id
function make_id() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    uuid = uuid.replace(/-/g, "");

    return uuid;
};

// end of make_id()

//	修改id为val的对象名称name
function rename_node(array, val, new_name) {
    var indx = search_node(array, val);
    array[indx].name = new_name;
    return array;
};
//end of rename_node




var zTree;
var setting = {
    edit: {
        enable: true,
        editNameSelectAll: true,
        showLine: true,
        selectedMulti: false,
        showRemoveBtn: showRemoveBtn,
        showRenameBtn: showRenameBtn
    },
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
    },
    data: {
        key: {
            name: "name",
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: "0"
        }
    },


    callback: {
        beforeRemove: beforeRemove,
        onRemove: onRemove,
        beforeRename: beforeRename,
        onRename: onRename,
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        onDrop: zTreeOnDrop,
        beforeClick: beforeClick,
        onClick: zTreeOnClick
    }
};



// function beforeClick
function beforeClick(treeId, treeNode) {
    return true;
};
// end of beforeClick


// onclick function 点击ztree节点时datatable联动显示节点信息


function zTreeOnClick(event, treeId, treeNode) {
    var nodes = [];
    var nodes_num = nodes.push(treeNode);
    Table
        .rows()
        .remove()
        .row.add(nodes[0])
        // .row.add()
        .draw();
    if (treeNode.isParent) {
        var cnodes = treeNode.children;
        for (var n in cnodes) {
            Table
                .row.add(cnodes[n])
                .draw()
        }
    }
}



function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    indx = search_node(edit_nodes, treeNodes[0].id);
    updateParent(treeNodes[0]);


}

function beforeRemove(treeId, treeNode) {
    $("#modal-confirm").modal('show');
    $("#modal-confirm .modal-body").text("确认删除吗？");
    $("#modal-confirm .btn-default").off("click");
    $("#modal-confirm .btn-default").on("click", function () {
        console.log("cancel!");
        $("#modal-confirm").modal('hide');
    });

    $("#modal-confirm .btn-primary").off("click").on("click", function () {
        $.ajax({
            async: true,
            type: "DELETE",
            dataType: "json",
            url: "http://localhost:8080/ywsjglprj/category/deleteCategory/" + treeNode.id,
            contentType: 'application/json',
            // data: data_ajax,
            timeout: 3000,
            success: function (data, status) {
                if (data.message == "删除目录成功") {
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    zTree.removeNode(treeNode);
                    node_index = search_node(zNodes, treeNode.id);
                    // console.log(node_index);
                    zNodes.splice(node_index, 1);
                    var nodes = [];
                    Pn = treeNode.getParentNode();
                    // 获取父节点放入nodes数组中
                    var nodes_num = nodes.push(Pn);
                    var Cnodes = Pn.children;
                    ndoes_num = nodes.push(Cnodes);

                    Table
                        .rows()
                        .remove()
                        .row.add(Pn)
                        // .rows.add(Cnodes)
                        .draw();
                    for (var n in Cnodes) {
                        Table
                            .row.add(Cnodes[n])
                            .draw()
                    }
                };
                _alert(data.message);
            },
        });
    });

    return false;
};


function onRemove(e, treeId, treeNode) {
};


function beforeRename(treeId, treeNode, newName, isCancel) {
    if (newName.length == 0) {
        setTimeout(function () {
            var zTree = $.fn.zTree.getZTreeObj("tree");
            zTree.cancelEditName();
            _alert("节点名称不能为空.");
        }, 200);
        return false;
    }
    var Cnodes = getPeerNodes(treeNode);

    //获取当前节点的同级兄弟节点，不包含本节点
    function getPeerNodes(targetNode) {
        if (targetNode == null) {
            return null;
        } else {
            if (targetNode.getParentNode() != null) {
                return targetNode.getParentNode().children;
            }
            return null;
        }
    }

    for (var n in Cnodes) {
        if (Cnodes[n].name == newName) {
            if (Cnodes[n].id == treeNode.id) return;
            setTimeout(function () {
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.cancelEditName();
                var nodes = [];
                var nodes_num = nodes.push(treeNode);
                Table
                    .rows()
                    .remove()
                    .row.add(nodes[0])
                    .draw();
                _alert("编目名称已存在！");
            }, 200)
            return false;
        }
    }

    return true;
};

function onRename(e, treeId, treeNode, isCancel) {
    if (isCancel) return;
    // var Pnode = treeNode.getParentNode();

    for (var i in zNodes) {
        if (zNodes[i].id == treeNode.id) {
            // json_node = JSON.stringify(edit_nodes[i]);          
            updateName(edit_nodes[i]);
            var nodes = [];
            var nodes_num = nodes.push(treeNode);
            Table
                .rows()
                .remove()
                .row.add(nodes[0])
                .draw();
        }
    }

}

// // 更新树节点
// function event(id,newname) {
//     var zTree = $.fn.zTree.getZTreeObj("tree");
//     var node = zTree.getNodeByParam("id", id, null);
//     node.name = newname;
//     zTree.updateNode(node);
// };

// function event_SaveEdit() {
//     if (!confirm("确认保存 吗？")) {
//         return 0;
//     };
//     // zNodes = edit_nodes;
//     for (i in index_num) {
//         zTree.updateNode(zNodes[i]);
//     }
//     // console.log(zNodes);
//     // console.log(edit_nodes);
// };


function showRemoveBtn(treeId, treeNode) {
    return treeNode;
};


function showRenameBtn(treeId, treeNode) {
    return treeNode;
};

function getTime() {
    var now = new Date(),
        y = now.getFullYear(),
        mt = now.getMonth() + 1,
        d = now.getDate(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds()
    return (y + "-" + mt + "-" + d + " " + h + ":" + m + ":" + s);
};


function find_name(num, nodes) {
    for (var n in nodes) {
        var name = "new_node" + num;
        // console.log(nodes[n].name);
        if (nodes[n].name == name) {
            num = num + 1;
            return num;
        }
        else if (nodes[n].bmid == name) {
            num = num + 1;
            return num;
        };
    };
    return name;
}


var newCount = 1;
function addHoverDom(treeId, treeNode) {
    // console.log(treeNode.name);
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();' ></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function () {
        random = Math.ceil(Math.random() * 100);
        var zTree = $.fn.zTree.getZTreeObj("tree");
        // var nodes = zTree.transformToArray(zTree.getNodes());

        // 返回值不是字符串时进入循环
        var nname = find_name(1, zNodes);

        while (!isNaN(nname)) {
            nname = find_name(nname, zNodes);
            // console.log(nname);
        };
        name = nname;

        var id = make_id();
        for (var n in zNodes) {
            if (zNodes[n].id == id) {
            }
        }
        // console.log(id);
        var createTime = getTime();
        var creator = "unknow";
        var new_node = {
            "id": id,
            "name": name,
            "parentId": treeNode.id,
            "creator": "",
            "createTime": createTime,
            "bmid": name,
            "fullbmid": name
        };

        data_ajax = JSON.stringify(new_node);
        // console.log(data_ajax);
        $.ajax({
            async: true,
            type: "POST",
            dataType: "json",
            url: "http://localhost:8080/ywsjglprj/category/create",
            contentType: 'application/json',
            data: data_ajax,
            timeout: 3000,
            success: function (data, status) {
                if (data.message == "目录创建成功") {
                    zTree.addNodes(treeNode, new_node);
                    zNodes.push(new_node);
                }
                else {
                    _alert(data.message);

                }


            }
        });


        Table
            .rows()
            .remove()
            .row.add(new_node)
            .draw();
        return false;

    });
}



function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
};

function beforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}


function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    //    
    if (!(targetNode == null || (moveType != "inner" && !targetNode.parentTId)))
        return true;
    else {
        _alert("请勿改变根节点！");
        return false;
    };
}



function selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
}

function reload_tree() {
    var treeObj = $.fn.zTree.getZTreeObj("tree");
    var nodes = treeObj.getNodes();
    var isOpen = new Array();
    $.fn.zTree.destroy("#tree");
    $.fn.zTree.init($("#tree"), setting, zNodes);
    var zTree = $.fn.zTree.getZTreeObj("tree");
    var nodes = zTree.getNodes();
    for (var n in nodes) {
        if (nodes[n].id = 0) {
            nodes[n].open;
        }
    };
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            zTree.expandNode(nodes[i], true, false, false);
        }
    };
}

$(document).ready(function () {
    $.fn.zTree.init($("#tree"), setting, zNodes);
    var zTree = $.fn.zTree.getZTreeObj("tree");
    var nodes = zTree.getNodes();
    for (var n in nodes) {
        if (nodes[n].id = 0) {
            nodes[n].open;
        }
    };
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            zTree.expandNode(nodes[i], true, false, false);
        }
    };
    // var node=zTree.getNodeByParam("id", 0);  

    // zTree.selectNode(node);  

    // zTree.expandNode(node, true, false, false);  
    $("#selectAll").bind("click", selectAll);

    //        turn_tnodeto_Data(zNodes,);
    //        console.log(GlobalTreeNode);
    //        table_show_tNodes(GlobalTreeNode);

});




