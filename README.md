# arithmetic-browser-practice<br/>
为了练习算法的实际应用而创建的项目，利用浏览器端搭建算法应用的环境。<br/>
日后逐渐更新，欢迎大神校正。<br/>

A星寻路：<br/>
1、该项目基于requirejs构建，满足AMD规范，可直接在浏览器端运行，无需任何依赖。<br/>
2、该项目模拟了一个25*25的简易迷宫，每次项目运行都将产生一个随机的迷宫和固定的起点及终点，<br/>
   A-STAR将演算出可行的路径并标示，若没有可行路径则在控制台打印failed。<br/>
3、项目展示入口: A-star.html  编码入口:main.js<br/>
4、未解决的问题：A星寻路在什么情况下无法找到最短路径？如何改进算法将其运用在必须找到最短路径的场景中。<br/>
catalan数:<br/>
1、实现了一些常见数学公式的计算器，如组合数，排列数，catalan数<br/>
2、得出一个结论：当h(0)=1时，记catalan数的值为h(n),当h(0)=k时，记为hk(n)。则有如下关系：<br/>
hk(n) = h(n)*(k^(n+1))<br/>
二叉树：<br/>
1、实现了自平衡二叉树的插入和删除<br/>
2、实现了判断一个二叉树是否是完全二叉树<br/>
3、实现了时间复杂度为O(log(2,n)),空间复杂度为O(1)的morris遍历算法<br/>