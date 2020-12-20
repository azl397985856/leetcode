# 几乎刷完了力扣所有的树题，我发现了这些东西。。。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkybjfbpubj30uo0u0gqz.jpg)

先上下本文的提纲，这个是我用 mindmap 画的一个脑图，之后我会继续完善，将其他专题逐步完善起来。

> 大家也可以使用 vscode blink-mind 打开源文件查看，里面有一些笔记可以点开查看。源文件可以去我的公众号《力扣加加》回复脑图获取，以后脑图也会持续更新更多内容。vscode 插件地址：https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

本系列包含以下专题：

- [几乎刷完了力扣所有的链表题，我发现了这些东西。。。](https://lucifer.ren/blog/2020/11/08/linked-list/)
- 几乎刷完了力扣所有的树题，我发现了这些东西。。。(就是本文)

## 一点絮叨

首先亮一下本文的主角 - 树（我的化妆技术还行吧^\_^）：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkyz162e1ij30lu0ssdhm.jpg)

[树标签](https://leetcode-cn.com/tag/tree/ "树标签")在 leetcode 一共有 **175 道题**。 为了准备这个专题，我花了几天时间将 leetcode 几乎所有的树题目都刷了一遍。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkpkbu92m2j30u00vg0xu.jpg)

除了 35 个上锁的，1 个不能做的题（1628 题不知道为啥做不了）， 4 个标着树的标签但却是图的题目，其他我都刷了一遍。通过集中刷这些题，我发现了一些有趣的信息，今天就分享给大家。

## 食用指南

大家好，我是 lucifer。今天给大家带来的是《树》专题。另外为了保持章节的聚焦性和实用性，省去了一些内容，比如哈夫曼树，前缀树，平衡二叉树（红黑树等），二叉堆。这些内容相对来说实用性没有那么强，如果大家对这些内容也感兴趣，可以关注下我的仓库 [leetcode 算法题解](https://github.com/azl397985856/leetcode "leetcode 算法题解")，大家有想看的内容也可以留言告诉我哦~

另外要提前告知大家的是本文所讲的很多内容都很依赖于递归。关于递归的练习我推荐大家把递归过程画到纸上，手动代入几次。等大脑熟悉了递归之后就不用这么辛苦了。 实在懒得画图的同学也可以找一个可视化递归的网站，比如 https://recursion.now.sh/。 等你对递归有了一定的理解之后就仔细研究一下树的各种遍历方法，再把本文看完，最后把文章末尾的题目做一做，搞定个递归问题不大。

> 文章的后面《两个基本点 - 深度优先遍历》部分，对于如何练习树的遍历的递归思维我也提出了一种方法

最后要强调的是，本文只是帮助你搞定树题目的常见套路，但不是说树的所有题目涉及的考点都讲。比如树状 DP 这种不在本文的讨论范围，因为这种题更侧重的是 DP，如果你不懂 DP 多半是做不出来的，你需要的是学完树和 DP 之后再去学树状 DP。如果你对这些内容感兴趣，可以期待我的后续专题。

## 前言

提到树大家更熟悉的是现实中的树，而现实中的树是这样的：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkydk0w4uoj31750u0amg.jpg)

而计算机中的树其实是现实中的树的倒影。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkydoh5we8j31bl0u0kjn.jpg)

计算机的数据结构是对现实世界物体间关系的一种抽象。比如家族的族谱，公司架构中的人员组织关系，电脑中的文件夹结构，html 渲染的 dom 结构等等，这些有层次关系的结构在计算机领域都叫做树。

首先明确一下，树其实是一种逻辑结构。比如笔者平时写复杂递归的时候，尽管笔者做的题目不是树，也会画一个递归树帮助自己理解。

> 树是一种重要的思维工具

以最简单的计算 fibonacci 数列为例：

```js
function fn(n) {
  if (n == 0 || n == 1) return n;

  return fn(n - 1) + fn(n - 2);
}
```

很明显它的入参和返回值都不是树，但是却不影响我们用树的思维去思考。

继续回到上面的代码，根据上面的代码可以画出如下的递归树。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqv37r0x4j30f90iot9s.jpg)

其中树的边表示的是返回值，树节点表示的是需要计算的值，即 fn(n）。

以计算 5 的 fibbonacci 为例，过程大概是这样的（动图演示）：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqvazbxs8g30gi0my4qp.gif)

**这其实就是一个树的后序遍历**，你说树（逻辑上的树）是不是很重要？关于后序遍历咱们后面再讲，现在大家知道是这么回事就行。

大家也可以去 [这个网站](https://recursion.now.sh/ "递归可视化网站") 查看上面算法的单步执行效果。当然这个网站还有更多的算法的动画演示。

> 上面的图箭头方向是为了方便大家理解。其实箭头方向变成向下的才是真的树结构。

广义的树真的很有用，但是它范围太大了。 本文所讲的树的题目是比较狭隘的树，指的是输入（参数）或者输出（返回值）是树结构的题目。

<!-- more -->

### 基本概念

> 树的基本概念难度都不大，为了节省篇幅，我这里简单过一下。对于你不熟悉的点，大家自行去查找一下相关资料。我相信大家也不是来看这些的，大家应该想看一些不一样的东西，比如说一些做题的套路。

树是一种非线性数据结构。树结构的基本单位是节点。节点之间的链接，称为分支（branch）。节点与分支形成树状，结构的开端，称为根（root），或根结点。根节点之外的节点，称为子节点（child）。没有链接到其他子节点的节点，称为叶节点（leaf）。如下图是一个典型的树结构：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfjv3xmkknj30jb0cymxw.jpg)

每个节点可以用以下数据结构来表示：

```c
Node {
	value: any; // 当前节点的值
	children: Array<Node>; // 指向其儿子
}
```

其他重要概念：

- 树的高度：节点到叶子节点的最大值就是其高度。
- 树的深度：高度和深度是相反的，高度是从下往上数，深度是从上往下。因此根节点的深度和叶子节点的高度是 0。
- 树的层：根开始定义，根为第一层，根的孩子为第二层。
- 二叉树，三叉树，。。。 N 叉树，由其子节点最多可以有几个决定，最多有 N 个就是 N 叉树。

### 二叉树

二叉树是树结构的一种，两个叉就是说每个节点**最多**只有两个子节点，我们习惯称之为左节点和右节点。

> 注意这个只是名字而已，并不是实际位置上的左右

二叉树也是我们做算法题最常见的一种树，因此我们花大篇幅介绍它，大家也要花大量时间重点掌握。

二叉树可以用以下数据结构表示：

```c
Node {
	value: any; // 当前节点的值
	left: Node | null; // 左儿子
	right: Node | null; // 右儿子
}
```

#### 二叉树分类

