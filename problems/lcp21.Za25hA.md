## 题目地址(LCP 21. 追逐游戏)

https://leetcode-cn.com/problems/Za25hA/

## 题目描述

```
秋游中的小力和小扣设计了一个追逐游戏。他们选了秋日市集景区中的 N 个景点，景点编号为 1~N。此外，他们还选择了 N 条小路，满足任意两个景点之间都可以通过小路互相到达，且不存在两条连接景点相同的小路。整个游戏场景可视作一个无向连通图，记作二维数组 edges，数组中以 [a,b] 形式表示景点 a 与景点 b 之间有一条小路连通。

小力和小扣只能沿景点间的小路移动。小力的目标是在最快时间内追到小扣，小扣的目标是尽可能延后被小力追到的时间。游戏开始前，两人分别站在两个不同的景点 startA 和 startB。每一回合，小力先行动，小扣观察到小力的行动后再行动。小力和小扣在每回合可选择以下行动之一：

移动至相邻景点
留在原地
如果小力追到小扣（即两人于某一时刻出现在同一位置），则游戏结束。若小力可以追到小扣，请返回最少需要多少回合；若小力无法追到小扣，请返回 -1。

注意：小力和小扣一定会采取最优移动策略。

示例 1：

输入：edges = [[1,2],[2,3],[3,4],[4,1],[2,5],[5,6]], startA = 3, startB = 5

输出：3

解释：


第一回合，小力移动至 2 号点，小扣观察到小力的行动后移动至 6 号点；
第二回合，小力移动至 5 号点，小扣无法移动，留在原地；
第三回合，小力移动至 6 号点，小力追到小扣。返回 3。

示例 2：

输入：edges = [[1,2],[2,3],[3,4],[4,1]], startA = 1, startB = 3

输出：-1

解释：


小力如果不动，则小扣也不动；否则小扣移动到小力的对角线位置。这样小力无法追到小扣。

提示：

edges 的长度等于图中节点个数
3 <= edges.length <= 10^5
1 <= edges[i][0], edges[i][1] <= edges.length 且 edges[i][0] != edges[i][1]
1 <= startA, startB <= edges.length 且 startA != startB

```

## 前置知识

- BFS
- DFS
- 图论

## 公司

- 暂无

## 思路

为了方便描述，我们将追的人称为 A，被追的人称为 B。

首先，我们需要明确几个前提。

1. 给定 N 个节点， N 条边的图，那么图中有且仅有 1 个环。
2. 如果环的大小等于 3（只要三个节点才能成环），那么无论如何 A 都可以捉到 B。

有了上面的两个前提的话，我们继续来分析。如果环的大小大于 3，那么存在 A 无法追到 B 的可能。这个可能仅在 A 到环的入口的距离大于 B 到环的入口的距离 + 1。如果不满足这个条件，那么 A 一定可以追到 B。

> 之所以 + 1 是因为 A 先走 B 后走。

由于 B 尽量会让自己尽可能晚一点被抓到，那么 B 一定会去一个点，这个点满足：B 比 A 先到。（否则 B 还没到就被抓到了，即根本到不了）。满足条件的点可能不止一个，B 一定会去这些点中最晚被抓住的。最晚被抓住其实就等价于 A 到这个点的距离减去 B 到这个点的距离。由于游戏需要我们返回回合数，那么直接返回 A 到这个点的距离其实就可以了。

分析好了上面的点，基本思路就有了。剩下的问题在于如何通过代码来实现。

首先，我们需要找到图中的环的入口以及环的大小。这可以通过 DFS 来实现，通过扩展参数维护当前节点和父节点的深度信息。具体看代码即可。

其次，我们需要求 A 和 B 到图中所有点的距离，这个可以通过 BFS 来实现。具体看代码即可。

以上两个都是图的基本操作，也就是模板，不再赘述。不过对于检测环的入口来说，这个有点意思。检测环的入口，我们可以通过对 B 做 BFS，当 B 到达第一个环上的节点，就找到了环的入口。有的同学可能会问，如果 B 一开始就在环上呢？实际上，我们可以**认为** B 在的节点就是环的节点， 这对结果并没有影响。

为了更快地找到一个节点的所有邻居，我们需要将题目中给的 edges 矩阵转化为临接矩阵。

## 关键点

- 明确这道题中有且仅有一个环
- 当且仅当环的长度大于 3，A 到环入口的距离大于 B 到环入口的距离 + 1 才永远追不上
- 如何检测环，如果计算单点到图中所有点的距离

## 代码

- 语言支持：Python3

Python3 Code:

```python
class Solution:
    def chaseGame(self, edges: List[List[int]], startA: int, startB: int) -> int:
        n = len(edges)
        graph = collections.defaultdict(list)
        for fr, to in edges:
            graph[fr].append(to)
            graph[to].append(fr)

        def bfs(fr, find_entry=False):
            dist = collections.defaultdict(lambda: float("inf"))
            q = collections.deque([fr])
            steps = 0
            nonlocal entry
            while q:
                for i in range(len(q)):
                    cur = q.popleft()
                    if cur in dist:
                        continue
                    if find_entry and cur in circle:
                        entry = cur
                        return
                    dist[cur] = steps
                    for neibor in graph[cur]:
                        q.append(neibor)
                steps += 1
            return dist

        parent = {}
        depth = collections.defaultdict(int)  # 可以被用作 visited
        circle = set()
        entry = 0  # 环的入口

        def cal_circle(node, p):
            parent[node] = p
            depth[node] = depth[p] + 1
            for neibor in graph[node]:
                if neibor == p:
                    continue
                if neibor not in depth:
                    cal_circle(neibor, node)
                elif depth[neibor] < depth[node]:
                    # 检测到了环
                    cur = node
                    while cur != neibor:
                        circle.add(cur)
                        cur = parent[cur]
                    circle.add(neibor)

        cal_circle(1, 0)

        d1, d2 = bfs(startA), bfs(startB)
        bfs(startB, True)

        if len(circle) > 3:
            if d1[entry] > d2[entry] + 1:
                return -1
        if d1[startA] == 1:
            return 1
        ans = 1
        for i in range(1, n + 1):
            if d1[i] - d2[i] > 1:
                ans = max(ans, d1[i])
        return ans

```

## 参考资料

- [找环，然后分情况讨论](https://leetcode-cn.com/problems/Za25hA/solution/zhao-huan-ran-hou-fen-qing-kuang-tao-lun-by-lucife/)

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

![](https://p.ipic.vip/aqenb3.jpg)
