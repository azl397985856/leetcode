# 字节跳动的算法面试题是什么难度？

由于 lucifer 我是一个小前端， 最近也在准备写一个《前端如何搞定算法面试》的专栏，因此最近没少看各大公司的面试题。都说字节跳动算法题比较难，我就先拿 ta 下手，做了几套 。这次我们就拿一套 `2018 年的前端校招（第四批）`来看下字节的算法笔试题的难度几何。地址：https://www.nowcoder.com/test/8536639/summary

> 实际上，这套字节的前端岗位笔试题和后端以及算法岗位的笔试题也只有一道题目（红包的设计题被换成了另外一个设计题）不一样而已，因此也不需要担心你不是前端，题目类型和难度和你的岗位不匹配。

这套题一共四道题， 两道问答题， 两道编程题。

其中一道问答题是 LeetCode 426 的原题，只不过题型变成了找茬（改错）。可惜的是 LeetCode 的 426 题是一个会员题目，没有会员的就看不来了。不过，剑指 Offer 正好也有这个题，并且力扣将剑指 Offer 全部的题目都 OJ 化了。 这道题大家可以去 https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof 提交答案。简单说一下这个题目的思路，我们只需要中序遍历即可得到一个有序的数列，同时在中序遍历过程中将 pre 和 cur 节点通过指针串起来即可。

另一个问答是红包题目，这里不多说了。我们重点看一下剩下两个算法编程题。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gigxwqs84rj312d0u0the.jpg)

> 两个问答题由于不能在线判题，我没有做，只做了剩下两个编程题。

## 球队比赛

第一个编程题是一个球队比赛的题目。

### 题目描述

有三只球队，每只球队编号分别为球队 1，球队 2，球队 3，这三只球队一共需要进行 n 场比赛。现在已经踢完了 k 场比赛，每场比赛不能打平，踢赢一场比赛得一分，输了不得分不减分。已知球队 1 和球队 2 的比分相差 d1 分，球队 2 和球队 3 的比分相差 d2 分，每场比赛可以任意选择两只队伍进行。求如果打完最后的 (n-k) 场比赛，有没有可能三只球队的分数打平。

### 思路

假设球队 1，球队 2，球队 3 此时的胜利次数分别为 a，b，c，球队 1，球队 2，球队 3 总的胜利次数分别为 n1，n2，n3。

我一开始的想法是只要保证 n1，n2，n3 相等且都小于等于 n / 3 即可。如果题目给了 n1，n2，n3 的值就直接：

```
print(n1 == n2 == n3 == n / 3)
```

可是不仅 n1，n2，n3 没给， a，b，c 也没有给。

实际上此时我们的信息仅仅是：

```
① a + b + c = k
② a - b = d1 or b - a = d1
③ b - c = d2 or c - b = d2
```

其中 k 和 d1，d2 是已知的。a ，b，c 是未知的。 也就是说我们需要枚举所有的 a，b，c 可能性，解方程求出合法的 a，b，c，并且 合法的 a，b，c 都小于等于 n / 3 即可。

> 这个 a,b,c 的求解数学方程就是中学数学难度， 三个等式化简一下即可，具体见下方代码区域。

- a 只需要再次赢得 n / 3 - a 次
- b 只需要再次赢得 n / 3 - b 次
- c 只需要再次赢得 n / 3 - c 次

```
n1 = a + n / 3 - a = n / 3
n2 = b + (n / 3 - b) = n / 3
n3 = c + (n / 3 - c) = n / 3
```

### 代码(Python)

> 牛客有点让人不爽， 需要 print 而不是 return

```py
t = int(input())
for i in range(t):
    n, k, d1, d2 = map(int, input().split(" "))
    if n % 3 != 0:
        print('no')
        continue
    abcs = []
    for r1 in [-1, 1]:
        for r2 in [-1, 1]:
            a = (k + 2 * r1 * d1 + r2 * d2) / 3
            b = (k + -1 * r1 * d1 + r2 * d2) / 3
            c = (k + -1 * r1 * d1 + -2 * r2 * d2) / 3
            a + r1
            if  0 <= a <= k and 0 <= b <= k and 0 <= c <= k and a.is_integer() and b.is_integer() and c.is_integer():
                abcs.append([a, b, c])
    flag = False
    for abc in abcs:
        if len(abc) > 0 and max(abc) <= n / 3:
            flag = True
            break
    if flag:
        print('yes')
    else:
        print('no')
```