- 完全二叉树
- 满二叉树
- 二叉搜索树
- [平衡二叉树](https://github.com/azl397985856/leetcode/blob/master/thinkings/balanced-tree.md "平衡二叉树")
- 红黑树
- 。。。

#### 二叉树的表示

- 链表存储
- 数组存储。非常适合完全二叉树

## 树题难度几何？

很多人觉得树是一个很难的专题。实际上，只要你掌握了诀窍，它并没那么难。

从官方的难度标签来看，树的题目处于困难难度的一共是 14 道， 这其中还有 1 个标着树的标签但是却是图的题目，因此困难率是 13 / 175 ，也就是 7.4 % 左右。如果排除上锁的 5 道，困难的只有 9 道。大多数困难题，相信你看完本节的内容，也可以做出来。

从通过率来看，只有**不到三分之一**的题目平均通过率在 50% 以下，其他（绝大多数的题目）通过率都是 50%以上。50% 是一个什么概念呢？这其实很高了。举个例子来说， BFS 的平均通过率差不多在 50%。 而大家认为比较难的二分法和动态规划的平均通过率差不多 40%。

大家不要对树有压力， 树和链表一样是相对容易的专题，今天 lucifer 给大家带来了一个口诀**一个中心，两个基本点，三种题型，四个重要概念，七个技巧**，帮助你克服树这个难关。

## 一个中心

一个中心指的是**树的遍历**。整个树的专题只有一个中心点，那就是树的遍历，大家务必牢牢记住。

不管是什么题目，核心就是树的遍历，这是一切的基础，不会树的遍历后面讲的都是白搭。

其实树的遍历的本质就是去把树里边儿的每个元素都访问一遍（任何数据结构的遍历不都是如此么？）。但怎么访问的？我不能直接访问叶子节点啊，我必须得从根节点开始访问，然后根据子节点指针访问子节点，但是子节点有多个（二叉树最多两个）方向，所以又有了先访问哪个的问题，这造成了不同的遍历方式。

> 左右子节点的访问顺序通常不重要，极个别情况下会有一些微妙区别。比如说我们想要访问一棵树的最左下角节点，那么顺序就会产生影响，但这种题目会比较少一点。

而遍历不是目的，遍历是为了更好地做处理，这里的处理包括搜索，修改树等。树虽然只能从根开始访问，但是我们可以**选择**在访问完毕回来的时候做处理，还是在访问回来之前做处理，这两种不同的方式就是**后序遍历**和**先序遍历**。

> 关于具体的遍历，后面会给大家详细讲，现在只要知道这些遍历是怎么来的就行了。

而树的遍历又可以分为两个基本类型，分别是深度优先遍历和广度优先遍历。这两种遍历方式并不是树特有的，但却伴随树的所有题目。值得注意的是，这两种遍历方式只是一种逻辑而已，因此理论可以应用于任何数据结构，比如 [365. 水壶问题](https://github.com/azl397985856/leetcode/blob/master/problems/365.water-and-jug-problem.md "365. 水壶问题") 中，就可以对水壶的状态使用广度优先遍历，而水壶的状态可以用**一个二元组**来表示。

> 遗憾的是这道题的广度优先遍历解法在 LeetCode 上提交会超时

### 树的遍历迭代写法

很多小朋友表示二叉树前中后序的递归写法没问题，但是迭代就写不出来，问我有什么好的方法没有。

这里就给大家介绍一种写迭代遍历树的实操技巧，统一三种树的遍历方式，包你不会错，这个方法叫做双色标记法。 如果你会了这个技巧，那么你平时练习大可**只用递归**。然后面试的时候，真的要求用迭代或者是对性能有特别要求的那种题目，那你就用我的方法套就行了，下面我来详细讲一下这种方法。

我们知道垃圾回收算法中，有一种算法叫三色标记法。 即：

- 用白色表示尚未访问
- 灰色表示尚未完全访问子节点
- 黑色表示子节点全部访问

那么我们可以模仿其思想，使用双色标记法来统一三种遍历。

其核心思想如下：

- 使用颜色标记节点的状态，新节点为白色，已访问的节点为灰色。
- 如果遇到的节点为白色，则将其标记为灰色，然后将其右子节点、自身、左子节点依次入栈。
- 如果遇到的节点为灰色，则将节点的值输出。

使用这种方法实现的中序遍历如下：

```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        WHITE, GRAY = 0, 1
        res = []
        stack = [(WHITE, root)]
        while stack:
            color, node = stack.pop()
            if node is None: continue
            if color == WHITE:
                stack.append((WHITE, node.right))
                stack.append((GRAY, node))
                stack.append((WHITE, node.left))
            else:
                res.append(node.val)
        return res
```

可以看出，实现上 WHITE 就表示的是递归中的第一次进入过程，Gray 则表示递归中的从叶子节点返回的过程。 因此这种迭代的写法更接近递归写法的本质。

如要**实现前序、后序遍历，也只需要调整左右子节点的入栈顺序即可，其他部分是无需做任何变化**。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkq01o7423j31gg0u0dwg.jpg)
（前中后序遍历只需要调整这三句话的位置即可）

可以看出使用三色标记法，其写法类似递归的形式，因此便于记忆和书写。

有的同学可能会说，这里的每一个节点都会入栈出栈两次，相比普通的迭代入栈和出栈次数整整加了一倍，这性能可以接受么？我要说的是这种时间和空间的增加仅仅是常数项的增加，大多数情况并不会都程序造成太大的影响。 除了有时候比赛会比较恶心人，会**卡常**（卡常是指通过计算机原理相关的、与理论复杂度无关的方法对代码运行速度进行优化)。反过来看，大家写的代码大多数是递归，要知道递归由于内存栈的开销，性能通常比这里的二色标记法更差才对， 那为啥不用一次入栈的迭代呢？更极端一点，为啥大家不都用 morris 遍历 呢？

> morris 遍历 是可以在常数的空间复杂度完成树的遍历的一种算法。

我认为在大多数情况下，大家对这种细小的差异可以不用太关注。另外如果这种遍历方式完全掌握了，再根据递归的思想去写一次入栈的迭代也不是难事。 无非就是调用函数的时候入栈，函数 return 时候出栈罢了。更多二叉树遍历的内容，大家也可以访问我之前写的专题[《二叉树的遍历》](https://github.com/azl397985856/leetcode/blob/master/thinkings/binary-tree-traversal.md "二叉树的遍历")。

### 小结

简单总结一下，树的题目一个中心就是树的遍历。树的遍历分为两种，分别是深度优先遍历和广度优先遍历。关于树的不同深度优先遍历（前序，中序和后序遍历）的迭代写法是大多数人容易犯错的地方，因此我介绍了一种统一三种遍历的方法 - 二色标记法，这样大家以后写迭代的树的前中后序遍历就再也不用怕了。如果大家彻底熟悉了这种写法，再去记忆和练习一次入栈甚至是 Morris 遍历即可。

其实用一次入栈和出栈的迭代实现递归也很简单，无非就是还是用递归思想，只不过你把递归体放到循环里边而已。大家可以在熟悉递归之后再回头看看就容易理解了。树的深度遍历的递归技巧，我们会在后面的《两个基本点》部分讲解。

## 两个基本点

上面提到了树的遍历有两种基本方式，分别是**深度优先遍历（以下简称 DFS）和广度优先遍历（以下简称 BFS），这就是两个基本点**。这两种遍历方式下面又会细分几种方式。比如 **DFS 细分为前中后序遍历， BFS 细分为带层的和不带层的**。

**DFS 适合做一些暴力枚举的题目，DFS 如果借助函数调用栈，则可以轻松地使用递归来实现。**

### BFS 不是 层次遍历

而 BFS 适合求最短距离，这个和层次遍历是不一样的，很多人搞混。这里强调一下，层次遍历和 BFS 是**完全不一样**的东西。

层次遍历就是一层层遍历树，按照树的层次顺序进行访问。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkye7nyrjaj30yw0ec762.jpg)
（层次遍历图示）

**BFS 的核心在于求最短问题时候可以提前终止，这才是它的核心价值，层次遍历是一种不需要提前终止的 BFS 的副产物**。这个提前终止不同于 DFS 的剪枝的提前终止，而是找到最近目标的提前终止。比如我要找距离最近的目标节点，BFS 找到目标节点就可以直接返回。而 DFS 要穷举所有可能才能找到最近的，这才是 BFS 的核心价值。实际上，我们也可以使用 DFS 实现层次遍历的效果，借助于递归，代码甚至会更简单。

> 如果找到任意一个满足条件的节点就好了，不必最近的，那么 DFS 和 BFS 没有太大差别。同时为了书写简单，我通常会选择 DFS。

以上就是两种遍历方式的简单介绍，下面我们对两者进行一个详细的讲解。

### 深度优先遍历

深度优先搜索算法（英语：Depth-First-Search，DFS）是一种用于遍历树或图的算法。沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点 v 的所在边都己被探寻过，搜索将回溯到发现节点 v 的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止，属于**盲目搜索**。

深度优先搜索是图论中的经典算法，利用深度优先搜索算法可以产生目标图的相应拓扑排序表，利用拓扑排序表可以方便的解决很多相关的图论问题，如最大路径问题等等。因发明「深度优先搜索算法」，约翰 · 霍普克洛夫特与罗伯特 · 塔扬在 1986 年共同获得计算机领域的最高奖：图灵奖。

截止目前（2020-02-21），深度优先遍历在 LeetCode 中的题目是 129 道。在 LeetCode 中的题型绝对是超级大户了。而对于树的题目，我们基本上都可以使用 DFS 来解决，甚至我们可以基于 DFS 来做层次遍历，而且由于 DFS 可以基于递归去做，因此算法会更简洁。 在对性能有很高要求的场合，我建议你使用迭代，否则尽量使用递归，不仅写起来简单快速，还不容易出错。

DFS 图解：

![binary-tree-traversal-dfs](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlui7vcmwg30dw0dw3yl.gif)

(图片来自 https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/depth-first-search)

#### 算法流程

1. 首先将根节点放入**stack**中。
2. 从*stack*中取出第一个节点，并检验它是否为目标。如果找到所有的节点，则结束搜寻并回传结果。否则将它某一个尚未检验过的直接子节点加入**stack**中。
3. 重复步骤 2。
4. 如果不存在未检测过的直接子节点。将上一级节点加入**stack**中。
   重复步骤 2。
5. 重复步骤 4。
6. 若**stack**为空，表示整张图都检查过了——亦即图中没有欲搜寻的目标。结束搜寻并回传“找不到目标”。

**这里的 stack 可以理解为自己实现的栈，也可以理解为调用栈。如果是调用栈的时候就是递归，如果是自己实现的栈的话就是迭代。**

#### 算法模板

一个典型的通用的 DFS 模板可能是这样的：

```js
const visited = {}
function dfs(i) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
	}

	visited[i] = true // 将当前状态标为已搜索
	for (根据i能到达的下个状态j) {
		if (!visited[j]) { // 如果状态j没有被搜索过
			dfs(j)
		}
	}
}
```

上面的 visited 是为了防止由于环的存在造成的死循环的。 而我们知道树是不存在环的，因此树的题目大多数不需要 visited，除非你对树的结构做了修改，比如就左子树的 left 指针指向自身，此时会有环。再比如 [138. 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/) 这道题需要记录已经复制的节点，这些需要记录 visited 信息的树的题目**少之又少**。

因此一个树的 DFS 更多是：

```js

function dfs(root) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
	}
	for (const child of root.children) {
        dfs(child)
	}
}
```

而几乎所有的题目几乎都是二叉树，因此下面这个模板更常见。

```js
function dfs(root) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
	}
    dfs(root.left)
    dfs(root.right)
}
```

而我们不同的题目除了 if (满足特定条件部分不同之外)，还会写一些特有的逻辑，这些逻辑写的位置不同，效果也截然不同。那么位置不同会有什么影响，什么时候应该写哪里呢？接下来，我们就聊聊两种常见的 DFS 方式。

#### 两种常见分类

前序遍历和后序遍历是最常见的两种 DFS 方式。而另外一种遍历方式 （中序遍历）一般用于平衡二叉树，这个我们后面的**四个重要概念**部分再讲。

