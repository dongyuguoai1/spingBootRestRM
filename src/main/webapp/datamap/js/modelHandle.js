//将填写的feilds信息拼凑成JSON字符串后检测编码和最大出现次数是否为空，为空返回null
function savemyinfo(table_id) {

    var myFeildinfo = getmyinfo(table_id);
    var jsonArry = JSON.parse(myFeildinfo);
    // $.each(jsonArry, function (index, item) {

    //     var code = item.code;
    //     var maxsize = item.maxsize;
    //     if (code == "" || code == null || maxsize == "" || maxsize == null) {
    //         break;
    //     }
    // });
    for (var i = 0; i < jsonArry.length; i++) {

        var code = jsonArry[i].code;
        var maxsize = jsonArry[i].maxsize;
        if (code == "" || code == null || maxsize == "" || maxsize == null) {
            return null;
        }
    }
    // console.log(myFeildinfo);
    return myFeildinfo;

}


//将前台界面填写的feilds信息拼接成JSON格式字符串
function getmyinfo(table_id) {
    var security = ""; //密级
    var name = "";  //中文名称
    var enName = "";    //英文名称 
    var code = "";  //编码
    var defination = ""; //定义
    var type = "";    //元数据类型
    var maxsize = ""; //长度
    var range = "";  //值域
    var required = "";    //是否必填
    var unique = "";  //是否唯一
    var maxContains = "";  //最大出现次数
    var comments = "";    //备注
    // var pxh = ""; //排序号
    var mydata = ""; //fieldJSON
    var table = $(table_id); //table
    var tbody = table.children();   //遍历table
    var trs = tbody.children();     //遍历tr
    var re = /^[1-9]+[0-9]*]*$/;
    for (var i = 1; i < trs.length; i++) {
        var tds = trs.eq(i).children();     //遍历每个tr中的td
        for (var j = 1; j < tds.length; j++) {
            if (j == 1) {                   //密级
                security = "security\":" + tds.eq(j).find("option:selected").val();
            }
            if (j == 2) {                   //中文名称
                if (tds.eq(j).text() == null || tds.eq(j).text() == "") {       //中文名称为空时默认为编码
                    name = "name\":\"" + tds.eq(j + 2).text();

                } else {
                    name = "name\":\"" + tds.eq(j).text();
                }

            }
            if (j == 3) {                               //英文名称 
                if (tds.eq(j).text() == null || tds.eq(j).text() == "") {       //英文名称为空时默认为编码
                    enName = "enName\":\"" + tds.eq(j + 1).text();

                } else {
                    enName = "enName\":\"" + tds.eq(j).text();
                }

            }
            if (j == 4) {       //编码
                if ((tds.eq(j).text() == null || tds.eq(j).text() == "") && tds.eq(j).find((":input")).length == 0) {   //编码为空时红字提示
                    tds.eq(j).append(this, "<input type='text' value='不能为空' style='color: red'/>");

                    code = "";
                    continue;
                } else {                                                            //编码重复时红字提示
                    for (var k = 1; k < trs.length; k++) {
                        var test_tds = trs.eq(k).children();

                        if (k != i && tds.eq(j).text() == test_tds.eq(4).text()) {
                            tds.eq(j).empty();
                            test_tds.eq(4).empty();
                            tds.eq(j).append(this, "<input type='text' value='编码不能重复' style='color: red'/>");
                            test_tds.eq(4).append(this, "<input type='text' value='编码不能重复' style='color: red'/>");
                            code = "";
                            break;
                        } else {
                            code = tds.eq(j).text();
                        }
                    }

                }
            }
            if (j == 5) {                   //定义
                defination = "defination\":\"" + tds.eq(j).text();
            }
            if (j == 6) {               //元数据类型
                type = "type\":\"" + tds.eq(j).find("option:selected").text();
            }
            if (j == 7) {           //长度

                if ((tds.eq(j).text() == null || tds.eq(j).text() == "" || !re.test(tds.eq(j).text())) && tds.eq(j).find((":input")).length == 0) {     //长度不能为空红字提示
                    tds.eq(j).empty();
                    tds.eq(j).append(this, "<input type='text' value='不能为空且只能为正整数' style='color: red'/>");
                    maxsize = null;
                    continue;

                } else if (tds.eq(j).find((":input")).length == 1) {            //红字提示存在则不再提示
                    maxsize = null;
                    continue;
                } else {

                    maxsize = tds.eq(j).text();


                }
            }
            if (j == 8) {                                   //值域
                range = "range\":\"" + tds.eq(j).text();
            }
            if (j == 9) {                                       //是否必填
                if (tds.eq(j).find(":checkbox").is(':checked')) {
                    required = "required\":" + true;
                } else {
                    required = "required\":" + false;
                }
            }
            if (j == 10) {                                      //是否唯一
                if (tds.eq(j).find(":checkbox").is(':checked')) {
                    unique = "unique\":" + true;
                } else {
                    unique = "unique\":" + false;
                }
            }
            if (j == 11) {                                      //最大出现次数
                if (tds.eq(j).text() == null || tds.eq(j).text() == "") {               //为空的话默认为1
                    maxContains = "maxContains\":" + 1;
                } else if (!re.test(tds.eq(j).text())) {                    //不是正整数红字提示
                    tds.eq(j).empty();
                    tds.eq(j).append(this, "<input type='text' value='只能为正整数' style='color: red'/>");
                    maxContains = "maxContains\":" + null;
                    continue;
                } else {
                    maxContains = "maxContains\":" + tds.eq(j).text();
                }
            }
            if (j == 12) {                          //备注
                comments = "comments\":\"" + tds.eq(j).text();
            }
            // if (j == 13) {                          //排序号
            //     if (tds.eq(j).text() == null || tds.eq(j).text() == "") {       //默认按照添加顺序

            //         pxh = "pxh\":" + i;
            //     } else if (!re.test(tds.eq(j).text())) {                    //不是正整数红字提示
            //         tds.eq(j).empty();
            //         tds.eq(j).append(this, "<input type='text' value='只能为正整数' style='color: red'/>");
            //         pxh = "pxh\":" + null;
            //         continue;
            //     } else {
            //         pxh = "pxh\":" + tds.eq(j).text();
            //     }
            // }
        }
        if (i == trs.length - 1) {              //是最后一行的处理
            mydata += "{\"" + security + ",\"" + name + "\",\"" + enName + "\",\"" + "code\":\"" + code + "\",\"" + defination + "\",\"" + type + "\",\"" + "maxsize\":" + maxsize + ",\""
                + range + "\",\"" + required + ",\"" + unique + ",\"" + maxContains + ",\"" + comments + "\"}";
        } else {                                //不是最后一行的处理
            mydata += "{\"" + security + ",\"" + name + "\",\"" + enName + "\",\"" + "code\":\"" + code + "\",\"" + defination + "\",\"" + type + "\",\"" + "maxsize\":" + maxsize + ",\""
                + range + "\",\"" + required + ",\"" + unique + ",\"" + maxContains + ",\"" + comments + "\"},";
        }
    }
    mydata = "[" + mydata + "]";


    return mydata;
}


