/*
作者：李青山
日期：2019年3月21日
功能概述：基于requirejs构架整个项目，此文件是项目总入口。该项目主要是为了熟悉catalan数的相关性质
*/
require.config({
  baseUrl: "js/scripts",
  paths: {
    "MathExt": "mathExt",
    "Events": "events",
  },
  shim: {
    "public_lib/jquery_min": {
      exports:"$"
    }
  }
});
require(["MathExt", "public_lib/jquery_min","Events"], function (MathExt,$,Events) {
  
});