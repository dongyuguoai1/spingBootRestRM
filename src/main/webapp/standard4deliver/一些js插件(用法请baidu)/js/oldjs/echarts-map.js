var dom = document.getElementById("echarts3");

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
// var resizeechartsContainer = function() {
//     if (window.innerWidth < 768) {
//         dom.style.width = window.innerWidth * 0.82 + 'px';
//         dom.style.height = window.innerHeight * 0.8 + 'px';
//     } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
//         dom.style.width = window.innerWidth * 0.72 + 'px';
//         dom.style.height = window.innerHeight * 0.8 + 'px';
//     } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
//         dom.style.width = window.innerWidth * 0.78 + 'px';
//         dom.style.height = window.innerHeight * 0.8 + 'px';
//     } else {
//         dom.style.width = window.innerWidth * 0.58 + 'px';
//         dom.style.height = window.innerHeight * 0.8 + 'px';
//     }
// };
var resizeechartsContainer = function () {
    //dom.style.width = window.innerWidth * 0.95 + 'px';
    dom.style.height = window.innerHeight * 0.4 + 'px';
};

// //设置容器高宽
resizeechartsContainer();

var myChart = echarts.init(dom);
//var app = {};
//option = null;

//全国城市经纬度
var geoCoordMap = {
    "海门": [121.15, 31.89],
    "鄂尔多斯": [109.781327, 39.608266],
    "招远": [120.38, 37.35],
    "舟山": [122.207216, 29.985295],
    "齐齐哈尔": [123.97, 47.33],
    "盐城": [120.13, 33.38],
    "赤峰": [118.87, 42.28],
    "青岛": [120.33, 36.07],
    "乳山": [121.52, 36.89],
    "金昌": [102.188043, 38.520089],
    "泉州": [118.58, 24.93],
    "莱西": [120.53, 36.86],
    "日照": [119.46, 35.42],
    "胶南": [119.97, 35.88],
    "南通": [121.05, 32.08],
    "拉萨": [91.11, 29.97],
    "云浮": [112.02, 22.93],
    "梅州": [116.1, 24.55],
    "文登": [122.05, 37.2],
    "上海": [121.48, 31.22],
    "攀枝花": [101.718637, 26.582347],
    "威海": [122.1, 37.5],
    "承德": [117.93, 40.97],
    "厦门": [118.1, 24.46],
    "汕尾": [115.375279, 22.786211],
    "潮州": [116.63, 23.68],
    "丹东": [124.37, 40.13],
    "太仓": [121.1, 31.45],
    "曲靖": [103.79, 25.51],
    "烟台": [121.39, 37.52],
    "福州": [119.3, 26.08],
    "瓦房店": [121.979603, 39.627114],
    "即墨": [120.45, 36.38],
    "抚顺": [123.97, 41.97],
    "玉溪": [102.52, 24.35],
    "张家口": [114.87, 40.82],
    "阳泉": [113.57, 37.85],
    "莱州": [119.942327, 37.177017],
    "湖州": [120.1, 30.86],
    "汕头": [116.69, 23.39],
    "昆山": [120.95, 31.39],
    "宁波": [121.56, 29.86],
    "湛江": [110.359377, 21.270708],
    "揭阳": [116.35, 23.55],
    "荣成": [122.41, 37.16],
    "连云港": [119.16, 34.59],
    "葫芦岛": [120.836932, 40.711052],
    "常熟": [120.74, 31.64],
    "东莞": [113.75, 23.04],
    "河源": [114.68, 23.73],
    "淮安": [119.15, 33.5],
    "泰州": [119.9, 32.49],
    "南宁": [108.33, 22.84],
    "营口": [122.18, 40.65],
    "惠州": [114.4, 23.09],
    "江阴": [120.26, 31.91],
    "蓬莱": [120.75, 37.8],
    "韶关": [113.62, 24.84],
    "嘉峪关": [98.289152, 39.77313],
    "广州": [113.23, 23.16],
    "延安": [109.47, 36.6],
    "太原": [112.53, 37.87],
    "清远": [113.01, 23.7],
    "中山": [113.38, 22.52],
    "昆明": [102.73, 25.04],
    "寿光": [118.73, 36.86],
    "盘锦": [122.070714, 41.119997],
    "长治": [113.08, 36.18],
    "深圳": [114.07, 22.62],
    "珠海": [113.52, 22.3],
    "宿迁": [118.3, 33.96],
    "咸阳": [108.72, 34.36],
    "铜川": [109.11, 35.09],
    "平度": [119.97, 36.77],
    "佛山": [113.11, 23.05],
    "海口": [110.35, 20.02],
    "江门": [113.06, 22.61],
    "章丘": [117.53, 36.72],
    "肇庆": [112.44, 23.05],
    "大连": [121.62, 38.92],
    "临汾": [111.5, 36.08],
    "吴江": [120.63, 31.16],
    "石嘴山": [106.39, 39.04],
    "沈阳": [123.38, 41.8],
    "苏州": [120.62, 31.32],
    "茂名": [110.88, 21.68],
    "嘉兴": [120.76, 30.77],
    "长春": [125.35, 43.88],
    "胶州": [120.03336, 36.264622],
    "银川": [106.27, 38.47],
    "张家港": [120.555821, 31.875428],
    "三门峡": [111.19, 34.76],
    "锦州": [121.15, 41.13],
    "南昌": [115.89, 28.68],
    "柳州": [109.4, 24.33],
    "三亚": [109.511909, 18.252847],
    "自贡": [104.778442, 29.33903],
    "吉林": [126.57, 43.87],
    "阳江": [111.95, 21.85],
    "泸州": [105.39, 28.91],
    "西宁": [101.74, 36.56],
    "宜宾": [104.56, 29.77],
    "呼和浩特": [111.65, 40.82],
    "成都": [104.06, 30.67],
    "大同": [113.3, 40.12],
    "镇江": [119.44, 32.2],
    "桂林": [110.28, 25.29],
    "张家界": [110.479191, 29.117096],
    "宜兴": [119.82, 31.36],
    "北海": [109.12, 21.49],
    "西安": [108.95, 34.27],
    "金坛": [119.56, 31.74],
    "东营": [118.49, 37.46],
    "牡丹江": [129.58, 44.6],
    "遵义": [106.9, 27.7],
    "绍兴": [120.58, 30.01],
    "扬州": [119.42, 32.39],
    "常州": [119.95, 31.79],
    "潍坊": [119.1, 36.62],
    "重庆": [106.54, 29.59],
    "台州": [121.420757, 28.656386],
    "南京": [118.78, 32.04],
    "滨州": [118.03, 37.36],
    "贵阳": [106.71, 26.57],
    "无锡": [120.29, 31.59],
    "本溪": [123.73, 41.3],
    "克拉玛依": [84.77, 45.59],
    "渭南": [109.5, 34.52],
    "马鞍山": [118.48, 31.56],
    "宝鸡": [107.15, 34.38],
    "焦作": [113.21, 35.24],
    "句容": [119.16, 31.95],
    "北京": [116.46, 39.92],
    "徐州": [117.2, 34.26],
    "衡水": [115.72, 37.72],
    "包头": [110, 40.58],
    "绵阳": [104.73, 31.48],
    "乌鲁木齐": [87.68, 43.77],
    "枣庄": [117.57, 34.86],
    "杭州": [120.19, 30.26],
    "淄博": [118.05, 36.78],
    "鞍山": [122.85, 41.12],
    "溧阳": [119.48, 31.43],
    "库尔勒": [86.06, 41.68],
    "安阳": [114.35, 36.1],
    "开封": [114.35, 34.79],
    "济南": [117, 36.65],
    "德阳": [104.37, 31.13],
    "温州": [120.65, 28.01],
    "九江": [115.97, 29.71],
    "邯郸": [114.47, 36.6],
    "临安": [119.72, 30.23],
    "兰州": [103.73, 36.03],
    "沧州": [116.83, 38.33],
    "临沂": [118.35, 35.05],
    "南充": [106.110698, 30.837793],
    "天津": [117.2, 39.13],
    "富阳": [119.95, 30.07],
    "泰安": [117.13, 36.18],
    "诸暨": [120.23, 29.71],
    "郑州": [113.65, 34.76],
    "哈尔滨": [126.63, 45.75],
    "聊城": [115.97, 36.45],
    "芜湖": [118.38, 31.33],
    "唐山": [118.02, 39.63],
    "平顶山": [113.29, 33.75],
    "邢台": [114.48, 37.05],
    "德州": [116.29, 37.45],
    "济宁": [116.59, 35.38],
    "荆州": [112.239741, 30.335165],
    "宜昌": [111.3, 30.7],
    "义乌": [120.06, 29.32],
    "丽水": [119.92, 28.45],
    "洛阳": [112.44, 34.7],
    "秦皇岛": [119.57, 39.95],
    "株洲": [113.16, 27.83],
    "石家庄": [114.48, 38.03],
    "莱芜": [117.67, 36.19],
    "常德": [111.69, 29.05],
    "保定": [115.48, 38.85],
    "湘潭": [112.91, 27.87],
    "金华": [119.64, 29.12],
    "岳阳": [113.09, 29.37],
    "长沙": [113, 28.21],
    "衢州": [118.88, 28.97],
    "廊坊": [116.7, 39.53],
    "菏泽": [115.480656, 35.23375],
    "合肥": [117.27, 31.86],
    "武汉": [114.31, 30.52],
    "大庆": [125.03, 46.58]
};

