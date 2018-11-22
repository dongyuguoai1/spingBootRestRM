//审批界面对于目录树的处理
function zTreedispose(categoryId) {
    var setting =
        {
            view: {
                dblClickExpand: false,      //双击是否展开节点
                showLine: true,  //是否显示节点间的连线  
                expandSpeed: "fast",        //动画渲染速度
                selectMulti: false//表示禁止多选  
            },
            callback: {
                //onClick: onClick,
                // onCheck: onCheck,
                beforeCheck: zTreeBeforeCheck
            },
            check: {
                enable: true,
                chkStyle: "radio",//值为checkbox或者radio表示
                checkboxType: { p: "", s: "" },//表示父子节点的联动效果
                radioType: "all"//设置tree的分组  
            },
            data:
                {
                    key:
                        {
                            name: "name"  //界面显示的名称参数  
                        },
                    simpleData:
                        {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId",
                            rootPId: "0"
                        }
                }
        }
    //加载树的资源    

    $.get("http://localhost:8080/ywsjglprj/category/getAllCategorys", null, function (resourceInfo) {
        //核心代码，将查询到的信息存放到setting格式的tree中  
        var treeData = resourceInfo.data;
        $.fn.zTree.init($("#treeDemo2"), setting, treeData);
        //$("#treeDiv").height($(window).height());//根据网页可视高度设置树的高度
        var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo2");
        var node = zTree_Menu.getNodeByParam("id", categoryId);
        zTree_Menu.selectNode(node, true)//指定选中ID的节点
        zTree_Menu.checkNode(node, true, true)//指定选中ID的节点  
        zTree_Menu.expandNode(node, true, true);//指定选中ID节点展开
    });

    function zTreeBeforeCheck(treeId, treeNode) {
        return false;
    };
}
//修改模型信息的处理方法
// function checkAddModal(resourceId, rowMessage) {
//     // count2++;
//     // console.log("count2:"+count2);
//     // alert(row_id);
//     //获取点中行的模型信息
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/ywsjglprj/model/getModelInfoInner/" + resourceId,
//         contentType: "application/json;charset=UTF-8",

//         dataType: "text",
//         success: function (result) {
//             if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {            //成功就把模型信息填入模态框
//                 var jsonArry = JSON.parse(result);
//                 $("#checkModal_addbmid").val(jsonArry.data[0].bmid);
//                 $("#checkModal_addname").val(jsonArry.data[0].name);
//                 $("#checkModal_addenName").val(jsonArry.data[0].enName);
//                 $("#checkModal_addcode").val(jsonArry.data[0].code);
//                 $("#checkModal_adddescription").val(jsonArry.data[0].description);
//                 if (rowMessage == null || rowMessage == "") {
//                     $("#checkModal_message").val("未审核");
//                 } else {
//                     $("#checkModal_message").val(rowMessage);
//                 }
//                 zTreedispose(jsonArry.data[0].categoryId);

