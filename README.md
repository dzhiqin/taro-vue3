# 使用 Taro3 + Vue3 开发微信小程序

## 开发环境

taro v3.5.0
node v16.17.1

## 运行

```
yarn // 安装依赖
npx husky init // 启用husky，安装完依赖后初次运行项目需要执行这个指令
yarn dev:weapp // 运行项目
```

## 实现功能

- 集成 vue3，使用 `script setup` 语法开发
- 集成 `Typescript`
- 集成 nutui
- 代码检查和格式优化
- 全局状态管理
- 小程序分包配置
- 样式封装，兼容刘海儿屏等样式问题
- http 方法封装

## 主要技术栈

- Taro3
- Vue3
- TypeScript
- NutUi-taro
- Pinia

[NutUI taro](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro) 是京东风格的移动端组件库，它支持使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。自动按需引入组件，不需要手动 import。

[Taro ](http://taro-docs.jd.com/taro/docs/vue3) 是一个开放式跨端跨框架解决方案,可以支持转换到 H5、ReactNative 以及任意小程序平台

[Pinia](https://pinia.vuejs.org/introduction.html) 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案，支持 Vue2 和 Vue3。

## vscode 需安装插件

- Eslint
- Prettier
- Volar

与`vetur`相同，`volar`是一个针对 vue 的 vscode 插件，不过与 vetur 不同的是，volar 提供了更为强大的功能。

[Volar 介绍](https://juejin.cn/post/6966106927990308872)

## 代码规范

执行 `npx husky init` 启用husky

```
mac@yuansus taro-vue3 % npx husky install
husky - Git hooks installed
```

提交代码时会自动进行代码规范检查，lint检查通过后还会进行提交规范的检查，检查都通过才能提交。

```
mmac@yuansus taro-vue3 % git cm ok
---格式化检查开始---

> taro-vue3@1.0.0 lint
> eslint --fix --ext .vue --ext .js --ext .ts src/

=============

---格式化检查结束---
---提交规范检查开始---
git commit信息校验不通过
git commit的信息格式不对, 需要使用 title(scope): desc的格式
      比如 fix: xxbug
      feat(test): add new
      具体校验逻辑看 scripts/verifyCommit.js

husky - commit-msg hook exited with code 1 (error)
mac@yuansus taro-vue3 %

```

### 提交规范细分

```
feat: 新功能
fix: 修改 bug
docs: 文档
perf: 性能相关
refactor: 代码重构（就是不影响使用，内部结构的调整）
test: 测试用例
style: 样式修改
workflow: 工作流
build: 项目打包构建相关的配置修改
ci: 持续集成相关
revert: 恢复上一次提交（回滚）
wip: work in progress 工作中 还没完成
chore: 其他修改（不在上述类型中的修改）
release: 发版
deps: 依赖相关的修改

```

## 小程序分包配置

小程序主包超过 2M，就无法真机预览了，为了提前做好准备在一开始就进行分包处理。比如下面这个小程序的配置，分了四个包。

app.config.ts

```
pages: ['pages/create/index', 'pages/find/index', 'pages/my/index'],
subpackages: [
{
  root: 'pages/featureA',
  pages: ['index/index']
},
{
  root: 'pagesSub/search',
  pages: ['index']
},
{
  root: 'pagesSub/my',
  pages: ['detail/index', 'about/index']
},
{
  root: 'pagesSub/book',
  pages: ['detail/index', 'person/list/index', 'person/detail/index']
}
],
```

可以在小程序开发工具编辑器里的代码依赖分析，查看主包和分包的大小

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da38b9e6463c411792a7ca244782fa12~tplv-k3u1fbpfcp-watermark.image?)

## 使用 script setup 语法封装小程序页面生命周期方法

hooks/life.ts

```
import { getCurrentInstance } from '@tarojs/taro'
import { onMounted } from 'vue'

const Current = getCurrentInstance()

export function useDidShow(callback) {
    onMounted(callback) Current?.page?.onShow && (Current.page.onShow = callback)
}
export function usePullDownRefresh(callback) {
    Current?.page?.onPullDownRefresh && (Current.page.onPullDownRefresh = callback)
}
```

使用

```
import { useDidShow } from '@/hooks/life'

useDidShow(() => {
  // console.log('onShow')
})
```

## 样式封装

iPhoneX 底部横线适配

assets/styles/common.scss

```
.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

刘海屏适配

assets/styles/hairline.scss

```
@mixin hairline-common() {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
}

@mixin hairline() {
  @include hairline-common();
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid #eaeaea;
  transform: scale(0.5);
}

@mixin hairline-top($color, $left: 0, $right: 0) {
  @include hairline-common();
  top: 0;
  right: $right;
  left: $left;
  border-top: 1px solid $color;
  transform: scaleY(0.5);
}

@mixin hairline-bottom($color, $left: 0, $right: 0) {
  @include hairline-common();
  right: $right;
  bottom: 0;
  left: $left;
  border-bottom: 1px solid $color;
  transform: scaleY(0.5);
}

[class*='van-hairline'] {
  &::after {
    @include hairline();
  }
}

.van-hairline {
  &,
  &--top,
  &--left,
  &--right,
  &--bottom,
  &--surround,
  &--top-bottom {
    position: relative;
  }

  &--top::after {
    border-top-width: 1px;
  }

  &--left::after {
    border-left-width: 1px;
  }

  &--right::after {
    border-right-width: 1px;
  }

  &--bottom::after {
    border-bottom-width: 1px;
  }

  &,
  &-unset {
    &--top-bottom::after {
      border-width: 1px 0;
    }
  }

  &--surround::after {
    border-width: 1px;
  }
}

```

多行文字省略

assets/styles/ellipsis.scss

```
@mixin multi-ellipsis($lines) {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
}

@mixin ellipsis() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ellipsis {
  @include ellipsis();
}

.multi-ellipsis--l2 {
  @include multi-ellipsis(2);
}

.multi-ellipsis--l3 {
  @include multi-ellipsis(3);
}

```
