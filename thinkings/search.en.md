# Search Problems

Search generally refers to enumerating in a finite state space, and finding eligible solutions or the number of solutions by exhausting all possibilities. Depending on the search method, the search algorithm can be divided into DFS, BFS, A\* algorithm, etc. Only DFS and BFS are introduced here, as well as a technique that occurs on DFS-backtracking.

The coverage of search questions is very extensive, and it also accounts for a high proportion of algorithm questions. I even mentioned in my public speech that front-end algorithms account for a large proportion of search categories in interviews, especially domestic companies.

There are many sub-topics in the search topic, and the well-known BFS and DFS are only the most basic content. In addition, there are status recording and maintenance, pruning, unicom components, topological sorting, and so on. I will introduce these contents to you one by one here.

In addition, even if only the two basic algorithms of DFS and BFS are considered, there are many tricks that can be played in it. For example, the two-way search of BFS, such as the front, middle and back sequence of DFS, iterative deepening, and so on.

Regarding search, in fact, it has been introduced in the binary tree section. And the search here is actually a further generalization. The data structure is no longer limited to the arrays, linked lists, or trees mentioned earlier. And extended to such as two-dimensional arrays, multi-prong trees, graphs, etc. However, the core is still the same, except that the data structure has changed.

## What is the core of search?

In fact, the essence of searching for a topic is to map the states in the topic to the points in the graph, and to map the connections between states to the edges in the graph. The state space is constructed based on the topic information, and then the state space is traversed. The traversal process needs to record and maintain the state, and improve the search efficiency through pruning and data structure. \*\*

Different data structures in the state space can lead to different algorithms. For example, searching for arrays is not the same as searching for trees and graphs.

Once again, the arrays, trees, and graphs I am talking about here are the logical structures of the state space, not the data structures given in the title. For example, the title gives an array that allows you to search for a subset of the array. Although the title gives an array of linear data structures, we actually search for nonlinear data structures such as trees. This is because the state space corresponding to this question is non-linear.

For search issues, what is our core focus on information? How to calculate it? This is also the core concern of the search article. And many of the information on the market is not very detailed. There are many indicators that need to be paid attention to in the core of the search, such as the depth of the tree, the DFS sequence of the graph, the distance between the two points in the graph, and so on. \*\*These indicators are essential for completing advanced algorithms, and these indicators can be achieved through some classic algorithms. This is why I have always emphasized that I must first learn the basic data structure and algorithm.

However, it is not easy to complete these narratives, so that it may take a lot of time to complete them, so I have not started to write them.

In addition, because other data structures can be regarded as special cases of graphs. Therefore, by studying the basic idea of permutations, it is easy to extend it to other data structures, such as trees. Therefore, I plan to explain around the graph and gradually visualize it to other special data structures, such as trees.

## State space

Conclusion first: **The state space is actually a graph structure. The nodes in the graph represent the state, and the edges in the graph represent the connection before the state. This connection is the various relationships given in the title.**.

The state space of the search topic is usually non-linear. For example, the example mentioned above: find a subset of an array. The state space here is actually a variety of combinations of arrays.

For this question, a feasible way to divide the state space is：

- A subset of length 1
- A subset of length 2 -. 。 。 -A subset of length n (where n is the length of the array)

And how to determine all the subsets above.

One feasible solution is to determine one by one in a manner similar to partition.

For example, we can：

-First determine what is the first number of a certain subset -Then determine what the second number is -. 。 。

How to determine the first number and the second number. 。 。 What?

**Just enumerate all possibilities violently. **

> This is the core of the search problem, and everything else is auxiliary, so please remember this sentence.

The so-called violent enumeration of all possibilities here is to try all possible numbers in the array.

-For example, what is the first number? Obviously it may be any item in the array. Ok, let's enumerate n situations. -What about the second number? Obviously it can be any number other than the number that has been selected above. Ok, let's enumerate n-1 situations.

Based on this, you can draw the following decision tree.

