## 题目地址（475. Increasing Digits）

https://binarysearch.com/problems/Increasing-Digits

## 题目描述

```
Given an integer n, return the number of positive integers of length n such that the digits are strictly increasing.

Example 1
Input
n = 2
Output
36
Explanation
We have 12, 13, 14, ..., 89.

Example 2
Input
n = 1
Output
9
```

## 前置知识

- 动态规划

## 思路

动态规划问题的关键就是：假设部分子问题已经解决了，并仅仅考虑局部，思考如何将已解决的子问题变成更大的子问题，这样就相当于向目标走进了一步。

我们可以定义状态 dp[i][j]， i 表示数字的位数，j 表示数字的结尾数字。

于是转移方程就是：dp[i][j] += dp[i - 1][k]，其中 k 是所有小于 j 的非负整数。最后只要返回 dp[n-1] 的和即可。

初始化的时候，由于题目限定了整数，因此需要初始化除了第一位的所有情况都为 1。

## 关键点

- 数位 DP

## 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, n):
        dp = [[0] * 10 for _ in range(n)]
        dp[0] = [0] + [1] * 9

        for i in range(1, n):
            for j in range(1, 10):
                for k in range(j):
                    dp[i][j] += dp[i - 1][k]
        return sum(dp[-1])

```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
