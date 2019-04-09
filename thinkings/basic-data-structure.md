# 基础的数据结构

这篇文章不是讲解数据结构的文章，而是结合现实的场景帮助大家`理解和复习`数据结构与算法，
如果你的数据结构基础很差，建议先去看一些基础教程，再转过来看。

本篇文章的定位是侧重于前端的，通过学习前端中实际场景的数据结构，从而加深大家对数据结构的理解和认识。

## 线性结构
数据结构我们可以从逻辑上分为线性结构和非线性结果。线性结构有
数组，栈，链表等， 非线性结构有树，图等。

需要注意的是，线性和非线性不代表存储结构是线性的还是非线性的，这两者没有任何关系，它只是一种逻辑上的划分。
比如我们可以用数组去存储二叉树。
### 数组

数组是最简单的数据结构了，很多地方都用到它。 比如有一个数据列表等，用它是再合适不过了。

我们来讲几个有趣的例子来加深大家对数组这种数据结构的理解。
#### React Hooks

Hooks的本质就是一个数组， 伪代码：

![basic-data-structure-hooks.png](../assets/thinkings/basic-data-structure-hooks.png)

那么为什么hooks要用数组？ 我们可以换个角度来解释，如果不用数组会怎么样？

```js

function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}

```
基于数组的方式，Form的hooks就是 [hook1, hook2, hook3, hook4],
我们可以得出这样的关系， hook1就是[name, setName] 这一对，
hook2就是persistForm这个。

如果不用数组实现，比如对象，Form的hooks就是
```js
{
  'key1': hook1,
  'key2': hook2,
  'key3': hook3,
  'key4': hook4,
}
```
那么问题是key1，key2，key3，key4怎么取呢？

关于React hooks 的本质研究，更多请查看[React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
### 队列

message queue

### 栈

call stack, view stack

其实浏览器的执行栈就是一个基本的栈结构，从数据结构上说，它就是一个栈。
这也就解释了，我们用递归的解法和用循环+栈的解法本质上是差不多。

比如如下JS代码：

```js
function bar() {
  const a = 1
  const b = 2;
  console.log(a, b)
}
function foo() {
  const a = 1;
  bar();
}

foo();


```

真正执行的时候，内部大概是这样的：

![basic-data-structure-call-stack](../assets/thinkings/basic-data-structure-call-stack.png)

> 我画的图没有画出执行上下文中其他部分（this和scope等）， 这部分是闭包的关键，而我这里不是将闭包的，是为了讲解栈的。

> 社区中有很多“执行上下文中的scope指的是执行栈中父级声明的变量”说法，这是完全错误的， JS是词法作用域，scope指的是函数定义时候的父级，和执行没关系

### 链表

#### React Fiber

很多人都说 fiber 是基于链表实现的，但是为什么要基于链表呢，可能很多人并没有答案，那么我觉得可以把这两个点（fiber 和链表）放到一起来讲下。

fiber 出现的目的其实是为了解决 react 在执行的时候是无法停下来的，需要一口气执行完的问题的。

![fiber-intro](../assets/thinkings/basic-data-structure-fiber-intro.png)

图片来自 Lin Clark 在 ReactConf 2017 分享

上面已经指出了引入 fiber 之前的问题，就是 react 会阻止优先级高的代码（比如用户输入）执行。因此 fiber
打算自己自建一个`虚拟执行栈`来解决这个问题，这个虚拟执行栈的实现是链表。

Fiber 的基本原理是将协调过程分成小块，一次执行一块，然乎将运算结果保存起来，并判断是否有时间（react 自己实现了一个类似 requestIdleCallback 的功能）继续执行下一块。
如果有时间，则继续。 否则跳出，让浏览器主线程歇一会，执行别的优先级高的代码。

当协调过程完成（所有的小块都运算完毕）， 那么就会进入提交阶段， 真正的进行副作用（side effect）操作，比如更新DOM，这个过程是没有办法取消的，原因就是这部分有副作用。

问题的关键就是将协调的过程划分为一块块的，最后还可以合并到一起，有点像Map／Reduce。

React 必须重新实现遍历树的算法，从依赖于`内置堆栈的同步递归模型`，变为`具有链表和指针的异步模型`。

> Andrew 是这么说的： 如果你只依赖于[内置]调用堆栈，它将继续工作直到堆栈为空。。。

如果我们可以随意中断调用堆栈并手动操作堆栈帧，那不是很好吗？
这就是 React Fiber 的目的。 `Fiber 是堆栈的重新实现，专门用于 React 组件`。 你可以将单个 Fiber 视为一个`虚拟堆栈帧`。

react fiber 大概是这样的：

```js
let fiber = {
  tag: HOST_COMPONENT,
  type: "div",
  return: parentFiber,
  children: childFiber,
  sibling: childFiber,
  alternate: currentFiber,
  stateNode: document.createElement("div"),
  props: { children: [], className: "foo"},
  partialState: null,
  effectTag: PLACEMENT,
  effects: []
};

```

从这里可以看出fiber本质上是个对象，使用parent，child，sibling属性去构建fiber树来表示组件的结构树，
return, children, sibling也都是一个fiber，因此fiber看起来就是一个链表。

> 细心的朋友可能已经发现了， alternate也是一个fiber， 那么它是用来做什么的呢？
它其实原理有点像git， 可以用来执行git revert ,git commit等操作，这部分挺有意思，我会在我的《从零开发git》中讲解 

想要了解更多的朋友可以看[这个文章](https://github.com/dawn-plex/translate/blob/master/articles/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree.md)

如果可以翻墙， 可以看[英文原文](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)

[这篇文章](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec)也是早期讲述fiber架构的优秀文章

我目前也在写关于《从零开发react系列教程》中关于fiber架构的部分，如果你对具体实现感兴趣，欢迎关注。
### 非线性结构

## 树

### 二叉树

#### 堆

优先级队列

#### 二叉查找树

### 平衡树

database engine

#### AVL

#### 红黑树

## 图
