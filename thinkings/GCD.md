# 最大公约数

关于最大公约数有专门的研究。 而在 LeetCode 中虽然没有直接让你求解最大公约数的题目。但是却有一些间接需要你求解最大公约数的题目。

比如：

- [914. 卡牌分组](https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/solution/python3-zui-da-gong-yue-shu-914-qia-pai-fen-zu-by-/)
- [365. 水壶问题](https://leetcode-cn.com/problems/water-and-jug-problem/solution/bfszui-da-gong-yue-shu-by-fe-lucifer/)
- [1071. 字符串的最大公因子](https://leetcode-cn.com/problems/greatest-common-divisor-of-strings/solution/1071-zi-fu-chuan-de-zui-da-gong-yin-zi-zui-da-gong/)

因此如何求解最大公约数就显得重要了。

## 定义法

```python
def GCD(a: int, b: int) -> int:
    smaller = min(a, b)
    while smaller:
        if a % smaller == 0 and b % smaller == 0:
            return smaller
        smaller -= 1
```

**复杂度分析**

- 时间复杂度：最好的情况是执行一次循环体，最坏的情况是循环到 smaller 为 1，因此总的时间复杂度为 $O(N)$，其中 N 为 a 和 b 中较小的数。
- 空间复杂度：$O(1)$。

## 辗转相除法

如果我们需要计算 a 和 b 的最大公约数，运用辗转相除法的话。首先，我们先计算出 a 除以 b 的余数 c，把问题转化成求出 b 和 c 的最大公约数；然后计算出 b 除以 c 的余数 d，把问题转化成求出 c 和 d 的最大公约数；再然后计算出 c 除以 d 的余数 e，把问题转化成求出 d 和 e 的最大公约数。..... 以此类推，逐渐把两个较大整数之间的运算转化为两个较小整数之间的运算，直到两个数可以整除为止。

```python
def GCD(a: int, b: int) -> int:
    return a if b == 0 else GCD(b, a % b)
```

**复杂度分析**

- 时间复杂度：$O(log(max(a, b)))$
- 空间复杂度：空间复杂度取决于递归的深度，因此空间复杂度为 $O(log(max(a, b)))$

下面我们对上面的过程进行一个表形象地讲解，实际上这也是教材里面的讲解方式，我只是照搬过来，增加一下自己的理解罢了。我们来通过一个例子来讲解：

假如我们有一块 1680 米 \* 640 米 的土地，我们希望讲起分成若干正方形的土地，且我们想让正方形土地的边长尽可能大，我们应该如何设计算法呢？

实际上这正是一个最大公约数的应用场景，我们的目标就是求解 1680 和 640 的最大公约数。

![](https://tva1.sinaimg.cn/large/00831rSTly1gdflglk6v2j30f104zgo0.jpg)

将 1680 米 \* 640 米 的土地分割，相当于对将 400 米 \* 640 米 的土地进行分割。 为什么呢？ 假如 400 米 \* 640 米分割的正方形边长为 x，那么有 640 % x == 0，那么肯定也满足剩下的两块 640 米 \* 640 米的。

![](https://tva1.sinaimg.cn/large/00831rSTly1gdfliql4tvj30g805aq5k.jpg)

我们不断进行上面的分割：

![](https://tva1.sinaimg.cn/large/00831rSTly1gdflles5bsj307x08vgmv.jpg)

直到边长为 80，没有必要进行下去了。

![](https://tva1.sinaimg.cn/large/00831rSTly1gdfllz6hx4j30aa04uwer.jpg)

辗转相除法如果 a 和 b 都很大的时候，a % b 性能会较低。在中国，《九章算术》中提到了一种类似辗转相减法的 [更相减损术](https://zh.wikisource.org/wiki/%E4%B9%9D%E7%AB%A0%E7%AE%97%E8%A1%93#-.7BA.7Czh-hans:.E5.8D.B7.3Bzh-hant:.E5.8D.B7.7D-.E7.AC.AC.E4.B8.80.E3.80.80.E6.96.B9.E7.94.B0.E4.BB.A5.E5.BE.A1.E7.94.B0.E7.96.87.E7.95.8C.E5.9F.9F "更相减损术")。它的原理是：`两个正整数 a 和 b（a>b），它们的最大公约数等于 a-b 的差值 c 和较小数 b 的最大公约数。`。

```python
def GCD(a: int, b: int) -> int:
    if a == b:
        return a
    if a < b:
        return GCD(b - a, a)
    return GCD(a - b, b)
```

上面的代码会报栈溢出。原因在于如果 a 和 b 相差比较大的话，递归次数会明显增加，要比辗转相除法递归深度增加很多，最坏时间复杂度为 O(max(a, b)))。这个时候我们可以将`辗转相除法`和`更相减损术`做一个结合，从而在各种情况都可以获得较好的性能。
