# 基础的数据结构（总览）

这篇文章不是讲解数据结构的文章，而是结合现实的场景帮助大家`理解和复习`数据结构与算法，如果你的数据结构基础很差，建议先去看一些基础教程，再转过来看。

本篇文章的定位是侧重于前端的，通过学习前端中实际场景的数据结构，从而加深大家对数据结构的理解和认识。

## 线性结构

数据结构我们可以从逻辑上分为线性结构和非线性结构。线性结构有数组，栈，链表等， 非线性结构有树，图等。

> 其实我们可以称树为一种半线性结构。

需要注意的是，线性和非线性不代表存储结构是线性的还是非线性的，这两者没有任何关系，它只是一种逻辑上的划分。
比如我们可以用数组去存储二叉树。

一般而言，有前驱和后继的就是线性数据结构。比如数组和链表。

> 其实一叉树就是链表。

### 数组

数组是最简单的数据结构了，很多地方都用到它。 比如有一个数据列表等，用它是再合适不过了。
其实后面的数据结构很多都有数组的影子。

我们之后要讲的栈和队列其实都可以看成是一种`受限`的数组，怎么个受限法呢？我们后面讨论。

我们来讲几个有趣的例子来加深大家对数组这种数据结构的理解。

#### React Hooks

Hooks 的本质就是一个数组， 伪代码：

![basic-data-structure-hooks.png](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugmr673j30m80bsq3j.jpg)

那么为什么 hooks 要用数组？ 我们可以换个角度来解释，如果不用数组会怎么样？

```js
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}
```

基于数组的方式，Form 的 hooks 就是 [hook1, hook2, hook3, hook4]。

进而我们可以得出这样的关系， hook1 就是 [name, setName] 这一对，hook2 就是 persistForm 这个。

如果不用数组实现，比如对象，Form 的 hooks 就是

```js
{
  'key1': hook1,
  'key2': hook2,
  'key3': hook3,
  'key4': hook4,
}
```

那么问题是 key1，key2，key3，key4 怎么取呢？这就是个问题了。更多关于 React hooks 的本质研究，请查看 [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

不过使用数组也有一个问题， 那就是 React 将`如何确保组件内部 hooks 保存的状态之间的对应关系`这个工作交给了开发人员去保证，即你必须保证 HOOKS 的顺序严格一致，具体可以看 React 官网关于 Hooks Rule 部分。

### 队列

队列是一种受限的序列，它只能够操作队尾和队首，并且只能只能在队尾添加元素，在队首删除元素。

队列作为一种最常见的数据结构同样有着非常广泛的应用， 比如消息队列

> "队列"这个名称，可类比为现实生活中排队（不插队的那种）

在计算机科学中，一个 队列 (queue) 是一种特殊类型的抽象数据类型或集合，集合中的实体按顺序保存。

队列基本操作有两种：

- 向队列的后端位置添加实体，称为入队
- 从队列的前端位置移除实体，称为出队。

队列中元素先进先出 FIFO (first in, first out) 的示意：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk7h2kgnjfj30b907dt8x.jpg)

（图片来自 https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/queue/README.zh-CN.md)

我们前端在做性能优化的时候，很多时候会提到的一点就是“HTTP 1.1 的队头阻塞问题”，具体来说
就是 HTTP2 解决了 HTTP1.1 中的队头阻塞问题，但是为什么 HTTP1.1 有队头阻塞问题，HTTP2 究竟怎么解决的这个问题，很多人都不清楚。

其实`队头阻塞`是一个专有名词，不仅仅在 HTTP 有，交换器等其他地方也都涉及到了这个问题。实际上引起这个问题的根本原因是使用了`队列`这种数据结构。

协议规定， 对于同一个 tcp 连接，所有的 http1.0 请求放入队列中，只有前一个`请求的响应`收到了，才能发送下一个请求，这个时候就发生了阻塞，并且这个阻塞主要发生在客户端。

这就好像我们在等红绿灯，即使旁边绿灯亮了，你的这个车道是红灯，你还是不能走，还是要等着。

![basic-data-structure-queue-1](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugoaepnj30gf0e2dgm.jpg)

`HTTP/1.0` 和 `HTTP/1.1`:

在`HTTP/1.0` 中每一次请求都需要建立一个 TCP 连接，请求结束后立即断开连接。

在`HTTP/1.1` 中，每一个连接都默认是长连接 (persistent connection)。对于同一个 tcp 连接，允许一次发送多个 http1.1 请求，也就是说，不必等前一个响应收到，就可以发送下一个请求。这样就解决了 http1.0 的客户端的队头阻塞，而这也就是`HTTP/1.1`中`管道 (Pipeline)`的概念了。

但是，`http1.1 规定，服务器端的响应的发送要根据请求被接收的顺序排队`，也就是说，先接收到的请求的响应也要先发送。这样造成的问题是，如果最先收到的请求的处理时间长的话，响应生成也慢，就会阻塞已经生成了的响应的发送，这也会造成队头阻塞。可见，http1.1 的队首阻塞是发生在服务器端。

如果用图来表示的话，过程大概是：

![basic-data-structure-queue-2](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugpil19j31210d83zr.jpg)

`HTTP/2` 和 `HTTP/1.1`:

为了解决`HTTP/1.1`中的服务端队首阻塞，`HTTP/2`采用了`二进制分帧` 和 `多路复用` 等方法。

帧是`HTTP/2`数据通信的最小单位。在 `HTTP/1.1` 中数据包是文本格式，而 `HTTP/2` 的数据包是二进制格式的，也就是二进制帧。

采用帧的传输方式可以将请求和响应的数据分割得更小，且二进制协议可以被高效解析。`HTTP/2`中，同域名下所有通信都在单个连接上完成，该连接可以承载任意数量的双向数据流。每个数据流都以消息的形式发送，而消息又由一个或多个帧组成。多个帧之间可以乱序发送，根据帧首部的流标识可以重新组装。