##### 前序遍历

如果你的代码大概是这么写的（注意主要逻辑的位置）：

```js
function dfs(root) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
    }
    // 主要逻辑
    dfs(root.left)
    dfs(root.right)
}
```

那么此时我们称为前序遍历。

##### 后续遍历

而如果你的代码大概是这么写的（注意主要逻辑的位置）：

```js
function dfs(root) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
    }
    dfs(root.left)
    dfs(root.right)
    // 主要逻辑
}
```

那么此时我们称为后序遍历。

值得注意的是， 我们有时也会会写出这样的代码：

```js
function dfs(root) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
    }
    // 做一些事
    dfs(root.left)
    dfs(root.right)
    // 做另外的事
}
```

如上代码，我们在进入和退出左右子树的时候分别执行了一些代码。那么这个时候，是前序遍历还是后续遍历呢？实际上，这属于混合遍历了。不过我们这里只考虑**主逻辑**的位置，关键词是**主逻辑**。

如果代码主逻辑在左右子树之前执行，那么就是前序遍历。如果代码主逻辑在左右子树之后执行，那么就是后序遍历。关于更详细的内容， 我会在**七个技巧** 中的**前后遍历**部分讲解，大家先留个印象，知道有着两种方式就好。

##### 递归遍历的学习技巧

上面的《一个中心》部分，给大家介绍了一种干货技巧《双色遍历》统一三种遍历的迭代写法。 而树的遍历的递归的写法其实大多数人都没问题。为什么递归写的没问题，用栈写迭代就有问题呢? 本质上其实还是对递归的理解不够。那 lucifer 今天给大家介绍一种练习递归的技巧。其实文章开头也提到了，那就是画图 + 手动代入。有的同学不知道怎么画，这里我抛砖引玉分享一下我学习递归的画法。

比如我们要前序遍历一棵这样的树：

```
    1
   / \
  2   3
     / \
    4   5
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkyyxm3hamj31990u0dtc.jpg)

图画的还算比较清楚， 就不多解释了。大家遇到题目多画几次这样的递归图，慢慢就对递归有感觉了。

### 广度优先遍历

树的遍历的两种方式分别是 DFS 和 BFS，刚才的 DFS 我们简单过了一下前序和后序遍历，对它们有了一个简单印象。这一小节，我们来看下树的另外一种遍历方式 - BFS。

BFS 也是图论中算法的一种，不同于 DFS， BFS 采用横向搜索的方式，在数据结构上通常采用队列结构。 注意，DFS 我们借助的是栈来完成，而这里借助的是队列。

BFS 比较适合找**最短距离/路径**和**某一个距离的目标**。比如`给定一个二叉树，在树的最后一行找到最左边的值。 `，此题是力扣 513 的原题。这不就是求距离根节点**最远距离**的目标么？ 一个 BFS 模板就解决了。

BFS 图解：

![binary-tree-traversal-bfs](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluic79lag30dw0dw3yl.gif)

(图片来自 https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/breadth-first-search)

#### 算法流程

1. 首先将根节点放入队列中。
2. 从队列中取出第一个节点，并检验它是否为目标。
   - 如果找到目标，则结束搜索并回传结果。
   - 否则将它所有尚未检验过的直接子节点加入队列中。
3. 若队列为空，表示整张图都检查过了——亦即图中没有欲搜索的目标。结束搜索并回传“找不到目标”。
4. 重复步骤 2。

#### 算法模板

```js
const visited = {}
function bfs() {
	let q = new Queue()
	q.push(初始状态)
	while(q.length) {
		let i = q.pop()
        if (visited[i]) continue
        if (i 是我们要找的目标) return 结果
		for (i的可抵达状态j) {
			if (j 合法) {
				q.push(j)
			}
		}
    }
    return 没找到
}
```

#### 两种常见分类

BFS 我目前使用的模板就两种，这两个模板可以解决所有的树的 BFS 问题。

前面我提到了“BFS 比较适合找**最短距离/路径**和**某一个距离的目标**”。 如果我需要求的是最短距离/路径，我是不关心我走到第几步的，这个时候可是用不标记层的目标。而如果我需要求距离某个节点距离等于 k 的所有节点，这个时候第几步这个信息就值得被记录了。

> 小于 k 或者 大于 k 也是同理。

##### 标记层

一个常见的 BFS 模板，代入题目只需要根据题目微调即可。

```python
class Solution:
    def bfs(k):
        # 使用双端队列，而不是数组。因为数组从头部删除元素的时间复杂度为 N，双端队列的底层实现其实是链表。
        queue = collections.deque([root])
        # 记录层数
        steps = 0
        # 需要返回的节点
        ans = []
        # 队列不空，生命不止！
        while queue:
            size = len(queue)
            # 遍历当前层的所有节点
            for _ in range(size):
                node = queue.popleft()
                if (step == k) ans.append(node)
                if node.right:
                    queue.append(node.right)
                if node.left:
                    queue.append(node.left)
            # 遍历完当前层所有的节点后 steps + 1
            steps += 1
        return ans
```

##### 不标记层

不带层的模板更简单，因此大家其实只需要掌握带层信息的目标就够了。

一个常见的 BFS 模板，代入题目只需要根据题目微调即可。

```python
class Solution:
    def bfs(k):
        # 使用双端队列，而不是数组。因为数组从头部删除元素的时间复杂度为 N，双端队列的底层实现其实是链表。
        queue = collections.deque([root])
        # 队列不空，生命不止！
        while queue:
            node = queue.popleft()
            # 由于没有记录 steps，因此我们肯定是不需要根据层的信息去判断的。否则就用带层的模板了。
            if (node 是我们要找到的) return node
            if node.right:
                queue.append(node.right)
            if node.left:
                queue.append(node.left)
        return -1


```

以上就是 BFS 的两种基本方式，即带层和不带层，具体使用哪种看题目是否需要根据层信息做判断即可。

### 小结

树的遍历是后面所有内容的基础，而树的遍历的两种方式 DFS 和 BFS 到这里就简单告一段落，现在大家只要知道 DFS 和 BFS 分别有两种常见的方式就够了，后面我会给大家详细补充。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkpw8vgshuj30ce0kqwgt.jpg)

## 三种题型

树的题目就三种类型，分别是：**搜索类，构建类和修改类，而这三类题型的比例也是逐渐降低的**，即搜索类的题目最多，其次是构建类，最后是修改类。这一点和链表有很大的不同，链表更多的是修改类。

接下来，lucifer 给大家逐一讲解这三种题型。

### 搜索类

搜索类的题目是树的题目的绝对大头。而搜索类只有两种解法，那就是 DFS 和 BFS，下面分别介绍。

几乎所有的搜索类题目都可以方便地使用递归来实现，关于递归的技巧会在**七个技巧中的单/双递归**部分讲解。还有一小部分使用递归不好实现，我们可以使用 BFS，借助队列轻松实现，比如最经典的是求二叉树任意两点的距离，树的距离其实就是最短距离，因此可以用 BFS 模板解决。这也是为啥我说**DFS 和 BFS**是树的题目的两个基本点的原因。

所有搜索类的题目只要把握三个核心点，即**开始点**，**结束点** 和 **目标**即可。

#### DFS 搜索

DFS 搜索类的基本套路就是从入口开始做 dfs，然后在 dfs 内部判断是否是结束点，这个结束点通常是**叶子节点**或**空节点**，关于结束这个话题我们放在**七个技巧中的边界**部分介绍，如果目标是一个基本值（比如数字）直接返回或者使用一个全局变量记录即可，如果是一个数组，则可以通过扩展参数的技巧来完成，关于扩展参数，会在**七个技巧中的参数扩展**部分介绍。 这基本就是搜索问题的全部了，当你读完后面的七个技巧，回头再回来看这个会更清晰。

套路模板：

```py
# 其中 path 是树的路径， 如果需要就带上，不需要就不带
def dfs(root, path):
    # 空节点
    if not root: return
    # 叶子节点
    if not root.left and not root.right: return
    path.append(root)
    # 逻辑可以写这里，此时是前序遍历
    dfs(root.left)
    dfs(root.right)
    # 需要弹出，不然会错误计算。
    # 比如对于如下树：
    """
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
    """
    # 如果不 pop，那么 5 -> 4 -> 11 -> 2 这条路径会变成 5 -> 4 -> 11 -> 7 -> 2，其 7 被错误地添加到了 path

    path.pop()
    # 逻辑也可以写这里，此时是后序遍历

    return 你想返回的数据

```

比如[剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/) 这道题，题目是：`输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。` 这不就是从根节点开始，到叶子节点结束的所有路径**搜索出来**，挑选出和为目标值的路径么？这里的开始点是根节点， 结束点是叶子节点，目标就是路径。

对于求这种满足**特定和**的题目，我们都可以方便地使用**前序遍历 + 参数扩展的形式**，关于这个，我会在**七个技巧中的前后序部分**展开。

> 由于需要找到所有的路径，而不仅仅是一条，因此这里适合使用回溯暴力枚举。关于回溯，可以参考我的 [回溯专题](https://github.com/azl397985856/leetcode/blob/master/thinkings/backtrack.md "回溯专题")

```py

