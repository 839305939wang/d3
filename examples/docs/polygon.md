# SVG 多边形 polygon

属性：

1. points：此属性定义构成多边形的一系列的点，每一个点由两个用逗号分隔的数字构成，第一个数字表示x轴坐标，第二个数字表示y轴坐标，点与点之间用空格分隔。

2. stroke：此属性定义折线描边的颜色。

3. stroke-width：此属性定义折线的粗细。

<template>
  <svg height="200" width="200">
     <polygon points="50 50,100 50,100 100,50 100"
    stroke="red"
    stroke-width=2;
    fill="#ccc" />
  </svg>
</template>

:::demo

```html
   <svg height="200" width="200">
     <polygon points="50 50,100 50,100 100,50 100"
    stroke="red"
    stroke-width=2;
    fill="#ccc" />
  </svg>
```
:::