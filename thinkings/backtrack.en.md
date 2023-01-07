# Backtracking

Backtracking is a technique in DFS. The backtracking method adopts [trial and error](https://zh.wikipedia.org/wiki/%E8%AF%95%E9%94%99) The thought, it tries to solve a problem step by step. In the process of step-by-step problem solving, when it finds that the existing step-by-step answers cannot be effectively answered correctly by trying, it will cancel the previous step or even the calculation of the previous few steps, and then try again to find the answer to the question through other possible step-by-step answers.

In layman's terms, backtracking is an algorithm that turns back if you can't get there.

The essence of backtracking is to enumerate all possibilities. Although sometimes some branches that cannot be the answer can be removed by pruning, in essence, it is still a violent enumeration algorithm.

The backtracking method can be abstract as a tree structure, and it is a tree of limited height (N-prong tree). The backtracking method solves the problem of finding subsets in a collection. The size of the collection is the fork tree of the tree, the depth of recursion, and the height of the tree.

Take a subset of the array [1,2,3] as an example：

![](https://p.ipic.vip/g9vawf.jpg)

> The for loop is used to enumerate the division points. In fact, the interval dp division interval is a similar approach.

As shown in the figure above, we will perform the operation of adding to the result set at each node.

![](https://p.ipic.vip/1flyhe.jpg)

For the gray nodes above, adding the result set is [1].

![](https://p.ipic.vip/mj1skc.jpg)

The result set of this addition is [1,2].

![](https://p.ipic.vip/y9t2mb.jpg)

The result set of this addition is [2,3], and so on. There are six subsets in total, namely [1], [1,2], [1,2,3], [2], [2,3] And [3].

For the full arrangement problem, the leaf nodes will be added to the result set, but this is a matter of detail. After mastering the idea, everyone will learn the details and do more with less effort.

Let's take a look at how to write the specific code.

## Algorithm flow

1. Construct a spatial tree.
2. Traverse.
3. If you encounter a boundary condition, you will no longer search down and search for another chain instead.
4. Achieve the target conditions and output the results.

## Algorithm Template

Pseudo code：

```js
const visited = {}
function dfs(i) {
if (meet specific conditions) {
// Return result or exit search space
}

Visited[i] = true// Mark the current status as searched
dosomething(i) // Do some operations on i
for (according to the next state j that i can reach) {
if (! Visited[j]) { / / If status j has not been searched
dfs(j)
}
}
undo(i) // Restore i
}
```

## Pruning

Another test point for backtracking questions is pruning. By pruning properly, time can be effectively reduced. For example, I optimized the time of Stone game V from more than 900 ms to more than 500 ms through pruning operations.

The skills of pruning in each question are different, but a simple principle is to avoid recursion that cannot be the answer at all.

For example: [842. Split the array into a Fibonacci sequence](https://leetcode-cn.com/problems/split-array-into-fibonacci-sequence /)

Title description：

```
Given a numeric string S, such as S= "123456579", we can divide it into a Fibonacci sequence [123, 456, 579].

Formally, a Fibonacci sequence is a list of non-negative integers F, and satisfies：

0<=F[i] <= 2^31 - 1，（ In other words, every integer conforms to the 32-bit signed integer type)；
F. length >= 3；
For all 0 <=i<F. Length-2, all have F[i] +F[i+1] = F[i+2] established.
In addition, please note that when splitting a string into small pieces, the number of each block must not start with zero, unless the block is the number 0 itself.

Returns any set of Fibonacci sequence blocks split from S, or [] if it cannot be split.



Example 1：

Input: "123456579"
Output: [123,456,579]
Example 2：

Input: "11235813"
Output: [1,1,2,3,5,8,13]
Example 3：

Input: "112358130"
Output: []
Explanation: This task cannot be completed.
Example 4：

Input: "0123"
Output:[]
Explanation: The number of each block cannot start with zero, so "01"，"2"，"3" Not a valid answer.
Example 5：

Input: "1101111"
Output: [110, 1, 111]
Explanation: The output [11,0,11,11] is also accepted.


prompt：

1 <= S. length <= 200
The string S contains only numbers.
```

It is better to solve it directly by backtracking the template. But if you don't prune appropriately, it's easy to time out. Here I performed four pruning operations, depending on the code for details.

```py
class Solution:
def splitIntoFibonacci(self, S: str) -> List[int]:
def backtrack(start, path):
#Pruning 1
if len(path) > 2 and path[-1] ! = path[-2] + path[-3]:
return []
if start >= len(S):
if len(path) > 2:
return path
return []

cur = 0
ans = []
# Enumerate split points
for i in range(start, len(S)):
# Pruning 2
if i > start and S[start] == '0':
return []
cur = cur * 10 + int(S[i])
# Pruning 3
if cur > 2**31 - 1:
return []
path. append(cur)
ans = backtrack(i + 1, path)
# Pruning 4
if len(ans) > 2:
return ans
path. pop()
return ans

return backtrack(0, [])

```

The pruning process is graphically represented like this：

![](https://p.ipic.vip/bjh1zs.jpg)

**Pruning algorithm is a major test point for backtracking, everyone must be able to master it. **

## Cartesian product

For some backtracking topics, we can still use the Cartesian product method to save the result in the return value instead of the path, thus avoiding the backtracking state, and since the result is in the return value, we can use memorized recursion to optimize it into a form of dynamic programming.

Reference title：

- [140. Word Split II](https://github.com/azl397985856/leetcode/blob/master/problems/140.word-break-ii.md)
- [401. Binary watch](../problems/401.binary-watch.md)
- [816. Fuzzy coordinates](https://github.com/azl397985856/leetcode/blob/master/problems/816.ambiguous-coordinates.md)

This kind of problem is different from subsets and permutations. The combination is regular. We can use the Cartesian product formula to combine two or more subsets.

## Classic title

- [39. Combination sum)(../problems/39.combination-sum.md)
- [40. Combination sum II](../problems/40.combination-sum-ii.md)
- [46. Full arrangement](../problems/46.permutations.md)
- [47. Full arrangement II](../problems/47.permutations-ii.md)
- [52. N Queen II](../problems/52.N-Queens-II.md)
- [78. Subsets)(../problems/78.subsets.md)
- [90. Subsets II](../problems/90.subsets-ii.md)
- [113. Path sum II)(../problems/113.path-sum-ii.md)
- [131. Split palindrome string](../problems/131.palindrome-partitioning.md)
- [1255. Collection of words with the highest score](../problems/1255.maximum-score-words-formed-by-letters.md)

## Summary

The essence of backtracking is to violently enumerate all possibilities. It should be noted that since the result set of backtracking is usually recorded on the path of the backtracking tree, if the undo operation is not performed, the state may be incorrect after the backtracking and the results may be different. Therefore, it is necessary to undo the state when it is bubbling up from the bottom of the recursion.

If you copy a copy of data every time you recursively process, there is no need to undo the state, and the relative spatial complexity will increase.
