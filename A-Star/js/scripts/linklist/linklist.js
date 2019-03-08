/*
作者：李青山
日期：2019年3月4日
功能概述：实现linklist单向链表功能。
*/
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(["Node"], factory)
	} else if (typeof exports === 'object') {
		module.exports = factory()
	} else {
		root.returnExports = factory() //如果没有AMD/CMD和CommonJS就挂在全局对象下
	}
})(this, function (Node) {
	console.log("LinkedList work")
	function LinkedList(){
		this.head = new Node('head');
		LinkedList.prototype.find = find;
		LinkedList.prototype.insert = insert;
		LinkedList.prototype.insert_NoRepeat = insert_NoRepeat;
		LinkedList.prototype.frontNode = frontNode;
		LinkedList.prototype.remove = remove;
		LinkedList.prototype.print = print;
		LinkedList.prototype.sort = sort;
		function find(obj){
			var node = new Node(obj)
			var currentNode = this.head;//从头结点开始
			while(currentNode && !currentNode.equal(node)){
				currentNode = currentNode.next;
			}
			return currentNode;//找到返回结点数据，没找到返回null
		}
		//在obj_origin后面插入obj_insert
		function insert(obj_insert,obj_origin){
			var currentNode= this.find(obj_origin);	
			if(!currentNode){
				currentNode = this.head//用户不传参或者未找到obj_origin时，默认从头部插入。
			}
			var newNode = new Node(obj_insert);			 		
			newNode.next = currentNode.next;
			currentNode.next = newNode;
		}
		//插入不重复的对象，
		function insert_NoRepeat(obj_insert,obj_origin){
			if(this.find(obj_insert)){
				return
			}else{
				this.insert(obj_insert,obj_origin)
			}
		}
		function frontNode(obj){
			if(!this.find(obj)){
				return null
			}
			var currentNode = this.head;
			var node = new Node(obj)
			while(currentNode.next && !currentNode.next.equal(node)){
				currentNode = currentNode.next;
			}   
			return currentNode;
		}
		//
		function remove(obj){
			var frontNode = this.frontNode(obj);
			//console.log(frontNode.element);
			if(frontNode){
				frontNode.next = frontNode.next.next;
				return true
			}else{
				return false
			}			
		}
		function print(){
			var currentNode = this.head;
			var result = "";
			while(currentNode && currentNode.next!=null){
				result += currentNode.next.obj.toString()+",";//为了不显示head结点
				currentNode = currentNode.next;
			}
			console.log(result)
		}
		//使链表根据指定属性完成正逆排序
		//attr:需要排序的属性 flag：是否正排序
		function sort(attr,flag){
			//这里采用快速排序算法
			//交换两个节点的数据
			function swap(node_1,node_2){
				var temp = node_1.obj 
				node_1.obj = node_2.obj
				node_2.obj = temp
			}
			//取中值
			function partion(start_node,end_node){
				if(start_node == end_node || start_node.next == end_node){
					return start_node
				}
				var p = start_node 
				var q = start_node
				var refer = start_node
				while(q!= end_node){	
					if(flag?q.obj[attr] < refer.obj[attr]:q.obj[attr] > refer.obj[attr]){
						p = p.next
						swap(p,q)
					}
					q = q.next
				}
				swap(p,refer)
				return p
			}
			//递归
			function quick_sort(start_node,end_node){
				
				if(start_node == end_node || start_node.next == end_node){
					return
				}
				var mid = partion(start_node,end_node)				
				quick_sort(start_node,mid)
				quick_sort(mid.next,end_node)
			}
			//执行排序
			return (function quickSort(linklist){
				if(linklist.head.next == null){
					return linklist
				}
				quick_sort(linklist.head.next,null)
				return linklist
			})(this)
		}
	}
	
	return LinkedList
})