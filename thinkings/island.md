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
- [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/solution/695-dao-yu-de-zui-da-mian-ji-dfspython3-by-fe-luci/)(字节跳动原题)
- [1162. 地图分析](https://leetcode-cn.com/problems/as-far-from-land-as-possible/solution/python-tu-jie-chao-jian-dan-de-bfs1162-di-tu-fen-x/)
- 463.岛屿的周长

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


## 扩展

实际上，很多题都有小岛题的影子，所谓的小岛题的核心是求连通区域。如果你能将问题转化为求连通区域，那么就可以使用本节的思路去做。 比如 [959. 由斜杠划分区域](https://leetcode-cn.com/problems/regions-cut-by-slashes/ "959. 由斜杠划分区域")

题目描述：

```
在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\ 或空格构成。这些字符会将方块划分为一些共边的区域。

（请注意，反斜杠字符是转义的，因此 \ 用 "\\" 表示。）。

返回区域的数目。

示例 1：

输入：
[
  " /",
  "/ "
]
输出：2
解释：2x2 网格如下：
```

![](https://p.ipic.vip/ie8a2v.jpg)

```

示例 2：

输入：
[
  " /",
  "  "
]
输出：1
解释：2x2 网格如下：
```

![](https://p.ipic.vip/cm4wgd.jpg)

```

示例 3：

输入：
[
  "\\/",
  "/\\"
]
输出：4
解释：（回想一下，因为 \ 字符是转义的，所以 "\\/" 表示 \/，而 "/\\" 表示 /\。）
2x2 网格如下：

```

![](https://p.ipic.vip/wb8ru7.jpg)

```

示例 4：

输入：
[
  "/\\",
  "\\/"
]
输出：5
解释：（回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。）
2x2 网格如下：
```

![](https://p.ipic.vip/dpuon4.jpg)

```

示例 5：

输入：
[
  "//",
  "/ "
]
输出：3
解释：2x2 网格如下：
```

![](https://p.ipic.vip/i7hmlc.jpg)


```
提示：

1 <= grid.length == grid[0].length <= 30
grid[i][j] 是 '/'、'\'、或 ' '。
```

实际上，如果你将题目中的 "/" 和 "\" 都转化为 一个 3 x 3 的网格之后，问题就变成了求连通区域的个数，就可以用本节的思路去解决了。具体留给读者去思考吧，这里给大家贴一个 Python3 的代码。

```py
class Solution:
    def regionsBySlashes(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        new_grid = [[0 for _ in range(3 * n)] for _ in range(3 * m)]
        ans = 0
        # 预处理，生成新的 3 * m * 3 * n 的网格
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '/':
                    new_grid[3 * i][3 * j + 2] = 1
                    new_grid[3 * i + 1][3 * j + 1] = 1
                    new_grid[3 * i + 2][3 * j] = 1
                if grid[i][j] == '\\':
                    new_grid[3 * i][3 * j] = 1
                    new_grid[3 * i + 1][3 * j + 1] = 1
                    new_grid[3 * i + 2][3 * j + 2] = 1·
        def dfs(i, j):
            if 0 <= i < 3 * m and 0 <= j < 3 * n and new_grid[i][j] == 0:
                new_grid[i][j] = 1
                dfs(i + 1, j)
                dfs(i - 1, j)
                dfs(i, j + 1)
                dfs(i, j - 1)
        for i in range(3 * m):
            for j in range(3 * n):
                if new_grid[i][j] == 0:
                    ans += 1
                    dfs(i, j)
        return ans
```
 
以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 37K star 啦。

大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。

![](https://p.ipic.vip/hnxxzn.jpg)