//鼠标点击feildstable里的字段出现input框

function tdclick(tdobject) {
    var td = $(tdobject);
    td.attr("onclick", "");
    //1,取出当前td中的文本内容保存起来 
    var text = td.text();
    //2,清空td里面的内容 
    td.html(""); //也可以用td.empty(); 
    //3，建立一个文本框，也就是input的元素节点 
    var input = $("<input >");
    //4，设置文本框的值是保存起来的文本内容 
    input.attr("value", text);
    input.bind("blur", function () {
        var inputnode = $(this);
        var inputtext = inputnode.val();
        var tdNode = inputnode.parent();
        tdNode.html(inputtext);
        tdNode.click(tdclick);
        td.attr("onclick", "tdclick(this)");
    });
    input.keyup(function (event) {
        var myEvent = event || window.event;
        var kcode = myEvent.keyCode;
        if (kcode == 13) {
            var inputnode = $(this);
            var inputtext = inputnode.val();
            var tdNode = inputnode.parent();
            tdNode.html(inputtext);
            tdNode.click(tdclick);
            td.attr("onclick", "tdclick(this)");
        }
    });

    //5，将文本框加入到td中 
    td.append(input);
    var t = input.val();
    input.val("").focus().val(t);
    // input.focus(); 

    //6,清除点击事件 
    td.unbind("click");
}
//添加一行的处理方法
function addtr(table_id) {
    var table = $(table_id);
    var tr1 = "<tr><td align='center' ><button type='button' class='btn btn-default btn-xs'onclick='deletetr(this)'><i class='fa fa-close'></i></button>";
    var tr2 = "&nbsp;<button type='button' class='btn btn-default btn-xs'onclick='checkUorD(this,\"MoveUp\")'><i class='fa fa-arrow-up'></i></button>"
    var tr3 = "&nbsp;<button type='button' class='btn btn-default btn-xs'onclick='checkUorD(this,\"MoveDown\")'><i class='fa fa-arrow-down'></i></button>"
    var newSecurity = "</td><td align='center'><select id='security' style='height:26px'> <option value='1'>公开</option> <option value='2'>内部</option> <option value='3'>秘密</option> <option value='4'>机密</option> <option value='5'>绝密</option> </select>"
    var newName = "</td><td  width=15% onclick='tdclick(this)'>"
    var newEnName = "</td><td  width=15% onclick='tdclick(this)'>"
    var newCode = "</td><td  width=10% onclick='tdclick(this)'>"
    var newDefination = "</td><td  width=10% onclick='tdclick(this)'>"
    var newType = "</td><td align='center'><select id='ysjlx' style='height:26px'> <option>字符串</option> <option>整数</option> <option>浮点型</option> <option>日期</option>  </select>"
    var newMaxsize = "</td><td  width=10% onclick='tdclick(this)'>"
    var newRange = "</td><td  width=10% onclick='tdclick(this)'>"
    var newRequired = "</td><td align='center'><label> <input type='checkbox' class='minimal' > </label>"
    var newUnique = "</td><td align='center'><label> <input type='checkbox' class='minimal'> </label>"
    var newMaxContains = "</td><td width=10% onclick='tdclick(this)'>"
    var newcomments = "</td><td width=10% onclick='tdclick(this)'>"
    // var newPxh = "</td><td width=10% onclick='tdclick(this)'>"
    var tr = tr1 + tr2 + tr3 + newSecurity + newName + newEnName + newCode + newDefination + newType + newMaxsize + newRange + newRequired + newUnique + newMaxContains + newcomments + "</td></tr>";
    table.append(tr);
}
//删除一行的处理方法
function deletetr(tdobject) {
    var td = $(tdobject);

    td.parents("tr").remove();
}
//清除提示错误后占位符内容，并且消除error红框
function cleanInput(object) {
    var td = $(object);
    var objectId = td.attr("id") + "_div";
    //console.log(objectId);
    $("#" + objectId).attr("class", "form-group");
    td.attr("placeholder", "");
    //td.attr("style","");
}

