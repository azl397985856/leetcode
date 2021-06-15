## 题目地址

https://binarysearch.com/problems/Connected-Road-to-Destination

## 题目描述

```
You are given integers sx, sy, ex, ey and two-dimensional list of integers roads. You are currently located at coordinate (sx, sy) and want to move to destination (ex, ey). Each element in roads contains (x, y) which is a road that will be added at that coordinate. Roads are added one by one in order. You can only move to adjacent (up, down, left, right) coordinates if there is a road in that coordinate or if it's the destination coordinate. For example, at (x, y) we can move to (x + 1, y) if (x + 1, y) is a road or the destination.

Return the minimum number of roads in order that must be added before there is a path consisting of roads that allows us to get to (ex, ey) from (sx, sy). If there is no solution, return -1.

Constraints

0 ≤ n ≤ 100,000 where n is the length of roads
Example 1
Input
sx = 0
sy = 0
ex = 1
ey = 2
roads = [
    [9, 9],
    [0, 1],
    [0, 2],
    [0, 3],
    [3, 3]
]
Output
3
Explanation
We need to add the first three roads which allows us to go from (0, 0), (0, 1), (0, 2), (1, 2). Note that we must take (9, 9) since roads must be added in order.


```

## 前置知识

- 二分
- 并查集

## 二分(超时)

本质就是能力检测二分。关于能力检测二分，我在我的[二分专题](https://github.com/azl397985856/leetcode/blob/master/thinkings/binary-search-2.md)已经做了详细的介绍，不再赘述。

因为我们我们只需要在 [0, len(roads)] 值域内做能力检测即可，然后根据检测结果二分值域。由于是求**最小**的满足起点和终点联通的铺设道路的数量，因此使用最左二分即可。

这里我套用了最左二分的模板。 问题的关键是能力检测如何写？**这里的能力检测本质是检测在给的前 x 个 roads，问起点和终点是否联通**。

不妨使用 BFS， 从 起点开始搜索，如果存在一条通路到终点，那么返回存在即可。要搜索就需要构建图，构图的关键是构建边。这道题的边其实就是**点的上下左右邻居**，不过**邻居要在 roads 中存在才行哦**，这点需要注意。据此，不难写出如下代码。

### 思路

### 代码

```py
class Solution:
    def solve(self, sx, sy, ex, ey, roads):
        def possible(mid):
            dic = set([(sx, sy), (ex, ey)])
            visited = set()
            q = collections.deque([(sx, sy)])
            for x, y in roads[:mid]:
                dic.add((x, y))
            while q:
                x, y = q.popleft()
                if (x, y) in visited: continue
                visited.add((x, y))
                if (x, y) == (ex, ey): return True
                for dx, dy in [(1,0),(-1,0), (0,1), (0,-1)]:
                    if (x + dx, y + dy) in dic:
                        q.append((x + dx, y + dy))
            return False
        l, r = 0, len(roads)

        while l <= r:
            mid = (l + r) // 2
            if possible(mid):
                r = mid - 1
            else:
                l = mid + 1
        return -1 if l > len(roads) else l
```

**复杂度分析**

令 n 为 roads 的长度。

- 时间复杂度：$O(nlogn)$，logn 用于二分，n 用于能力检测。
- 空间复杂度：$O(n)$

## 并查集

### 思路

上面我不停地提起**联通** 这个词。这提示我们使用并查集来完成。

从起点不断**加边**，直到起点和终点联通或者 roads 加入完了。同样，可以使用我的[并查集专题](https://github.com/azl397985856/leetcode/blob/master/thinkings/union-find.md)的模板。

由于需要**加边**，因此对模板需要进行一点小小调整，增加 add(x) api 用于**加点**，功能是将 x 加入到图中，接下来使用 union **加边**即可。

### 代码

代码支持：Python3

Python Code:

```py

class UF:
  def __init__(self):
      self.parent = {}
      self.cnt = 0
  def add(self, i):
      self.parent[i] = i
      self.cnt += 1

  def find(self, x):
      if x != self.parent[x]:
          self.parent[x] = self.find(self.parent[x])
          return self.parent[x]
      return x
  def union(self, p, q):
      if p not in self.parent or q not in self.parent: return
      if self.connected(p, q): return
      leader_p = self.find(p)
      leader_q = self.find(q)
      self.parent[leader_p] = leader_q
      self.cnt -= 1
  def connected(self, p, q):
      return self.find(p) == self.find(q)

class Solution:
    def solve(self, sx, sy, ex, ey, roads):
        start = (sx, sy)
        end = (ex, ey)
        # 注意特判
        for dx, dy in [(0, 0), (1,0), (-1,0), (0,1), (0,-1)]:
            x = sx + dx
            y = sy + dy
            if (x, y) == (ex, ey): return 0

        uf = UF()
        uf.add(start)
        uf.add(end)

        for i, road in enumerate(map(tuple, roads)):
            uf.add(road)
            for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
                x = road[0] + dx
                y = road[1] + dy
                uf.union(road, (x, y))
                if uf.connected(start, end):
                    return i + 1

        return -1
```

**复杂度分析**

令 n 为 roads 的长度。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$
