# Topic address (Interview question 17.12. BiNode）

https://leetcode.com/problems/binode-lcci/

## Title description

```
The binary tree data structure TreeNode can be used to represent a one-way linked list (where left is set to empty and right is the next linked list node). To implement a method to convert a binary search tree into a one-way linked list, the requirements are still in line with the nature of the binary search tree. The conversion operation should be on the original site, that is, directly modify the original binary search tree.

Returns the head node of the converted one-way linked list.

Note: This question has been slightly changed relative to the original question



example：

Input: [4,2,5,1,3, null, 6, 0]
Output: [0,null,1,null,2,null,3,null,4,null,5,null,6]
prompt：

The number of nodes will not exceed 100,000.
```

## Pre-knowledge

-Binary search tree -Recursion -[Binary tree traversal](../thinkings/binary-tree-traversal.md)

## Company

-No

## Idea

In fact, this is a topic that examines the nature of binary tree traversal + binary search (lookup) tree. Special attention needs to be paid to pointer operation in this kind of topic, which is the same as the **linked list reversal series** topic.

First of all, we need to know one property: **For a binary lookup tree, the result of the ordinal traversal is an ordered array**. What the title requires you to output happens to be an ordered array (although it is not stated, it can be seen from the test case).

Therefore, one idea is to traverse in sequence, and the pointer can be changed while traversing. There are two points to note here:

1. Pointer operations should be careful to refer to each other, resulting in an endless loop.
2. What you need to return is the node in the bottom left corner, not the root given by the title.

-For the first question, in fact, just pay attention to the order in which the pointers are operated and reset the pointers when necessary.

-For the second question, I used a black technology to make the code look concise and efficient. If you don't understand, you can also change to a simple way of writing.

If you understand the above content, then let's get to the point.

Among them, green is the connection we want to add, and black is the original connection.

![](https://p.ipic.vip/y2qhfk.jpg)

Let's look at a more complicated one：

![](https://p.ipic.vip/w0oy7x.jpg)

In fact, no matter how complicated it is. We only need to perform a mid-sequence traversal once, and record the precursor nodes at the same time. Then you can modify the pointers of the precursor node and the current node. The whole process is as if the linked list is reversed.

![](https://p.ipic.vip/prjau5.jpg)

Core code (assuming we have calculated the pre correctly)：

```py
cur. left = None
pre. right = cur
pre = cur
```

The rest is how to calculate pre, this is not difficult, just look at the code：

```py
self. pre = None
def dfs(root):
dfs(root. left)
# The above pointer change logic is written here
self. pre = root
dfs(root. right)

```

The problem was solved.

The last question here is the return value. What the title wants to return is actually the value in the bottom left corner. How to get the node in the bottom left corner? Let's take a look at the core code and you will understand it. The code is relatively simple.

```py

self. pre = self. ans = None
def dfs(root):
if not root: return
dfs(root. left)
root. left = None
if self. pre: self. pre. right = root
# When the following line of code is executed for the first time, it happens to be in the bottom left corner. At this time, self. pre = None, self at any other time. pre is not none.
if self. pre is None: self. ans = root
self. pre = root
dfs(root. right)
```

## Key points

-Pointer operation -Processing of return values

## Code

```py
class Solution:
def convertBiNode(self, root: TreeNode) -> TreeNode:
self. pre = self. ans = None
def dfs(root):
if not root: return
dfs(root. left)
root. left = None
if self. pre: self. pre. right = root
if self. pre is None: self. ans = root
self. pre = root

dfs(root. right)
dfs(root)
return self. ans
```

**Complexity analysis**

-Time complexity:$O(N)$, where N is the total number of nodes in the tree. -Spatial complexity:$O(h)$, where h is the height of the tree.

## Related topics

- [206.reverse-linked-list](./206.reverse-linked-list.md)
- [92.reverse-linked-list-ii](./92.reverse-linked-list-ii.md)
- [25.reverse-nodes-in-k-groups-cn](./25.reverse-nodes-in-k-groups.md)

If you have any comments on this, please leave me a message. I will check the answers one by one when I have time. For more algorithm routines, you can visit my LeetCode problem solving warehouse:https://github.com/azl397985856/leetcode . There are already 37K stars. You can also pay attention to my public account "Force Buckle Plus" to take you to chew off the hard bone of the algorithm.

![](https://p.ipic.vip/70qh9q.jpg)
