# 穿上衣服我就不认识你了？来聊聊最长上升子序列

最长上升子序列是一个很经典的算法题。有的会直接让你求最长上升子序列，有的则会换个说法，但最终考察的还是最长上升子序列。那么问题来了，它穿上衣服你还看得出来是么？

如果你完全看不出来了，说明抽象思维还不到火候。经常看我的题解的同学应该会知道，我经常强调`抽象思维`。没有抽象思维，所有的题目对你来说都是新题。你无法将之前做题的经验迁移到这道题，那你做的题意义何在？

虽然抽象思维很难练成，但是幸好算法套路是有限的，经常考察的题型更是有限的。从这些入手，或许可以让你轻松一些。本文就从一个经典到不行的题型《最长上升子序列》，来帮你进一步理解`抽象思维`。

> 注意。 本文是帮助你识别套路，从横向上理清解题的思维框架，并没有采用最优解，所有的题目给的解法都不是最优的，但是都可以通过所有的测试用例。如果你想看最优解，可以直接去讨论区看。或者期待我的`深入剖析系列`。

## 300. 最长上升子序列

### 题目地址

https://leetcode-cn.com/problems/longest-increasing-subsequence

### 题目描述

```
给定一个无序的整数数组，找到其中最长上升子序列的长度。

示例:

输入: [10,9,2,5,3,7,101,18]
输出: 4
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
说明:

可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
你算法的时间复杂度应该为 O(n2) 。
进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?

```

### 思路

> 美团和华为都考了这个题。

题目的意思是让我们从给定数组中挑选若干数字，这些数字满足： `如果 i < j 则 nums[i] < nums[j]`。问：一次可以挑选最多满足条件的数字是多少个。

