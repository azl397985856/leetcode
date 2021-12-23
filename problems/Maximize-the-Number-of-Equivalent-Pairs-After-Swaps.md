## 题目地址（690. Maximize the Number of Equivalent Pairs After Swaps）

https://binarysearch.com/problems/Maximize-the-Number-of-Equivalent-Pairs-After-Swaps

## 题目描述

```
You are given a list of integers of the same length A and B. You are also given a two-dimensional list of integers C where each element is of the form [i, j] which means that you can swap A[i] and A[j] as many times as you want.

Return the maximum number of pairs where A[i] = B[i] after the swapping.

Constraints

n ≤ 100,000 where n is the length of A and B
m ≤ 100,000 where m is the length of C
Example 1
Input
A = [1, 2, 3, 4]
B = [2, 1, 4, 3]
C = [
    [0, 1],
    [2, 3]
]
Output
4
Explanation
We can swap A[0] with A[1] then A[2] with A[3].
```

## 前置知识

- 并查集
- BFS
- DFS

## 并查集

### 思路

这道题的核心在于如果 A 中的 [0,1] 可以互换，并且 [1,2] 可以互换，那么 [0,1,2] 可以任意互换。

也就是说互换**具有联通性**。这种联通性对做题有帮助么？有的！

根据 C 的互换关系，我们可以将 A 分为若干联通域。对于每一个联通域我们可以任意互换。因此我们可以枚举每一个联通域，对联通域中的每一个索引 i ，我们看一下 B 中是否有对应 B[j] == A[i] 其中 i 和 j 为同一个联通域的两个点。

具体算法：

- 首先根据 C 构建并查集。
- 然后根据将每一个联通域存到一个字典 group 中，其中 group[i] = list，i 为联通域的元，list 为联通域的点集合列表。
- 枚举每一个联通域，对联通域中的每一个索引 i ，我们看一下 B 中是否有对应 B[j] == A[i] 其中 i 和 j 为同一个联通域的两个点。累加答案即可

### 代码

代码支持：Python3

Python3 Code:

```py

class UF:
  def __init__(self, M):
      self.parent = {}
      self.cnt = 0
      # 初始化 parent，size 和 cnt
      for i in range(M):
          self.parent[i] = i
          self.cnt += 1

  def find(self, x):
      if x != self.parent[x]:
          self.parent[x] = self.find(self.parent[x])
          return self.parent[x]
      return x
  def union(self, p, q):
      if self.connected(p, q): return
      leader_p = self.find(p)
      leader_q = self.find(q)
      self.parent[leader_p] = leader_q
      self.cnt -= 1
  def connected(self, p, q):
      return self.find(p) == self.find(q)

class Solution:
    def solve(self, A, B, C):
        n = len(A)
        uf = UF(n)
        for fr, to in C:
            print(fr, to)
            uf.union(fr, to)
        group = collections.defaultdict(list)

        for i in uf.parent:
            group[uf.find(i)].append(i)
        ans = 0
        for i in group:
            indices = group[i]
            values = collections.Counter([A[i] for i in indices])
            for i in indices:
                if values[B[i]] > 0:
                    values[B[i]] -= 1
                    ans += 1
        return ans

```

**复杂度分析**

令 n 为数组 A 的长度，v 为图的点数，e 为图的边数。

- 时间复杂度：$O(n+v+e)$
- 空间复杂度：$O(n)$

## 总结

我们也可以使用 BFS 或者 DFS 来生成 group，生成 group 后的逻辑大家都是一样的，这两种解法留给大家来实现吧。

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 46K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