class Solution:
    def pathSum(self, root: TreeNode, target: int) -> List[List[int]]:
        def backtrack(nodes, path, cur, remain):
            # 空节点
            if not cur: return
            # 叶子节点
            if cur and not cur.left and not cur.right:
                if remain == cur.val:
                    res.append((path + [cur.val]).copy())
                return
            # 选择
            path.append(cur.val)
            # 递归左右子树
            backtrack(nodes, path, cur.left, remain - cur.val)
            backtrack(nodes, path, cur.right, remain - cur.val)
            # 撤销选择
            path.pop(-1)
        ans = []
        # 入口，路径，目标值全部传进去，其中路径和path都是扩展的参数
        backtrack(ans, [], root, target)
        return ans


```

再比如：[1372. 二叉树中的最长交错路径](https://leetcode-cn.com/problems/longest-zigzag-path-in-a-binary-tree/)，题目描述：

```
给你一棵以 root 为根的二叉树，二叉树中的交错路径定义如下：

选择二叉树中 任意 节点和一个方向（左或者右）。
如果前进方向为右，那么移动到当前节点的的右子节点，否则移动到它的左子节点。
改变前进方向：左变右或者右变左。
重复第二步和第三步，直到你在树中无法继续移动。
交错路径的长度定义为：访问过的节点数目 - 1（单个节点的路径长度为 0 ）。

请你返回给定树中最长 交错路径 的长度。

比如：
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkpxakvvlwj30650anjrj.jpg)

```
此时需要返回 3
解释：蓝色节点为树中最长交错路径（右 -> 左 -> 右）。
```

这不就是从任意节点**开始**，到任意节点**结束**的所有交错**路径**全部**搜索出来**，挑选出最长的么？这里的开始点是树中的任意节点，结束点也是任意节点，目标就是最长的交错路径。

对于入口是任意节点的题目，我们都可以方便地使用**双递归**来完成，关于这个，我会在**七个技巧中的单/双递归部分**展开。

对于这种交错类的题目，一个好用的技巧是使用 -1 和 1 来记录方向，这样我们就可以通过乘以 -1 得到另外一个方向。

> [886. 可能的二分法](https://github.com/azl397985856/leetcode/blob/master/problems/886.possible-bipartition.md) 和 [785. 判断二分图](https://github.com/azl397985856/leetcode/blob/master/problems/785.is-graph-bipartite.md) 都用了这个技巧。

用代码表示就是：

```py
next_direction = cur_direction * - 1
```

这里我们使用双递归即可解决。 如果题目限定了只从根节点开始，那就可以用单递归解决了。值得注意的是，这里内部递归需要 cache 一下 ， 不然容易因为重复计算导致超时。

> 我的代码是 Python，这里的 lru_cache 就是一个缓存，大家可以使用自己语言的字典模拟实现。

```py
class Solution:
    @lru_cache(None)
    def dfs(self, root, dir):
        if not root:
            return 0
        if dir == -1:
            return int(root.left != None) + self.dfs(root.left, dir * -1)
        return int(root.right != None) + self.dfs(root.right, dir * -1)

    def longestZigZag(self, root: TreeNode) -> int:
        if not root:
            return 0
        return max(self.dfs(root, 1), self.dfs(root, -1), self.longestZigZag(root.left), self.longestZigZag(root.right))
```

这个代码不懂没关系，大家只有知道搜索类题目的大方向即可，具体做法我们后面会介绍，大家留个印象就行。更多的题目以及这些技巧的详细使用方式放在**七个技巧部分**展开。

#### BFS 搜索

这种类型相比 DFS，题目数量明显降低，套路也少很多。题目大多是求距离，套用我上面的两种 BFS 模板基本都可以轻松解决，这个不多介绍了。

### 构建类

除了搜索类，另外一个大头是构建类。构建类又分为两种：普通二叉树的构建和二叉搜索树的构建。

#### 普通二叉树的构建

而普通二叉树的构建又分为三种：

1. 给你两种 DFS 的遍历的结果数组，让你构建出原始的树结构。比如根据先序遍历和后序遍历的数组，构造原始二叉树。这种题我在[构造二叉树系列](https://lucifer.ren/blog/2020/02/08/%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%93%E9%A2%98/) 系列里讲的很清楚了，大家可以去看看。

> 这种题目假设输入的遍历的序列中都不含重复的数字，想想这是为什么。

2. 给你一个 BFS 的遍历的结果数组，让你构建出原始的树结构。

最经典的就是 [剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)。我们知道力扣的所有的树表示都是使用数字来表示的，而这个数组就是一棵树的层次遍历结果，部分叶子节点的子节点（空节点）也会被打印。比如：[1,2,3,null,null,4,5]，就表示的是如下的一颗二叉树：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkpyzzz9jrj30a20a8dge.jpg)

我们是如何根据这样的一个层次遍历结果构造出原始二叉树的呢？这其实就属于构造二叉树的内容，这个类型目前力扣就这一道题。这道题如果你彻底理解 BFS，那么就难不倒你。

3. 还有一种是给你描述一种场景，让你构造一个符合条件的二叉树。这种题和上面的没啥区别，套路简直不要太像，比如 [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)，我就不多说了，大家通过这道题练习一下就知道了。

除了这种静态构建，还有一种很很罕见的动态构建二叉树的，比如 [894. 所有可能的满二叉树](https://leetcode-cn.com/problems/complete-binary-tree-inserter/) ,对于这个题，直接 BFS 就好了。由于这种题很少，因此不做多的介绍。大家只要把最核心的掌握了，这种东西自然水到渠成。

#### 二叉搜索树的构建

普通二叉树无法根据一种序列重构的原因是只知道根节点，无法区分左右子树。如果是二叉搜索树，那么就有可能根据**一种遍历序列**构造出来。 原因就在于二叉搜索树的根节点的值大于所有的左子树的值，且小于所有的右子树的值。因此我们可以根据这一特性去确定左右子树的位置，经过这样的转换就和上面的普通二叉树没有啥区别了。比如 [1008. 前序遍历构造二叉搜索树](https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/)

### 修改类

上面介绍了两种常见的题型：搜索类和构建类。还有一种比例相对比较小的题目类型是修改类。

> 当然修改类的题目也是要基于搜索算法的，不找到目标怎么删呢？

修改类的题目有两种基本类型。

#### 题目要求的修改

一种是题目让你增加，删除节点，或者是修改节点的值或者指向。

修改指针的题目一般不难，比如 [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)，这不就是 BFS 的时候顺便记录一下上一次访问的同层节点，然后增加一个指针不就行了么？关于 BFS ，套用我的**带层的 BFS 模板**就搞定了。

增加和删除的题目一般稍微复杂，比如 [450. 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/) 和 [669. 修剪二叉搜索树](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)。西法我教你两个套路，面对这种问题就不带怕的。那就是**后续遍历 + 虚拟节点**，这两个技巧同样放在后面的七个技巧部分讲解。是不是对七个技巧很期待？^\_^

> 实际工程中，我们也可以不删除节点，而是给节点做一个标记，表示已经被删除了，这叫做软删除。

#### 算法需要，自己修改

另外一种是为了方便计算，自己加了一个指针。

比如 [863. 二叉树中所有距离为 K 的结点](https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/) 通过修改树的节点类，增加一个指向父节点的引用 parent，问题就转化为距离目标节点一定距离的问题了，此时可是用我上面讲的**带层的 BFS 模板**解决。

动态语言可以直接加属性（比如上面的 parent），而静态语言是不允许的，因此你需要增加一个新的类定义。不过你也可以使用字典来实现， key 是 node 引用， value 是你想记录的东西，比如这里的 parent 节点。

比如对于 Java 来说，我们可以：

```java
class Solution {
    Map<TreeNode, TreeNode> parent;
    public void dfs(TreeNode node, TreeNode parent) {
        if (node != null) {
            parent.put(node, parent);
            dfs(node.left, node);
            dfs(node.right, node);
        }
    }
}
```

简单回顾一下这一小节的知识。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkq1lml9dej30fw0fw40e.jpg)

接下来是做树的题目不得不知的四个重要概念。

## 四个重要概念

### 二叉搜索树

二叉搜索树（Binary Search Tree），亦称二叉查找树。

二叉搜索树具有下列性质的二叉树：

- 若左子树不空，则左子树上所有节点的值均小于它的根节点的值；
- 若右子树不空，则右子树上所有节点的值均大于它的根节点的值；
- 左、右子树也分别为二叉排序树；
- 没有键值相等的节点。

对于一个二叉查找树，常规操作有`插入，查找，删除，找父节点，求最大值，求最小值。`

#### 天生适合查找

二叉查找树，之所以叫查找树就是因为其非常适合查找。

举个例子，如下一颗二叉查找树，我们想找节点值小于且最接近 58 的节点，搜索的流程如图所示：

![bst](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluh33ttoj30rs0mudhi.jpg)
（图片来自 https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/）

可以看出每次向下走，都会排除了一个分支，如果一颗二叉搜索树同时也是一颗二叉平衡树的话，那么其搜索过程时间复杂度就是 $$O(logN)$$。实际上，**平衡二叉搜索树的查找和有序数组的二分查找本质都是一样的，只是数据的存储方式不同罢了**。那为什么有了有序数组二分，还需要二叉搜索树呢？原因在于树的结构对于动态数据比较友好，比如数据是频繁变动的，比如经常添加和删除，那么就可以使用二叉搜索树。理论上添加和删除的时间复杂度都是 $$O(h)$$，其中 h 为树的高度，如果是一颗平衡二叉搜索树，那么时间复杂度就是 $$O(logN)$$。而数组的添加和删除的时间复杂度为 $$O(N)$$，其中 N 为数组长度。

**方便搜索，是二叉搜索树核心的设计初衷。不让查找算法时间复杂度退化到线性是平衡二叉树的初衷**。

我们平时说的二分很多是数组的二分，因为数组可以随机访问嘛。不过这种二分实在太狭义了，二分的本质是将问题规模缩小到一半，因此二分和数据结构没有本质关系，但是不同的数据结构却给二分赋予了不同的色彩。比如跳表就是链表的二分，二叉搜索树就是树的二分等。随着大家对算法和数据结构的了解的加深，会发现更多有意思的东西^\_^

#### 中序遍历是有序的

另外二叉查找树有一个性质，这个性质对于做题很多帮助，那就是： **二叉搜索树的中序遍历的结果是一个有序数组**。 比如 [98. 验证二叉搜索树](https://github.com/azl397985856/leetcode/blob/master/problems/98.validate-binary-search-tree.md) 就可以直接中序遍历，并**一边遍历一边判断遍历结果是否是单调递增的**，如果不是则提前返回 False 即可。

再比如 [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)，官方难度为困难。题目大意是`给你二叉搜索树的根节点 root ，该树中的两个节点被错误地交换。请在不改变其结构的情况下，恢复这棵树。` 我们可以先中序遍历发现不是递增的节点，他们就是被错误交换的节点，然后交换恢复即可。这道题难点就在于一点，即错误交换可能错误交换了中序遍历的相邻节点或者中序遍历的非相邻节点，这是两种 case，需要分别讨论。

类似的题目很多，不再赘述。大家如果**碰到二叉搜索树的搜索类题目，一定先想下能不能利用这个性质来做。**

### 完全二叉树

一棵深度为 k 的有 n 个结点的二叉树，对树中的结点按从上至下、从左到右的顺序进行编号，如果编号为 i（1≤i≤n）的结点与满二叉树中编号为 i 的结点在二叉树中的位置相同，则这棵二叉树称为完全二叉树。

如下就是一颗完全二叉树：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqbvfgqj7j307g042wei.jpg)

直接考察完全二叉树的题目虽然不多，貌似只有一道 [222. 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)（二分可解），但是理解完全二叉树对你做题其实帮助很大。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkq92qmj8yj313g0p0mz4.jpg)

