/*
作者：李青山
日期：2019年3月21日
功能概述：实现一些常见数学公式
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
  function MathExt() {
    //求正整数n的阶乘,若输入m则计算前m项
    MathExt.prototype.factorial = function (n,m) {
      var m = m || n
      if (!(typeof n == "number" && typeof m == "number" && n > 0 && m > 0 && n >= m)) {
        console.error("factorial的参数不符合规范！")
        return null
      }
      var result = 1
      for (var i = n; i >(n-m); i--) {
        result = result*i
      }
      return result
    }
    //组合数求值
    MathExt.prototype.combinatorial = function (n, m) {      
      if (!(typeof n == "number" && typeof m == "number" && n > 0 && m > 0 && n >= m)) {
        console.error("combinatorial的参数不符合规范！")
        return null
      }
      var f = this.factorial
      return f(n, m) / f(m)
    }
    //排列数求值
    MathExt.prototype.permutation = function (n, m) {
      if (!(typeof n == "number" && typeof m == "number" && n > 0 && m > 0 && n >= m)) {
        console.error("permutation的参数不符合规范！")
        return null
      }
      var f = this.factorial
      return f(n, m)
    }
  }
  var mathExt = new MathExt()
  return mathExt
})