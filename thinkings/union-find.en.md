# Union Find (Disjoint Set) Problem

## Background

I believe everyone has played the following maze game. Your goal is to move from a certain corner of the map to the exit of the map. The rules are simple, as long as you can't pass through the wall.

![](https://p.ipic.vip/r4ihyb.jpg)

In fact, this problem cannot be solved by using parallel collections. However, if I change the rule to, “Is there a path from the entrance to the exit”, then this is a simple unicom question, so that it can be done with the help of the parallel check set to be discussed in this section.

In addition, if the map remains the same, and the locations of the entrances and exits are constantly changed, and you are allowed to judge whether the starting and ending points are connected in turn, and the effect of the collection is higher than you can imagine.

In addition, juxtaposition can also be used as image face recognition in artificial intelligence. For example, the facial data of different angles and different expressions of the same person can be connected. In this way, it is easy to answer whether the two pictures are the same person, regardless of the shooting angle and facial expression.

## Overview

Juxtaposition sets use a tree-based data structure, which is used to deal with some merging and querying problems of Disjoint Sets.

For example, let you ask whether two people know each other indirectly, and whether there is at least one path between the two locations. The above examples can actually be abstract as connectivity issues. That is, if two points are connected, then there is at least one path between the two points that can connect them. It is worth noting that Juancha Ji can only answer “whether it is unicom or not”, but cannot answer questions such as “What is the specific unicom path”. If you want to answer the question “What is the specific unicom path”, you need to use other algorithms, such as breadth-first traversal.

## Image explanation

For example, there are two commanders. There are a number of commanders under the commander, and there are a number of division commanders under the commander. 。 。

### Determine whether the two nodes are connected

How do we judge whether two division commanders belong to the same commander (connectivity)?

![](https://p.ipic.vip/p4t2ub.jpg)

Very simple, we followed the division commander, looked up, and found the commander. If the two division commanders find the same commander, then the two people will be in charge of the same commander. (Assuming that these two are lower in rank than the commander)

If I ask you to judge whether two soldiers belong to the same division commander, you can also search up to the division commander. If the two division commanders searched are the same, it means that the two soldiers belong to the same division commander. (Assuming that these two people are at a lower level than the division commander)

In the code, we can use parent[x] =y to indicate that the parent of x is Y. We can find the root by constantly searching for the parent, and then comparing whether the root is the same to draw conclusions. The root here is actually the representative of the \*\* collection mentioned above.

> The reason why parent is used to store the parent node of each node instead of children is because “we need to find the representative of an element (that is, the root)”

This operation of constantly looking up is generally called find. Using ta, we can easily find out whether the two nodes are connected.

### Merge two UNICOM areas

As shown in the picture, there are two commanders：

![](https://p.ipic.vip/5hao10.jpg)

We merge it into a unicom domain, and the easiest way is to directly point one of the domains to the other.：

![](https://p.ipic.vip/usvfn4.jpg)

The above is a visual explanation of the three core APIs "find", "connected" and "union". Let's take a look at the code implementation.

## Core API

The union-find Algorithm defines two operations for this data structure：

-Find: Determine which subset the element belongs to. It can be used to determine whether two elements belong to the same subset.

-Union: Merge two sub-collections into the same collection.

First, we initialize that each point is a connected domain, similar to the figure below：

![](https://p.ipic.vip/vbnydv.jpg)

In order to define these methods more accurately, it is necessary to define how to represent a collection. A common strategy is to select a fixed element for each collection, called a representative, to represent the entire collection. Next, Find(x) returns the representative of the collection to which x belongs, and Union uses the representative of the two collections as a parameter to merge. At the beginning, everyone's representative was himself.

> The representative here is the “commander” above.

For example, our parent looks like this：

```py
{
"0": "1",
"1": "3",
"2": "3",
"4": "3",
"3": "3"
}
```

### find

If I ask you to find the representative of 0 in the parent above, how to find it?

First, the 'root of the tree` satisfies “parent[x] ==x” in parent. Therefore, we can first find the father parent of 0[0], which is 1. Next, we look at the father parent of 1[1] and find that it is 3, so it is not the root. We continue to look for the father of 3 and find that it is 3 itself. In other words, 3 is the representative we are looking for, so we can return 3.

The above process is obviously recursive, and we can use recursion or iteration to achieve it according to our preferences.

Recursion：

```python
def find(self, x):
while x ! = self. parent[x]:
x = self. parent[x]
return x
```

iteration：

Recursion can also be used to achieve this.

```py
def find(self, x):
if x ! = self. parent[x]:
self. parent[x] = self. find(self. parent[x])
return self. parent[x]
return x
```

Here I compressed the path in the recursively implemented find process, and every time I look up, the height of the tree will be reduced to 2.

What's the use of this? We know that every time we find, we will continue to search up from the current node until we reach the root node. Therefore, the time complexity of find is roughly equal to the depth of the node. If the height of the tree is not controlled, it may be the number of nodes, so the time complexity of find may degenerate to $O(n)$. And if path compression is performed, then the average height of the tree will not exceed $logn$. If path compression is used and the rank-by-rank merger to be discussed below is used, then the time complexity can approach $O(1)$, the specific proof is slightly. However, I drew a picture for everyone to help everyone understand.

> Note that it is approaching O(1), to be precise, it is an inverse function of Ackerman's function.

![](https://p.ipic.vip/gvnmod.gif)

In the extreme case, every path will be compressed. In this case, the time complexity of continuing to find is $O(1)$.

![](https://p.ipic.vip/0y7hub.jpg)

### connected

Just use the find method implemented above directly. If the ancestors of the two nodes are the same, then they are connected.

```python
def connected(self, p, q):
return self. find(p) == self. find(q)
```

### union

Hang one of the nodes to the ancestor of the other node, so that the ancestors of the two are the same. In other words, the two nodes are connected.

For the following figure：

![](https://p.ipic.vip/8u6mqx.jpg)

If we merge 0 and 7 once. That is, `union(0, 7)`, the following process will occur.

-Find the root node of 0 3 -Found the root node of 7 6 -Point 6 to 3. (In order to make the merged tree as balanced as possible, generally choose to mount a small tree on top of a large tree. The following code template will reflect this. The rank of 3 is larger than that of 6, which is more conducive to the balance of the tree and avoids extreme situations)

![](https://p.ipic.vip/p8ng7e.gif)

The small trees and big trees mentioned above are the so-called ** merged by rank**.

code：

```python
def union(self, p, q):
if self. connected(p, q): return
self. parent[self. find(p)] = self. find(q)
```

Here I did not judge the relationship between the size of the rank, the purpose is to facilitate everyone to sort out the main context. See the code area below for the complete code.

## No authority and check collection

In the usual question-making process, more of the problems encountered are unqualified and collected. Compared with taking authority and checking the collection, the implementation process is also simpler.

### Code template

```python
class UF:
def __init__(self, M):
self. parent = {}
self. size = {}
self. cnt = 0
# Initialize parent, size and cnt
# size is a hash table that records the size of each Unicom domain, where key is the root of the unicom domain and value is the size of the unicom domain.
# cnt is an integer, indicating how many unicom domains there are in total
for i in range(M):
self. parent[i] = i
self. cnt += 1
self. size[i] = 1

def find(self, x):
if x ! = self. parent[x]:
self. parent[x] = self. find(self. parent[x])
return self. parent[x]
return x
def union(self, p, q):
if self. connected(p, q): return
# Hang the small tree on the big tree to balance the tree as much as possible
leader_p = self. find(p)
leader_q = self. find(q)
if self. size[leader_p] < self. size[leader_q]:
self. parent[leader_p] = leader_q
self. size[leader_q] += self. size[leader_p]
else:
self. parent[leader_q] = leader_p
self. size[leader_p] += self. size[leader_q]
self. cnt -= 1
def connected(self, p, q):
return self. find(p) == self. find(q)
```

## Take authority and check the collection

The above mentioned are actually directed graphs, so just use parent to represent the node relationship. And what if you are using a directed weighted graph? In fact, in addition to maintaining the node pointing relationship like parent, we also need to maintain the weight of the node. A simple idea is to use another hash table, weight, to store the weight relationship of the nodes. For example, `weight[a] = 1 means that the weight of a to its parent node is 1`.

If it is a weighted combined query set, the path compression and merging process of the query process will be slightly different, because we are not only concerned about the change of node pointers, but also about how the weights are updated. For example：

```
a b
^ ^
| |
| |
x y
```

As shown above, the parent node of x is a and the parent node of y is B. Now I need to merge x and Y.

```
a b
^ ^
| |
| |
x -> y
```

Suppose the weight of x to a is w (xa), the weight of y to b is w (yb), and the weight of x to y is w (xy). After merging, it will look like the picture：

```
a -> b
^ ^
| |
| |
x y
```

So why should the weights from a to b be updated? We know that w(xa) + w(ab) = w(xy) + w(yb), which means that the weight of a to b w(ab) = w(xy) + w(yb)-w(xa).

Of course, whether the above relationship is addition, subtraction, modulo, multiplication, division, etc. is completely determined by the topic. I just give an example here. In any case, this kind of operation must meet the conductivity.

### Code template

Here, taking the additive weighted check set as an example, let's talk about how the code should be written.

```py
class UF:
def __init__(self, M):
# Initialize parent, weight
self. parent = {}
self. weight = {}
for i in range(M):
self. parent[i] = i
self. weight[i] = 0

def find(self, x):
if self. parent[x] ! = x:
ancestor, w = self. find(self. parent[x])
self. parent[x] = ancestor
self. weight[x] += w
return self. parent[x], self. weight[x]
def union(self, p, q, dist):
if self. connected(p, q): return
leader_p, w_p = self. find(p)
leader_q, w_q = self. find(q)
self. parent[leader_p] = leader_q
self. weight[leader_p] = dist + w_q - w_p
def connected(self, p, q):
return self. find(p)[0] == self. find(q)[0]
```

Typical topics：

- [399. Division evaluation](https://leetcode-cn.com/problems/evaluate-division /)

## Complexity Analysis

Let n be the number of midpoints in the graph.

First analyze the spatial complexity. Spatially, since we need to store parent (weighted set and weight), the spatial complexity depends on the number of points in the graph, and the spatial complexity is not difficult to derive as $O(n)$.

The time consumption of merging sets is mainly due to union and find operations, and the time complexity of path compression and rank-by-rank merging optimization is close to O(1). A more rigorous expression is O(log(m×Alpha(n))), where n is the number of merges and m is the number of lookups. Here Alpha is an inverse function of the Ackerman function. However, if there is only path compression or only rank consolidation, the time complexity of the two is O(logx) and O(logy), and X and Y are the number of merges and lookups, respectively.

## Application

-Detect whether there is a ring in the picture

Idea: You only need to merge the edges and determine whether the edges have been connected before the merger. If the edges have been connected before the merger, it means that there is a ring.

code：

```py
uf = UF()
for a, b in edges:
if uf. connected(a, b): return False
uf. union(a, b)
return True
```

Topic recommendation：

- [684. Redundant connection) (https://leetcode-cn.com/problems/redundant-connection/solution/bing-cha-ji-mo-ban-ben-zhi-jiu-shi-jian-0wz2m /)
- [Forest Detection](https://binarysearch.com/problems/Forest-Detection) -Minimum spanning tree Classical algorithm Kruskal

## Practice

There are many topics about parallel collection. The official data is 30 questions (as of 2020-02-20), but although there are some topics that are not officially labeled "parallel collection", it is indeed very simple to use parallel collection. If you master the template for this kind of question, you will be able to brush this kind of question very quickly, and the probability of making mistakes will be greatly reduced. This is the advantage of the template.

I have summarized a few questions here and checked the topics：

- [547. Circle of friends](../problems/547.friend-circles.md)
- [721. Account consolidation](https://leetcode-cn.com/problems/accounts-merge/solution/mo-ban-ti-bing-cha-ji-python3-by-fe-lucifer-3 /)
- [990. Satisfiability of equation equation](https://github.com/azl397985856/leetcode/issues/304)
- [1202. Exchange elements in a string](https://leetcode-cn.com/problems/smallest-string-with-swaps /)
- [1697. Check whether the path with the edge length limit exists](https://leetcode-cn.com/problems/checking-existence-of-edge-length-limited-paths /)

The first four questions of the above questions are all about the connectivity of the weighted graph, and the fifth question is about the connectivity of the weighted graph. Everyone must know both types. The keywords of the above topics are **Connectivity**, and the codes are all sets of templates. After reading the content here, it is recommended to practice with the above topics and test the learning results.

## Summary

If the topic has a connected and equivalent relationship, then you can consider merging sets. In addition, pay attention to path compression when using merging sets, otherwise the complexity will gradually increase as the height of the tree increases.

It is more complicated to implement weighted and merged collections, mainly because path compression and merging are not the same, but we only need to pay attention to the node relationship and draw the following diagram.：

```
a -> b
^ ^
| |
| |
x y
```

It is not difficult to see how to update the pull.

The topic template provided in this article is one that I use more in Xifa. Using it, not only is the probability of errors greatly reduced, but the speed is also much faster, and the whole person is more confident^\_^
