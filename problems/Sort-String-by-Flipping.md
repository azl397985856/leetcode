## 题目地址（Sort-String-by-Flipping)

https://binarysearch.com/problems/Sort-String-by-Flipping

## 题目描述

```
You are given a string s consisting of the letters "x" and "y". In addition, you have an operation called flip, which changes a single "x" to "y" or vice versa.

Determine the smallest number of times you would need to apply this operation to ensure that all "x"'s come before all "y"'s.

Constraints

0 ≤ n ≤ 100,000 where n is the length of s
Example 1
Input
s = "xyxxxyxyy"
Output
2
Explanation
It suffices to flip the second and sixth characters.
```

## 前置知识

- 无

## 思路

题目让我求将字符串变成 xy 模式的最小操作翻转数，所谓的 xy 模式指的是字符串所有的 x 都在 y 前面（也可以没有 x 或者没有 y）。一次翻转可以将 x 变成 y 或者 y 变成 x。

其实我们只需要枚举 x 和 y 的分界点即可完成。伪代码如下：

```py
ans = n
for i in range(n):
    # 如果 i 是分界点，那么此时需要翻转多少次？假设我们求出来是需要翻转 x 次
    ans = min(ans, x)
return ans
```

初始化为 n 是因为题目的解上界是 n，不可能比 n 大。

那么问题转化为给定分界位置 i，如果求出其需要的翻转次数。其实这个翻转次数就等于是： `i左边的y的数目 + i 右边的x 的数目`。这样我们就可以先一次遍历求出 x 的总的数目，再使用一次遍历分别计算出 **i 左边的 y 的数目** 和 **i 右边的 x 的数目**即可。

## 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, s):
        x_count = y_count = 0
        ans = len(s)
        for c in s:
            x_count += c == 'x'
        for c in s:
            x_count -= c == 'x'
            ans = min(ans, x_count + y_count)
            y_count += c == 'y'
        return ans

```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(1)$

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
