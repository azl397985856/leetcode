# Balanced Binary Tree

There are still some topics related to balancing binary trees, and they are all very classic. It is recommended that everyone practice. Today, I have selected 4 questions for everyone. If you thoroughly understand these questions, you should not be out of ideas when you encounter other balanced binary tree questions. After you understand my thoughts, it is recommended to find a few more topics to practice your hands and consolidate your learning results.

## 110. Balanced binary tree (simple)

The easiest way is to judge whether a tree is a balanced binary tree. Let's take a look.

### Title description

```
Given a binary tree, determine whether it is a highly balanced binary tree.

In this question, a highly balanced binary tree is defined as：

The absolute value of the height difference between the left and right subtrees of each node of a binary tree does not exceed 1.

Example 1:

Given a binary tree [3,9,20, null,null,15,7]

3
/ \
9 20
/ \
15 7
Returns true.

Example 2:

Given a binary tree [1,2,2,3,3, null,null,4,4]

1
/ \
2 2
/ \
3 3
/ \
4 4
Return false


```

### Idea

Since a balanced binary tree is defined as ** The absolute value of the height difference between the left and right subtrees of each node of a binary tree does not exceed 1. **Described in pseudo-code is：

```py
if abs (height (root. Left)-height (root. right)) <= 1 and root. Left is also a balanced binary tree and root. Right is also a balanced binary tree:
print('is a balanced binary tree')
else:
print ('not a balanced binary tree')
```

And root. Left and root. Right ** How to determine whether it is a binary balanced tree is the same as root **, it can be seen that this problem is obviously recursive.

Therefore, we first need to know how to calculate the height of a subtree. This can be easily calculated recursively. The Python code for calculating the height of the subtree is as follows：

```py
def dfs(node):
if not node: return 0
l = dfs(node. left)
r = dfs(node. right)
return max(l, r) + 1
```

### Code

Code support: Python3

Python3 Code:

```py
class Solution:
def isBalanced(self, root: TreeNode) -> bool:
def dfs(node):
if not node: return 0
l = dfs(node. left)
r = dfs(node. right)
return max(l, r) + 1
if not root: return True
if abs(dfs(root. left) - dfs(root. right)) > 1: return False
return self. isBalanced(root. left) and self. isBalanced(root. right)
```

**Complexity analysis**

- Time complexity: for isBalanced to say, since each node has at most be accessed once, this part of the time complexity is $O(N)$, while the dfs function each time it is call the number of not more than $log N$, so the total time complexity is $O(NlogN)$, where $N$ is a tree of nodes total. -Spatial complexity: Due to the use of recursion, the bottleneck of spatial complexity here is in the stack space, so the spatial complexity is $O(h)$, where $H$ is the height of the tree.

## 108. Convert an ordered array to a binary search tree (simple)

108 and 109 are basically the same, except that the data structure is different, and 109 has become a linked list. Since linked list operations require more factors to be considered than arrays, 109 is of medium difficulty.

### Title description

```
Convert an ordered array arranged in ascending order into a highly balanced binary search tree.

In this question, a highly balanced binary tree refers to a binary tree. The absolute value of the height difference between the left and right subtrees of each node does not exceed 1.

example:

Given an ordered array: [-10, -3,0,5,9],

One possible answer is: [0,-3, 9,-10, null,5], which can represent the following highly balanced binary search tree：

0
/ \
-3 9
/ /
-10 5

```

### Idea

The basic idea is the same for this problem or `given a binary search tree, change it to balance (we will talk about it later)`.

The requirement of the topic is to convert an ordered array into：

1. Highly balanced binary tree
2. Binary search tree

Since the balanced binary tree is the absolute value of the height difference between the left and right subtrees, the absolute value does not exceed 1. Therefore, an easy way is to select the midpoint as the root node, the one on the left side of the root node as the left subtree, and the one on the right as the right subtree. \*\*The reason is very simple. This allocation can ensure that the difference in the number of nodes in the left and right subtrees does not exceed 1. Therefore, the height difference will naturally not exceed 1.

The above operation also satisfies the binary search tree, because the array given by the title is ordered.

> You can also choose other numbers as the root node instead of the midpoint. This can also show that the answer is not unique.

### Code

Code support: Python3

Python3 Code:

