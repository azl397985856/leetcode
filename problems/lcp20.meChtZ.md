## 题目地址(LCP 20. 快速公交)

https://leetcode-cn.com/problems/meChtZ/

## 题目描述

```
小扣打算去秋日市集，由于游客较多，小扣的移动速度受到了人流影响：

小扣从 x 号站点移动至 x + 1 号站点需要花费的时间为 inc；
小扣从 x 号站点移动至 x - 1 号站点需要花费的时间为 dec。

现有 m 辆公交车，编号为 0 到 m-1。小扣也可以通过搭乘编号为 i 的公交车，从 x 号站点移动至 jump[i]*x 号站点，耗时仅为 cost[i]。小扣可以搭乘任意编号的公交车且搭乘公交次数不限。

假定小扣起始站点记作 0，秋日市集站点记作 target，请返回小扣抵达秋日市集最少需要花费多少时间。由于数字较大，最终答案需要对 1000000007 (1e9 + 7) 取模。

注意：小扣可在移动过程中到达编号大于 target 的站点。

示例 1：

输入：target = 31, inc = 5, dec = 3, jump = [6], cost = [10]

输出：33

解释：
小扣步行至 1 号站点，花费时间为 5；
小扣从 1 号站台搭乘 0 号公交至 6 * 1 = 6 站台，花费时间为 10；
小扣从 6 号站台步行至 5 号站台，花费时间为 3；
小扣从 5 号站台搭乘 0 号公交至 6 * 5 = 30 站台，花费时间为 10；
小扣从 30 号站台步行至 31 号站台，花费时间为 5；
最终小扣花费总时间为 33。

示例 2：

输入：target = 612, inc = 4, dec = 5, jump = [3,6,8,11,5,10,4], cost = [4,7,6,3,7,6,4]

输出：26

解释：
小扣步行至 1 号站点，花费时间为 4；
小扣从 1 号站台搭乘 0 号公交至 3 * 1 = 3 站台，花费时间为 4；
小扣从 3 号站台搭乘 3 号公交至 11 * 3 = 33 站台，花费时间为 3；
小扣从 33 号站台步行至 34 站台，花费时间为 4；
小扣从 34 号站台搭乘 0 号公交至 3 * 34 = 102 站台，花费时间为 4；
小扣从 102 号站台搭乘 1 号公交至 6 * 102 = 612 站台，花费时间为 7；
最终小扣花费总时间为 26。

提示：

1 <= target <= 10^9
1 <= jump.length, cost.length <= 10
2 <= jump[i] <= 10^6
1 <= inc, dec, cost[i] <= 10^6
```

## 前置知识

- 递归
- [回溯](https://github.com/azl397985856/leetcode/blob/master/thinkings/backtrack.md)
- 动态规划

## 公司

- 暂无

## 思路

这道题我们可以直接模拟所有可能性，找出最小的即可。

那么如何模拟呢？这里的模拟思路其实和回溯是一样的。我们可以使用递归控制一个变量，递归函数内部控制另外一个变量。

![](https://p.ipic.vip/7tk8cm.jpg)

具体来说，我们可以用递归控制当前位置这一变量，递归函数内部循环遍历 jumps。自然语言表达就是**对于每一个位置 pos，我们都可以选择我先走一步（之后怎么走不管）到终点或者先乘坐一个公交车（之后怎么走不管）到终点**。

核心代码:

```py
def dfs(pos):
 if pos === target: return 0
 if pos > target: return float('inf')
 ans = (target - pos) * inc
 for jump in jumps:
      ans = min(ans, 乘坐本次公交的花费)
  return ans
dfs(0)
```

上面代码大体思路没有问题。 只是少考虑了一个点**小扣可在移动过程中到达编号大于 target 的站点。** 如果加上这个条件，我们递归到 pos 大于 target 的时候**并不能**认为其是一个非法解。

实际上，我们也可采取逆向思维，即从 target 出发返回 0，这无疑和从 0 出发到 target 的花费是等价的， 但是这样可以简化逻辑。为什么可以简化逻辑呢？是不需要考虑大于 target 了么？当然不是，那样会错过正解。我举个例子你就懂了。 比如：

```
target = 5
jumps = [3]
```

当前的位置 pos = 2，选择乘坐公交车会到达 2 \* 3 = 6 。这样往回走一站就可以到达 target 了。如果采用逆向思维如何考虑这一点呢？

逆向思维是从 5 开始。先将 5 / 3 (整数除) 得到 1，余数是 2。 这意味着有两种到达此位置的方式：

- 先想办法到 1，再乘坐本次公交到 3（1 \* 3 = 3），然后想办法往前走 2（5 % 3 = 2）.
- 先想办法到 2，再乘坐本次公交到 6（2 \* 3 = 6），然后想办法往后走 1. (3 - 5 % 3 = 1 )

> 这就考虑到了超过 target 的情况。

特殊地，如果可以整除，我们直接乘坐公交车就行了，无需走路 🚶。

有的同学可能有疑问，为什么不继续下去。 比如：

- 先想办法到 3，再乘坐本次公交到 9（3 \* 3 = 9），然后想办法往后走 1. (3 + 3 - 5 % 3 = 4 )
- 。。。

这是没有必要的，因为这些情况一定都比上面两种情况花费更多。

## 关键点

- 逆向思维

## 代码

- 语言支持：Python3

Python3 Code:

```python

class Solution:
    def busRapidTransit(self, target: int, inc: int, dec: int, jumps: List[int], cost: List[int]) -> int:
        @lru_cache(None)
        def dfs(pos):
            if pos == 0: return 0
            if pos == 1: return inc
            ans = pos * inc
            for i, jump in enumerate(jumps):
                pre_pos, left = pos // jump, pos % jump
                if left == 0: ans = min(ans, cost[i] + dfs(pre_pos))
                else: ans = min(ans, cost[i] + dfs(pre_pos) + inc * left, cost[i] + dfs(pre_pos + 1) + dec * (jump - left))
            return ans
        return dfs(target) % 1000000007

```

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 40K star 啦。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

![](https://p.ipic.vip/5yfrpj.jpg)
