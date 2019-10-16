# text 文本

SVG 文本,canvas绘制的文本本质上是以图片形式展现的，这样我们就无法进行选中或者赋值黏贴等操作，也不容易被搜索引擎识别（据说现在搜索引擎可以识别图片上的文本，估计当前效果也不是太好），对于搜索引擎优化也不太好，而SVG绘制的文本是真正意义上的文本，与普通文本没有区别。

<template>
<svg viewBox="0 0 1000 50">
  <text x="10 30" y=30 >SVG 文本</text>
  <rect x="0" y="0" width="900" height="45"
        fill="none" stroke="#eee" stroke-width="1" />
</svg>
</template>

x与y属性值是一个数列,以x属性值为例子，10规定第一个字符"s"距离左侧的距离，30表示第二个字符距离左侧的距离，以此类推。然而字符串有7个字符，但是数列中才有四个参数，那么四个参数应用于字符串中的前四个字符，剩余的字符紧贴最后一个字符依次排列，对于y属性值也是同样的道理

::: demo

```html
<svg viewBox="0 0 1000 50">
  <text x="10 10" y=30 >SVG 文本</text>
  <rect x="0" y="0" width="900" height="45"
        fill="none" stroke="#eee" stroke-width="1" />
</svg>
```

:::
---

# textPath 文本路径

CSS对于文本排列方式的控制能力非常有限，大致仅限于横平竖直。如果想要实现文本按照比较复杂的路径排列，利用CSS难度较高，也许将字符逐个放入span元素，然后利用定位控制span元素可以实现类似效果，可以想象过程一定十分复杂，而利用SVG则要轻松的多,SVG的文本可以沿着一条自定义的Path来排布，比如曲线、圆形等等

<template>
<svg viewBox="0 0 1000 300">
  <defs>
    <path id="MyPath"
          d="M 100 200 
             C 200 100 300   0 400 100
             C 500 200 600 300 700 200
             C 800 100 900 100 900 100" />
  </defs>

  <use xlink:href="#MyPath" fill="none" stroke="red"/>

 <text  font-family="Verdana" font-size="12">
    <textPath xlink:href="#MyPath" startOffset="100">
     SVG的文本可以沿着一条自定义的Path来排布，比如曲线、圆形等等
    </textPath>
  </text>
  <!-- Show outline of the viewport using 'rect' element -->
  <rect x="1" y="1" width="900" height="250"
        fill="none" stroke="#eee" stroke-width="1" />
</svg>
</template>

加入textPath之后,text的坐标系被修改了，没有加入textPath之前，text处于一个直角坐标系下，x轴和y轴是两条相互垂直的直线。

text的坐标系有如下性质：

1、坐标系的x轴为path；

2、此时text的y是path的坐标，无论怎么认为设置y值都是无效的。

也可以使用textPath元素的startOffset属性。startOffset是一个合成词，由单词start与offset合成，start是开始的意思，offset是偏移量的意思。

由此我们可以猜测此属性用来规定文本距离路径起始位置的偏移量，事实也是如此。

::: demo

```html

<svg viewBox="0 0 1000 300"
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="MyPath"
          d="M 100 200 
             C 200 100 300   0 400 100
             C 500 200 600 300 700 200
             C 800 100 900 100 900 100" />
  </defs>

  <use xlink:href="#MyPath" fill="none" stroke="red"  />

 <text  font-family="Verdana" font-size="12">
    <textPath xlink:href="#MyPath">
     SVG的文本可以沿着一条自定义的Path来排布，比如曲线、圆形等等
    </textPath>
  </text>
  <!-- Show outline of the viewport using 'rect' element -->
  <rect x="1" y="1" width="998" height="298"
        fill="none" stroke="#eee" stroke-width="1" />
</svg>

```
:::
---

# tspan

使用 `<text>`绘制功能过于简单，很多常见的功能实现起来都比较困难，比如内部文本换行。再比如单独设置文本某一部分的样式，也很困难，使用`<tspan>`可以有效的解决类似问题。大家都对HTML的`<span>`元素比较熟悉，可以认为`<tspan>`是SVG中的`<span>`元素。

1. x和y属性可以对tspan元素的文本进行定位。

2. dx和dy规定字符的相对位置。

<template>
<svg width="400" height="200">
  <text x="100" y="100">
    <tspan class="red">小飞猫</tspan>
    <tspan x="160" y="100">喵喵喵</tspan>
    <tspan dx="10" dy="0">相对定位</tspan>
  </text> 
</svg>
</template>
<style>
.red {
  fill:red
}
</style>

:::demo
```html
<template>
<svg width="400" height="200">
  <text x="100" y="100">
    <tspan class="red">小飞猫</tspan>
    <tspan x="160" y="100">喵喵喵</tspan>
    <tspan dx="10" dy="0">相对定位</tspan>
  </text> 
</svg>
</template>
<style>
.red {
  fill:red
}
</style>
```
:::

---

# SVG 文本排版方向

css属性值

text-anchor:start|middle|end 此属性规定文本的哪个部分放置在text元素中的x属性定义的位置。

<template>
<svg width="300" height="30">
  <text x="50" y="20" style="text-anchor:middle">
    middle
  </text>
</svg>
</template>

letter-spacing:此属性功能和css的letter-spacing完全相同，用来规定字符之间的距离。

word-spacing:用来设置单词的间距和css的word-spacing功能相同

writing-mode:此属性可以规定文本的书写方向

<template>
<svg width="300" height="100">
  <text x="50" y="20" writing-mode="tb">
    书写方向
  </text>
</svg>
</template>

rotate 参数值是一个数列，用来规定旋转的度数，单位可以省略，默认是deg。

1. 如果只有一个参数，所有文本都旋转同一个角度。

2. 如果规定多个参数，第一个参数用于第一个字符，第二个参数用于第二个字符，以此类推。

<template>
<svg width="300" height="100">
  <text x="20" y="20" rotate="0 45 90">
    旋转
  </text>
</svg>
</template>

:::demo
```html
<svg width="300" height="30">
  <text x="50" y="20" style="text-anchor:middle">
    middle
  </text>
</svg>
<svg width="300" height="100">
      <text x="50" y="20" writing-mode="tb">
        蚂蚁部落
      </text>
</svg>
<svg width="300" height="100">
  <text x="20" y="20" rotate="0 45 90">
    旋转
  </text>
</svg>
```
:::

---