```py
class Solution:
def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
if not nums: return None
mid = (len(nums) - 1) // 2
root = TreeNode(nums[mid])
root. left = self. sortedArrayToBST(nums[:mid])
root. right = self. sortedArrayToBST(nums[mid + 1:])
return root
```

**Complexity analysis**

-Time complexity: Since each node is accessed at most once, the total time complexity is $O(N)$, where $N$ is the length of the array. -Spatial complexity: Due to the use of recursion, the bottleneck of spatial complexity here is in the stack space, so the spatial complexity is $O(h)$, where $H$ is the height of the tree. At the same time, because it is a balanced binary tree, $h$ is 就是 log N$.

## 109. Ordered linked list conversion binary search tree (medium)

### Title description

```
'Given a single-linked list, the elements in it are sorted in ascending order, and it is converted into a highly balanced binary search tree.

In this question, a highly balanced binary tree refers to a binary tree. The absolute value of the height difference between the left and right subtrees of each node does not exceed 1.

example:

Given ordered linked list： [-10, -3, 0, 5, 9],

One possible answer is：[0, -3, 9, -10, null, 5], it can represent the following highly balanced binary search tree：

0
/ \
-3 9
/ /
-10 5

```

### Idea

The same idea as 108. The difference is the different data structures, so we need to pay attention to the operational differences between linked lists and arrays.

