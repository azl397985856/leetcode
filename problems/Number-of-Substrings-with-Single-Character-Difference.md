## 题目地址（941. Number of Substrings with Single Character Difference）

https://binarysearch.com/problems/Number-of-Substrings-with-Single-Character-Difference

## 题目描述

```
You are given two lowercase alphabet strings s and t. Return the number of pairs of substrings across s and t such that if we replace a single character to a different character, it becomes a substring of t.

Constraints

0 ≤ n ≤ 100 where n is the length of s
0 ≤ m ≤ 100 where m is the length of t
Example 1
Input
s = "ab"
t = "db"
Output
4
Explanation
We can have the following substrings:

"a" changed to "d"
"a" changed to "b"
"b" changed to "d"
"ab" changed to "db"
```

## 前置知识

- 动态规划

## 暴力法

### 思路

暴力的做法是枚举所有的子串 s[i:i+k] 和 s[j:j+k]，其中 0 <= i < m - k, 0 <= j < n - k, 其中 m 和 n 分别为 s 和 t 的长度。

代码上可通过两层循环固定 i 和 j，再使用一层循环确定 k，k 从 0 开始计算。

如果子串不相同的字符：

- 个数为 0 ，则继续寻找。
- 个数为 1， 我们找到了一个可行的解，计数器 + 1
- 个数大于 1，直接 break，寻找下一个子串

最后返回计数器的值即可。

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, s, t):
        ans = 0
        for i in range(len(s)):
            for j in range(len(t)):
                mismatches = 0
                for k in range(min(len(s) - i, len(t) - j)):
                    mismatches += s[i + k] != t[j + k]
                    if mismatches == 1:
                        ans += 1
                    elif mismatches > 1:
                        break
        return ans

```

**复杂度分析**

令 n 为 s 长度，m 为 t 长度。

- 时间复杂度：$O(m \times n \times min(m,n))$
- 空间复杂度：$O(1)$

## 动态规划

### 思路

实际上，我们也可通过空间换时间的方式。先对数据进行预处理，然后使用动态规划来求解。

具体来说，我们可以定义二维矩阵 prefix, prefix[i][j] 表示以 s[i] 和 t[j] 结尾的最长前缀的长度（注意我这里的前缀不一定从 s 和 t 的第一个字符开始算）。比如 s = 'qbba', t = 'abbd', 那么 prefix[3][3] 就等于 bb 的长度，也就是 2。

类似地，定义二维矩阵 suffix, suffix[i][j] 表示以 s[i] 和 t[j] 结尾的最长后缀的长度。

这样，我就可以通过两层循环固定确定 i 和 j。如果 s[i] != s[j]，我们找到了 (prefix[i-1][j-1] + 1) \* (suffix[i-1][j-1] + 1) 个符合条件的字符组合。也就是前缀+1 和后缀长度+1 的**笛卡尔积**。

### 关键点

- 建立前后缀 dp 数组，将问题转化为前后缀的笛卡尔积

### 代码

代码支持：Python3

Python3 Code:

```py

class Solution:
    def solve(self, s, t):
        m, n = len(s), len(t)
        prefix = [[0] * (n + 1) for _ in range(m + 1)]
        suffix = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s[i - 1] == t[j - 1]:
                    prefix[i][j] = prefix[i - 1][j - 1] + 1

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if s[i] == t[j]:
                    suffix[i][j] = suffix[i + 1][j + 1] + 1

        ans = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s[i - 1] != t[j - 1]:
                    ans += (prefix[i - 1][j - 1] + 1) * (suffix[i][j] + 1)
        return ans

```

**复杂度分析**

令 n 为 s 长度，m 为 t 长度。

- 时间复杂度：$O(m \times n)$
- 空间复杂度：$O(m \times n)$

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 39K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
