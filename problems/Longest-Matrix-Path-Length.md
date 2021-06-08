## 题目描述

```
You are given a two dimensional integer matrix where 0 is an empty cell and 1 is a wall. You can start at any empty cell on row 0 and want to end up on any empty cell on row n - 1. Given that you can move left, right, or down, return the longest such path where you visit each cell at most once. If there is no viable path, return 0.

Constraints

1 ≤ n * m ≤ 200,000 where n and m are the number of rows and columns in matrix.
Example 1
Input
matrix = [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0]
]
Output
10
Explanation
We can move (0, 0), (0, 1), (0, 2), (0, 3), (1, 3), (1, 2), (1, 1), (2, 1), (2, 2), (2, 3).


```

## 暴力(TLE)

### 思路

暴力的解法就是枚举所有的选择。 对于一个单元格，如果想继续移动，根据题意只有如下选择：

- 向左
- 向右
- 向下

由于不能走已经访问过的地方，因此使用一个 visited 的记录访问过的地点防止重复访问就不难想起来。

当遇到不可访问点，返回无穷小，表示无解即可。这里不可访问点包括：

1. 边界外的点
2. 已经访问过的点
3. 有障碍物的点

这种解法本质就是暴力枚举所有可能。

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, matrix):
        m, n = len(matrix), len(matrix[0])
        visited = set()
        def dp(i, j):
            if (i, j) in visited: return float('-inf')
            if j < 0 or j >= n: return float('-inf')
            if i >= m: return 0
            if matrix[i][j] == 1: return float('-inf')
            visited.add((i, j))
            ans = 1 + max(dp(i+1, j), dp(i,j+1), dp(i, j-1))
            visited.remove((i, j))
            return ans
        ans = max([dp(0, j) for j in range(n)])
        return 0 if ans == float('-inf') else ans
```

**复杂度分析**

- 时间复杂度：$O(2^(m*n))$
- 空间复杂度：$O(m*n)$

## 动态规划

### 思路

一般这种需要暴力枚举所有可能，而且让你求**极值**的题目，很多都是 dp。

只不过这道题不能直接记忆化。

这是因为上面的函数 `dp` 并不是纯函数，这是因为我们使用了 visited。

> 不明白为啥是纯函数的，看下我的公众号《力扣加加》的动态规划专题。

一种思路是将 visited 序列化到参数中。一种是想办法不用 visited 。

如果是序列化 visited，那么空间肯定爆炸。因此只能不使用 visited。

仔细分析一下，实际上一共有几种可能：

1. 当前是从上面的格子**向下**过来的。此时我们可以向左或者向右，也可以向下。
2. 当前是从左边的格子**向右**过来的。此时我们可以向右，也可以向下。（不可以向左）
3. 当前是从上面的格子**向下**过来的。此时我们可以向右，也可以向下。（不可以向右）

因此我们可以多记录一下一个状态，**我们是如何过来的**。这样就可以去掉 visited，达到使用 dp 的目的。

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, matrix):
        m, n = len(matrix), len(matrix[0])

        @lru_cache(None)
        def dp(i, j, d):
            if j < 0 or j >= n: return float('-inf')
            if i >= m: return 0
            if matrix[i][j] == 1: return float('-inf')
            ans = 1 + max(dp(i+1, j, 0), float('-inf') if d == -1 else dp(i,j+1, 1), float('-inf') if d == 1 else dp(i, j-1, -1))
            return ans
        ans = max([dp(0, j, 0) for j in range(n)])
        return 0 if ans == float('-inf') else ans
```

**复杂度分析**

- 时间复杂度：$O(m*n)$
- 空间复杂度：$O(m*n)$