![](https://p.ipic.vip/24tsus.jpg)

(The case of arrays)

Let's take a look at the linked list again：

![](https://p.ipic.vip/7eia6x.jpg) (The case of the linked list)

To find the midpoint, you only need to use the classic speed pointer. At the same time, in order to prevent the ring from appearing, we need to cut off the next pointer to mid, so we need to record a node before the midpoint. This only needs to be recorded with a variable pre.

### Code

### Code

Code support: JS, Java, Python, C++

JS Code

```js
var sortedListToBST = function (head) {
if (! head) return null;
return dfs(head, null);
};

function dfs(head, tail) {
if (head == tail) return null;
let fast = head;
let slow = head;
while (fast ! = tail && fast. next ! = tail) {
fast = fast. next. next;
slow = slow. next;
}
let root = new TreeNode(slow. val);
root. left = dfs(head, slow);
root. right = dfs(slow. next, tail);
return root;
}
```

Java Code:

```java
class Solution {
public TreeNode sortedListToBST(ListNode head) {
if(head == null) return null;
return dfs(head,null);
}
private TreeNode dfs(ListNode head, ListNode tail){
if(head == tail) return null;
ListNode fast = head, slow = head;
while(fast ! = tail && fast. next ! = tail){
fast = fast. next. next;
slow = slow. next;
}
TreeNode root = new TreeNode(slow. val);
root. left = dfs(head, slow);
root. right = dfs(slow. next, tail);
return root;
}
}
```

Python Code:

```py
class Solution:
def sortedListToBST(self, head: ListNode) -> TreeNode:
if not head:
return head
pre, slow, fast = None, head, head

while fast and fast. next:
fast = fast. next. next
pre = slow
slow = slow. next
if pre:
pre. next = None
node = TreeNode(slow. val)
if slow == fast:
return node
node. left = self. sortedListToBST(head)
node. right = self. sortedListToBST(slow. next)
return node
```

C++ Code:

```cpp
class Solution {
public:
TreeNode* sortedListToBST(ListNode* head) {
if (head == nullptr) return nullptr;
return sortedListToBST(head, nullptr);
}
TreeNode* sortedListToBST(ListNode* head, ListNode* tail) {
if (head == tail) return nullptr;

ListNode* slow = head;
ListNode* fast = head;

while (fast ! = tail && fast->next ! = tail) {
slow = slow->next;
fast = fast->next->next;
}

TreeNode* root = new TreeNode(slow->val);
root->left = sortedListToBST(head, slow);
root->right = sortedListToBST(slow->next, tail);
return root;
}
};
```

**Complexity analysis**

Let n be the length of the linked list.

- Time complexity: the recursion tree of depth $logn$, each layer of the basic operation of the number of $n$, so the total time complexity is$O(nlogn)$ -Spatial complexity: The spatial complexity is$O(logn)$

Some students are not very good at analyzing the time complexity and space complexity of recursion. We will introduce it to you again here.

![](https://p.ipic.vip/w5qjq6.jpg)

First we try to draw the following recursive tree. Due to the recursive depth of the tree is $logn$ thus the space complexity is $logn$ \* recursive function inside the space complexity, due to the recursive function within the space complexity is $O(1)$, so the total space complexity is $O(logn)$。

The time complexity is a little bit more difficult. Before, Sifa told everyone in the introduction: **If there is recursion, it is: the number of nodes in the recursive tree \* The basic number of operations inside the recursive function**. The premise of this sentence is that the basic operands inside all recursive functions are the same, so that they can be directly multiplied. The basic operands of recursive functions here are different.

However, we found that the basic operands of each layer of the recursive tree are fixed, and the number of fixed operations has been calculated for everyone on the graph. Therefore, the total spatial complexity can actually be calculated by the \*\* recursion depth\* The basic operands of each layer, which is $nlogn$. Similar techniques can be used in the complexity analysis of merge sorting.

In addition, everyone can directly derive it from the formula. For this question, set the basic operand T(n), then there is T(n)= T(n/2)\*2+ n/2, and it is deduced that T(n) is probably nlogn. This should be high school knowledge. The specific derivation process is as follows：

$$

T(n) = T(n/2) _ 2 + n/2 =
\frac{n}{2} + 2 _ (\frac{n}{2}) ^ 2 + 2 ^ 2 _ (\frac{n}{2}) ^ 3 + . . .
= logn _ \frac{n}{2}


$$

Similarly, if the recursion formula is T(n)=T(n/2)\*2+1, then T(n) is probably logn.

## 1382. Balance the binary search tree (medium)

### Title description

```
To give you a binary search tree, please return a balanced binary search tree. The newly generated tree should have the same node value as the original tree.

If in a binary search tree, the height difference between the two subtrees of each node does not exceed 1, we call this binary search tree balanced.

If there are multiple construction methods, please return any one.



example：

```

![](https://p.ipic.vip/93npuo.jpg)

```

Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer. [3,1,4, null, 2, null, null] is also a feasible construction scheme.


prompt：

The number of tree nodes is between 1 and 10^4.
The values of tree nodes are different from each other, and are between 1 and 10^5.

```

### Idea

Since'the middle-order traversal of the binary search tree is an ordered array`, the problem can easily be transformed into`108. Convert an ordered array to a binary search tree (simple)`.

### Code

Code support: Python3

Python3 Code:

```py
class Solution:
def inorder(self, node):
if not node: return []
return self. inorder(node. left) + [node. val] + self. inorder(node. right)
def balanceBST(self, root: TreeNode) -> TreeNode:
nums = self. inorder(root)
def dfs(start, end):
if start == end: return TreeNode(nums[start])
if start > end: return None
mid = (start + end) // 2
root = TreeNode(nums[mid])
root. left = dfs(start, mid - 1)
root. right = dfs(mid + 1, end)
return root
return dfs(0, len(nums) - 1)
```

**Complexity analysis**

-Time complexity: Since each node is accessed at most once, the total time complexity is $O(N)$, where $N$ is the length of the linked list.

- Space complexity: although the use of recursion, but the bottleneck is not in the stack space, but opens up the length $N$ of the nums array, so the space complexity is $O(N)$, where $N$ is a tree of nodes total.

## Summary

This article uses four questions on the binary balance tree to help everyone identify the thinking logic behind this type of question. Let's summarize the knowledge we have learned.

Balanced binary tree refers to: `The absolute value of the height difference between the left and right subtrees of each node of a binary tree does not exceed 1. `

If you need to let you judge whether a tree is a balanced binary tree, you only need to define it deadlift, and then you can easily solve it with recursion.

If you need to transform an array or linked list (logically linear data structure) into a balanced binary tree, you only need to choose one node and assign half to the left subtree and the other half to the right subtree.

At the same time, if you are required to transform into a balanced binary search tree, you can choose the midpoint of the sorted array (or linked list). The element on the left is the left subtree, and the element on the right is the right subtree.

> Tip 1: If you don't need to be a binary search tree, you don't need to sort, otherwise you need to sort.

> Tip 2: You can also not choose the midpoint. The algorithm needs to be adjusted accordingly. Interested students can try it.

> Tip 3: The operation of the linked list requires special attention to the existence of rings.

For more questions, please visit my LeetCode questions warehouse:https://github.com/azl397985856/leetcode . There are already 37K stars.

Pay attention to the official account, work hard to restore the problem-solving ideas in clear and straightforward language, and there are a large number of diagrams to teach you how to recognize routines and brush questions efficiently.
