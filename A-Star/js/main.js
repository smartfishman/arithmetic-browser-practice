/*
作者：李青山
日期：2019年3月4日
功能概述：基于requirejs构架整个项目，此文件是项目总入口。该项目主要是为了练习A星寻路算法的实际应用。
*/
require.config({

　　　　baseUrl: "js/scripts",

　　　　paths: {
			//TODO:关于路径定义，只在一个地方调用时,比如"Node":"linklist/node"，在require调用中既可以
			//用require(["Node"],function(Node){}),也可以用require(["linklist/node"],function(Node){})。
			//但在一个项目中不能混用这两种require方式，否则会导致module加载失败,原因不明，待证。
			//define(["Node"],function(Node){})也是同样情况。
			"Paint":"paint",
			"Node":"linklist/node",
			"Linklist":"linklist/linklist",
			"CoordinateObject":"coordinateObject",
			"A_star":"a-star",
　　　　}
　　});
require(["Paint","Linklist","Node","CoordinateObject","A_star"], function(Paint,Linklist,Node,CoordinateObject,A_star) {
	//绘制地图
	Paint.DrawMap()
	//创建角色
	var actor = Paint.CreatActor()
	//开始监听键盘事件控制actor
	Paint.StartListenEvent(actor)	
	var start_coordinateObject = new CoordinateObject(actor.x,actor.y)
	var end_coordinateObject = new CoordinateObject(16,20)
	//绘制障碍物
	Paint.InitBlock(0.30,end_coordinateObject)
	//初始化A星寻路数据
	var a_star = new A_star(start_coordinateObject,end_coordinateObject,Paint.blocklist)
	//开始寻路，返回路径包括的所有坐标点
	var coordinateList = a_star.start_pathFind()
	console.log("result:")
	coordinateList.print()
	var destination =coordinateList.find(end_coordinateObject)
	if(destination){
		//坐标集合中包含终点，则画出成功寻找到的路径
		var coordinate_path = destination.obj
		while((coordinate_path = coordinate_path.parentCoo).parentCoo){			
			Paint.FillCell(coordinate_path.x,coordinate_path.y,"path")
		}		
	}else{
		console.log("failed to find path to destination")
	}
	
	
});