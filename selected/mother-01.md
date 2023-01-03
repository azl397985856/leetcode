# 《我是你的妈妈呀》 - 第一期

记得我初中的时候，学校发的一个小册子的名字就是母题啥的。

![](https://p.ipic.vip/blev8y.jpg)

大概意思是市面上的题（尤其是中考题）都是这些母题生的，都是它们的儿子。

熟悉我的朋友应该知道，我有一个风格：”喜欢用通俗易懂的语言以及图片，还原解题过程“。包括我是如何抽象的，如何与其他题目建立联系的等。比如：

- [一招吃遍力扣四道题，妈妈再也不用担心我被套路啦～](https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/solution/yi-zhao-chi-bian-li-kou-si-dao-ti-ma-ma-zai-ye-b-6/)
- [超级详细记忆化递归，图解，带你一次攻克三道 Hard 套路题（44. 通配符匹配）](https://leetcode-cn.com/problems/wildcard-matching/solution/chao-ji-xiang-xi-ji-yi-hua-di-gui-tu-jie-dai-ni-yi/)
- [穿上衣服我就不认识你了？来聊聊最长上升子序列](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/solution/chuan-shang-yi-fu-wo-jiu-bu-ren-shi-ni-liao-lai-3/)
- [扒一扒这种题的外套（343. 整数拆分）](https://leetcode-cn.com/problems/integer-break/solution/ba-yi-ba-zhe-chong-ti-de-wai-tao-343-zheng-shu-cha/)

如果把这个思考过程称之为自顶向下的话，那么实际上能写出来取决于你：

- 是否有良好的抽象能力
- 是否有足够的基础知识
- 是否能与学过的基础知识建立联系

如果反着呢? 我先把所有抽象之后的纯粹的东西掌握，也就是母题。那么遇到新的题，我就往上套呗？这就是我在《LeetCode 题解仓库》中所说的**只有熟练掌握基础的数据结构与算法，才能对复杂问题迎刃有余。** 这种思路就是**自底向上**。（有点像动态规划?） 市面上的题那么多，但是题目类型就是那几种。甚至出题人出题的时候都是根据以前的题目变个条件，变个说法从而搞出一个“新”的题。

这个专题的目标就是从反的方向来，我们先学习和记忆底层的被抽象过的经典的题目。遇到新的题目，就往这些母题上套即可。

那让我们来自底向上看下第一期的这八道母题吧~

## 母题 1

### 题目描述

给你两个有序的非空数组 nums1 和 nums2，让你从每个数组中分别挑一个，使得二者差的绝对值最小。

### 思路

- 初始化 ans 为无限大
- 使用两个指针，一个指针指向数组 1，一个指针指向数组 2
- 比较两个指针指向的数字的大小，并更新较小的那个的指针，使其向后移动一位。更新的过程顺便计算 ans
- 最后返回 ans

### 代码

```py
def f(nums1, nums2):
    i = j = 0
    ans = float('inf')
    while i < len(nums1) and j < len(nums2):
        ans = min(ans, abs(nums1[i] - nums2[j]))
        if  nums1[i] < nums2[j]:
            i += 1
        else:
            j += 1
    return ans

```

**复杂度分析**

- 时间复杂度：$O(N)$
- 空间复杂度：$O(1)$

## 母题 2

### 题目描述

给你两个非空数组 nums1 和 nums2，让你从每个数组中分别挑一个，使得二者差的绝对值最小。

### 思路

数组没有说明是有序的，可以选择暴力。两两计算绝对值，返回最小的即可。

代码：

```py
def f(nums1, nums2):
    ans = float('inf')
    for num1 in nums1:
        for num2 in nums2:
            ans = min(ans, abs(num1 - num2))
    return ans
```

**复杂度分析**

- 时间复杂度：$O(N ^ 2)$
- 空间复杂度：$O(1)$

由于暴力的时间复杂度是 $O(N^2)$，因此其实也可以先排序将问题转换为母题 1，然后用母题 1 的解法求解。

**复杂度分析**

- 时间复杂度：$O(NlogN)$
- 空间复杂度：$O(1)$

## 母题 3

### 题目描述

给你 k 个有序的非空数组，让你从每个数组中分别挑一个，使得二者差的绝对值最小。

### 思路

继续使用母题 1 的思路，使用 k 个 指针即可。

**复杂度分析**

- 时间复杂度：$O(klogM)$，其中 M 为 k 个非空数组的长度的最小值。
- 空间复杂度：$O(1)$

我们也可以使用堆来处理，代码更简单，逻辑更清晰。这里我们使用小顶堆，作用就是选出最小值。

### 代码

```py
def f(matrix):
    ans = float('inf')
    max_value = max(nums[0] for nums in matrix)
    heap = [(nums[0], i, 0) for i, nums in enumerate(nums)]
    heapq.heapify(heap)

    while True:
        min_value, row, idx = heapq.heappop(heap)
        if max_value - min_value < ans:
            ans = max_value - min_value
        if idx == len(matrix[row]) - 1:
            break
        max_value = max(max_value, matrix[row][idx + 1])
        heapq.heappush(heap, (matrix[row][idx + 1], row, idx + 1))

    return ans


```

**复杂度分析**

建堆的时间和空间复杂度为 $O(k)$。

while 循环会执行 M 次 ，其中 M 为 k 个非空数组的长度的最小值。heappop 和 heappush 的时间复杂度都是 logk。因此 while 循环总的时间复杂度为 $O(Mlogk)$。

- 时间复杂度：$O(max(Mlogk, k))$，其中 M 为 k 个非空数组的长度的最小值。
- 空间复杂度：$O(k)$

## 母题 4

### 题目描述

给你 k 个非空数组，让你从每个数组中分别挑一个，使得二者差的绝对值最小。

### 思路

先排序，然后转换为母题 3

## 母题 5

### 题目描述

给你两个有序的非空数组 nums1 和 nums2，让你将两个数组合并，使得新的数组有序。

LeetCode 地址： https://leetcode-cn.com/problems/merge-sorted-array/

### 思路

和母题 1 类似。

### 代码

```py
def f(nums1, nums2):
    i = j = 0
    ans = []
    while i < len(nums1) and j < len(nums2):
        if nums1[i] < nums2[j]:
            ans.append(nums1[i])
            i += 1
        else:
            ans.append(nums2[j])
            j += 1
    if nums1:
        ans += nums2[j:]
    else:
        ans += nums1[i:]
    return ans
```

**复杂度分析**

- 时间复杂度：$O(N)$
- 空间复杂度：$O(1)$

## 母题 6

### 题目描述

给你 k 个有序的非空数组 nums1 和 nums2，让你将 k 个数组合并，使得新的数组有序。

### 思路

和母题 5 类似。 只不过不是两个，而是多个。我们继续套用堆的思路。

### 代码

```py
import heapq


def f(matrix):
    ans = []
    heap = []
    for row in matrix:
        heap += row
    heapq.heapify(heap)

    while heap:
        cur = heapq.heappop(heap)
        ans.append(cur)

    return ans


```

**复杂度分析**

建堆的时间和空间复杂度为 $O(N)$。

heappop 的时间复杂度为 $O(logN)$。

- 时间复杂度：$O(NlogN)$，其中 N 是矩阵中的数字总数。
- 空间复杂度：$O(N)$，其中 N 是矩阵中的数字总数。

## 母题 7

### 题目描述

给你两个有序的链表 root1 和 root2，让你将两个链表合并，使得新的链表有序。

LeetCode 地址：https://leetcode-cn.com/problems/merge-two-sorted-lists/

### 思路

和母题 5 类似。 不同的地方在于数据结构从数组变成了链表，我们只需要注意链表的操作即可。

这里我使用了迭代和递归两种方式。

> 大家可以把母题 5 使用递归写一下。

### 代码

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if not l1: return l2
        if not l2: return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 N 为两个链表中较短的那个的长度。
- 空间复杂度：$O(N)$，其中 N 为两个链表中较短的那个的长度。

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if not l1: return l2
        if not l2: return l1
        ans = cur = ListNode(0)
        while l1 and l2:
            if l1.val < l2.val:
                cur.next = l1
                cur = cur.next
                l1 = l1.next
            else:
                cur.next = l2
                cur = cur.next
                l2 = l2.next


        if l1:
            cur.next = l1
        else:
            cur.next = l2
        return ans.next
```

**复杂度分析**

- 时间复杂度：$O(N)$，其中 N 为两个链表中较短的那个的长度。
- 空间复杂度：$O(1)$

## 母题 8

### 题目描述

给你 k 个有序的链表，让你将 k 个链表合并，使得新的链表有序。

LeetCode 地址：https://leetcode-cn.com/problems/merge-k-sorted-lists/

### 思路

和母题 7 类似，我们使用递归可以轻松解决。其实本质上就是

### 代码

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if not l1: return l2
        if not l2: return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        if not lists: return None
        if len(lists) == 1: return lists[0]
        return self.mergeTwoLists(lists[0], self.mergeKLists(lists[1:]))


```

**复杂度分析**

mergeKLists 执行了 k 次，每次都执行一次 mergeTwoLists，mergeTwoLists 的时间复杂度前面已经分析过了，为 $O(N)$，其中 N 为两个链表中较短的那个的长度。

- 时间复杂度：$O(k * N)$，其中 N 为两个链表中较短的那个的长度
- 空间复杂度：$O(max(k, N))$

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if not l1: return l2
        if not l2: return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        if not lists: return None
        if len(lists) == 1: return lists[0]
        return self.mergeTwoLists(self.mergeKLists(lists[:len(lists) // 2]), self.mergeKLists(lists[len(lists) // 2:]))
```

**复杂度分析**

mergeKLists 执行了 logk 次，每次都执行一次 mergeTwoLists，mergeTwoLists 的时间复杂度前面已经分析过了，为 $O(N)$，其中 N 为两个链表中较短的那个的长度。

- 时间复杂度：$O(Nlogk)$，其中 N 为两个链表中较短的那个的长度
- 空间复杂度：$O(max(logk, N))$，其中 N 为两个链表中较短的那个的长度

## 全家福

最后送大家一张全家福：

![](https://p.ipic.vip/lhef50.jpg)

## 子题

实际子题数量有很多，这里提供几个供大家练习。一定要练习，不能眼高手低。多看我的题解，多练习，多总结，你也可以的。

- [面试题 17.14. 最小 K 个数](https://leetcode-cn.com/problems/smallest-k-lcci/)
- [1200. 最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference/)
- [632. 最小区间](https://leetcode-cn.com/problems/smallest-range-covering-elements-from-k-lists/)
- 两数和，三数和，四数和。。。 k 数和

## 总结

母题就是**抽象之后的纯粹的东西**。如果你掌握了母题，即使没有掌握抽象的能力，依然有可能套出来。但是随着题目做的变多，“抽象能力”也会越来越强。因为你知道这些题背后是怎么产生的。

本期给大家介绍了八道母题， 大家可以在之后的刷题过程中尝试使用母题来套模板。之后会给大家带来更多的母题。

大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 37K star 啦。
大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。

![](https://p.ipic.vip/cn09i2.jpg)
