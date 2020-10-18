# 小岛问题

LeetCode 上有很多小岛题，虽然官方没有这个标签， 但是在我这里都差不多。不管是思路还是套路都比较类似，大家可以结合起来练习。

## 套路

这种题目的套路都是 DFS，从一个或多个入口 DFS即可。 DFS 的时候，我们往四个方向延伸即可。

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


有时候我们甚至可以不用 visited 来标记每个 cell 的访问情况， 而是直接原地标记，这种算法的空间复杂度会更好。

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

上面三道题都可以使用常规的 DFS 来做。 并且递归的方向都是上下左右四个方向。更有意思的是，都可以采用原地修改的方式，来减少开辟 visited 的空间。
