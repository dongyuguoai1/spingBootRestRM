$(document).ready(function () {
    inittree();
    selectInit();
    // $('#selectCategorys').select2({
    //     // data:data,
    //     //dropdownParent: $('#cataTable'),
    //     //language: 'zh-CN',
    //     placeholder: '上级目录',
    //     disabled: true

    // });
});

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

function selectInit() {
    $('#selectCategorys').select2({
        // data:data,
        //dropdownParent: $('#cataTable'),
        //language: 'zh-CN',
        placeholder: '上级目录',
        disabled: true

    });

    // $('#selectCategorys').find("option").remove();
    $.ajax({
        type: "GET",
        url: "../category/getAllCategorys",
        contentType: "application/json;charset=UTF-8",
        // data: moduleData,
        dataType: "text",
        success: function (result) {
            if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                // console.log(JSON.parse(result).data);
                $('#selectCategorys').find("option").remove();
                //为占位符提供option
                $('#selectCategorys').append("<option></option>");
                //遍历数据源进select2选择框
                $.each(JSON.parse(result).data, function (index, obj) {
                    // data[index]="{id:"+index+",\"dbid\":\""+obj.id+"\",text:\""+obj.dbname+"\"}"
                    // data[index]=obj.dbname;
                    $('#selectCategorys').append("<option value='" + obj.id + "'>" + obj.name + "</option>");
                });

            } else {


                $.toast({
                    heading: '失败',
                    text: JSON.parse(result).message,
                    position: 'top-right',
                    showHideTransition: 'slide',
                    hideAfter: false,
                    icon: 'error',
                    bgColor: '#d34b39',
                    stack: false
                });
            }




        },

        error: function (XMLHttpRequest, textStatus) { //ajax返回失败后提示框显示问题

            $.toast({
                heading: '失败',
                text: textStatus,
                position: 'top-right',
                showHideTransition: 'slide',
                hideAfter: false,
                icon: 'error',
                bgColor: '#d34b39',
                stack: false
            });
        }
    });
}

// function selectEnter(parentId) {

//     // $('#selectCategorys').find("option").remove();
//     $.ajax({
//         type: "GET",
//         url: "../category/getAllCategorys",
//         contentType: "application/json;charset=UTF-8",
//         // data: moduleData,
//         dataType: "text",
//         success: function (result) {
//             if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
//                 // console.log(JSON.parse(result).data);
//              $('#selectCategorys').find("option").remove();
//                 //为占位符提供option
//                 $('#selectCategorys').append("<option></option>");
//                 //遍历数据源进select2选择框
//                 $.each(JSON.parse(result).data, function (index, obj) {
//                     // data[index]="{id:"+index+",\"dbid\":\""+obj.id+"\",text:\""+obj.dbname+"\"}"
//                     // data[index]=obj.dbname;
//                     $('#selectCategorys').append("<option value='" + obj.id + "'>" + obj.name + "</option>");
//                 });
//                 $('#selectCategorys').val(parentId).select2();
//             } else {


//                 $.toast({
//                     heading: '失败',
//                     text: JSON.parse(result).message,
//                     position: 'top-right',
//                     showHideTransition: 'slide',
//                     hideAfter: false,
//                     icon: 'error',
//                     bgColor: '#d34b39',
//                     stack: false
//                 });
//             }




//         },

//         error: function (XMLHttpRequest, textStatus) {              //ajax返回失败后提示框显示问题

//             $.toast({
//                 heading: '失败',
//                 text: textStatus,
//                 position: 'top-right',
//                 showHideTransition: 'slide',
//                 hideAfter: false,
//                 icon: 'error',
//                 bgColor: '#d34b39',
//                 stack: false
//             });
//         }
//     });
// }

