//格式转换
var myFormatConversion;
 
myFormatConversion = {
    formatterDateTime: function (date) {
        var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    },
    /**
     * 毫秒转时间格式
     */
    longMsTimeConvertToDateTime: function (time) {
        var myDate = new Date(time);
        return this.formatterDateTime(myDate);
    },
    //时间格式转换函数
    timeconv: function (data) {
        var dataConv = this.longMsTimeConvertToDateTime(data);
        // for (var myIndex= 0; myIndex < data.length; myIndex++) {
        //     // console.log(myIndex);
        //     if (data[myIndex].hasOwnProperty("state")) data[myIndex].state=this.stateConversion(data[myIndex].state);
        //     if (data[myIndex].hasOwnProperty("createtime")) data[myIndex].createtime=this.longMsTimeConvertToDateTime(data[myIndex].createtime);
        //     if (data[myIndex].hasOwnProperty("createTime")) data[myIndex].createTime=this.longMsTimeConvertToDateTime(data[myIndex].createTime);
        // }
        // console.log(data);
        return dataConv;
    },
};

//创建有操作按钮的DT
function creatTable_Op(DTname, url) {
    //将创建的表格存放到tables变量中
    var DTtable = $(DTname).DataTable({
        //控制分页、搜索、每页显示数量、显示信息等四个插件的dom
 
        //数据传入
        "ajax": {
            "url": url,
            "dataSrc": "data", //如果是数组，那么dataSrc为""
        },
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
             { "data": null,
               "title": "<input type=\"checkbox\" id='checkAll'>",
               "createdCell": function (td, cellData, rowData, row, col)
               {
                    $(td).html("<input type='checkbox' name='checkList' value='" + cellData + "'>");
                   
               }
             },
            
            {
                "data": "code",
                "title": "编码",
 
            },
            {
                "data": "name",
                "title": "中文名称",

            },
            {
                "data": "enName",
                "title": "英文名称",

            },
            {
                "data": "createTime",
                "title": "创建时间",
            },
            {
                "data": null,
                "title": "操作",
 
                // "title": "操作",
                "render": function (data, type, row, meta) {
                    return data = '<button type="button"  style = "margin:0px;display:inline" class="btn bt_edit btn-primary btn-xs" ><i class="fa fa-pencil"></i> 编辑 </button>' +
                        ' <button type="button" style="display:inline" class="btn bt_unpass btn-danger btn-xs"><i class="fa fa-times"></i> 删除 </button>';
                }
            },
        ],
        //设置排序
        "order": [[1, 'asc']],
        //设置语言
        "language": {
            "url": "./js/DataTables.json"
        },
        
        "dom": "<'row'<'col-xs-4'l><'#mytool.col-xs-4'><'col-xs-4'f>r>" +
                    "t" +
                    "<'row'<'col-xs-6'i><'col-xs-6'p>>",
        "initComplete": function () {
                $("#mytool").append('<button id="edit_batch" type="button" class="btn bt_edit_batch btn-primary btn-xs">批量编辑</button>&nbsp');
                $("#mytool").append('<button id="save_batch" type="button" class="btn bt_save_batch btn-success btn-xs">批量保存</button>&nbsp');
                $("#mytool").append('<button id="del_batch" type="button" class="btn bt_del_batch btn-danger btn-xs" data-toggle="modal" data-target="#delWarning4delBatch">批量删除</button>&nbsp');
                $("#mytool").append('<button type="button" class="btn bt_add btn-default btn-xs" data-toggle="modal" data-target="#addData">添加</button>');
                //$("#mytool").append('<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">添加</button>');
                
                //$("#del_batch").on("click", delData);
                $("#edit_batch").on("click", Fedit_batch);
                $("#save_batch").on("click", Fsave_batch);
                
                //DIY关闭列排序
                //$("th").each(function(){
      //if($(this).has('input').length)
      //{
          //$(this).replaceWith("<th style=\"width:15px\"><input type=\"checkbox\" id='checkAll'></th>");
          
      //}
          //console.log("th_gyd");
      //console.log($(this).text());
    //});
            },
            "columnDefs": [ {
    "targets": 0,

                    "orderable" : false,
    "createdCell": function (td, cellData, rowData, row, col) {
        console.log("cell_gyd");
        console.log(row);
        console.log(rowData);
      if ( row == -1 ) {
        $(td).removeClass('sorting')
      }
    }
  } ]
            
            
        
    });//表格tables创建完毕
     return DTtable;
}
 
 
//“编辑”操作，调用服务器特定接口
//？？？？input如何自适应
$("#dt_dwsp").on("click",".btn.bt_edit.btn-primary.btn-xs",function(){
    console.log("gyd...1234");
    console.log($(this));
           console.log("button");
           var tds=$(this).parents("tr").children();
           
           $.each(tds, function(i,val){
               var jqob=$(val);
               //console.log("val_gyd");
               //console.log(val);
               if(i < 1 || jqob.has('button').length ){return true;}//跳过第1项 checkbox,按钮
               var txt=jqob.text();
               console.log("txt_gyd");
               console.log(txt);
               var put=$("<input type='text'>");
               put.val(txt);
               jqob.html(put);
           });
           //！！！！保存的时候注意：如果与原来的内容相同（且去掉空格回车），不需要发送接口请求
           $(this).replaceWith("<button type=\"button\" style = \"margin:0px;display:inline\" class=\"btn bt_save btn-success btn-xs\"  id=\"dt_save\"><i class=\"fa fa-save\"></i> 保存</button>");
           
           //console.log(tds);

       });
 


 //“保存”按钮操作
