/**
 *   综合插件
 *   ghr
 *   2016.11.23
 *   现在完成插件：摸态框，按钮组,下拉框,错误信息摸态框,下拉树
 *   需要配合bootstrap来进行使用,里面调用了bootstrap的API
 *   调用方式 $(document).app('errinfo',{ option })
 */

(function($){
	var methods = {
		//错误信息摸态框
		errinfo : function(option){
			var defaults = {
					titlename : '错误信息摸态框',
					errhtml : '错误信息内容',
					firstbutid : 'errfirstbut',
					firstbutname : '确定',
					secondbutid : 'errsecondbut',
					secondbutname : '取消',
					contenthtmlstyle : '', //内容样式
					butstyle : '', //按钮样式
					modalflag : true, //是否直接开启modal
					butnum : 1
			}
			var init = $.extend(defaults,option);

			return this.each(function(){
				//清空原来内容
				$(this).removeAttr('class');
				$(this).removeAttr('tabindex');
				$(this).removeAttr('role');
				$(this).removeAttr('data-backdrop');
				$(this).html('');
				//重新添加属性
				$(this).addClass("modal");
				$(this).addClass("fade");
				$(this).addClass("exist");
				$(this).attr('tabindex','-1');
				$(this).attr('role','dialog');
				$(this).attr('data-backdrop','static');
				//组合弹出框内容框架
				var htmlarr = new Array;
				//主框架
				htmlarr.push("<div class='modal-dialog modal-lg' ");
				htmlarr.push("style= '"+init.contenthtmlstyle+"'>");
				//标题
				htmlarr.push("<h1 class='alertTitle'>");
				htmlarr.push(init.titlename);
				htmlarr.push("<span  data-dismiss='modal' >X</span>");
				htmlarr.push("</h1>");
				//内容
				htmlarr.push("<div class='modal-content'>");
				htmlarr.push("<div class='container-fluid'>");

				htmlarr.push("<div class='row'>");
				htmlarr.push("<h4 class='errstyle'>");
				htmlarr.push(init.errhtml);
				htmlarr.push("</h4>");
				htmlarr.push("<div class='clearfix'></div>");
				htmlarr.push("<div class='col-md-12 normaladdbut'>");

				htmlarr.push("<button class='greenbutton' data-dismiss='modal' ");
				htmlarr.push("id='"+init.firstbutid+"'");
				htmlarr.push("style='"+init.butstyle+"'>");
				htmlarr.push(init.firstbutname);
				htmlarr.push("</button>");

				if(init.butnum == 2){
					htmlarr.push("<button class='whitebutton' ");
					htmlarr.push("id='"+init.secondbutid+"'>");
					htmlarr.push(init.secondbutname);
					htmlarr.push("</button>");
				}

				htmlarr.push("</div>")

				htmlarr.push("</div>")

				htmlarr.push("</div>");

				htmlarr.push("</div>");

				htmlarr.push("</div>");

				var strhtml = htmlarr.join('');

				//将内容放入弹出框
				$(this).html(strhtml);
				//是否自动直接显示
				if(init.modalflag == true){
					$(this).modal();
				}
				console.log("app-errinfo || 加载完成");

			});

		},
		//下拉树
		droptree : function(option){
			var defaults = {
					id : 'droptree', //名称
					boxid : 'boxid',//可选
	                inputid : 'inputid',//可选
	                spanid : "spanid",//可选
	                olid : "olid",//可选

	                defaultval : '',
	                placeholder :  "自定义",
	                boxstyle : "",
	                spanstyle : "",
	                inputstyle : "灰色",
			}
			var init = $.extend(defaults,option);

			//实现下拉
            var selectMenu = function(clickname,showname,valuename,shownameli){

                $("#"+showname).addClass("hideselect");


                $("#"+clickname).unbind('click').click(function(event){


                    event.stopPropagation();

                    $(".hideselect").not($(this).next(".hideselect")).hide();

                    $("#"+showname).stop().toggle();

                    $("body").off('click').on('click',function(){
                        $("#"+showname).stop().hide();

                    });

                });

                $("#"+shownameli).unbind('click').click(function(event){
                    event.stopPropagation();
                    var val = $(this).text();
                    $(this).addClass('checkactive');
                    $(this).siblings().removeClass('checkactive');
                    $("#"+valuename).val(val);
                    $("#"+showname).stop().hide();



                });
                $("#"+shownameli).mouseenter(function() {
                    $(this).addClass("select-listyle").siblings().removeClass("select-listyle");

                    $("#"+shownameli).click(function(){
                        var val = $(this).text();
                        $("#"+valuename).val(val);
                        $("#"+showname).stop().hide();
                    });

                });
            }
			return this.each(function(){
				//html填充数组
				var droptreehtml = new Array;
				//进行拼接赋值id
				init.boxid = init.id + "_" + init.boxid;
				init.inputid = init.id + "_" + init.inputid;
				init.spanid = init.id + "_" + init.spanid;
				init.olid = init.id + "_" + init.olid;

				droptreehtml.push("<div class='dtree-menu' id='"+init.boxid+"'");
				droptreehtml.push("style='"+init.boxstyle+"' >");
				//输入框
				if( init.inputstyle == "白色"){
					droptreehtml.push("<input type='text' readonly id='"+init.inputid+"'");
					droptreehtml.push("class='autodefineval' placeholder='" +init.placeholder +"'");
					droptreehtml.push("value = '"+init.defaultval+"' />");
				}else if(init.inputstyle == "灰色"){
					droptreehtml.push("<input type='text' readonly id='"+init.inputid+"'");
					droptreehtml.push("class='autodefineval' placeholder='" +init.placeholder +"'");
					droptreehtml.push("value = '"+init.defaultval+"' style='background-color:#f9f9f9;' />");
				}


				//图标位置
				droptreehtml.push("<h1 class='autoemail' style='"+init.spanstyle+"' ");
				droptreehtml.push("id = '"+init.spanid+"'>");
				//图片
				droptreehtml.push("<img src='/jsframework/images/select.png'/>");
				droptreehtml.push("</h1>")
				//下拉内容
				droptreehtml.push("<ul class='autodefinelist' id=" + init.olid + " >");

				droptreehtml.push("</ul>");

				droptreehtml.push("</div>");
				//转化数组
				droptreestr = droptreehtml.join('');

				$(this).append(droptreestr);

				//实现下拉功能
				selectMenu(init.spanid,init.olid,init.inputid,init.olid+" li");
				console.log("app-droptree || 加载完成");
			});
		},
		//下拉框
		combobox : function(option){
			var defaults = {
					id : 'combobox', //名称

					boxid : 'boxid',//可选
	                inputid : 'inputid',//可选
	                spanid : "spanid",//可选
	                olid : "olid",//可选

	                defaultval : '',
	                placeholder :  "自定义",
	                boxstyle : "",
	                spanstyle : "",
	                inputstyle : "灰色",
	                valueli : [{name:"全部", value: 0}],

	                getname : function(){
	                	getcurrentval();
	                }
				}
				var init = $.extend(defaults,option);

			    //获取当前下拉框中的值
				var getcurrentval = function(){
					return $("#"+options.boxid).find('.checkactive').attr('value');
				}
				//选中某个选项
	            var checkone = function(value){
	            	$("#"+init.boxid).find("[value='" + value + "']").click();
	            }

	            this.getval = getcurrentval;
				this.check = checkone;
				//实现下拉
	            var selectMenu = function(clickname,showname,valuename,shownameli){

	                $("#"+showname).addClass("hideselect");


	                $("#"+clickname).unbind('click').click(function(event){


	                    event.stopPropagation();

	                    $(".hideselect").not($(this).next(".hideselect")).hide();

	                    $("#"+showname).stop().toggle();

	                    $("body").off('click').on('click',function(){
	                        $("#"+showname).stop().hide();

	                    });

	                });

	                $("#"+shownameli).unbind('click').click(function(event){
	                    event.stopPropagation();
	                    var val = $(this).text();
	                    $(this).addClass('checkactive');
	                    $(this).siblings().removeClass('checkactive');

	                    $("#"+valuename).val(val);
	                    $("#"+showname).stop().hide();




	                });
	                $("#"+shownameli).mouseenter(function() {
	                    $(this).addClass("select-listyle").siblings().removeClass("select-listyle");

	                    $("#"+shownameli).click(function(){
	                        var val = $(this).text();
	                        $("#"+valuename).val(val);
	                        $("#"+showname).stop().hide();
	                    });

	                });
	            }

			return this.each(function(){
				//html填充数组
				var combohtml = new Array;
				//进行拼接赋值id
				init.boxid = init.id + "_" + init.boxid;
				init.inputid = init.id + "_" + init.inputid;
				init.spanid = init.id + "_" + init.spanid;
				init.olid = init.id + "_" + init.olid;
				//开始插入数组
				combohtml.push("<div class='select-menu' id='"+init.boxid+"'");
				combohtml.push("style='"+init.boxstyle+"' >");
				//输入框
				if( init.inputstyle == "白色"){
					combohtml.push("<input type='text' readonly id='"+init.inputid+"'");
					combohtml.push("class='autodefineval' placeholder='" +init.placeholder +"'");
					combohtml.push("value = '"+init.defaultval+"' />");
				}else if(init.inputstyle == "灰色"){
					combohtml.push("<input type='text' readonly id='"+init.inputid+"'");
					combohtml.push("class='autodefineval' placeholder='" +init.placeholder +"'");
					combohtml.push("value = '"+init.defaultval+"' style='background-color:#f9f9f9;' />");
				}


				//图标位置
				combohtml.push("<span class='autoemail' style='"+init.spanstyle+"' ");
				combohtml.push("id = '"+init.spanid+"'>");
				//图片
				combohtml.push("<img src='/jsframework/images/select.png'/>");
				combohtml.push("</span>")
				//下拉内容
				combohtml.push("<ul class='autodefinelist' id=" + init.olid + " >");

				if(init.valueli.length <= 1){
					combohtml.push("<li value='"+init.valueli[0].value+"'>");
					combohtml.push(init.valueli[0].name);
					combohtml.push("</li>");
				}else{
					for(var i=0;i<init.valueli.length;i++){

						var curname = init.valueli[i].name;
						if(curname == init.defaultval){
							combohtml.push("<li class='checkactive'");
							combohtml.push("value='"+init.valueli[i].value+"'>");
							combohtml.push(curname);
							combohtml.push("</li>");
						}else{
							combohtml.push("<li value='"+init.valueli[i].value+"'>");
							combohtml.push(curname);
							combohtml.push("</li>");
						}
					}
				}

				combohtml.push("</ul>");

				combohtml.push("</div>");
				//转化数组
				combostr = combohtml.join('');

				$(this).append(combostr);

				//实现下拉功能
				selectMenu(init.spanid,init.olid,init.inputid,init.olid+" li");
				console.log("app-combobox || 加载完成");

			});
		},
		//按钮组
		buttongroup : function(option){
			var defaults = {
				titlename : ["新增","删除","下发","暂停","导入","导出","编辑","发送","撤回","组内人员",'人物'],
				groupstyle :'',
				butnum : {
                    addbut : "addbutton",
                    deletes : "deletebutton",
                    down  : "downbutton",
                    stops : "stopbutton",
                    imports : "importbutton",
                    exports : "exportbutton",
                    editbut : 'editbutton',
                    sendbut : "sendbutton",
                    returnbut : "returnbutton",
                    peoplebut : "peoplebutton",
                    returnbut : "returnbutton",
                    groupperson:"groupperson"
                }

			}
			var init = $.extend(defaults,option);

			return this.each(function(){
				var buthtml = new Array;
				//主框架
				buthtml.push("<div class='btn-group' style='"+init.groupstyle+"'>");

				for(var i=0;i<init.titlename.length;i++){

					if(init.titlename[i] == '新增'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.addbut+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-plus'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '删除'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.deletes+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-trash'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '下发'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.down+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-download-alt'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '暂停'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.stops+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-pause'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '导入'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.imports+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-save'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '导出'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.exports+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-open'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '编辑'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.editbut+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='icon-edit'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '发送'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.sendbut+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-arrow-right'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '撤回'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.returnbut+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='icon-reply'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '人物'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.peoplebut+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='glyphicon glyphicon-user'></i>");
						buthtml.push("</button>");
					}

					if(init.titlename[i] == '组内人员'){
						buthtml.push("<button title='"+init.titlename[i]+"' ");
						buthtml.push("id = '"+init.butnum.groupperson+"'");
						buthtml.push("class='btn btn-default'>");
						buthtml.push("<i class='icon-reply'></i>");
						buthtml.push("</button>");
					}
				}
				buthtml.push("</div>");
				//放入html
				var butstr = buthtml.join('');

				$(this).append(butstr);

				console.log("app-buttongroup || 加载完成");
			});
		},
		//摸态框
		modal : function(option){
			var defaults = {
				  titlename : '摸态框',
				  contenthtml : '<div class="col-md-12">新增摸态框</div>',
				  firstbutid : 'addfirstbut',
				  firstbutname : '确定',
				  secondbutid : 'addsecondbut',
				  secondbutname : '取消',
				  contenthtmlstyle : '', //内容样式
				  butstyle : '', //按钮样式
				  modalflag : true, //是否直接开启modal
				  butnum : 2
			}
			var init = $.extend(defaults,option);

			return this.each(function(){
				//清空原来内容
				$(this).removeAttr('class');
				$(this).removeAttr('tabindex');
				$(this).removeAttr('role');
				$(this).removeAttr('data-backdrop');
				$(this).html('');
				//重新添加属性
				$(this).addClass("modal");
				$(this).addClass("fade");
				$(this).addClass("exist");
				$(this).attr('tabindex','-1');
				$(this).attr('role','dialog');
				$(this).attr('data-backdrop','static');
				//组合弹出框内容框架
				var htmlarr = new Array;
				//主框架
				htmlarr.push("<div class='modal-dialog modal-lg' ");
				htmlarr.push("style= '"+init.contenthtmlstyle+"'>");
				//标题
				htmlarr.push("<h1 class='alertTitle'>");
				htmlarr.push(init.titlename);
				htmlarr.push("<span  data-dismiss='modal' >X</span>");
				htmlarr.push("</h1>");
				//内容
				htmlarr.push("<div class='modal-content'>");
				htmlarr.push("<div class='container-fluid'>");

				htmlarr.push("<div class='row'>");
				htmlarr.push(init.contenthtml);
				htmlarr.push("<div class='clearfix'></div>");
				htmlarr.push("<div class='col-md-12 normaladdbut'>");

				htmlarr.push("<button class='greenbutton' ");
				htmlarr.push("id='"+init.firstbutid+"'");
				htmlarr.push("style='"+init.butstyle+"'>");
				htmlarr.push(init.firstbutname);
				htmlarr.push("</button>");

				if(init.butnum == 2){
					htmlarr.push("<button class='whitebutton' ");
					htmlarr.push("id='"+init.secondbutid+"'>");
					htmlarr.push(init.secondbutname);
					htmlarr.push("</button>");
				}

				htmlarr.push("</div>")

				htmlarr.push("</div>")

				htmlarr.push("</div>");

				htmlarr.push("</div>");

				htmlarr.push("</div>");

				var strhtml = htmlarr.join('');

				//将内容放入弹出框
				$(this).html(strhtml);
				//是否自动直接显示
				if(init.modalflag == true){
					$(this).modal();
				}
				console.log("app-modal || 加载完成");
			});
		}
	}

	$.fn.app = function(method){
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method == 'object' || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error('本插件Method中没有此' + method + "方法" );
		}
	}
})(jQuery)