//                 $.each(jsonArry.data[0].fields, function (index, obj) {
//                     // var tr1 = "<tr><td align='center' onclick='deletetr(this)'><i class='fa fa-close'></i>";
//                     var newSecurity = "<tr><td align='center'><select id='checkModal_security" + index + "' style='height:26px'> <option value='1'>公开</option> <option value='2'>内部</option> <option value='3'>秘密</option> <option value='4'>机密</option> <option value='5'>绝密</option> </select>"
//                     var newName = "</td><td  id='checkModal_name" + index + "' width=15% >"
//                     var newEnName = "</td><td id='checkModal_enName" + index + "'  width=15% >"
//                     var newCode = "</td><td  id='checkModal_code" + index + "' width=10% >"
//                     var newDefination = "</td><td  id='checkModal_defination" + index + "' width=10% >"
//                     var newType = "</td><td  align='center'><select id='checkModal_type" + index + "' style='height:26px'> <option value='int'>int</option> <option>long</option> <option>double</option> <option>float</option> <option>date</option> <option>string</option> <option>text</option> <option>datetime</option> <option>timestimp</option> <option>ipv4-addr</option> <option>ipv6-addr</option> </select>"
//                     var newMaxsize = "</td><td  id='checkModal_maxSize" + index + "' width=10% >"
//                     var newRange = "</td><td  id='checkModal_range" + index + "' width=10%>"
//                     var newRequired = "</td><td  align='center'><label> <input id='checkModal_required" + index + "' type='checkbox' class='minimal' > </label>"
//                     var newUnique = "</td><td align='center'><label> <input id='checkModal_unique" + index + "' type='checkbox' class='minimal'> </label>"
//                     var newMaxContains = "</td><td id='checkModal_maxContains" + index + "' width=10% >"
//                     var newcomments = "</td><td id='checkModal_comments" + index + "' width=10% >"
//                     var newPxh = "</td><td id='checkModal_pxh" + index + "' width=10% >"
//                     var tr = newSecurity + newName + newEnName + newCode + newDefination + newType + newMaxsize + newRange + newRequired + newUnique + newMaxContains + newcomments + newPxh + "</td></tr>";
//                     $("#checkModal_mytable").append(tr);
//                     $("#checkModal_security" + index + " option[value='" + obj.security + "']").attr("selected", "selected");
//                     $("#checkModal_name" + index).text(obj.name);
//                     $("#checkModal_enName" + index).text(obj.enName);
//                     $("#checkModal_code" + index).text(obj.code);
//                     $("#checkModal_defination" + index).text(obj.defination);
//                     $("#checkModal_type" + index + " option:contains('" + obj.type + "')").attr("selected", "selected");
//                     $("#checkModal_maxSize" + index).text(obj.maxsize);
//                     $("#checkModal_range" + index).text(obj.range);
//                     //$("#checkModal_required"+index).checked=obj.required;
//                     $("#checkModal_required" + index).prop("checked", obj.required);
//                     // console.log(obj.required);
//                     // var checkModal_required_test="checkModal_required"+index;
//                     // document.getElementById(checkModal_required_test).checked=obj.required;
//                     $("#checkModal_unique" + index).prop("checked", obj.unique);
//                     $("#checkModal_maxContains" + index).text(obj.maxContains);
//                     $("#checkModal_comments" + index).text(obj.comments);
//                     $("#checkModal_pxh" + index).text(obj.pxh);

//                 });
//                 // console.log($("#checkModal_addbmid").val());
//                 $("div#check_modal_1 input").attr("readonly", "readonly");
//                 $("#checkModal_adddescription").attr("readonly", "readonly");
//                 $("#checkModal_message").attr("readonly", "readonly");
//                 $("div#check_modal_1 select").attr("disabled", "disabled");
//                 $("div#check_modal_1 input").attr("disabled", true);
//             } else {
//                 //错误的话检测错误提示框是否已经存在
//                 $("#danger_alert_getmodule").remove();

//                 var alertWarning_add = "<div id='danger_alert_getmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>获取模型失败:" + JSON.parse(result).message + "</br>" + "</div>"
//                 $("#check_modal_1").prepend(alertWarning_add);
//                 $("#danger_alert_getmodule").delay(3000).hide(0);
//             };
//         }
//     });