//添加or修改模型的对于形成JSON的处理方法
function addmodule(modal_id, table_id) {
    var moduleFeild = savemyinfo(table_id);
    var moduleBmid = $(modal_id + "_addbmid").val();
    var moduleName = $(modal_id + "_addname").val();
    var modulenName = $(modal_id + "_addenName").val();
    var moduleCode = $(modal_id + "_addcode").val();
    var test123 = modal_id + "_adddescription";
    var moduledescription = $(test123).val();
    //console.log($("#plusModal_adddescription").val())
    //console.log(document.getElementById('plusModal_adddescription').value)
    //模型字段有问题时页面转换过去
    if (moduleFeild == null || moduleFeild == "") {
        $(modal_id + "_tab_1Active").removeClass("active");
        $(modal_id + "_tab_2Active").attr("class", "active");
        $(modal_id + "_tab_1").attr("class", "tab-pane");
        $(modal_id + "_tab_2").attr("class", "tab-pane active");
    } else if (moduleBmid == null || moduleBmid == "" || moduleCode == null || moduleCode == "") {  //模型信息有问题时页面转换
        $(modal_id + "_tab_2Active").removeClass("active");
        $(modal_id + "_tab_1Active").attr("class", "active");
        $(modal_id + "_tab_2").attr("class", "tab-pane");
        $(modal_id + "_tab_1").attr("class", "tab-pane active");
        if ((moduleBmid == null || moduleBmid == "") && (moduleCode == null || moduleCode == "")) { //编目ID和编码都为空时红框提示

            $(modal_id + "_addbmid_div," + modal_id + "_addcode_div").attr("class", "form-group has-error");
            $(modal_id + "_addbmid," + modal_id + "_addcode").attr("placeholder", "不能为空");


            $(modal_id + "_addbmid," + modal_id + "_addcode").attr("onclick", "cleanInput(this)");    //鼠标点击清除红框和提示
            $(modal_id + "_addbmid," + modal_id + "_addcode").unbind("click");

            return null;
        } else if (moduleBmid == null || moduleBmid == "") {    //编目ID为空时红框提示

            $(modal_id + "_addbmid_div").attr("class", "form-group has-error");
            $(modal_id + "_addbmid").attr("placeholder", "不能为空");
            $(modal_id + "_addbmid").attr("onclick", "cleanInput(this)");      //鼠标点击清除红框和提示
            $(modal_id + "_addbmid").unbind("click");
            return null;
        } else {                                                        //编码为空时红框提示
            //$("#addcode").attr("style", "color: red");
            $(modal_id + "_addcode_div").attr("class", "form-group has-error");
            $(modal_id + "_addcode").attr("placeholder", "不能为空");
            $(modal_id + "_addcode").attr("onclick", "cleanInput(this)");      //鼠标点击清除红框和提示
            $(modal_id + "_addcode").unbind("click");
            return null;
        }

    } else {
        if (moduleName == null || moduleName == "") {        //中文名为空时默认为编码
            moduleName = moduleCode;
        }
        if (modulenName == null || modulenName == "") {     //英文名为空时默认为编码
            modulenName = moduleCode;
        }
        //形成完整的JSON字符串
        var moduleData = "{\"" + "bmid\":\"" + moduleBmid + "\",\"" + "name\":\"" + moduleName + "\",\"" + "enName\":\"" + modulenName + "\",\"" + "code\":\"" + moduleCode + "\",\"" + "description\":\"" + moduledescription + "\",\"" + "fields\":" + moduleFeild + "}"
        return moduleData;
    }
}
//点击添加模型模态框中的提交时的处理方法
function addmodule_btn(modal_id, table_id) {
    //获得模态框中的信息
    var moduleData = addmodule(modal_id, table_id);
    //alert(moduleData);
    //模态框信息有问题时出现提示框
    if (moduleData == null ) {
        // var alertWarning_add = "<div id='danger_alert_addmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>添加模型失败:请检查所填信息是否有误</div>"

        // $("#addModal").prepend(alertWarning_add);
        // $("#danger_alert_addmodule").delay(2000).hide(0);
        spop({
            template: '请检查所填信息是否有误',
            position  : 'top-center',
            style: 'error',
            // autoclose: 3000
        });

    // } else if (moduleData == null && $("#danger_alert_addmodule").length != 0) {        //提示框存在，就让其出现
    //     $("#danger_alert_addmodule").show(0);
    //     $("#danger_alert_addmodule").delay(2000).hide(0);
    } else {                                            //信息没问题就传给ajax
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ywsjglprj/model/create",
            contentType: "application/json;charset=UTF-8",
            data: moduleData,
            dataType: "text",
            success: function (result) {
                if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                    // $("#danger_alert_addmodule").remove();                  // 成功就把之前的提示框删除
                    table1Update();                                   //重新加载datatable，提示成功
                    table2Update();
                    // var alertWarning_add = "<div id='success_alert_createmodule' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>添加模型成功。</div>"

                    // $("#tab_top").prepend(alertWarning_add);
                    // $("#success_alert_createmodule").delay(3000).hide(0);
                    // top_alert("success", "添加模型成功。");      //调用top提示框函数
                    spop({
                        template: '创建模型成功！',
                        position  : 'top-center',
                        style: 'success',
                        autoclose: 3000
                    });
                    cleanaddmodule(modal_id); //清除模态框内容
                } else {
                    // if ($("#danger_alert_createmodule").length != 0) {     // 判断失败的提示框是否存在
                    //     $("#danger_alert_createmodule").remove();       //存在就删除掉
                    // }                                           //失败的提示框
                    // var alertWarning_add = "<div id='danger_alert_createmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>添加模型失败:" + JSON.parse(result).message + "</br>" + "</div>"
                    // $("#addModal").prepend(alertWarning_add);
                    // $("#danger_alert_createmodule").delay(3000).hide(0);
                    spop({
                        template: JSON.parse(result).message,
                        position  : 'top-center',
                        style: 'error',
                        // autoclose: 3000
                    });
                }




            },

            error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题
                // if ($("#danger_alert_createmodule").length != 0) {
                //     $("#danger_alert_createmodule").remove();
                // }
                // var alertWarning_add = "<div id='danger_alert_createmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>添加模型失败:" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>" + "</div>"

                // $("#addModal").prepend(alertWarning_add);
                // $("#danger_alert_createmodule").delay(3000).hide(0);
                spop({
                    template: textStatus,
                    position  : 'top-center',
                    style: 'error',
                    // autoclose: 3000
                });
            }
        });

        console.log(moduleData);


    }

}

