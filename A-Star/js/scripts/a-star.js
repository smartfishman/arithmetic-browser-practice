/*
作者：李青山
日期：2019年3月7日
功能概述：A星寻路的具体实现
*/
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		console.log("define A_star done!")
		define(["Linklist","CoordinateObject"], factory)
	} else if (typeof exports === 'object') {
		module.exports = factory()
	} else {
		root.returnExports = factory() //如果没有AMD/CMD和CommonJS就挂在全局对象下
	}
})(this, function (Linklist,CoordinateObject) {
	function A_star(start_coordinateObject,end_coordinateObject,blockList){
		this.startPosition = start_coordinateObject		
		this.endPosition = end_coordinateObject	
		this.openlist = new Linklist()
		this.closedlist = new Linklist()
		this.blockList = blockList
	}
	A_star.prototype.countGHF = function(coordinateObject,coordinateObject_parent){
		coordinateObject.G = coordinateObject_parent.G + 1
		coordinateObject.H = this.countH(coordinateObject)
		coordinateObject.F = coordinateObject.G + coordinateObject.H
		coordinateObject.parentCoo = coordinateObject_parent
	}
	A_star.prototype.countH = function(coordinateObject){
		//这里采用曼哈顿距离计算H值
		var a = Math.abs(coordinateObject.x - this.endPosition.x)
		var b = Math.abs(coordinateObject.y - this.endPosition.y)
		return a+b
	}
	A_star.prototype.isBlock = function(coordinateObject){
		if(this.blockList.find(coordinateObject) || coordinateObject.x>24 || coordinateObject.x<0
		|| coordinateObject.y>24 || coordinateObject.y<0){
			return true
		}else{
			return false
		}
	}
	A_star.prototype.findWalkableSquare = function(coordinateObject){
		var list = new Linklist()		
		var array = [-1,1]
		for(var i in array){
			var coordinateObject_insert = new CoordinateObject(coordinateObject.x+array[i],coordinateObject.y)
			if(!this.isBlock(coordinateObject_insert)){
				list.insert(coordinateObject_insert)
				//计算该点的GHF值
				this.countGHF(coordinateObject_insert,coordinateObject)
			}
			coordinateObject_insert = new CoordinateObject(coordinateObject.x,coordinateObject.y+array[i])
			if(!this.isBlock(coordinateObject_insert)){
				list.insert(coordinateObject_insert)
				this.countGHF(coordinateObject_insert,coordinateObject)
			}
		}		
		return list
	}
	A_star.prototype.start_pathFind = function(){
		//计算初始点的G H F值
		this.startPosition.G = 0
		this.startPosition.H = this.countH(this.startPosition)
		this.startPosition.F = this.startPosition.G + this.startPosition.H
		//将初始点放入openlist
		this.openlist.insert_NoRepeat(this.startPosition)
		while(this.openlist.head.next){ //openlist被清空时跳出循环
			// this.openlist.print()
			// this.closedlist.print()
			var currentCoordinate = this.openlist.sort("F",true).head.next.obj 
			this.openlist.remove(currentCoordinate)
			this.closedlist.insert_NoRepeat(currentCoordinate)			
			//是否已经到达终点
			if(this.closedlist.find(this.endPosition)){
				break;
			}
			//寻找当前位置的邻近点集合
			var adjacentCoordinateList = this.findWalkableSquare(currentCoordinate)
			//遍历
			var iterator = adjacentCoordinateList.head
			while(iterator = iterator.next){
				//若已在closed列表，continue
				if(this.closedlist.find(iterator.obj)){
					continue
				}
				//若不在openlist则添加
				var node_existed = this.openlist.find(iterator.obj)
				if(!node_existed){
					this.openlist.insert_NoRepeat(iterator.obj)
				}else{//若已在openlist，则比较G值，取更小的值作为父节点,即为更优的路径。
					if(iterator.obj.G < node_existed.obj.G){
						this.countGHF(node_existed.obj,iterator.obj.parentCoo)
					}
				}
			}			
		}
		//寻路结束，返回closedlist
		return this.closedlist
	}
	
	
	return A_star
})