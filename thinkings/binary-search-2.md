# 几乎刷完了力扣所有的二分题，我发现了这些东西。。。（下）

## 前言

大家好，我是 lucifer。今天给大家带来的是《二分》专题。先上下本文的提纲，这个是我
用 mindmap 画的一个脑图，之后我会继续完善，将其他专题逐步完善起来。

> 大家也可以使用 vscode blink-mind 打开源文件查看，里面有一些笔记可以点开查看。
> 源文件可以去我的公众号《力扣加加》回复脑图获取，以后脑图也会持续更新更多内容
> 。vscode 插件地址
> ：https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

![](https://p.ipic.vip/f9hf3p.jpg)

本系列包含以下专题：

- [几乎刷完了力扣所有的链表题，我发现了这些东西。。。](https://lucifer.ren/blog/2020/11/08/linked-list/)
- [几乎刷完了力扣所有的树题，我发现了这些东西。。。](https://lucifer.ren/blog/2020/11/23/tree/)
- [几乎刷完了力扣所有的堆题，我发现了这些东西。。。（上）](https://lucifer.ren/blog/2020/12/26/heap/)
- [几乎刷完了力扣所有的堆题，我发现了这些东西。。。（下）](https://lucifer.ren/blog/2021/01/19/heap-2/)
- [几乎刷完了力扣所有的二分题，我发现了这些东西。。。（上）](https://lucifer.ren/blog/2021/03/08/binary-search-1/)

<!-- more -->

本专题预计分两部分两进行。上一节主要讲述**基本概念** 和 **一个中心**。这一节我们
继续学习**两种二分类型** 和**四大应用**。没有看过上篇的建议先看一下上篇，地址在
上面。

> 如果觉得文章有用，请点赞留言转发一下，让我有动力继续做下去。

## 上篇回顾

上篇主要就是带大家了解几个概念，这些概念对做题极为重要，请务必掌握。接下来讲解了
二分法的中心 - 折半，这个中心需要大家做任何二分都要放到脑子中。

二分法的精髓正如开篇提到的**二分法是一种让未知世界无机可乘的算法**。二分法无论如
何我们都可以舍弃一半解，也就是无论如何都可以将解空间砍半。难点就是上面提到的两点
：**什么条件** 和 **舍弃哪部分**。

接下来，我们继续下篇。下篇注主要内容是两种类型和四大应用。

其中两种类型主要解决的的是：这道题我的解空间以及明确出来了，如何用代码找出具体的
值。而四大应用主要解决的是：如何构造解空间（更多的情况则是如何构建有序序列）以及
一些变体。

这两部分都是实操性很强的内容。这里我提醒大家，在理解这两部分内容的同时，请大家务
必牢记一个中心**折半**。

## 两种类型

### 问题定义

> 这里的问题定义是一个狭义的问题。而如果你理解了这个问题之后，可以将这个具体的问
> 题进行推广以适应更复杂的问题。关于推广，我们之后再谈。

给定一个由数字组成的有序数组 nums，并给你一个数字 target。问 nums 中是否存在
target。如果存在， 则返回其在 nums 中的索引。如果不存在，则返回 - 1。

这是二分查找中最简单的一种形式。当然二分查找也有**很多的变形**，这也是二分查找容
易出错，难以掌握的原因。

常见变体有：

- 如果存在多个满足条件的元素，返回最左边满足条件的索引。
- 如果存在多个满足条件的元素，返回最右边满足条件的索引。
- 数组不是整体有序的。 比如先升序再降序，或者先降序再升序。
- 将一维数组变成二维数组。
- 。。。

接下来，我们逐个进行查看。

### 前提

- 数组是有序的（如果无序，我们也可以考虑排序，不过要注意排序的复杂度）

> 这个有序的数组可能是题目直接给的，也可能是你自己构造的。比如求数组的逆序数就可
> 以在自己构造的有序序列上做二分。

### 术语

为了后面描述问题方便，有必要引入一些约定和术语。

二分查找中使用的术语：

- target —— 要查找的值
- index —— 当前位置
- l 和 r —— 左右指针
- mid —— 左右指针的中点，用来确定我们应该向左查找还是向右查找的索引（其实就是收
  缩解空间）

![术语图示](https://p.ipic.vip/5mz2pf.jpg)

值得注意的是，除了 target 是固定不变的，其他都是动态变化的。其中 l 和 r 指的是解
空间的上下界，mid 是上下界的中间值， index 是遍历指针，用于控制遍历过程。

### 查找一个数

前面我们已经对问题进行了定义。接下来，我们需要对定义的问题进行**分析和求解**。

为了更好理解接下来的内容，我们解决最简单的类型 - **查找某一个具体值** 。

算法描述：

- 先从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；
- 如果目标元素大于中间元素，那么数组中小于中间元素的值都可以排除（由于数组有序，
  那么相当于是可以排除数组左侧的所有值），解空间可以收缩为 [mid+1, r]。
- 如果目标元素小于中间元素，那么数组中大于中间元素的值都可以排除（由于数组有序，
  那么相当于是可以排除数组右侧的所有值），解空间可以收缩为 [l, mid - 1]。
- 如果在某一步骤解空间为空，则代表找不到。

举一个具体的例子方便大家增加代入感。假设 nums 为 `[1,3,4,6,7,8,10,13,14]`，
target 为 4·。

- 刚开始数组中间的元素为 7
- 7 > 4 ，由于 7 右边的数字都大于 7 ，因此不可能是答案。我们将范围缩写到了 7 的
  左侧。

![调整解空间](https://p.ipic.vip/lopd47.jpg)

- 解空间变成了 [1,3,4,6]，此时中间元素为 3。
- 3 < 4，由于 3 左边的数字都小于 3 ，因此不可能是答案。我们将范围缩写到了 3 的右
  侧。

![再次调整解空间](https://p.ipic.vip/8n5f38.jpg)

- 解空间变成了 [4,6]，此时中间元素为 4，正好是我们要找的，返回其索引 2 即可。

**复杂度分析**

由于这种搜索算法每一次比较都使搜索范围缩小一半，是典型的二分查找。

- 平均时间复杂度： $O(logN)$
- 最坏时间复杂度： $O(logN)$
- 空间复杂度
  - 迭代: $O(1)$
  - 递归： $O(logN)$（无尾调用消除）

> 后面的复杂度也是类似的，不再赘述。

#### 思维框架

如何将上面的算法转换为容易理解的可执行代码呢？

大家不要小看这样的一个算法。就算是这样一个简简单单，朴实无华的二分查找， 不同的
人写出来的差别也是很大的。 如果没有一个**思维框架指导你，不同的时间你可能会写出
差异很大的代码。这样的话，犯错的几率会大大增加。这里给大家介绍一个我经常使用的思
维框架和代码模板。**

**首先定义解空间为 [left, right]，注意是左右都闭合，之后会用到这个点**

> 你可以定义别的解空间形式，不过后面的代码也相应要调整，感兴趣的可以试试别的解空
> 间。

- 由于定义的解空间为 [left, right]，因此当 left <= right 的时候，解空间都不为空
  ，此时我们都需要继续搜索。 也就是说终止搜索条件应该为 left <= right。

> 举个例子容易明白一点。 比如对于区间 [4,4]，其包含了一个元素 4，因此解空间不为
> 空，需要继续搜索（试想 4 恰好是我们要找的 target，如果不继续搜索， 会错过正确
> 答案）。而当解空间为 [left, right) 的时候，同样对于 [4,4]，这个时候解空间却是
> 空的，因为这样的一个区间不存在任何数字·。

- 循环体内，我们不断计算 mid ，并将 nums[mid] 与 目标值比对。
  - 如果 nums[mid] 等于目标值， 则提前返回 mid（只需要找到一个满足条件的即可）
  - 如果 nums[mid] 小于目标值， 说明目标值在 mid 右侧，这个时候解空间可缩小为
    [mid + 1, right] （mid 以及 mid 左侧的数字被我们排除在外）
  - 如果 nums[mid] 大于目标值， 说明目标值在 mid 左侧，这个时候解空间可缩小为
    [left, mid - 1] （mid 以及 mid 右侧的数字被我们排除在外）
- 循环结束都没有找到，则说明找不到，返回 -1 表示未找到。

#### 代码模板

##### Java

```java
public int binarySearch(int[] nums, int target) {
    // 左右都闭合的区间 [l, r]
    int left = 0;
    int right = nums.length - 1;

    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target)
            return mid;
        if (nums[mid] < target)
			      // 解空间变为 [mid+1, right]
            left = mid + 1;
        if (nums[mid] > target)
            // 解空间变为 [left, mid - 1]
            right = mid - 1;
    }
    return -1;
}
```

##### Python

```py
def binarySearch(nums, target):
    # 左右都闭合的区间 [l, r]
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (left + right) >> 1
        if nums[mid] == target: return mid
        # 解空间变为 [mid+1, right]
        if nums[mid] < target: l = mid + 1
        # 解空间变为 [left, mid - 1]
        if nums[mid] > target: r = mid - 1
    return -1

```

##### JavaScript

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) return mid;
    if (nums[mid] < target)
      // 解空间变为 [mid+1, right]
      left = mid + 1;
    if (nums[mid] > target)
      // 解空间变为 [left, mid - 1]
      right = mid - 1;
  }
  return -1;
}
```

##### C++

```cpp
int binarySearch(vector<int>& nums, int target){
  if(nums.size() == 0)
    return -1;

  int left = 0, right = nums.size() - 1;
  while(left <= right){
    int mid = left + ((right - left) >> 1);
    if(nums[mid] == target){ return mid; }
    // 解空间变为 [mid+1, right]
    else if(nums[mid] < target)
	left = mid + 1;
    // 解空间变为 [left, mid - 1]
    else
	right = mid - 1;
  }
  return -1;
}
```

### 寻找最左插入位置

上面我们讲了`寻找满足条件的值`。如果找不到，就返回 -1。那如果不是返回 -1，而是返
回应该插入的位置，使得插入之后列表仍然有序呢？

比如一个数组 nums: [1,3,4]，target 是 2。我们应该将其插入（注意不是真的插入）的
位置是索引 1 的位置，即 [1,**2**,3,4]。因此`寻找最左插入位置`应该返回 1，
而`寻找满足条件的位置` 应该返回-1。

另外如果有多个满足条件的值，我们返回最左侧的。 比如一个数组 nums:
[1,2,2,2,3,4]，target 是 2，我们应该插入的位置是 1。

#### 思维框架

等价于寻找最左满足 >= target 的位置。

具体算法：

- 首先定义解空间为 [left, right]，注意是左右都闭合，之后会用到这个点。

> 你可以定义别的解空间形式，不过后面的代码也相应要调整，感兴趣的可以试试别的解空
> 间。

- 由于我们定义的解空间为 [left, right]，因此当 left <= right 的时候，解空间都不
  为空。 也就是说我们的终止搜索条件为 left <= right。

- 当 A[mid] >= x，说明找到一个备胎，我们令 r = mid - 1 将 mid 从解空间排除，继续
  看看有没有更好的备胎。
- 当 A[mid] < x，说明 mid 根本就不是答案，直接更新 l = mid + 1，从而将 mid 从解
  空间排除。
- 最后解空间的 l 就是最好的备胎，备胎转正。

#### 代码模板

##### Python

```py
def bisect_left(A, x):
    # 内置 api
    bisect.bisect_left(A, x)
    # 手写
    l, r = 0, len(A) - 1
    while l <= r:
        mid = (l + r) // 2
        if A[mid] >= x: r = mid - 1
        else: l = mid + 1
    return l
```

### 寻找最右插入位置

#### 思维框架

等价于寻找最右满足 <= target 的位置的右邻居。

具体算法：

- 首先定义解空间为 [left, right]，注意是左右都闭合，之后会用到这个点。

> 你可以定义别的解空间形式，不过后面的代码也相应要调整，感兴趣的可以试试别的解空
> 间。

- 由于我们定义的解空间为 [left, right]，因此当 left <= right 的时候，解空间都不
  为空。 也就是说我们的终止搜索条件为 left <= right。

- 当 A[mid] > x，说明找到一个备胎，我们令 r = mid - 1 将 mid 从解空间排除，继续
  看看有没有更好的备胎。
- 当 A[mid] <= x，说明 mid 根本就不是答案，直接更新 l = mid + 1，从而将 mid 从解
  空间排除。
- 最后解空间的 l 就是最好的备胎，备胎转正。

#### 代码模板

##### Python

```py

def bisect_right(A, x):
    # 内置 api
    bisect.bisect_right(A, x)
    # 手写
    l, r = 0, len(A) - 1
    while l <= r:
        mid = (l + r) // 2
        if A[mid] <= x: l = mid + 1
        else: r = mid - 1
    return l # 或者 r + 1
```

以上就是两种二分的基本形式了。而在实际的写代码过程中，我不会使用**寻找满足条件的
值**模板，而是直接使用**最左** 或者 **最右** 插入模板。为什么呢？因为后者包含了
前者，并还有前者实现不了的功能。比如我要实现**寻找满足条件的值**，就可直接使
用**最左插入**模板找到插入索引 i，只不过最后判断一下 nums[i] 是否等于 target 即
可，如果不等于则返回 -1，否则返回 i。这也是为什么我**将二分分为两种类型，而不是
三种甚至四种的原因**。

另外最左插入和最右插入可以结合使用从而求出**有序序列**中和 target 相等的数的个数
，这在有些时候会是一个考点。代码表示：

```py
nums = [1,2,2,2,3,4]
i = bisect.bisect_left(nums, 2) # get 1
j = bisect.bisect_right(nums, 2) # get 4
# j - i 就是 nums 中 2 的个数
```

为了描述方便，以后所有的最左插入二分我都会简称**最左二分**，代码上直接用
bisect.bisect_left 表示，而最右插入二分我都会简称**最右二分**，代码上用
bisect.bisect_right 或者 bisect.bisect 表示。

### 小结

对于二分题目首先要明确解空间，然后根据一定条件（通常是和中间值比较），舍弃其中一
半的解。大家可以先从查找满足条件的值的二分入手，进而学习最左和最右二分。同时大家
只需要掌握最左和最右二分即可，因为后者功能大于前者。

对于最左和最右二分，简单用两句话总结一下：

1. 最左二分不断收缩右边界，最终返回左边界

2. 最右二分不断收缩左边界，最终返回右边界

## 四大应用

基础知识铺垫了差不多了。接下来，我们开始干货技巧。

接下来要讲的：

- 能力检测和计数二分本质差不多，都是**普通二分** 的泛化。
- 前缀和二分和插入排序二分，本质都是在**构建有序序列**。

那让我们开始吧。

### 能力检测二分

能力检测二分一般是：定义函数 possible， 参数是 mid，返回值是布尔值。外层根据返回
值调整"解空间"。

示例代码（以最左二分为例）：

```py
def ability_test_bs(nums):
  def possible(mid):
    pass
  l, r = 0, len(A) - 1
  while l <= r:
      mid = (l + r) // 2
      # 只有这里和最左二分不一样
      if possible(mid): l = mid + 1
      else: r = mid - 1
  return l
```

和最左最右二分这两种最最基本的类型相比，能力检测二分**只是将 while 内部的 if 语
句调整为了一个函数罢了**。因此能力检测二分也分最左和最右两种基本类型。

基本上大家都可以用这个模式来套。明确了解题的框架，我们最后来看下能力检测二分可以
解决哪些问题。这里通过三道题目带大家感受一下，类似的题目还有很多，大家课后自行体
会。

#### 875. 爱吃香蕉的珂珂（中等）

##### 题目地址

https://leetcode-cn.com/problems/koko-eating-bananas/description/

##### 题目描述

```
珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。

珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。

 

示例 1：

输入: piles = [3,6,7,11], H = 8
输出: 4
示例 2：

输入: piles = [30,11,23,4,20], H = 5
输出: 30
示例 3：

输入: piles = [30,11,23,4,20], H = 6
输出: 23
 

提示：

1 <= piles.length <= 10^4
piles.length <= H <= 10^9
1 <= piles[i] <= 10^9


```

##### 前置知识

- 二分查找

##### 公司

- 字节

##### 思路

题目是让我们求**H 小时内吃掉所有香蕉的最小速度**。

符合直觉的做法是枚举所有可能的速度，找出所有的可以吃完香蕉的速度，接下来选择最小
的速度即可。由于需要返回最小的速度，因此选择从小到大枚举会比较好，因为可以提前退
出。 这种解法的时间复杂度比较高，为 $O(N * M)$，其中 N 为 piles 长度， M 为
Piles 中最大的数（也就是解空间的最大值）。

观察到需要检测的解空间是个**有序序列**，应该想到可能能够使用二分来解决，而不是线
性枚举。可以使用二分解决的关键和前面我们简化的二分问题并无二致，关键点在于**如果
速度 k 吃不完所有香蕉，那么所有小于等于 k 的解都可以被排除。**

二分解决的关键在于：

- 明确解空间。 对于这道题来说， 解空间就是 [1,max(piles)]。
- 如何收缩解空间。关键点在于**如果速度 k 吃不完所有香蕉，那么所有小于等于 k 的解
  都可以被排除。**

综上，我们可以使用最左二分，即不断收缩右边界。

![](https://p.ipic.vip/f95aa2.jpg)

> 香蕉堆的香蕉个数上限是 10^9， 珂珂这也太能吃了吧？

##### 关键点解析

- 二分查找模板

##### 代码

代码支持：Python，JavaScript

Python Code:

```py
class Solution:
    def solve(self, piles, k):
        def possible(mid):
            t = 0
            for pile in piles:
                t += (pile + mid - 1) // mid
            return t <= k

        l, r = 1, max(piles)

        while l <= r:
            mid = (l + r) // 2
            if possible(mid):
                r = mid - 1
            else:
                l = mid + 1
        return l

```

JavaScript Code:

```js
function canEatAllBananas(piles, H, mid) {
  let h = 0;
  for (let pile of piles) {
    h += Math.ceil(pile / mid);
  }

  return h <= H;
}
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
  let lo = 1,
    hi = Math.max(...piles);
  // [l, r) ， 左闭右开的好处是如果能找到，那么返回 l 和 r 都是一样的，因为最终 l 等于 r。
  while (lo <= hi) {
    let mid = lo + ((hi - lo) >> 1);
    if (canEatAllBananas(piles, H, mid)) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return lo; //  不能选择hi
};
```

**复杂度分析**

- 时间复杂度：$O(max(N, N * logM))$，其中 N 为 piles 长度， M 为 Piles 中最大的
  数。
- 空间复杂度：$O(1)$

#### 最小灯半径（困难）

##### 题目描述

```
You are given a list of integers nums representing coordinates of houses on a 1-dimensional line. You have 3 street lights that you can put anywhere on the coordinate line and a light at coordinate x lights up houses in [x - r, x + r], inclusive. Return the smallest r required such that we can place the 3 lights and all the houses are lit up.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [3, 4, 5, 6]
Output
0.5
Explanation
If we place the lamps on 3.5, 4.5 and 5.5 then with r = 0.5 we can light up all 4 houses.
```

##### 前置知识

- 排序
- 二分法

##### 二分法

##### 思路

本题和力扣 [475. 供暖器](https://leetcode-cn.com/problems/heaters/) 类似。

这道题的意思是给你一个数组 nums，让你在 [min(nums),max(nums)] 范围内放置 3 个灯
，每个灯覆盖半径都是 r，让你求最小的 r。

之所以不选择小于 min(nums) 的位置和大于 max(nums) 的位置是因为没有必要。比如选取
了小于 min(nums) 的位置 pos，那么选取 pos **一定不比选择 min(nums) 位置结果更
优**。

这道题的核心点还是一样的思维模型，即：

- 确定解空间。这里的解空间其实就是 r。不难看出 r 的下界是 0， 上界是 max(nums) -
  min(nums)。

> 没必要十分精准，只要不错过正确解即可，这个我们在前面讲过，这里再次强调一下。

- 对于上下界之间的所有可能 x 进行枚举（不妨从小到大枚举），检查半径为 x 是否可以
  覆盖所有，返回第一个可以覆盖所有的 x 即可。

注意到我们是在一个有序序列进行枚举，因此使用二分就应该想到。可使用二分的核心点在
于：如果 x 不行，那么小于 x 的所有半径都必然不行。

接下来的问题就是给定一个半径 x，判断其是否可覆盖所有的房子。

**判断其是否可覆盖**就是所谓的能力检测，我定义的函数 possible 就是能力检测。

首先**对 nums 进行排序**，这在后面会用到。 然后从左开始模拟放置灯。先在
nums[0] + r 处放置一个灯，其可以覆盖 [0, 2 * r]。由于 nums 已经排好序了，那么这
个等可以覆盖到的房间其实就是 nums 中坐标小于等于 2 \* r 所有房间，使用二分查找即
可。对于 nums 右侧的所有的房间我们需要继续放置灯，采用同样的方式即可。

能力检测核心代码：

```py
def possible(diameter):
    start = nums[0]
    end = start + diameter
    for i in range(LIGHTS):
        idx = bisect_right(nums, end)
        if idx >= N:
            return True
        start = nums[idx]
        end = start + diameter
    return False
```

由于我们想要找到满足条件的最小值，因此可直接套用**最左二分模板**。

##### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, nums):
        nums.sort()
        N = len(nums)
        if N <= 3:
            return 0
        LIGHTS = 3
        # 这里使用的是直径，因此最终返回需要除以 2
        def possible(diameter):
            start = nums[0]
            end = start + diameter
            for i in range(LIGHTS):
                idx = bisect_right(nums, end)
                if idx >= N:
                    return True
                start = nums[idx]
                end = start + diameter
            return False

        l, r = 0, nums[-1] - nums[0]
        while l <= r:
            mid = (l + r) // 2
            if possible(mid):
                r = mid - 1
            else:
                l = mid + 1
        return l / 2
```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：由于进行了排序， 因此时间复杂度大约是 $O(nlogn)$
- 空间复杂度：取决于排序的空间消耗

#### 778. 水位上升的泳池中游泳（困难）

##### 题目地址

https://leetcode-cn.com/problems/swim-in-rising-water

##### 题目描述

```
在一个 N x N 的坐标方格  grid 中，每一个方格的值 grid[i][j] 表示在位置 (i,j) 的平台高度。

现在开始下雨了。当时间为  t  时，此时雨水导致水池中任意位置的水位为  t 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台  (N-1, N-1)？

示例 1:

输入: [[0,2],[1,3]]
输出: 3
解释:
时间为 0 时，你位于坐标方格的位置为 (0, 0)。
此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。

等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置
示例 2:

输入: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
输出: 16
解释:
0 1 2 3 4
24 23 22 21 5
12 13 14 15 16
11 17 18 19 20
10 9 8 7 6

最终的路线用加粗进行了标记。
我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的

提示:

2 <= N <= 50.
grid[i][j] 位于区间 [0, ..., N*N - 1] 内。
```

##### 前置知识

- [DFS](https://github.com/azl397985856/leetcode/blob/master/thinkings/DFS.md)
- [二分](https://github.com/azl397985856/leetcode/blob/master/91/binary-search.md)

##### 思路

首先明确一下解空间。不难得出，解空间是[0, max(grid)]，其中 max(grid) 表示 grid
中的最大值。

因此一个简单的思路是一个个试。

- 试试 a 可以不
- 试试 a+1 可以不
- 。。。

**试试 x 是否可行**就是能力检测。

实际上，如果 x 不可以，那么小于 x 的所有值都是不可以的，这正是本题的突破口。基于
此，我们同样可使用讲义中的**最左二分**模板解决。

伪代码:

```py
def test(x):
    pass
while l <= r:
    mid = (l + r) // 2
    if test(mid, 0, 0):
        r = mid - 1
    else:
        l = mid + 1
return l

```

这个模板会在很多二分中使用。比如典型的计数型二分，典型的就是计算小于等于 x 的有
多少，然后根据答案更新解空间。

明确了这点，剩下要做的就是完成能力检测部分 （test 函数） 了。其实这个就是一个普
通的二维网格 dfs，我们从 (0,0) 开始在一个二维网格中搜索，直到无法继续或达到
(N-1,N-1)，如果可以达到 (N-1,N-1)，我们返回 true，否则返回 False 即可。对二维网
格的 DFS 不熟悉的同学可以看下我之前写
的[小岛专题](https://github.com/azl397985856/leetcode/blob/master/thinkings/island.md)

##### 代码

```py
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        l, r = 0, max([max(vec) for vec in grid])
        seen = set()

        def test(mid, x, y):
            if x > len(grid) - 1 or x < 0 or y > len(grid[0]) - 1 or y < 0:
                return False
            if grid[x][y] > mid:
                return False
            if (x, y) == (len(grid) - 1, len(grid[0]) - 1):
                return True
            if (x, y) in seen:
                return False
            seen.add((x, y))
            ans = test(mid, x + 1, y) or test(mid, x - 1,
                                              y) or test(mid, x, y + 1) or test(mid, x, y - 1)
            return ans
        while l <= r:
            mid = (l + r) // 2
            if test(mid, 0, 0):
                r = mid - 1
            else:
                l = mid + 1
            seen = set()
        return l

```

**复杂度分析**

- 时间复杂度：$O(NlogM)$，其中 M 为 grid 中的最大值， N 为 grid 的总大小。
- 空间复杂度：$O(N)$，其中 N 为 grid 的总大小。

### 计数二分

计数二分和上面的思路已经代码都基本一致。 直接看代码会清楚一点：

```py
def count_bs(nums, k):
  def count_not_greater(mid):
    pass
  l, r = 0, len(A) - 1
  while l <= r:
      mid = (l + r) // 2
      # 只有这里和最左二分不一样
      if count_not_greater(mid) > k: r = mid - 1
      else: l = mid + 1
  return l
```

可以看出只是将 `possible` 变成了 `count_not_greater`，返回值变成了数字而已。

实际上，我们可以将上面的代码稍微改造一下，使得两者更像：

```py
def count_bs(nums, k):
  def possible(mid, k):
    # xxx
    return cnt > k
  l, r = 0, len(A) - 1
  while l <= r:
      mid = (l + r) // 2
      if possible(mid, k): r = mid - 1
      else: l = mid + 1
  return l
```

是不是基本一致了？

由于和上面基本一致， 因此这里直接推荐一个题目，大家用我的思路练习一下，看看我的
技巧灵不灵。

- [第 k 小的距离对](https://binarysearch.com/problems/Kth-Pair-Distance)

### 前缀和二分

前面说了：如果数组全是正的，那么其前缀和就是一个严格递增的数组，基于这个特性，我
们可以在其之上做二分。类似的有单调栈/队列。这种题目类型很多，为了节省篇幅就不举
例说明了。提出前缀和二分的核心的点在于让大家保持对**有序序列**的敏感度。

### 插入排序二分

除了上面的前缀和之外，我们还可以自行维护有序序列。一般有两种方式：

- 直接对序列排序。

代码表示：

```py
nums.sort()
bisect.bisect_left(nums, x) # 最左二分
bisect.bisect_right(nums, x) # 最右二分
```

- 遍历过程维护一个新的有序序列，有序序列的内容为**已经遍历过的值的集合**。

比如无序数组 [3,2,10,5]，遍历到索引为 2 的项（也就是值为 10 的项）时，我们构建的
有序序列为 [2,3,10]。

> 注意我描述的是有序序列，并不是指数组，链表等具体的数据结构。而实际上，这个有序
> 序列很多情况下是平衡二叉树。后面题目会体现这一点。

代码表示：

```py
d = SortedList()
for a in A:
    d.add(a) # 将 a 添加到 d，并维持 d 中数据有序
```

上面代码的 d 就是有序序列。

![”插入排序“图示](https://p.ipic.vip/z4z3i4.jpg)

理论知识到此为止，接下来通过一个例子来说明。

#### 327. 区间和的个数(困难)

##### 题目地址

https://leetcode-cn.com/problems/count-of-range-sum

##### 题目描述

```
给定一个整数数组 nums 。区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。

请你以下标 i （0 <= i <= nums.length ）为起点，元素个数逐次递增，计算子数组内的元素和。

当元素和落在范围 [lower, upper] （包含 lower 和 upper）之内时，记录子数组当前最末元素下标 j ，记作 有效 区间和 S(i, j) 。

求数组中，值位于范围 [lower, upper] （包含 lower 和 upper）之内的 有效 区间和的个数。

 

注意：
最直观的算法复杂度是 O(n2) ，请在此基础上优化你的算法。

 

示例：

输入：nums = [-2,5,-1], lower = -2, upper = 2,
输出：3
解释：
下标 i = 0 时，子数组 [-2]、[-2,5]、[-2,5,-1]，对应元素和分别为 -2、3、2 ；其中 -2 和 2 落在范围 [lower = -2, upper = 2] 之间，因此记录有效区间和 S(0,0)，S(0,2) 。
下标 i = 1 时，子数组 [5]、[5,-1] ，元素和 5、4 ；没有满足题意的有效区间和。
下标 i = 2 时，子数组 [-1] ，元素和 -1 ；记录有效区间和 S(2,2) 。
故，共有 3 个有效区间和。
 

提示：

0 <= nums.length <= 10^4

```

##### 思路

题目很好理解。

由前缀和的性质知道：区间 i 到 j（包含）的和 sum(i,j) = pre[j] - pre[i-1]，其中
pre[i] 为数组前 i 项的和 0 <= i < n。

但是题目中的数字可能是负数，前缀和不一定是单调的啊？这如何是好呢？答案是手动维护
前缀和的有序性。

比如 [-2,5,-1] 的前缀和 为 [-2,3,2]，但是我们可以将求手动维护为 [-2,2,3]，这样就
有序了。但是这丧失了索引信息，因此这个技巧仅适用于**无需考虑索引，也就是不需要求
具体的子序列，只需要知道有这么一个子序列就行了，具体是哪个，我们不关心**。

比如当前的前缀和是 cur，那么前缀和小于等于 cur - lower 有多少个，就说明以当前结
尾的区间和大于等于 lower 的有多少个。类似地，前缀和小于等于 cur - upper 有多少个
，就说明以当前结尾的区间和大于等于 upper 的有多少个。

基于这个想法，我们可使用二分在 $logn$ 的时间快速求出这两个数字，使用平衡二叉树代
替数组可使得插入的时间复杂度降低到 $O(logn)$。Python 可使用 SortedList 来实现，
Java 可用 TreeMap 代替。

##### 代码

```py
from sortedcontainers import SortedList
class Solution:
    def countRangeSum(self, A: List[int], lower: int, upper: int) -> int:
        ans, pre, cur = 0, [0], 0
        for a in A:
            cur += a
            ans += pre.bisect_right(cur - lower) - pre.bisect_left(cur - upper)
            pre.add(cur)
        return ans

```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：$O(nlogn)$
- 空间复杂度：$O(nlogn)$

#### 493. 翻转对（困难）

##### 题目地址

https://leetcode-cn.com/problems/reverse-pairs/

##### 题目描述

```
给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。

你需要返回给定数组中的重要翻转对的数量。

示例 1:

输入: [1,3,2,3,1]
输出: 2


示例 2:

输入: [2,4,3,5,1]
输出: 3


注意:

给定数组的长度不会超过50000。
输入数组中的所有数字都在32位整数的表示范围内。
```

##### 前置知识

- 二分

##### 公司

- 暂无

##### 思路

我们可以一边遍历一边维护一个有序序列 d，其中 d 为**已经遍历过的值的集合**。对于
每一个位置 0 <= i < n，我们统计 d 中大于 2 \* A[i] 的个数，这个个数就是题目要求
的翻转对。这里的关键在于 d 中的值是比当前索引小的**全部**值。

我们当然可以线性遍历 d，求出个数。一个更好的方法是在遍历的同时维持 d 是**有序
的**，这样我们就可以用二分了。和上面题目一样，使用平衡二叉树代替数组可使得插入的
时间复杂度降低到 $O(logn)$。

![平衡二叉树](https://p.ipic.vip/kh1ub9.jpg)

##### 关键点

- 插入排序二分

##### 代码

- 语言支持：Python3

Python3 Code:

```python
from sortedcontainers import SortedList
class Solution:
    def reversePairs(self, A: List[int]) -> int:
        d = SortedList()
        ans = 0
        for a in A:
            ans += len(d) - d.bisect_right(2*a)
            d.add(a)
        return ans

```

**复杂度分析**

令 n 为数组长度。

- 时间复杂度：$O(nlogn)$
- 空间复杂度：$O(n)$

### 小结

四个应用讲了两种构造有序序列的方式，分别是前缀和，插入排序，插入排序的部分其实也
可以看下我之前写
的[最长上升子序列系列](https://lucifer.ren/blog/2020/06/20/LIS/ "最长上升子序列系列")，
那里面的贪心解法就是**自己构造有序序列再二分**的。 另外理论上单调栈/队列也是有序
的，也可是用来做二分，但是相关题目太少了，因此大家只要保持对**有序序列**的敏感度
即可。

能力检测二分很常见，不过其仅仅是将普通二分的 if 部分改造成了函数而已。而对于计数
二分，其实就是能力检测二分的特例，只不过其太常见了，就将其单独提取出来了。

另外，有时候有序序列也会给你稍微变化一种形式。比如二叉搜索树，大家都知道可以在
$logn$ 的时间完成查找，这个查找过程本质也是二分。二叉查找树有**有序序列**么？有
的！二叉查找树的中序遍历恰好就是一个有序序列。因此如果一个数比当前节点值小，一定
在左子树（也就是有序序列的左侧），如果一个数比当前节点值大，一定在右子树（也就是
有序序列的右侧）。

## 总结

本文主要讲了两种二分类型：最左和最右，模板已经给大家了，大家只需要根据题目调整解
空间和判断条件即可。关于四种应用更多的还是让大家理解二分的核心**折半**。表面上来
看，二分就是对有序序列的查找。其实不然，只不过有序序列很容易做二分罢了。因此战术
上大家保持对有序序列的敏感度，战略上要明确二分的本质是折半，核心在于什么时候将哪
一半折半。

一个问题能否用二分解决的关键在于检测一个值的时候是否可以排除解空间中的一半元素。
比如我前面反复提到的**如果 x 不行，那么解空间中所有小于等于 x 的值都不行**。

对于简单题目，通常就是给你一个有序序列，让你在上面找满足条件的位置。顶多变化一点
，比如数组局部有序，一维变成二维等。对于这部分可以看下我写
的[91 算法 - 二分查找讲义](https://github.com/azl397985856/leetcode/blob/master/91/binary-search.md "91算法 - 二分查找讲义")

中等题目可能需要让你自己构造有序序列。

困难题则可能是二分和其他专题的结合，比如上面的 778. 水位上升的泳池中游泳（困难）
，就是二分和搜索（我用的是 DFS）的结合。

以上就是本文的全部内容了， 大家对此有何看法，欢迎给我留言，我有时间都会一一查看
回答。我是 lucifer，维护西湖区最好的算法题解，Github 超 40K star 。大家也可以关
注我的公众号《力扣加加》带你啃下算法这块硬骨头。

另外我整理的 1000 多页的电子书已限时免费下载，大家可以去我的公众号《力扣加加》后
台回复电子书获取。
