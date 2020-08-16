# Union Find Data Structure

Leetcode has many problems concerning the union-find data structure. To be specific, the official number is 30(until 2020-02-20). And some problems, though not labeled with `Union Find`, can be solved more easily by applying this data structure. A problem-solving pattern can be found among this kind of problem. Once you have grasped the pattern, you can solve these problems with higher speed and fewer mistakes, which is the benefit of using patterns. 

Related problems:

- [547. Friend Circles](../problems/547.friend-circles.md) Chinese
- [721. Accounts Merge](https://leetcode-cn.com/problems/accounts-merge/solution/mo-ban-ti-bing-cha-ji-python3-by-fe-lucifer-3/) Chinese
- [990. Satisfiability of Equality Equations](https://github.com/azl397985856/leetcode/issues/304) Chinese

It's recommended that you practice with these problems after reading this blog, to see if you understand the idea of a union-find data structure.

## Overview

A disjoint-set data structure (also called a union-find data structure or merge–find set) is a tree-like data structure that supports union & find operations on disjoint sets. A union-find algorithm is an algorithm that performs two operations on such a data structure.

- Find: Determine which subset a particular element is in. This can be used for determining if two elements are in the same subset.
- Union: Join two subsets into a single subset.

To define how these operations work more precisely, we need to first define how subsets are represented. A common strategy is to choose one member from each subset to represent it, called the representative. Find(x) operation will return the representative of the subset in which x exists and Union operation accepts two representatives as parameters.

## Lively Explanation

Let's say there are two Marshals, each holds a group of Generals, which holds a group of sergeants, and so on.

How do we determine whether two Generals belong two the same Marshal (connectivity)?

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlui26glxj30gs0bzwet.jpg)

The question is easy enough. All we have to do is to find the Marshals of these two Generals respectively. If the results are the same Marshal, then the two Generals belong to the same Marshal. Use `parent[x] = y` to represent `x's parent is y`. By looking for `parent` recursively, a `root` can be reached finally. Then a conclusion can be drawn by comparing the roots obtained.

The process described above involves two basic operations: `find` and `connected`. Besides these two, `union` operation can be used to merge two subsets into one.

There are two Marshals in the picture.

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlui391l0j30wp0el0th.jpg)

How do we merge them? The simplest way is pointing one of the Marshals to the other one.

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlui6gr4vj30ym0cojsb.jpg)

Done with the lively explanation of the three core APIs `find`, `connected`, and `union`. Now let's see how to implement these APIs.

## Core API

### find

```python
def find(self, x):
    while x != self.parent[x]:
        x = self.parent[x]
    return x
```

### connected

```python
def connected(self, p, q):
    return self.find(p) == self.find(q)
```

### union

```python
def union(self, p, q):
    if self.connected(p, q): return
    self.parent[self.find(p)] = self.find(q)
```

## Complete Code

```python
class UF:
    parent = {}
    cnt = 0
    def __init__(self, M):
        # Initiate parent and cnt

    def find(self, x):
        while x != self.parent[x]:
            x = self.parent[x]
        return x
    def union(self, p, q):
        if self.connected(p, q): return
        self.parent[self.find(p)] = self.find(q)
        self.cnt -= 1
    def connected(self, p, q):
        return self.find(p) == self.find(q)
```

## Code with path compression

```python
class UF:
    parent = {}
    size = {}
    cnt = 0
    def __init__(self, M):
        # Initiate parent, size and cnt

    def find(self, x):
        while x != self.parent[x]:
            x = self.parent[x]
            # path compression
            self.parent[x] = self.parent[self.parent[x]];
        return x
    def union(self, p, q):
        if self.connected(p, q): return
        # Attach the tree with fewer elements to the root of the tree with more elements in order to balance the tree.
        leader_p = self.find(p)
        leader_q = self.find(q)
        if self.size[leader_p] < self.size[leader_q]:
            self.parent[leader_p] = leader_q
        else:
            self.parent[leader_q] = leader_p
        self.cnt -= 1
    def connected(self, p, q):
        return self.find(p) == self.find(q)
```

The code above implements path compression with recursion, which, though is easier to write, contains the risk of stack overflow. The following is how we can do it with iteration.

```python
class UF:
    parent = {}
    def __init__(self, equations):
        # Initiation

    def find(self, x):
        # root
        r = x
        while r != parent[r]:
            r = parent[r]
        k = x
        while k != r:
            # Store the parent node of parent[k] temporarily.
            j = parent[k]
            parent[k] = r
            k = j
        return r
    def union(self, p, q):
        if self.connected(p, q): return
        self.parent[self.find(p)] = self.find(q)
    def connected(self, p, q):
        return self.find(p) == self.find(q)
```
