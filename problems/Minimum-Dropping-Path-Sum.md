# 题目地址（Minimum Dropping Path Sum）

https://binarysearch.com/problems/Minimum-Dropping-Path-Sum

## 题目描述

```
You are given a two-dimensional list of integers matrix. Return the minimum sum you can get by taking a number in each row with the constraint that any row-adjacent numbers cannot be in the same column.

Constraints

1 ≤ n ≤ 250 where n is the number of rows in matrix
2 ≤ m ≤ 250 where m is the number of columns in matrix
Example 1
Input
matrix = [
    [4, 5, -2],
    [2, 6, 1],
    [3, 1, 2]
]
Output
1
Explanation
We can take -2 from the first row, 2 from the second row, and 1 from the last row.

Example 2
Input
matrix = [
    [3, 0, 3],
    [2, 1, 3],
    [-2, 3, 0]
]
Output
1
Explanation
We can take 0 from the first row, 3 from the second row, and -2 from the last row.
```

## 前置知识

- [动态规划](https://github.com/azl397985856/leetcode/blob/master/thinkings/dynamic-programming.md "动态规划")

## 公司

- 暂无

## 思路

这道题是不同路径（或者杨辉三角）的换皮题。

这道题是让我们每一行选择一个数，使得数字和最小。唯一的限制是相邻行拿的数字不能列相同(其实就是不能上下紧挨着拿)。

一个可能的暴力思路是：

- 先取第一行。第一行有 n （n 为列数）个选择，那就挨个试。
- 接下来取第二行。第二行有 n-1 个选择，那就挨个试。
- 接下来取第三行。第三行有 n-1 个选择，那就挨个试。
- 。。。

不要小看暴力法， 这是一种解决问题的思维习惯。

如果你将上面的过程画成一棵树的话，那么可以看出时间复杂度大概是和底层的节点数是一个数量级的，是指数级别的。就算不画树，你也不难看出大概的计算次数是 n _(n -1) _ (n - 1) ...（一共 m - 1 个 n -1）。那么我们可以优化么？

实际上是可以的。我们先不考虑题目的限制”相邻行拿的数字不能列相同“。那么我们的策略就变成了贪婪， 只要每一行都取最小的不就行了？时间复杂度是 $O(m * n)$。

那么加上这个限制会有什么不同么？以题目的例子为例：

```
matrix = [
    [3, 0, 3],
    [2, 1, 3],
    [-2, 3, 0]
]
```

贪心的做法第一行要选 0，第二行要选 1，不过违反了限制。那我们有必要把所有的选择第一行和第二行的组合计算出来么（就像上面的暴力法那样）？其实我们只**记录上一行的最小和次小值**即可。如果出现了上面的情况，那么我们可以考虑：

- 选择 1 和上一行次小值（3 + 1）
- 选择行次小值和上一行最小值（2 + 0）

剩下的逻辑也是如此。

最终我们返回**选择到达**最后一行的**最小值**即可。

## 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, matrix):
        dp = [(0, -1)]
        m, n = len(matrix), len(matrix[0])
        for i in range(m):
            next_dp = [(float("inf"), -1), (float("inf"), -1)]# (smallest, 2nd smallest)
            for j in range(n):
                for v, k in dp:
                    if k == j:
                        continue
                    nxt = matrix[i][j] + v
                    if nxt < next_dp[0][0]:
                        next_dp = [(nxt, j), next_dp[0]]
                    elif nxt < next_dp[1][0]:
                        next_dp[1] = (nxt, j)
                    break
            dp = next_dp # rolling array
        return dp[0][0]

```

**复杂度分析**

- 时间复杂度：$O(m*n)$
- 空间复杂度：$O(1)$ （使用了滚动数组优化）

## 相关题目

- [Painting-Houses](https://binarysearch.com/problems/Painting-Houses) (换皮题。代码一模一样，直接复制粘贴代码就可以 AC)

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
