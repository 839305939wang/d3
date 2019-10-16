# SVG 圆 circle

<template>
<svg width="300" height="80">
  <circle
    class="circle"
    cx="40" cy="40"
    r="24"
    stroke="#333"
    stroke-width="1"
    fill="#fff"/>
</svg> 
</template>
<style>
  .circle {
      fill:#efefef;
  }
</style>

1. cx：规定圆心在x轴的坐标。
2. cy：规定圆心在y轴的坐标。
3. r：规定半径的尺寸。
4. stroke：规定圆的描边颜色。
5. stroke-width：规定圆的描边也就是边框的宽度。
6. fill：规定圆的填充颜色。

也可以使用与`<circle>`元素属性对应的css属性来设置相关样式。

:::demo
```html
<svg width="300" height="80">
  <circle
    cx="40" cy="40"
    r="24"
    stroke="#333"
    stroke-width="1"
    fill="#fff"/>
</svg> 
<style>
  .circle {
      fill:#efefef;
  }
</style>
```
:::