// JavaScript Document
var days = new Array("日","一","二","三","四","五","六");//星期
var today = new Date();//当天日期，备用
var month_big = new Array("1","3","5","7","8","10","12"); //包含所有大月的数组
var month_small = new Array("4","6","9","11"); //包含所有小月的数组
var separator = "-";//间隔符 

var calendar = document.getElementById("calendar");
var cal_parent = calendar.parentNode;//获取父元素
var cal_width = ((calendar.clientWidth<150) ? 150 : calendar.clientWidth);//获取input的宽度，如果input宽度小于150，调整为150，150为日历块最小宽度
var cal_height = calendar.clientHeight;//获取input的高度，整数
var cal_X = calendar.offsetLeft;//获取input左边 距父元素的距离，整数
var cal_Y = calendar.offsetTop;//获取input顶部 距父元素的距离，整数

calendar.style.cursor = "pointer";//将input的鼠标设置成小手
calendar.readOnly = "readOnly";//设置input为只读
calendar.onblur = hideCalendar; //当input失去焦点时，隐藏cal_body
calendar.onclick = showCalendar;//点击input时调用showCalendar函数

//取input宽度的七分之一再减一作为方格的边长
var pane_height = cal_width/7 - 1; 

function hideCalendar(){
	var cal_body = document.getElementById("cal_body");
	if(cal_body != undefined){
		cal_body.parentNode.removeChild(cal_body);
	}
}

//显示日历主体
function showCalendar(){
	var cal_body = document.getElementById("cal_body");
	if(cal_body != undefined){
		cal_body.parentNode.removeChild(cal_body);
	}
	else{
		var cal_body = document.createElement("DIV");
		cal_body.id = "cal_body";
		cal_body.style.width = cal_width + "px";
		cal_body.style.height = "auto";
		cal_body.style.overflow = "hidden";
		cal_body.style.position = "absolute";
		cal_body.style.zIndex = "9";
		cal_body.style.left = cal_X + "px";
		cal_body.style.top = (cal_Y + cal_height + 5) + "px";
		cal_body.style.border = "solid 1px #CCCCCC";
		//鼠标移动到cal_body上时，禁用input的onblur事件，防止cal_body因input失去焦点而被隐藏
		cal_body.onmouseover = function(){
			calendar.onblur = undefined;
		}
		//鼠标从cal_body移除时，启用input的onblur事件，并且先让input获得焦点，否则当在cal_body上空白处点击后再移出在其他地方点击时，input因没有焦点而无法触发onblur事件
		cal_body.onmouseout = function(){
			calendar.focus();
			calendar.onblur = hideCalendar;
		}
		cal_parent.appendChild(cal_body);
				
		var line1 = document.createElement("DIV");
		line1.style.width = cal_width + "px";
		line1.style.height =  pane_height + "px";
		line1.style.backgroundColor = "#0FF";
		
		var btn1 = document.createElement("DIV");
		btn1.style.width = (cal_width/3 - 3) + "px";
		btn1.style.height = pane_height + "px";
		btn1.style.lineHeight = pane_height + "px";
		btn1.style.textAlign = "center";
		btn1.innerHTML = "<";
		btn1.style.cursor = "pointer";
		btn1.style.cssFloat = "left";
		btn1.onclick = function(){
			if(isValidated()){
				var old_year = parseInt(document.getElementById("input_year").value);
				if(old_year > 1960){
					var year = old_year - 1;
					var month = parseInt(document.getElementById("input_month").value);
					var val = year + separator + month + separator + 1;
					init(val);
				}
			}
		};
		line1.appendChild(btn1);
		
		var input_year = document.createElement("INPUT");
		input_year.id = "input_year";
		input_year.style.width = (cal_width/3) + "px";
		input_year.style.height = "70%";
		input_year.style.cssFloat = "left";
		input_year.style.textAlign = "center";
		input_year.onchange = function(){
			changed();
		};
		line1.appendChild(input_year);
		
		var btn2 = document.createElement("DIV");
		btn2.style.width = (cal_width/3 - 3) + "px";
		btn2.style.height = pane_height + "px";
		btn2.style.lineHeight = pane_height + "px";
		btn2.style.textAlign = "center";
		btn2.innerHTML = ">";
		btn2.style.cursor = "pointer";
		btn2.style.cssFloat = "left";
		btn2.onclick = function(){
			if(isValidated()){
				var old_year = parseInt(document.getElementById("input_year").value);
				if(old_year < 2050){
					var year = old_year + 1;
					var month = parseInt(document.getElementById("input_month").value);
					var val = year + separator + month + separator + 1;
					init(val);
				}
			}
		};
		line1.appendChild(btn2);
		
		var line2 = document.createElement("DIV");
		line2.style.width = cal_width + "px";
		line2.style.height =  pane_height + "px";
		line2.style.backgroundColor = "#0FF";
		
		var btn3 = document.createElement("DIV");
		btn3.style.width = (cal_width/3 - 3) + "px";
		btn3.style.height = pane_height + "px";
		btn3.style.lineHeight = pane_height + "px";
		btn3.style.textAlign = "center";
		btn3.innerHTML = "<";
		btn3.style.cursor = "pointer";
		btn3.style.cssFloat = "left";
		btn3.onclick = function(){
			if(isValidated()){
				var old_month = parseInt(document.getElementById("input_month").value)
				if(old_month > 1){
					var year = parseInt(document.getElementById("input_year").value);
					var month = old_month - 1;
					var val = year + separator + month + separator + 1;
					init(val);
				}
				else {
					var year = parseInt(document.getElementById("input_year").value) - 1;
					var month = 12;
					var val = year + separator + month + separator + 1;
					init(val);
				}
			}
		};
		line2.appendChild(btn3);
		
		var input_month = document.createElement("INPUT");
		input_month.id = "input_month";
		input_month.style.width = (cal_width/3) + "px";
		input_month.style.height = "70%";
		input_month.style.cssFloat = "left";
		input_month.style.textAlign = "center";
		input_month.onchange = function(){
			changed();
		};
		line2.appendChild(input_month);
		
		var btn4 = document.createElement("DIV");
		btn4.style.width = (cal_width/3 - 3) + "px";
		btn4.style.height = pane_height + "px";
		btn4.style.lineHeight = pane_height + "px";
		btn4.style.textAlign = "center";
		btn4.innerHTML = ">";
		btn4.style.cursor = "pointer";
		btn4.style.cssFloat = "left";
		btn4.onclick = function(){
			if(isValidated()){
				var old_month = parseInt(document.getElementById("input_month").value)
				if(old_month < 12){
					var year = parseInt(document.getElementById("input_year").value);
					var month = parseInt(document.getElementById("input_month").value) + 1;
					var val = year + separator + month + separator + 1;
					init(val);
				}
				else {
					var year = parseInt(document.getElementById("input_year").value) + 1;
					var month = 1;
					var val = year + separator + month + separator + 1;
					init(val);
				}
			}
		};
		line2.appendChild(btn4);
		
		cal_body.appendChild(line1);
		cal_body.appendChild(line2);
		
		for(var i=0; i < 7; i++){
			var pane = document.createElement("DIV");
			pane.className = "pane";
			pane.style.width = pane_height + "px";
			pane.style.height = pane_height + "px";
			pane.style.lineHeight = pane_height + "px";
			pane.style.textAlign = "center";
			pane.style.cssFloat = "left";
			pane.innerHTML = days[i];
			cal_body.appendChild(pane);
		}		
		init(calendar.value);	
	}	
}

