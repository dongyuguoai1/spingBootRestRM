//获取目录树
function GetzTree(zTreeName) {
    var catalogTree = $.fn.zTree.getZTreeObj(zTreeName);
    return catalogTree;
}

//更改目录节点名字
function RenameNode(zTree,node) {

    //获取一级子节点数目
    var num = node.children ? node.children.length : 0;

    //查看原节点名
    //console.log("origin name");
    //console.log(node.name);

    //https://blog.csdn.net/qq_16399991/article/details/55259560 replace方法
    //https://blog.csdn.net/gao_yu_long/article/details/80383625 正则表达式.*表示任意字符
    //http://jquery.cuishifeng.cn/regexp.html 正则速查表
    //http://www.php.cn/js-tutorial-384691.html 去掉头尾空白符 .replace(/(^\s*)|(\s*$)/g,"")
    //https://www.cnblogs.com/stayreal/p/3938927.html /gi 贪婪且忽略大小写

    //下面这句话的意思是，匹配到“空格(任何字符串)”这种的，替换为空。否则，保留原来字符串
    //node.name = node.name.replace(/ \(.*\)/gi, "") + " (" + num + ")";

    //更改结点名为“节点名（一级子节点数）”
    node.name = node.name + " (" + num + ")";

    //查看更改后的节点名
    //console.log("rex name");
    //console.log(node.name);

    //获取目录树对象
    var catalogTree = zTree;
    //更新节点对象
    catalogTree.updateNode(node);

    //查看更新后的节点名
    //console.log("html node111");
    //console.log(node.name);
}

//递归遍历目录树
function traverseTree(zTree,node) {
    //遇到叶子节点返回
    if (!node) {
        return;
    }

    //查看遍历过程
    //console.log("正向遍历跟踪修改前的名称");
    //console.log(node);

    //将Node名字后面加上下一级子Node的个数
    RenameNode(zTree,node);

    //如果有子节点，进入下面的迭代，在迭代的过程中修改每个节点的名称，直到遇到各个叶子节点停止
    if (node.children && node.children.length > 0) {
        var i = 0;
        for (i = 0; i < node.children.length; i++) {
            //更细致的查看迭代过程
            //console.log("正向遍历中的嵌套循环，输出上一个父节点，此时已经被修改过名称");
            //console.log(node);
            //console.log("正向遍历中的嵌套循环，输出本次子节点");
            //console.log(node.children[i]);

            this.traverseTree(zTree,node.children[i]);
        }
    }
}

//操作zTree。该对象可理解为：类似于zTreeOperation是一个类，updateNodeName是类中的一个方法。不需要实例化，可以直接调用
var zTreeOperation = {
    updateNodeName: function (zTreeName) {
        //获取目录树对象，获取整个目录树节点数据
        var zTree = GetzTree(zTreeName),
            nodes = zTree.getNodes();

        //查看整个目录树节点数据
        //console.log("nodes");
        //console.log(nodes);
        for (var j = 0; j < nodes.length; j++) {

            //console.log("整个目录树节点长度(目前仅为1，因为根目录节点仅有一个，即仅有一棵树)");
            //console.log(nodes.length);
            //console.log(j);

            traverseTree(zTree,nodes[j]);
        }
    },
};


//创建仅供查看的DT
function creatTable(DTname, url) {
    //将创建的DT存放到DTtable变量（对象）中
    var DTtable = $(DTname).DataTable({
        //数据传入
        "ajax": {
            "url": url,
            "dataSrc": "data", //控制传入字段。如果是数组，那么dataSrc为""
        },
        //控制每页显示数据条数
        "lengthMenu": [15, 25, 50, 75, 100],
        //允许重建
        "destroy": true,
        //当列过多时，允许启用水平滚动条
        "scrollX": true,
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
    
    //返回DT对象
    return DTtable;
}

//点击ztree节点后，加载该节点对应的数据，通过DT展示
function zTreeOnClick(event, treeId, treeNode) {
    //调用后台服务接口，urlStr为接口url
    var urlStr = "./txt/GMBCI3.txt";
    //展示数据的DT对象id
    var bzckDT = "#bzckDT";
    //创建DT
    var DTtable = creatTable(bzckDT, urlStr);
}

//ztree的设置选项.http://www.treejs.cn/v3/api.php
var setting = {
    view: {
        //双击节点时，是否自动展开父节点的标识
        dblClickExpand: false,
        //设置 zTree 是否显示节点之间的连线
        showLine: true,
        //设置是否允许同时选中多个节点
        selectedMulti: false,
    },
    //使用简单 Array 格式的数据
    data: {
        key: {
            name: "name",
        },
        simpleData: {
            enable: true,
            //节点数据中保存唯一标识的属性名称
            idKey: "id",
            pIdKey: "parentId",
            rootPId: ""
        }
    },
    callback: {
        //用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作。默认值：null
        beforeClick: function (treeId, treeNode) {
            //var zTree = $.fn.zTree.getZTreeObj("tree");
            //展开 / 折叠 指定的节点。实现的功能为：点击节点即展开显示其子节点
            //zTree.expandNode(treeNode);
            return true;
        },
        //点击节点所对应的响应函数
        onClick: zTreeOnClick
    }
};

function getzTreeData(ztreeUrl)
{
//从服务中获取创建ztree目录所需的数据
var zNodes = new Object();
$.ajax({
    //async. 默认是true，即为异步方式，$.Ajax执行后，会继续执行ajax后面的脚本，直到服务器端返回数据后，触发$.Ajax里的success方法，这时候执行的是两个线程。
    //若要将其设置为false，则所有的请求均为同步请求，在没有返回值之前，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
    async: false,
    type: "GET",
    dataType: "text",
    url: ztreeUrl,
    timeout: 3000,
    success: function (data, status) {
        var JSONdata = JSON.parse(data);//由JSON字符串转换为JSON对象
        zNodes = JSONdata.data;
    }
});
return zNodes;
}

//目录树对象名称
var zTreeName = "tree";

//获取ztree数据的url
var ztreeUrl = "./txt/catalog.txt";

//构建目录树所需的数据
var zNodes = getzTreeData(ztreeUrl);

createzTree(setting,zTreeName,zNodes);

function createzTree(ztreeSetting,zTreeName,zNodes){
//创建ztree目录。zTree 初始化方法，创建 zTree 必须使用此方法
$.fn.zTree.init($("#"+zTreeName), ztreeSetting, zNodes);
//更新目录树节点名称
zTreeOperation.updateNodeName(zTreeName);
}