var geoCoordMap2 = {
    "B1": [116.20, 40.10],
    "B2": [121.48, 31.22],
    "B3": [116.46, 39.92],
    "B4": [120.33, 36.07],
    "B5": [116.41, 40.17],
    "B6": [114.31, 30.52],
    "B7": [116.31, 40.07],
    "B8": [116.46, 39.68],
    "B9": [116.20, 40.00],
    "B10": [116.51, 40.27],
    "B11": [116.60, 40.33],
    "B12": [121.28, 31.32],
}

//var test = [
//    { name: "B1", value: [116.20, 40.10, 12] },
//    { name: "B2", value: [121.48, 31.22, 33] },
//    { name: "B3", value: [116.46, 39.92, 56] },
//    { name: "B7", value: [116.31, 40.07, 123] },
//    { name: "B8", value: [116.25, 40.10, 45] },
//    { name: "B9", value: [116.20, 40.00, 156] }
//];


// $.post("../api/mapShow", function (post_data, status) {
//     var post_data_json = $.parseJSON(post_data);

// }, "text");

// $.ajax({
//     type: 'POST',
//     url: "../api/mapShow",
//     //data: data,
//     async: false,
//     success: function (post_data, status) {
//         var post_data_json = $.parseJSON(post_data);

//     },
//     dataType: "text"
// });

