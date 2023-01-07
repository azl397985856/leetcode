# 【91 算法-基础篇】05.双指针

力扣加加，一个努力做西湖区最好的算法题解的团队。就在今天它给大家带来了《91 天学算法》，帮助大家摆脱困境，征服算法。

<img src="https://p.ipic.vip/befr2w.jpeg" width="50%">

## 什么是双指针

顾名思议，双指针就是**两个指针**，但是不同于 C，C++中的指针， 其是一种**算法思想**。

如果说，我们迭代一个数组，并输出数组每一项，我们需要一个指针来记录当前遍历的项，这个过程我们叫单指针（index）的话。

```java
for(int i = 0;i < nums.size(); i++) {
  输出(nums[i]);
}
```

![](https://p.ipic.vip/s306f5.jpg)

（图 1）

那么双指针实际上就是有两个这样的指针，最为经典的就是二分法中的左右双指针啦。

```java
int l = 0;
int r = nums.size() - 1;

while (l < r) {
    if(一定条件) return 合适的值，一般是 l 和 r 的中点
    if(一定条件) l++
    if(一定条件) r--
}
// 因为 l == r，因此返回 l 和 r 都是一样的
return l
```

![](https://p.ipic.vip/duhwzn.jpg)

（图 2）

读到这里，你发现双指针是一个很宽泛的概念，就好像数组，链表一样，其类型会有很多很多， 比如二分法经常用到`左右端点双指针`。滑动窗口会用到`快慢指针和固定间距指针`。 因此双指针其实是一种综合性很强的类型，类似于数组，栈等。 但是我们这里所讲述的双指针，往往指的是某几种类型的双指针，而不是“只要有两个指针就是双指针了”。

> 有了这样一个**算法框架**，或者算法思维，有很大的好处。它能帮助你理清思路，当你碰到新的问题，在脑海里进行搜索的时候，**双指针**这个词就会在你脑海里闪过，闪过的同时你可以根据**双指针**的所有套路和这道题进行**穷举匹配**，这个思考解题过程本来就像是算法，我会在进阶篇《搜索算法》中详细阐述。

那么究竟我们算法中提到的双指针指的是什么呢？我们一起来看下算法中双指针的常见题型吧。

## 常见题型有哪些？

这里我将其分为三种类类型，分别是：

1. 快慢指针（两个指针步长不同）
2. 左右端点指针（两个指针分别指向头尾，并往中间移动，步长不确定）
3. 固定间距指针（两个指针间距相同，步长相同）

> 上面是我自己的分类，没有参考别人。可以发现我的分类标准已经覆盖了几乎所有常见的情况。 大家在平时做题的时候一定要养成这样的习惯，将题目类型进行总结，当然这个总结可以是别人总结好的，也可以是自己独立总结的。不管是哪一种，都要进行一定的消化吸收，把它们变成真正属于自己的知识。

不管是哪一种双指针，只考虑双指针部分的话 ，由于最多还是会遍历整个数组一次，因此时间复杂度取决于步长，如果步长是 1，2 这种常数的话，那么时间复杂度就是 O(N)，如果步长是和数据规模有关（比如二分法），其时间复杂度就是 O(logN)。并且由于不管规模多大，我们都只需要最多两个指针，因此空间复杂度是 O(1)。下面我们就来看看双指针的常见套路有哪些。

## 常见套路

### 快慢指针

1. 判断链表是否有环

这里给大家推荐两个非常经典的题目，一个是力扣 287 题，一个是 142 题。其中 142 题我在我的 LeetCode 题解仓库中的每日一题板块出过，并且给了很详细的证明和解答。而 287 题相对不直观，比较难以想到，这道题曾被官方选定为每日一题，也是相当经典的。

- [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

- [【每日一题】- 2020-01-14 - 142. 环形链表 II · Issue #274 · azl397985856/leetcode](https://github.com/azl397985856/leetcode/issues/274)

2. 读写指针。典型的是`删除重复元素`

这里推荐我仓库中的一道题， 我这里写了一个题解，横向对比了几个相似题目，并剖析了这种题目的本质是什么，让你看透题目本质，推荐阅读。

- [80.删除排序数组中的重复项 II](https://github.com/azl397985856/leetcode/blob/master/problems/80.remove-duplicates-from-sorted-array-ii.md)

## 左右端点指针

1. 二分查找。

二分查找会在专题篇展开，这里不多说，大家先知道就行了。

2. 暴力枚举中“从大到小枚举”（剪枝）

一个典型的题目是我之前参加官方每日一题的时候给的一个解法，大家可以看下。这种解法是可以 AC 的。同样地，这道题我也给出了三种方法，帮助大家从多个纬度看清这个题目。强烈推荐大家做到一题多解。这对于你做题很多帮助。除了一题多解，还有一个大招是多题同解，这部分我们放在专题篇介绍。

[find-the-longest-substring-containing-vowels-in-even](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solution/qian-zhui-he-zhuang-tai-ya-suo-pythonjava-by-fe-lu/)

3. 有序数组。

区别于上面的二分查找，这种算法指针移动是连续的，而不是跳跃性的，典型的是 LeetCode 的`两数和`，以及`N数和`系列问题。

## 固定间距指针

1. 一次遍历（One Pass）求链表的中点

2. 一次遍历（One Pass）求链表的倒数第 k 个元素

3. 固定窗口大小的滑动窗口

## 模板(伪代码)

我们来看下上面三种题目的算法框架是什么样的。这个时候我们没必要纠结具体的语言，这里我直接使用了伪代码，就是防止你掉进细节。

当你掌握了这种算法的细节，就应该找几个题目试试。一方面是检测自己是否真的掌握了，另一方面是“细节”，”细节“是人类，尤其是软件工程师最大的敌人，毕竟我们都是`差不多先生`。

1. 快慢指针

```jsx
l = 0
r = 0
while 没有遍历完
  if 一定条件
    l += 1
  r += 1
return 合适的值
```

2. 左右端点指针

```jsx
l = 0
r = n - 1
while l < r
  if 找到了
    return 找到的值
  if 一定条件1
    l += 1
  else if  一定条件2
    r -= 1
return 没找到

```

3. 固定间距指针

```jsx
l = 0
r = k
while 没有遍历完
  自定义逻辑
  l += 1
  r += 1
return 合适的值
```

## 题目推荐

如果你`差不多`理解了上面的东西，那么可以拿下面的题练练手。Let's Go!

### 左右端点指针

- 16.3Sum Closest (Medium)
- 713.Subarray Product Less Than K (Medium)
- 977.Squares of a Sorted Array (Easy)
- Dutch National Flag Problem

> 下面是二分类型

- 33.Search in Rotated Sorted Array (Medium)
- 875.Koko Eating Bananas（Medium）
- 881.Boats to Save People（Medium）

### 快慢指针

- 26.Remove Duplicates from Sorted Array（Easy）
- 141.Linked List Cycle (Easy)
- 142.Linked List Cycle II（Medium）
- 287.Find the Duplicate Number（Medium）
- 202.Happy Number (Easy)

### 固定间距指针

- 1456.Maximum Number of Vowels in a Substring of Given Length（Medium）

> 固定窗口大小的滑动窗口见专题篇的滑动窗口专题（暂未发布）

## 其他

有时候也不能太思维定式，比如 https://leetcode-cn.com/problems/consecutive-characters/ 这道题根本就没必要双指针什么的。

再比如：https://lucifer.ren/blog/2020/05/31/101.symmetric-tree/
