$.ajax({
    url: "aside.html",
    type: 'get',
    dataType: 'html',
    //async: true,
    //data: parames,
    //error: function () { alert('error'); },
    success: function (data) {
        $(".main-header").html($(data).find(".main-header"));
    }
});
$.ajax({
    url: "aside.html",
    type: 'get',
    dataType: 'html',
    //async: true,
    //data: parames,
    //error: function () { alert('error'); },
    success: function (data) {
        $(".main-sidebar").html($(data).find(".main-sidebar"));

        +function ($) {
            'use strict';

            var DataKey = 'lte.tree';

            var Default = {
                animationSpeed: 500,
                accordion: true,
                followLink: false,
                trigger: '.treeview a'
            };

            var Selector = {
                tree: '.tree',
                treeview: '.treeview',
                treeviewMenu: '.treeview-menu',
                open: '.menu-open, .active',
                li: 'li',
                data: '[data-widget="tree"]',
                active: '.active'
            };

            var ClassName = {
                open: 'menu-open',
                tree: 'tree'
            };

            var Event = {
                collapsed: 'collapsed.tree',
                expanded: 'expanded.tree'
            };

            // Tree Class Definition
            // =====================
            var Tree = function (element, options) {
                this.element = element;
                this.options = options;

                $(this.element).addClass(ClassName.tree);

                $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

                this._setUpListeners();
            };

            Tree.prototype.toggle = function (link, event) {
                var treeviewMenu = link.next(Selector.treeviewMenu);
                var parentLi = link.parent();
                var isOpen = parentLi.hasClass(ClassName.open);

                if (!parentLi.is(Selector.treeview)) {
                    return;
                }

                if (!this.options.followLink || link.attr('href') === '#') {
                    event.preventDefault();
                }

                if (isOpen) {
                    this.collapse(treeviewMenu, parentLi);
                } else {
                    this.expand(treeviewMenu, parentLi);
                }
            };

            Tree.prototype.expand = function (tree, parent) {
                var expandedEvent = $.Event(Event.expanded);

                if (this.options.accordion) {
                    var openMenuLi = parent.siblings(Selector.open);
                    var openTree = openMenuLi.children(Selector.treeviewMenu);
                    this.collapse(openTree, openMenuLi);
                }

                parent.addClass(ClassName.open);
                tree.slideDown(this.options.animationSpeed, function () {
                    $(this.element).trigger(expandedEvent);
                }.bind(this));
            };

            Tree.prototype.collapse = function (tree, parentLi) {
                var collapsedEvent = $.Event(Event.collapsed);

                tree.find(Selector.open).removeClass(ClassName.open);
                parentLi.removeClass(ClassName.open);
                tree.slideUp(this.options.animationSpeed, function () {
                    tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
                    $(this.element).trigger(collapsedEvent);
                }.bind(this));
            };

            // Private

            Tree.prototype._setUpListeners = function () {
                var that = this;

                $(this.element).on('click', this.options.trigger, function (event) {
                    that.toggle($(this), event);
                });
            };

            // Plugin Definition
            // =================
            function Plugin(option) {
                return this.each(function () {
                    var $this = $(this);
                    var data = $this.data(DataKey);

                    if (!data) {
                        var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                        $this.data(DataKey, new Tree($this, options));
                    }
                });
            }

            var old = $.fn.tree;

            $.fn.tree = Plugin;
            $.fn.tree.Constructor = Tree;

            // No Conflict Mode
            // ================
            $.fn.tree.noConflict = function () {
                $.fn.tree = old;
                return this;
            };

            // Tree Data API
            // =============
            // $(window).on('load', function () {

            $(Selector.data).each(function () {
                Plugin.call($(this));
            });


        }(jQuery);

    }
});
$.ajax({
    url: "aside.html",
    type: 'get',
    dataType: 'html',
    //async: true,
    //data: parames,
    //error: function () { alert('error'); },
    success: function (data) {
        $(".main-footer").html($(data).find(".main-footer"));
    }
});

$(".main-sidebar").on("click", ".treeview-menu a", function () {
    $(this).parent().addClass("active").siblings().removeClass("active");
    if (!($(this).parent().parent().parent().hasClass("active"))) {
        $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
    }
    $(".content-header h1").html($(this).html());
    var list_name = $(this).parents(".treeview").find("span").eq(0).text();
    var list_icon = $(this).parents(".treeview").children("a").children("i").prop("outerHTML");
    $(".breadcrumb a").html(list_icon + " " + list_name);
    $(".breadcrumb li").filter(".active").text($(this).text());
});

// $(document).ready(function () {
//   var parames = {
//     "type1": "paramer1", "type2": "paramer2"
//   };

// $(".treeview-menu a").click(function () {

// $("#statistics_all").click(function () {
//     $(this).parent().addClass("active").siblings().removeClass("active");
//     if (!($(this).parent().parent().parent().hasClass("active"))) {
//         $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
//     }
//     $.ajax({
//         url: 'sub_statistics_all.html',
//         type: 'get',
//         dataType: 'html',
//         // async: false,
//         success: function (data) {
//             $("#content0").html(data);
//         }
//     });
// });
// $("#relation").click(function () {
//     $(this).parent().addClass("active").siblings().removeClass("active");
//     if (!($(this).parent().parent().parent().hasClass("active"))) {
//         $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
//     }
//     $.ajax({
//         url: 'sub_relation.html',
//         type: 'get',
//         dataType: 'html',
//         // async: false,
//         success: function (data) {
//             $("#content0").html(data);
//         }
//     });
// });
// });
// $("#content0").load("sub_data_list.html");