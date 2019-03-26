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
    //height:该节点所处二叉树位置的深度,自平衡二叉树需要的属性。 当插入、删除、旋转节点时都需要适时更新影响到的节点height
    //自平衡二叉树的旋转必须伴随着插入和删除，若直接调用旋转，会导致height错乱。
    //因为旋转在更新深度时不会考虑旋转节点的父节点树，插入、删除时会考虑从二叉树的根节点到变动节点所有途经节点的height变化情况。
    this.height = 1;
  }

  function BinaryTree(array) {
    this.rootNode = null;
    for (let i in array) {
      this.addNode(array[i])
      //console.log(this.toStringTree())
    }
  }

  //获取节点高度值
  BinaryTree.prototype.getHeight = function (rootNode) {
    if (!rootNode) {
      return 0
    }
    return rootNode.height
  }

  //对根节点右旋转，适用于左子树插入左节点的失衡情况
  //height变化的节点： rootNode, rootNode.lChild（newRootNode）
  BinaryTree.prototype.balance_ll = function (rootNode, rootNode_parent) {
    //console.log("balance_ll work")
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
    //更新深度（先更新深度较小的点）
    rootNode.height = Math.max(this.getHeight(rootNode.lChild), this.getHeight(rootNode.rChild)) + 1
    newRootNode.height = Math.max(this.getHeight(newRootNode.lChild), this.getHeight(newRootNode.rChild)) + 1
    return newRootNode
  }

  //对根节点左旋转，适用于右子树插入右节点的失衡情况
  //height变化的节点： rootNode, rootNode.rChild（newRootNode）
  BinaryTree.prototype.balance_rr = function (rootNode, rootNode_parent) {
    //console.log("balance_rr work")
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
    //更新深度（先更新深度较小的点）
    rootNode.height = Math.max(this.getHeight(rootNode.lChild), this.getHeight(rootNode.rChild)) + 1
    newRootNode.height = Math.max(this.getHeight(newRootNode.lChild), this.getHeight(newRootNode.rChild)) + 1
    return newRootNode
  }

  //对根节点的左子树左旋转，再对根节点右旋转，适用于左子树插入右节点的失衡情况
  BinaryTree.prototype.balance_lr = function (rootNode, rootNode_parent) {
    if (!rootNode) {
      return
    }
    this.balance_rr(rootNode.lChild, rootNode);
    return this.balance_ll(rootNode, rootNode_parent);
  }

  //对根节点的右子树右旋转，再对根节点左旋转，适用于右子树插入左节点的失衡情况
  BinaryTree.prototype.balance_rl = function (rootNode, rootNode_parent) {
    if (!rootNode) {
      return
    }
    this.balance_ll(rootNode.rChild, rootNode);
    return this.balance_rr(rootNode, rootNode_parent);
  }

  //遍历二叉树所有节点，将失衡的子树进行旋转。【中序遍历】
  //TODO 有待三思！！
  BinaryTree.prototype.balanceTree = function () {
    //计算二叉树当前各节点高度
    this.getHeight();
    (function recursion(rootNode) {
      if (!rootNode) {
        return
      }
      //从
      recursion(rootNode.lChild)
      recursion(rootNode.rChild)
      //若左右子树深度相差大于1，则需进行旋转。
      //此时分为四种情况:
      //若右子树深度更深，且右子树的右子树深度更深，则用balance_rr。若右子树的左子树深度更深，则用balance_rl
      //若左子树深度更深，且左子树的左子树深度更深，则用balance_ll。若左子树的右子树深度更深，则用balance_lr


      return
    })(this.rootNode)
  }


  //为二叉树添加叶节点
  BinaryTree.prototype.addNode = function (obj) {
    this.rootNode = (function recursion(binaryTree, obj, rootNode, rootNode_parent) {
      //若没有根节点，则说明已到达叶节点，创建新的节点数据并返回节点
      if (!rootNode) {
        rootNode = new BinaryTreeNode(obj);
        return rootNode
      }
      //obj比rootNode中的值小则加入左节点，否则加入右节点
      if (obj < rootNode.obj) {
        rootNode.lChild = recursion(binaryTree, obj, rootNode.lChild, rootNode)
        if (binaryTree.getHeight(rootNode.lChild) - binaryTree.getHeight(rootNode.rChild) == 2) {
          //失衡，则左子树必然存在
          if (obj < rootNode.lChild.obj) {//左子树插入左节点
            rootNode = binaryTree.balance_ll(rootNode, rootNode_parent)
          } else {//左子树插入右节点
            rootNode = binaryTree.balance_lr(rootNode, rootNode_parent)
          }
        }
      } else {
        rootNode.rChild = recursion(binaryTree, obj, rootNode.rChild, rootNode)
        if (binaryTree.getHeight(rootNode.rChild) - binaryTree.getHeight(rootNode.lChild) == 2) {
          //失衡，则右子树必然存在
          if (obj < rootNode.rChild.obj) {//右子树插入左节点
            rootNode = binaryTree.balance_rl(rootNode, rootNode_parent)
          } else {//右子树插入右节点
            rootNode = binaryTree.balance_rr(rootNode, rootNode_parent)
          }
        }
      }
      //更新深度
      rootNode.height = Math.max(binaryTree.getHeight(rootNode.lChild), binaryTree.getHeight(rootNode.rChild)) + 1
      return rootNode
    })(this, obj, this.rootNode)
    return
  }

  //为二叉树删除节点
  //将被删除节点分为三种类型分别计算  
  //时间复杂度O(log(2,n)),空间复杂度O(log(2,n))
  BinaryTree.prototype.removeNode = function (obj) {
    //查找对应的节点及其父节点、祖父节点
    let rootNode = this.rootNode;
    let node_remove = null;
    let node_parent = null;
    let node_parent_temp = null;
    let node_grandparent = null;
    let node_grandparent_temp = null;
    let parentNode_queue = new Queue();//用于保存可能会失衡的节点
    //因为该二叉树实现允许存在相同值的节点，且按照始终向右扩展的规律保存，则在查找节点时需要始终只查找深度最深的一个。
    (function findObj(rootNode, rootNode_parent) {
      if (!rootNode) {
        return;
      }
      if (obj === rootNode.obj) {//找到第一个值，保存节点数据，继续向下查找
        node_remove = rootNode;
        node_parent = node_parent_temp;
        node_grandparent = node_grandparent_temp;
      }
      node_parent_temp = rootNode;
      node_grandparent_temp = rootNode_parent;
      if (obj < rootNode.obj) {
        findObj(rootNode.lChild, rootNode);
        parentNode_queue.push({ node: rootNode, remove: "l", original: "r" })
      } else {
        findObj(rootNode.rChild, rootNode);
        parentNode_queue.push({ node: rootNode, remove: "r", original: "l" })
      }
    })(rootNode);
    if (!node_remove) {
      return false;
    }
    //清理掉不会失衡的节点
    while (parentNode_queue.head) {
      if (parentNode_queue.head && parentNode_queue.head.obj.node == node_parent) {
        break
      } else {
        parentNode_queue.pop()
      }
    }
    //第一种情况：若待删除节点是叶节点，则直接删除
    if (!node_remove.lChild && !node_remove.rChild) {
      if (!node_parent) {//被删除的是根节点
        this.rootNode = null
      } else {
        //若待删除节点是父节点的左节点
        if (node_parent.lChild === node_remove) {
          //删除节点
          node_parent.lChild = null
        } else {
          //删除节点
          node_parent.rChild = null
        }
        //检查所有可能失衡的节点并旋转已失衡的节点。
        balanceQueue(this, parentNode_queue)
      }
      return true
    }
    //第二种情况：若待删除节点有且只有一个子树，则将父节点指向子树的根节点
    if (!(node_remove.lChild && node_remove.rChild)) {
      let cur_node = node_remove.lChild || node_remove.rChild
      if (!node_parent) {//被删除的是根节点
        this.rootNode = cur_node
      } else {
        node_parent.lChild === node_remove ? node_parent.lChild = cur_node : node_parent.rChild = cur_node
      }
      //检查所有可能失衡的节点并旋转已失衡的节点。
      balanceQueue(this, parentNode_queue)
      return true
    }
    //第三种情况：若待删除节点有两个子树，则将右子树的最左节点值暂存，然后删除最左节点，然后将暂存值赋给待删除节点
    //这里需要更新parentNode_queue里的节点值
    if (node_remove.lChild && node_remove.rChild) {
      let node_mostLeft = node_remove.rChild
      let node_mostLeft_parent = node_remove
      parentNode_queue.push({ node: node_remove, remove: "r", original: "l" })
      //找到右子树的最左节点
      while (node_mostLeft.lChild) {
        parentNode_queue.push({ node: node_mostLeft, remove: "l", original: "r" })
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
      //检查所有可能失衡的节点并旋转已失衡的节点。
      balanceQueue(this, parentNode_queue)
      return true
    }

    //removeNode的内部函数
    //依次计算queue里所有节点的深度，然后判断是否失衡，若失衡则旋转。
    function balanceQueue(binaryTree, parentNode_queue) {
      //依次检查队列里的节点的左右子树是否失衡（节点已按从node_parent依次向上保存）
      let queueNode = null
      let curNode = null
      let remove_node = null//标识被删除节点存在于curNode的左子树或右子树
      let original_node = null//标识与remove_node相反的子树
      while (parentNode_queue.head) {
        queueNode = parentNode_queue.head
        curNode = queueNode.obj.node
        remove_node = queueNode.obj.remove + "Child"
        original_node = queueNode.obj.original + "Child"
        //重新计算节点深度
        curNode.height = Math.max(binaryTree.getHeight(curNode.lChild), binaryTree.getHeight(curNode.rChild)) + 1
        //判断当前节点左右子树是否失衡，被删除节点存在的子树深度一定更浅。
        if (binaryTree.getHeight(curNode[original_node]) - binaryTree.getHeight(curNode[remove_node]) == 2) {
          //失衡，则curNode[original_node]必然存在,判断curNode[original_node]的左右子树深度
          let height_lChild = curNode[original_node].lChild ? curNode[original_node].lChild.height : 0
          let height_rChild = curNode[original_node].rChild ? curNode[original_node].rChild.height : 0
          if (height_lChild <= height_rChild) {//类似右子树或左子树插入右节点
            binaryTree["balance_" + queueNode.obj.original + "r"](curNode, queueNode.next.obj ? queueNode.next.obj.node : null)
          } else {//类似右子树或左子树插入左节点
            binaryTree["balance_" + queueNode.obj.original + "l"](curNode, queueNode.next.obj ? queueNode.next.obj.node : null)
          }
        }
        parentNode_queue.pop()
      }

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
