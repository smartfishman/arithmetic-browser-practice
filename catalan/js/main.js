/*
作者：李青山
日期：2019年3月21日
功能概述：基于requirejs构架整个项目，此文件是项目总入口。该项目主要是为了熟悉catalan数的相关性质
*/
"use strict"
require.config({
  baseUrl: "js/scripts",
  paths: {
    "MathExt": "mathExt",
    "Events": "events",
  },
  shim: {
    "public_lib/jquery_min": {
      exports:"$"
    },
    "public_lib/Calculator.min": {
      exports:"Calculator"
    },
  }
});
require(["MathExt", "public_lib/jquery_min", "Events"], function (MathExt, $, Events) {
  //如下列代码得出结论，当h(0)=k时,记catalan数值为 hk(n),当h(0)=1时，记catalan数值为h(n)
  //则有如下关系： hk(n) = h(n) * (k^(n+1))
  var result =""
  for (let i = 1; i < 10; i++) {
    result = result + MathExt.catalan(i)+","
  }
  console.log(result)
  result = ""
  for (let i = 1; i < 10; i++) {
    result = result + MathExt.catalan_truth(i,1.5) + ","
  }
  console.log(result)
  result = ""
  for (let i = 1; i < 10; i++) {
    result = result + MathExt.catalan_truth(i,1.5) / MathExt.catalan(i) + ","
  }
  console.log(result)
  console.log(0 || 1)
});