如上图，是一颗普通的二叉树。如果我将其中的空节点补充完全，那么它就是一颗完全二叉树了。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkq93usnp2j316m0p40vh.jpg)

这有什么用呢？这很有用！我总结了两个用处：

1. 我们可以给完全二叉树编号，这样父子之间就可以通过编号轻松求出。比如我给所有节点从左到右从上到下依次从 1 开始编号。那么已知一个节点的编号是 i，那么其左子节点就是 2 _ i，右子节点就是 2 _ 1 + 1，父节点就是 (i + 1) / 2。

熟悉二叉堆的同学可能发现了，这就是用数组实现的二叉堆，其实**二叉堆就是完全二叉树的一个应用**。

有的同学会说，”但是很多题目都不是完全二叉树呀，那不是用不上了么？“其实不然，我们只要想象它存在即可，我们将空节点脑补上去不就可以了？比如 [662. 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/)。题目描述：

```
给定一个二叉树，编写一个函数来获取这个树的最大宽度。树的宽度是所有层中的最大宽度。这个二叉树与满二叉树（full binary tree）结构相同，但一些节点为空。

每一层的宽度被定义为两个端点（该层最左和最右的非空节点，两端点间的null节点也计入长度）之间的长度。

示例 1:

输入:

           1
         /   \
        3     2
       / \     \
      5   3     9

输出: 4
解释: 最大值出现在树的第 3 层，宽度为 4 (5,3,null,9)。

```

很简单，一个带层的 BFS 模板即可搞定，简直就是默写题。不过这里需要注意两点：

- 入队的时候除了要将普通节点入队，还要空节点入队。
- 出队的时候除了入队节点本身，还要将节点的位置信息入队，即下方代码的 pos。

参考代码：

```py
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def widthOfBinaryTree(self, root: TreeNode) -> int:
        q = collections.deque([(root, 0)])
        steps = 0
        cur_depth = leftmost = ans = 0

        while q:
            for _ in range(len(q)):
                node, pos = q.popleft()
                if node:
                    # 节点编号关关系是不是用上了？
                    q.append((node.left, pos * 2))
                    q.append((node.right, pos * 2 + 1))
                    # 逻辑开始
                    if cur_depth != steps:
                        cur_depth = steps
                        leftmost = pos
                    ans = max(ans, pos - leftmost + 1)
                    # 逻辑结束
            steps += 1
        return ans
```

再比如[剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)。如果我将一个二叉树的完全二叉树形式序列化，然后通过 BFS 反序列化，这不就是力扣官方序列化树的方式么？比如：

```
    1
   / \
  2   3
     / \
    4   5
```

序列化为 "[1,2,3,null,null,4,5]"。 这不就是我刚刚画的完全二叉树么？就是将一个普通的二叉树硬生生当成完全二叉树用了。

> 其实这并不是序列化成了完全二叉树，下面会纠正。

将一颗普通树序列化为完全二叉树很简单，只要将空节点当成普通节点入队处理即可。代码：

```py
class Codec:

    def serialize(self, root):
        q = collections.deque([root])
        ans = ''
        while q:
            cur = q.popleft()
            if cur:
                ans += str(cur.val) + ','
                q.append(cur.left)
                q.append(cur.right)
            else:
                # 除了这里不一样，其他和普通的不记录层的 BFS 没区别
                ans += 'null,'
        # 末尾会多一个逗号，我们去掉它。
        return ans[:-1]
```

细心的同学可能会发现，我上面的代码其实并不是将树序列化成了完全二叉树，这个我们稍后就会讲到。另外后面多余的空节点也一并序列化了。这其实是可以优化的，优化的方式也很简单，那就是去除末尾的 null 即可。

你只要彻底理解我刚才讲的`我们可以给完全二叉树编号，这样父子之间就可以通过编号轻松求出。比如我给所有节点从左到右从上到下依次从 1 开始编号。那么已知一个节点的编号是 i，那么其左子节点就是 2 * i，右子节点就是 2 * 1 + 1，父节点就是 (i + 1) / 2。` 这句话，那么反序列化对你就不是难事。

如果我用一个箭头表示节点的父子关系，箭头指向节点的两个子节点，那么大概是这样的：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqb8mcsv7j31z60sggrm.jpg)

我们刚才提到了：

- 1 号节点的两个子节点的 2 号 和 3 号。
- 2 号节点的两个子节点的 4 号 和 5 号。
- 。。。
- i 号节点的两个子节点的 `2 * i` 号 和 `2 * 1 + 1` 号。

此时你可能会写出类似这样的代码：

```py
    def deserialize(self, data):
        if data == 'null': return None
        nodes = data.split(',')
        root = TreeNode(nodes[0])
        # 从一号开始编号，编号信息一起入队
        q = collections.deque([(root, 1)])
        while q:
            cur, i = q.popleft()
            # 2 * i 是左节点，而 2 * i 编号对应的其实是索引为 2 * i - 1 的元素， 右节点同理。
            if 2 * i - 1 < len(nodes): lv = nodes[2 * i - 1]
            if 2 * i < len(nodes): rv = nodes[2 * i]
            if lv != 'null':
                l = TreeNode(lv)
                # 将左节点和 它的编号 2 * i 入队
                q.append((l, 2 * i))
                cur.left = l
            if rv != 'null':
                r = TreeNode(rv)
                # 将右节点和 它的编号 2 * i + 1 入队
                q.append((r, 2 * i + 1))
                cur.right = r

        return root
```

但是上面的代码是不对的，因为我们序列化的时候其实不是完全二叉树，这也是上面我埋下的伏笔。因此遇到类似这样的 case 就会挂：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqcfujvv4j315s0u078j.jpg)

这也是我前面说”上面代码的序列化并不是一颗完全二叉树“的原因。

其实这个很好解决， 核心还是上面我画的那种图：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqb8mcsv7j31z60sggrm.jpg)

其实我们可以：

- 用三个指针分别指向数组第一项，第二项和第三项（如果存在的话），这里用 p1，p2，p3 来标记，分别表示当前处理的节点，当前处理的节点的左子节点和当前处理的节点的右子节点。
- p1 每次移动一位，p2 和 p3 每次移动两位。
- p1.left = p2; p1.right = p3。
- 持续上面的步骤直到 p1 移动到最后。

因此代码就不难写出了。反序列化代码如下：

```py
def deserialize(self, data):
    if data == 'null': return None
    nodes = data.split(',')
    root = TreeNode(nodes[0])
    q = collections.deque([root])
    i = 0
    while q and i < len(nodes) - 2:
        cur = q.popleft()
        lv = nodes[i + 1]
        rv = nodes[i + 2]
        i += 2
        if lv != 'null':
            l = TreeNode(lv)
            q.append(l)
            cur.left = l
        if rv != 'null':
            r = TreeNode(rv)
            q.append(r)
            cur.right = r

    return root
```

这个题目虽然并不是完全二叉树的题目，但是却和完全二叉树很像，有借鉴完全二叉树的地方。

### 路径

关于路径这个概念，leetcode 真的挺喜欢考察的，不信你自己去 leetcode 官网搜索一下路径，看有多少题。树的路径这种题目的变种很多，算是一种经典的考点了。

