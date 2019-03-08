/*
作者：李青山
日期：2019年3月4日
功能概述：通过html5特性绘制A星寻路算法练习所需的环境
*/
;(function(root, factory) {

    // commonJS 规范
    if (typeof module === 'object' && module && module.exports) {
        module.exports = factory(require("./test.js"));
    }

    // AMD规范
    else if (typeof define === 'function' && define.amd) {
        define(["Linklist","CoordinateObject"], factory);
    }

    // 浏览器实现
    else {
        root.paintObject = factory();
    }
}(this, function(Linklist,CoordinateObject) {
	console.log("paint.js work")
    var paintObject = new Object();
	//存储障碍物位置
	paintObject.blocklist = new Linklist() 
	paintObject.c=document.getElementById("myCanvas");
	paintObject.cxt=paintObject.c.getContext("2d");
	//绘制迷宫表格边框
	paintObject.DrawMap=function(){
		paintObject.cxt.fillStyle="rgba(40,40,40,1)";
		paintObject.cxt.fillRect(0,0,500,500);

		var start_x = 0;
		var start_y = 0;
		paintObject.cxt.globalAlpha = 1
		paintObject.cxt.strokeStyle = "rgba(255,255,255,1)"
		paintObject.cxt.lineWidth = 4
		for(var i=0;i<=500;i=i+20){
			//横线 
			start_x = 0;
			start_y = i;
			paintObject.cxt.moveTo(start_x,start_y);
			paintObject.cxt.lineTo(500,start_y);
			//竖线
			start_x = i;
			start_y = 0;
			paintObject.cxt.moveTo(start_x,start_y);
			paintObject.cxt.lineTo(start_x,500);
		}
		paintObject.cxt.stroke();	
	}
	//为指定坐标的表格填色
	paintObject.FillCell=function(x,y,IFBlcok){
		var start_x = x*20+2
		var start_y = y*20+2
		if(IFBlcok=="block"){
			paintObject.cxt.fillStyle = "rgba(0,255,0,1)"
		}else if(IFBlcok=="destination"){
			paintObject.cxt.fillStyle = "rgba(0,0,255,1)"
		}else if(IFBlcok=="path"){
			paintObject.cxt.fillStyle = "rgba(0,255,255,1)"
		}else{
			paintObject.cxt.fillStyle = "rgba(255,0,0,1)"
		}
		
		paintObject.cxt.fillRect(start_x,start_y,16,16);
	}
	//清除指定坐标的填色
	paintObject.ClearCell=function(x,y){
		var start_x = x*20+2
		var start_y = y*20+2
		paintObject.cxt.fillStyle = "rgba(40,40,40,1)"
		paintObject.cxt.fillRect(start_x,start_y,16,16);
	}
	//随机添加障碍物和目标位置
	//arg:0-1间的参数，决定障碍物密集度。 end_coordinateObject:障碍物不能绘制在该坐标点，作为目的地
	paintObject.InitBlock = function(arg,end_coordinateObject){
		var destination_x = end_coordinateObject.x
		var destination_y = end_coordinateObject.y
		for(var i=2;i<25;i++){
			for(var j=2;j<25;j++){
				if(Math.random()<arg && (i!=destination_x || j!=destination_y)){
					paintObject.FillCell(i,j,"block")
					//添加进障碍物列表里
					paintObject.blocklist.insert(new CoordinateObject(i,j))
				}
			}		
		}
		paintObject.blocklist.print()
		//绘制目的地
		paintObject.FillCell(destination_x,destination_y,"destination")
	}

	//将角色向右移动
	paintObject.MoveToRight=function(actor){
		//判断右方是否有位置可以移动
		if(actor.x>=24 || paintObject.blocklist.find(new CoordinateObject(actor.x+1,actor.y))){
			return
		}
		//清除当前角色位置
		this.ClearCell(actor.x,actor.y)
		//填色新的角色位置
		actor.x++
		this.FillCell(actor.x,actor.y)
	}
	//将角色向左移动
	paintObject.MoveToLeft=function(actor){
		//判断左方是否有位置可以移动
		if(actor.x<=0 || paintObject.blocklist.find(new CoordinateObject(actor.x-1,actor.y))){
			return
		}
		//清除当前角色位置
		this.ClearCell(actor.x,actor.y)
		//填色新的角色位置
		actor.x--
		this.FillCell(actor.x,actor.y)
	}
	//将角色向上移动
	paintObject.MoveToUp=function(actor){
		//判断上方是否有位置可以移动
		if(actor.y<=0 || paintObject.blocklist.find(new CoordinateObject(actor.x,actor.y-1))){
			return
		}
		//清除当前角色位置
		this.ClearCell(actor.x,actor.y)
		//填色新的角色位置
		actor.y--
		this.FillCell(actor.x,actor.y)
	}
	//将角色向下移动
	paintObject.MoveToDown=function(actor){
		//判断下方是否有位置可以移动
		if(actor.y>=24 || paintObject.blocklist.find(new CoordinateObject(actor.x,actor.y+1))){
			return
		}
		//清除当前角色位置
		this.ClearCell(actor.x,actor.y)
		//填色新的角色位置
		actor.y++
		this.FillCell(actor.x,actor.y)
	}

	//创建角色
	paintObject.CreatActor=function(){
		var actor = new Object()
		actor.x = 1
		actor.y = 1
		this.FillCell(1,1)
		return actor
	}
	//监听键盘事件
	paintObject.StartListenEvent = function(actor){
		document.onkeydown = function(e){
		   var keycode = e.which;
		   var realkey = String.fromCharCode(e.which);
		   // alert("按键码:" + keycode + "字符:" + realkey);
		   if(keycode == 37){
			   paintObject.MoveToLeft(actor)
		   }else if(keycode == 38){
			   paintObject.MoveToUp(actor)
		   }else if(keycode == 39){
			   paintObject.MoveToRight(actor)
		   }else if(keycode == 40){
			   paintObject.MoveToDown(actor)
		   }
	   }
	} 
    return paintObject
}) );




