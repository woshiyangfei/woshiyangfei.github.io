//通过tagName获取元素 父元素.get...
function tn(parent,tagName){

	return parent.getElementsByTagName(tagName);
}

//通过类名获取元素
function cn(parent,className){

	return parent.getElementsByClassName(className);
}
//给元素设置多条样式
function setStyle(obj,json){

	//json {width:100px,height:100px}

	for(p in json){

		obj.style[p]=json[p];
		
	}
}

//获取元素的样式值

function getStyle(obj,attr){

	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];

}

//json {width:300,height:400} opacity要扩大100倍

function startMove(obj,json,endFn){
	
		clearInterval(obj.timer);
		
		obj.timer = setInterval(function(){
			
			var bBtn = true;
			
			for(var attr in json){
				
				var iCur = 0;
			
				if(attr == 'opacity'){
					if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
					
					}
					else{
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
					}	
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				
				var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=json[attr]){
					bBtn = false;
				}
				
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
					
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
				
			}
			
			if(bBtn){
				clearInterval(obj.timer);
				
				if(endFn){
					endFn.call(obj);
				}
			}
			
		},30);
	
}

//添加类名函数
function addClass(obj,className){

	obj.className?obj.className+=' '+className:obj.className=className;

}

//删除类名

function removeClass(obj,className){

	var str=obj.className;

	if(str){

		var arr=str.split(' ');

		for (var i = 0; i < arr.length; i++) {
			
			if(arr[i]==className){

				arr.splice(i,1);

			}

		}

		console.log(arr);

		obj.className=arr.join(' ');

	}

}

// 移除一组元素身上的指定类名

function clearCn(arr,className){

	for (var i = 0; i < arr.length; i++) {
		
		removeClass(arr[i],className);

	}

}

//绑定事件的第二种方式函数封装

function bind(obj,evName,fn){


	obj.attachEvent?obj.attachEvent('on'+evName,function(){

		fn.call(obj);
	}):obj.addEventListener(evName,fn,false);

}

//cookie的设置获取删除函数

function setCookie(name,value,day){

	var date=new Date();

	date.setDate(date.getDate()+day);

	document.cookie=name+'='+value+'; expires='+date;

}

function getCookie(name){

	//username=1703; pwd=123

	//['username=1703','pwd=123']

	//['username','1703']

	var arr=document.cookie.split('; ');

	for (var i = 0; i < arr.length; i++) {

		
		var arr1=arr[i].split('=');

		if(arr1[0]==name){

			return arr1[1];
		}

	}

	return '';

}

function removeCookie(name){

	setCookie(name,1,-1);

}