`多路复用`用以替代原来的序列和拥塞机制。在`HTTP/1.1`中，并发多个请求需要多个 TCP 链接，且单个域名有 6-8 个 TCP 链接请求限制（这个限制是浏览器限制的，不同的浏览器也不一定一样）。在`HTTP/2`中，同一域名下的所有通信在单个链接完成，仅占用一个 TCP 链接，且在这一个链接上可以并行请求和响应，互不干扰。

> [此网站](https://http2.akamai.com/demo) 可以直观感受 `HTTP/1.1` 和 `HTTP/2` 的性能对比。

### 栈

栈也是一种受限的序列，它只能够操作栈顶，不管入栈还是出栈，都是在栈顶操作。

在计算机科学中，一个栈 (stack) 是一种抽象数据类型，用作表示元素的集合，具有两种主要操作：

- push, 添加元素到栈的顶端（末尾）
- pop, 移除栈最顶端（末尾）的元素

以上两种操作可以简单概括为**后进先出 (LIFO = last in, first out)**。

此外，应有一个 peek 操作用于访问栈当前顶端（末尾）的元素。（只返回不弹出）

> "栈"这个名称，可类比于一组物体的堆叠（一摞书，一摞盘子之类的）。

栈的 push 和 pop 操作的示意：

![basic-data-structure-stack](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugqxx3sj30lh0f074v.jpg)

（图片来自 https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/stack/README.zh-CN.md)

栈在很多地方都有着应用，比如大家熟悉的浏览器就有很多栈，其实浏览器的执行栈就是一个基本的栈结构，从数据结构上说，它就是一个栈。
这也就解释了，我们用递归的解法和用循环+栈的解法本质上是差不多的。

比如如下 JS 代码：

```js
function bar() {
  const a = 1;
  const b = 2;
  console.log(a, b);
}
function foo() {
  const a = 1;
  bar();
}

foo();
```

真正执行的时候，内部大概是这样的：

![basic-data-structure-call-stack](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugru58jj30v70hi0u8.jpg)

> 我画的图没有画出执行上下文中其他部分（this 和 scope 等）， 这部分是闭包的关键，而我这里不是讲闭包的，是为了讲解栈的。

> 社区中有很多“执行上下文中的 scope 指的是执行栈中父级声明的变量”说法，这是完全错误的， JS 是词法作用域，scope 指的是函数定义时候的父级，和执行没关系

栈常见的应用有进制转换，括号匹配，栈混洗，中缀表达式（用的很少），后缀表达式（逆波兰表达式）等。

合法的栈混洗操作也是一个经典的题目，这其实和合法的括号匹配表达式之间存在着一一对应的关系，也就是说 n 个元素的栈混洗有多少种，n 对括号的合法表达式就有多少种。感兴趣的可以查找相关资料。

### 链表

链表是一种最基本数据结构，熟练掌握链表的结构和常见操作是基础中的基础。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk7h36dljuj30bc0153yj.jpg)

（图片来自： https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/linked-list/traversal)

#### React Fiber

很多人都说 fiber 是基于链表实现的，但是为什么要基于链表呢，可能很多人并没有答案，那么我觉得可以把这两个点（fiber 和链表）放到一起来讲下。

fiber 出现的目的其实是为了解决 react 在执行的时候是无法停下来的，需要一口气执行完的问题的。

![fiber-intro](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugunkhdj30rc0c0wez.jpg)

> 图片来自 Lin Clark 在 ReactConf 2017 分享

上面已经指出了引入 fiber 之前的问题，就是 react 会阻止优先级高的代码（比如用户输入）执行。因此他们打算自己自建一个`虚拟执行栈`来解决这个问题，这个虚拟执行栈的底层实现就是链表。

Fiber 的基本原理是将协调过程分成小块，一次执行一块，然后将运算结果保存起来，并判断是否有时间继续执行下一块（react 自己实现了一个类似 requestIdleCallback 的功能）。如果有时间，则继续。 否则跳出，让浏览器主线程歇一会，执行别的优先级高的代码。

当协调过程完成（所有的小块都运算完毕）， 那么就会进入提交阶段， 执行真正的进行副作用（side effect）操作，比如更新 DOM，这个过程是没有办法取消的，原因就是这部分有副作用。

问题的关键就是将协调的过程划分为一块块的，最后还可以合并到一起，有点像 Map／Reduce。

React 必须重新实现遍历树的算法，从依赖于`内置堆栈的同步递归模型`，变为`具有链表和指针的异步模型`。

