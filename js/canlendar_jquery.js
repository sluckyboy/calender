// JavaScript Document
$(document).ready(function(e) {

	var days = new Array("日","一","二","三","四","五","六");//星期
	var today = new Date();//当天日期，备用
	var month_big = new Array("1","3","5","7","8","10","12"); //包含所有大月的数组
	var month_small = new Array("4","6","9","11"); //包含所有小月的数组
	var separator = "-";//间隔符 	
	
	var cal_width = ($("#calendar").width() < 150)?150:$("#calendar").width();
	var cal_height = $("#calendar").height();
	var cal_X = $("#calendar").offset().left;
	var cal_Y = $("#calendar").offset().top;
	var pane_height = cal_width/7 - 1; 
	
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
			cal_body.css("z-index",10);
			cal_body.offset({top:cal_Y + cal_height + 5,left:cal_X});
			cal_body.width(cal_width + 1);
			cal_body.height("auto");//auto
			cal_body.css("overflow","hidden");
			cal_body.css("border","solid 1px #CCC");
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
			line1.css("background-color","#0FF");
			
			var btn1 = $("<div></div>");
			btn1.width(cal_width/3 - 3);
			btn1.height(pane_height);
			btn1.css("line-height",pane_height + "px");
			btn1.css("text-align","center");
			btn1.text("<");
			btn1.css("float","left");
			btn1.css("cursor","pointer");
			btn1.click(function(e) {
                if(isValidated()){
					var old_year = parseInt($("#input_year").val());
					if(old_year > 1960){
						var year = old_year - 1;
						var month = parseInt($("#input_month").val());
						var val = year + separator + month + separator + 1;
						init(val);
					}
				}
            });
			line1.append(btn1);
			
			var input_year = $("<input />");
			input_year.attr("id","input_year");
			input_year.width(cal_width/3);
			input_year.height("70%");
			input_year.css("float","left");
			input_year.css("text-align","center");
			input_year.bind("change",changed);
			line1.append(input_year);
			
			var btn2 = $("<div></div>");
			btn2.width(cal_width/3 - 3);
			btn2.height(pane_height);
			btn2.css("line-height",pane_height + "px");
			btn2.css("text-align","center");
			btn2.text(">");
			btn2.css("float","left");
			btn2.css("cursor","pointer");
			btn2.click(function(e) {
                if(isValidated()){
					var old_year = parseInt($("#input_year").val());
					if(old_year < 2050){
						var year = old_year + 1;
						var month = parseInt($("#input_month").val());
						var val = year + separator + month + separator + 1;
						init(val);
					}
				}
            });
			line1.append(btn2);
			
			var line2 = $("<div></div>");
			line2.width("100%");
			line2.height(pane_height);
			line2.css("background-color","#0FF");
			
			var btn3 = $("<div></div>");
			btn3.width(cal_width/3 - 3);
			btn3.height(pane_height);
			btn3.css("line-height",pane_height + "px");
			btn3.css("text-align","center");
			btn3.text("<");
			btn3.css("float","left");
			btn3.css("cursor","pointer");
			btn3.click(function(e) {
                if(isValidated()){
					var old_month = parseInt($("#input_month").val());
					if(old_month > 1){
						var year = parseInt($("#input_year").val());
						var month = old_month - 1;
						var val = year + separator + month + separator + 1;
						init(val);
					}
					else {
						var year = parseInt($("#input_year").val()) - 1;
						var month = 12;
						var val = year + separator + month + separator + 1;
						init(val);
					}
				}
            });
			line2.append(btn3);
			
			var input_month = $("<input />");
			input_month.attr("id","input_month");
			input_month.width(cal_width/3);
			input_month.height("70%");
			input_month.css("float","left");
			input_month.css("text-align","center");
			input_month.bind("change",changed);
			line2.append(input_month);
			
			var btn4 = $("<div></div>");
			btn4.width(cal_width/3 - 3);
			btn4.height(pane_height);
			btn4.css("line-height",pane_height + "px");
			btn4.css("text-align","center");
			btn4.text(">");
			btn4.css("float","left");
			btn4.css("cursor","pointer");
			btn4.click(function(e) {
                if(isValidated()){
					var old_month = parseInt($("#input_month").val());
					if(old_month < 12){
						var year = parseInt($("#input_year").val());
						var month = parseInt($("#input_month").val()) + 1;
						var val = year + separator + month + separator + 1;
						init(val);
					}
					else {
						var year = parseInt($("#input_year").val()) + 1;
						var month = 1;
						var val = year + separator + month + separator + 1;
						init(val);
					}
				}
            });
			line2.append(btn4);
			
			cal_body.append(line1);
			cal_body.append(line2);
			
			for(var i=0;i<7;i++){
				var pane = $("<div></div>");
				pane.addClass("pane");
				pane.width(pane_height);
				pane.height(pane_height);
				pane.css("line-height",pane_height + "px");
				pane.css("float","left");
				pane.css("text-align","center");
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
                $(this).css("background-color","#0FF");
            });
			if(date == (i - start + 1))
				pane.css("background-color","#0FF");
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
			
			$("#input_year").val(year);
			$("#input_month").val(month);
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
	
	//判断输入是否合法
	function isValidated(){
		var year = $("#input_year").val();
		var month = $("#input_month").val();
		if(isNaN(year) || isNaN(month)){
			alert("请输入正确的年份/月份");
			return false;
		}
		else{
			if(year%1 != 0 || month%1 != 0){
				alert("请输入正确的年份/月份");
				return false;
			}
			else{
				year = parseInt(year);
				if(year < 1960 || year > 2050){
					alert("请输入1960~2050之间的年份！");
					return false;
				}
				else if(month < 1 || month >12){
					alert("请输入正确的月份！");
					return false;
				}
				else{
					return true;
				}
			}
		}
	}
	
	//年份月份发生变化时处理函数
	function changed(){
		if(isValidated()){
			var year = $("#input_year").val();
			var month = $("#input_month").val();
			var val = year + separator + month + separator + 1;
			init(val);
		}
	}
});