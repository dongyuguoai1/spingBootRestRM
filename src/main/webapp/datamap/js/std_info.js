function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(decodeURI(r[2]));
	return null;
}

var url2 = "../../api/stdInfoPage?stdfieldId=" + GetQueryString("stdfieldId")+"&stdSchemaCodeID="+GetQueryString("stdSchemaCodeID");
$.post(url2, function (post_data, status) {
    var post_data_json = $.parseJSON(post_data);
    //console.log(post_data);
    var p0 = $('<p class="lead">' + '标准管理表 ' + GetQueryString("stdSchemaCode") + ' 字段信息（红色高亮命中字段）' + '</p>');
    $("#div-table1").append(p0);
    var div0 = $('<div class="table-responsive">'
        + '<table class="table table-striped table-condensed table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th>字段id</th>'
        + '<th>字段名</th>'
        + '<th>字段编码</th>'
        //+ '<th>required</th>'
        //+ '<th>unique</th>'
        + '<th style="width:80px">最大长度</th>'
        + '<th style="width:80px">类型</th>'
        + '<th>英文名</th>'
        + '<th>range</th>'
        + '<th>目的</th>'
       // + '<th>maxCount</th>'
        //+ '<th style="width:40px">安全</th>'
        + '</tr>'
        + '<tbody id="tbody1">'
        + '</tbody>'
        + '<table>'
        + '</div>');
    $("#div-table1").append(div0);
    for (var i = 0; i < post_data_json.length; i++) {
    	var tr0;
    	if(GetQueryString("stdfieldId")==post_data_json[i].stdfieldId)
    		{
    		tr0 = $('<tr class="danger">'
    	            + '<td>' + post_data_json[i].stdfieldId + '</td>'
    	            + '<td>' + post_data_json[i].fieldName + '</td>'
    	            + '<td>' + post_data_json[i].fieldCode + '</td>'
    	            //+ '<td>' + post_data_json[i].required + '</td>'
    	            //+ '<td>' + post_data_json[i].unique + '</td>'
    	            + '<td>' + post_data_json[i].maxsize + '</td>'
    	            + '<td>' + post_data_json[i].type + '</td>'
    	            + '<td>' + post_data_json[i].enName + '</td>'
    	            + '<td>' + post_data_json[i].range + '</td>'
    	            + '<td>' + post_data_json[i].defination + '</td>'
    	            //+ '<td>' + post_data_json[i].maxContainCount + '</td>'
    	           // + '<td>' + post_data_json[i].security + '</td>'
    	            + '</tr>');
    		}
    	else
    		{
    		tr0 = $('<tr>'
    	            + '<td>' + post_data_json[i].stdfieldId + '</td>'
    	            + '<td>' + post_data_json[i].fieldName + '</td>'
    	            + '<td>' + post_data_json[i].fieldCode + '</td>'
    	            //+ '<td>' + post_data_json[i].required + '</td>'
    	            //+ '<td>' + post_data_json[i].unique + '</td>'
    	            + '<td>' + post_data_json[i].maxsize + '</td>'
    	            + '<td>' + post_data_json[i].type + '</td>'
    	            + '<td>' + post_data_json[i].enName + '</td>'
    	            + '<td>' + post_data_json[i].range + '</td>'
    	            + '<td>' + post_data_json[i].defination + '</td>'
    	            //+ '<td>' + post_data_json[i].maxContainCount + '</td>'
    	            //+ '<td>' + post_data_json[i].security + '</td>'
    	            + '</tr>');
    		}
             
        $("#tbody1").append(tr0);
    }

}, "text");

