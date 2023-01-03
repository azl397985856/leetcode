## 题目描述

```
You are given a list of positive integers tickets. Each tickets[i] represents the number of tickets person i wants to buy. Tickets are bought in round robin with i = 0 person buying first. They buy exactly 1 ticket and it takes 1 unit of time to buy the ticket. Afterwards, if they need to buy more tickets, they will go to the end of the queue and wait for their turn.

For each person, return the number of time units it takes to buy all of their tickets.

Constraints

0 ≤ n ≤ 100,000 where n is the length of tickets
Example 1
Input
tickets = [2, 1, 2]
Output
[4, 2, 5]
Explanation
The first person buys a ticket and the queue becomes [1, 2, 1]
The second person buys a ticket and the queue becomes [2, 1]
The third person buys a ticket and the queue becomes [1, 1]
The first person buys a ticket and the queue becomes [1]
The third person buys a ticket and the queue becomes []
```

## 暴力模拟(TLE)

### 思路

我们可以使用双端队列暴力模拟这个过程，直到队列全为空。

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, tickets):
        q = collections.deque([(i, ticket) for i, ticket in enumerate(tickets)])
        ans = [0] * len(tickets)
        time = 0
        while q:
            i, cur = q.popleft()
            time += 1
            if cur > 1:
                q.append((i, cur - 1))
            else:
                ans[i] = time

        return ans
```

## 排序 + 平衡二叉树

### 思路

通过观察发现：对于一个人 p 来说，他需要等待的时间 t 为 ： `比他票少的人的等待总时长 a1` + `比他票多的人的等待总时长（截止到t）a2` + `排在他前面且票不比他少的总人数a3`。

其实 a2 就是比 p 票多的人的个数乘以 a - 1。其中 a 就是 p 的票的个数。

由于我们需要统计比 p 票多的和票少的人的个数，因此我们可以先对数组进行升序排序。然后进行一次从左到右的遍历。

那么 p 所需要等的时间就是上面的 a1 + a2 + a3 。

假设当前 p 排序后的索引为 j，数组长度为 n。那么：

- a1 其实就是排序数组的前缀和，边扫描边计算即可
- a2 是 $(n - j) * (a - 1)$,
- a3 是什么呢？a3 是排在他前面且票不比他少的总人数 a3。反过来思考，如果计算出了**排在他前面且票比他少的总人数**，是不是就可以了呢？由于我们进行了一次排序，那么显然前面的都是比它小的，且是**所有比它小的**，那这些比它小的还满足**排序前在它前面的有几个呢**？这提示我们使用平衡二叉树来维护，这样可以在 $O(logn)$ 完成。

> 如果不使用平衡二叉树，那么时间复杂度会是 $O(n)$

这里有一个图可以很好地说明这一点。

这里我直接用的别人画好的图进行说明。

![](https://p.ipic.vip/cn3s63.jpg)

- 图中的 ps 就是我说的 a1
- 图中的 $(n - j) * (ai - 1)$ 就是我的 a2
- 图中的 i + 1 - S1.bisect(i)

> 图来自 https://imgur.com/a/gu23abb

### 代码

代码支持：Python3

Python3 Code:

```py
class Solution:
    def solve(self, a):
        n = len(a)
        answer = [0 for i in range(n)]
        sl = SortedList()
        ps = 0
        for j, (ai, i) in enumerate(sorted((ai, i) for i, ai in enumerate(a))):
            answer[i] = ps + (n - j) * (ai - 1) + (i + 1 - sl.bisect_left(i))
            sl.add(i)
            ps += ai
        return answer
```

**复杂度分析**

- 时间复杂度：$O(nlogn)$
- 空间复杂度：$O(n)$
