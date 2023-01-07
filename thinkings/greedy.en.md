# Greedy strategy

Greedy strategy is a common algorithmic idea. Specifically, it means that when solving a problem, always make the best choice that seems to be the best at the moment. In other words, it is not considered from the overall optimal point of view. What he has made is a locally optimal solution in a certain sense. The greedy algorithm does not obtain the overall optimal solution for all problems, such as the coin change problem. The key is the choice of greedy strategy.

The selected greedy strategy must be non-efficacious, that is, the process before a certain state will not affect the future state, and it is only related to the current state. This is the same as dynamic planning. Greedy strategies are similar to dynamic planning, and in most cases they are also used to deal with `extreme value problems`.

There are 73 questions on greedy strategies on LeetCode. We will divide it into several types to explain. As of now, we only provide `coverage` questions for the time being. Other types can look forward to my new book or future explanatory articles.

## 复问题问题问题

We have selected three questions to explain. In addition to using the greedy method, you can also try dynamic planning to solve these three questions.

- [45. Jumping Game II](https://leetcode-cn.com/problems/jump-game-ii /), difficult
- [1024. Video stitching](https://leetcode-cn.com/problems/video-stitching /), medium
- [1326. Minimum number of taps for irrigating the garden](https://leetcode-cn.com/problems/minimum-number-of-taps-to-open-to-water-a-garden /), difficult

A major feature of the coverage problem, we can abstract it as `a large interval I on a given number axis and n small cells i[0], i[1],. . . , i[n-1], ask how many cells to choose at least, so that the union of these cells can cover the entire large area. `

Let's take a look at these three questions.

### 45. Jumping Game II

#### Title description

```
Given an array of non-negative integers, you are initially in the first position of the array.

Each element in the array represents the maximum length you can jump at that position.

Your goal is to use the least number of jumps to reach the last position in the array.

example:

Input: [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to the last position is 2.
Jump from the position with a subscript of 0 to the position with a subscript of 1, jump 1 step, and then jump 3 steps to reach the last position in the array.
description:

Suppose you can always reach the last position of the array.
```

#### Idea

Here we use the greedy strategy to solve it. That is, every time you choose a position where you can jump farther within the jumpable range.

As shown in the figure below, the starting position is 2, and the range that can be jumped is the orange node. Since 3 can jump farther, enough to cover the situation of 2, it should jump to the position of 3.

![](https://p.ipic.vip/pgh1f7.jpg)

When we jump to the position of 3. As shown in the figure below, the range that can be jumped is 1, 1, and 4 in orange. Since 4 can jump farther, it jumps to the position of 4.

![](https://p.ipic.vip/ccdr3u.jpg)

If you write code, we can use end to represent the current boundary that can be jumped, corresponding to orange 1 in the first picture and orange 4 in the second picture. And when traversing the array, when the boundary is reached, the boundary is updated again.

> Picture from https://leetcode-cn.com/u/windliang/

#### Code

Code support: Python3

Python3 Code:

```python
class Solution:
def jump(self, nums: List[int]) -> int:
n, cnt, furthest, end = len(nums), 0, 0, 0
for i in range(n - 1):
furthest = max(furthest, nums[i] + i)
if i == end:
cnt += 1
end = furthest

return cnt
```

**Complexity analysis**

-Time complexity:$O(N)$.

-Spatial complexity:$O(1)$.

### 1024. Video stitching

#### Title description

```
You will get a series of video clips from a sports event that lasts for T seconds. These fragments may overlap or may vary in length.

Video clips [i] are represented by intervals: they start at clips[i][0] and end at clips[i][1]. We can even freely re-edit these clips, for example, clips [0, 7] can be cut into [0, 1] + [1, 3] + [3, 7] Three parts.

We need to re-edit these clips and stitch the edited content into clips ([0, T]) that cover the entire movement process. Returns the minimum number of fragments required, or -1 if the task cannot be completed.

Example 1：

Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], T = 10
Output: 3
explain：
We choose [0,2], [8,10], [1,9] These three fragments.
Then, remake the game footage according to the following plan：
Re-edit [1,9] to [1,2] + [2,8] + [8,9] 。
Now we have [0,2] + [2,8] + [8,10]， And these cover the entire game [0, 10].
Example 2：

Input: clips = [[0,1],[1,2]], T = 5
Output: -1
explain：
We cannot just use [0,1] and [0,2] to cover the entire process of [0,5].
Example 3：

Input: clips = [[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], T = 9
Output: 3
explain：
We select fragments [0,4], [4,7] and [6,9].
Example 4：

Input: clips = [[0,4],[2,8]], T = 5
Output: 2
explain：
Note that you may record videos that exceed the end time of the game.

prompt：

1 <= clips. length <= 100
0 <= clips[i][0], clips[i][1] <= 100
0 <= T <= 100
```

#### Idea

Here we still use the greedy strategy to solve it. The idea of the previous question is to maintain a further, end variable, and constantly update it greedily. The same is true for this question. The difference is that the data in this question is a two-dimensional array. But if you thoroughly understand the above question, I don't think this question can beat you.

Let's take a look at how similar this question is to the above question.

Take the data given by the title as an example: 'clips = [[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], T= 9`

Let's sort the original array by the start time, and look at the previous part first：`[[0,1], [0,2], [0,3], [0,4], [1,3], [1,4], [2,5], [2,6], . . . ]`

> Note that there is no need to really sort, but an idea similar to bucket sorting, using additional space, refer to the code area for details.

Is this equivalent to the above jumping game: [4,0,2]. At this point, we have successfully converted this question into the question already made above. It's just that there is one difference, that is, the above question is guaranteed to jump to the end, and this question may not be spelled out, so this threshold value needs to be paid attention to. Refer to the code area later for details.

#### Code

Code support: Python3

Python3 Code:

```python

class Solution:
def videoStitching(self, clips: List[List[int]], T: int) -> int:
furthest = [0] * (T)

for s, e in clips:
for i in range(s, e + 1):
# No need to think about it, this is also the reason why I can build a further array of size T
if i >= T:break
furthest[i] = max(furthest[i], e)
# After the above preprocessing, the gap between this question and the above question is very small
# The last here is equivalent to the furthest in the previous question
end = last = ans = 0
for i in range(T):
last = max(last, furthest[i])
# One more threshold value than the above topic
if last == i: return - 1
if end == i:
ans += 1
end = last
return ans

```

**Complexity analysis**

-Time complexity:$O(\sum_{i=1}^{n}ranges[i]+T)$, where ranges[i]is the interval length of clips[i].

-Spatial complexity:$O(T)$.

### 1326. Minimum number of taps for irrigating the garden

#### Title description

```
There is a one-dimensional garden on the x-axis. The length of the garden is n, starting at point 0 and ending at point N.

There are a total of n +1 taps in the garden, which are located at [0, 1,. . . , n].

Give you an integer n and an array of integer ranges of length n +1, where ranges[i](the index starts from 0) means: if you turn on the faucet at point i, the area that can be irrigated is [i-ranges[i], i + ranges[i]].

Please return the minimum number of taps that can irrigate the entire garden. If there is always a place in the garden that cannot be irrigated, please return to -1.

Example 1：
```

![](https://p.ipic.vip/w0ltjw.jpg)

```
Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
explain：
The faucet at point 0 can irrigate the interval [-3,3]
The faucet at point 1 can irrigate the interval [-3,5]
The faucet at point 2 can irrigate the interval [1,3]
The faucet at point 3 can irrigate the interval [2,4]
The faucet at point 4 can irrigate the interval [4,4]
The faucet at point 5 can irrigate the interval [5,5]
You only need to turn on the faucet at point 1 to irrigate the entire garden [0,5].
Example 2：

Input: n = 3, ranges = [0,0,0,0]
Output: -1
Explanation: Even if you turn on all the taps, you can't irrigate the entire garden.
Example 3：

Input: n = 7, ranges = [1,2,1,0,2,1,0,1]
Output: 3
Example 4：

Input: n = 8, ranges = [4,0,0,0,0,0,0,0,4]
Output: 2
Example 5：

Input: n = 8, ranges = [4,0,0,0,4,0,0,0,4]
Output: 1

prompt：

1 <= n <= 10^4
ranges. length == n + 1
0 <= ranges[i] <= 100
```

#### Idea

The idea is the same as the question above. We still use the greedy strategy, continue to follow the above ideas, try our best to find the land that can cover the farthest (right) position, and record the land it covers on the far right.

I won't explain much here. Let's take a look at the specific algorithms, and let's experience for ourselves how similar they are.

algorithm：

-Use further[i] to record the rightmost land that can be covered by each tap I. There are a total of n +1 taps, and we traverse n + 1 times. -Calculate and update the left and right boundaries of the faucet every time [i-ranges[i], i+ ranges[i]] The furthest of the faucet within the range of [i-ranges[i], i+ ranges[i]] -Finally, start from land 0 and traverse all the way to land n, recording the number of taps, similar to a jumping game.

Is it almost exactly the same as the question above?

#### Code

Code support: Python3

Python3 Code:

```python

class Solution:
def minTaps(self, n: int, ranges: List[int]) -> int:
furthest, ans, cur = [0] * n, 0, 0
# Preprocessing
for i in range(n + 1):
for j in range(max(0, i - ranges[i]), min(n, i + ranges[i])):
furthest[j] = max(furthest[j], min(n, i + ranges[i]))
# Old routine
end = last = 0
for i in range(n):
if furthest[i] == 0: return -1
last = max(last, furthest[i])
if i == end:
end = last
ans += 1
return ans

```

**Complexity analysis**

-Time complexity:$O(\sum_{i=1}^{n}R[i]+n)$, where R[i]is the interval length of ranges[i].

-Spatial complexity:$O(n)$.

## Summary

For extreme-value problems, we can consider using dynamic programming and greedy, while it is possible to use dynamic programming and greedy for overlay problems, except that the code and complexity of greedy are usually simpler. But correspondingly, the difficulty of greed lies in how to prove that the local optimal solution can obtain the global optimal solution. Through the study of these questions, I hope you can understand the routines of covering questions, and the underlying layers are all the same. After understanding this, you will look at the topics covered later, and you may discover a new world.

The more than 1,000 pages of e-books I organized have been developed and downloaded. You can go to the background of my public account "Force Buckle Plus" to reply to the e-books to get them.

![](https://p.ipic.vip/ywp3od.png)

![](https://p.ipic.vip/vngp5k.png)

If you have any comments on this, please leave me a message. I will check the answers one by one when I have time. For more algorithm routines, you can visit my LeetCode problem solving warehouse:https://github.com/azl397985856/leetcode . There are already 37K stars.

You can also pay attention to my public account "Force Buckle Plus" to take you to chew off the hard bone of the algorithm.

![](https://p.ipic.vip/yp4ttk.jpg)