// };
//查看模型信息的处理方法，把选中行的信息填入查看 的模态框
function checkDorUmodel(resourceId, modelInfo, rowMessage) {
    // var modelInfo=JSON.parse(rowJSON);
    // var modelInfo = rowJSON;
    // if (modelInfo == null || modelInfo == "") {
    //     checkAddModal(resourceId, rowMessage)
    // } else {
        $("#checkModal_addbmid").val(modelInfo.bmid);       
        $("#checkModal_addname").val(modelInfo.name);
        $("#checkModal_addenName").val(modelInfo.enName);
        $("#checkModal_addcode").val(modelInfo.code);
        $("#checkModal_adddescription").val(modelInfo.description);
        if (rowMessage == null || rowMessage == "") {
            $("#checkModal_message").val("未审核");
        } else {
            $("#checkModal_message").val(rowMessage);
        }
        zTreedispose(modelInfo.categoryId);
        $.each(modelInfo.fields, function (index, obj) {
            // var tr1 = "<tr><td align='center' onclick='deletetr(this)'><i class='fa fa-close'></i>";
            var newSecurity = "<tr><td align='center'><select id='checkModal_security" + index + "' style='height:26px'> <option value='1'>公开</option> <option value='2'>内部</option> <option value='3'>秘密</option> <option value='4'>机密</option> <option value='5'>绝密</option> </select>"
            var newName = "</td><td  id='checkModal_name" + index + "' width=15% >"
            var newEnName = "</td><td id='checkModal_enName" + index + "'  width=15% >"
            var newCode = "</td><td  id='checkModal_code" + index + "' width=10% >"
            var newDefination = "</td><td  id='checkModal_defination" + index + "' width=10% >"
            var newType = "</td><td  align='center'><select id='checkModal_type" + index + "' style='height:26px'> <option>字符串</option> <option>整数</option> <option>浮点型</option> <option>日期</option> </select>"
            var newMaxsize = "</td><td  id='checkModal_maxSize" + index + "' width=10% >"
            var newRange = "</td><td  id='checkModal_range" + index + "' width=10%>"
            var newRequired = "</td><td  align='center'><label> <input id='checkModal_required" + index + "' type='checkbox' class='minimal' > </label>"
            var newUnique = "</td><td align='center'><label> <input id='checkModal_unique" + index + "' type='checkbox' class='minimal'> </label>"
            var newMaxContains = "</td><td id='checkModal_maxContains" + index + "' width=10% >"
            var newcomments = "</td><td id='checkModal_comments" + index + "' width=10% >"
            // var newPxh = "</td><td id='checkModal_pxh" + index + "' width=10% >"
            var tr = newSecurity + newName + newEnName + newCode + newDefination + newType + newMaxsize + newRange + newRequired + newUnique + newMaxContains + newcomments + "</td></tr>";
            $("#checkModal_mytable").append(tr);
            $("#checkModal_security" + index + " option[value='" + obj.security + "']").attr("selected", "selected");
            $("#checkModal_name" + index).text(obj.name);
            $("#checkModal_enName" + index).text(obj.enName);
            $("#checkModal_code" + index).text(obj.code);
            $("#checkModal_defination" + index).text(obj.defination);
            $("#checkModal_type" + index + " option:contains('" + obj.type + "')").attr("selected", "selected");
            $("#checkModal_maxSize" + index).text(obj.maxsize);
            $("#checkModal_range" + index).text(obj.range);
            //$("#checkModal_required"+index).checked=obj.required;
            $("#checkModal_required" + index).prop("checked", obj.required);
            // console.log(obj.required);
            // var checkModal_required_test="checkModal_required"+index;
            // document.getElementById(checkModal_required_test).checked=obj.required;
            $("#checkModal_unique" + index).prop("checked", obj.unique);
            $("#checkModal_maxContains" + index).text(obj.maxContains);
            $("#checkModal_comments" + index).text(obj.comments);
            // $("#checkModal_pxh" + index).text(obj.pxh);

        });
        // console.log($("#checkModal_addbmid").val());
        $("div#check_modal_1 input").attr("readonly", "readonly");
        $("#checkModal_adddescription").attr("readonly", "readonly");
        $("#checkModal_message").attr("readonly", "readonly");
        $("div#check_modal_1 select").attr("disabled", "disabled");
        $("div#check_modal_1 input").attr("disabled", true);
    }
