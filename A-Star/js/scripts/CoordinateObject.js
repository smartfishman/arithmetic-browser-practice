/*
作者：李青山
日期：2019年3月5日
功能概述：CoordinateObject类，用于表示坐标，并实现了equal和toString方法。
*/
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory)
	} else if (typeof exports === 'object') {
		module.exports = factory()
	} else {
		root.returnExports = factory() 
	}
})(this, function () {
	function CoordinateObject(x,y){
		this.x = x;
		this.y = y;
		//以下是A星寻路算法需要用到的值
		this.G = null;
		this.H = null;
		this.F = null;
		this.parentCoo = null; 
		CoordinateObject.prototype.equal = function(coordinateObject){
			if(this.x == coordinateObject.x && this.y == coordinateObject.y){
				return true
			}else{
				return false
			}
		}
		CoordinateObject.prototype.toString = function(){
			return "[x:"+this.x+",y:"+this.y+"]"
		}
		CoordinateObject.prototype.toString_GHF = function(){
			return "[x:"+this.x+",y:"+this.y+",G:"+this.G+",H:"+this.H+",F:"+this.F+"]"
		}
	}
	return CoordinateObject
})