# 并查集

关于并查集的题目不少，官方给的数据是 30 道（截止 2020-02-20），但是有一些题目虽然官方没有贴`并查集`标签，但是使用并查集来说确非常简单。这类题目如果掌握模板，那么刷这种题会非常快，并且犯错的概率会大大降低，这就是模板的好处。

我这里总结了几道并查集的题目：

- [547. 朋友圈](../problems/547.friend-circles.md)
- [721. 账户合并](https://leetcode-cn.com/problems/accounts-merge/solution/mo-ban-ti-bing-cha-ji-python3-by-fe-lucifer-3/)
- [990. 等式方程的可满足性](https://github.com/azl397985856/leetcode/issues/304)
- [1202. 交换字符串中的元素](https://leetcode-cn.com/problems/smallest-string-with-swaps/)
- [1697. 检查边长度限制的路径是否存在](https://leetcode-cn.com/problems/checking-existence-of-edge-length-limited-paths/)

上面的题目前面四道都是无权图的连通性问题，第五道题是带权图的连通性问题。两种类型大家都要会，上面的题目关键字都是**连通性**，代码都是套模板。看完这里的内容，建议拿上面的题目练下手，检测一下学习成果。

## 概述

并查集是一种树型的数据结构，用于处理一些不交集（Disjoint Sets）的合并及查询问题。有一个联合-查找算法（Union-find Algorithm）定义了两个用于此数据结构的操作：

- Find：确定元素属于哪一个子集。它可以被用来确定两个元素是否属于同一子集。
- Union：将两个子集合并成同一个集合。

初始化每一个点都是一个连通域，类似下图：

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmm4f8vpp3j30p9024jra.jpg)

由于支持这两种操作，一个不相交集也常被称为联合-查找数据结构（Union-find Data Structure）或合并-查找集合（Merge-find Set）。为了更加精确的定义这些方法，需要定义如何表示集合。一种常用的策略是为每个集合选定一个固定的元素，称为代表，以表示整个集合。接着，Find(x) 返回 x 所属集合的代表，而 Union 使用两个集合的代表作为参数。

## 形象解释

比如有两个司令。 司令下有若干军长，军长下有若干师长。。。

我们如何判断某两个师长是否属于同一个司令呢（连通性）？

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlufxh5lhj30gs0bzwet.jpg)

很简单，我们顺着师长，往上找，找到司令。 如果两个师长找到的是同一个司令，那么就属于同一个司令。我们用 parent[x] = y 表示 x 的 parent 是 y，通过不断沿着搜索 parent 搜索找到 root，然后比较 root 是否相同即可得出结论。

以上过程涉及了两个基本操作`find`和`connnected`。 并查集除了这两个基本操作，还有一个是`union`。即将两个集合合并为同一个。

> 为了使得合并之后的树尽可能平衡，一般选择将小树挂载到大树上面，之后的代码模板会体现这一点

如图有两个司令：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlufys950j30wp0el0th.jpg)

我们将其合并为一个联通域，最简单的方式就是直接将其中一个司令指向另外一个即可：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlug0ni3jj30ym0cojsb.jpg)

以上就是三个核心 API `find`，`connnected` 和 `union`， 的形象化解释，下面我们来看下代码实现。

## 核心 API

### find

```python
def find(self, x):
    while x != self.parent[x]:
        x = self.parent[x]
    return x
```

也可使用递归来实现。

```py
def find(self, x):
    if x != self.parent[x]:
        self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    return x
```

（这里我进行了路径的压缩）

比如对于如下的一个图：

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmm4g5jyb9j30og05naaa.jpg)

调用 find(0) 会逐步找到 3 ，在找到 3 的过程上会将路径上的节点都指向根节点。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmm4i1vrclg30ni05wtj9.gif)

极限情况下，每一个路径都会被压缩，这种情况下继续查找的时间复杂度就是 $O(1)$。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmm4zjf5evj30u00aigml.jpg)

### connected

直接利用上面实现好的 find 方法即可。如果两个节点的祖先相同，那么其就联通。

```python
def connected(self, p, q):
    return self.find(p) == self.find(q)
```

### union

将其中一个节点挂到另外一个节点的祖先上，这样两者祖先就一样了。也就是说，两个节点联通了。

对于如下的一个图：

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmm4avz4iej30lv04rmx9.jpg)

图中 r:1 表示 秩为 1，r 是 rank 的简写。这里的秩其实对应的就是上文的 size。

如果我们将 0 和 7 进行一次合并。即 `union(0, 7)` ，则会发生如下过程。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmm4btv06yg30ni05wwze.gif)

代码：

```python
def union(self, p, q):
    if self.connected(p, q): return
    self.parent[self.find(p)] = self.find(q)
```

## 不带权并查集