function inittree() {
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
                    //table1.ajax.url("../label_api/resources/" + data.id).load();
                    $("#addSubCategory").attr("onclick", "addSubCategory(\"" + data.id + "\")");
                    $("#editCategory").attr("onclick", "editCategory(\"" + data.id + "\")");
                    $("#delectCategory").attr("onclick", "delectCategory(\"" + data.id + "\")");

                    getCategoryInfo(data.id);


                },
                // levels: 5,
                multiSelect: false,
                showTags: true
            });
        },
        dataType: "text"
    });
};


function getCategoryInfo(categoryid) {
    console.log("test")
    $.ajax({
        type: "GET",
        url: "../category/getCategory/" + categoryid,
        contentType: "application/json;charset=UTF-8",
        //data: moduleData,
        dataType: "text",
        success: function (result) {
            console.log("ajax")
            if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                var jsonArry = JSON.parse(result);
                // selectInit();
                $("#selectCategorys").val(jsonArry.data[0].parentId).select2();
                $("#categoryName").val(jsonArry.data[0].name);
                $("#categoryBMid").val(jsonArry.data[0].bmid);
                $("#categorypxh").val(jsonArry.data[0].pxh);
                $("#categoryCreateTime").val(jsonArry.data[0].createTime);
                $("#categoryCreator").val(jsonArry.data[0].creator);
                //var disabledOption = "#selectCategorys option[value='" + categoryid + "']";
                // $("#selectCategorys option").removeProp('disabled');
                // $("#selectCategorys").select2();

                $("#selectCategorys").select2({

                    disabled: true

                });
                $("#categoryName").attr("disabled", "disabled");
                $("#categoryBMid").attr("disabled", "disabled");
                $("#categorypxh").attr("disabled", "disabled");
                $("#box_footer").html("");
                $("#addSubCategory").attr("class", "btn btn-default");
                $("#editCategory").attr("class", "btn btn-default");
                $("#delectCategory").attr("class", "btn btn-default");
            } else {

                $.toast({
                    heading: '失败',
                    text: JSON.parse(result).message,
                    position: 'top-right',
                    showHideTransition: 'slide',
                    hideAfter: false,
                    icon: 'error',
                    bgColor: '#d34b39',
                    stack: false
                });
            }




        },

        error: function (XMLHttpRequest, textStatus) { //ajax返回失败后提示框显示问题

            $.toast({
                heading: '失败',
                text: textStatus,
                position: 'top-right',
                showHideTransition: 'slide',
                hideAfter: false,
                icon: 'error',
                bgColor: '#d34b39',
                stack: false
            });
        }
    });
}

function addSubCategory(categoryid) {
    $("#box_footer").html("<button type='button' class='btn btn-default' id='reblack'><i class='fa fa-reply'>&nbsp;取消</i></button> <button type='button' class='btn btn-primary' id='submit'><i class='fa fa-save'>&nbsp;保存</i></button>");
    $("#reblack").attr("onclick", "getCategoryInfo(\"" + categoryid + "\")");
    $("#submit").attr("onclick", "addSubmit()");
    $("#addSubCategory").attr("class", "btn btn-primary");
    // $("#addSubCategory").attr("class", "btn btn-default");
    $("#editCategory").attr("class", "btn btn-default");
    $("#delectCategory").attr("class", "btn btn-default");
    //$("#submit").attr("onclick", "getCategoryInfo(\""+categoryid+"\")");
    $("#selectCategorys").val(categoryid).select2({
        disabled: true
    });
    $("form").find("input").val("");
    $("#categoryName").removeAttr("disabled");
    $("#categoryBMid").removeAttr("disabled");
    $("#categorypxh").removeAttr("disabled");
};