var points = [];
var convertData = function () {
    var res = [];

    $.ajax({
        type: 'POST',
        url: "../../api/mapShow",
        //data: data,
        async: false,
        success: function (post_data, status) {
            var post_data_json = $.parseJSON(post_data);
            for (var prop in post_data_json) {
                points.push(prop);
                var geoCoord = geoCoordMap2[prop];
                if (geoCoord) {
                    res.push({
                        name: prop,
                        value: geoCoord.concat(post_data_json[prop])
                    });
                }
            }
            // for (var i = 0; i < post_data_json.length; i++) {
            //     var geoCoord = geoCoordMap2[post_data_json.name];
            //     if (geoCoord) {
            //         res.push({
            //             name: data[i].name,
            //             value: geoCoord.concat(data[i].value)
            //         });
            //     }
            // }

        },
        dataType: "text"
    });

    return res;
};

option = {
    backgroundColor: '#404a59',
    title: {
        text: '数据来源分布',
        subtext: 'data resource',
        sublink: '#',
        x: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ' : ' + params.value[2];
        }
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['data1'],
        textStyle: {
            color: '#fff'
        }
    },
    visualMap: {
        min: 0,
        max: 20,
        calculable: true,
        inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
        },
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    //    roamController:{
    //        show:true,
    //        x:'right',
    //        y:'top',
    //        //4向漫游圆盘大小（宽度）
    //        width:120,
    //        //指定高度，缩放控件默认会在指定高度的最下方最大化显示
    //        height:200,
    //        backgroundColor:'rgba(0,0,0,0.1)',
    //        borderColor:'#1e90ff',
    //        //borderWidth:1,
    //        step:10,
    //        mapTypeContorl:{
    //            'china':true
    //        }
    //    },
    series: [{
        name: 'data1',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(),
        //data:test,
        symbolSize: 12,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            emphasis: {
                borderColor: '#fff',
                borderWidth: 1
            }
        }
    }]
};
//if (option && typeof option === "object") {
//    myChart.setOption(option, true);
//}
myChart.setOption(option);

