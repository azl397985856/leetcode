## 题目地址（820.Number Stream to Intervals）

https://binarysearch.com/problems/Number-Stream-to-Intervals

## 题目描述

```
Implement a data structure with the following methods:

StreamSummary() constructs a new instance.
add(int val) adds the number val to the instance.
int[][] get() returns a sorted list of disjoint intervals summarizing the numbers we've seen so far.
Constraints

n ≤ 10,000 where n is the number of calls to add
m ≤ 10,000 where n is the number of calls to get
Example 1
Input
methods = ["constructor", "add", "add", "add", "add", "get"]
arguments = [[], [1], [3], [2], [9], []]`
Output
[None, None, None, None, None, [
    [1, 3],
    [9, 9]
]]
Explanation
s = StreamSummary()
s.add(1)
s.add(3)
s.add(2)
s.add(9)
s.get() == [[1, 3], [9, 9]]
Example 2
Input
methods = ["constructor", "add", "add", "add", "add", "get"]
arguments = [[], [1], [2], [4], [3], []]`
Output
[None, None, None, None, None, [
    [1, 4]
]]
Explanation
s = StreamSummary()
s.add(1)
s.add(2)
s.add(4)
s.add(3)
s.get() == [[1, 4]]
```

## 前置知识

- 哈希表
- 有序哈希表
- 二分法

## 思路

这道题是给我们一个数据流。由于是流，因此不是一次性给我们的。题目的意思是每次 add 都会增加一个 [val, val] 的左右闭合的区间。如果 add 的区间**与左边或者右边能够合并**，我们需要将其合并，get 需要返回合并之后的区间总和。

以题目中的:

```py
s.add(1)
s.add(3)
s.add(2)
s.add(9)

```

为例。

我们分步看一下合并后的区间情况。

```py
s.add(1) # [ [1,1] ]
s.add(3) # [ [1,1], [3,3] ]
s.add(2) # [ [1,1], [2,2], [3,3] ] 可合并为 [ [1,3] ]
s.add(9) # [ [1,3], [9,9] ]
```

因此这个时候调用 get 会返回 `[ [1,3], [9,9] ]`。

题目意思就是这样，接下来我们只需要模拟即可。由于每次 add 都需要判断其是否会和前面的区间或者后面的区间进行合并，因此我们可以使用两个哈希表存储。

- 哈希表 start 其中 start[x] 表示以 x 为区间左端点的区间的右端点，也就是说其表示的是区间 [ x, start[x] ]。
- 哈希表 end 其中 end[x] 表示以 x 为区间右端点的区间的左端点，也就是说其表示的是区间 [ end[x], x ]。

这样 add 的时候就有四种情况：

- 仅和左边区间结合，也就是说 val - 1 在 end 中。此时 [a,val-1],[val+1,b] 可以和 [val,val] 合并为 [a,b]
- 仅和右边区间结合，也就是说 val + 1 在 start 中.此时 [val+1,b] 可以和 [val,val] 合并为 [val,b]
- 和左右边区间都结合，也就是说 val - 1 在 end 中 且 val + 1 在 start 中.此时 [a,val-1] 可以和 [val,val] 合并为 [a,val]
- 不和左右区间结合

根据上面的四种情况更新 start 和 end 即可。需要注意的是更新了区间（区间合并）之后，需要将原有的区间从哈希表移除，以免影响最终结果。

由于题目说明了 get 返回值需要是升序排序的，而普通的哈希表是乱序的。因此我们需要：

- get 部分对哈希表进行排序之后再返回

这种做法 add 时间复杂度为 $O(1)$，get 时间复杂度为 $mlogm$，m 为合并后的区间个数。

- 使用 SortedDict

由于 SortedDict 内部使用的是平衡树，因此 add 时间复杂度为 $O(logn)$， get 时间复杂度为 $O(m)$，m 为合并后的区间个数。

这两种方法都可以，大家可以根据 add 和 get 的调用频率以及 m 和 n 的大小关系决定使用哪一种。

## 代码

代码支持：Python3

Python3 Code:

```py
from sortedcontainers import SortedDict


class StreamSummary:
    def __init__(self):
        self.start = SortedDict()
        self.end = SortedDict()

    def add(self, val):
        if val - 1 in self.end and val + 1 in self.start:
            # [a, val-1] + [val,val] + [val+1, b] -> [a, b]
            self.end[self.start[val + 1]] = self.end[val - 1]
            self.start[self.end[val - 1]] = self.start[val + 1]
            del self.start[val + 1]
            del self.end[val - 1]
        elif val - 1 in self.end:
            # [a, val -1] + [val, val] -> [a, val]
            self.end[val] = self.end[val - 1]
            self.start[self.end[val]] = val
            del self.end[val - 1]
        elif val + 1 in self.start:
            # [val,val] + [val+1, b] -> [val, b]
            self.start[val] = self.start[val + 1]
            self.end[self.start[val]] = val
            del self.start[val + 1]
        else:
            self.start[val] = val
            self.end[val] = val

    def get(self):
        # iterate start or end get same correct answer
        ans = []
        for s, e in self.start.items():
            ans.append([s, e])
        return ans

```

**复杂度分析**

令 n 为数据流长度，m 为合并后的区间个数。

- 时间复杂度：add 时间复杂度为 $O(logn)$， get 时间复杂度为 $O(m)$
- 空间复杂度：$O(m)$

力扣的小伙伴可以[关注我](https://leetcode-cn.com/u/fe-lucifer/)，这样就会第一时间收到我的动态啦~

以上就是本文的全部内容了。大家对此有何看法，欢迎给我留言，我有时间都会一一查看回答。更多算法套路可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 39K star 啦。大家也可以关注我的公众号《力扣加加》带你啃下算法这块硬骨头。
