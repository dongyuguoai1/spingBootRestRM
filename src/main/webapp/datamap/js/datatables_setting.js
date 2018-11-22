new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "./js/ztree_setting.js");// 在这里引入了a.js
document.body.appendChild(new_element);

// 更新树节点
function updateTreeNode(id, newname) {
  var zTree = $.fn.zTree.getZTreeObj("tree");
  var node = zTree.getNodeByParam("id", id, null);
  node.name = newname;
  zTree.updateNode(node);
};

// 编辑目录td
$("#example").off("click", ".bt_edit").on("click", ".bt_edit", function () {
  var id = $('#example').DataTable().row($(this).parents().parents("tr")).data().id;

  if (id == 0) {
    _alert("请勿修改根目录！");
    return;
  };

  // 点击所在行
  c_row = $(this).parent().siblings();

  // console.log(c_id);
  // 点击行编目名称/bmid
  c_name = $(c_row[0]).children();
  c_bmid = $(c_row[1]).children();
  // name_p获取当前名称内容
  name_p = $(c_name[0]).text();
  // console.log(name_p);
  // name_input获取输入内容
  name_input = $(c_name[1]).val();
  // console.log(c_name);
  // bmdi_p获取当前名称内容
  bmid_p = $(c_bmid[0]).children();
  // bmid_input获取输入内容
  bmid_input = $(c_bmid[1]).val();

  // 隐藏第一栏内容,显示输入框
  $(c_name[0]).hide();
  $(c_name[1]).show();
  $(c_bmid[0]).hide();
  $(c_bmid[1]).show();
  // $("input").keydown(function(e){

  // 隐藏编辑按钮，显示保存和退出按钮
  edit_bt = $(this);
  $(edit_bt).hide();
  save_exit_bt = $(this).siblings();
  $(save_exit_bt).show();
  //因为表头错位问题重新加载datatable
  Table.draw(false);

  // console.log(c_edit);  
});

// end of edit



// 退出编辑
$("#example").off("click", ".bt_exit").on("click", ".bt_exit", function () {
  //此处拿到隐藏列的id 
  var id = $('#example').DataTable().row($(this).parents().parents("tr")).data().id;

  // 点击所在行
  c_row = $(this).parent().siblings();

  // 点击行编目名称/bmid
  c_name = $(c_row[0]).children();
  c_bmid = $(c_row[1]).children();
  // name_p获取当前名称内容
  name_p = $(c_name[0]).text();
  // name_input获取输入内容
  name_input = $(c_name[1]).val();
  // console.log(c_name);
  // bmdi_p获取当前名称内容
  bmid_p = $(c_bmid[0]).children();
  // bmid_input获取输入内容
  bmid_input = $(c_bmid[1]).val();

  // 隐藏输入框,显示第一栏内容
  $(c_name[0]).show();
  $(c_name[1]).hide();
  $(c_bmid[0]).show();
  $(c_bmid[1]).hide();

  // 隐藏保存和退出按钮，显示编辑按钮  
  exit_bt = $(this);
  save_bt = $(this).siblings('.bt_save');
  edit_bt = $(this).siblings('.bt_edit');
  // save_bt = $(this).siblings('.bt_save');
  $(exit_bt).hide();
  $(edit_bt).show();
  $(save_bt).hide();
  //因为表头错位问题重新加载datatable
  Table.draw(false);

});



// 保存编辑

$("#example").off("click", ".bt_save").on("click", ".bt_save", function () {
  //此处拿到隐藏列的id  
  var id = $('#example').DataTable().row($(this).parents().parents("tr")).data().id;
  //此处拿到隐藏列的parentid  
  var parentId = $('#example').DataTable().row($(this).parents().parents("tr")).data().parentId;

  // 点击所在行
  c_row = $(this).parent().siblings();
  // 点击行编目名称/bmid
  c_name = $(c_row[0]).children();
  c_bmid = $(c_row[1]).children();
  // name_p获取当前名称内容
  name_p = $(c_name[0]).text();
  // name_input获取输入内容
  name_input = $(c_name[1]).val();
  // console.log(c_name);
  // bmdi_p获取当前名称内容
  bmid_p = $(c_bmid[0]).text();
  // bmid_input获取输入内容
  bmid_input = $(c_bmid[1]).val();

  // 获取输入框内容
  name_input = $(c_name[1]).val();
  bmid_input = $(c_bmid[1]).val();
  // 隐藏输入框,显示第一栏内容
  $(c_name[0]).show();
  $(c_name[1]).hide();
  $(c_bmid[0]).show();
  $(c_bmid[1]).hide();

  // 保存和退出按钮，编辑按钮  
  save_bt = $(this);
  exit_bt = $(this).siblings('.bt_exit');
  edit_bt = $(this).siblings('.bt_edit');


  for (var n in zNodes) {
    // 在同一级目录中
    if (zNodes[n].parentId == parentId) {
      // 当输入名称与其他节点名称相同时
      if (zNodes[n].name == name_input && zNodes[n].id != id) {
        _alert("编目名称已存在!");
        $(c_name[1]).val(name_p);
        // 显示输入框,隐藏第一栏内容
        $(c_name[0]).hide();
        $(c_name[1]).show();
        $(c_bmid[0]).hide();
        $(c_bmid[1]).show();
        //显示 保存和退出按钮， 隐藏编辑按钮  
        // save_bt = $(this).siblings('.bt_save');
        $(exit_bt).show();
        $(edit_bt).hide();
        $(save_bt).show();
        //因为表头错位问题重新加载datatable
        Table.draw(false);
        return;

      }
      // 当出入编目id与其他节点相同时
      if (zNodes[n].bmid == bmid_input && zNodes[n].id != id) {
        _alert("编目ID已存在!");
        $(c_bmid[1]).val(bmid_p);
        // 显示输入框,隐藏第一栏内容
        $(c_name[0]).hide();
        $(c_name[1]).show();
        $(c_bmid[0]).hide();
        $(c_bmid[1]).show();
        //显示 保存和退出按钮， 隐藏编辑按钮  
        // save_bt = $(this).siblings('.bt_save');
        $(exit_bt).show();
        $(edit_bt).hide();
        $(save_bt).show();
        //因为表头错位问题重新加载datatable
        Table.draw(false);
        return;
      }
    }

    if (zNodes[n].id == id) {
      zNodes[n].name = name_input;
      zNodes[n].bmid = bmid_input;
      updateName(zNodes[n]);
      updateID(zNodes[n]);
      // console.log(zNodes[n]);
      Table
        .column(0)
        .data()
        .map(function (value, index) {
          return value * value;
        })

      var zTree = $.fn.zTree.getZTreeObj("tree");
      var node = zTree.getNodeByParam("id", id, null);
      node.name = name_input;
      node.bmid = bmid_input;
      zTree.updateNode(node);

      $(c_name[0]).text(name_input);
      $(c_bmid[0]).text(bmid_input);



      // 隐藏保存和退出按钮，显示编辑按钮  
      $(exit_bt).hide();
      $(edit_bt).show();
      $(save_bt).hide();

      //因为表头错位问题重新加载datatable
      Table.draw(false);

    }
  }





});

//  end of edit