function editCategory(categoryid) {
    //getCategoryInfo(categoryid);
    if (categoryid == "0") {
        $.toast({
            heading: '失败',
            text: '根目录不能被修改。',
            position: 'top-right',
            showHideTransition: 'slide',
            hideAfter: false,
            icon: 'error',
            bgColor: '#d34b39',
            stack: false
        });
    } else {
        $.ajax({
            type: "GET",
            url: "../category/getCategory/" + categoryid,
            contentType: "application/json;charset=UTF-8",
            //data: moduleData,
            dataType: "text",
            success: function (result) {
                console.log("ajax")
                if (JSON.parse(result).resultCode == "RESULT_SUCCESS") {
                    var jsonArry = JSON.parse(result);
                    // selectInit();
                    $("#selectCategorys").val(jsonArry.data[0].parentId).select2();
                    $("#categoryName").val(jsonArry.data[0].name);
                    $("#categoryBMid").val(jsonArry.data[0].bmid);
                    $("#categorypxh").val(jsonArry.data[0].pxh);
                    $("#categoryCreateTime").val(jsonArry.data[0].createTime);
                    $("#categoryCreator").val(jsonArry.data[0].creator);
                    //var disabledOption = "#selectCategorys option[value='" + categoryid + "']";
                    // $("#selectCategorys option").removeProp('disabled');
                    // $("#selectCategorys").select2();

                } else {

                    $.toast({
                        heading: '失败',
                        text: JSON.parse(result).message,
                        position: 'top-right',
                        showHideTransition: 'slide',
                        hideAfter: false,
                        icon: 'error',
                        bgColor: '#d34b39',
                        stack: false
                    });
                }




            },

            error: function (XMLHttpRequest, textStatus) { //ajax返回失败后提示框显示问题

                $.toast({
                    heading: '失败',
                    text: textStatus,
                    position: 'top-right',
                    showHideTransition: 'slide',
                    hideAfter: false,
                    icon: 'error',
                    bgColor: '#d34b39',
                    stack: false
                });
            }
        });
        //getCategoryInfo(categoryid);
        $("#box_footer").html("<button type='button' class='btn btn-default' id='reblack'><i class='fa fa-reply'>&nbsp;取消</i></button> <button type='button' class='btn btn-primary' id='submit'><i class='fa fa-save'>&nbsp;保存</i></button>");
        $("#reblack").attr("onclick", "getCategoryInfo(\"" + categoryid + "\")");
        $("#submit").attr("onclick", "editSubmit(\"" + categoryid + "\")");
        $("#editCategory").attr("class", "btn btn-primary");
        $("#addSubCategory").attr("class", "btn btn-default");
        // $("#editCategory").attr("class", "btn btn-default");
        $("#delectCategory").attr("class", "btn btn-default");

        $("#categoryName").removeAttr("disabled");
        $("#categoryBMid").removeAttr("disabled");
        $("#categorypxh").removeAttr("disabled");
        //var disabledOption="[value="+categoryid+"]"
        // console.log($("option").find(disabledOption)) ;
        // var disabledOption = "#selectCategorys option[value='" + categoryid + "']";
        // $(disabledOption).prop('disabled', true);
        $("#selectCategorys").select2({

            disabled: false

        });
    }

};