$("#dt_dwsp").on("click",".btn.bt_save.btn-success.btn-xs",function(){
    
           var row=DTtable.row($(this).parents("tr"));
           console.log("row_gyd");
           console.log(row);
           var tds=$(this).parents("tr").children();
           $.each(tds, function(i,val){
               var jqob=$(val);
               //把input变为字符串
               if(i >= 1 && !jqob.has('button').length){
                   var txt=jqob.children("input").val();
                   jqob.html(txt);
                   DTtable.cell(jqob).data(txt);//修改DataTables对象的数据
               }
           });

           var data=row.data();
           console.log("rowData_gyd");
           console.log(data);
           //！！！！遍历比较可以在这里实现

           $(this).replaceWith("<button type=\"button\"  style = \"margin:0px;display:inline\" class=\"btn bt_edit btn-primary btn-xs\" id=\"dt_edit\"><i class=\"fa fa-pencil\"></i> 编辑 </button>");
           //$(this).toggleClass("edit-btn");
           //$(this).toggleClass("save-btn");
       });
 
//“删除”操作，调用服务器特定接口




      var row4Del; 
$("#dt_dwsp").on("click",".btn.bt_unpass.btn-danger.btn-xs",function () {
    //https://v4-alpha.getbootstrap.com/components/modal/#modalshow (手动显示Modal)
    $('#delWarning4delSingle').modal('show');
    
    $('#delWarning4delSingle').on('show.bs.modal',
    function() {
        console.log("del_single");
        //？？ESC快捷键
      $("#ModalMesgSingle").text("确定删除该条数据？");  
    
    });
    //var id = $('#dt_dwsp').DataTable().row($(this).parents().parents("tr")).data().id;
    // console.log(id);
//    $.ajax({
//        async: false,
//        type: "GET",
//        dataType: "json",
//        url: "http://localhost:8080/ywsjglprj/process/unpass/" + id,
//        timeout: 3000,
//        success: function (data, status) {
//            //请求执行成功后，刷新表格
//            // UpdateDT();
//            $('#dt_dwsp').DataTable().ajax.reload();
//        }
//    });

        /**
    *“确定删除”按钮操作
    */
    row4Del = DTtable.row($(this).parents().parents("tr"));
    var code = row4Del.data().code;
    console.log("codeSingle_gyd");
    console.log(code);
});
$("#confirmDelButtonSingle").on("click",function(){
    //https://datatables.net/reference/api/rows().remove() (删除选中的多行)
    var row4Deled = row4Del
    .remove()
    .draw(false);
    console.log("delconfirm_gyd");
    //table.rows('.selected').remove().draw( false );
       });
 
 //checkbox全选 https://blog.csdn.net/homelam/article/details/79863731
 $(document).ready(function () {
 $("#checkAll").on("click", function () {
     console.log("checkAll_gyd");
     console.log($(this).prop("checked"));
    if ($(this).prop("checked")) {
        $("input[name='checkList']").prop("checked", true);
    } else {
        $("input[name='checkList']").prop("checked", false);
    }
});
});
 
//初始化网页
//$(document).ready(function () {
 
    var dwsp_url = "./txt/GMBCI3.txt";
    var dwspDT = "#dt_dwsp";
    console.log("gyd11");
    var DTtable = creatTable_Op(dwspDT, dwsp_url);
 
//});

/**
*批量删除
*/
// row dt_dwsp_wrapper
//$("#dt_dwsp").on("click",".btn.bt_save_batch.btn-success.btn-xs",function(){
    //console.log("gyd...");
//});
//http://www.runoob.com/bootstrap/bootstrap-modal-plugin.html(在Modal显示的时候doSomething的API)
//http://www.w3school.com.cn/tiy/t.asp?f=jquery_manipulation_text_set(修改元素text的方法)

$('#delWarning4delBatch').on('show.bs.modal',
    function() {
        console.log("del_batch");
        var str;
        
        //http://www.datatables.club/example/api/select_row.html (获取行数)
        var checkedNum=0;
    $("input[name='checkList']:checked").each(function (i, o) {
        
    str += $(this).val();
    str += ",";
               var code=DTtable.row($(this).parents("tr")).data().code;
           console.log("checkbox_code_gyd");
           console.log(code);
           checkedNum++;
    });
    if(checkedNum==0)
    {
      $("#ModalMesg").text("请至少选择一条数据！");  
    }
    else
    {
        $("#ModalMesg").text("将有"+checkedNum.toString()+"条数据被删除！");
    }
    
    });


    
    /**
    *“确定删除”按钮操作
    */
