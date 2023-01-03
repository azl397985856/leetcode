# 平衡二叉树专题

力扣关于平衡二叉树的题目还是有一些的，并且都非常经典，推荐大家练习。今天给大家精选了 4 道题，如果你彻底搞明白了这几道题，碰到其他的平衡二叉树的题目应该不至于没有思路。当你领会了我的思路之后， 建议再找几个题目练手，巩固一下学习成果。

## 110. 平衡二叉树（简单）

最简单的莫过于判断一个树是否为平衡二叉树了，我们来看下。

### 题目描述

```
给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1:

给定二叉树 [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
返回 false


```

### 思路

由于平衡二叉树定义为就是**一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1。**用伪代码描述就是：

```py
if abs(高度(root.left) - 高度(root.right)) <= 1 and root.left 也是平衡二叉树 and root.right 也是平衡二叉树:
    print('是平衡二叉树')
else:
    print('不是平衡二叉树')
```

而 root.left 和 root.right **如何判断是否是二叉平衡树就和 root 是一样的了**，可以看出这个问题有明显的递归性。

因此我们首先需要知道如何计算一个子树的高度。这个可以通过递归的方式轻松地计算出来。计算子树高度的 Python 代码如下：

```py
def dfs(node):
    if not node: return 0
    l = dfs(node.left)
    r = dfs(node.right)
    return max(l, r) + 1
```

### 代码

代码支持： Python3

Python3 Code:

```py
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        def dfs(node):
            if not node: return 0
            l = dfs(node.left)
            r = dfs(node.right)
            return max(l, r)  + 1
        if not root: return True
        if abs(dfs(root.left) -  dfs(root.right)) > 1: return False
        return self.isBalanced(root.left) and self.isBalanced(root.right)
```

**复杂度分析**

- 时间复杂度：对于 isBalanced 来说，由于每个节点最多被访问一次，这部分的时间复杂度为 $O(N)$，而 dfs 函数 每次被调用的次数不超过 $log N$，因此总的时间复杂度为 $O(NlogN)$，其中 $N$ 为 树的节点总数。
- 空间复杂度：由于使用了递归，这里的空间复杂度的瓶颈在栈空间，因此空间复杂度为 $O(h)$，其中 $h$ 为树的高度。

## 108. 将有序数组转换为二叉搜索树（简单）

108 和 109 基本是一样的，只不过数据结构不一样，109 变成了链表了而已。由于链表操作比数组需要考虑更多的因素，因此 109 是 中等难度。

### 题目描述

```
将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5

```

### 思路

对于这个问题或者 `给定一个二叉搜索树，将其改为平衡（后面会讲）` 基本思路都是一样的。

题目的要求是将有序数组转化为：

1. 高度平衡的二叉树
2. 二叉搜索树

由于平衡二叉树是左右两个子树的高度差的绝对值不超过 1。因此一种简单的方法是**选择中点作为根节点，根节点左侧的作为左子树，右侧的作为右子树即可。**原因很简单，这样分配可以保证左右子树的节点数目差不超过 1。因此高度差自然也不会超过 1 了。

上面的操作同时也满足了二叉搜索树，原因就是题目给的数组是有序的。

> 你也可以选择别的数作为根节点，而不是中点，这也可以看出答案是不唯一的。

### 代码

代码支持： Python3

Python3 Code:

```py
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums: return None
        mid = (len(nums) - 1) // 2
        root = TreeNode(nums[mid])
        root.left = self.sortedArrayToBST(nums[:mid])
        root.right = self.sortedArrayToBST(nums[mid + 1:])
        return root
```

**复杂度分析**

- 时间复杂度：由于每个节点最多被访问一次，因此总的时间复杂度为 $O(N)$，其中 $N$ 为数组长度。
- 空间复杂度：由于使用了递归，这里的空间复杂度的瓶颈在栈空间，因此空间复杂度为 $O(h)$，其中 $h$ 为树的高度。同时由于是平衡二叉树，因此 $h$ 就是 $log N$。

## 109. 有序链表转换二叉搜索树（中等）

### 题目描述

```
`给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5

```

### 思路

和 108 思路一样。 不同的是数据结构的不同，因此我们需要关注的是链表和数组的操作差异。

![](https://p.ipic.vip/e7yblm.jpg)

（数组的情况）

我们再来看下链表：

![](https://p.ipic.vip/gkndvh.jpg)
（链表的情况）

找到中点，只需要使用经典的快慢指针即可。同时为了防止环的出现， 我们需要斩断指向 mid 的 next 指针，因此需要记录一下中点前的一个节点，这只需要用一个变量 pre 记录即可。

### 代码

### 代码

代码支持：JS,Java,Python,C++

JS Code

```js
var sortedListToBST = function (head) {
  if (!head) return null;
  return dfs(head, null);
};

