﻿/*
作者：李青山
日期：2019年3月23日
功能概述：二叉排序树实现【左节点<根节点<右节点】
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
  function BinaryTreeNode(obj) {
    this.obj = obj;
    this.lChild = null;
    this.rChild = null;
  }

  function BinaryTree(array) {
    this.rootNode = null;
    for (let i in array) {
      this.rootNode = this.addNode(array[i], this.rootNode)
    }
  }
  //为二叉树添加叶节点，因为js是值传递格式，所以需要返回节点数据用于父节点保存
  BinaryTree.prototype.addNode = function (obj, rootNode) {
    //若没有根节点，则说明已到达叶节点，创建新的节点数据并返回节点
    if (!rootNode) {
      rootNode = new BinaryTreeNode(obj)
      return rootNode
    }
    //obj比rootNode中的值小则加入左节点，否则加入右节点
    if (obj < rootNode.obj) {
      rootNode.lChild = this.addNode(obj, rootNode.lChild)
    } else {
      rootNode.rChild = this.addNode(obj, rootNode.rChild)
    }
    return rootNode
  }
  //为了实现二叉树的顺序输出，这里采用传统的中序遍历（时间复杂度O(n),空间复杂度O(h),n为节点数，h为二叉树高度）
  BinaryTree.prototype.inorderTraversal = function () {
    if (!this.rootNode) {
      return null
    }
    //输出结果按数组格式保存在arr中return
    var arr = [];
    (function traversal(rootNode) {
      if (rootNode.lChild) {
        traversal(rootNode.lChild)
      }
      arr[arr.length] = rootNode.obj
      if (rootNode.rChild) {
        traversal(rootNode.rChild)
      }
    })(this.rootNode)
    return arr
  }
  return BinaryTree
})