平时做题过程，遇到的更多的是不带权的并查集。相比于带权并查集， 其实现过程也更加简单。

### 带路径压缩的代码模板

```python
class UF:
    def __init__(self, M):
        self.parent = {}
        self.size = {}
        self.cnt = 0
        # 初始化 parent，size 和 cnt
        for i in range(M):
            self.parent[i] = i
            self.cnt += 1
            self.size[i] = 1

    def find(self, x):
        if x != self.parent[x]:
            self.parent[x] = self.find(self.parent[x])
            return self.parent[x]
        return x
    def union(self, p, q):
        if self.connected(p, q): return
        # 小的树挂到大的树上， 使树尽量平衡
        leader_p = self.find(p)
        leader_q = self.find(q)
        if self.size[leader_p] < self.size[leader_q]:
            self.parent[leader_p] = leader_q
            self.size[leader_q] += self.size[leader_p]
        else:
            self.parent[leader_q] = leader_p
            self.size[leader_p] += self.size[leader_q]
        self.cnt -= 1
    def connected(self, p, q):
        return self.find(p) == self.find(q)
```

## 带权并查集

实际上并查集就是图结构，我们使用了哈希表来模拟这种图的关系。 而上面讲到的其实都是有向无权图，因此仅仅使用 parent 表示节点关系就可以了。而如果使用的是有向带权图呢？实际上除了维护 parent 这样的节点指向关系，我们还需要维护节点的权重，一个简单的想法是使用另外一个哈希表 weight 存储节点的权重关系。比如 `weight[a] = 1 表示 a 到其父节点的权重是 1`。

如果是带权的并查集，其查询过程的路径压缩以及合并过程会略有不同，因为我们不仅关心节点指向的变更，也关心权重如何更新。比如：

```
a    b
^    ^
|    |
|    |
x    y
```

如上表示的是 x 的父节点是 a，y 的父节点是 b，现在我需要将 x 和 y 进行合并。

```
a    b
^    ^
|    |
|    |
x -> y
```

假设 x 到 a 的权重是 w(xa)，y 到 b 的权重为 w(yb)，x 到 y 的权重是 w(xy)。合并之后会变成如图的样子：

```
a -> b
^    ^
|    |
|    |
x    y
```

那么 a 到 b 的权重应该被更新为什么呢？我们知道 w(xa) + w(ab) = w(xy) + w(yb)，也就是说 a 到 b 的权重 w(ab) = w(xy) + w(yb) - w(xa)。

当然上面关系式是加法，减法，取模还是乘法，除法等完全由题目决定，我这里只是举了一个例子。不管怎么样，这种运算一定需要满足**可传导性**。

### 带路径压缩的代码模板

这里以加法型带权并查集为例，讲述一下代码应该如何书写。

```py
class UF:
    def __init__(self, M):
        # 初始化 parent，weight
        self.parent = {}
        self.weight = {}
        for i in range(M):
            self.parent[i] = i
            self.weight[i] = 0

   def find(self, x):
        if self.parent[x] != x:
            ancestor, w = self.find(self.parent[x])
            self.parent[x] = ancestor
            self.weight[x] += w
        return self.parent[x], self.weight[x]
    def union(self, p, q, dist):
        if self.connected(p, q): return
        leader_p, w_p = self.find(p)
        leader_q, w_q = self.find(q)
        self.parent[leader_p] = leader_q
        self.weight[leader_p] = dist + w_q - w_p
    def connected(self, p, q):
        return self.find(p)[0] == self.find(q)[0]
```

典型题目：

- [399. 除法求值](https://leetcode-cn.com/problems/evaluate-division/)

## 应用

- 检测图是否有环

思路： 只需要将边进行合并，并在合并之前判断是否已经联通即可，如果合并之前已经联通说明存在环。

代码：

```py
uf = UF()
for a, b in edges:
    if uf.connected(a, b): return False
    uf.union(a, b)
return True
```

题目推荐：

- [684. 冗余连接](https://leetcode-cn.com/problems/redundant-connection/solution/bing-cha-ji-mo-ban-ben-zhi-jiu-shi-jian-0wz2m/)
- [Forest Detection](https://binarysearch.com/problems/Forest-Detection)

- 最小生成树经典算法 Kruskal

## 总结

如果题目有连通，等价的关系，那么你就可以考虑并查集，另外使用并查集的时候要注意路径压缩，否则随着树的高度增加复杂度会逐渐增大。

对于带权并查集实现起来比较复杂，主要是路径压缩和合并这块不一样，不过我们只要注意节点关系，画出如下的图：

```
a -> b
^    ^
|    |
|    |
x    y
```

就不难看出应该如何更新拉。

本文提供的题目模板是西法我用的比较多的，用了它不仅出错概率大大降低，而且速度也快了很多，整个人都更自信了呢 ^\_^
