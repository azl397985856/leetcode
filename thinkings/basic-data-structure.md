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

> 社区中有很多“执行上下文中的 scope 指的是执行栈中父级声明的变量”说法，这是完全错误的， JS 是词法作用