> Andrew 是这么说的： 如果你只依赖于 [内置] 调用堆栈，它将继续工作直到堆栈为空。

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
  props: { children: [], className: "foo" },
  partialState: null,
  effectTag: PLACEMENT,
  effects: [],
};
```

从这里可以看出 fiber 本质上是个对象，使用 parent，child，sibling 属性去构建 fiber 树来表示组件的结构树，
return, children, sibling 也都是一个 fiber，因此 fiber 看起来就是一个链表。

> 细心的朋友可能已经发现了， alternate 也是一个 fiber， 那么它是用来做什么的呢？
> 它其实原理有点像 git， 可以用来执行 git revert ,git commit 等操作，这部分挺有意思，我会在我的《从零开发 git》中讲解

想要了解更多的朋友可以看 [这个文章](https://github.com/dawn-plex/translate/blob/master/articles/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree.md)

如果可以翻墙， 可以看 [英文原文](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)

[这篇文章](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec) 也是早期讲述 fiber 架构的优秀文章

我目前也在写关于《从零开发 react 系列教程》中关于 fiber 架构的部分，如果你对具体实现感兴趣，欢迎关注。

## 非线性结构

那么有了线性结构，我们为什么还需要非线性结构呢？ 答案是为了高效地兼顾静态操作和动态操作。大家可以对照各种数据结构的各种操作的复杂度来直观感受一下。

### 树

树的应用同样非常广泛，小到文件系统，大到因特网，组织架构等都可以表示为树结构，而在我们前端眼中比较熟悉的 DOM 树也是一种树结构，而 HTML 作为一种 DSL 去描述这种树结构的具体表现形式。如果你接触过 AST，那么 AST 也是一种树，XML 也是树结构。树的应用远比大多数人想象的要多得多。

树其实是一种特殊的`图`，是一种无环连通图，是一种极大无环图，也是一种极小连通图。

从另一个角度看，树是一种递归的数据结构。而且树的不同表示方法，比如不常用的`长子 + 兄弟`法，对于
你理解树这种数据结构有着很大用处， 说是一种对树的本质的更深刻的理解也不为过。

树的基本算法有前中后序遍历和层次遍历，有的同学对前中后这三个分别具体表现的访问顺序比较模糊，其实当初我也是一样的，后面我学到了一点，你只需要记住：`所谓的前中后指的是根节点的位置，其他位置按照先左后右排列即可`。比如前序遍历就是`根左右`, 中序就是`左根右`，后序就是`左右根`， 很简单吧？

我刚才提到了树是一种递归的数据结构，因此树的遍历算法使用递归去完成非常简单，幸运的是树的算法基本上都要依赖于树的遍历。

但是递归在计算机中的性能一直都有问题，因此掌握不那么容易理解的"命令式地迭代"遍历算法在某些情况下是有用的。如果你使用迭代式方式去遍历的话，可以借助上面提到的`栈`来进行，可以极大减少代码量。

> 如果使用栈来简化运算，由于栈是 FILO 的，因此一定要注意左右子树的推入顺序。

树的重要性质：

- 如果树有 n 个顶点，那么其就有 n - 1 条边，这说明了树的顶点数和边数是同阶的。
- 任何一个节点到根节点存在`唯一`路径，路径的长度为节点所处的深度

实际使用的树有可能会更复杂，比如使用在游戏中的碰撞检测可能会用到四叉树或者八叉树。以及 k 维的树结构 `k-d 树`等。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugv8xw6j306y06mdft.jpg)
（图片来自 https://zh.wikipedia.org/wiki/K-d%E6%A0%91）

### 二叉树

二叉树是节点度数不超过二的树，是树的一种特殊子集，有趣的是二叉树这种被限制的树结构却能够表示和实现所有的树，
它背后的原理正是`长子 + 兄弟`法，用邓老师的话说就是`二叉树是多叉树的特例，但在有根且有序时，其描述能力却足以覆盖后者`。

> 实际上， 在你使用`长子 + 兄弟`法表示树的同时，进行 45 度角旋转即可。

一个典型的二叉树：

标记为 7 的节点具有两个子节点，标记为 2 和 6; 一个父节点，标记为 2, 作为根节点，在顶部，没有父节点。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk7h4obmnkj30rs0muq4k.jpg)

（图片来自 https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/tree/README.zh-CN.md)

对于一般的树，我们通常会去遍历，这里又会有很多变种。

下面我列举一些二叉树遍历的相关算法：

- [94.binary-tree-inorder-traversal](../problems/94.binary-tree-inorder-traversal.md)
- [102.binary-tree-level-order-traversal](../problems/102.binary-tree-level-order-traversal.md)
- [103.binary-tree-zigzag-level-order-traversal](../problems/103.binary-tree-zigzag-level-order-traversal.md)
- [144.binary-tree-preorder-traversal](../problems/144.binary-tree-preorder-traversal.md)
- [145.binary-tree-postorder-traversal](../problems/145.binary-tree-postorder-traversal.md)
- [199.binary-tree-right-side-view](../problems/199.binary-tree-right-side-view.md)

相关概念：

- 真二叉树 （所有节点的度数只能是偶数，即只能为 0 或者 2）

另外我也专门开设了 [二叉树的遍历](./binary-tree-traversal.md) 章节，具体细节和算法可以去那里查看。

#### 堆

堆其实是一种优先级队列，在很多语言都有对应的内置数据结构，很遗憾 javascript 没有这种原生的数据结构。
不过这对我们理解和运用不会有影响。

堆的特点：

- 在一个 最小堆 (min heap) 中，如果 P 是 C 的一个父级节点，那么 P 的 key（或 value) 应小于或等于 C 的对应值。
  正因为此，堆顶元素一定是最小的，我们会利用这个特点求最小值或者第 k 小的值。

![min-heap](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugz10gfj30ca07yjro.jpg)

- 在一个 最大堆 (max heap) 中，P 的 key（或 value) 大于或等于 C 的对应值。

![max-heap](https://tva1.sinaimg.cn/large/0081Kckwly1gk7h43x3o8j30dx0ab74q.jpg)

需要注意的是优先队列不仅有堆一种，还有更复杂的，但是通常来说，我们会把两者做等价。

相关算法：

- [295.find-median-from-data-stream](../problems/295.find-median-from-data-stream.md)

#### 二叉查找树

二叉排序树（Binary Sort Tree），又称二叉查找树（Binary Search Tree），亦称二叉搜索树。

二叉查找树具有下列性质的二叉树：

- 若左子树不空，则左子树上所有节点的值均小于它的根节点的值；
- 若右子树不空，则右子树上所有节点的值均大于它的根节点的值；
- 左、右子树也分别为二叉排序树；
- 没有键值相等的节点。

对于一个二叉查找树，常规操作有插入，查找，删除，找父节点，求最大值，求最小值。

二叉查找树，之所以叫查找树就是因为其非常适合查找，举个例子，
如下一颗二叉查找树，我们想找节点值小于且最接近 58 的节点，搜索的流程如图所示：

![bst](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluh33ttoj30rs0mudhi.jpg)
（图片来自 https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/）

另外我们二叉查找树有一个性质是： `其中序遍历的结果是一个有序数组`。
有时候我们可以利用到这个性质。

相关题目：

- [98.validate-binary-search-tree](../problems/98.validate-binary-search-tree.md)

### 二叉平衡树

平衡树是计算机科学中的一类数据结构，是一种改进的二叉查找树。一般的二叉查找树的查询复杂度取决于目标结点到树根的距离（即深度），因此当结点的深度普遍较大时，查询的均摊复杂度会上升。为了实现更高效的查询，产生了平衡树。

在这里，平衡指所有叶子的深度趋于平衡，更广义的是指在树上所有可能查找的均摊复杂度偏低。

一些数据库引擎内部就是用的这种数据结构，其目标也是将查询的操作降低到 logn（树的深度），可以简单理解为`树在数据结构层面构造了二分查找算法`。

基本操作：

- 旋转

- 插入

- 删除

- 查询前驱

- 查询后继

#### AVL

是最早被发明的自平衡二叉查找树。在 AVL 树中，任一节点对应的两棵子树的最大高度差为 1，因此它也被称为高度平衡树。查找、插入和删除在平均和最坏情况下的时间复杂度都是 O(logn)。增加和删除元素的操作则可能需要借由一次或多次树旋转，以实现树的重新平衡。AVL 树得名于它的发明者 G. M. Adelson-Velsky 和 Evgenii Landis，他们在 1962 年的论文 An algorithm for the organization of information 中公开了这一数据结构。 节点的平衡因子是它的左子树的高度减去它的右子树的高度（有时相反）。带有平衡因子 1、0 或 -1 的节点被认为是平衡的。带有平衡因子 -2 或 2 的节点被认为是不平衡的，并需要重新平衡这个树。平衡因子可以直接存储在每个节点中，或从可能存储在节点中的子树高度计算出来。

#### 红黑树

在 1972 年由鲁道夫·贝尔发明，被称为"对称二叉 B 树"，它现代的名字源于 Leo J. Guibas 和 Robert Sedgewick 于 1978 年写的一篇论文。红黑树的结构复杂，但它的操作有着良好的最坏情况运行时间，并且在实践中高效：它可以在 O(logn) 时间内完成查找，插入和删除，这里的 n 是树中元素的数目

### 字典树（前缀树）

又称 Trie 树，是一种树形结构。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluh7b5gmj30al06q74c.jpg)

（图来自 https://baike.baidu.com/item/%E5%AD%97%E5%85%B8%E6%A0%91/9825209?fr=aladdin)
它有 3 个基本性质：

- 根节点不包含字符，除根节点外每一个节点都只包含一个字符；
- 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串；
- 每个节点的所有子节点包含的字符都不相同。

#### immutable 与 字典树

`immutableJS`的底层就是`share + tree`. 这样看的话，其实和字典树是一致的。

相关算法：

- [208.implement-trie-prefix-tree](../problems/208.implement-trie-prefix-tree.md)
- [211.add-and-search-word-data-structure-design](../problems/211.add-and-search-word-data-structure-design.md)
- [212.word-search-ii](../problems/212.word-search-ii.md)

## 图

前面讲的数据结构都可以看成是图的特例。 前面提到了二叉树完全可以实现其他树结构，其实有向图也完全可以实现无向图和混合图，因此有向图的研究一直是重点考察对象。

图论〔Graph Theory〕是数学的一个分支。它以图为研究对象。图论中的图是由若干给定的点及连接两点的线所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系，用点代表事物，用连接两点的线表示相应两个事物间具有这种关系。

### 基本概念

- 无向图 & 有向图
- 有权图 & 无权图
- 入度 & 出度
- 路径 & 环
- 连通图 & 强连通图

在无向图中，若任意两个顶点 i 与 j 都有路径相通，则称该无向图为连通图。

在有向图中，若任意两个顶点 i 与 j 都有路径相通，则称该有向图为强连通图。

- 生成树

一个连通图的生成树是指一个连通子图，它含有图中全部 n 个顶点，但只有足以构成一棵树的 n-1 条边。一颗有 n 个顶点的生成树有且仅有 n-1 条边，如果生成树中再添加一条边，则必定成环。在连通网的所有生成树中，所有边的**代价和最小**的生成树，称为最小生成树，其中**代价和**指的是所有边的权重和。

### 图的建立

一般图的题目都不会给你一个现成的图结构。当你知道这是一个图的题目的时候，解题的第一步通常就是建图。这里我简单介绍两种常见的建图方式。

#### 邻接矩阵（常见）

使用一个 n \* n 的矩阵来描述图 graph，其就是一个二维的矩阵，其中 graph[i][j] 描述边的关系。

一般而言，我都用 graph[i][j] = 1 来表示 顶点 i 和顶点 j 之间有一条边，并且边的指向是从 i 到 j。用 graph[i][j] = 0 来表示 顶点 i 和顶点 j 之间不存在一条边。 对于有权图来说，我们可以存储其他数字，表示的是权重。

这种存储方式的空间复杂度为 O(n ^ 2)，其中 n 为顶点个数。如果是稀疏图（图的边的数目远小于顶点的数目），那么会很浪费空间。并且如果图是无向图，始终至少会有 50 % 的空间浪费。下面的图也直观地反应了这一点。

邻接矩阵的优点主要有：

1. 直观，简单。

2. 判断两个顶点是否连接，获取入度和出度以及更新度数，时间复杂度都是 O(1)

由于使用起来比较简单， 因此我的所有的需要建图的题目基本都用这种方式。

比如力扣 743. 网络延迟时间。 题目描述：

```
有 N 个网络节点，标记为 1 到 N。

