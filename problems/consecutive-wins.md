# 题目地址（726.Consecutive Wins）

https://binarysearch.com/problems/Consecutive-Wins

## 题目描述

```
You are given integers n and k. Given that n represents the number of games you will play, return the number of ways in which you win k or less games consecutively. Mod the result by 10 ** 9 + 7.

Constraints

n ≤ 10,000
k ≤ 10
Example 1
Input
n = 3
k = 2
Output
7
Explanation
Here are the ways in which we can win 2 or fewer times consecutively:

"LLL"
"WLL"
"LWL"
"LLW"
"WWL"
"LWW"


```

## 前置知识

- 递归树
- 动态规划

## 公司

- 暂无

## 思路

定义 f(i, j) 表示 i 次比赛连续赢 j 次的总的可能数目。 其实也就是**长度为 n - i 的字符串中连续 w 的次数不超过 j 的总的可能数**，其中 字符串中的字符只能是 L 或 W。

经过这样的定义之后，我们的答案应该是 f(0, 0)。

实际上，也就是问动态规划的转移方程是什么。

对于 f(0, 0)，我们可以：

- 在末尾增加一个 L，也就是输一局。用公式表示就是 f(1, 0)
- 在末尾增加一个 W，也就是赢一局。用公式表示就是 f(1, 1)

用图来表示就是如下的样子：

![图采用力扣加加刷题插件制作](https://p.ipic.vip/kwdjfk.jpg)

不是一般性，我们可以得出如下的转移方程：

$$
  f(i, j)=\left\{
  \begin{aligned}
  f(i+1, 0) + f(i+1, j+1) &  & j  < k \\
  f(i+1, 0) & & j = k \\
  \end{aligned}
  \right.
$$

那么我们的目标其实就是计算图中叶子节点（绿色节点）的总个数。

> 注意 f(3,3) 是不合法的，我们不应该将其计算进去。

上面使我们的递归树代码，可以看出有很多重复的计算。这提示我们使用记忆化递归来解决。使用记忆化递归，总的时间复杂度 节点总数 \* 单个节点的操作数。树的节点总数是 n \* k，单个节点的操作是常数。故总的时间复杂度为 $O(n \* k)，空间复杂度是使用的递归深度 + 记忆化使用的额外空间。其中递归深度是 $n$，记忆化的空间为 $n * k$，忽略低次项后空间复杂度为 $O(n * k)$

## 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, n, k):
        @lru_cache(None)
        def dp(i, cnt):
            if i == n:
                return 1
            ans = dp(i + 1, 0)  # place L
            if cnt < k:
                ans += dp(i + 1, cnt + 1)  # place W if I can
            return ans

        return dp(0, 0) % (10 ** 9 + 7)
```

**复杂度分析**

- 时间复杂度：$O(n * k)$
- 空间复杂度：$O(n * k)$