(The figure below describes part of the process of making decisions on an array of length 3. The numbers in the tree nodes represent the index. That is, it is determined that there are three choices for the first number, and it is determined that the second number will become the remaining two choices based on the last choice)

![](https://p.ipic.vip/xk7cqr.jpg)

Animated demonstration of the decision-making process：

![Search-decision tree. svg](https://pic. stackoverflow. wiki/uploadImages/115/238/39/106/2021/05/27/18/33/b97ee92b-a516-48e1-83d9-b29c1eaf2eff. svg)

**Some search algorithms are based on this simple idea, and the essence is to simulate this decision tree. There are actually many interesting details in it, which we will explain in more detail later. And now everyone only needs to have a little idea of what the solution space is and how to traverse the solution space. ** I will continue to deepen this concept later.

Here everyone just needs to remember that the state space is the graph, and the construction state space is the construction graph. How to build it? Of course, it is described according to the title.

## DFS and BFS

DFS and BFS are the core of search and run through the search article, so it is necessary to explain them first.

### DFS

The concept of DFS comes from graph theory, but there are still some differences between DFS in search and DFS in graph theory. DFS in search generally refers to violent enumeration through recursive functions.

> If you do not use recursion, you can also use stacks to achieve it. But it is similar in nature.

First map the state space of the topic to a graph. The state is the node in the graph, and the connection between the states is the edge in the graph. Then DFS performs depth-first traversal on this graph. The BFS is similar, except that the traversal strategy has become **Breadth first**, and it is spread out layer by layer. Therefore, BFS and DFS are just two ways to traverse this state diagram. How to construct the state diagram is the key.

In essence, if you traverse the above graph, a search tree will be generated. In order to avoid repeated visits, we need to record the nodes that have been visited. These are common to all search algorithms, and will not be repeated later.

If you are traversing on a tree, there will be no rings, and naturally there is no need to record the nodes that have been visited in order to avoid the generation of rings. This is because the tree is essentially a simple acyclic graph.

#### Algorithm flow

1. First put the root node in the **stack**.
2. Take the first node from _stack_ and verify whether it is the target. If the target is found, the search ends and the result is returned. Otherwise, add one of its direct child nodes that have not been tested to the stack.
3. Repeat Step 2.
4. If there is no direct child node that has not been detected. Add the previous node to the **stack**. Repeat Step 2.
5. Repeat step 4.
6. If **stack** is empty, it means that the entire picture has been checked-that is, there are no targets to search for in the picture. End the search and return “Target not found".

> The stack here can be understood as a self-implemented stack, or as a call stack

#### Algorithm Template

Below we use recursion to complete DFS.

```js
const visited = {}
function dfs(i) {
if (meet specific conditions) {
// Return result or exit search space
}

Visited[i] = true// Mark the current status as searched
for (according to the next state j that i can reach) {
if (! Visited[j]) { / / If status j has not been searched
dfs(j)
}
}
}
```

#### Common techniques

##### Preorder traversal and postorder traversal

The common forms of DFS are **preorder and **postorder. The usage scenarios of the two are also very different.

The above describes that the essence of search is to traverse the state space, and the states in the space can be abstract as points in the graph. Then if during the search process, the results of the current point need to depend on other nodes (there will be dependencies in most cases), then the traversal order becomes important.

For example, the current node needs to rely on the calculation information of its child nodes, so it is necessary to use back-order traversal to recurse from the bottom up. And if the current node needs to rely on the information of its parent node, it is not difficult to think of top-down recursion using first-order traversal.

For example, the depth of the calculation tree to be discussed below. Since the recursive formula for the depth of the tree is: $f(x) = f(y) + 1$. Where f(x) represents the depth of node x, and x is a child node of Y. Obviously, the base case of this recursive formula is that the root node depth is one. Through this base case, we can recursively find the depth of any node in the tree. Obviously, it is simple and straightforward to use the top-down method of first-order traversal to count statistics.

For example, we will talk about calculating the number of child nodes of the tree below. Since the recursive formula for the child nodes of the tree is: $f(x)= sum_{i=0}^{n}{f(a_i)}$ where x is a node in the tree, and$a_i$ is the child node of the node in the tree. The base case does not have any child nodes (that is, leaf nodes), at this time $f(x) = 1$. Therefore, we can use the back-order traversal to complete the statistics of the number of child nodes from the bottom up.

Regarding the traversal method used for the analysis of recursive relationships, I described this in detail in the sub-topic "Simulation, Enumeration and Recursion" in the basic article of "91 Days Learning Algorithm". 91 Students can view it directly. Regarding the various traversal methods of trees, I am in [Tree topic](https://leetcode-solution.cn/solutionDetail?url=https%3A%2F%2Fapi.github.com%2Frepos%2Fazl397985856%2Fleetcode%2Fcontents%2Fthinkings%2Ftree.md&type=1) is introduced in detail.

##### Iterative deepening

Iterative deepening is essentially a feasible pruning. Regarding pruning, I will introduce more in the "Backtracking and Pruning" section later.

The so-called iterative deepening refers to the optimization method of actively reducing the recursion depth by setting the recursion depth threshold when the recursion tree is relatively deep, and exiting when the threshold is exceeded. \*\*The premise of the establishment of this algorithm is that the answer in the question tells us that the answer does not exceed xxx, so that we can use xxx as the recursion depth threshold, so that not only will we not miss the correct solution, but we can also effectively reduce unnecessary operations in extreme cases.

Specifically, we can use a top-down approach to record the level of the recursive tree, which is the same as the method of calculating the depth of the tree described above. Next, add the judgment of whether the current level exceeds the threshold value before the main logic.

Main code：

```py
MAX_LEVEL = 20
def dfs(root, level):
if level > MAX_LEVEL: return
# Main logic
dfs(root, 0)

```

This technique is not common in actual use, but it can play unexpected effects at some times.

##### Two-way search

Sometimes the scale of the problem is very large, and the direct search will time out. At this time, you can consider searching from the starting point to half of the scale of the problem. Then save the state generated in this process. Next, the goal is to find a state that meets the conditions in the stored intermediate state. In turn, the effect of reducing the time complexity is achieved.

The above statement may not be easy to understand. Next, use an example to help everyone understand.

###### Title address

https://leetcode-cn.com/problems/closest-subsequence-sum/

###### Title description

```
Give you an array of integers nums and a target value goal.

You need to select a sub-sequence from nums so that the sum of the elements of the sub-sequence is closest to the goal. In other words, if the sum of the elements of the sub-sequence is sum, you need to minimize the absolute difference abs (sum-goal).

Returns the minimum possible value of abs (sum-goal).

Note that the sub-sequence of an array is an array formed by removing certain elements (possibly all or none) from the original array.



Example 1：

Input: nums = [5,-7,3,5], goal = 6
Output: 0
Explanation: Select the entire array as the selected sub-sequence, and the sum of the elements is 6.
The sub-sequence sum is equal to the target value, so the absolute difference is 0.
Example 2：

Input: nums = [7, -9,15, -2], goal = -5
Output: 1
Explanation: Select the sub-sequence [7,-9, -2], and the element sum is -4.
The absolute difference is abs(-4-(-5)) = abs(1) =1, which is the minimum possible value.
Example 3：

Input: nums = [1,2,3], goal = -7
Output: 7


prompt：

1 <= nums. length <= 40
-10^7 <= nums[i] <= 10^7
-10^9 <= goal <= 10^9


```

###### Idea

As can be seen from the data range, the high probability of this question is a solution with 时间 O(2^m) 时间 time complexity, where m is nums. Half of the length.

Why? First of all, if the length of the topic array is limited to less than or equal to 20, then the probability is that there is a solution of $O(2^n)$.

> If you don't know this, it is recommended to take a look at this article https://lucifer . ren/blog/2020/12/21/ Shuati-silu3/ In addition, my question-brushing plugin leetcode-cheateet also gives a quick look-up table of time complexity for your reference.

Just cut 40 in half and it will be AC. In fact, the number 40 is a powerful signal.

Back to the topic. We can use a binary bit to represent a subset of the original array nums, so that an array with a length of $2^n$ can describe all subsets of nums. This is state compression. Generally, if the data range of the topic is <=20, you should think of it.

> Here 40% off is 20.

> If you are not familiar with state compression, you can take a look at my article [What is state compression DP? This question will get you started](https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247486874&idx=1&sn=0f27ddd51ad5b92ef0ddcc4fb19a3f5e&chksm=eb88c183dcff4895209c4dc4d005e3bb143cc852805594b407dbf3f4718c60261f09c2849f70&token=1227596150&lang=zh_CN#rd)

Next, we use dynamic programming to find the sum of all subsets.

Let dp[i] represent the sum of the selection conditions as shown in I. What is the **selection situation as shown in i? **

For example, I ask for the sum of subsets of nums. Then there are 子集 2^n 子集 subsets of nums, that is, every number in nums has both ** selection and non-selection**. Therefore, there are a total of 种 2^n 种 species. If the binary of a number is used to represent this selection situation, where 0 means that 1 is selected and 1 means that it is not selected, then a sufficient number of digits (the number of binary digits needs to be greater than n) can be used to represent a possible selection situation.

We can enumerate each item of the array, and for each item we consider adding it to the selection. Then the transfer equation is:'dp[(1<<i)+j] = dp[j]+A[i]`, where j is a subset of i, and the binaries of i and j represent the selection of nums.

The subsets and codes for dynamic planning are as follows：

```py
def combine_sum(A):
n = len(A)
dp = [0] * (1 << n)
for i in range(n):
for j in range(1 << i):
dp[(1<<i)+j]= dp[j]+A[i]# add i to select
return dp
```

Next, we divide nums into two parts equally, and calculate the subsets and：

```py
n = len(nums)
c1 = combine_sum(nums[: n // 2])
c2 = combine_sum(nums[n // 2 :])
```

Where c1 is the sum of the subsets of the first half of the array, and c2 is the sum of the subsets of the second half.

Next, the question is transformed into: `Find two numbers in the two arrays c1 and c2, and the sum is closest to the goal`. And this is a very classic two-pointer problem, the logic is similar to the sum of two numbers.

It's just that the sum of two numbers is an array to pick two numbers, here is the two arrays to pick one number each.

In fact, only one pointer is needed to point to the head of one array and the other to the end of another array.

The code is not difficult to write：

```py
def combine_closest(c1, c2):
# Sort first to use double pointers
c1. sort()
c2. sort()
ans = float("inf")
i, j = 0, len(c2) - 1
while i < len(c1) and j >= 0:
_sum = c1[i] + c2[j]
ans = min(ans, abs(_sum - goal))
if _sum > goal:
j -= 1
elif _sum < goal:
i += 1
else:
return 0
return ans
```

If you don't understand the above code, take a look at the sum of the two numbers.

###### Code

Code support: Python3

Python3 Code:

```py
class Solution:
def minAbsDifference(self, nums: List[int], goal: int) -> int:
def combine_sum(A):
n = len(A)
dp = [0] * (1 << n)
for i in range(n):
for j in range(1 << i):
dp[(1 << i) + j] = dp[j] + A[i]
return dp

def combine_closest(c1, c2):
c1. sort()
c2. sort()
ans = float("inf")
i, j = 0, len(c2) - 1
while i < len(c1) and j >= 0:
_sum = c1[i] + c2[j]
ans = min(ans, abs(_sum - goal))
if _sum > goal:
j -= 1
elif _sum < goal:
i += 1
else:
return 0
return ans

n = len(nums)
return combine_closest(combine_sum(nums[: n // 2]), combine_sum(nums[n // 2 :]))

```

**Complexity analysis**

Let n be the length of the array and m be $\frac{n}{2}$.

-Time complexity:$O(m*2^m)$ -Spatial complexity:$O(2^m)$

Related topics recommended：

- [16. The sum of the three closest numbers](https://leetcode-cn.com/problems/3sum-closest /)
- [1049. The weight of the last stone II](https://leetcode-cn.com/problems/last-stone-weight-ii /)
- [1774. The cost of dessert closest to the target price](https://leetcode-cn.com/problems/closest-dessert-cost /)

What does this question have to do with two-way search?

Go back to what I said at the beginning: 'Sometimes the scale of the problem is very large, and the direct search will time out. At this time, you can consider searching from the starting point to half of the scale of the problem. Then save the state generated in this process. Next, the goal is to find a state that meets the conditions in the stored intermediate state. In turn, the effect of reducing the time complexity is achieved. `

Corresponding to this question, if we search directly by violence. That is to enumerate the sum of all subsets, and then find the one closest to the goal. The idea is simple and straightforward. But this will time out, so half of the search will be done, and then the status will be saved (the corresponding question is stored in the dp array). Next, the problem is transformed into the operation of two dp arrays. \*\*This algorithm essentially moves the constant term located in the exponential position to the coefficient position. This is a common two-way search, let me just call it the two-way search of DFS. The purpose is to distinguish it from the later BFS two-way search.

### BFS

BFS is also a kind of algorithm in graph theory. Unlike DFS, BFS adopts a horizontal search method, which expands layer by layer from the initial state to the target state, and usually adopts a queue structure in the data structure.

Specifically, we continue to take out the state from the head of the team, and then push all the new states generated by the decision corresponding to this state into the end of the team, and repeat the above process until the queue is empty.

Note that there are two key points here：

1. The decision corresponding to this state. In fact, this sentence refers to the edges of the graph in the state space, and both DFS and BFS edges are determined. In other words, whether it is DFS or BFS, the decision is the same. What is the difference? The difference is that the direction of decision-making is different.
2. All new states are pushed into the end of the team. The above says that BFS and DFS have different directions for making decisions. This can be reflected in this action. Since all the neighbors of the current point in the state space are directly placed at the end of the team. Due to the first-in, first-out nature of the queue, the neighbors of the current point will not continue to expand out until the access is completed. You can compare this with DFS.

The simplest BFS adds one step every time it expands to a new state, and approaches the answer step by step in this way. In fact, it is equivalent to performing BFS on a graph with a weight of 1. Due to the monotonicity and binarization of the queue, it takes the least number of steps when the target state is taken out for the first time. Based on this feature, BFS is suitable for solving some problems with minimal operations.

> Regarding monotonicity and binarity, I will explain the comparison of BFS and DFS later.

As mentioned in the previous DFS section, no matter what search it is, the status needs to be recorded and maintained. One of them is the node access status to prevent the generation of rings. In BFS, we often use it to find the shortest distance of a point. It is worth noting that sometimes we use a hash table dist to record the distance from the source point to other points in the graph. This dist can also act as a function to prevent rings from being generated. This is because after reaching a point for the first time, the distance to reach this point again must be larger than the first time. Using this point, you can know whether it is the first time to visit.

#### Algorithm flow

1. First put the root node in the queue.
2. Take out the first node from the queue and verify whether it is the target. -If the target is found, the search ends and the result is returned. -Otherwise, all its direct child nodes that have not been verified will be added to the queue.
3. If the queue is empty, it means that the entire picture has been checked-that is, there are no targets to search for in the picture. End the search and return “Target not found".
4. Repeat Step 2.

#### Algorithm Template

```js
const visited = {}
function bfs() {
let q = new Queue()
q. push (initial state)
while(q. length) {
let i = q. pop()
if (visited[i]) continue
For (the reachable state of i j) {
if (j is legal) {
q. push(j)
}
}
}
// Find all legal solutions
}
```

#### Common techniques

##### Two-way search

###### Title address (126. (Solitaire II)

https://leetcode-cn.com/problems/word-ladder-ii/

###### Title description

```
Complete the conversion from the word beginWord to the word endWord according to the dictionary wordList. A conversion sequence that represents this process is formally like beginWord-> s1->s2->. . . - > sk such a sequence of words and satisfy：
```
