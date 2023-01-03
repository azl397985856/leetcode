# 题目地址（Every Sublist Min Sum）

https://binarysearch.com/problems/Every-Sublist-Min-Sum

## 题目描述

```
You are given a list of integers nums. Return the sum of min(x) for every sublist x in nums. Mod the result by 10 ** 9 + 7.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [1, 2, 4, 3]
Output
20
Explanation
We have the following sublists and their mins:

min([1]) = 1
min([1, 2]) = 1
min([1, 2, 4]) = 1
min([1, 2, 4, 3]) = 1
min([2]) = 2
min([2, 4]) = 2
min([2, 4, 3]) = 2
min([4]) = 4
min([4, 3]) = 3
min([3]) = 3

```

## 前置知识

- 单调栈

## 公司

- 暂无

## 单调栈

### 思路

我们可以枚举得到答案。具体的枚举策略为：

- 假设以索引 0 的值为最小值且包含索引 0 的子数组个数 c0。 其对答案的贡献为 `c0 * nums[0]`
- 假设以索引 1 的值为最小值且包含索引 1 的子数组个数 c1。 其对答案的贡献为 `c1 * nums[1] `
- 。。。
- 假设以索引 n-1 的值为最小值且包含索引 n-1 的子数组个数 cn。其对答案的贡献为 `cn * nums[n-1] `

上述答案贡献之和即为最终答案。

接下来我们考虑分别如何计算上面的子贡献。

使用单调栈可以很容易地做到这一点，因为单调栈可以回答**下一个（上一个）更小（大）的元素的位置**这个问题。

对于 i 来说，我们想知道下一个更小的位置 r ，以及上一个更小的位置 l。 这样 i 对答案的贡献就是 `(r-i)*(i-l)*nums[i]`

代码上，我们处理到 i 的时候，不是计算 i 对答案的贡献，而是计算出从栈中弹出来的索引 last 对答案的贡献。这可以极大的简化代码。具体见下方代码区。

为了简化逻辑判断，我们可以使用单调栈常用的一个技巧：**虚拟元素**。这里我们可以往 nums 后面推入一个比所有 nums 的值都小的数即可。

### 关键点

- 分别计算以每一个被 pop 出来的为最小数的贡献

### 代码

代码支持：Python

Python3 Code:

```py

class Solution:
    def solve(self, nums):
        nums += [float('-inf')]
        mod = 10 ** 9 + 7
        stack = []
        ans = 0

        for i, num in enumerate(nums):
            while stack and nums[stack[-1]] > num:
                last = stack.pop()
                left = stack[-1] if stack else -1
                ans += (i - last) * (last - left) * nums[last]
            stack.append(i)
        return ans % mod

```

**复杂度分析**

令 n 为 nums 长度

- 时间复杂度：$O(n)$
- 空间复杂度：$O(n)$

大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 46K star 啦。
大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
![](https://p.ipic.vip/pjrcm6.jpg)
