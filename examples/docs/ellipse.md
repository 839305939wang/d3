# 椭圆 ellipse

属性:

1. cx：规定椭圆圆心x轴坐标。

2. cy：规定椭圆圆心y轴坐标。

3. rx：规定椭圆x轴半径的尺寸。

4. ry：规定椭圆y轴半径的尺寸。

5. stroke：规定椭圆描边的颜色，也就边框的颜色。

6. stroke-width：规定描边的厚度为2px，也就是边框的厚度。

7. fill：规定椭圆的填充颜色为绿色。

<template>
  <svg width="300" height="200">
     <ellipse
        cx="100"
        cy="100"
        rx="50"
        ry="30"
        stroke="red"
        stroke-width="2"
        fill="#fff"
      />
      <ellipse
        cx="220"
        cy="100"
        rx="50"
        ry="50"
        stroke="red"
        stroke-width="2"
        fill="#fff"
      />
  </svg>
</template>

:::demo

```html

  <svg width="300" height="200">
     <ellipse
        cx="100"
        cy="100"
        rx="50"
        ry="30"
        stroke="red"
        stroke-width="2"
        fill="#fff"
      />
      <ellipse
        cx="220"
        cy="100"
        rx="50"
        ry="50"
        stroke="red"
        stroke-width="2"
        fill="#fff"
      />

```
:::