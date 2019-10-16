# SVG 直线 line

通过`<line>`标签可以绘制一条直线。

<template>
 <svg width="1000" height="100">
  <line x1="100" y1="50" x2="800" y2="50" stroke="red" stroke-width="10" line-cap/>
 </svg>
</template>

属性:

1. x1,y1：规定直线的起点坐标。
2. x2,y2：规定直线的终点坐标。
3. stroke-width：规定直线的粗细，属性值是数字，默认单位是像素。
4. stroke：规定直线的颜色。

:::demo
```html
 <svg width="1000" height="100">
  <line x1="100" y1="50" x2="800" y2="50" stroke="red" stroke-width="10" line-cap/>
 </svg>
```
:::
