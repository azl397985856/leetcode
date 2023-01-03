# 《我的日程安排表》系列

《我的日程安排表》截止目前（2020-02-03）在 LeetCode 上一共有三道题，其中两个中等难度，一个困难难度,分别是：

- [729. 我的日程安排表 I](https://leetcode-cn.com/problems/my-calendar-i)
- [731. 我的日程安排表 II](https://leetcode-cn.com/problems/my-calendar-ii)
- [732. 我的日程安排表 III](https://leetcode-cn.com/problems/my-calendar-iii)

另外 LeetCode 上有一个类似的系列《会议室》，截止目前（2020-02-03）有两道题目。其中一个简单一个中等，分别是：

- [252. 会议室](https://leetcode-cn.com/problems/meeting-rooms/)
- [253. 会议室 II](https://leetcode-cn.com/problems/meeting-rooms-ii/)

今天我们就来攻克它们。

# 729. 我的日程安排表 I

## 题目地址

https://leetcode-cn.com/problems/my-calendar-i

## 题目描述

实现一个 MyCalendar 类来存放你的日程安排。如果要添加的时间内没有其他安排，则可以存储这个新的日程安排。

MyCalendar 有一个 book(int start, int end)方法。它意味着在 start 到 end 时间内增加一个日程安排，注意，这里的时间是半开区间，即 [start, end), 实数  x 的范围为，  start <= x < end。

当两个日程安排有一些时间上的交叉时（例如两个日程安排都在同一时间内），就会产生重复预订。

每次调用 MyCalendar.book 方法时，如果可以将日程安排成功添加到日历中而不会导致重复预订，返回 true。否则，返回 false  并且不要将该日程安排添加到日历中。

请按照以下步骤调用 MyCalendar 类: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)

示例 1:

MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(15, 25); // returns false
MyCalendar.book(20, 30); // returns true
解释:
第一个日程安排可以添加到日历中. 第二个日程安排不能添加到日历中，因为时间 15 已经被第一个日程安排预定了。
第三个日程安排可以添加到日历中，因为第一个日程安排并不包含时间 20 。
说明:

每个测试用例，调用  MyCalendar.book  函数最多不超过  100 次。
调用函数  MyCalendar.book(start, end)时， start 和  end 的取值范围为  [0, 10^9]。

## 暴力法

### 思路

首先我们考虑暴力法。每插入一个元素我们都判断其是否和已有的`所有`课程重叠。

我们定一个函数`intersected(calendar, calendars)`，其中 calendar 是即将要插入的课程，calendars 是已经插入的课程。 只要 calendar 和 calendars 中的任何一个课程有交叉，我们就返回 True，否则返回 False。

对于两个 calendar，我们的判断逻辑都是一样的。假设连个 calendar 分别是`[s1, e1]`和`[s2, e2]`。那么如果`s1 >= e2 or s2 <= e1`, 则两个课程没有交叉，可以预定，否则不可以。如图，1，2，3 可以预定，剩下的不可以。

![image.png](https://p.ipic.vip/f1rf2b.jpg)

代码是这样的：

```python
    def intersected(calendar, calendars):
        for [start, end] in calendars:
            if calendar[0] >= end or calendar[1] <= start:
                continue
            else:
                return True

        return False
```

复杂度分析：

- 时间复杂度：$O(N^2)$。N 指的是日常安排的数量，对于每个新的日常安排，我们检查新的日常安排是否发生冲突来决定是否可以预订新的日常安排。

- 空间复杂度: $O(N)$。

这个代码写出来之后整体代码就呼之欲出了，全部代码见下方代码部分。

### 代码

代码支持 Python3:

Python3 Code:

```python
#
# @lc app=leetcode.cn id=729 lang=python3
#
# [729] 我的日程安排表 I
#

# @lc code=start


class MyCalendar:

    def __init__(self):
        self.calendars = []

    def book(self, start: int, end: int) -> bool:
        def intersected(calendar, calendars):
            for [start, end] in calendars:
                if calendar[0] >= end or calendar[1] <= start:
                    continue
                else:
                    return True

            return False
        if intersected([start, end], self.calendars):
            return False
        self.calendars.append([start, end])
        return True

        # Your MyCalendar object will be instantiated and called as such:
        # obj = MyCalendar()
        # param_1 = obj.book(start,end)
        # @lc code=end
```

实际上我们还可以换个角度，上面的思路判断交叉部分我们考虑的是“如何不交叉”，剩下的就是交叉。我们也可以直接考虑交叉。还是上面的例子，如果两个课程交叉，那么一定满足`s1 < e2 and e1 > s2`。基于此，我们写出下面的代码。

代码支持 Python3:

Python3 Code:

```python
#
# @lc app=leetcode.cn id=729 lang=python3
#
# [729] 我的日程安排表 I
#

# @lc code=start


class MyCalendar:

    def __init__(self):
        self.calendars = []

    def book(self, start: int, end: int) -> bool:
        for s, e in self.calendars:
            if start < e and end > s:
                return False
        self.calendars.append([start, end])
        return True

        # Your MyCalendar object will be instantiated and called as such:
        # obj = MyCalendar()
        # param_1 = obj.book(start,end)
        # @lc code=end
```

## 二叉查找树法

### 思路

和上面思路类似，只不过我们每次都对 calendars 进行排序，那么我们可以通过二分查找日程安排的情况来检查新日常安排是否可以预订。如果每次插入之前都进行一次排序，那么时间复杂度会很高。如图，我们的[s1,e1], [s2,e2], [s3,e3] 是按照时间顺序排好的日程安排。我们现在要插入[s,e],我们使用二分查找，找到要插入的位置，然后和插入位置的课程进行一次比对即可，这部分的时间复杂度是 $O(logN)$。

![image.png](https://p.ipic.vip/u4fegk.jpg)

我们考虑使用平衡二叉树来维护这种动态的变化，在最差的情况时间复杂度会退化到上述的$O(N^2)$，平均情况是$O(NlogN)$，其中 N 是已预订的日常安排数。

![image.png](https://p.ipic.vip/jis4ob.jpg)

### 代码

代码支持 Python3:

Python3 Code:

```python
class Node:
    def __init__(self, start, end):
        self.start = start
        self.end = end
        self.left = self.right = None

    def insert(self, node):
        if node.start >= self.end:
            if not self.right:
                self.right = node
                return True
            return self.right.insert(node)
        elif node.end <= self.start:
            if not self.left:
                self.left = node
                return True
            return self.left.insert(node)
        else:
            return False

class MyCalendar(object):
    def __init__(self):
        self.root = None

    def book(self, start, end):
        if self.root is None:
            self.root = Node(start, end)
            return True
        return self.root.insert(Node(start, end))

```

# 731. 我的日程安排表 II

## 题目地址

https://leetcode-cn.com/problems/my-calendar-ii

## 题目描述

实现一个 MyCalendar 类来存放你的日程安排。如果要添加的时间内不会导致三重预订时，则可以存储这个新的日程安排。

MyCalendar 有一个 book(int start, int end)方法。它意味着在 start 到 end 时间内增加一个日程安排，注意，这里的时间是半开区间，即 [start, end), 实数  x 的范围为，  start <= x < end。

当三个日程安排有一些时间上的交叉时（例如三个日程安排都在同一时间内），就会产生三重预订。

每次调用 MyCalendar.book 方法时，如果可以将日程安排成功添加到日历中而不会导致三重预订，返回 true。否则，返回 false 并且不要将该日程安排添加到日历中。

请按照以下步骤调用 MyCalendar 类: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)

示例：

MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(50, 60); // returns true
MyCalendar.book(10, 40); // returns true
MyCalendar.book(5, 15); // returns false
MyCalendar.book(5, 10); // returns true
MyCalendar.book(25, 55); // returns true
解释：
前两个日程安排可以添加至日历中。 第三个日程安排会导致双重预订，但可以添加至日历中。
第四个日程安排活动（5,15）不能添加至日历中，因为它会导致三重预订。
第五个日程安排（5,10）可以添加至日历中，因为它未使用已经双重预订的时间 10。
第六个日程安排（25,55）可以添加至日历中，因为时间 [25,40] 将和第三个日程安排双重预订；
时间 [40,50] 将单独预订，时间 [50,55）将和第二个日程安排双重预订。

提示：

每个测试用例，调用  MyCalendar.book  函数最多不超过  1000 次。
调用函数  MyCalendar.book(start, end)时， start 和  end 的取值范围为  [0, 10^9]。

## 暴力法

### 思路

暴力法和上述思路类似。但是我们多维护一个数组 intersectedCalendars 用来存储**二次预定**的日程安排。如果课程第一次冲突，我们将其加入 intersectedCalendars，如果和 intersectedCalendars 也冲突了，说明出现了三次预定，我们直接返回 False。

### 代码

代码支持 Python3:

Python3 Code:

```python
class MyCalendarTwo:

    def __init__(self):
        self.calendars = []
        self.intersectedCalendars = []

    def book(self, start: int, end: int) -> bool:
        for [s, e] in self.intersectedCalendars:
            if start < e and end > s:
                return False
        for [s, e] in self.calendars:
            if start < e and end > s:
                self.intersectedCalendars.append([max(start, s), min(end, e)])
        self.calendars.append([start, end])
        return True
```

## 二叉查找树法

和上面的题目类似，我们仍然可以使用平衡二叉树来简化查找逻辑。具体可以参考[这个 discussion](<https://leetcode.com/problems/my-calendar-ii/discuss/158747/Python-O(logN)>)

每次插入之前我们都需要进行一次判断，判断是否可以插入。如果不可以插入，直接返回 False，否则我们进行一次插入。 插入的时候，如果和已有的相交了，我们判断是否之前已经相交了一次，如果是返回 False，否则返回 True。关于**如何判断是否和已有的相交**，我们可以在 node 节点增加一个字段的方式来标记，在这里我们使用 single_overlap，True 表示产生了二次预定，False 则表示没有产生过两次及以上的预定。

## 代码

代码支持 Python3:

Python3 Code:

```python
class Node:
    def __init__(self, start, end):
        self.start = start
        self.end = end
        self.left = None
        self.right = None
        self.single_overlap = False

class MyCalendarTwo:

    def __init__(self):
        self.root = None

    def book(self, start, end):
        if not self.canInsert(start, end, self.root):
            return False

        self.root = self.insert(start, end, self.root)
        return True


    def canInsert(self, start, end, root):
        if not root:
            return True

        if start >= end:
            return True

        if end <= root.start:
            return self.canInsert(start, end, root.left)

        elif start >= root.end:
            return self.canInsert(start, end, root.right)

        else:
            if root.single_overlap:
                return False
            elif start >= root.start and end <= root.end:
                return True
            else:
                return self.canInsert(start, root.start, root.left) and self.canInsert(root.end, end, root.right)



    def insert(self, start, end, root):
        if not root:
            root = Node(start, end)
            return root

        if start >= end:
            return root

        if start >= root.end:
            root.right = self.insert(start, end, root.right)

        elif end <= root.start:
            root.left = self.insert(start, end, root.left)

        else:
            root.single_overlap = True
            a = min(root.start, start)
            b = max(root.start, start)
            c = min(root.end, end)
            d = max(root.end, end)
            root.start, root.end = b, c
            root.left, root.right = self.insert(a, b, root.left), self.insert(c, d, root.right)

        return root

# Your MyCalendarTwo object will be instantiated and called as such:
# obj = MyCalendarTwo()
# param_1 = obj.book(start,end)
```

# 732. 我的日程安排表 III

## 题目地址

https://leetcode-cn.com/problems/my-calendar-iii/

## 题目描述

实现一个 MyCalendar 类来存放你的日程安排，你可以一直添加新的日程安排。

MyCalendar 有一个 book(int start, int end)方法。它意味着在 start 到 end 时间内增加一个日程安排，注意，这里的时间是半开区间，即 [start, end), 实数  x 的范围为，  start <= x < end。

当 K 个日程安排有一些时间上的交叉时（例如 K 个日程安排都在同一时间内），就会产生 K 次预订。

每次调用 MyCalendar.book 方法时，返回一个整数 K ，表示最大的 K 次预订。

请按照以下步骤调用 MyCalendar 类: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)

示例 1:

MyCalendarThree();
MyCalendarThree.book(10, 20); // returns 1
MyCalendarThree.book(50, 60); // returns 1
MyCalendarThree.book(10, 40); // returns 2
MyCalendarThree.book(5, 15); // returns 3
MyCalendarThree.book(5, 10); // returns 3
MyCalendarThree.book(25, 55); // returns 3
解释:
前两个日程安排可以预订并且不相交，所以最大的 K 次预订是 1。
第三个日程安排[10,40]与第一个日程安排相交，最高的 K 次预订为 2。
其余的日程安排的最高 K 次预订仅为 3。
请注意，最后一次日程安排可能会导致局部最高 K 次预订为 2，但答案仍然是 3，原因是从开始到最后，时间[10,20]，[10,40]和[5,15]仍然会导致 3 次预订。
说明:

每个测试用例，调用  MyCalendar.book  函数最多不超过  400 次。
调用函数  MyCalendar.book(start, end)时， start 和  end 的取值范围为  [0, 10^9]。

## 二叉查找树法

### 思路

我们仍然可以使用上述的平衡二叉树的做法。只不过我们需要额外维护一个全局的最大值“k”，表示需要多少个预定。最终我们返回 k。 同时每一个 node 我们都增加一个属性 k，用来表示局部的最大值，对于每次插入，我们将 node 的 k 和全部的 k 进行比较，取出最大值即可。

### 代码

代码支持 Python3:

Python3 Code:

```python

class Node(object):
    def __init__(self, start, end, ktime=1):
        self.k = ktime
        self.s = start
        self.e = end
        self.right = None
        self.left = None

class MyCalendarThree(object):

    def __init__(self):
        self.root = None
        self.k = 0

    def book(self, start, end):
        self.root = self.insert(self.root, start, end, 1)
        return self.k
    def insert(self, root, start, end, k):
        if start >= end:
            return root
        if not root:
            self.k = max(self.k, k)
            return Node(start, end, k)
        else:
            if start >= root.e:
                root.right = self.insert(root.right, start, end, k)
                return root
            elif end <= root.s:
                root.left = self.insert(root.left, start, end, k)
                return root
            else:

                a = min(root.s, start)
                b = max(root.s, start)
                c = min(root.e, end)
                d = max(root.e, end)

                root.left = self.insert(root.left, a, b, a == root.s and root.k or k)
                root.right = self.insert(root.right, c,d, d == root.e and root.k or k)
                root.k += k
                root.s = b
                root.e = c
                self.k = max(root.k, self.k)
                return root

```

## Count Map 法

### 思路

这个是我在看了 Discussion [[C++] Map Solution, beats 95%+](https://leetcode.com/problems/my-calendar-iii/discuss/176950/C%2B%2B-Map-Solution-beats-95%2B) 之后写的解法，解法非常巧妙。

我们使用一个 count map 来存储所有的预定，对于每次插入，我们执行`count[start] += 1`和`count[end] -= 1`。 count[t] 表示从 t 开始到下一个 t 我们有几个预定。因此我们需要对 count 进行排序才行。 我们维护一个最大值来 cnt 来表示需要的预定数。

比如预定[1,3]和[5,7]，我们产生一个预定即可：

![image.png](https://p.ipic.vip/ctg91m.jpg)

再比如预定[1,5]和[3,7]，我们需要两个预定：

![image.png](https://p.ipic.vip/ouazzy.jpg)

我们可以使用红黑树来简化时间复杂度，如果你使用的是 Java，可以直接使用现成的数据结构 TreeMap。我这里偷懒，每次都排序，时间复杂度会很高，但是可以 AC。

读到这里，你可能会发现： 这个解法似乎更具有通用型。对于第一题我们可以判断 cnt 是否小于等于 1，对于第二题我们可以判断 cnt 是否小于等于 2。

> 如果你不借助红黑树等数据结构直接使用 count-map 法，即每次都进行一次排序，第一题和第二题可能会直接超时。

### 代码

代码支持 Python3:

Python3 Code:

```python
class MyCalendarThree:

    def __init__(self):
        self.count = dict()

    def book(self, start: int, end: int) -> int:
        self.count[start] = self.count.get(start, 0) + 1
        self.count[end] = self.count.get(end, 0) - 1
        cnt = 0
        cur = 0

        for k in sorted(self.count):
            cur += self.count[k]
            cnt = max(cnt, cur)
        return cnt

        # Your MyCalendarThree object will be instantiated and called as such:
        # obj = MyCalendarThree()
        # param_1 = obj.book(start,end)
```

# 相关题目

LeetCode 上有一个类似的系列《会议室》，截止目前（2020-02-03）有两道题目。其中一个简单一个中等，解题思路非常类似，大家用这个解题思路尝试一下，检测一下自己是否已经掌握。两道题分别是：

- [252. 会议室](https://leetcode-cn.com/problems/meeting-rooms/)
- [253. 会议室 II](https://leetcode-cn.com/problems/meeting-rooms-ii/)

# 总结

我们对 LeetCode 上的专题《我的日程安排》的三道题进行了汇总。对于区间判断是否重叠，我们可以反向判断，也可以正向判断。 暴力的方法是每次对所有的课程进行判断是否重叠，这种解法可以 AC。我们也可以进一步优化，使用二叉查找树来简化时间复杂度。最后我们介绍了一种 Count-Map 方法来通用解决所有的问题，不仅可以完美解决这三道题，还可以扩展到《会议室》系列的两道题。