// function cleanaddmodule() {
//     $("#plusModal").modal('hide'); 
//     $("div#plusModal input").val("");
//     $("div#plusModal input").attr("placeholder", "");
//     $("#addbmid_div,#addcode_div").attr("class", "form-group");
//     $("div#plusModal td").parents("tr").remove();
//     $("#tab_2Active").removeClass("active");
//     $("#tab_1Active").attr("class", "active");
//     $("#tab_2").attr("class", "tab-pane");
//     $("#tab_1").attr("class", "tab-pane active");
//     $("#alert_warning").remove();
//     console.log($("div#plusModal input").val());
// }


//传入模态框id后清除模态框内容并关闭模态框
function cleanaddmodule(modal_id) {
    $(modal_id).modal('hide');          //模态框隐藏
    // $(".modal-backdrop").remove();
    $("div" + modal_id + " input").val("");     //清除input框内容
    $("div" + modal_id + " input").attr("placeholder", "");     //清除占位符
    $(modal_id + "_addbmid_div," + modal_id + "_addcode_div").attr("class", "form-group");      //清除红框
    $("div" + modal_id + " td").parents("tr").remove();         //删除所有tr
    $(modal_id + "_tab_2Active").removeClass("active");             //删除模态框第二页的活动状态
    $(modal_id + "_tab_1Active").attr("class", "active");           //
    $(modal_id + "_tab_2").attr("class", "tab-pane");               //
    $(modal_id + "_tab_1").attr("class", "tab-pane active");        //默认活动页面选中模态框的第一个页面
    $("#tree_edit").remove();                                    //修改时能修改的ztree删除  
    var test123 = modal_id + "_adddescription";                 //描述删除
    $(test123).val("");
    // $("#alert_warning").remove();
    //console.log($("div#plusModal input").val());
}
// var count = 0;
// var count2 = 0;

