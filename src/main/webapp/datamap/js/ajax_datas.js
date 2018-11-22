

// 提交更新编目ID
function updateID(new_node) {
  data_ajax = JSON.stringify(new_node);
  // console.log(data_ajax);
  $.ajax({
    // async: false,
    type: "PUT",
    dataType: "json",
    url: "http://localhost:8080/ywsjglprj/category/updateBMId",
    contentType: 'application/json',
    // headers: { userId: 121 },
    data: data_ajax,
    // JSON.stringify(),
    timeout: 3000,
    success: function (data, status) {
      console.log("updateid" + status);
    }
  });
};

function updateName(new_node) {
  data_ajax = JSON.stringify(new_node);
  $.ajax({
    // async: false,
    type: "PUT",
    dataType: "json",
    url: "http://localhost:8080/ywsjglprj/category/updateName",
    contentType: 'application/json',
    data: data_ajax,
    timeout: 3000,
    success: function (data, status) {
      console.log("updatename" + status);
    }
  });

}

function updateParent(new_node) {
  data_ajax = JSON.stringify(new_node);
  // console.log(data_ajax);  
  $.ajax({
    // async: false,
    type: "PUT",
    dataType: "json",
    url: "http://localhost:8080/ywsjglprj/category/updateParent",
    contentType: 'application/json',
    data: data_ajax,
    timeout: 3000,
    success: function (data, status) {
      console.log("updateParent" + status);
    }
  });

}

function deleteCategory(node_id) {
  // console.log(data_ajax);

  $.ajax({
    // async: false,
    type: "DELETE",
    dataType: "json",
    url: "http://localhost:8080/ywsjglprj/category/deleteCategory/" + node_id,
    contentType: 'application/json',
    // data: data_ajax,
    timeout: 3000,
    success: function (data, status) {
      // if(data.message == "删除目录成功")
      _alert(data.message);
    }
  });

}

function createCategory(new_node) {
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
      if(data.message == "目录创建成功")
      return;   
      
     
    }
  });

}