function delectCategory(categoryid) {
    // $("#box_footer").html("<button type='button' class='btn btn-default' ><i class='fa fa-reply'>&nbsp;取消</i></button> <button type='button' class='btn btn-primary'><i class='fa fa-save'>&nbsp;保存</i></button>");


    if (categoryid == "0") {
        $.toast({
            heading: '失败',
            text: '根目录不能被删除。',
            position: 'top-right',
            showHideTransition: 'slide',
            hideAfter: false,
            icon: 'error',
            bgColor: '#d34b39',
            stack: false
        });
    } else {
        $("#delectCategory").attr("data-toggle", "modal");
        $("#delectCategory").attr("data-target", "#modal_enter");
        $("#enter_delete").unbind(); //清除绑定的点击事件
        $("#enter_delete").click(function () { //点击确定删除时的处理方法
            $.ajax({
                type: "DELETE",
                url: "../category/deleteCategory/" + categoryid,
                contentType: "application/json;charset=UTF-8",
                // data: updataModuleJSON,
                dataType: "text",
                success: function (result) {
                    if (JSON.parse(result).resultCode == "RESULT_SUCCESS") { //成功模态框消失，并更新datatable
                        $("#modal_enter").modal('hide');


                        $.toast({
                            heading: '成功',
                            text: '删除目录成功。',
                            position: 'top-right',
                            showHideTransition: 'slide',
                            // hideAfter: false,
                            icon: 'success',
                            bgColor: '#00a65a',
                            stack: false
                        });
                        inittree();

                    } else {

                        $("#modal_enter").modal('hide');

                        $.toast({
                            heading: '失败',
                            text: JSON.parse(result).message,
                            position: 'top-right',
                            showHideTransition: 'slide',
                            hideAfter: false,
                            icon: 'error',
                            bgColor: '#d34b39',
                            stack: false
                        });
                    }
                },


                error: function (XMLHttpRequest, textStatus) { //失败模态框消失，并提示错误信息

                    $("#modal_enter").modal('hide');

                    $.toast({
                        heading: '失败',
                        text: textStatus,
                        position: 'top-right',
                        showHideTransition: 'slide',
                        hideAfter: false,
                        icon: 'error',
                        bgColor: '#d34b39',
                        stack: false
                    });
                }
            });
        });
    }
};

function addSubmit() {
    var addJson = {};
    addJson.name = $("#categoryName").val();
    addJson.parentId = $("#selectCategorys").val();
    addJson.bmid = $("#categoryBMid").val();
    addJson.pxh = $("#categorypxh").val();
    addJson = categoryJsontest(addJson);
    if (addJson == null || addJson == "") {
        return null;
    } else {
        $.ajax({
            type: "POST",
            url: "../category/create",
            // data: tableModuleJSON,
            data: JSON.stringify(addJson),
            contentType: "application/json;charset=UTF-8",
            dataType: "text",
            success: function (result2) {
                if (JSON.parse(result2).resultCode == "RESULT_SUCCESS") {
                    var jsonArry = JSON.parse(result2);
                    $.toast({
                        heading: '成功',
                        text: '添加目录成功。',
                        position: 'top-right',
                        showHideTransition: 'slide',
                        // hideAfter: false,
                        icon: 'success',
                        bgColor: '#00a65a',
                        stack: false
                    });
                    inittree();
                    //selectEnter(jsonArry.data[0].parentId);
                    $('#selectCategorys').append("<option value='" + jsonArry.data[0].id + "'>" + jsonArry.data[0].name + "</option>");
                    $("#selectCategorys").val(jsonArry.data[0].parentId).select2();
                    $("#categoryName").val(jsonArry.data[0].name);
                    $("#categoryBMid").val(jsonArry.data[0].bmid);
                    $("#categorypxh").val(jsonArry.data[0].pxh);
                    $("#categoryCreateTime").val(jsonArry.data[0].createTime);
                    $("#categoryCreator").val(jsonArry.data[0].creator);
                    $("#categoryName").attr("disabled", "disabled");
                    $("#categoryBMid").attr("disabled", "disabled");
                    $("#categorypxh").attr("disabled", "disabled");
                    $("#box_footer").html("");
                } else {

                    $.toast({
                        heading: '失败',
                        text: JSON.parse(result2).message,
                        position: 'top-right',
                        showHideTransition: 'slide',
                        hideAfter: false,
                        icon: 'error',
                        bgColor: '#d34b39',
                        stack: false
                    });
                }




            },

            error: function (XMLHttpRequest, textStatus) { //ajax返回失败后提示框显示问题

                $.toast({
                    heading: '失败',
                    text: textStatus,
                    position: 'top-right',
                    showHideTransition: 'slide',
                    hideAfter: false,
                    icon: 'error',
                    bgColor: '#d34b39',
                    stack: false
                });
            }
        });
    }


}