function dfs(head, tail) {
  if (head == tail) return null;
  let fast = head;
  let slow = head;
  while (fast != tail && fast.next != tail) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let root = new TreeNode(slow.val);
  root.left = dfs(head, slow);
  root.right = dfs(slow.next, tail);
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
      while(fast != tail && fast.next != tail){
          fast = fast.next.next;
          slow = slow.next;
      }
      TreeNode root = new TreeNode(slow.val);
      root.left = dfs(head, slow);
      root.right = dfs(slow.next, tail);
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

        while fast and fast.next:
            fast = fast.next.next
            pre = slow
            slow = slow.next
        if pre:
            pre.next = None
        node = TreeNode(slow.val)
        if slow == fast:
            return node
        node.left = self.sortedListToBST(head)
        node.right = self.sortedListToBST(slow.next)
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

        while (fast != tail && fast->next != tail) {
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

**复杂度分析**

令 n 为链表长度。

- 时间复杂度：递归树的深度为 $logn$，每一层的基本操作数为 $n$，因此总的时间复杂度为$O(nlogn)$
- 空间复杂度：空间复杂度为$O(logn)$

有的同学不太会分析递归的时间复杂度和空间复杂度，我们在这里给大家再次介绍一下。

![](https://p.ipic.vip/s8ejbw.jpg)

首先我们尝试画出如下的递归树。由于递归树的深度为 $logn$ 因此空间复杂度就是 $logn$ \* 递归函数内部的空间复杂度，由于递归函数内空间复杂度为 $O(1)$，因此总的空间复杂度为 $O(logn)$。

时间复杂度稍微困难一点点。之前西法在先导篇给大家说过：**如果有递归那就是：递归树的节点数 \* 递归函数内部的基础操作数**。而这句话的前提是所有递归函数内部的基本操作数是一样的，这样才能直接乘。而这里递归函数的基本操作数不一样。

不过我们发现递归树内部每一层的基本操作数都是固定的， 为啥固定已经在图上给大家算出来了。因此总的空间复杂度其实可以通过**递归深度 \* 每一层基础操作数**计算得出，也就是 $nlogn$。 类似的技巧可以用于归并排序的复杂度分析中。

另外大家也直接可以通过公式推导得出。对于这道题来说，设基本操作数 T(n)，那么就有 T(n) = T(n/2) \* 2 + n/2，推导出来 T(n) 大概是 nlogn。这应该高中的知识。
具体推导过程如下：

$$

T(n) = T(n/2) _ 2 + n/2 =
\frac{n}{2} + 2 _ (\frac{n}{2}) ^ 2 + 2 ^ 2 _ (\frac{n}{2}) ^ 3 + ...
= logn _ \frac{n}{2}


$$

类似地，如果递推公式为 T(n) = T(n/2) \* 2 + 1 ，那么 T(n) 大概就是 logn。

## 1382. 将二叉搜索树变平衡（中等）

### 题目描述

```
给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。

如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。

如果有多种构造方法，请你返回任意一种。

 

示例：

```

![](https://p.ipic.vip/6s67fh.jpg)

```

输入：root = [1,null,2,null,3,null,4,null,null]
输出：[2,1,3,null,null,null,4]
解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案。
 

提示：

树节点的数目在 1 到 10^4 之间。
树节点的值互不相同，且在 1 到 10^5 之间。

```

### 思路

由于`二叉搜索树的中序遍历是一个有序数组`，因此问题很容易就转化为 `108. 将有序数组转换为二叉搜索树（简单）`。

### 代码

代码支持： Python3

Python3 Code:

```py
class Solution:
    def inorder(self, node):
        if not node: return []
        return self.inorder(node.left) + [node.val] + self.inorder(node.right)
    def balanceBST(self, root: TreeNode) -> TreeNode:
        nums = self.inorder(root)
        def dfs(start, end):
            if start == end: return TreeNode(nums[start])
            if start > end: return None
            mid = (start + end) // 2
            root = TreeNode(nums[mid])
            root.left = dfs(start, mid - 1)
            root.right = dfs(mid + 1, end)
            return root
        return dfs(0, len(nums) - 1)
```

**复杂度分析**

- 时间复杂度：由于每个节点最多被访问一次，因此总的时间复杂度为 $O(N)$，其中 $N$ 为链表长度。
- 空间复杂度：虽然使用了递归，但是瓶颈不在栈空间，而是开辟的长度为 $N$ 的 nums 数组，因此空间复杂度为 $O(N)$，其中 $N$ 为树的节点总数。

## 总结

本文通过四道关于二叉平衡树的题帮助大家识别此类型题目背后的思维逻辑，我们来总结一下学到的知识。

平衡二叉树指的是：`一个二叉树每个节点的左右两个子树的高度差的绝对值不超过1。`

如果需要让你判断一个树是否是平衡二叉树，只需要死扣定义，然后用递归即可轻松解决。

如果需要你将一个数组或者链表（逻辑上都是线性的数据结构）转化为平衡二叉树，只需要随便选一个节点，并分配一半到左子树，另一半到右子树即可。

同时，如果要求你转化为平衡二叉搜索树，则可以选择排序数组(或链表)的中点，左边的元素为左子树， 右边的元素为右子树即可。

> 小提示 1： 如果不需要是二叉搜索树则不需要排序，否则需要排序。

> 小提示 2： 你也可以不选择中点， 算法需要相应调整，感兴趣的同学可以试试。

> 小提示 3： 链表的操作需要特别注意环的存在。

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 37K star 啦。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。
