## 题目地址（483. Largest Equivalent Set of Pairs）

https://binarysearch.com/problems/Largest-Equivalent-Set-of-Pairs

## 题目描述

```
Given a list of integers nums, find two sets such that their sums are equal and is maximized, and return one of the sets' sums.

Note that not all integers in nums need to be used and the two sets may be empty. A number cannot be in both of the two sets.

Constraints

n ≤ 30 where n is the length of nums
0 ≤ nums[i] ≤ 100
Example 1
Input
nums = [1, 4, 3, 5]
Output
5
Explanation
The two sets are [1, 4] and [5].
```

## 前置知识

- 动态规划

## 思路

假设题目要求我们找的两个子集分别为 A 和 B。 那么对于一个数来说，我们有三种选择：

- 将其加入 A
- 将其加入 B
- 既不加入 A，也不加入 B

> 不存在既加入 A 又加入 B 的情况。

因此我们要做的就是枚举 nums，对于每个数组执行三种操作。最终枚举完所有的数字之后，如果集合 A 和 集合 B 的和一样的，那么就返回任意一个的和即可。

一个简单的思路是分别维护两个集合的和。实际上，由于我们只关心 A 和 B 的和是否相等，而不关心其具体的值，因此我们可以维护 A 和 B 的差值。当 A 和 B 的差值为 0 的时候，说明 A 和 B 相等。

代码上，我们可以将 A 和 B 的差值 diff 作为参数传进来，而集合 A （或者 B）的和作为返回值。由于我们需要集合 A 的和尽可能大，因此我们可以将上面三种情况的最大值进行返回即可。

大家可以通过**画递归树**来直观感受这种算法。

## 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, nums):
        n = len(nums)

        @lru_cache(None)
        def dp(i, diff):
            if i == n:
                return 0 if diff == 0 else float("-inf")
            return max(
                dp(i + 1, diff),
                dp(i + 1, diff - nums[i]),
                dp(i + 1, diff + nums[i]) + nums[i],
            )

        return dp(0, 0)
```

**复杂度分析**

令 m 为数组长度， n 为最终两个子集的长度的较大者。（因为最坏的情况，我们选取的子集就是较大的）

- 时间复杂度：$O(m * n)$
- 空间复杂度：$O(m * n)$

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
