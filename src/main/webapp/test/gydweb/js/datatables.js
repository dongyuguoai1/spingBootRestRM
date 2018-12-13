
//将nodes节点显示在表格中

  
////   test_editname
//  function editname(data){
//	  if(!status)
//		  return  data;
//	  else
//		  return "123as";
//  }


 var dt_edit_status = false; 
// 监听编辑和删除按钮

//      var table_edit = document.getElementById("dt_edit");
//      var table_edit = document.getElementById("dt_edit");
//      var del_btn = document.getElementById("dt_del");
//      var dt_exit0 = document.getElementById("dt_exit0");
//      var dt_exit = document.getElementById("dt_exit");
//      table_edit.addEventListener("click", event_dt_edit);
////      table_edit.addEventListener("click", somet);
////      table_edit1.addEventListener("click", event_edit);
//      dt_exit0.addEventListener("click", event_dt_exit);
////      dt_exit.addEventListener("click", event_dt_exit);
////      del_btn.addEventListener("click", event_dt_del);

// end of 监听
// 
//  
//  dt编辑功能状态

  var event_dt_edit = function(){
	  console.log("edit!");
	  dt_edit_status = true;
  };

//  end of edit
//  
//  var somet = function(){
//	  console.log("edit!");
//	  dt_edit_status = true;
//  };
//
//  
////  删除按钮
//  
//  function event_del(){
//	  consol.log("delete");
//  }
//// end of delete
//  
//  var event_dt_exit = function (){
//	  console.log("exit_edit!");
//	  dt_edit_status = true;
//  }
