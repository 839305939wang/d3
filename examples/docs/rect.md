# SVG矩形 rect

属性：

1. x,y：规定矩形左上角的位置。
2. rx,ry：圆角的半径。
3. stroke-width：规定直线的粗细，属性值是数字，默认单位是像素。
4. stroke：规定直线的颜色。

<template>
<svg width="300" height="100">
  <rect
    x="10" y="10"
    height="60" width="100"
    stroke="#333"
    fill="#FFF"/>
</svg> 
</template>

# 圆角矩形

<template>
<svg width="300" height="100">
<rect
 rx="5" 
 ry="5"
 x="10" y="10"
 height="60" width="100"
 stroke="#333"
 fill="#FFF"
/>
</svg>
</template>

通过css 也可以控制SVG

</template>
<svg width="300" height="100">
<rect
 class="cssRect"
 rx="5" 
 ry="5"
 x="10" y="10"
/>
</svg>
</template>
<style>
  .cssRect {
    height:60px; 
    width:100px;
    stroke:red;
    fill:#FFF;
  }
</style>

:::demo
```html
</svg>
<rect
    x="10" y="10"
    height="60" width="100"
    stroke="#333"
    fill="#FFF"/>
</svg> 
/**圆角矩形*/
<svg width="300" height="100">
<rect
 rx="5" 
 ry="5"
 x="10" y="10"
 height="60" width="100"
 stroke="#333"
 fill="#FFF"
/>
</svg>

/**通过css控制*/
</template>
<svg width="300" height="100">
<rect
 class="cssRect"
 rx="5" 
 ry="5"
 x="10" y="10"
/>
</svg>
</template>
<style>
  .cssRect {
    height:60px; 
    width:100px;
    stroke:red;
    fill:#FFF;
  }
</style>

```
:::