//修改模型信息的处理方法
function editModule(row_id, registerStatus) {
    // count2++;
    // console.log("count2:"+count2);
    // alert(row_id);
    //获取点中行的模型信息
    var categoryid = "";        //创建模态ID
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ywsjglprj/model/getModelInfoInner/" + row_id,           //获得选中行的信息
        contentType: "application/json;charset=UTF-8",

        dataType: "text",
        success: function (result) {
            if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {            //成功就把模型信息填入模态框
                var jsonArry = JSON.parse(result);
                $("#editModal_addbmid").val(jsonArry.data[0].bmid);
                $("#editModal_addname").val(jsonArry.data[0].name);
                $("#editModal_addenName").val(jsonArry.data[0].enName);
                $("#editModal_addcode").val(jsonArry.data[0].code);
                $("#editModal_adddescription").val(jsonArry.data[0].description);
                $.each(jsonArry.data[0].fields, function (index, obj) {
                    var tr1 = "<tr><td align='center' ><button type='button' class='btn btn-default btn-xs'onclick='deletetr(this)'><i class='fa fa-close'></i></button>";
                    var tr2 = "&nbsp;<button type='button' class='btn btn-default btn-xs'onclick='checkUorD(this,\"MoveUp\")'><i class='fa fa-arrow-up'></i></button>"
                    var tr3 = "&nbsp;<button type='button' class='btn btn-default btn-xs'onclick='checkUorD(this,\"MoveDown\")'><i class='fa fa-arrow-down'></i></button>"
                    var newSecurity = "</td><td align='center'><select id='editModal_security" + index + "' style='height:26px'> <option value='1'>公开</option> <option value='2'>内部</option> <option value='3'>秘密</option> <option value='4'>机密</option> <option value='5'>绝密</option> </select>"
                    var newName = "</td><td  id='editModal_name" + index + "' width=15% onclick='tdclick(this)'>"
                    var newEnName = "</td><td id='editModal_enName" + index + "'  width=15% onclick='tdclick(this)'>"
                    var newCode = "</td><td  id='editModal_code" + index + "' width=10% onclick='tdclick(this)'>"
                    var newDefination = "</td><td  id='editModal_defination" + index + "' width=10% onclick='tdclick(this)'>"
                    var newType = "</td><td  align='center'><select id='editModal_type" + index + "' style='height:26px'> <option>字符串</option> <option>整数</option> <option>浮点型</option> <option>日期</option> </select>"
                    var newMaxsize = "</td><td  id='editModal_maxSize" + index + "' width=10% onclick='tdclick(this)'>"
                    var newRange = "</td><td  id='editModal_range" + index + "' width=10% onclick='tdclick(this)'>"
                    var newRequired = "</td><td  align='center'><label> <input id='editModal_required" + index + "' type='checkbox' class='minimal' > </label>"
                    var newUnique = "</td><td align='center'><label> <input id='editModal_unique" + index + "' type='checkbox' class='minimal'> </label>"
                    var newMaxContains = "</td><td id='editModal_maxContains" + index + "' width=10% onclick='tdclick(this)'>"
                    var newcomments = "</td><td id='editModal_comments" + index + "' width=10% onclick='tdclick(this)'>"
                    // var newPxh = "</td><td id='editModal_pxh" + index + "' width=10% onclick='tdclick(this)'>"
                    var tr = tr1 + tr2 + tr3 + newSecurity + newName + newEnName + newCode + newDefination + newType + newMaxsize + newRange + newRequired + newUnique + newMaxContains + newcomments + "</td></tr>";
                    $("#editModal_mytable").append(tr);
                    $("#editModal_security" + index + " option[value='" + obj.security + "']").attr("selected", "selected");
                    $("#editModal_name" + index).text(obj.name);
                    $("#editModal_enName" + index).text(obj.enName);
                    $("#editModal_code" + index).text(obj.code);
                    $("#editModal_defination" + index).text(obj.defination);
                    $("#editModal_type" + index + " option:contains('" + obj.type + "')").attr("selected", "selected");
                    $("#editModal_maxSize" + index).text(obj.maxsize);
                    $("#editModal_range" + index).text(obj.range);
                    //$("#editModal_required"+index).checked=obj.required;
                    $("#editModal_required" + index).prop("checked", obj.required);
                    // console.log(obj.required);
                    // var editModal_required_test="editModal_required"+index;
                    // document.getElementById(editModal_required_test).checked=obj.required;
                    $("#editModal_unique" + index).prop("checked", obj.unique);
                    $("#editModal_maxContains" + index).text(obj.maxContains);
                    $("#editModal_comments" + index).text(obj.comments);
                    // $("#editModal_pxh" + index).text(obj.pxh);

                });
                // console.log($("#editModal_addbmid").val());
                if (jsonArry.data[0].registerStatus == "已注册") {              //如果是已经注册的就不允许改动code，并且形成可编辑的ztree
                    $("#editModal_addcode").attr("readonly", "readonly");
                    $("#yzcts").remove();
                    $("#editModal_header").append("<span id ='yzcts' style='color:red'>(此模型已注册，修改提交后需等待审批)</span>");
                    var category = "<div id='tree_edit' class='row'><div class='col-md-12'><label>注册的目录</label><div class='direct-chat-messages'><ul id='treeDemo_edit' class='ztree'></ul></div></div></div>"
                    $("#ztree_edit").append(category);
                    var setting =
                        {
                            view: {
                                dblClickExpand: false,
                                showLine: true,  //是否显示节点间的连线  
                                selectedMulti: false,
                                expandSpeed: "fast",
                                selectMulti: false//表示禁止多选  
                            },
                            callback: {
                                //onClick: onClick,
                                onCheck: onCheck,
                                //beforeClick: zTreeBeforeClick
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
                        $.fn.zTree.init($("#treeDemo_edit"), setting, treeData);
                        var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo_edit");
                        var node = zTree_Menu.getNodeByParam("id", jsonArry.data[0].categoryId);
                        zTree_Menu.selectNode(node, true)//指定选中ID的节点
                        zTree_Menu.checkNode(node, true, true)//指定选中ID的节点  
                        zTree_Menu.expandNode(node, true, true);//指定选中ID节点展开
                        categoryid = jsonArry.data[0].categoryId;
                    });
                    // function zTreeBeforeClick(treeId, treeNode, clickFlag) {
                    //     return !treeNode.isParent;//当是父节点 返回false 不让选取
                    // };


                    // function onClick(e, treeId, treeNode) {
                    //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    //     zTree.checkNode(treeNode, !treeNode.checked, null, true);
                    //     return false;
                    // }

                    function onCheck(e, treeId, treeNode) {
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo_edit"),
                            nodes = zTree.getCheckedNodes(true);
                        var name = "", id = "";
                        for (var i = 0, l = nodes.length; i < l; i++) {
                            name = nodes[i].name;
                            categoryid = nodes[i].id;
                        }


                        console.log(categoryid);

                    }
                } else {
                    $("#editModal_addcode").removeAttr("readonly");
                    $("#tree_edit").remove();
                    $("#yzcts").remove();
                }
            } else {
                //错误的话检测错误提示框是否已经存在
                // $("#danger_alert_getmodule").remove();

                // var alertWarning_add = "<div id='danger_alert_getmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>获取模型失败:" + JSON.parse(result).message + "</br>" + "</div>"
                // $("#edit_modal_1").prepend(alertWarning_add);
                // $("#danger_alert_getmodule").delay(3000).hide(0);
                spop({
                    template: JSON.parse(result).message,
                    position  : 'top-center',
                    style: 'error',
                    // autoclose: 3000
                });
            };
        }
    });
    $("#editModal_addmodule_but").unbind();                 //解除之前点击绑定的click事件
    $("#editModal_addmodule_but").click(function () {           //点击提交后的事件处理


        var updataModule = addmodule('#editModal', '#editModal_mytable');           //得到模态框的所填信息JSON字符串
        // console.log(updataModule.substr(1, updataModule.length ));
        if (updataModule == null) {                //判断信息是否有问题
        //     var alertWarning_add = "<div id='danger_alert_editmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>修改模型失败:请检查所填信息是否有误</div>"

        //     $("#edit_modal_1").prepend(alertWarning_add);
        //     $("#danger_alert_editmodule").delay(2000).hide(0);

        // } else if (updataModule == null && $("#danger_alert_editmodule").length != 0) {         //信息有问题并且提示框已经存在就不再新建
        //     $("#danger_alert_editmodule").show(0);
        //     $("#danger_alert_editmodule").delay(2000).hide(0);
        spop({
            template: '请检查所填信息是否有误',
            position  : 'top-center',
            style: 'error',
            // autoclose: 3000
        });
        } else {
            // count++;
            // console.log(count);
            var addUpdata = updataModule.substr(1, updataModule.length);            //把要更新的模型的id加上

            if (categoryid != null || categoryid != "") {
                var updataModuleJSON = "{\"" + "id\":\"" + row_id + "\",\"categoryId\":\"" + categoryid + "\"," + addUpdata;
            } else {
                var updataModuleJSON = "{\"" + "id\":\"" + row_id + "\"," + addUpdata;
            }
            // console.log(updataModule);
            $.ajax({                                        //ajax处理
                type: "PUT",
                url: "http://localhost:8080/ywsjglprj/model/update",
                contentType: "application/json;charset=UTF-8",
                data: updataModuleJSON,
                dataType: "text",
                success: function (result) {
                    if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                        // $("#success_alert_updatemodule").remove();
                        cleanaddmodule('#editModal');                       //成功就清除模态框，弹框成功
                        table1Update();
                        table2Update();
                        if (registerStatus == "已注册") {
                            // var alertWarning_add = "<div id='success_alert_updatemodule' class='alert alert-warning alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>请等待管理员审核。</div>"

                            // $("#tab_top").prepend(alertWarning_add);
                            // $("#success_alert_updatemodule").delay(3000).hide(0);
                            // top_alert("warning", "请等待管理员审核。");
                            spop({
                                template: '已提交请等待审核。',
                                position  : 'top-center',
                                style: 'warning',
                                autoclose: 3000
                            });
                        } else {
                            // var alertWarning_add = "<div id='success_alert_updatemodule' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>修改模型成功。</div>"

                            // $("#tab_top").prepend(alertWarning_add);
                            // $("#success_alert_updatemodule").delay(3000).hide(0);
                            // top_alert("success", "修改模型成功。");
                            spop({
                                template: '修改模型成功。',
                                position  : 'top-center',
                                style: 'success',
                                autoclose: 3000
                            });
                        }
                        // console.log($("#editModal_addbmid").val());
                    } else {
                        //失败就弹框失败，显示失败信息
                        // $("#danger_alert_updatemodule").remove();

                        // var alertWarning_add = "<div id='danger_alert_updatemodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>修改模型失败:" + JSON.parse(result).message + "</br>" + "</div>"
                        // $("#edit_modal_1").prepend(alertWarning_add);
                        // $("#danger_alert_updatemodule").delay(3000).hide(0);
                        spop({
                            template: JSON.parse(result).message,
                            position  : 'top-center',
                            style: 'error',
                            // autoclose: 3000
                        });
                    }
                },

                // complete: function(XMLHttpRequest, textStatus){  
                //     alert(XMLHttpRequest.responseText);  
                //     alert(textStatus);  
                //      //HideLoading();  
                //  },  

                error: function (XMLHttpRequest, textStatus) {
                    // if ($("#danger_alert_updatemodule").length != 0) {
                    //     $("#danger_alert_updatemodule").remove();
                    // }
                    // var alertWarning_add = "<div id='danger_alert_updatemodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>修改模型失败:" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>" + "</div>"

                    // $("#edit_modal_1").prepend(alertWarning_add);
                    // $("#danger_alert_updatemodule").delay(3000).hide(0);
                    spop({
                        template: textStatus,
                        position  : 'top-center',
                        style: 'error',
                        // autoclose: 3000
                    });
                }
            });



        }

    });

};
//删除模型的处理方法
function deleteThisRowPapser(id, registerStatus) {
    if(registerStatus == "已注册"){
        $("#yzcts").remove();
        $("#modal_enter_header").append("<span id ='yzcts' style='color:red'>(此模型已注册，删除提交后需等待审批)</span>");
    }else{
        $("#yzcts").remove();
    }
    $("#enter_delete").unbind();    //清除绑定的点击事件
    $("#enter_delete").click(function () {          //点击确定删除时的处理方法
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/ywsjglprj/model/delete/" + id,
            contentType: "application/json;charset=UTF-8",
            // data: updataModuleJSON,
            dataType: "text",
            success: function (result) {
                if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {        //成功模态框消失，并更新datatable
                    $("#modal_enter").modal('hide');
                    // $("#success_alert_delete").remove();
                    table1Update();
                    table2Update();
                    if (registerStatus == "已注册") {
                        // var alertWarning_add = "<div id='success_alert_delete' class='alert alert-warning alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>请等待管理员审核。</div>"

                        // $("#tab_top").prepend(alertWarning_add);
                        // $("#success_alert_delete").delay(3000).hide(0);
                        
                        // top_alert("warning", "请等待管理员审核。");
                        spop({
                            template: '已提交请等待审核。',
                            position  : 'top-center',
                            style: 'warning',
                            autoclose: 3000
                        });
                    } else {
                        // var alertWarning_add = "<div id='success_alert_delete' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>删除模型成功。</div>"

                        // $("#tab_top").prepend(alertWarning_add);
                        // $("#success_alert_delete").delay(3000).hide(0);
                        // top_alert("success", "删除模型成功。");
                        // $("#yzcts").remove();
                        spop({
                            template: '删除模型成功。',
                            position  : 'top-center',
                            style: 'success',
                            autoclose: 3000
                        });
                    }

                    // console.log($("#editModal_addbmid").val());
                } else {
                    // $("#danger_alert_delete").remove();                                               //失败模态框消失，并提示错误信息
                    $("#modal_enter").modal('hide');
                    // var alertWarning_add = "<div id='danger_alert_delete' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>修改模型失败:" + JSON.parse(result).message + "</div>"
                    // $("#tab_top").prepend(alertWarning_add);
                    // $("#danger_alert_delete").delay(3000).hide(0);
                    // top_alert("danger", "删除模型失败：" + JSON.parse(result).message);
                    spop({
                        template: JSON.parse(result).message,
                        position  : 'top-center',
                        style: 'error',
                        // autoclose: 3000
                    });
                }
            },

            // complete: function(XMLHttpRequest, textStatus){  
            //     alert(XMLHttpRequest.responseText);  
            //     alert(textStatus);  
            //      //HideLoading();  
            //  },  

            error: function (XMLHttpRequest, textStatus) {  //失败模态框消失，并提示错误信息
                // alert(XMLHttpRequest.responseText);  
                // alert(textStatus);  
                $("#modal_enter").modal('hide');
                // var alertWarning_add = "<div id='danger_alert' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>删除模型失败:" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>" + "</div>"

                // $("#tab_top").prepend(alertWarning_add);
                // $("#danger_alert").delay(3000).hide(0);
                // top_alert("danger", "删除模型失败：" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>");
                spop({
                    template: textStatus,
                    position  : 'top-center',
                    style: 'error',
                    // autoclose: 3000
                });
            }
        });
    });

};
//发起注册的模态框处理方法
function begin_catalog(row_id) {
    //$("#fdasjglkashgdka").remove();
    var setting =
        {
            view: {
                dblClickExpand: false,      //双击节点时，是否自动展开父节点的标识
                showLine: true,  //是否显示节点间的连线  
                selectedMulti: false,      // 设置是否允许同时选中多个节点
                expandSpeed: "fast",        //zTree 节点展开、折叠时的动画速度
                selectMulti: false//表示禁止多选  
            },
            callback: {
                //onClick: onClick,
                onCheck: onCheck,       //选中时执行的回调函数
                //beforeClick: zTreeBeforeClick
            },
            check: {
                enable: true,           //设置 zTree 的节点上是否显示 checkbox / radio
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
                            enable: true,       //使用简单数据模式
                            idKey: "id",        //节点数据中保存唯一标识的属性名称。
                            pIdKey: "parentId", //节点数据中保存其父节点唯一标识的属性名称。
                            rootPId: "0"         //根目录的属性值
                        }
                }
        }
    //加载树的资源    

    $.get("http://localhost:8080/ywsjglprj/category/getAllCategorys", null, function (resourceInfo) {
        //核心代码，将查询到的信息存放到setting格式的tree中  
        var treeData = resourceInfo.data;
        $.fn.zTree.init($("#treeDemo"), setting, treeData);
    });
    // function zTreeBeforeClick(treeId, treeNode, clickFlag) {
    //     return !treeNode.isParent;//当是父节点 返回false 不让选取
    // };


    // function onClick(e, treeId, treeNode) {
    //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    //     zTree.checkNode(treeNode, !treeNode.checked, null, true);
    //     return false;
    // }
    var categoryid = "";
    function onCheck(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            nodes = zTree.getCheckedNodes(true);
        var name = "", id = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            name = nodes[i].name;
            categoryid = nodes[i].id;
        }


        console.log(categoryid);

    }
    $("#cataModal_module_but").unbind();        //解除绑定的注册按钮事件
    $("#cataModal_module_but").click(function () {      //确认注册按钮的执行函数
        if (categoryid == null || categoryid == "") {       //空的categoryid
            $("#danger_alert_registmodule").remove();
            var alertWarning_add = "<div id='danger_alert_registmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>模型注册失败:请选择一个模型注册的目录</div>"
            $("#cataModal_body").prepend(alertWarning_add);
            $("#danger_alert_registmodule").delay(3000).hide(0);
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ywsjglprj/model/registerInner/" + row_id + "/" + categoryid,
                contentType: "application/json;charset=UTF-8",
                dataType: "text",
                success: function (result) {
                    if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                        $("#cataModal").modal('hide');                          //隐藏模态框
                        $("#danger_alert_registmodule").remove();                  // 成功就把之前的提示框删除
                        // $("#success_alert_registmodule").remove();                  //之前成功的提示框也删除好创建新的

                        table2Update();
                        table1Update();                                        //table1重新加载
                        $.get("http://localhost:8080/ywsjglprj/category/getAllCategorys", null, function (resourceInfo) {       //还原tree
                            //核心代码，将查询到的信息存放到setting格式的tree中  
                            var treeData = resourceInfo.data;
                            $.fn.zTree.init($("#treeDemo"), setting, treeData);
                        });

                        // var alertWarning_add = "<div id='success_alert_registmodule' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>模型提交注册成功，请等待请等待审批。</div>"

                        // $("#tab_top").prepend(alertWarning_add);
                        // $("#success_alert_registmodule").delay(3000).hide(0);
                        top_alert("success", "模型提交注册成功，请等待请等待审批。");
                    } else {
                        // 判断失败的提示框是否存在
                        $("#danger_alert_registmodule").remove();

                        var alertWarning_add = "<div id='danger_alert_registmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>模型注册失败:" + JSON.parse(result).message + "</br>" + "</div>"
                        $("#cataModal_body").prepend(alertWarning_add);
                        $("#danger_alert_registmodule").delay(3000).hide(0);
                    }




                },

                error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题
                    if ($("#danger_alert_registmodule").length != 0) {
                        $("#danger_alert_registmodule").remove();
                    }
                    var alertWarning_add = "<div id='danger_alert_registmodule' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>模型注册失败:" + XMLHttpRequest.responseText + "<br>" + textStatus + "</br>" + "</div>"

                    $("#cataModal_body").prepend(alertWarning_add);
                    $("#danger_alert_registmodule").delay(3000).hide(0);
                }
            });
        }

    });

}