要明白路径的概念，以及如何解决这种题，只需要看一个题目就好了 [124.二叉树中的最大路径和](https://github.com/azl397985856/leetcode/blob/master/problems/124.binary-tree-maximum-path-sum.md)，虽然是困难难度，但是搞清楚概念的话，和简单难度没啥区别。 接下来，我们就以这道题讲解一下。

这道题的题目是 `给定一个非空二叉树，返回其最大路径和`。路径的概念是：`一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。`这听起来真的不容易理解，力扣给的 demo 我也没搞懂，这里我自己画了几个图来给大家解释一下这个概念。

首先是官网给的两个例子：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqsytwibqj30kh07pgm8.jpg)

接着是我自己画的一个例子：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkqsz5bhtqj30hu0cd3zk.jpg)

如图红色的部分是最大路径上的节点。

可以看出：

- 路径可以由一个节点做成，可以由两个节点组成，也可以由三个节点组成等等，但是必须连续。
- 路径必须是”直来直去“的，不能有分叉。 比如上图的路径的左下角是 3，当然也可以是 2，但是 2 比较小。但是不可以 2 和 3 同时选。


我们继续回到 124 题。题目说是 ”从任意节点出发.......“ 看完这个描述我会想到大概率是要么全局记录最大值，要么双递归。

- 如果使用双递归，那么复杂度就是 $$O(N^2)$$，实际上，子树的路径和计算出来了，可以推导出父节点的最大路径和，因此如果使用双递归会有重复计算。一个可行的方式是记忆化递归。
- 如果使用全局记录最大值，只需要在递归的时候 return 当前的一条边（上面提了不能拐），并在函数内部计算以当前节点出发的最大路径和，并更新全局最大值即可。 这里的核心其实是 return 较大的一条边，因为较小的边不可能是答案。

这里我选择使用第二种方法。

代码：

```py
class Solution:
    ans = float('-inf')
    def maxPathSum(self, root: TreeNode) -> int:
        def dfs(node):
            if not node: return 0
            l = dfs(node.left)
            r = dfs(node.right)
            # 选择当前的节点，并选择左右两边，当然左右两边也可以不选。必要时更新全局最大值
            self.ans = max(self.ans, max(l,0) + max(r, 0) + node.val)
            # 只返回一边，因此我们挑大的返回。当然左右两边也可以不选
            return max(l, r, 0) + node.val
        dfs(root)
        return self.ans
```