$("#confirmDelButton").on("click",function(){
    //https://datatables.net/reference/api/rows().remove() (删除选中的多行)
    var rows = DTtable
    .rows( $("input[name='checkList']:checked").parents("tr") )
    .remove()
    .draw(false);
    console.log("delconfirm_gyd");
    //table.rows('.selected').remove().draw( false );
       });
    
    
    
    
    /**
    *批量编辑
    */
    function Fedit_batch()
    {
        console.log("gyd...123");
        console.log($(this));
        $(".btn.bt_edit.btn-primary.btn-xs").click();
        //$(this).replaceWith("<button id=\"save_batch\" type=\"button\" class=\"btn bt_save_batch btn-success btn-xs\">批量保存</button>&nbsp")
    }
    /**
    *批量保存
    */
    function Fsave_batch()
    {
        $(".btn.bt_save.btn-success.btn-xs").click();
        //$(this).replaceWith("<button id=\"edit_batch\" type=\"button\" class=\"btn bt_edit_batch btn-primary btn-xs\">批量编辑</button>&nbsp")
    }
MDTable = $('#dt_addData').DataTable(
{
    
    "searching":false, //去掉搜索框
    "bLengthChange":false,//去掉每页多少条框体 
    "language": {
            "url": "./js/DataTables.json"
        },
        "destroy":true, //Cannot reinitialise DataTable,解决重新加载表格内容问题 ，重新加载数据时，它就不会报错了
"columnDefs": [
            {"orderable": false, "targets": "_all"  }       ]
        
        }

);
    /**
    *Modal添加数据
    */
var rowId=0;
    $(".btn.bt_add_Modal.btn-default").on("click",function(){
    //https://datatables.net/reference/api/rows().remove() (删除选中的多行)
//    var rows = DTtable
//    .rows( $("input[name='checkList']:checked").parents("tr") )
//    .remove()
//    .draw(false);
//    console.log("delconfirm_gyd");
    //table.rows('.selected').remove().draw( false );
    console.log("add_Modal_gyd");
    MDTable.row.add( [
        "<td><input type=\"text\" name='code"+rowId+"' value=\"请输入编码\"/></td>",
    "<td><input type=\"text\"  name='name"+rowId+"' value=\"请输入中文名称\"/></td>",
    "<td><input type=\"text\"  name='enName"+rowId+"'  value=\"请输入英文名称\"/></td>",
    "<td><input type=\"text\" name='createTime"+rowId+"'  value=\"请输入创建时间\"/></td>"

        ] ).draw();
 
   rowId++;
       });
       
       $('#addData').on('hide.bs.modal',
    function() {
        MDTable.clear().draw();
        rowId = 0;
    });
       
    /**
    *“确定添加”按钮操作
    */
       
       $("#confirmAddButton").on("click",function(){
    //https://datatables.net/reference/api/rows().remove() (删除选中的多行)
//var data = MDTable
//    .rows().data()
//    ;
//    
    var nTrs = MDTable.rows().nodes();
    
//    $("tr").each(function(i,val)
//    {
//        if($(this).has('input').length){
//        console.log("tr_gyd");
//        console.log(i);
//        myCode = $("input[name='code']").val();
//        myName = $(" input[ name='name' ] ").val();
//        myEnName = $(" input[ name='enName' ] ").val();
//        myCT = $(" input[ name='createTime' ] ").val();
//        console.log(myCode);
//        console.log(myName);
//        console.log(myEnName);
//        console.log(myCT);
//        }
//    }
//    );
 

//遍历行对象 
   $.each(nTrs, function(i,val){
       
       console.log(i);
       console.log("textInput");
       console.log(typeof nTrs);
       console.log(nTrs)
       myCode = $("input[name='code"+i+"']").val();
       myName = $(" input[ name='name"+i+"' ] ").val();
       myEnName = $(" input[ name='enName"+i+"' ] ").val();
       myCT = $(" input[ name='createTime"+i+"' ] ").val();
       console.log(myCode);
       console.log(myName);
       console.log(myEnName);
       console.log(myCT);
       
       
   });
    
//   console.log("addconfirm_gyd");
//   console.log(data);
   //table.rows('.selected').remove().draw( false );
   
//   $.each(data, function(i,rowsData){
//       console.log(i);
//    $.each(rowsData, function(j,itemData){
//    console.log("rowData_gyd");
//    console.log(j);
//    console.log(itemData);
//    
//    });
//});
   
   
      });




//参考1：http://www.datatables.club/example/user_share/basic_curd.html（php基本增删改查）