//top提示框的执行函数
function top_alert(status, content) {
    $("#top_alert").remove();   //不管存在不存在都删除上一个提示框
    var top_alert = ""
    if (status == "success") {
        top_alert = "<div id='top_alert' class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>" + content + "</div>";
    } else if (status == "danger") {
        top_alert = "<div id='top_alert' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>" + content + "</br>" + "</div>";
    } else if (status == "warning") {
        top_alert = "<div id='top_alert' class='alert alert-warning alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check'></i> 成功!</h4>请等待管理员审核。</div>"
    }
    $("#tab_top").prepend(top_alert);
    $("#top_alert").delay(3000).hide(0);        //提示框出现3秒消失
}

function checkUorD(t, oper) {
    var data_tr = $(t).parent().parent(); //获取到触发的tr  
    if (oper == "MoveUp") {    //向上移动  
        //console.log($(data_tr).prev().html());
        if ($(data_tr).prev().prev().html() == null) { //获取tr的前一个相同等级的元素是否为空  
            $("#parent_alert").remove();
            var parent_alert = "<div id='parent_alert' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>此行已是第一行</br>" + "</div>";
            $(data_tr).parents(".modal-body").prepend(parent_alert);
            $("#parent_alert").delay(3000).hide(0);        //提示框出现3秒消失
            return;
        } {
            $(data_tr).insertBefore($(data_tr).prev()); //将本身插入到目标tr的前面   
        }
    } else {
        if ($(data_tr).next().html() == null) {
            $("#parent_alert").remove();
            var parent_alert = "<div id='parent_alert' class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-ban'></i> 失败!</h4>此行已是最后一行</br>" + "</div>";
            $(data_tr).parents(".modal-body").prepend(parent_alert);
            $("#parent_alert").delay(3000).hide(0);        //提示框出现3秒消失
            return;
        } {
            $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面   
        }
    }
} 