> 类似题目 [113. 路径总和 I](https://github.com/azl397985856/leetcode/blob/master/problems/113.path-sum-ii.md "113. 路径总和 I")

### 距离

和路径类似，距离也是一个相似且频繁出现的一个考点，并且二者都是搜索类题目的考点。原因就在于最短路径就是距离，而树的最短路径就是边的数目。

这两个题练习一下，碰到距离的题目基本就稳了。

- [834.树中距离之和](https://leetcode-cn.com/problems/sum-of-distances-in-tree/description/)
- [863.二叉树中所有距离为 K 的结点](https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/description/)

## 七个技巧

上面数次提到了七个技巧，相信大家已经迫不及待想要看看这七个技巧了吧。那就让我拿出本章压箱底的内容吧~

> 注意，这七个技巧全部是基于 dfs 的，bfs 掌握了模板就行，基本没有什么技巧可言。

认真学习的小伙伴可以发现了， 上面的内容只有**二叉树的迭代写法（双色标记法）** 和 **两个 BFS 模板** 具有实操性，其他大多是战略思想上的。算法思想固然重要，但是要结合具体实践落地才能有实践价值，才能让我们把知识消化成自己的。而这一节满满的全是实用干货ヽ(￣ ω ￣(￣ ω ￣〃)ゝ。

### dfs(root)

第一个技巧，也是最容易掌握的一个技巧。我们写力扣的树题目的时候，函数的入参全都是叫 root。而这个技巧是说，我们在写 dfs 函数的时候，要将函数中表示当前节点的形参**也**写成 root。即：

```py
def dfs(root):
    # your code
```

而之前我一直习惯写成 node，即：

```py
def dfs(node):
    # your code
```

可能有的同学想问：” 这有什么关系么？“。我总结了两个原因。

第一个原因是：以前 dfs 的形参写的是 node， 而我经常误写成 root，导致出错（这个错误并不会抛错，因此不是特别容易发现）。自从换成了 root 就没有发生这样的问题了。

第二个原因是：这样写相当于把 root 当成是 current 指针来用了。最开始 current 指针指向 root，然后不断修改指向树的其它节点。这样就概念就简化了，只有一个当前指针的概念。如果使用 node，就是当前指针 + root 指针两个概念了。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkurtwpr6lj30bl0aowey.jpg)

（一开始 current 就是 root）

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkurvb2pwbj30ap0b8aaj.jpg)

（后面 current 不断改变。具体如何改变，取决于你的搜索算法，是 dfs 还是 bfs 等）

### 单/双递归

上面的技巧稍显简单，但是却有用。这里介绍一个稍微难一点的技巧，也更加有用。

我们知道递归是一个很有用的编程技巧，灵活使用递归，可以使自己的代码更加简洁，简洁意味着代码不容易出错，即使出错了，也能及时发现问题并修复。

树的题目大多数都可以用递归轻松地解决。**如果一个递归不行，那么来两个。（至今没见过三递归或更多递归）**

单递归大家写的比较多了，其实本篇文章的大部分递归都是单递归。 那什么时候需要两个递归呢？其实我上面已经提到了，那就是**如果题目有类似，任意节点开始 xxxx 或者所有 xxx**这样的说法，就可以考虑使用双递归。但是如果递归中有重复计算，则可以使用双递归 + 记忆化 或者直接单递归。

比如 [面试题 04.12. 求和路径](https://leetcode-cn.com/problems/paths-with-sum-lcci/)，再比如 [563.二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/description/) 这两道题的题目说法都可以考虑使用双递归求解。

双递归的基本套路就是一个主递归函数和一个内部递归函数。主递归函数负责计算以某一个节点开始的 xxxx，内部递归函数负责计算 xxxx，这样就实现了以**所有节点开始的 xxxx**。

> 其中 xxx 可以替换成任何题目描述，比如路径和等

一个典型的加法双递归是这样的：

```py
def dfs_inner(root):
    # 这里写你的逻辑，就是前序遍历
    dfs_inner(root.left)
    dfs_inner(root.right)
    # 或者在这里写你的逻辑，那就是后序遍历
def dfs_main(root):
    return dfs_inner(root) + dfs_main(root.left) + dfs_main(root.right)
```

大家可以用我的模板去套一下上面两道题试试。

### 前后遍历

前面我的链表专题也提到了前后序遍历。由于链表只有一个 next 指针，因此只有两种遍历。而二叉树有两个指针，因此常见的遍历有三个，除了前后序，还有一个中序。而中序除了二叉搜索树，其他地方用的并不多。

和链表一样， 要掌握树的前后序，也只需要记住一句话就好了。那就是**如果是前序遍历，那么你可以想象上面的节点都处理好了，怎么处理的不用管**。相应地**如果是后序遍历，那么你可以想象下面的树都处理好了，怎么处理的不用管**。这句话的正确性也是毋庸置疑。

前后序对链表来说比较直观。对于树来说，其实更形象地说应该是自顶向下或者自底向上。自顶向下和自底向上在算法上是不同的，不同的写法有时候对应不同的书写难度。比如 [https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)，这种题目就适合通过参数扩展 + 前序来完成。

> 关于参数扩展的技巧，我们在后面展开。

- **自顶向下**就是在每个递归层级，首先访问节点来计算一些值，并在递归调用函数时将这些值传递到子节点，一般是**通过参数传到子树**中。

- **自底向上**是另一种常见的递归方法，首先对所有子节点递归地调用函数，然后根据**返回值**和**根节点本身**的值得到答案。

关于前后序的思维技巧，可以参考我的[这个文章](https://lucifer.ren/blog/2020/11/08/linked-list/ "几乎刷完了力扣所有的链表题，我发现了这些东西。。。") 的**前后序部分**。

总结下我的经验：

- 大多数树的题使用后序遍历比较简单，并且大多需要依赖左右子树的返回值。比如 [1448. 统计二叉树中好节点的数目](https://leetcode-cn.com/problems/count-good-nodes-in-binary-tree/)
- 不多的问题需要前序遍历，而前序遍历通常要结合参数扩展技巧。比如 [1022. 从根到叶的二进制数之和](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/)
- 如果你能使用参数和节点本身的值来决定什么应该是传递给它子节点的参数，那就用前序遍历。
- 如果对于树中的任意一个节点，如果你知道它子节点的答案，你能计算出当前节点的答案，那就用后序遍历。
- 如果遇到二叉搜索树则考虑中序遍历

### 虚拟节点

是的！不仅仅链表有虚拟节点的技巧，树也是一样。关于这点大家可能比较容易忽视。

回忆一下链表的虚拟指针的技巧，我们通常在什么时候才会使用？

- 其中一种情况是`链表的头会被修改`。这个时候通常需要一个虚拟指针来做新的头指针，这样就不需要考虑第一个指针的问题了（因为此时第一个指针变成了我们的虚拟指针，而虚拟指针是不用参与题目运算的）。树也是一样，当你需要对树的头节点（在树中我们称之为根节点）进行修改的时候， 就可以考虑使用虚拟指针的技巧了。
- 另外一种是题目需要返回树中间的某个节点（不是返回根节点）。实际上也可借助虚拟节点。由于我上面提到的指针的操作，实际上，你可以新建一个虚拟头，然后让虚拟头在恰当的时候（刚好指向需要返回的节点）断开连接，这样我们就可以返回虚拟头的 next 就 ok 了。

更多关于虚拟指针的技巧可以参考[这个文章](https://lucifer.ren/blog/2020/11/08/linked-list/ "几乎刷完了力扣所有的链表题，我发现了这些东西。。。") 的**虚拟头部分**。

下面就力扣中的两道题来看一下。

#### 【题目一】814. 二叉树剪枝

题目描述：

```
给定二叉树根结点 root ，此外树的每个结点的值要么是 0，要么是 1。

返回移除了所有不包含 1 的子树的原二叉树。

( 节点 X 的子树为 X 本身，以及所有 X 的后代。)

示例1:
输入: [1,null,0,0,1]
输出: [1,null,0,null,1]

解释:
只有红色节点满足条件“所有不包含 1 的子树”。
右图为返回的答案。
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkuovucp7nj30z809v74w.jpg)

```


示例2:
输入: [1,0,1,0,0,0,1]
输出: [1,null,1,null,1]
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkuovzkq1bj316t09v3ze.jpg)

```
示例3:
输入: [1,1,0,1,1,0,1,0]
输出: [1,1,0,1,1,null,1]
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkuowgc9oaj319w0ccjsm.jpg)

```
说明:

给定的二叉树最多有 100 个节点。
每个节点的值只会为 0 或 1 。
```

根据题目描述不难看出， 我们的根节点可能会被整个移除掉。这就是我上面说的`根节点被修改`的情况。 这个时候，我们只要新建一个虚拟节点当做新的根节点，就不需要考虑这个问题了。

此时的代码是这样的：

```js
var pruneTree = function (root) {
  function dfs(root) {
    // do something
  }
  ans = new TreeNode(-1);
  ans.left = root;
  dfs(ans);
  return ans.left;
};
```

接下来，只需要完善 dfs 框架即可。 dfs 框架也很容易，我们只需要将子树和为 0 的节点移除即可，而计算子树和是一个难度为 easy 的题目，只需要后序遍历一次并收集值即可。

计算子树和的代码如下:

```js
function dfs(root) {
  if (!root) return 0;
  const l = dfs(root.left);
  const r = dfs(root.right);
  return root.val + l + r;
}
```

有了上面的铺垫，最终代码就不难写出了。

完整代码(JS)：

```js
var pruneTree = function (root) {
  function dfs(root) {
    if (!root) return 0;
    const l = dfs(root.left);
    const r = dfs(root.right);
    if (l == 0) root.left = null;
    if (r == 0) root.right = null;
    return root.val + l + r;
  }
  ans = new TreeNode(-1);
  ans.left = root;
  dfs(ans);
  return ans.left;
};
```

#### 【题目一】1325. 删除给定值的叶子节点

题目描述：

```
给你一棵以 root 为根的二叉树和一个整数 target ，请你删除所有值为 target 的 叶子节点 。

注意，一旦删除值为 target 的叶子节点，它的父节点就可能变成叶子节点；如果新叶子节点的值恰好也是 target ，那么这个节点也应该被删除。

也就是说，你需要重复此过程直到不能继续删除。

 

示例 1：
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkup76wi89j30s706b0t7.jpg)

```


输入：root = [1,2,3,2,null,2,4], target = 2
输出：[1,null,3,null,4]
解释：
上面左边的图中，绿色节点为叶子节点，且它们的值与 target 相同（同为 2 ），它们会被删除，得到中间的图。
有一个新的节点变成了叶子节点且它的值与 target 相同，所以将再次进行删除，从而得到最右边的图。
示例 2：
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkup80cyszj30gc06bmxd.jpg)

```


输入：root = [1,3,3,3,2], target = 3
输出：[1,3,null,null,2]
示例 3：
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkup89sd5vj30k406o3yr.jpg)

```


输入：root = [1,2,null,2,null,2], target = 2
输出：[1]
解释：每一步都删除一个绿色的叶子节点（值为 2）。
示例 4：

输入：root = [1,1,1], target = 1
输出：[]
示例 5：

输入：root = [1,2,3], target = 1
输出：[1,2,3]
 

提示：

1 <= target <= 1000
每一棵树最多有 3000 个节点。
每一个节点值的范围是 [1, 1000] 。


```

和上面题目类似，这道题的根节点也可能被删除，因此这里我们采取和上面题目类似的技巧。

由于题目说明了**一旦删除值为  target  的叶子节点，它的父节点就可能变成叶子节点；如果新叶子节点的值恰好也是  target ，那么这个节点也应该被删除。也就是说，你需要重复此过程直到不能继续删除。** 因此这里使用后序遍历会比较容易，因为形象地看上面的描述过程你会发现这是一个自底向上的过程，而自底向上通常用后序遍历。

上面的题目，我们可以根据子节点的返回值决定是否删除子节点。而这道题是根据左右子树是否为空，删除**自己**，关键字是自己。而树的删除和链表删除类似，树的删除需要父节点，因此这里的技巧和链表类似，记录一下当前节点的父节点即可，并通过**参数扩展**向下传递。至此，我们的代码大概是：

```py
class Solution:
    def removeLeafNodes(self, root: TreeNode, target: int) -> TreeNode:
        # 单链表只有一个 next 指针，而二叉树有两个指针 left 和 right，因此要记录一下当前节点是其父节点的哪个孩子
        def dfs(node, parent, is_left=True):
            # do something
        ans = TreeNode(-1)
        ans.left = root
        dfs(root, ans)
        return ans.left
```

有了上面的铺垫，最终代码就不难写出了。

完整代码（Python）:

```py
class Solution:
    def removeLeafNodes(self, root: TreeNode, target: int) -> TreeNode:
        def dfs(node, parent, is_left=True):
            if not node: return
            dfs(node.left, node, True)
            dfs(node.right, node, False)
            if node.val == target and parent and not node.left and not node.right:
                if is_left: parent.left = None
                else: parent.right = None
        ans = TreeNode(-1)
        ans.left = root
        dfs(root, ans)
        return ans.left
```

### 边界

发现自己老是边界考虑不到，首先要知道这是正常的，人类的本能。 大家要克服这种本能， 只有多做，慢慢就能克服。 就像改一个坏习惯一样，除了坚持，一个有用的技巧是奖励和惩罚，我也用过这个技巧。

上面我介绍了树的三种题型。对于不同的题型其实边界考虑的侧重点也是不一样的，下面我们展开聊聊。

#### 搜索类

搜索类的题目，树的边界其实比较简单。 90% 以上的题目边界就两种情况。

> 树的题目绝大多树又是搜索类，你想想掌握这两种情况多重要。

1. 空节点

伪代码：

```py
def dfs(root):
    if not root: print('是空节点，你需要返回合适的值')
    # your code here`
```

2. 叶子节点

伪代码：

```py
def dfs(root):
    if not root: print('是空节点，你需要返回合适的值')
    if not root.left and not root.right: print('是叶子节点，你需要返回合适的值')
# your code here`
```

一张图总结一下：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkye36obl1j310k0pe0wg.jpg)

经过这样的处理，后面的代码基本都不需要判空了。

#### 构建类

相比于搜索类， 构建就比较麻烦了。我总结了两个常见的边界。

1. 参数扩展的边界

比如 1008 题， 根据前序遍历构造二叉搜索树。我就少考虑的边界。

```py
def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
    def dfs(start, end):
        if start > end:
            return None
        if start == end:
            return TreeNode(preorder[start])
        root = TreeNode(preorder[start])
        mid = -1
        for i in range(start + 1, end + 1):
            if preorder[i] > preorder[start]:
                mid = i
                break
        if mid == -1:
            root.left = dfs(start + 1, end) 
        else:
            root.left = dfs(start + 1, mid - 1)
            root.right = dfs(mid, end)
        return root

    return dfs(0, len(preorder) - 1)
```

注意上面的代码没有判断 start == end 的情况，加下面这个判断就好了。

```py
if start == end: return TreeNode(preorder[start])
```

2. 虚拟节点

除了搜索类的技巧可以用于构建类外，也可以考虑用我上面的讲的虚拟节点。

### 参数扩展大法

参数扩展这个技巧非常好用，一旦掌握你会爱不释手。

如果不考虑参数扩展， 一个最简单的 dfs 通常是下面这样：

```py
def dfs(root):
    # do something
```

而有时候，我们需要 dfs 携带更多的有用信息。典型的有以下三种情况：

1. 携带父亲或者爷爷的信息。

```py
def dfs(root, parent):
    if not root: return
    dfs(root.left, root)
    dfs(root.right, root)

```

2. 携带路径信息，可以是路径和或者具体的路径数组等。

路径和：

```py
def dfs(root, path_sum):
    if not root:
        # 这里可以拿到根到叶子的路径和
        return path_sum
    dfs(root.left, path_sum + root.val)
    dfs(root.right, path_sum + root.val)
```

路径：

```py
def dfs(root, path):
    if not root:
        # 这里可以拿到根到叶子的路径
        return path
    path.append(root.val)
    dfs(root.left, path)
    dfs(root.right, path)
    # 撤销
    path.pop()

```

学会了这个技巧，大家可以用 [面试题 04.12. 求和路径](https://leetcode-cn.com/problems/paths-with-sum-lcci/) 来练练手。

以上几个模板都很常见，类似的场景还有很多。总之当你需要传递额外信息给子节点（关键字是子节点）的时候，请务必掌握这种技巧。这也解释了为啥参数扩展经常用于前序遍历。

3. 二叉搜索树的搜索题大多数都需要扩展参考，甚至怎么扩展都是固定的。

二叉搜索树的搜索总是将最大值和最小值通过参数传递到左右子树，类似 `dfs(root, lower, upper)`，然后在递归过程更新最大和最小值即可。这里需要注意的是 (lower, upper) 是的一个左右都开放的区间。

比如有一个题[783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)是求二叉搜索树的最小差值的绝对值。当然这道题也可以用我们前面提到的**二叉搜索树的中序遍历的结果是一个有序数组**这个性质来做。只需要一次遍历，最小差一定出现在相邻的两个节点之间。

这里我用另外一种方法，该方法就是扩展参数大法中的 左右边界法。

```py
class Solution:
def minDiffInBST(self, root):
    def dfs(node, lower, upper):
        if not node:
            return upper - lower
        left = dfs(node.left, lower, node.val)
        right = dfs(node.right, node.val, upper)
        # 要么在左，要么在右，不可能横跨（因为是 BST）
        return min(left, right)
    return dfs(root, float('-inf'), float('inf')
```

其实这个技巧不仅适用二叉搜索树，也可是适用在别的树，比如 [1026. 节点与其祖先之间的最大差值](https://leetcode-cn.com/problems/maximum-difference-between-node-and-ancestor/),题目大意是：给定二叉树的根节点  root，找出存在于 不同 节点  A 和  B  之间的最大值 V，其中  V = |A.val - B.val|，且  A  是  B  的祖先。

使用类似上面的套路轻松求解。

```py
class Solution:
def maxAncestorDiff(self, root: TreeNode) -> int:
    def dfs(root, lower, upper):
        if not root:
            return upper - lower
        # 要么在左，要么在右，要么横跨。
        return max(dfs(root.left, min(root.val, lower), max(root.val, upper)), dfs(root.right, min(root.val, lower), max(root.val, upper)))
    return dfs(root, float('inf'), float('-inf'))
```

### 返回元组/列表

通常，我们的 dfs 函数的返回值是一个单值。而有时候为了方便计算，我们会返回一个数组或者元祖。

> 对于个数固定情况，我们一般使用元组，当然返回数组也是一样的。

**这个技巧和参数扩展有异曲同工之妙，只不过一个作用于函数参数，一个作用于函数返回值。**

#### 返回元祖

返回元组的情况还算比较常见。比如 [865. 具有所有最深节点的最小子树](https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/)，一个简单的想法是 dfs 返回深度，我们通过比较左右子树的深度来定位答案（最深的节点位置）。

代码：

```py
class Solution:
    def subtreeWithAllDeepest(self, root: TreeNode) -> int:
        def dfs(node, d):
            if not node: return d
            l_d = dfs(node.left, d + 1)
            r_d = dfs(node.right, d + 1)
            if l_d >= r_d: return l_d
            return r_d
        return dfs(root, -1)
```

但是题目要求返回的是树节点的引用啊，这个时候应该考虑返回元祖，即**除了返回深度，也要把节点给返回**。

```py
class Solution:
    def subtreeWithAllDeepest(self, root: TreeNode) -> TreeNode:
        def dfs(node, d):
            if not node: return (node, d)
            l, l_d = dfs(node.left, d + 1)
            r, r_d = dfs(node.right, d + 1)
            if l_d == r_d: return (node, l_d)
            if l_d > r_d: return (l, l_d)
            return (r, r_d)
        return dfs(root, -1)[0]
```

#### 返回数组

dfs 返回数组比较少见。即使题目要求返回数组，我们也通常是声明一个数组，在 dfs 过程不断 push，最终返回这个数组。而不会选择返回一个数组。绝大多数情况下，返回数组是用于计算笛卡尔积。因此你需要用到笛卡尔积的时候，考虑使用返回数组的方式。

> 一般来说，如果需要使用笛卡尔积的情况还是比较容易看出的。另外一个不太准确的技巧是，如果题目有”所有可能“，”所有情况“，可以考虑使用此技巧。

一个典型的题目是 [1530.好叶子节点对的数量](https://leetcode-cn.com/problems/number-of-good-leaf-nodes-pairs/description/)

题目描述：

```
给你二叉树的根节点 root 和一个整数 distance 。

如果二叉树中两个叶节点之间的 最短路径长度 小于或者等于 distance ，那它们就可以构成一组 好叶子节点对 。

返回树中 好叶子节点对的数量 。

 

示例 1：
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkuq5u4zclj308x08xq33.jpg)

```
 



输入：root = [1,2,3,null,4], distance = 3
输出：1
解释：树的叶节点是 3 和 4 ，它们之间的最短路径的长度是 3 。这是唯一的好叶子节点对。
示例 2：
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkuq63va2gj30c908xjrr.jpg)

```

输入：root = [1,2,3,4,5,6,7], distance = 3
输出：2
解释：好叶子节点对为 [4,5] 和 [6,7] ，最短路径长度都是 2 。但是叶子节点对 [4,6] 不满足要求，因为它们之间的最短路径长度为 4 。
示例 3：

输入：root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
输出：1
解释：唯一的好叶子节点对是 [2,5] 。
示例 4：

输入：root = [100], distance = 1
输出：0
示例 5：

输入：root = [1,1,1], distance = 2
输出：1
 

提示：

tree 的节点数在 [1, 2^10] 范围内。
每个节点的值都在 [1, 100] 之间。
1 <= distance <= 10

```

上面我们学习了路径的概念，在这道题又用上了。

其实两个叶子节点的最短路径（距离）可以用其最近的公共祖先来辅助计算。即`两个叶子节点的最短路径 = 其中一个叶子节点到最近公共祖先的距离 + 另外一个叶子节点到最近公共祖先的距离`。

因此我们可以定义 dfs(root)，其功能是计算以 root 作为出发点，到其各个叶子节点的距离。 如果其子节点有 8 个叶子节点，那么就返回一个长度为 8 的数组， 数组每一项的值就是其到对应叶子节点的距离。

如果子树的结果计算出来了，那么父节点只需要把子树的每一项加 1 即可。这点不难理解，因为**父到各个叶子节点的距离就是父节点到子节点的距离（1） + 子节点到各个叶子节点的距离**。

由上面的推导可知需要先计算子树的信息，因此我们选择前序遍历。

完整代码（Python）：

```py
class Solution:
    def countPairs(self, root: TreeNode, distance: int) -> int:
        self.ans = 0

        def dfs(root):
            if not root:
                return []
            if not root.left and not root.right:
                return [0]
            ls = [l + 1 for l in dfs(root.left)]
            rs = [r + 1 for r in dfs(root.right)]
            # 笛卡尔积
            for l in ls:
                for r in rs:
                    if l + r <= distance:
                        self.ans += 1
            return ls + rs
        dfs(root)
        return self.ans
```

[894. 所有可能的满二叉树](https://leetcode-cn.com/problems/all-possible-full-binary-trees/description/) 也是一样的套路，大家用上面的知识练下手吧~

## 经典题目

推荐大家先把本文提到的题目都做一遍，然后用本文学到的知识做一下下面十道练习题，检验一下自己的学习成果吧！

- [剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)
- [剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)
- [101. 对称二叉树](https://github.com/azl397985856/leetcode/blob/master/problems/101.symmetric-tree.md)
- [226. 翻转二叉树](https://github.com/azl397985856/leetcode/blob/master/problems/226.invert-binary-tree.md)
- [543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)
- [662. 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/)
- [971. 翻转二叉树以匹配先序遍历](https://leetcode-cn.com/problems/flip-binary-tree-to-match-preorder-traversal/)
- [987. 二叉树的垂序遍历](https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/)
- [863. 二叉树中所有距离为 K 的结点](https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/)
- [面试题 04.06. 后继者](https://leetcode-cn.com/problems/successor-lcci/)

## 总结

树的题目一种中心点就是**遍历**，这是搜索问题和修改问题的基础。

而遍历从大的方向分为**广度优先遍历和深度优先遍历**，这就是我们的**两个基本点**。两个基本点可以进一步细分，比如广度优先遍历有带层信息的和不带层信息的（其实只要会带层信息的就够了）。深度优先遍历常见的是前序和后序，中序多用于二叉搜索树，因为二叉搜索树的中序遍历是严格递增的数组。

树的题目从大的方向上来看就三种，一种是搜索类，这类题目最多，这种题目牢牢把握**开始点，结束点 和 目标即可**。构建类型的题目我之前的专题以及讲过了，一句话概括就是**根据一种遍历结果确定根节点位置，根据另外一种遍历结果（如果是二叉搜索树就不需要了）确定左右子树**。修改类题目不多，这种问题边界需要特殊考虑，这是和搜索问题的本质区别，可以使用虚拟节点技巧。另外搜索问题，如果返回值不是根节点也可以考虑虚拟节点。

树有四个比较重要的对做题帮助很大的概念，分别是完全二叉树，二叉搜索树，路径和距离，这里面相关的题目推荐大家好好做一下，都很经典。

最后我给大家介绍了七种干货技巧，很多技巧都说明了在什么情况下可以使用。好不好用你自己去找几个题目试试就知道了。

以上就是树专题的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 38K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。

我整理的 1000 多页的电子书已经开发下载了，大家可以去我的公众号《力扣加加》后台回复电子书获取。

![](https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-17/1602928846461-image.png)

![](https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-17/1602928862442-image.png)
