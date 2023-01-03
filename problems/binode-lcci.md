# 题目地址（面试题 17.12. BiNode）

https://leetcode-cn.com/problems/binode-lcci/

## 题目描述

```
二叉树数据结构TreeNode可用来表示单向链表（其中left置空，right为下一个链表节点）。实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，转换操作应是原址的，也就是在原始的二叉搜索树上直接修改。

返回转换后的单向链表的头节点。

注意：本题相对原题稍作改动

 

示例：

输入： [4,2,5,1,3,null,6,0]
输出： [0,null,1,null,2,null,3,null,4,null,5,null,6]
提示：

节点数量不会超过 100000。
```

## 前置知识

- 二叉查找树
- 递归
- [二叉树的遍历](../thinkings/binary-tree-traversal.md)

## 公司

- 暂无

## 思路

实际上这就是一个考察二叉树遍历 + 二叉搜索(查找)树性质的题目。这类题目特别需要注意的是指针操作，这一点和**链表反转系列**题目是一样的。

首先我们要知道一个性质： **对于一个二叉查找树来说，其中序遍历结果是一个有序数组**。 而题目要求你输出的恰好就是有序数组（虽然没有明说， 不过从测试用例也可以看出）。

因此一个思路就是中序遍历， 边遍历边改变指针即可。 这里有两个注意点:

1. 指针操作小心互相引用，导致死循环。
2. 你需要返回的是最左下角的节点，而不是题目给的 root。

- 对于第一个问题， 其实只要注意操作指针的顺序，以及在必要的时候重置指针即可。

- 对于第二个问题，我用了一个黑科技，让代码看起来简洁又高效。如果不懂的话， 你也可以换个朴素的写法。

理解了上面的内容的话， 那让我们进入正题。

其中绿色是我们要增加的连线，而黑色是是原本的连线。

![](https://p.ipic.vip/91t658.gif)

我们再来看一个复杂一点的：

![](https://p.ipic.vip/v4jgm0.jpg)

实际上，不管多么复杂。 我们只需要进行一次**中序遍历**，同时记录前驱节点。然后修改前驱节点和当前节点的指针即可，整个过程就好像是链表反转。

![](https://p.ipic.vip/rizxay.jpg)

核心代码（假设 pre 我们已经正确计算出了）：

```py
cur.left = None
pre.right = cur
pre = cur
```

剩下的就是如何计算 pre，这个也不难，直接看代码：

```py
self.pre = None
def dfs(root):
    dfs(root.left)
    # 上面的指针改变逻辑写到这里
    self.pre = root
    dfs(root.right)

```

问题得以解决。

这里还有最后一个问题就是返回值，题目要返回的实际上是最左下角的值。如何取到最左下角的节点呢？我们来看下核心代码你就懂了，代码比较简单。

```py

    self.pre = self.ans = None
    def dfs(root):
        if not root: return
        dfs(root.left)
        root.left = None
        if self.pre: self.pre.right = root
        # 当第一次执行到下面这一行代码，恰好是在最左下角，此时 self.pre = None，其他任何时候 self.pre 都不是 None。
        if self.pre is None: self.ans = root
        self.pre = root
        dfs(root.right)
```

## 关键点

- 指针操作
- 返回值的处理

## 代码

```py
class Solution:
    def convertBiNode(self, root: TreeNode) -> TreeNode:
        self.pre = self.ans = None
        def dfs(root):
            if not root: return
            dfs(root.left)
            root.left = None
            if self.pre: self.pre.right = root
            if self.pre is None: self.ans = root
            self.pre = root

            dfs(root.right)
        dfs(root)
        return self.ans
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 N 为树的节点总数。
- 空间复杂度：$O(h)$，其中 h 为树的高度。

## 相关题目

- [206.reverse-linked-list](./206.reverse-linked-list.md)
- [92.reverse-linked-list-ii](./92.reverse-linked-list-ii.md)
- [25.reverse-nodes-in-k-groups-cn](./25.reverse-nodes-in-k-groups.md)

大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 37K star 啦。
大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。

![](https://p.ipic.vip/7nkycx.jpg)
