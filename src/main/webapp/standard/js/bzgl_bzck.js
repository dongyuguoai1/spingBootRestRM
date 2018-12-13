//获取zTree
function myGetzTree() {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    return zTree;
}

//更改目录树名字
function myRenameNode(node) {
    var num = node.children ? node.children.length : 0;
    console.log("origin name");
    console.log(node.name);
    
    //https://blog.csdn.net/qq_16399991/article/details/55259560 replace方法
    //https://blog.csdn.net/gao_yu_long/article/details/80383625 正则表达式.*表示任意字符
    //http://jquery.cuishifeng.cn/regexp.html 正则速查表
    //http://www.php.cn/js-tutorial-384691.html 去掉头尾空白符 .replace(/(^\s*)|(\s*$)/g,"")
    //https://www.cnblogs.com/stayreal/p/3938927.html /gi 贪婪且忽略大小写
    
    //下面这句话的意思是，匹配到“空格(任何字符串)”这种的，替换为空。否则，保留原来字符串
    //node.name = node.name.replace(/ \(.*\)/gi, "") + " (" + num + ")";
    node.name = node.name + " (" + num + ")";
    console.log("rex name");
    console.log(node.name);
    var myzTree = myGetzTree();
    myzTree.updateNode(node);
    console.log("html node111");
    console.log(node.name);
}

//递归遍历目录树
function traverseTree(node) {
    if (!node) {
        return;
    }
    console.log("node222");
    console.log(node);
    //将Node名字后面加上下一级子Node的个数
    myRenameNode(node);
    if (node.children && node.children.length > 0) {
        var i = 0;
        for (i = 0; i < node.children.length; i++) {

            console.log("node333");
            console.log(node);
            console.log("child333");
            console.log(node.children[i]);
            this.traverseTree(node.children[i]);
        }
    }
}

//类似于MoveTest是一个类，updateType是类中的一个方法。不需要实例化，可以直接调用
var MoveTest = {
    updateType: function () {
        var zTree = myGetzTree(),
            nodes = zTree.getNodes();
        console.log("nodes");
        console.log(nodes);
        for (var j = 0;j<nodes.length;j++){

            traverseTree(nodes[j]);
            }

    },
};


//创建没有操作按钮的DT
function creatTable(DTname, url) {
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
        ],

        //设置语言
        "language": {
            "url": "./js/DataTables.json"
        },

            
            
        
    });//表格tables创建完毕
     return DTtable;
}

//点击ztree后的响应函数
function zTreeOnClick(event, treeId, treeNode) {
    //调用后台服务get接口，通过该结点CategoryId的获取该结点的模型信息，treeNode.id即为CategoryId
    var urlStr = "./txt/GMBCI3.txt";
    var bzckDT="#bzckDT";
    var DTtable = creatTable(bzckDT, urlStr);
    //点击ztree的ajax执行完毕
}
//点击ztree的事件函数完毕

//ztree的设置函数
var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
    },
    data: {
        key: {
            name: "name",
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: ""
        }
    },
    callback: {
        //是否可以删掉
        beforeClick: function (treeId, treeNode) {
            //var zTree = $.fn.zTree.getZTreeObj("tree");
            //zTree.expandNode(treeNode);
            return true;
        },
        onClick: zTreeOnClick
    }
};

//从服务中取ztree目录数据
var zNodes = new Object();
var catalogTXT = "./txt/catalog.txt";
$.ajax({
    async: false,
    type: "GET",
    dataType: "text",
    url: catalogTXT,
    timeout: 3000,
    success: function (data, status) {
        var JSONdata = JSON.parse(data);//由JSON字符串转换为JSON对象
        zNodes = JSONdata.data;
    }
});

//显示ztree目录

    console.log("gyd_tree");
    $.fn.zTree.init($("#tree"), setting, zNodes);
    MoveTest.updateType();

