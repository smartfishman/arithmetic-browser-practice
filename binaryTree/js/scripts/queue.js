/*
作者：李青山
日期：2019年3月24日
功能概述：实现数据结构：队列
*/
"use strict";
(function (root, factory) {

  // commonJS 规范
  if (typeof module === 'object' && module && module.exports) {
    module.exports = factory(require("./test.js"));
  }

  // AMD规范
  else if (typeof define === 'function' && define.amd) {
    define([], factory);
  }

  // 浏览器实现
  else {
    root.paintObject = factory();
  }
})(this, function () {
  function Node(obj) {
    this.obj = obj
    this.next = null
    this.previous = null
  }
  function Queue() {
    this.head = null
    this.tail = new Node()
  }

  //从尾部推入新元素
  Queue.prototype.push = function (obj) {
    if (!this.head) {
      this.head = new Node(obj)
      this.head.next = this.tail
      this.tail.previous = this.head
    } else {
      let newNode = new Node(obj)
      this.tail.previous.next = newNode
      newNode.next = this.tail
      this.tail.previous = newNode
    }
  }

  //从头部提出元素
  Queue.prototype.pop = function () {
    if (!this.head) {
      return null
    } else {
      var result = this.head.obj
      if (this.head.next !== this.tail) {
        this.head = this.head.next
      } else {
        this.head = null
      }
      return result
    }
  }


  return Queue
})