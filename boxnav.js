boxnav={
	dynClass:'dyn',
	overClass:'over',
	parentClass:'parent',
	parentOpenClass:'parentopen',
	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		var n=document.getElementById('contentnav');
		var ul;
		boxnav.cssjs('add',n,boxnav.dynClass);
		var lis=n.getElementsByTagName('li');
		for(var i=0;i<lis.length;i++){
			if(lis[i].getElementsByTagName('ul').length==0){
				boxnav.addEvent(lis[i],'mouseover',boxnav.over,false);
				boxnav.addEvent(lis[i],'mouseout',boxnav.out,false);
				boxnav.addEvent(lis[i],'click',boxnav.navigate,false);
				lis[i].onclick=function(){return false;} // Safari
			} else {
				boxnav.cssjs('add',lis[i],boxnav.parentClass);
				ul=lis[i].getElementsByTagName('ul')[0];
				ul.style.display='none';
				boxnav.addEvent(lis[i],'click',boxnav.peekaboo,false);
				lis[i].onclick=function(){return false;} // Safari
			}
		}
	},
	//Открытие
	peekaboo:function(e){
		var	li=boxnav.getTarget(e);
		ul=li.getElementsByTagName('ul')[0];
		ul.style.display=ul.style.display=='none'?'block':'none';
		if(ul.style.display=='none'){
			boxnav.cssjs('swap',li,boxnav.parentClass,boxnav.parentOpenClass);
		} else {
			boxnav.cssjs('swap',li,boxnav.parentOpenClass,boxnav.parentClass);
		}
		boxnav.cancelClick(e);
	},

/* helper methods */

	//Реакция на нажиатие
	getTarget:function(e){
		var target = window.event ? window.event.srcElement : e ? e.target : null;
		if (!target){return false;}
		var nn=target.nodeName.toLowerCase();
		if (nn!='a' && nn!='li'){target = target.parentNode;}
		if (nn=='a'){target = target.parentNode;}
		return target;
	},

	//Вид либо подлкючение события
	addEvent: function(elm, evType, fn, useCapture){
		if (elm.addEventListener) 
		{
			elm.addEventListener(evType, fn, useCapture);
			return true;
		} else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		} else {
			elm['on' + evType] = fn;
		}
	},



	//Вид либо подключение файла
	cssjs:function(a,o,c1,c2){
		switch (a){
			case 'swap':
				o.className=!boxnav.cssjs('check',o,c1)?o.className.replace(c2,c1):o.className.replace(c1,c2);
			break;
			case 'add':
				if(!boxnav.cssjs('check',o,c1)){o.className+=o.className?' '+c1:c1;}
			break;
			case 'remove':
				var rep=o.className.match(' '+c1)?' '+c1:c1;
				o.className=o.className.replace(rep,'');
			break;
			case 'check':
				return new RegExp("(^|\s)" + c1 + "(\s|$)").test(o.className)
			break;
		}
	}
}
boxnav.addEvent(window, 'load', boxnav.init, false);
