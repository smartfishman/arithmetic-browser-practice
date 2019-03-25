/*
作者：李青山
日期：2019年3月23日
功能概述：二叉排序树实现【左节点<根节点<=右节点】
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

  //获取二叉树高度,时间复杂度为O(n),空间复杂度O(height)
  BinaryTree.prototype.getHeight = function (rootNode) {
    if (!rootNode) {
      return 0
    }
    return Math.max(this.getHeight(rootNode.lChild), this.getHeight(rootNode.rChild)) + 1
  }

  //对根节点右旋转，适用于左子树插入左节点的失衡情况
  BinaryTree.prototype.balance_ll = function (rootNode, rootNode_parent) {
    if (!rootNode || !rootNode.lChild) {
      return
    }
    //判断父节点与根节点的关系
    let flag = "";
    if (!rootNode_parent) {
      flag = "no_parent";
    } else {
      flag = (rootNode_parent.lChild === rootNode ? "lChild" : "rChild");
    }
    //右旋转
    let newRootNode = rootNode.lChild;
    rootNode.lChild = newRootNode.rChild;
    newRootNode.rChild = rootNode;

    if (flag === "no_parent") {//不存父节点，则该节点为该二叉树的根节点
      this.rootNode = newRootNode;
    } else {//若该根节点存在父节点，则将新子树赋值给父节点
      rootNode_parent[flag] = newRootNode;
    }
  }

  //对根节点左旋转，适用于右子树插入右节点的失衡情况
  BinaryTree.prototype.balance_rr = function (rootNode, rootNode_parent) {
    if (!rootNode || !rootNode.rChild) {
      return
    }
    //判断父节点与根节点的关系
    let flag = "";
    if (!rootNode_parent) {
      flag = "no_parent";
    } else {
      flag = (rootNode_parent.lChild === rootNode ? "lChild" : "rChild");
    }
    //左旋转
    let newRootNode = rootNode.rChild;
    rootNode.rChild = newRootNode.lChild;
    newRootNode.lChild = rootNode;

    if (flag === "no_parent") {//不存父节点，则该节点为该二叉树的根节点
      this.rootNode = newRootNode;
    } else {//若该根节点存在父节点，则将新子树赋值给父节点
      rootNode_parent[flag] = newRootNode;
    }
  }

  //对根节点的左子树左旋转，再对根节点右旋转，适用于左子树插入右节点的失衡情况
  BinaryTree.prototype.balance_lr = function (rootNode, rootNode_parent) {
    if (!rootNode) {
      return
    }
    this.balance_rr(rootNode.lChild, rootNode);
    this.balance_ll(rootNode, rootNode_parent);
  }

  //对根节点的右子树右旋转，再对根节点左旋转，适用于右子树插入左节点的失衡情况
  BinaryTree.prototype.balance_rl = function (rootNode, rootNode_parent) {
    if (!rootNode) {
      return
    }
    this.balance_ll(rootNode.rChild, rootNode);
    this.balance_rr(rootNode, rootNode_parent);
  }

  //遍历二叉树所有节点，将失衡的子树进行旋转。【后序遍历】
  BinaryTree.prototype.balanceTree = function () {
    (function recursion(rootNode, h) {
      if (!rootNode) {
        return h
      }
      h++;
      //记录左右子树深度
      let lChild_h = recursion(rootNode.lChild, h)
      let rChild_h = recursion(rootNode.rChild, h)
      //若左右子树深度相差大于1，则需进行旋转。
      //此时分为四种情况:
      //若右子树深度更深，且右子树的右子树深度更深，则用balance_rr。若右子树的左子树深度更深，则用balance_rl
      //若左子树深度更深，且左子树的左子树深度更深，则用balance_ll。若左子树的右子树深度更深，则用balance_lr


      return h
    })(this.rootNode, 0)
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

  //为二叉树删除节点
  //将被删除节点分为三种类型分别计算  
  BinaryTree.prototype.removeNode = function (obj) {
    //查找对应的节点及其父节点
    let rootNode = this.rootNode;
    let node_remove = null;
    let node_parent = null;
    //因为该二叉树实现允许存在相同值的节点，且按照始终向右扩展的规律保存，则在查找节点时需要始终只查找深度最深的一个。
    (function findObj(rootNode) {
      if (!rootNode) {
        return
      }
      if (obj === rootNode.obj) {
        node_remove = rootNode
        //判断该节点是否还有相同值的节点在更深的右子树中 
        if (rootNode.rChild) {
          let node_mostLeft = rootNode.rChild
          let node_mostLeft_parent = node_parent
          while (node_mostLeft.lChild) {
            node_mostLeft_parent = node_mostLeft
            node_mostLeft = node_mostLeft.lChild
          }
          if (node_mostLeft.obj === node_remove.obj) { //当该根节点的右子树的最左子节点等于根节点的值时，则需继续查找
            node_parent = node_mostLeft_parent
            findObj(node_mostLeft)
          }
        }
        return
      }
      node_parent = rootNode
      if (obj < rootNode.obj) {
        findObj(rootNode.lChild)
      } else {
        findObj(rootNode.rChild)
      }
    })(rootNode);
    if (!node_remove) {
      return false
    }
    //若待删除节点是叶节点，则直接删除
    if (!node_remove.lChild && !node_remove.rChild) {
      if (!node_parent) {//被删除的是根节点
        this.rootNode = null
      } else {
        node_parent.lChild === node_remove ? (node_parent.lChild = null) : (node_parent.rChild = null)
      }
      return true
    }
    //若待删除节点有且只有一个子树，则将父节点指向子树的根节点
    if (!(node_remove.lChild && node_remove.rChild)) {
      let cur_node = node_remove.lChild || node_remove.rChild
      if (!node_parent) {//被删除的是根节点
        this.rootNode = cur_node
      }
      node_parent.lChild === node_remove ? node_parent.lChild = cur_node : node_parent.rChild = cur_node
      return true
    }
    //若待删除节点有两个子树，则将右子树的最左节点值暂存，然后删除最左节点，然后将暂存值赋给待删除节点
    //TODO 始终只删除右子树节点会导致二叉树失衡，是否可以轮换删除左右子树节点？
    if (node_remove.lChild && node_remove.rChild) {
      let node_mostLeft = node_remove.rChild
      let node_mostLeft_parent = node_remove
      //找到右子树的最左节点
      while (node_mostLeft.lChild) {
        node_mostLeft_parent = node_mostLeft
        node_mostLeft = node_mostLeft.lChild
      }
      let obj_min = node_mostLeft.obj
      //删除最左节点
      if (node_mostLeft === node_remove.rChild) {//特殊情形，最左节点为右子树的根节点
        node_mostLeft_parent.rChild = node_mostLeft.rChild
      } else {
        node_mostLeft_parent.lChild = node_mostLeft.rChild
      }
      //将最小值赋值给待删除节点
      node_remove.obj = obj_min
    }
    return false
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

  //将二叉树以树形结构输出[中序遍历]
  BinaryTree.prototype.toStringTree = function () {
    let rootNode = this.rootNode;
    let result = "";
    let h = 0;
    (function inorderTraversal(rootNode) {
      if (!rootNode) {
        return
      }
      h++;
      inorderTraversal(rootNode.rChild);
      for (let i = 0; i < h; i++) {
        result = result + "    ";
      }
      result = result + rootNode.obj + "\n";
      inorderTraversal(rootNode.lChild);
      h--;
    })(rootNode);
    return result;
  }





  return BinaryTree
})
