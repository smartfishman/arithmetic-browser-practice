/*
作者：李青山
日期：2019年3月23日
功能概述：熟悉二叉树的相关性质并实现对应函数
*/
"use strict"
require.config({

　　　　baseUrl: "js/scripts",

　　　　paths: {
			    //TODO:关于路径定义，只在一个地方调用时,比如"Node":"linklist/node"，在require调用中既可以
			    //用require(["Node"],function(Node){}),也可以用require(["linklist/node"],function(Node){})。
			    //但在一个项目中不能混用这两种require方式，否则会导致module加载失败,原因不明，待证。
			    //define(["Node"],function(Node){})也是同样情况。
			    "BinaryTree":"binaryTree",
　　　　}
　　});
require(["BinaryTree"], function (BinaryTree) {
  let array = [3,2,5,7,1,-5,4]
  let binaryTreeTest = new BinaryTree(array)
  console.log(binaryTreeTest)
  let binaryTree = new BinaryTree(array)
  binaryTree.addNode(5, binaryTree.rootNode)
  binaryTree.addNode(-4, binaryTree.rootNode)
  binaryTree.addNode(-6, binaryTree.rootNode)
  binaryTree.addNode(2.5, binaryTree.rootNode)
  binaryTree.addNode(2.25, binaryTree.rootNode)
  binaryTree.addNode(2.6, binaryTree.rootNode)
  console.log("二叉树顺序输出结构【中序遍历】：")
  console.log(binaryTree.inorderTraversal())
  console.log("二叉树带缩进的目录输出结构【先序遍历】：")
  console.log(binaryTree.perorderTraversal())
  console.log("二叉树对所有节点求其与所有子节点值的和（计算文件夹里的文件大小？）【后序遍历】：")
  binaryTree.postorderTraversal()
  console.log(binaryTree)
});