function init(val){
	clearPane();
			
	var cal_body = document.getElementById("cal_body");
	var temp_date;
	var year;
	var month;
	var date;
	
	if(val == ""){
		temp_date = today;
		calendar.value = today.toFormatString(separator);
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
		var pane = document.createElement("DIV");
		pane.className = "pane";
		pane.style.width = pane_height + "px";
		pane.style.height = pane_height + "px";
		pane.style.lineHeight = pane_height + "px";
		pane.style.textAlign = "center";
		pane.style.cssFloat = "left";
		cal_body.appendChild(pane);
	}
	
	for(var i = start; i < end; i++){		
		var pane = document.createElement("DIV");
		pane.className = "pane";
		pane.style.width = pane_height + "px";
		pane.style.height = pane_height + "px";
		pane.style.lineHeight = pane_height + "px";
		pane.style.textAlign = "center";
		pane.style.cssFloat = "left";
		pane.innerHTML = i - start + 1;
		pane.style.cursor = "pointer";
		pane.onmouseover = function(){
			this.style.backgroundColor = '#0FF';
		}
		if(date == (i - start + 1))
			pane.style.backgroundColor = '#0FF';
		else{
			pane.onmouseout = function(){
				this.style.backgroundColor = '';
			}
		}
		pane.onclick = function(){
			calendar.value = year + separator + month + separator + this.innerHTML;
			cal_body.parentNode.removeChild(cal_body);		
		}
		cal_body.appendChild(pane);
		
		document.getElementById("input_year").value = year;
		document.getElementById("input_month").value = month;
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
	var limit = document.getElementsByClassName("pane").length;
	for(var i=7; i < limit; i++){
		var pane = document.getElementsByClassName("pane").item(7);
		pane.parentNode.removeChild(pane);
	}
}

//判断输入是否合法
function isValidated(){
	var year = document.getElementById("input_year").value;
	var month = document.getElementById("input_month").value;
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
		var year = document.getElementById("input_year").value;
		var month = document.getElementById("input_month").value;
		var val = year + separator + month + separator + 1;
		init(val);
	}
}