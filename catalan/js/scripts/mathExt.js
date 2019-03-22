/*
作者：李青山
日期：2019年3月21日
功能概述：实现一些常见数学公式
*/
"use strict"
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["public_lib/Calculator.min"], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.returnExports = factory()
  }
})(this, function (Calculator) {
  var calculator = new Calculator()
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
        result = calculator.multiply(result,i)
      }
      return result
    }
    //组合数求值 n>=m>=0
    MathExt.prototype.combinatorial = function (n, m) {      
      if (!(typeof n == "number" && typeof m == "number" && n >= 0 && m >= 0 && n >= m)) {
        console.error("combinatorial的参数不符合规范！")
        return null
      }
      if (m == 0) {
        return 1
      }
      return calculator.divide(this.factorial(n, m),this.factorial(m))
    }
    //排列数求值 n>=m>=0
    MathExt.prototype.permutation = function (n, m) {
      if (!(typeof n == "number" && typeof m == "number" && n >= 0 && m >= 0 && n >= m)) {
        console.error("permutation的参数不符合规范！")
        return null
      }
      if (m == 0) {
        return 1
      }
      return this.factorial(n, m)
    }
    //catalan数求值 n>0 通项公式求值： C(2n,n)/(n+1)
    MathExt.prototype.catalan = function (n) {
      if (!(typeof n == "number" && n > 0 )) {
        console.error("catalan的参数不符合规范！")
        return null
      }
      return calculator.divide(this.combinatorial(2 * n, n),n+1)
    }
    //catalan数求值 n>0 递归公式求值(h(0)=1)： h(n) = ((4n-2)/(n+1))*h(n-1)
    //整数运算在返回值时要避免局部除法的先运算。
    //catalan数成立的前提是h(0)=1,若h(0)不为0,而为其他任意数：truth，则有另外的规律。
    MathExt.prototype.catalan_recursion = function (n,truth = 1) {
      if (!(typeof n == "number" && n >= 0)) {
        console.error("catalan的参数不符合规范！")
        return null
      }
      if (n == 0) {
        return truth
      }
      var temp = calculator.multiply(this.catalan_recursion(n - 1, truth), 4 * n - 2)
      //console.log(calculator.divide(4 * n - 2, n + 1)) 先计算除法会出现误差
      return calculator.divide(temp, n + 1)
    }
    //catalan数求值 n>0 定理公式求值(h(0)=1)： h(n) = h(0)*h(n-1)+h(1)*h(n-2)+....+h(n-1)*h(0)
    //递归层次太深，输入值不能超过10
    MathExt.prototype.catalan_truth = function (n,truth=1) {
      if (!(typeof n == "number" && n >= 0)) {
        console.error("catalan的参数不符合规范！")
        return null
      } else if(n >= 15){
        console.error("n不能超过15，递归层级过深会宕机")
        return null
      }
      if (n == 0) {
        return truth
      }
      var result = 0
      for (let i = 0; i < n; i++) {
        result = calculator.plus(result , calculator.multiply(this.catalan_truth(i, truth), this.catalan_truth(n - i - 1, truth)))
      }
      return result
    }
  }
  var mathExt = new MathExt()
  return mathExt
})