# 题目地址（325.Bus Fare）

https://binarysearch.com/problems/Bus-Fare

## 题目描述

```
You are given a list of sorted integers days , where you must take the bus for on each day. Return the lowest cost it takes to travel for all the days.

There are 3 types of bus tickets.

1 day pass for 2 dollars
7 day pass for 7 dollars
30 day pass for 25 dollars
Constraints

n ≤ 100,000 where n is the length of days
Example 1
Input
days = [1, 3, 4, 5, 29]
Output
9
Explanation
The lowest cost can be achieved by purchasing a 7 day pass in the beginning and then a 1 day pass on the 29th day.

Example 2
Input
days = [1]
Output
2
```

## 前置知识

- 递归树
- 多指针

## 公司

- 暂无

## 暴力 DP

### 思路

定义专状态 dp[i] 为截止第 i + 1 天（包括）需要多少钱，因此答案就是 dp[n]，其中 n 为 max(days)，由于 day 是升序的，因此就是 day 最后一项。

使用两层暴力寻找。外层控制 i 天， 内层循环控制 j 天，其中 i <= j。每次我们只考虑进行一次操作：

- 买一张天数 2 的票
- 买一张天数 7 的票
- 买一张天数 25 的票

对于每一个 [i, j]对，我们对计算一遍，求出最小值就可以了。

代码：

```py
class Solution:
    def solve(self, days):
        n = len(days)
        prices = [2, 7, 25]
        durations = [1, 7, 30]
        dp = [float("inf")] * (n + 1)
        dp[0] = 0

        for i in range(1, n + 1):
            for j in range(i, n + 1):
                # 如何第 i + 1天到第 j 天的天数小于等于 2，那么我们就试一下在 i + 1 天买一张 2 天的票，看会不会是最优解。
                # 7 和 25 的逻辑也是一样
        return dp[-1]
```

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, days):
        n = len(days)
        prices = [2, 7, 25]
        durations = [1, 7, 30]
        dp = [float("inf")] * (n + 1)
        # dp[i] 表示截止第 i + 1 天（包括）需要多少钱，因此答案就是 dp[n]，其中 n 为 max(days)，由于 day 是升序的，因此就是 day 最后一项。
        dp[0] = 0

        for i in range(1, n + 1):
            for j in range(i, n + 1):
                for price, duration in zip(prices, durations):
                    if days[j - 1] - days[i - 1] + 1 <= duration:
                        dp[j] = min(dp[j], dp[i - 1] + price)
        return dp[-1]
```

**复杂度分析**

令 m 和 n 分别为 prices 和 days 的长度。

- 时间复杂度：$O(m * n^2)$
- 空间复杂度：$O(n)$

## 多指针优化

### 思路

这种算法需要枚举所有的 [i,j] 组合，之后再枚举所有的票，这无疑是完备的，但是复杂度很高。需要进行优化，接下来我们看下如何进行优化。

由于不同的票价的策略是一致的，因此我们可以先仅考虑天数为 2 的。 假如两天的票内层循环的 j 找到了第一个满足条件的 i，不妨假设 i 的值是 x。

那么下一次循环，i 指针不必从 0 开始，而是直接从 x 开始，因此 x 之前肯定都无法满足： `days[j - 1] - days[i - 1] + 1 <= duration`。这是优化的关键，这点其实和《组成三角形的个数》题目类似。关键都在于**指针不回退，达到优化的效果**。 实际上，思想上来看**单调栈**也是类似的。

上面我说了是 i 不回退，实际上不同的天数的票对应的**上一次指针位置是不同的**，我们可以使用一个长度为 m 的指针数组来表示不同天数的票上一次 i 指针的位置。相比于双指针，多指针的编码会稍微复杂一点。

由于 i 指针不需要回退，因此省略了一层 n 的循环，时间复杂度可以从 $O(m * n^2)$ 降低到 O(m \* n)$。

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, days):
        prices = [2, 7, 25]
        durations = [1, 7, 30]
        n = len(days)
        m = len(prices)
        dp = [float("inf")] * (n + 1)
        dp[0] = 0
        pointers = [0] * m
        for i in range(1, n + 1):
            for j in range(m):
                while days[i - 1] - days[pointers[j]] >= durations[j]:
                    pointers[j] += 1
                dp[i] = min(dp[i], dp[pointers[j]] + prices[j])
        return dp[-1]
```

**复杂度分析**

令 m 和 n 分别为 prices 和 days 的长度。

- 时间复杂度：$O(m * n)$
- 空间复杂度：$O(m + n)$
