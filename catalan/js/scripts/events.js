/*
作者：李青山
日期：2019年3月21日
功能概述：绑定事件
*/
"use strict"
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["public_lib/jquery_min", "MathExt", "public_lib/Calculator.min"], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.returnExports = factory()
  }
})(this, function ($, MathExt, Calculator) {
  $(document).ready(function () {
    var calculator = new Calculator()
    //绑定组合数输入框内值变化事件，当n,m变化时更新C(n,m)的输出值
    $(".Cnm_input").on("input propertychange",function () {
      countCnm()
    })
    //计算C(n,m)
    function countCnm() {
      var n = parseInt($("#C_n")[0].value)
      var m = parseInt($("#C_m")[0].value)
      $("#C_sum")[0].value = MathExt.combinatorial(n, m)
    }
    //绑定排列数输入框内值变化事件，当n,m变化时更新A(n,m)的输出值
    $(".Anm_input").on("input propertychange", function () {
      countAnm()
    })
    //计算A(n,m)
    function countAnm() {
      var n = parseInt($("#A_n")[0].value)
      var m = parseInt($("#A_m")[0].value)
      $("#A_sum")[0].value = MathExt.permutation(n, m)
    }
    //绑定catalan数输入框内值变化事件，当n变化时更新h(n)的输出值
    $(".hn_input").on("input propertychange", function () {
      var n = parseInt($("#h_n")[0].value)
      $("#h_sum")[0].value = MathExt.catalan_truth(n)
    })
    //绑定售票问题输入框内值变化事件
    $(".hnm_practice_input").on("input propertychange", function () {
      var n = parseInt($("#h_practice_n")[0].value)
      var m = parseInt($("#h_practice_m")[0].value)
      var result = calculator.multiply(MathExt.catalan(m), MathExt.factorial(m))
      result = calculator.multiply(result, MathExt.factorial(m))
      result = calculator.multiply(result, MathExt.permutation(n,n-m))
      $("#h_practice_sum")[0].value = result
    })
  })  
  return 
})