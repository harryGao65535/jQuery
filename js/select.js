/**
 * Created by ghr on 2016/7/1.
 */
 /*
  * 错误提示
  * ghr
  * 2016.8.12
  *  titlename - 页面名字  ：告警查询
  *  text - 错误内容 ：没有选中
  * */
 function errorShow(titlename,text){

 	var name = titlename;
 	var word = text;
 function insertpage(name,word){
  var errhtml = $(".container-fluid");
 	errhtml.append("<div class='modal fade showerr' id='errorshow'   tabindex='-1' role='dialog'  >" +
 			"<div class='modal-dialog modal-lg'><div class='modal-content'><h1 class='alertTitle'>" +
 			titlename+
 			"<span data-dismiss='modal' class='cancel'>X"+
      "</span>"+
      "</h1>"+
      "<div class='container-fluid'>"+
      "<div class='row'>"+
      "<p class='task-p'>"+
      text+
      "</p>"+
      "<div class='clearfix'></div>"+
      "<div class='col-md-12 alertbutBox-only'>"+
      "<button type='submit' class='submitbut subfix cancel'  data-dismiss='modal'>取消</button>"+
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>");
 	}

 	function changehs(){

 		if($("body").children().hasClass("modal-backdrop")){

 			var num = $("body").children(".modal-backdrop").length;
 			for(var i=0;i<num-1;i++){
 				$("body").find(".modal-backdrop").eq(i).removeClass("in").css("z-index","-1");
 			}

 		}

 		$(".cancel").click(function(){
 			$(".showerr").remove();
 			$(".modal-backdrop").remove();
 		});

 	}

 	//判断进入
 	if($(".container-fluid").children().hasClass("showerr")){
 		$('.showerr').modal();
 		changehs();
 	}else{

 		insertpage(name,word);
 		$(".showerr").modal();
 		changehs();
 	}

 }

 /*
  * 2016.8.9
  * ghr - 给页面加背景色
  * */
 function allbgcolor(bgcolor){
 	$("html").css("background-color",bgcolor);
 }

 /*
* 按钮点击变色
* 2016.7.26
* ghr
*/
function butClick(butname,bgcolor){
   $(butname).mousedown(function(){
      $(this).css("background-color",bgcolor);
   });
   $(butname).mouseup(function(){
      $(this).removeAttr("style");
   });
}

/*
 * 2016.7.19
 * 菜单滑动函数
 * leftname-左边盒子
 * rightname-右边盒子
 * showimg-关闭按钮
 * hideimg-弹出按钮
 * hidename-左边盒子的内容
 * hideboxname-左边盒子主题内容
 * */
function menuSlide(leftname,rightname,showimg,hideimg,hidename,hideboxname){
	console.log("menuSlide-begin");

	//左右盒子
	var leftn = $(leftname);
	var rightn = $(rightname);
	//获取图片
	var simg = $(showimg);
	var himg = $(hideimg);
	//获取宽度
	var leftwid = leftn.innerWidth();
	console.log(leftwid);

	simg.stop().click(function(){

		simg.hide();
		himg.show();

		$(hidename).hide();
		$(hideboxname).hide();

		leftn.animate({"width":"0%"});
		rightn.animate({"width":"99%","margin-left":"1%"});
	});

	himg.stop().click(function(){

		himg.hide();
		simg.show();

		$(hidename).show();
		$(hideboxname).show();
		rightn.removeAttr("style");
		leftn.removeAttr("style");

	});

	console.log("menuSlide-end");
}
/*
* 2016.7.15
* 下拉框函数-可以修改长度
* selectNewCheck(".gj",".gjlist",".gjval",".gjlist li",'.select-title',150);
* <div class="select-title  equipment-input">
 <input type="text" class="gjval" value="关机" readonly />
 <span class="gj" ><img src="images/select.png"/></span>
 <ul class="gjlist">
 <li>1</li>
 <li>2</li>
 <li>3</li>
 </ul>
 </div>
* */
function selectNewCheck(clickname,showname,valuename,shownameli,boxname,boxwidth){
    console.log("selectNewCheck - begin");

    if(boxwidth == ' '){
       boxwidth = 240;
    }

    $(boxname).css("width",boxwidth+"px");

    $(showname).addClass(".hideselect");

    $(clickname).unbind('click').click(function(event){
        event.stopPropagation();

        $(".hideselect").not($(this).next(".hideselect")).hide();

        $(showname).stop().toggle();

        $("body").off('click').on('click',function(){
            $(showname).stop().hide();
            console.log("centerbody");
        });
    });
    $(shownameli).unbind('click').click(function(event){
        event.stopPropagation();
        var val = $(this).text();
        $(valuename).val(val);
        $(showname).stop().hide();
    });
    $(shownameli).mouseenter(function() {

        $(this).css({"background-color": "#ffffff", "color": "#333333","width":"100%"}).siblings().removeAttr("style");

        $(shownameli).click(function(){
            var val = $(this).text();
            $(valuename).val(val);
            $(showname).stop().hide();
        });

    });
    console.log("selectNewCheck - end");
}

/*
 *下拉框表单错误提示-公共函数
 *2016.7.15
 *ghr
 *clickname - 点击下拉图片（class or id）
 *tablename - input框名字
 *tableinfo - 错误提示
 * */
function selectWarn(clickname,tablename,tableinfo){
  console.log("selectWarn - begin");
	var clname = $(clickname);
	var tbname = $(tablename);
	var tbinfo = $(tableinfo);
	tbname.addClass("warning").val(tbinfo);

	tbname.focus(function(){
		if($(this).hasClass("warning")){
			$(this).removeClass("warning").val('');
		}
	});

	clname.on('click',function(){
		tbname.removeClass("warning").val('');
	});
  console.log("selectWarn - end");
}
/*
 *表单错误提示公共函数-传字符串
 * 2016.7.8
 * tablename -> 选择要判断的input（class 或 id）
 * tableinfo -> 报错信息
 * */
 function tableTest(tablename,tableinfo){
   console.log("tableTest-begin");
	 $(tablename).addClass("warning").val(tableinfo);

	 $(tablename).focus(function(){
		 if($(this).hasClass("warning")){
			 $(this).removeClass("warning").val('');
		 }
	 });
   console.log("tableTest-end");
 }
/*
 *ip任务管理显示框公共函数
 * tablename 表名
  * idline 需要获取表格的第几行的td数据就写几
  * showBoxTips('.ipmanagetable',3);
 * */
  function showBoxTips(tablename,idline) {

 	    $(tablename + " tbody tr").each(function (index) {

 	        $(this).stop().mouseenter(function (event) {
 	            event.stopPropagation();
 	            var indexval = index;
 	            console.log(indexval);

 	            $(this).children("td").stop().mouseenter(function (event) {
 	                event.stopPropagation();
 	                $(this).append("<div class='showtips'><div class='showtipsbg'> </div><a class='showinfo' >查看命中详情</a> </div>");
 	                showInfo(idline, indexval);
 	            }).mouseleave(function () {
 	                $(this).find("div").remove();
 	            });

 	        });
 	    });


 	    function showInfo(idline, indexval) {
 	        $(".showinfo").unbind('click').click(function (event) {
 	            event.stopPropagation();
 	            console.log(idline + "," + indexval);
 	            var idval = $(tablename + " tbody tr").eq(indexval).children("td").eq(idline).text();
 	            console.log(idval);
 	            return false;
 	        });

 	    }
 }
 /*
 * 清空功能
 * 2016.7.4
 * inputname - 选择清空框
 * clearname - 添加清空类
 * */
 function clearBut(inputname,clearname){
     $(inputname).click(function(){
         $(clearname).val('');
     });

 }
 /*
 * 分页插件
 * 2016.7.4
 * pagename 调用的元素 -id 或者 class
 * */
 function pagePlug(pagename){
   console.log("pagePlug - begin");
     $(pagename).smartpaginator({
         totalrecords : 120,
         recordsperpage : 6,
         length:6,
         next: '>',
         prev: '<',
         first: '首页',
         last: '末页',
         go: '前往',
         theme: 'red',
         initval: 1
         /*onchange: onPageChange, 回调函数*/
     });
     console.log("pagePlug - end");

 }
 /*
  时间插件 -- 请到自己的JS中进行调用
  2016.7.4
 */
 function timeChoice(){
     laydate.skin('molv');//皮肤使用

     var begin = {
         elem :'#begintime', //控制器
         format:'YYYY/MM/DD hh:mm:ss', //格式
         min: '1900-01-01 00:00:00', //最小日期
         max: '2099-12-31 23:59:59', //最大日期
         istime : true,
         istoday : true,

         choose : function(datas){
             end.min = datas;
             end.start = datas;
         }
     };
     var end = {
         elem : '#endtime',
         format:'YYYY/MM/DD hh:mm:ss',
         min: '1900-01-01 00:00:00', //最小日期
         max: '2099-12-31 23:59:59', //最大日期
         istime : true,
         istoday : true,

         choose : function (datas){
             begin.max = datas;
         }
     };
     laydate(begin);
     laydate(end);
 }

 /*
 * 左边下拉菜单公共函数
 *2016.7.6
 * clickname 点击图片名字（类或ID） '.filetype'
 * showname  显示列表的ul名字 （类或ID） '.filetypelist'
 * valuename 获取值后显示的文本框的名字  '.filetypeval'
 * shownameli 显示列表的li的ul名字注意带li  '.filetypelist li'
 * * <div class="grayselect ">
     <input type="text" class="keyclear leftagreetypeval" />
     <span class="grayselectimg leftagreetype" ><img src="images/select.png"/> </span>
     <ul class="leftagreetypelist">
         <li>http1</li>
         <li>http2</li>
         <li>http3</li>
     </ul>
   </div>
 * */
 function leftSelect(clickname,showname,valuename,shownameli){

 	$(showname).addClass("hideselect");

 	$(clickname).unbind('click').click(function (event) {
 		event.stopPropagation();

 		$(".hideselect").not($(this).next(".hideselect")).hide();

         $(showname).stop().toggle();

         $("html").off('click').on('click',function(){
        	 $(showname).stop().hide();
        	 console.log("leftbody");
        });

     });

     $(shownameli).unbind('click').click(function(event){
     	event.stopPropagation();
         var val = $(this).text();
         console.log(val);
         $(valuename).val(val);
         $(showname).stop().hide();

     });

 }
/*
 *2016.8.11
 *关于下拉框下拉菜单被div框
 *ghr
 ***/
function leftSelectHasDiv(clickname,showname,valuename,shownameli){

	$(showname).addClass("hideselect");

	$(clickname).unbind('click').click(function (event) {
		event.stopPropagation();

		$(".hideselect").not($(this).siblings().find(".hideselect")).hide();

        $(showname).stop().toggle();

        $("html").off('click').on('click',function(){
       	 $(showname).stop().hide();
       	 console.log("leftbody");
       });

    });

    $(shownameli).unbind('click').click(function(event){
    	event.stopPropagation();
        var val = $(this).text();
        console.log(val);
        $(valuename).val(val);
        $(showname).stop().hide();

    });

}


/*
* 下拉菜单公共函数
* 2016.7.5
* */
function selectMenu(clickname,showname,valuename,shownameli){

	$(showname).addClass("hideselect");

	$(clickname).unbind('click').click(function(event){

		event.stopPropagation();

		$(".hideselect").not($(this).next(".hideselect")).hide();

        $(showname).stop().toggle();

        $("body").off('click').on('click',function(){
        	$(showname).stop().hide();
       	 	console.log("centerbody");
       });

    });

    $(shownameli).unbind('click').click(function(event){
    	event.stopPropagation();
        var val = $(this).text();
        $(valuename).val(val);
        $(showname).stop().hide();



    });

    $(shownameli).mouseenter(function() {

        $(this).css({"background-color": "#24a882", "color": "#ffffff","width":"100%"}).siblings().removeAttr("style");

        $(shownameli).click(function(){
            var val = $(this).text();
            $(valuename).val(val);
            $(showname).stop().hide();
        });

    });

}


/*
* 切换-事件实时警告
* 2016.7.1
* */
function changebox(){
    console.log('切换-事件实时警告-调用成功');

    $(".title-datasearch-list>ul>li").eq(0).show().siblings().hide();
    $(".title-datasearch ul").css("border-bottom","1px solid #23a786");

    $(".datasearch-email").eq(0).show().siblings(".datasearch-email").hide();
    $(".title-color-email").eq(0).show().siblings(".title-color-email").hide();

    $(".postdown").show().next(".filedown").hide();

    $(".title-datasearch>ul>li").each(function(index){
        $(this).click(function(){
        	console.log("切换id"+index);
        	if(index == 0){

        		$(this).addClass("linkleft-datasearch").siblings().removeClass("linkleft-datasearch");
                $(this).parents(".title-datasearch ul").css("border-bottom","1px solid #23a786");
        	    $(".right-title").show();
        	    $(".postdown").show().next(".filedown").hide();
        	    $(".title-datasearch-list>ul>li").eq(index).show().siblings().hide();
        	    $(".datasearch-email").eq(index).show().siblings(".datasearch-email").hide();
        	    $(".title-color-email").eq(index).show().siblings(".title-color-email").hide();
            }
        	else if(index == 3){

        		   $(".title-datasearch-list>ul>li").eq(index).show().siblings().hide();
           		   $(this).addClass("linkleft-datasearch").siblings().removeClass("linkleft-datasearch");
                   $(this).parents(".title-datasearch ul").css("border-bottom","1px solid #23a786");
                   $(".datasearch-email").hide();
                   $(".title-color-email").hide();
                   $(".right-title").show();
                   $(".postdown").hide().next(".filedown").show();
        	}else{
        		$(".title-datasearch-list>ul>li").eq(index).show().siblings().hide();
        		$(this).addClass("linkleft-datasearch").siblings().removeClass("linkleft-datasearch");
                $(this).parents(".title-datasearch ul").css("border-bottom","1px solid #23a786");
                $(".datasearch-email").eq(index).show().siblings(".datasearch-email").hide();
                $(".title-color-email").eq(index).show().siblings(".title-color-email").hide();
                $(".right-title").hide();
        	}

        });
    });
}


/*
* 事件实时警告
* 2016.7.1
 */
function linkColor(){

	console.log("事件实时警告-成功");
    /*
      第一种写法
    $(".alarm ul li:eq(0) table tbody tr").mouseenter(function () {
        $(this).css("background-color","#ecf6f4").siblings().removeAttr('style');
    });*/
    $("#tb_alert  tbody tr").mouseenter(function () {
        $(this).css("background-color","#ecf6f4");
    }).mouseleave(function(){
        $(this).removeAttr('style');
    });
    $("#tb_wlct tbody tr").mouseenter(function () {
        $(this).css("background-color","#e9edf5");
    }).mouseleave(function(){
        $(this).removeAttr('style');
    });

    $("#tb_qmgj tbody tr").mouseenter(function () {
        $(this).css("background-color","#f7f2ea");
    }).mouseleave(function(){
        $(this).removeAttr('style');
    });

    $("#tb_sxm tbody tr").mouseenter(function () {
        $(this).css("background-color","#f8f0f0");
    }).mouseleave(function(){
        $(this).removeAttr('style');
    });

}