//resizeechartsContainer();
//myChart.resize();

//用于使chart自适应高度和宽度
//window.onresize = function () {
//    //重置容器高宽
//    resizeechartsContainer();
//    myChart.resize();
//};

var addr2id = {B1:"B1",B2:"B2",B3:"B3",B4:"B4",B5:"B5",B6:"B6",B7:"B7",B8:"B8",B9:"B9",B10:"B10",B11:"B11",B12:"B12"};
myChart.on('click', function (params) {
    //console.log(points);
    console.log(params.name);
    for (var i in points) {
        if (points[i] == params.name) {

            url = "sdata_list.html?mapquery=" + encodeURI(addr2id[params.name]);
            window.open(url, "_blank");
            var test = 0;

            // function queryParams(params1) {
            //     var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            //         limit: params1.limit, // 页面大小
            //         offset: params1.offset, // 页码
            //         query: params.name,
            //     };
            //     return temp;
            // }

            // $("#tb_departments").bootstrapTable('refreshOptions', {
            //     url: "../api/mapList", // 重设数据来源
            //     queryParams: queryParams, // 传递参数（*）
            //     pageNumber: 1
            // });
        }
    }

});

// var TableInit = function () {
//     var oTableInit = new Object();
//     // 初始化Table
//     oTableInit.Init = function () {
//         $('#tb_departments').bootstrapTable({
//             url: '../api/mapList', // 请求后台的URL（*）
//             // data:"test.json",
//             method: 'post', // 请求方式（*）
//             toolbar: '#toolbar', // 工具按钮用哪个容器
//             striped: true, // 是否显示行间隔色
//             cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
//             pagination: true, // 是否显示分页（*）
//             sortable: false, // 是否启用排序
//             sortOrder: "asc", // 排序方式
//             queryParams: oTableInit.queryParams, // 传递参数（*）
//             // queryParamsType: 'limit', //发送标准restful风格的请求
//             sidePagination: "server", // 分页方式：client客户端分页，server服务端分页（*）
//             pageNumber: 1, // 初始化加载第一页，默认第一页
//             pageSize: 10, // 每页的记录行数（*）
//             pageList: [10, 25, 50, 100], // 可供选择的每页的行数（*）
//             search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
//             strictSearch: true,
//             showColumns: true, // 是否显示所有的列
//             showRefresh: true, // 是否显示刷新按钮
//             minimumCountColumns: 2, // 最少允许的列数
//             clickToSelect: true, // 是否启用点击选中行
//             //height: 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
//             uniqueId: "Name", // 每一行的唯一标识，一般为主键列
//             showToggle: true, // 是否显示详细视图和列表视图的切换按钮
//             cardView: false, // 是否显示详细视图
//             detailView: false, // 是否显示父子表
//             // striped: true, //表格显示条纹
//             columns: [{
//                 checkbox: true
//             }, {
//                 field: 'schemaCode',
//                 title: 'schemaCode'
//             }, {
//                 field: 'schemaName',
//                 title: 'schemaName'
//             }, {
//                 field: 'dataSource',
//                 title: '数据库'
//             }, {
//                 field: 'updateTime',
//                 title: '更新时间'
//             }
//             ]
//         });
//     };

//     // 得到查询的参数
//      oTableInit.queryParams = function (params) {
//          var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//              limit: params.limit, // 页面大小
//              offset: params.offset, // 页码
//              // sortable:params.sortable,
//              query: null,
//              // statu: $("#txt_search_statu").val()
//          };
//          return temp;
//      };
//     return oTableInit;
// };

// $(function () {

//     // 1.初始化Table
//     var oTable = new TableInit();
//     oTable.Init();

//     $("#btn_select").click(function () {
//         var result_array = $("#tb_departments").bootstrapTable('getAllSelections');
//         console.log('getSelections: ' + JSON.stringify(result_array));
//         for (var i = 0; i < result_array.length; i++) {
//             url = "demo_info.html?code=" + result_array[i].schemaCode;
//             window.open(url, "_blank");
//         }
//     });
// });