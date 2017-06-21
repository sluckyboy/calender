// JavaScript Document
$(document).ready(function(e) {

	var days = new Array("日","一","二","三","四","五","六");//星期
	var today = new Date();//当天日期，备用
	var month_big = new Array("1","3","5","7","8","10","12"); //包含所有大月的数组
	var month_small = new Array("4","6","9","11"); //包含所有小月的数组
	var separator = "-";//间隔符 
	var outer_border_color = "#fabe00";	//定制外边框颜色
	var calBody_bg_color = "#fafbfc"; //定制日期控件整体背景色
	var title_bg_color = "#fafbfc"; //定制年月选择器背景色
	var title_font_color = "#fabe00";//定制年月选择器字体颜色
	var date_bg_color = "#fff"; //定制星期栏的背景颜色
	var pane_active_color = "#fabe00";//定制被选中日期的背景色
	
	
	var cal_width = ($("#calendar").width() < 150)?150:$("#calendar").width();
	var cal_height = $("#calendar").height();
	var cal_X = $("#calendar").offset().left;
	var cal_Y = $("#calendar").offset().top;
	var pane_height = cal_width/7; 
	
    $("#calendar").attr("readOnly","readOnly");
	$("#calendar").css("cursor","pointer");
	$("#calendar").bind("click",showCalendar);
	$("#calendar").bind("focusout",hideCalendar);
	
	function hideCalendar(){
		if($("#cal_body").length > 0){
			$("#cal_body").remove();
		}
	}
	
	function showCalendar(){
		if($("#cal_body").length > 0){
			$("#cal_body").remove();
		}
		else{
			var cal_body = $("<div></div>");
			cal_body.attr("id","cal_body");
			cal_body.css("position","absolute");
			cal_body.css("z-index",100);
			cal_body.offset({top:cal_Y + cal_height + 5,left:cal_X});
			cal_body.width(cal_width + 1);
			cal_body.height("auto");//auto
			cal_body.css("overflow","hidden");
			cal_body.css("background",calBody_bg_color);
			cal_body.css("border","solid 1px");
			cal_body.css("border-color",outer_border_color);
			cal_body.mouseenter(function(e) {
				$("#calendar").unbind("focusout");
            });
			cal_body.mouseleave(function(e) {
				$("#calendar").focus();
				$("#calendar").bind("focusout",hideCalendar);
            });
			$("#calendar").parent().append(cal_body);
			
			var line1 = $("<div></div>");
			line1.width("100%");
			line1.height(pane_height);
			line1.css("background-color",title_bg_color);
			
			
			var btn1 = $("<div></div>");
			btn1.width(cal_width/6);
			btn1.height(pane_height);
			btn1.css("line-height",pane_height + "px");
			btn1.css("text-align","center");
			btn1.text("<");
			btn1.css("float","left");
			btn1.css("cursor","pointer");
			btn1.click(function(e) {
				var old_year = parseInt($("#span_year").text().year());
				var old_month = parseInt($("#span_year").text().month2());
				if(old_month > 1){
					var month = old_month - 1;
					var year = old_year;
					var val = year + separator + month + separator + 1;
					init(val);					
				}else {
					var month = 12;
					var year = old_year - 1;
					var val = year + separator + month + separator + 1;
					init(val);
				}
            });
			line1.append(btn1);
			
			var span_year = $("<span></span>");
			span_year.attr("id","span_year");
			span_year.width(cal_width/3 * 2);
			span_year.height("100%");
			span_year.css("line-height",pane_height + "px");
			span_year.css("float","left");
			span_year.css("text-align","center");
			span_year.css("color",title_font_color);
			line1.append(span_year);
			
			var btn2 = $("<div></div>");
			btn2.width(cal_width/6);
			btn2.height(pane_height);
			btn2.css("line-height",pane_height + "px");
			btn2.css("text-align","center");
			btn2.text(">");
			btn2.css("float","left");
			btn2.css("cursor","pointer");
			btn2.click(function(e) {
				var old_year = parseInt($("#span_year").text().year());
				var old_month = parseInt($("#span_year").text().month2());
				if(old_month < 12){
					var month = old_month + 1;
					var year = old_year;
					var val = year + separator + month + separator + 1;
					init(val);					
				}else {
					var month = 1;
					var year = old_year + 1;
					var val = year + separator + month + separator + 1;
					init(val);
				}
            });
			line1.append(btn2);
						
			cal_body.append(line1);
			
			for(var i=0;i<7;i++){
				var pane = $("<div></div>");
				pane.addClass("pane");
				pane.width(pane_height);
				pane.height(pane_height);
				pane.css("line-height",pane_height + "px");
				pane.css("float","left");
				pane.css("text-align","center");
				pane.css("border-top","1px solid #eff0f2");
				pane.css("border-bottom","1px solid #eff0f2");
				pane.css("background",date_bg_color);
				pane.text(days[i]);
				cal_body.append(pane);
			}
			
			init($("#calendar").val());
		}
	}
	
	function init(val){
		clearPane();
		
		var temp_date;
		var year;
		var month;
		var date;
		
		if(val == ""){
			temp_date = today;
			$("#calendar").val(today.toFormatString(separator));
		}
		else{
			year = val.year();
			month = val.month(separator);
			date = val.date(separator);
			temp_date = new Date(year,month,date);	
		}
			
		year = temp_date.getFullYear();
		month = temp_date.getMonth() + 1;
		date = temp_date.getDate();
		temp_date.setDate(1);
		
		var start = temp_date.getDay() + 7;
		var end;
		
		if(array_contain(month_big, month)){
			end = start + 31;
		}
		else if(array_contain(month_small, month)){
			end = start + 30;
		}
		else{
			if(isLeapYear(year)){
				end = start + 29;
			}
			else{
				end = start + 28;
			}
		}
		
		for(var i = 7; i < start; i++){
			
			var pane = $("<div></div>");
			pane.addClass("pane");
			pane.width(pane_height);
			pane.height(pane_height);
			pane.css("line-height",pane_height + "px");
			pane.css("float","left");
			pane.css("text-align","center");
			$("#cal_body").append(pane);
		}
		
		for(var i = start; i < end; i++){
			var pane = $("<div></div>");
			pane.addClass("pane");
			pane.width(pane_height);
			pane.height(pane_height);
			pane.css("line-height",pane_height + "px");
			pane.css("float","left");
			pane.css("text-align","center");
			pane.text(i - start + 1);
			pane.css("cursor","pointer");
			pane.mouseover(function(e) {
                $(this).css("background-color",pane_active_color);
            });
			if(date == (i - start + 1))
				pane.css("background-color",pane_active_color);
			else{
				pane.mouseleave(function(e) {
                    $(this).css("background-color","");
                });
			}
			pane.click(function(){
				$("#calendar").val(year + separator + month + separator + $(this).text());
				$("#cal_body").remove();
			});
			$("#cal_body").append(pane);
			
			$("#span_year").text(year + "年" + month + "月");
		}
	}
	
	//格式化输出
	Date.prototype.toFormatString  = function(separator){
		var result = this.getFullYear() + separator + (this.getMonth() + 1) + separator + this.getDate();
		return result;
	};
	
	//从格式化字符串中获取年份
	String.prototype.year = function(){
		var str = this.substring(0,4);
		return str;
	};
	
	//从格式化字符串中获取月份
	String.prototype.month = function(separator){
		var start = this.indexOf(separator) + 1;
		var end = this.lastIndexOf(separator);
		return parseInt(this.substring(start, end)) - 1;
	};
	
	//从span_year字符串中获取月份
	String.prototype.month2 = function(){
		var start = this.indexOf("年") + 1;
		var end = this.lastIndexOf("月");
		return parseInt(this.substring(start, end));
	};
	
	//从格式化字符串中获取日期
	String.prototype.date = function(separator){
		var start = this.lastIndexOf(separator) + 1;
		return this.substring(start);
	};
	
	//判断数组array中是否包含元素obj的函数，包含则返回true，不包含则返回false
	function array_contain(array, obj){
		for (var i = 0; i < array.length; i++){
			if (array[i] == obj)
				return true;
		}
		return false;
	}
	
	//判断年份year是否为闰年，是闰年则返回true，否则返回false
	function isLeapYear(year){
		var a = year % 4;
		var b = year % 100;
		var c = year % 400;
		if( ( (a == 0) && (b != 0) ) || (c == 0) ){
			return true;
		}
		return false;
	}
	
	//清除方格
	function clearPane(){
		var limit = $(".pane").length;
		for(var i=7; i < limit; i++){
			$(".pane").eq(7).remove();
		}
	}
});
