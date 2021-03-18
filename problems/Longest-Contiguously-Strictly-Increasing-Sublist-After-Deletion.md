## 题目地址（168. Longest Contiguously Strictly Increasing Sublist After Deletion）

https://binarysearch.com/problems/Longest-Contiguously-Strictly-Increasing-Sublist-After-Deletion

## 题目描述

```
Given a list of integers nums, return the maximum length of a contiguous strictly increasing sublist if you can remove one or zero elements from the list.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [30, 1, 2, 3, 4, 5, 8, 7, 22]
Output
7
Explanation
If you remove 8 in the list you can get [1, 2, 3, 4, 5, 7, 22] which is the longest, contiguous, strictly increasing list.
```

## 前置知识

- 动态规划

## 思路

出这道题就是为了让大家明白一点**对于连续性的 DP 问题通常我们的策略都是一层循环 + 一维 DP（有时候可滚动数组优化）**。比如今天这个题。

动态规划问题的关键就是：假设部分子问题已经解决了，并仅仅考虑局部，思考如何将已解决的子问题变成更大的子问题，这样就相当于向目标走进了一步。

我们可以定义状态：

- dp[i][0] 表示以 nums[i] 结尾的删除 0 个数的情况下的最长严格递增子数组。
- dp[i][1] 表示以 nums[i] 结尾的删除 1 个数的情况下的最长严格递增子数组。

> 你也可定义两个一维数组，而不是一个二维数组。比如 dp0[i] 表示以 nums[i] 结尾的删除 0 个数的情况下的最长严格递增子数组。dp1[i] 表示以 nums[i] 结尾的删除 1 个数的情况下的最长严格递增子数组

接下来，我们需要分情况讨论。

- 如果 nums[i] > nums[i-1]，那么 dp[i][0] 和 dp[i][1] 都可以在前一个的基础上 + 1。也就是：

```py
dp[i][0] = dp[i-1][0] + 1
dp[i][1] = dp[i-1][1] + 1
```

- 否则 dp[i][0] = dp[i][1] = 1

最终返回遍历过程中的 dp[i][0] 和 dp[i][1] 的最大值，用一个变量记录即可。

上面的算法少考虑了一个问题，那就是如果 nums[i] > nums[i-2]，我们其实可以选择 nums[i-1]，转而和 dp[i-2] 产生联系。也就是 dp[i][1] = dp[i-2][0] + 1。这个 1 就是将 nums[i-1] 删掉的一个操作。

需要注意的是判断 nums[i] > nums[i-2] 不是在 nums[i] <= nums[i-1] 才需要考虑的。 比如 [1,2,3.0,4] 这种情况。当遍历到 4 的时候，虽然 4 > 0，但是我们不是和 dp[i-1] 结合，这样答案就小了，而是要和 nums[i-2] 结合。

扩展一下，如果题目限定了最多删除 k 个呢？

- 首先状态中列的长度要变成 k
- 其次，我们往前比较的时候要比较 nums[i-1], nums[i-2], ... , nums[i-k-1]，取这 k + 1 种情况的最大值。

## 关键点

- 连续性 DP

## 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, nums):
        n = len(nums)
        if not n: return 0
        dp = [[1, 0] for _ in range(n)]
        ans = 1

        for i in range(1,n):
            if nums[i] > nums[i-1]:
                dp[i][0] = dp[i-1][0] + 1
                dp[i][1] = dp[i-1][1] + 1
            else:
                dp[i][0] = 1
                dp[i][1] = 1
            if i > 1 and nums[i] > nums[i-2]:
                dp[i][1] = max(dp[i][1], 1 + dp[i-2][0])
            ans = max(ans, dp[i][0], dp[i][1])

        return ans

```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
