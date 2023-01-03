## 题目地址(16.16. 部分排序)

https://leetcode-cn.com/problems/sub-sort-lcci/

## 题目描述

```
给定一个整数数组，编写一个函数，找出索引m和n，只要将索引区间[m,n]的元素排好序，整个数组就是有序的。注意：n-m尽量最小，也就是说，找出符合条件的最短序列。函数返回值为[m,n]，若不存在这样的m和n（例如整个数组是有序的），请返回[-1,-1]。

示例：

输入： [1,2,4,7,10,11,7,12,6,7,16,18,19]
输出： [3,9]


提示：

0 <= len(array) <= 1000000
```

## 前置知识

- 无

## 公司

- 暂无

## 思路

这道题让我排序子数组，使得整体数组是有序的。

那么我们其实可以：

- 从左往右进行一次遍历
- 遍历到的项（不妨称其为 a ）如果可以在前面找到比它还大的（不妨称其为 b），那么显然我们**至少**需要对 b 到 a 之前的所有数进行排序。否则我们无法得到有序数组。

同样地，我们还需要：

- 从右到左进行一次遍历
- 遍历到的项（不妨称其为 a ）如果可以在后面找到比它还大的（不妨称其为 b），那么显然我们**至少**需要对 a 到 b 之前的所有数进行排序。否则我们无法得到有序数组。

据此，我们可以写出代码（参见代码区）。

## 关键点

- 两次遍历

## 代码

- 语言支持：Python3

Python3 Code:

```python

class Solution:
    def subSort(self, A: List[int]) -> List[int]:
        max_v, min_v = float('-inf'), float('inf')
        right = left = -1
        for i in range(len(A)):
            if A[i] < max_v:
                right = i
            max_v = max(max_v, A[i])
        for i in range(len(A) - 1, -1, -1):
            if A[i] > min_v:
                left = i
            min_v = min(min_v, A[i])
        return [-1,-1] if right - left == len(A) - 1 else [left, right]


```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：$O(n)$
- 空间复杂度：$O(1)$

> 此题解由 [力扣刷题插件](https://leetcode-pp.github.io/leetcode-cheat/?tab=solution-template) 自动生成。

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

![](https://p.ipic.vip/3apc01.jpg)
