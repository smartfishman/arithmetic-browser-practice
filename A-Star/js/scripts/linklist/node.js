/*
作者：李青山
日期：2019年3月4日
功能概述：node类，用于linklist。
*/
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		console.log("define done!")
		define([], factory)
	} else if (typeof exports === 'object') {
		module.exports = factory()
	} else {
		root.returnExports = factory() //如果没有AMD/CMD和CommonJS就挂在全局对象下
	}
})(this, function () {
	function Node(obj){
		this.obj = obj?obj:new Object();
		this.next = null;
		Node.prototype.equal = function(node){
			var obj2 = node.obj
			if(this.obj.equal&&obj2.equal){
				return this.obj.equal(obj2)
			}else{
				return this.obj==obj2
			}
		}
	}
	return Node
})