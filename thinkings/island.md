# 小岛问题

LeetCode 上有很多小岛题，虽然官方没有这个标签， 但是在我这里都差不多。不管是思路还是套路都比较类似，大家可以结合起来练习。

不严谨地讲，小岛问题是 DFS 的子专题。

## 套路

这种题目的套路都是 DFS，从一个或多个入口 DFS 即可。 DFS 的时候，我们往四个方向延伸即可。

一个最经典的代码模板：

```py
seen = set()
def dfs(i, j):
  if i 越界 or j 越界: return
  if (i, j) in seen: return
  temp = board[i][j]
  # 标记为访问过
  seen.add((i, j))
  # 上
  dfs(i + 1, j)
  # 下
  dfs(i - 1, j)
  # 右
  dfs(i, j + 1)
  # 左
  dfs(i, j - 1)
  # 撤销标记
  seen.remove((i, j))
# 单点搜索
dfs(0, 0)
# 多点搜索
for i in range(M):
   for j in range(N):
      dfs(i, j)
```

有时候我们甚至可以不用 visited 来标记每个 cell 的访问情况， 而是直接原地标记，这种算法的空间复杂度会更好。这也是一个很常用的技巧， 大家要熟练掌握。

```py
def dfs(i, j):
  if i 越界 or j 越界: return
  if board[i][j] == -1: return
  temp = board[i][j]
  # 标记为访问过
  board[i][j] = -1
  # 上
  dfs(i + 1, j)
  # 下
  dfs(i - 1, j)
  # 右
  dfs(i, j + 1)
  # 左
  dfs(i, j - 1)
  # 撤销标记
  board[i][j] = temp
# 单点搜索
dfs(0, 0)
# 多点搜索
for i in range(M):
   for j in range(N):
      dfs(i, j)
```

## 相关题目

- [200. 岛屿数量](https://github.com/azl397985856/leetcode/blob/master/problems/200.number-of-islands.md)
- [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/solution/695-dao-yu-de-zui-da-mian-ji-dfspython3-by-fe-luci/)
- [1162. 地图分析](https://leetcode-cn.com/problems/as-far-from-land-as-possible/solution/python-tu-jie-chao-jian-dan-de-bfs1162-di-tu-fen-x/)
- 463. 岛屿的周长

上面四道题都可以使用常规的 DFS 来做。 并且递归的方向都是上下左右四个方向。更有意思的是，都可以采用原地修改的方式，来减少开辟 visited 的空间。

其中 463 题， 只是在做 DFS 的时候，需要注意相邻的各自边长可能会被重复计算， 因此需要减去。这里我的思路是：

- 遇到陆地就加 4
- 继续判断其左侧和上方是否为陆地
  - 如果是的话，会出现重复计算，这个时候重复计算的是 2，因此减去 2 即可
  - 如果不是，则不会重复计算， 不予理会即可

注意，右侧和下方的就不需要算了，否则还是会重复计算。

代码：

```py
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != 1:
                return 0
            grid[i][j] = -1
            ans = 4 + dfs(i + 1, j) + dfs(i - 1, j) + \
                dfs(i, j + 1) + dfs(i, j - 1)
            if i > 0 and grid[i - 1][j] != 0:
                ans -= 2
            if j > 0 and grid[i][j - 1] != 0:
                ans -= 2
            return ans

        m, n = len(grid), len(grid[0])
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    return dfs(i, j)
```

当然， 你选择判断右侧和下方也是一样的，只需要改**两行**代码即可，这两种算法没有什么区别。代码：

```py
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != 1:
                return 0
            grid[i][j] = -1
            ans = 4 + dfs(i + 1, j) + dfs(i - 1, j) + \
                dfs(i, j + 1) + dfs(i, j - 1)
            # 这里需要变
            if i < m - 1 and grid[i + 1][j] != 0:
                ans -= 2
            # 这里需要变
            if j < n - 1 and grid[i][j + 1] != 0:
                ans -= 2
            return ans

        m, n = len(grid), len(grid[0])
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    return dfs(i, j)
```

如果你下次碰到了小岛题目， 或者可以抽象为小岛类模型的题目，可以尝试使用本节给大家介绍的模板。这种题目的规律性很强， 类似的还有石子游戏，石子游戏大多数可以使用 DP 来做，这就是一种套路。

大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 37K star 啦。

大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)