![](https://p.ipic.vip/7tda84.jpg)

这种子序列求极值的题目，应该要考虑到贪心或者动态规划。这道题贪心是不可以的，我们考虑动态规划。

按照动态规划定义状态的套路，我们有**两种常见**的定义状态的方式：

- dp[i] : 以 i 结尾（一定包括 i）所能形成的最长上升子序列长度, 答案是 max(dp[i])，其中 i = 0,1,2, ..., n - 1
- dp[i] : 以 i 结尾（可能包括 i）所能形成的最长上升子序列长度，答案是 dp[-1] （-1 表示最后一个元素）

容易看出第二种定义方式由于无需比较不同的 dp[i] 就可以获得答案，因此更加方便。但是想了下，状态转移方程会很不好写，因为 dp[i] 的末尾数字（最大的）可能是 任意 j < i 的位置。

第一种定义方式虽然需要比较不同的 dp[i] 从而获得结果，但是我们可以在循环的时候顺便得出，对复杂度不会有影响，只是代码多了一点而已。因此我们**选择第一种建模方式**。

![](https://p.ipic.vip/itmnki.jpg)

由于 dp[j] 中一定会包括 j，且以 j 结尾， 那么 nums[j] 一定是其所形成的序列中最大的元素，那么如果位于其后（意味着 i > j）的 nums[i] > nums[j]，那么 nums[i] 一定能够融入 dp[j] 从而形成更大的序列，这个序列的长度是 dp[j] + 1。因此状态转移方程就有了：`dp[i] = dp[j] + 1 (其中 i > j, nums[i] > nums[j])`

以 `[10, 9, 2, 5, 3, 7, 101, 18]` 为例，当我们计算到 dp[5]的时候，我们需要往回和 0，1，2，3，4 进行比较。

![](https://p.ipic.vip/iro5el.jpg)

具体的比较内容是：

![](https://p.ipic.vip/802b59.jpg)

最后从三个中选一个最大的 + 1 赋给 dp[5]即可。

![](https://p.ipic.vip/kcy9j7.jpg)

**记住这个状态转移方程，后面我们还会频繁用到。**

### 代码

```py
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 0: return 0
        dp = [1] * n
        ans = 1
        for i in range(n):
            for j in range(i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)
                    ans = max(ans, dp[i])
        return  ans
```

**复杂度分析**

- 时间复杂度：$O(N ^ 2)$
- 空间复杂度：$O(N)$

## 435. 无重叠区间

### 题目地址

https://leetcode-cn.com/problems/non-overlapping-intervals/

### 题目描述

```
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意:

可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
示例 1:

输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
示例 2:

输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
示例 3:

输入: [ [1,2], [2,3] ]

输出: 0

解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

```

### 思路

我们先来看下最终**剩下**的区间。由于剩下的区间都是不重叠的，因此剩下的**相邻区间的后一个区间的开始时间一定是不小于前一个区间的结束时间的**。 比如我们剩下的区间是`[ [1,2], [2,3], [3,4] ]`。就是第一个区间的 2 小于等于 第二个区间的 2，第二个区间的 3 小于等于第三个区间的 3。

不难发现如果我们将`前面区间的结束`和`后面区间的开始`结合起来看，其就是一个**非严格递增序列**。而我们的目标就是删除若干区间，从而**剩下最长的非严格递增子序列**。这不就是上面的题么？只不过上面是严格递增，这不重要，就是改个符号的事情。 上面的题你可以看成是删除了若干数字，然后**剩下最长的严格递增子序列**。 **这就是抽象的力量，这就是套路。**

如果对区间按照起点或者终点进行排序，那么就转化为上面的最长递增子序列问题了。和上面问题不同的是，由于是一个区间。因此实际上，我们是需要拿**后面的开始时间**和**前面的结束时间**进行比较。

![](https://p.ipic.vip/a6eh13.jpg)

而由于：

- 题目求的是需要移除的区间，因此最后 return 的时候需要做一个转化。
- 题目不是要求严格递增，而是可以相等，因此我们的判断条件要加上等号。

> 这道题还有一种贪心的解法，其效率要比动态规划更好，但由于和本文的主题不一致，就不在这里讲了。

### 代码

**你看代码多像**

```py
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        n = len(intervals)
        if n == 0: return 0
        dp = [1] * n
        ans = 1
        intervals.sort(key=lambda a: a[0])

        for i in range(len(intervals)):
            for j in range(i - 1, -1, -1):
                if intervals[i][0] >= intervals[j][1]:
                    dp[i] = max(dp[i], dp[j] + 1)
                    break # 由于是按照开始时间排序的, 因此可以剪枝

        return n - max(dp)
```

**复杂度分析**

- 时间复杂度：$O(N ^ 2)$
- 空间复杂度：$O(N)$

## 646. 最长数对链

### 题目地址

https://leetcode-cn.com/problems/maximum-length-of-pair-chain/

### 题目描述

```
给出 n 个数对。 在每一个数对中，第一个数字总是比第二个数字小。

现在，我们定义一种跟随关系，当且仅当 b < c 时，数对(c, d) 才可以跟在 (a, b) 后面。我们用这种形式来构造一个数对链。

给定一个对数集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。

示例 :

输入: [[1,2], [2,3], [3,4]]
输出: 2
解释: 最长的数对链是 [1,2] -> [3,4]
注意：

给出数对的个数在 [1, 1000] 范围内。

```

### 思路

和上面的`435. 无重叠区间`是换皮题，唯一的区别这里又变成了严格增加。没关系，我们把等号去掉就行了。并且由于这道题求解的是最长的长度，因此转化也不需要了。

> 当然，这道题也有一种贪心的解法，其效率要比动态规划更好，但由于和本文的主题不一致，就不在这里讲了。

### 代码

**这代码更像了！**

```py
class Solution:
    def findLongestChain(self, intervals: List[List[int]]) -> int:
        n = len(intervals)
        if n == 0: return 0
        dp = [1] * n
        ans = 1
        intervals.sort(key=lambda a: a[0])

        for i in range(len(intervals)):
            for j in range(i - 1, -1, -1):
                if intervals[i][0] > intervals[j][1]:
                    dp[i] = max(dp[i], dp[j] + 1)
                    break # 由于是按照开始时间排序的, 因此可以剪枝

        return max(dp)
```

**复杂度分析**

- 时间复杂度：$O(N ^ 2)$
- 空间复杂度：$O(N)$

## 452. 用最少数量的箭引爆气球

### 题目地址

https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/

### 题目描述

```
在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以y坐标并不重要，因此只要知道开始和结束的x坐标就足够了。开始坐标总是小于结束坐标。平面内最多存在104个气球。

一支弓箭可以沿着x轴从不同点完全垂直地射出。在坐标x处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

Example:

输入:
[[10,16], [2,8], [1,6], [7,12]]

输出:
2

解释:
对于该样例，我们可以在x = 6（射爆[2,8],[1,6]两个气球）和 x = 11（射爆另外两个气球）。

```

### 思路

把气球看成区间，几个箭可以全部射爆，意思就是有多少不重叠的区间。注意这里重叠的情况也可以射爆。这么一抽象，就和上面的`646. 最长数对链`一模一样了，不用我多说了吧？

> 当然，这道题也有一种贪心的解法，其效率要比动态规划更好，但由于和本文的主题不一致，就不在这里讲了。

### 代码

**代码像不像？**

```py
class Solution:
    def findMinArrowShots(self, intervals: List[List[int]]) -> int:
        n = len(intervals)
        if n == 0: return 0
        dp = [1] * n
        ans = 1
        intervals.sort(key=lambda a: a[0])

        for i in range(len(intervals)):
            for j in range(i - 1, -1, -1):
                if intervals[i][0] > intervals[j][1]:
                    dp[i] = max(dp[i], dp[j] + 1)
                    break # 由于是按照开始时间排序的, 因此可以剪枝

        return max(dp)
```

**复杂度分析**

- 时间复杂度：$O(N ^ 2)$
- 空间复杂度：$O(N)$

## 优化

大家想看效率高的，其实也不难。 LIS 也可以用 **贪心 + 二分** 达到不错的效率。代码如下：

![](https://p.ipic.vip/zt3tzj.jpg)

代码文字版如下：

```py
class Solution:
    def lengthOfLIS(self, A: List[int]) -> int:
        d = []
        for a in A:
            i = bisect.bisect_left(d, a)
            if i < len(d):
                d[i] = a
            elif not d or d[-1] < a:
                d.append(a)
        return len(d)
```

如果求最长不递减子序列呢？

我们只需要将最左插入改为最右插入即可。代码：

```py
class Solution:
    def lengthOfLIS(self, A: List[int]) -> int:
        d = []
        for a in A:
            # 这里改为最右
            i = bisect.bisect(d, a)
            if i < len(d):
                d[i] = a
            # 这里改为小于等号
            elif not d or d[-1] <= a:
                d.append(a)
        return len(d)
```

最左插入和最右插入分不清的可以看看我的二分专题。

也可以这么写，更简单一点：

```py
def LIS(A):
    d = []
    for a in A:
        # 如果求要严格递增就改为最左插入 bisect_left 即可
        i = bisect.bisect(d, a)
        if i == len(d):
            d.append(a)
        elif d[i] != a:
            d[i] = a
    return len(d)
```

## More

其他的我就不一一说了。

比如 [673. 最长递增子序列的个数](https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/) （滴滴面试题）。 不就是求出最长序列，之后再循环比对一次就可以得出答案了么？

[491. 递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/) 由于需要找到所有的递增子序列，因此动态规划就不行了，妥妥回溯就行了，套一个模板就出来了。回溯的模板可以看我之前写的[回溯专题](https://github.com/azl397985856/leetcode/blob/master/problems/90.subsets-ii.md "回溯专题")。

最后推荐两道题大家练习一下，别看它们是 hard， 其实掌握了我这篇文章的内容一点都不难。

- [面试题 08.13. 堆箱子](https://leetcode-cn.com/problems/pile-box-lcci/)

参考代码：

```py
class Solution:
    def pileBox(self, box: List[List[int]]) -> int:
        box = sorted(box, key=sorted)
        n = len(box)
        dp = [0 if i == 0 else box[i - 1][2] for i in range(n + 1)]
        ans = max(dp)

        for i in range(1, n + 1):
            for j in range(i + 1, n + 1):
                if box[j - 1][0] > box[i - 1][0] and box[j - 1][1] > box[i - 1][1] and box[j - 1][2] > box[i - 1][2]:
                    dp[j] = max(dp[j], dp[i] + box[j - 1][2])
                    ans = max(ans , dp[j])
        return ans
```

- [354. 俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/)

参考代码：

```py
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        if not envelopes: return 0
        n = len(envelopes)
        dp = [1] * n
        envelopes.sort()
        for i in range(n):
            for j in range(i + 1, n):
                if envelopes[i][0] < envelopes[j][0] and envelopes[i][1] < envelopes[j][1]:
                    dp[j] = max(dp[j], dp[i] + 1)
        return max(dp)
```

- [960. 删列造序 III](https://leetcode-cn.com/problems/delete-columns-to-make-sorted-iii/)

参考代码：

```py
class Solution:
    def minDeletionSize(self, A):
        keep = 1
        m, n = len(A), len(A[0])
        dp = [1] * n
        for j in range(n):
            for k in range(j + 1, n):
                if all([A[i][k] >= A[i][j] for i in range(m)]):
                    dp[k] = max(dp[k], dp[j] + 1)
                    keep = max(keep, dp[k])
        return n - keep
```

> 小任务：请尝试使用贪心在 NlogN 的时间内完成算法。（参考我上面的代码就行）

- [5644. 得到子序列的最少操作次数](https://leetcode-cn.com/problems/minimum-operations-to-make-a-subsequence/)

由于这道题数据范围是 $10^5$，因此只能使用 $NlogN$ 的贪心才行。

> 关于为什么 10 ^ 5 就必须使用 $NlogN$ 甚至更优的算法我在[刷题技巧](https://lucifer.ren/blog/2020/12/21/shuati-silu3/)提过。更多复杂度速查可参考我的刷题插件，公众号《力扣加加》回复插件获取即可。

参考代码：

```py
class Solution:
    def minOperations(self, target: List[int], A: List[int]) -> int:
        def LIS(A):
            d = []
            for a in A:
                i = bisect.bisect_left(d, a)
                if d and i < len(d):
                    d[i] = a
                else:
                    d.append(a)
            return len(d)
        B = []
        target = { t:i for i, t in enumerate(target)}
        for a in A:
            if a in target: B.append(target[a])
        return len(target) - LIS(B)
```

- [1626. 无矛盾的最佳球队](https://leetcode-cn.com/problems/best-team-with-no-conflicts/)

不就是先排下序，然后求 scores 的最长上升子序列么？

参考代码：

```py
class Solution:
    def bestTeamScore(self, scores: List[int], ages: List[int]) -> int:
        n = len(scores)
        persons = list(zip(ages, scores))
        persons.sort(key=lambda x : (x[0], x[1]))
        dp = [persons[i][1] for i in range(n)]
        for i in range(n):
            for j in range(i):
                if persons[i][1] >= persons[j][1]:
                    dp[i] = max(dp[i], dp[j]+persons[i][1])
        return max(dp)
```

再比如 [这道题](https://binarysearch.com/problems/Circular-Longest-Increasing-Subsequence) 无非就是加了一个条件，我们可以结合循环移位的技巧来做。

> 关于循环移位算法西法在之前的文章 [文科生都能看懂的循环移位算法](https://lucifer.ren/blog/2020/02/20/rotate-list/) 也做了详细讲解，不再赘述。

参考代码：

```py
class Solution:
    def solve(self, nums):
        n = len(nums)
        ans = 1
        def LIS(A):
            d = []
            for a in A:
                i = bisect.bisect_left(d,a)
                if i == len(d): d.append(a)
                else: d[i] = a
            return len(d)
        nums += nums
        for i in range(n):
            ans = max(ans , LIS(nums[i:i+n]))
        return ans
```

大家把我讲的思路搞懂，这几个题一写，还怕碰到类似的题不会么？**只有熟练掌握基础的数据结构与算法，才能对复杂问题迎刃有余。** 最长上升子序列就是一个非常经典的基础算法，把它彻底搞懂，再去面对出题人的各种换皮就不怕了。相反，如果你不去思考题目背后的逻辑，就会刷地很痛苦。题目稍微一变化你就不会了，这也是为什么很多人说**刷了很多题，但是碰到新的题目还是不会做**的原因之一。关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 38K star 啦。

![](https://p.ipic.vip/ninoev.jpg)
