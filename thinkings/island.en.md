# Kojima Question

There are many small island questions on LeetCode. Although there is no official label, they are all the same with me. Both the ideas and routines are relatively similar, so you can combine them to practice.

Not strictly speaking, the island issue is a sub-topic of DFS.

## Routine

The routines for this kind of topic are all DFS, and you can enter DFS from one or more. When it comes to DFS, we can extend it in four directions.

One of the most classic code templates：

```py
seen = set()
def dfs(i, j):
If i crosses the line or j crosses the line: return
if (i, j) in seen: return
temp = board[i][j]
# Mark as visited
seen. add((i, j))
# On
dfs(i + 1, j)
# Next
dfs(i - 1, j)
# Right
dfs(i, j + 1)
# Left
dfs(i, j - 1)
# Undo mark
seen. remove((i, j))
#Single point search
dfs(0, 0)
#Multi-point search
for i in range(M):
for j in range(N):
dfs(i, j)
```

Sometimes we can even mark the access of each cell without using visited, but directly mark it in place. The spatial complexity of this algorithm will be better. This is also a very commonly used technique, everyone must be proficient in it.

```py
def dfs(i, j):
If i crosses the line or j crosses the line: return
if board[i][j] == -1: return
temp = board[i][j]
# Mark as visited
board[i][j] = -1
# On
dfs(i + 1, j)
# Next
dfs(i - 1, j)
# Right
dfs(i, j + 1)
# Left
dfs(i, j - 1)
# Undo mark
board[i][j] = temp
#Single point search
dfs(0, 0)
#Multi-point search
for i in range(M):
for j in range(N):
dfs(i, j)
```

## Related topics

- [200. Number of islands](https://github.com/azl397985856/leetcode/blob/master/problems/200.number-of-islands.md)
- [695. The largest area of the island](https://leetcode-cn.com/problems/max-area-of-island/solution/695-dao-yu-de-zui-da-mian-ji-dfspython3-by-fe-luci /) (Original title of Byte beating)
- [1162. Map analysis](https://leetcode-cn.com/problems/as-far-from-land-as-possible/solution/python-tu-jie-chao-jian-dan-de-bfs1162-di-tu-fen-x /)
- 463. The circumference of the island

The above four questions can be done using regular DFS. And the direction of recursion is in four directions: up, down, left and right. What's more interesting is that you can use the method of in-situ modification to reduce the space opened up for visits.

Among them, 463 questions are just when doing DFS, it is necessary to note that the adjacent side lengths may be calculated repeatedly, so they need to be subtracted. My idea here is：

-Add 4 when encountering land -Continue to determine whether it is land on the left and above -If yes, there will be a double calculation. At this time, the double calculation is 2, so you can subtract 2. -If not, the calculation will not be repeated, and you can ignore it.

Note that the ones on the right and below do not need to be counted, otherwise the calculation will still be repeated.

code：

```py
class Solution:
def islandPerimeter(self, grid: List[List[int]]) -> int:
def dfs(i, j):
if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] ! = 1:
return 0
grid[i][j] = -1
ans = 4 + dfs(i + 1, j) + dfs(i - 1, j) + \
dfs(i, j + 1) + dfs(i, j - 1)
if i > 0 and grid[i - 1][j] ! = 0:
ans -= 2
if j > 0 and grid[i][j - 1] ! = 0:
ans -= 2
return ans

m, n = len(grid), len(grid[0])
for i in range(m):
for j in range(n):
if grid[i][j] == 1:
return dfs(i, j)
```

Of course, it is the same for you to choose to judge the right side and the bottom. You only need to change two lines of code. There is no difference between the two algorithms. code：

```py
class Solution:
def islandPerimeter(self, grid: List[List[int]]) -> int:
def dfs(i, j):
if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] ! = 1:
return 0
grid[i][j] = -1
ans = 4 + dfs(i + 1, j) + dfs(i - 1, j) + \
dfs(i, j + 1) + dfs(i, j - 1)
# Need to change here
if i < m - 1 and grid[i + 1][j] ! = 0:
ans -= 2
# Need to change here
if j < n - 1 and grid[i][j + 1] ! = 0:
ans -= 2
return ans

m, n = len(grid), len(grid[0])
for i in range(m):
for j in range(n):
if grid[i][j] == 1:
return dfs(i, j)
```

If you encounter a small island topic next time, or a topic that can be abstract as a small island model, you can try to use the template introduced in this section. The regularity of this kind of topic is very strong. There are similar stone games. Most stone games can be done using DP. This is a kind of routine.

## Extension

In fact, many questions have the shadow of small island questions. The core of the so-called small island questions is to seek connectivity areas. If you can transform the problem into a connectivity area, then you can use the ideas in this section to do so. For example, [959. Area divided by slashes](https://leetcode-cn.com/problems/regions-cut-by-slashes / "959. Divide the area by a slash")

Title description：

```
In an N x N grid composed of 1 x 1 squares, each 1 x 1 square is composed of /, \, or spaces. These characters will divide the square into areas with common edges.

(Please note that the backslash character is escaped, so \ is represented by "\\". ).

The number of return areas.

Example 1：

input：
[
" /",
"/ "
]
Output: 2
Explanation: The 2x2 grid is as follows：
```

![](https://p.ipic.vip/7iwzmr.jpg)

```

Example 2：

input：
[
" /",
" "
]
Output: 1
Explanation: The 2x2 grid is as follows：
```

![](https://p.ipic.vip/p7frnm.jpg)

```

Example 3：

input：
[
"\\/",
"/\\"
]
Output: 4
Explanation: (Recall that because the \ character is escaped, "\\/" means \/, and "/\\" means /\. ）
The 2x2 grid is as follows：

```

![](https://p.ipic.vip/d2n90a.jpg)

```

Example 4：

input：
[
"/\\",
"\\/"
]
Output: 5
Explanation: (Recall that because the \ character is escaped, "/\\" means /\, and "\\/" means \/. ）
The 2x2 grid is as follows：
```

![](https://p.ipic.vip/vxa1bh.jpg)

```

Example 5：

input：
[
"//",
"/ "
]
Output: 3
Explanation: The 2x2 grid is as follows：
```

![](https://p.ipic.vip/06aw2l.jpg)

```
prompt：

1 <= grid. length == grid[0]. length <= 30
Grid[i][j] is'/','\', or''.
```

In fact, if you transform the "/" and "\" in the question into a 3 x 3 grid, the problem becomes finding the number of connected areas, and you can use the ideas in this section to solve it. Leave it to the reader to think about the details. Here is a Python3 code for everyone.

```py
class Solution:
def regionsBySlashes(self, grid: List[str]) -> int:
m, n = len(grid), len(grid[0])
new_grid = [[0 for _ in range(3 * n)] for _ in range(3 * m)]
ans = 0
# Preprocessing, generate a new 3*m*3* n grid
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

The above is the entire content of this article. If you have any comments on this, please leave me a message. I will check the answers one by one when I have time. For more algorithm routines, you can visit my LeetCode problem solving warehouse:https://github.com/azl397985856/leetcode . There are already 37K stars.

You can also pay attention to my public account "Force Buckle Plus" to take you to chew off the hard bone of the algorithm.

![](https://p.ipic.vip/l0dmxf.jpg)