**复杂度分析**

- 时间复杂度：$O(t)$
- 空间复杂度：$O(t)$

### 小结

感觉这个难度也就是力扣中等水平吧，力扣也有一些数学等式转换的题目， 比如 [494.target-sum](https://github.com/azl397985856/leetcode/blob/master/problems/494.target-sum.md "494.target-sum")

## 转换字符串

### 题目描述

有一个仅包含’a’和’b’两种字符的字符串 s，长度为 n，每次操作可以把一个字符做一次转换（把一个’a’设置为’b’，或者把一个’b’置成’a’)；但是操作的次数有上限 m，问在有限的操作数范围内，能够得到最大连续的相同字符的子串的长度是多少。

### 思路

看完题我就有种似曾相识的感觉。

> 每次对妹子说出这句话的时候，她们都会觉得好假 ^\_^

不过这次是真的。 ”哦，不！每次都是真的“。 这道题其实就是我之前写的滑动窗口的一道题[【1004. 最大连续 1 的个数 III】滑动窗口（Python3）](https://leetcode-cn.com/problems/max-consecutive-ones-iii/solution/1004-zui-da-lian-xu-1de-ge-shu-iii-hua-dong-chuang/ "【1004. 最大连续 1 的个数 III】滑动窗口（Python3）")的换皮题。 专题地址：https://github.com/azl397985856/leetcode/blob/master/thinkings/slide-window.md

所以说，如果这道题你完全没有思路的话。说明：

- 抽象能力不够。
- 滑动窗口问题理解不到位。

第二个问题可以看我上面贴的地址，仔细读读，并完成课后练习即可解决。

第一个问题就比较困难了， 不过多看我的题解也可以慢慢提升的。比如：

- [《割绳子》](https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/ "《割绳子》") 实际上就是 [343. 整数拆分](https://lucifer.ren/blog/2020/05/16/343.integer-break/ "343. 整数拆分") 的换皮题。

- 力扣 230 和 力扣 645 就是换皮题，详情参考[位运算专题](https://lucifer.ren/blog/2020/03/24/bit/ "位运算专题")

- 以及 [你的衣服我扒了 - 《最长公共子序列》](https://lucifer.ren/blog/2020/07/01/LCS/)

- 以及 [穿上衣服我就不认识你了？来聊聊最长上升子序列](https://lucifer.ren/blog/2020/06/20/LIS/)

- 以及 [一招吃遍力扣四道题，妈妈再也不用担心我被套路啦～](https://lucifer.ren/blog/2020/06/13/%E5%88%A0%E9%99%A4%E9%97%AE%E9%A2%98/)

- 等等

回归这道题。其实我们只需要稍微抽象一下， 就是一个纯算法题。 抽象的另外一个好处则是将很多不同的题目返璞归真，从而可以在茫茫题海中逃脱。这也是我开启[《我是你的妈妈呀》](https://lucifer.ren/blog/2020/08/03/mother-01/) 的原因之一。

如果我们把 a 看成是 0 ， b 看成是 1。或者将 b 看成 1， a 看成 0。不就抽象成了：

```

给定一个由若干 0 和 1 组成的数组 A，我们最多可以将 m 个值从 0 变成 1 。

返回仅包含 1 的最长（连续）子数组的长度。

```

这就是 力扣 [1004. 最大连续 1 的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/solution/1004-zui-da-lian-xu-1de-ge-shu-iii-hua-dong-chuang/) 原题。

因此实际上我们要求的是上面两种情况:

1. a 表示 0， b 表示 1
2. a 表示 1， b 表示 0

的较大值。

> lucifer 小提示： 其实我们也可以仅仅考虑一种情况，比如 a 看成是 0 ， b 看成是 1。这个时候， 我们操作变成了两种情况，0 变成 1 或者 1 变成 0，同时求解的也变成了最长连续 0 或者 最长连续 1 。 由于这种抽象操作起来更麻烦， 我们不考虑。

问题得到了抽象就好解决了。我们只需要记录下加入窗口的是 0 还是 1：

- 如果是 1，我们什么都不用做
- 如果是 0，我们将 m 减 1

相应地，我们需要记录移除窗口的是 0 还是 1:

- 如果是 1，我们什么都不做
- 如果是 0，说明加进来的时候就是 1，加进来的时候我们 m 减去了 1，这个时候我们再加 1。

> lucifer 小提示： 实际上题目中是求**连续** a 或者 b 的长度。看到连续，大家也应该有滑动窗口的敏感度， 别管行不行， 想到总该有的。

我们拿 A = [1, 1, 0, 1, 0, 1], m = 1 来说。看下算法的具体过程：

> lucifer 小提示： 左侧的数字表示此时窗口大小，黄色格子表示修补的墙，黑色方框表示的是窗口。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gih11ey3hhj30ks05o0sx.jpg)

这里我形象地将 0 看成是洞，1 看成是墙， 我们的目标就是补洞，使得连续的墙最长。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gih12xgf04j30ik054dfx.jpg)

每次碰到一个洞，我们都去不加选择地修补。由于 m 等于 1， 也就是说我们最多补一个洞。因此需要在修补超过一个洞的时候，我们需要调整窗口范围，使得窗口内最多修补一个墙。由于窗口表示的就是连续的墙（已有的或者修补的），因此最终我们返回窗口的最大值即可。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gih1588r5kj30xe0dm770.jpg)

> 由于下面的图窗口内有两个洞，这和”最多补一个洞“冲突， 我们需要收缩窗口使得满足“最多补一个洞”的先决条件。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gih1ac1v5ij30o60ba76r.jpg)

因此最大的窗口就是 max(2, 3, 4, ...) = 4。

> lucifer 小提示： 可以看出我们不加选择地修补了所有的洞，并调整窗口，使得窗口内最多有 m 个修补的洞，因此窗口的最大值就是答案。然而实际上，我们并不需要真的”修补“（0 变成 1），而是仅仅修改 m 的值即可。

我们先来看下抽象之后的**其中一种情况**的代码：

```py
class Solution:
    def longestOnes(self, A: List[int], m: int) -> int:
        i = 0
        for j in range(len(A)):
            m -= 1 - A[j]
            if m < 0:
                m += 1 - A[i]
                i += 1
        return j - i + 1

```

因此**完整代码**就是：

```py
class Solution:
    def longestOnes(self, A: List[int], m: int) -> int:
        i = 0
        for j in range(len(A)):
            m -= 1 - A[j]
            if m < 0:
                m += 1 - A[i]
                i += 1
        return j - i + 1
    def longestAorB(self, A:List[int], m: int) -> int:
        return max(self.longestOnes(map(lambda x: 0 if x == 'a' else 1, A) ,m), self.longestOnes(map(lambda x: 1 if x == 'a' else 0, A),m))
```

这里的两个 map 会生成两个不同的数组。 我只是为了方便大家理解才新建的两个数组， 实际上根本不需要，具体见后面的代码.

### 代码(Python)

```py
i = 0
n, m = map(int, input().split(" "))
s = input()
ans = 0
k = m #   存一下，后面也要用这个初始值
# 修补 b
for j in range(n):
    m -= ord(s[j]) - ord('a')
    if m < 0:
        m += ord(s[i]) - ord('a')
        i += 1
ans = j - i + 1
i = 0
# 修补 a
for j in range(n):
    k += ord(s[j]) - ord('b')
    if k < 0:
        k -= ord(s[i]) - ord('b')
        i += 1
print(max(ans, j - i + 1))

```

**复杂度分析**

- 时间复杂度：$O(N)$
- 空间复杂度：$O(1)$

### 小结

这道题就是一道换了皮的力扣题，难度中等。如果你能将问题抽象，同时又懂得滑动窗口，那这道题就很容易。我看了题解区的参考答案， 内容比较混乱，不够清晰。这也是我写下这篇文章的原因之一。

## 总结

这一套字节跳动的题目一共四道，一道设计题，三道算法题。

其中三道算法题从难度上来说，基本都是中等难度。从内容来看，基本都是力扣的换皮题。但是如果我不说他们是换皮题， 你们能发现么？ 如果你可以的话，说明你的抽象能力已经略有小成了。如果看不出来也没有关系，关注我。 手把手扒皮给你们看，扒多了慢慢就会了。切记，不要盲目做题！如果你做了很多题， 这几道题还是看不出套路，说明你该缓缓，改变下刷题方式了。

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 36K+ star 啦。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)
