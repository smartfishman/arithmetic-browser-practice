/*
���ߣ�����ɽ
���ڣ�2019��3��21��
���ܸ��������¼�
*/
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["public_lib/jquery_min","MathExt"], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.returnExports = factory()
  }
})(this, function ($, MathExt) {
  $(document).ready(function () {
    //��������������ֵ�仯�¼�����n,m�仯ʱ����C(n,m)�����ֵ
    $(".Cnm_input").on("input propertychange",function () {
      countCnm()
    })
    //����C(n,m)
    function countCnm() {
      var n = parseInt($("#C_n")[0].value)
      var m = parseInt($("#C_m")[0].value)
      $("#C_sum")[0].value = MathExt.combinatorial(n, m)
    }
    //���������������ֵ�仯�¼�����n,m�仯ʱ����A(n,m)�����ֵ
    $(".Anm_input").on("input propertychange", function () {
      countAnm()
    })
    //����A(n,m)
    function countAnm() {
      var n = parseInt($("#A_n")[0].value)
      var m = parseInt($("#A_m")[0].value)
      $("#A_sum")[0].value = MathExt.permutation(n, m)
    }
  })  
  return 
})