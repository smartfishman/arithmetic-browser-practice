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
			    "Queue":"queue",
　　　　}
　　});
require(["BinaryTree", "Queue"], function (BinaryTree, Queue) {
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
  console.log(binaryTree.preorderTraversal())
  console.log("二叉树对所有节点求其与所有子节点值的和（计算文件夹里的文件大小？）【后序遍历】：")
  binaryTree.postorderTraversal()
  console.log(binaryTree)
  console.log("二叉树中序遍历的morris算法实现【缩小了空间复杂度，增加了时间复杂度】")
  console.log(binaryTree.inorderTraversal_morris())
  console.log("二叉树翻转，然后中序遍历输出")
  binaryTree.invertBinaryTree()
  console.log(binaryTree.inorderTraversal())
  console.log("判断二叉树是否为完全二叉树:")
  console.log(binaryTree.toStringTree())
  console.log(binaryTree.isCompleteBinaryTree())
  let array2 = [3, 2, 5, 1,2.5,]
  let binaryTree_complete = new BinaryTree(array2)
  console.log(binaryTree_complete.toStringTree())
  console.log(binaryTree_complete.isCompleteBinaryTree())
  console.log("删除二叉树节点:")
  binaryTree_complete.removeNode(2.5)
  console.log(binaryTree_complete.toStringTree())
  console.log("---------------------------------------")
  binaryTree_complete.removeNode(2)
  console.log(binaryTree_complete.toStringTree())
  console.log("---------------------------------------")
  binaryTree_complete.removeNode(3)
  console.log(binaryTree_complete.toStringTree())
  console.log("计算二叉树高度:")
  console.log(binaryTree_complete.toStringTree())
  console.log(binaryTree_complete.getHeight(binaryTree_complete.rootNode))
  console.log(binaryTree.toStringTree())
  console.log(binaryTree.getHeight(binaryTree.rootNode))
  console.log("旋转二叉树:")
  console.log("左旋转")
  binaryTree.balance_rr(binaryTree.rootNode)
  console.log(binaryTree.toStringTree())
  console.log("右旋转")
  binaryTree.balance_ll(binaryTree.rootNode)
  console.log(binaryTree.toStringTree())
  console.log("双旋转")
  binaryTree.balance_lr(binaryTree.rootNode)
  console.log(binaryTree.toStringTree())
  console.log("双旋转")
  binaryTree.balance_rl(binaryTree.rootNode)
  console.log(binaryTree.toStringTree())


});