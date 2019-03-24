/*
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
    define(["Queue"], factory);
  }

  // 浏览器实现
  else {
    root.paintObject = factory();
  }
})(this, function (Queue) {

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

  //先序遍历,打印出带缩进的二叉树结构
  BinaryTree.prototype.preorderTraversal = function () {
    if (!this.rootNode) {
      return null
    }
    //输出结果为字符串，\n换行，空格缩进
    var str = "";
    var h = 0;//深度
    (function traversal(rootNode) {
      for (let i = 0; i < h; i++) {
        str = str + "  "
      }
      str = str + String(rootNode.obj) + "\n"
      h++//进入下一层
      if (rootNode.lChild) {
        traversal(rootNode.lChild)
      }
      if (rootNode.rChild) {
        traversal(rootNode.rChild)
      }
      h--//返回上一层
    })(this.rootNode)
    return str
  }

  //后序遍历，计算二叉树各节点和
  BinaryTree.prototype.postorderTraversal = function () {
    if (!this.rootNode) {
      return 0
    }
    //输出各节点之和
    var result = (function traversal(rootNode) {
      var resultL = 0
      var resultR = 0
      if (rootNode.lChild) {
        resultL = traversal(rootNode.lChild)
      }
      if (rootNode.rChild) {
        resultR = traversal(rootNode.rChild)
      }
      rootNode.obj_sum = resultL + resultR + rootNode.obj
      return rootNode.obj_sum
    })(this.rootNode)
    return result
  }
  //morris算法实现中序遍历
  //该算法利用时间换空间，达到了O(1)的空间复杂度，可用于运算空间不足的环境中。
  //输出结果依然保留在数组arr中返回
  BinaryTree.prototype.inorderTraversal_morris = function () {
    var arr = []
    var rootNode = this.rootNode
    while (rootNode) {
      if (!rootNode.lChild) {//左子树不存在，输出根节点，将新的访问节点转向当前根节点的右节点
        arr[arr.length] = rootNode.obj
        rootNode = rootNode.rChild
      } else {//左子树存在，则找到左子树的最右子节点，将其右节点指针指向根节点
        let temp = rootNode.lChild
        while (temp.rChild && temp.rChild !== rootNode) {
          temp = temp.rChild
        }
        if (!temp.rChild) {
          temp.rChild = rootNode
          rootNode = rootNode.lChild
        } else {
          arr[arr.length] = rootNode.obj
          temp.rChild = null
          rootNode = rootNode.rChild
        }
      }
    }
    return arr
  }

  //翻转二叉树
  BinaryTree.prototype.invertBinaryTree = function () {
    var rootNode = this.rootNode;
    (function invert(rootNode) {
      if (!rootNode) {
        return null
      }
      var temp = rootNode.lChild
      rootNode.lChild = rootNode.rChild
      rootNode.rChild = temp
      invert(rootNode.lChild)
      invert(rootNode.rChild)
    })(rootNode)
  }
  //判断二叉树是否为完全二叉树，根据以下两个性质得出结果：
  //1、若右子树不为空，左子树为空，则一定不是二叉树。
  //2、当按层次遍历节点时，若前面所有节点满足性质1，则当右子树为空时，此时的二叉树可暂时称为完全二叉树，
  //若所有后面的节点都没有子节点,则为完全二叉树，否则不是。
  //返回值为true时：时间复杂度 O(n) 空间复杂度O(w) w为二叉树宽度
  BinaryTree.prototype.isCompleteBinaryTree = function () {    
    if (!this.rootNode) {//空二叉树也是完全二叉树
      return true
    }
    let queue = new Queue()
    queue.push(this.rootNode)
    let isComplete = false
    while (queue.head) {
      let curNode = queue.pop()
      //判断当前节点是否满足性质1
      if ((!curNode.lChild) && curNode.rChild) {
        return false
      }
      //是否满足性质2
      if (isComplete && (curNode.lChild || curNode.rChild)) {
        return false
      }
      //若右子树为空，则后面所有节点不可再有子节点
      if (!curNode.rChild) {
        isComplete = true
      }
      //按层次推入新节点
      if (curNode.lChild) {
        queue.push(curNode.lChild)
      }
      if (curNode.rChild) {
        queue.push(curNode.rChild)
      }
    }
    return isComplete
  }



  return BinaryTree
})