// }
//开始审批的执行方法
function begin_check(row_id) {
    $("#enter_check").unbind();//解除同意的按钮的绑定事件
    $("#reject_check").unbind();//解除拒绝的按钮的绑定事件
    $("#enter_check").click(function () {       //同意审批的处理方法
        var check_message = $("#modal_check_message").val();
        if (check_message == null || check_message == "") {     //意见信息如果有问题就弹出提示框
            $("#danger_alert_checkmodule").remove();
            var alertWarning_add = "<div id='danger_alert_checkmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>审核失败:请填写审核意见</div>"
            $("#modal_check_body").prepend(alertWarning_add);
            $("#danger_alert_checkmodule").delay(3000).hide(0);
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ywsjglprj/audit/agree/" + row_id,       //同意此事件
                contentType: "application/json;charset=UTF-8",
                data: check_message,
                dataType: "text",
                success: function (result) {
                    if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                        
                        $("#modal_check").modal('hide');
                        $("#danger_alert_checkmodule").remove();                  // 成功就把之前的提示框删除
                        // $("#success_alert_checkmodule").remove();                  //之前成功的提示框也删除好创建新的
                        
                        
                        table2Update();                                    //table2重新加载
                        table1Update();                                     //table1重新加载
                        $("#modal_check_message").val("");
                        // var alertWarning_add = "<div id='success_alert_checkmodule' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>审核成功，已同意此请求。</div>"

                        // $("#tab_top").prepend(alertWarning_add);
                        // $("#success_alert_checkmodule").delay(3000).hide(0);
                        top_alert("success","审核成功，已同意此请求。")
                    } else {
                        // 判断失败的提示框是否存在
                        $("#danger_alert_checkmodule").remove();

                        var alertWarning_add = "<div id='danger_alert_checkmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>审核失败:" + JSON.parse(result).message + "</br>" + "</div>"
                        $("#modal_check_body").prepend(alertWarning_add);
                        $("#danger_alert_checkmodule").delay(3000).hide(0);
                    }




                },

                error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题

                    $("#danger_alert_checkmodule").remove();

                    var alertWarning_add = "<div id='danger_alert_checkmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>审核失败:" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>" + "</div>"

                    $("#modal_check_body").prepend(alertWarning_add);
                    $("#danger_alert_checkmodule").delay(3000).hide(0);
                }
            });
        }
        
    });
    $("#reject_check").click(function () {                  //拒绝按钮的处理方法
        var check_message = $("#modal_check_message").val();        //获取意见信息
        if (check_message == null || check_message == "") {         //意见有问题就弹出提示框
            $("#danger_alert_checkmodule").remove();
            var alertWarning_add = "<div id='danger_alert_checkmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>审核失败:请填写审核意见</div>"
            $("#modal_check_body").prepend(alertWarning_add);
            $("#danger_alert_checkmodule").delay(3000).hide(0);
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ywsjglprj/audit/reject/" + row_id,
                contentType: "application/json;charset=UTF-8",
                data: check_message,
                dataType: "text",
                success: function (result) {
                    if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                        $("#modal_check").modal('hide');
                        $("#danger_alert_checkmodule").remove();                  // 成功就把之前的提示框删除
                        // $("#success_alert_checkmodule").remove();                  //之前成功的提示框也删除好创建新的
                        table1Update();      //table1重新加载
                        table2Update();                                    //table2重新加载
                        $("#modal_check_message").val("");                  //清空意见信息
                        // var alertWarning_add = "<div id='success_alert_checkmodule' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>审核成功，已拒绝此请求。</div>"

                        // $("#tab_top").prepend(alertWarning_add);
                        // $("#success_alert_checkmodule").delay(3000).hide(0);
                        top_alert("success","审核成功，已拒绝此请求。")
                    } else {
                        // 判断失败的提示框是否存在
                        $("#danger_alert_checkmodule").remove();

                        var alertWarning_add = "<div id='danger_alert_checkmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>审核失败:" + JSON.parse(result).message + "</br>" + "</div>"
                        $("#modal_check_body").prepend(alertWarning_add);
                        $("#danger_alert_checkmodule").delay(3000).hide(0);
                    }




                },

                error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题

                    $("#danger_alert_checkmodule").remove();

                    var alertWarning_add = "<div id='danger_alert_checkmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>审核失败:" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>" + "</div>"

                    $("#modal_check_body").prepend(alertWarning_add);
                    $("#danger_alert_checkmodule").delay(3000).hide(0);
                }
            });
        }

    });

}
function cleanmodal_check(modal_id){
    $("#modal_check_message").val("");
    $(modal_id).modal('hide');

}