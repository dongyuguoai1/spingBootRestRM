// 取链接里面的参数
function getparm1() {
    var url = location.href;
    if (url.indexOf("?") > -1) {
        var tmp1 = url.split("?")[1];
        // var tmp2 = tmp1.split("&")[0];
        var tmp3 = tmp1.split("=")[1];
        // var parm1 = JSON.parse(tmp3);
        // URLDecoder.decode("chinese string","UTF-8")
        var parm1 = decodeURI(tmp3);
        // alert(parm1);
        console.log(parm1);
        return parm1;
    }
    return null;
}

var url = "../../api/infoPage?code=" + getparm1();
$.post(url, function (post_data, status) {
    var post_data_json = $.parseJSON(post_data);
    $("#well0").text(post_data_json.description);
    //var p0 = $('<div><p class="lead">' + '模型 ' + post_data_json.schemaName + ' 详细信息' + '</p></div>');
    //$("#div-table1").append(p0);
    var div0 = $('<div class="table-responsive">'
        + '<table class="table table-striped table-condensed table-hover">'
        + '<tr>'
        + '<th style="width: 30%">模型标识:</th>'
        + '<td>' + post_data_json.schemaCode + '</td>'
        + '</tr>'
        + '<tr>'
        + '<th>模型名称:</th>'
        + '<td>' + post_data_json.schemaName + '</td>'
        + '</tr>'
        + '<tr>'
        + '<th>数据源:</th>'
        + '<td>' + post_data_json.dataSource + '</td>'
        + '</tr>'
        + '<tr>'
        + '<th>创建时间:</th>'
        + '<td>' + post_data_json.createTime + '</td>'
        + '</tr>'
        + '<tr>'
        + '<th>创建人:</th>'
        + '<td>' + post_data_json.createPerson + '</td>'
        + '</tr>'
        + '<tr>'
        + '<th>更新时间:</th>'
        + '<td>' + post_data_json.updateTime + '</td>'
        + '</tr>'
        + '</table>'
        + '</div>');
    $("#div-table1").append(div0);
    
    var div1 = $('<div class="table-responsive">'
            + '<table class="table table-striped table-condensed table-hover">'
            + '<tr>'
            + '<th style="width: 30%">更新人:</th>'
            + '<td>' + post_data_json.updatePerson + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th>模型ID:</th>'
            + '<td>' + post_data_json.id + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th>英文名:</th>'
            + '<td>' + post_data_json.enName + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th>编目ID:</th>'
            + '<td>' + post_data_json.bmID + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th>完整编目ID:</th>'
            + '<td>' + post_data_json.fullBMID + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th>注册状态:</th>'
            + '<td>' + post_data_json.registerStatus + '</td>'
            + '</tr>'
            + '</table>'
            + '</div>');
    $("#div-table1-2").append(div1);
    
}, "text");

var url2 = "../../api/infoPage2?code=" + getparm1();
$.post(url2, function (post_data, status) {
    var post_data_json = $.parseJSON(post_data);
    var p0 = $('<p class="lead">' + '表 ' + getparm1() + ' 字段信息' + '</p>');
    $("#div-table2").append(p0);
    var div0 = $('<div class="table-responsive">'
        + '<table class="table table-striped table-condensed table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th>字段名</th>'
        + '<th>字段编码</th>'
        + '<th>required</th>'
        + '<th>unique</th>'
        + '<th>最大长度</th>'
        + '<th>类型</th>'
        + '<th>英文名</th>'
        + '<th>range</th>'
        + '<th>目的</th>'
        + '<th>maxCount</th>'
        + '<th>安全</th>'
        + '<th>标准检测</th>'
        + '</tr>'
        + '<tbody id="tbody1">'
        + '</tbody>'
        + '<table>'
        + '</div>');
    $("#div-table2").append(div0);
    for (var i = 0; i < post_data_json.length; i++) {
        if(post_data_json[i].stdSchemaCodeID=="-1")
        {
            var tr0 = $('<tr>'
            + '<td>' + post_data_json[i].fieldName + '</td>'
            + '<td>' + post_data_json[i].fieldCode + '</td>'
            + '<td>' + post_data_json[i].required + '</td>'
            + '<td>' + post_data_json[i].unique + '</td>'
            + '<td>' + post_data_json[i].maxsize + '</td>'
            + '<td>' + post_data_json[i].type + '</td>'
            + '<td>' + post_data_json[i].enName + '</td>'
            + '<td>' + post_data_json[i].range + '</td>'
            + '<td>' + post_data_json[i].defination + '</td>'
            + '<td>' + post_data_json[i].maxContainCount + '</td>'
            + '<td>' + post_data_json[i].security + '</td>'
            //+ '<td>' + '<a href="#">' + post_data_json[i].check + '</a>' + '</td>'
            + '<td>' + post_data_json[i].check + '</td>'
            + '</tr>');
        }
        else
        {
            var tr0 = $('<tr>'
            + '<td>' + post_data_json[i].fieldName + '</td>'
            + '<td>' + post_data_json[i].fieldCode + '</td>'
            + '<td>' + post_data_json[i].required + '</td>'
            + '<td>' + post_data_json[i].unique + '</td>'
            + '<td>' + post_data_json[i].maxsize + '</td>'
            + '<td>' + post_data_json[i].type + '</td>'
            + '<td>' + post_data_json[i].enName + '</td>'
            + '<td>' + post_data_json[i].range + '</td>'
            + '<td>' + post_data_json[i].defination + '</td>'
            + '<td>' + post_data_json[i].maxContainCount + '</td>'
            + '<td>' + post_data_json[i].security + '</td>'
            //post_data_json[i].schemaCodeID 作为href的第一个参数（元数据库的schemaCodeID）
            //增加一个stdSchemaCodeID作为第二个参数，这个参数来自标准检测服务
            + '<td>' + '<a href="demo_std_info.html?stdfieldId=' + post_data_json[i].stdfieldId
            + '&stdSchemaCode=' + post_data_json[i].stdSchemaCode
            + '&stdSchemaCodeID=' + post_data_json[i].stdSchemaCodeID
            + '" target="_blank">' + post_data_json[i].check + '</a>' + '</td>'
            + '</tr>');
        }
        
        $("#tbody1").append(tr0);
    }

}, "text");