function editSubmit(categoryid) {
    console.log(categoryid);

    var addJson = {};
    addJson.id = categoryid;
    addJson.name = $("#categoryName").val();
    addJson.parentId = $("#selectCategorys").val();
    addJson.bmid = $("#categoryBMid").val();
    addJson.pxh = $("#categorypxh").val();
    addJson = categoryJsontest(addJson);
    if (addJson == null || addJson == "") {
        return null;
    } else {
        $.ajax({
            type: "POST",
            url: "../category/updateCategory",
            // data: tableModuleJSON,
            data: JSON.stringify(addJson),
            contentType: "application/json;charset=UTF-8",
            dataType: "text",
            success: function (result2) {
                if (JSON.parse(result2).resultCode == "RESULT_SUCCESS") {
                    var jsonArry = JSON.parse(result2);
                    $.toast({
                        heading: '成功',
                        text: '修改目录成功。',
                        position: 'top-right',
                        showHideTransition: 'slide',
                        // hideAfter: false,
                        icon: 'success',
                        bgColor: '#00a65a',
                        stack: false
                    });
                    inittree();
                    //selectInit();
                    //selectEnter(jsonArry.data[0].parentId);
                    // $("#selectCategorys").val(jsonArry.data[0].parentId).select2();
                    var delectOption = "#selectCategorys option[value=" + categoryid + "]";
                    $(delectOption).remove();
                    $('#selectCategorys').append("<option value='" + categoryid + "'>" + jsonArry.data[0].name + "</option>");
                    $("#selectCategorys").val(jsonArry.data[0].parentId).select2();
                    $("#categoryName").val(jsonArry.data[0].name);
                    $("#categoryBMid").val(jsonArry.data[0].bmid);
                    $("#categorypxh").val(jsonArry.data[0].pxh);
                    $("#categoryCreateTime").val(jsonArry.data[0].createTime);
                    $("#categoryCreator").val(jsonArry.data[0].creator);
                    $("#categoryName").attr("disabled", "disabled");
                    $("#categoryBMid").attr("disabled", "disabled");
                    $("#categorypxh").attr("disabled", "disabled");
                    $("#box_footer").html("");
                    // $("#selectCategorys option").removeProp('disabled');
                    // $("#selectCategorys").select2();
                    $("#selectCategorys").select2({

                        disabled: true

                    });
                } else {

                    $.toast({
                        heading: '失败',
                        text: JSON.parse(result2).message,
                        position: 'top-right',
                        showHideTransition: 'slide',
                        hideAfter: false,
                        icon: 'error',
                        bgColor: '#d34b39',
                        stack: false
                    });
                }




            },

            error: function (XMLHttpRequest, textStatus) { //ajax返回失败后提示框显示问题

                $.toast({
                    heading: '失败',
                    text: textStatus,
                    position: 'top-right',
                    showHideTransition: 'slide',
                    hideAfter: false,
                    icon: 'error',
                    bgColor: '#d34b39',
                    stack: false
                });
            }
        });
    }

}

function categoryJsontest(categoryJson) {
    var re = /^(-)?\d+(\.\d+)?$/;
    if (categoryJson.name == "" || categoryJson.name == null) {
        $.toast({
            heading: '失败',
            text: '目录名称不能为空。',
            position: 'top-right',
            showHideTransition: 'slide',
            hideAfter: false,
            icon: 'error',
            bgColor: '#d34b39',
            stack: false
        });
        return null;
        //console.log("test")
    } else if (categoryJson.pxh == "" || categoryJson.pxh == null) {
        categoryJson.pxh = 1;
        return categoryJson;
    } else if (!re.test(categoryJson.pxh)) {
        $.toast({
            heading: '失败',
            text: '排序号只能为数字。',
            position: 'top-right',
            showHideTransition: 'slide',
            hideAfter: false,
            icon: 'error',
            bgColor: '#d34b39',
            stack: false
        });
        return null;
    } else {
        return categoryJson;
    }
}