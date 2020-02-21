# 深度优先遍历

深度优先搜索算法（英语：Depth-First-Search，DFS）是一种用于遍历或搜索树或图的算法。沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点 v 的所在边都己被探寻过，搜索将回溯到发现节点 v 的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止。属于盲目搜索。

深度优先搜索是图论中的经典算法，利用深度优先搜索算法可以产生目标图的相应拓扑排序表，利用拓扑排序表可以方便的解决很多相关的图论问题，如最大路径问题等等。

因发明「深度优先搜索算法」，约翰 · 霍普克洛夫特与罗伯特 · 塔扬在 1986 年共同获得计算机领域的最高奖：图灵奖。

截止目前（2020-02-21），深度优先遍历在 LeetCode 中的题目是 129 道。在 LeetCode 中的题型绝对是超级大户了。而对于树的题目，我们基本上都可以使用 DFS 来解决，甚至我们可以基于 DFS 来做广度优先遍历。并不一定说 DFS 不可以做 BFS（广度优先遍历）的事情。而且由于 DFS 通常我们可以基于递归去做，因此算法会更简洁。 在对性能有很高邀请的场合，我建议你使用迭代，否则尽量使用递归，不仅写起来简单快速，还不容易出错。

另外深度优先遍历可以结合回溯专题来联系，建议将这两个专题放到一起来学习。

## 题目

这是我近期总结的几个 DFS 题目，后续会持续更新～

- [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/solution/mo-ban-ti-dao-yu-dfspython3-by-fe-lucifer-2/) 中等

- [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/solution/mo-ban-ti-dao-yu-dfspython3-by-fe-lucifer/) 中等
- [979. 在二叉树中分配硬币](https://leetcode-cn.com/problems/distribute-coins-in-binary-tree/solution/tu-jie-dfspython3-by-fe-lucifer/) 中等
