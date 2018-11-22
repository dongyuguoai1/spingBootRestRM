// var classifyData = [
//     {
//         list_name: "汽车",
//         list_id: "1",
//         list_items: [
//             { name: "宝马", id: "1-1" },
//             { name: "奔驰", id: "1-2" },
//             { name: "大众", id: "1-3" },
//             { name: "雪铁龙", id: "1-4" },
//             { name: "本田", id: "1-5" },
//             { name: "丰田", id: "1-6" }
//         ]
//     },
//     {
//         list_name: "飞机",
//         list_id: "2",
//         list_items: [
//             { name: "J20", id: "2-1" },
//             { name: "SU27", id: "2-2" },
//             { name: "SU35", id: "2-3" },
//             { name: "B370", id: "2-4" },
//             { name: "B747", id: "2-5" }
//         ]
//     },
//     {
//         list_name: "交通工具",
//         list_id: "3",
//         list_items: [
//             { name: "飞机", id: "3-1" },
//             { name: "轮船", id: "3-2" },
//             { name: "火车", id: "3-3" },
//             { name: "汽车", id: "3-4" }
//         ]
//     }
// ];

// var freeData = [
//     {
//         list_name: "自由标签",
//         list_items: [
//             { name: "AAA", id: "4-1" },
//             { name: "BBB", id: "4-2" },
//             { name: "CCC", id: "4-3" },
//             { name: "DDD", id: "4-4" },
//             { name: "EEEEE", id: "4-5" },
//             { name: "FFFFFF", id: "4-6" },
//             { name: "SSSSSSSS", id: "4-7" },
//         ]
//     },
//     {
//         list_name: "飞机",
//         list_items: [
//             { name: "J20", id: "5-1" },
//             { name: "SU27", id: "5-2" },
//             { name: "SU35", id: "5-3" },
//             { name: "B370", id: "5-4" },
//             { name: "B747", id: "5-5" }
//         ]
//     },
//     {
//         list_name: "交通工具",
//         list_items: [
//             { name: "飞机", id: "6-1" },
//             { name: "轮船", id: "6-2" },
//             { name: "火车", id: "6-3" },
//             { name: "汽车", id: "6-4" }
//         ]
//     }
// ];

var vm = new Vue({
    el: "#filter",
    data: {
        // classifyTag: classifyData,  //排他性质的分类标签功能暂时不需要
        freeTag: []
    },
    created: function () {
        var _self = this;
        $.ajax({
            type: "GET",
            url: "../label_api/label/all_select",
            dataType: "text",
            contentType: "application/json",
            success: function (data, status) {
                var json = $.parseJSON(data);
                _self.freeTag = json;
                console.log("vfilter load success");
                // this.freeTag = eval("(" + data + ")");
            },
            error: function () {
                _self.freeTag = [];
            }
        });
    }
    //template: '#ul1'
    // methods: {
    //     onClick1: function (x) {
    //         console.log(x);
    //         this.selected = true;
    //     },
    //     onClick2: function () {
    //         console.log("onClick2");
    //     }
    // }
});

function hors() {
    if ($(".select-result dd").length > 1) {
        $(".select-no").hide();
    } else {
        $(".select-no").show();
    }
}

//排他性质的分类标签功能暂时不需要
// $(document).on(
//     "click",
//     ".select-list dd",
//     function () {
//         $(this).addClass("selected").siblings().removeClass("selected");
//         if ($(this).find("a").text() == "全部") {
//             var class3 = "." + $(this).attr("class").split(" ")[1];
//             // console.log(class3);
//             $(".select-result dd").filter(class3).remove();
//         }
//         else {
//             var class1 = "." + $(this).attr("class").split(" ")[0];
//             // console.log(class1);
//             $(".select-result dd").filter(class1).remove();
//             var copy = $(this).clone();
//             $(".select-result dl").append(copy);
//         }
//         hors();
//     });

$("#filter").on(
    "click",
    ".free-list dd",
    function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            var cls = "." + $(this).attr("class").split(" ")[0];
            $(".select-result dd").filter(cls).remove();
        }
        else {
            $(this).addClass("selected");
            var copy = $(this).clone();
            $(".select-result dl").append(copy);
        }
        hors();
    }
);

$("#filter").on(
    "click",
    ".select-result dd",
    function () {
        if ($.trim($(this).text()) != "暂时没有选择过滤条件") {
            $(this).remove();
            var cls = $(this).attr("class").split(" ")[0];
            console.log(cls);
            $(".select-list dd").each(function () {
                if ($(this).hasClass(cls)) {
                    $(this).siblings(".select-all").addClass("selected").siblings().removeClass("selected");
                }
            });
            $(".free-list dd").each(function () {
                if ($(this).hasClass(cls)) {
                    $(this).removeClass("selected");
                }
            });
            hors();
        }
    });