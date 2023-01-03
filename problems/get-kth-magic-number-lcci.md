# 题目地址（面试题 17.09. 第 k 个数）

https://leetcode-cn.com/problems/get-kth-magic-number-lcci/

## 题目描述

```
有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21。

示例 1:

输入: k = 5

输出: 9

```

## 前置知识

- 堆
- 状态机
- 动态规划

## 公司

- 暂无

## 堆

### 思路

思路很简单。 就是使用一个小顶堆，然后每次从小顶堆取一个， 取 k 次即可。

唯一需要注意的是重复数字，比如 `3 * 5 = 15` ， `5 * 3 = 15` 。关于去重， 用 set 就对了。

### 关键点

- 去重

### 代码(Python)

```py
from heapq import heappop, heappush
class Solution:
    def getKthMagicNumber(self, k: int) -> int:
        heap = [1]
        numbers = set()
        # 每次从小顶堆取一个， 取 k 次即可
        while k:
            cur = heappop(heap)
            if cur not in numbers:
                k -= 1
                heappush(heap, cur * 3)
                heappush(heap, cur * 5)
                heappush(heap, cur * 7)
            numbers.add(cur)
        return cur

```

## 状态机

### 思路

这个思路力扣的题目还是蛮多的， 比如西法我之前写的一个 [《原来状态机也可以用来刷 LeetCode？》](https://lucifer.ren/blog/2020/01/12/1262.greatest-sum-divisible-by-three/).

思路很简单， 就是用三个指针记录因子是 3，5，7 的最小值的索引。

### 代码（Python）

```py
class Solution:
    def getKthMagicNumber(self, k: int) -> int:
        p3 = p5 = p7 = 0
        state = [1] + [0] * (k - 1)

        for i in range(1, k):
            state[i] = min(state[p3] * 3, state[p5] * 5, state[p7] * 7)
            if 3 * state[p3] == state[i]: p3 += 1
            if 5 * state[p5] == state[i]: p5 += 1
            if 7 * state[p7] == state[i]: p7 += 1
        return state[-1]
```

**复杂度分析**

- 时间复杂度：$O(k)$
- 空间复杂度：$O(k)$

大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 36K star 啦。
大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
![](https://p.ipic.vip/ts7jth.jpg)