给定一个列表 times，表示信号经过有向边的传递时间。 times[i] = (u, v, w)，其中 u 是源节点，v 是目标节点， w 是一个信号从源节点传递到目标节点的时间。

现在，我们从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1。


示例：

输入：times = [[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2
输出：2
 

注意:

N 的范围在 [1, 100] 之间。
K 的范围在 [1, N] 之间。
times 的长度在 [1, 6000] 之间。
所有的边 times[i] = (u, v, w) 都有 1 <= u, v <= N 且 0 <= w <= 100。

```

这是一个典型的图的题目，对于这道题，我们如何用邻接矩阵建图呢？

一个典型的建图代码：

```py
    graph = collections.defaultdict(list)
    for fr, to, w in times:
        graph[fr - 1].append((to - 1, w))
```

这就构造了一个临界矩阵，之后我们基于这个邻接矩阵遍历图即可。

#### 邻接表

对于每个点，存储着一个链表，用来指向所有与该点直接相连的点。对于有权图来说，链表中元素值对应着权重。

例如在无向无权图中：

![graph-1](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluh8tbb5j30k00akq48.jpg)
（图片来自 https://zhuanlan.zhihu.com/p/25498681）

可以看出在无向图中，邻接矩阵关于对角线对称，而邻接链表总有两条对称的边。

而在有向无权图中：

![graph-2](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluhb46urj30k00aq0ux.jpg)

（图片来自 https://zhuanlan.zhihu.com/p/25498681）

### 图的遍历

图建立好了，接下来就是要遍历。不管你是什么算法，肯定都要遍历的，一般有以下两种方法（其他奇葩的遍历方式实际意义不大，没有必要学习）。不管是哪一种遍历， 如果图有环，就一定要记录节点的访问情况，防止死循环。当然你可能不需要真正地使用一个集合记录节点的访问情况，比如使用一个数据范围外的数据原地标记，这样的空间复杂度会是 $$O(1)$$。

这里以有向图为例， 有向图也是类似，这里不再赘述。

#### 深度优先遍历：(Depth First Search, DFS)

深度优先遍历图的方法是，从图中某顶点 v 出发， 不断访问邻居， 邻居的邻居直到访问完毕。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gjy6kp2117j30b507mq31.jpg)

如上图， 如果我们使用 DFS，并且从 A 节点开始的话， **一个可能的**的访问顺序是： **A -> C -> B -> D -> F -> G -> E**，当然也可能是 **A -> D -> C -> B -> F -> G -> E** 等，具体取决于你的代码，但他们都是深度优先的。

#### 广度优先搜索：(Breadth First Search, BFS)

广度优先搜索，可以被形象地描述为 "浅尝辄止"，它也需要一个队列以保持遍历过的顶点顺序，以便按出队的顺序再去访问这些顶点的邻接顶点。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gjy7ds6u2lj30ea0a4dhf.jpg)

如上图， 如果我们使用 BFS，并且从 A 节点开始的话， **一个可能的**的访问顺序是： **A -> B -> C -> F -> E -> G -> D**，当然也可能是 **A -> B -> F -> E -> C -> G -> D** 等，具体取决于你的代码，但他们都是广度优先的。

需要注意的是 DFS 和 BFS 只是一种算法思想，不是一种具体的算法。 因此其有着很强的适应性，而不是局限于特点的数据结构的，本文讲的图可以用，前面讲的树也可以用。实际上， 只要是**非线性的数据结构都可以用**。

### 常见算法

图的题目的算法比较适合套模板。题目类型主要有：

- dijkstra
- floyd_warshall
- 最小生成树（Kruskal & Prim）
- A 星寻路算法
- 二分图（染色法）
- 拓扑排序

下面列举常见算法的模板，以下所有的模板都是基于邻接矩阵。

#### 最短距离，最短路径

##### dijkstra 算法

DIJKSTRA 算法主要解决的是图中任意两点的最短距离。

算法的基本思想是贪心，每次都遍历所有邻居，并从中找到距离最小的，本质上是一种广度优先遍历。这里我们借助堆这种数据结构，使得可以在 $logN$ 的时间内找到 cost 最小的点。

代码模板：

```py
import heapq


def dijkstra(graph, start, end):
    # 堆里的数据都是 (cost, i) 的二元祖，其含义是“从 start 走到 i 的距离是 cost”。
    heap = [(0, start)]
    visited = set()
    while heap:
        (cost, u) = heapq.heappop(heap)
        if u in visited:
            continue
        visited.add(u)
        if u == end:
            return cost
        for v, c in graph[u]:
            if v in visited:
                continue
            next = cost + c
            heapq.heappush(heap, (next, v))
    return -1
```

比如一个图是这样的：

```
E -- 1 --> B -- 1 --> C -- 1 --> D -- 1 --> F
 \                                         /\
  \                                        ||
    -------- 2 ---------> G ------- 1 ------
```

我们使用邻接矩阵来构造：

```py
G = {
    "B": [["C", 1]],
    "C": [["D", 1]],
    "D": [["F", 1]],
    "E": [["B", 1], ["G", 2]],
    "F": [],
    "G": [["F", 1]],
}

shortDistance = dijkstra(G, "E", "C")
print(shortDistance)  # E -- 3 --> F -- 3 --> C == 6
```

会了这个算法模板， 你就可以去 AC 743. 网络延迟时间 了。

完整代码：

```py
class Solution:
    def dijkstra(self, graph, start, end):

        heap = [(0, start)]
        visited = set()
        while heap:
            (cost, u) = heapq.heappop(heap)
            if u in visited:
                continue
            visited.add(u)
            if u == end:
                return cost
            for v, c in graph[u]:
                if v in visited:
                    continue
                next = cost + c
                heapq.heappush(heap, (next, v))
        return -1
    def networkDelayTime(self, times: List[List[int]], N: int, K: int) -> int:
        graph = collections.defaultdict(list)
        for fr, to, w in times:
            graph[fr - 1].append((to - 1, w))
        ans = -1
        for to in range(N):
            dist = self.dijkstra(graph, K - 1, to)
            if dist == -1: return -1
            ans = max(ans, dist)
        return ans
```

你学会了么？

##### floyd_warshall 算法

floyd_warshall 也是解决两个点距离的算法，只不过由于其计算过程会把中间运算结果保存起来防止重复计算，因此其特别适合**求图中任意两点的距离**，比如力扣的 1462. 课程安排 IV。除了这个优点，还有一个非常重要的点是 floyd_warshall 算法由于使用了动态规划的思想而不是贪心，因此其**可以处理负权重**的情况。

floyd_warshall 的基本思想是动态规划。该算法的时间复杂度是 $$O(N^3)$$，空间复杂度是 $$O(N^2)$$，其中 N 为顶点个数。

算法也不难理解，简单来说就是： **i 到 j 的最短路径 = i 到 k 的最短路径 + k 到 j 的最短路径**的最小值。

算法的正确性不言而喻，因为从 i 到 j，要么直接到，要么经过图中的另外一个点 k。直接到的情况就是我们算法的临界值，而经过中间点的情况取出最小的，自然就是 i 到 j 的最短距离。。

代码模板：

```py
# graph 是邻接矩阵，v 是顶点个数
def floyd_warshall(graph, v):
    dist = [[float("inf") for _ in range(v)] for _ in range(v)]

    for i in range(v):
        for j in range(v):
            dist[i][j] = graph[i][j]

    # check vertex k against all other vertices (i, j)
    for k in range(v):
        # looping through rows of graph array
        for i in range(v):
            # looping through columns of graph array
            for j in range(v):
                if (
                    dist[i][k] != float("inf")
                    and dist[k][j] != float("inf")
                    and dist[i][k] + dist[k][j] < dist[i][j]
                ):
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist, v
```

我们回过头来看下如何套模板解决 力扣的 1462. 课程安排 IV，题目描述：

```
你总共需要上 n 门课，课程编号依次为 0 到 n-1 。

有的课会有直接的先修课程，比如如果想上课程 0 ，你必须先上课程 1 ，那么会以 [1,0] 数对的形式给出先修课程数对。

给你课程总数 n 和一个直接先修课程数对列表 prerequisite 和一个查询对列表 queries 。

对于每个查询对 queries[i] ，请判断 queries[i][0] 是否是 queries[i][1] 的先修课程。

请返回一个布尔值列表，列表中每个元素依次分别对应 queries 每个查询对的判断结果。

注意：如果课程 a 是课程 b 的先修课程且课程 b 是课程 c 的先修课程，那么课程 a 也是课程 c 的先修课程。

 

示例 1：



输入：n = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
输出：[false,true]
解释：课程 0 不是课程 1 的先修课程，但课程 1 是课程 0 的先修课程。
示例 2：

输入：n = 2, prerequisites = [], queries = [[1,0],[0,1]]
输出：[false,false]
解释：没有先修课程对，所以每门课程之间是独立的。
示例 3：



输入：n = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
输出：[true,true]
示例 4：

输入：n = 3, prerequisites = [[1,0],[2,0]], queries = [[0,1],[2,0]]
输出：[false,true]
示例 5：

输入：n = 5, prerequisites = [[0,1],[1,2],[2,3],[3,4]], queries = [[0,4],[4,0],[1,3],[3,0]]
输出：[true,false,true,false]
 

提示：

2 <= n <= 100
0 <= prerequisite.length <= (n * (n - 1) / 2)
0 <= prerequisite[i][0], prerequisite[i][1] < n
prerequisite[i][0] != prerequisite[i][1]
先修课程图中没有环。
先修课程图中没有重复的边。
1 <= queries.length <= 10^4
queries[i][0] != queries[i][1]

```

这道题也可以使用 floyd_warshall 来做。 你可以这么想， 如果从 i 到 j 的距离大于 0，那不就是先修课么。而这道题数据范围 queries 大概是 10 ^ 4 ， 用上面的 dijkstra 算法肯定超时，，因此 floyd_warshall 算法是明智的选择。

我这里直接套模板，稍微改下就过了。完整代码：

```py
class Solution:
    def floyd_warshall(self, dist, v):
        for k in range(v):
            for i in range(v):
                for j in range(v):
                    dist[i][j] = dist[i][j] or (dist[i][k] and dist[k][j])

        return dist

    def checkIfPrerequisite(self, n: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        graph = [[False] * n for _ in range(n)]
        ans = []

        for to, fr in prerequisites:
            graph[fr][to] = True
        dist = self.floyd_warshall(graph, n)
        for to, fr in queries:
            ans.append(bool(dist[fr][to]))
        return ans

```

##### A 星寻路算法

A 星寻路解决的问题是在一个二维的表格中找出任意两点的最短距离或者最短路径。常用于游戏中的 NPC 的移动计算，是一种常用启发式算法。一般这种题目都会有障碍物。除了障碍物，力扣的题目还会增加一些限制，使得题目难度增加。

这种题目一般都是力扣的困难难度。理解起来不难， 但但是完整没有 bug 地写出来却不那么容易。

在该算法中，我们从起点开始，检查其相邻的四个方格并尝试扩展，直至找到目标。A 星寻路算法的寻路方式不止一种，感兴趣的可以自行了解一下。

公式表示为： f(n)=g(n)+h(n)。

其中：

- f(n) 是从初始状态经由状态 n 到目标状态的估计代价，

- g(n) 是在状态空间中从初始状态到状态 n 的实际代价，

- h(n) 是从状态 n 到目标状态的最佳路径的估计代价。

如果 g(n)为 0，即只计算任意顶点 n 到目标的评估函数 h(n)，而不计算起点到顶点 n 的距离，则算法转化为使用贪心策略的最良优先搜索，速度最快，但可能得不出最优解；
如果 h(n)不大于顶点 n 到目标顶点的实际距离，则一定可以求出最优解，而且 h(n)越小，需要计算的节点越多，算法效率越低，常见的评估函数有——欧几里得距离、曼哈顿距离、切比雪夫距离；
如果 h(n)为 0，即只需求出起点到任意顶点 n 的最短路径 g(n)，而不计算任何评估函数 h(n)，则转化为单源最短路径问题，即 Dijkstra 算法，此时需要计算最多的顶点；

这里有一个重要的概念是**估价算法**，一般我们使用 **曼哈顿距离**来进行估价，即 `H(n) = D * (abs ( n.x – goal.x ) + abs ( n.y – goal.y ) )`。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gjy9j7k3jdg305u05umy9.gif)

（图来自维基百科 https://zh.wikipedia.org/wiki/A*%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95 ）

一个完整的代码模板：

```py
grid = [
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],  # 0 are free path whereas 1's are obstacles
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
]

"""
heuristic = [[9, 8, 7, 6, 5, 4],
             [8, 7, 6, 5, 4, 3],
             [7, 6, 5, 4, 3, 2],
             [6, 5, 4, 3, 2, 1],
             [5, 4, 3, 2, 1, 0]]"""

init = [0, 0]
goal = [len(grid) - 1, len(grid[0]) - 1]  # all coordinates are given in format [y,x]
cost = 1

# the cost map which pushes the path closer to the goal
heuristic = [[0 for row in range(len(grid[0]))] for col in range(len(grid))]
for i in range(len(grid)):
    for j in range(len(grid[0])):
        heuristic[i][j] = abs(i - goal[0]) + abs(j - goal[1])
        if grid[i][j] == 1:
            heuristic[i][j] = 99  # added extra penalty in the heuristic map


# the actions we can take
delta = [[-1, 0], [0, -1], [1, 0], [0, 1]]  # go up  # go left  # go down  # go right


# function to search the path
def search(grid, init, goal, cost, heuristic):

    closed = [
        [0 for col in range(len(grid[0]))] for row in range(len(grid))
    ]  # the reference grid
    closed[init[0]][init[1]] = 1
    action = [
        [0 for col in range(len(grid[0]))] for row in range(len(grid))
    ]  # the action grid

    x = init[0]
    y = init[1]
    g = 0
    f = g + heuristic[init[0]][init[0]]
    cell = [[f, g, x, y]]

    found = False  # flag that is set when search is complete
    resign = False  # flag set if we can't find expand

    while not found and not resign:
        if len(cell) == 0:
            return "FAIL"
        else:  # to choose the least costliest action so as to move closer to the goal
            cell.sort()
            cell.reverse()
            next = cell.pop()
            x = next[2]
            y = next[3]
            g = next[1]

            if x == goal[0] and y == goal[1]:
                found = True
            else:
                for i in range(len(delta)):  # to try out different valid actions
                    x2 = x + delta[i][0]
                    y2 = y + delta[i][1]
                    if x2 >= 0 and x2 < len(grid) and y2 >= 0 and y2 < len(grid[0]):
                        if closed[x2][y2] == 0 and grid[x2][y2] == 0:
                            g2 = g + cost
                            f2 = g2 + heuristic[x2][y2]
                            cell.append([f2, g2, x2, y2])
                            closed[x2][y2] = 1
                            action[x2][y2] = i
    invpath = []
    x = goal[0]
    y = goal[1]
    invpath.append([x, y])  # we get the reverse path from here
    while x != init[0] or y != init[1]:
        x2 = x - delta[action[x][y]][0]
        y2 = y - delta[action[x][y]][1]
        x = x2
        y = y2
        invpath.append([x, y])

    path = []
    for i in range(len(invpath)):
        path.append(invpath[len(invpath) - 1 - i])
    print("ACTION MAP")
    for i in range(len(action)):
        print(action[i])

    return path


a = search(grid, init, goal, cost, heuristic)
for i in range(len(a)):
    print(a[i])
```

典型题目[1263. 推箱子](https://leetcode-cn.com/problems/minimum-moves-to-move-a-box-to-their-target-location/)

#### 拓扑排序

在计算机科学领域，有向图的拓扑排序是对其顶点的一种线性排序，使得对于从顶点 u 到顶点 v 的每个有向边 uv， u 在排序中都在之前。当且仅当图中没有定向环时（即有向无环图），才有可能进行拓扑排序。

典型的题目就是给你一堆课程，课程之间有先修关系，让你给出一种可行的学习路径方式，要求先修的课程要先学。任何有向无环图至少有一个拓扑排序。已知有算法可以在线性时间内，构建任何有向无环图的拓扑排序。

##### Kahn 算法

简单来说，假设 L 是存放结果的列表，先找到那些入度为零的节点，把这些节点放到 L 中，因为这些节点没有任何的父节点。然后把与这些节点相连的边从图中去掉，再寻找图中的入度为零的节点。对于新找到的这些入度为零的节点来说，他们的父节点已经都在 L 中了，所以也可以放入 L。重复上述操作，直到找不到入度为零的节点。如果此时 L 中的元素个数和节点总数相同，说明排序完成；如果 L 中的元素个数和节点总数不同，说明原图中存在环，无法进行拓扑排序。

```py
def topologicalSort(graph):
    """
    Kahn's Algorithm is used to find Topological ordering of Directed Acyclic Graph
    using BFS
    """
    indegree = [0] * len(graph)
    queue = []
    topo = []
    cnt = 0

    for key, values in graph.items():
        for i in values:
            indegree[i] += 1

    for i in range(len(indegree)):
        if indegree[i] == 0:
            queue.append(i)

    while queue:
        vertex = queue.pop(0)
        cnt += 1
        topo.append(vertex)
        for x in graph[vertex]:
            indegree[x] -= 1
            if indegree[x] == 0:
                queue.append(x)

    if cnt != len(graph):
        print("Cycle exists")
    else:
        print(topo)


# Adjacency List of Graph
graph = {0: [1, 2], 1: [3], 2: [3], 3: [4, 5], 4: [], 5: []}
topologicalSort(graph)
```

#### 最小生成树

Kruskal 和 Prim 这两个算法暂时先不写了，先留个模板给大家。

##### Kruskal

```py
from typing import List, Tuple


def kruskal(num_nodes: int, num_edges: int, edges: List[Tuple[int, int, int]]) -> int:
    """
    >>> kruskal(4, 3, [(0, 1, 3), (1, 2, 5), (2, 3, 1)])
    [(2, 3, 1), (0, 1, 3), (1, 2, 5)]

    >>> kruskal(4, 5, [(0, 1, 3), (1, 2, 5), (2, 3, 1), (0, 2, 1), (0, 3, 2)])
    [(2, 3, 1), (0, 2, 1), (0, 1, 3)]

    >>> kruskal(4, 6, [(0, 1, 3), (1, 2, 5), (2, 3, 1), (0, 2, 1), (0, 3, 2),
    ... (2, 1, 1)])
    [(2, 3, 1), (0, 2, 1), (2, 1, 1)]
    """
    edges = sorted(edges, key=lambda edge: edge[2])

    parent = list(range(num_nodes))

    def find_parent(i):
        if i != parent[i]:
            parent[i] = find_parent(parent[i])
        return parent[i]

    minimum_spanning_tree_cost = 0
    minimum_spanning_tree = []

    for edge in edges:
        parent_a = find_parent(edge[0])
        parent_b = find_parent(edge[1])
        if parent_a != parent_b:
            minimum_spanning_tree_cost += edge[2]
            minimum_spanning_tree.append(edge)
            parent[parent_a] = parent_b

    return minimum_spanning_tree


if __name__ == "__main__":  # pragma: no cover
    num_nodes, num_edges = list(map(int, input().strip().split()))
    edges = []

    for _ in range(num_edges):
        node1, node2, cost = [int(x) for x in input().strip().split()]
        edges.append((node1, node2, cost))

    kruskal(num_nodes, num_edges, edges)
```

##### Prim

```py
import sys
from collections import defaultdict


def PrimsAlgorithm(l):  # noqa: E741

    nodePosition = []

    def get_position(vertex):
        return nodePosition[vertex]

    def set_position(vertex, pos):
        nodePosition[vertex] = pos

    def top_to_bottom(heap, start, size, positions):
        if start > size // 2 - 1:
            return
        else:
            if 2 * start + 2 >= size:
                m = 2 * start + 1
            else:
                if heap[2 * start + 1] < heap[2 * start + 2]:
                    m = 2 * start + 1
                else:
                    m = 2 * start + 2
            if heap[m] < heap[start]:
                temp, temp1 = heap[m], positions[m]
                heap[m], positions[m] = heap[start], positions[start]
                heap[start], positions[start] = temp, temp1

                temp = get_position(positions[m])
                set_position(positions[m], get_position(positions[start]))
                set_position(positions[start], temp)

                top_to_bottom(heap, m, size, positions)

    # Update function if value of any node in min-heap decreases
    def bottom_to_top(val, index, heap, position):
        temp = position[index]

        while index != 0:
            if index % 2 == 0:
                parent = int((index - 2) / 2)
            else:
                parent = int((index - 1) / 2)

            if val < heap[parent]:
                heap[index] = heap[parent]
                position[index] = position[parent]
                set_position(position[parent], index)
            else:
                heap[index] = val
                position[index] = temp
                set_position(temp, index)
                break
            index = parent
        else:
            heap[0] = val
            position[0] = temp
            set_position(temp, 0)

    def heapify(heap, positions):
        start = len(heap) // 2 - 1
        for i in range(start, -1, -1):
            top_to_bottom(heap, i, len(heap), positions)

    def deleteMinimum(heap, positions):
        temp = positions[0]
        heap[0] = sys.maxsize
        top_to_bottom(heap, 0, len(heap), positions)
        return temp

    visited = [0 for i in range(len(l))]
    Nbr_TV = [-1 for i in range(len(l))]  # Neighboring Tree Vertex of selected vertex
    # Minimum Distance of explored vertex with neighboring vertex of partial tree
    # formed in graph
    Distance_TV = []  # Heap of Distance of vertices from their neighboring vertex
    Positions = []

    for x in range(len(l)):
        p = sys.maxsize
        Distance_TV.append(p)
        Positions.append(x)
        nodePosition.append(x)

    TreeEdges = []
    visited[0] = 1
    Distance_TV[0] = sys.maxsize
    for x in l[0]:
        Nbr_TV[x[0]] = 0
        Distance_TV[x[0]] = x[1]
    heapify(Distance_TV, Positions)

    for i in range(1, len(l)):
        vertex = deleteMinimum(Distance_TV, Positions)
        if visited[vertex] == 0:
            TreeEdges.append((Nbr_TV[vertex], vertex))
            visited[vertex] = 1
            for v in l[vertex]:
                if visited[v[0]] == 0 and v[1] < Distance_TV[get_position(v[0])]:
                    Distance_TV[get_position(v[0])] = v[1]
                    bottom_to_top(v[1], get_position(v[0]), Distance_TV, Positions)
                    Nbr_TV[v[0]] = vertex
    return TreeEdges


if __name__ == "__main__":  # pragma: no cover
    # < --------- Prims Algorithm --------- >
    n = int(input("Enter number of vertices: ").strip())
    e = int(input("Enter number of edges: ").strip())
    adjlist = defaultdict(list)
    for x in range(e):
        l = [int(x) for x in input().strip().split()]  # noqa: E741
        adjlist[l[0]].append([l[1], l[2]])
        adjlist[l[1]].append([l[0], l[2]])
    print(PrimsAlgorithm(adjlist))
```

#### 二分图

二分图我在这两道题中讲过了，大家看一下之后把这两道题做一下就行了。其实这两道题和一道题没啥区别。

- [0886. 可能的二分法](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/medium/886.possible-bipartition)
- [0785. 判断二分图](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/medium/785.is-graph-bipartite)

推荐顺序为： 先看 886 再看 785。

### 总结

理解图的常见概念，我们就算入门了。接下来，我们就可以做题了，一般的图题目第一步都是建图，第二步都是基于第一步的图进行遍历以寻找可行解。

图的题目相对而言比较难，尤其是代码书写层面。但是就面试题目而言， 图的题目类型却不多，而且很多题目都是套模板就可以解决。因此建议大家多练习模板，并自己多手敲，确保可以自己敲出来。
