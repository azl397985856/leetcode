# 二叉树的遍历算法

## 概述

二叉树作为一个基础的数据结构，遍历算法作为一个基础的算法，两者结合当然是经典的组合了。
很多题目都会有 ta 的身影，有直接问二叉树的遍历的，有间接问的。

> 你如果掌握了二叉树的遍历，那么也许其他复杂的树对于你来说也并不遥远了

二叉数的遍历主要有前中后遍历和层次遍历。 前中后属于 DFS，层次遍历属于 BFS。
DFS 和 BFS 都有着自己的应用，比如 leetcode 301 号问题和 609 号问题。

DFS 都可以使用栈来简化操作，并且其实树本身是一种递归的数据结构，因此递归和栈对于 DFS 来说是两个关键点。

DFS 图解：

![binary-tree-traversal-dfs](../assets/thinkings/binary-tree-traversal-dfs.gif)

(图片来自 https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/depth-first-search)

BFS 的关键点在于如何记录每一层次是否遍历完成， 我们可以用一个标识位来表式当前层的结束。

下面我们依次讲解：

## 前序遍历

相关问题[144.binary-tree-preorder-traversal](../problems/144.binary-tree-preorder-traversal.md)

前序遍历的顺序是`根-左-右`

思路是：

1. 先将根结点入栈

2. 出栈一个元素，将右节点和左节点依次入栈

3. 重复 2 的步骤

总结： 典型的递归数据结构，典型的用栈来简化操作的算法。

其实从宏观上表现为：`自顶向下依次访问左侧链，然后自底向上依次访问右侧链`，
如果从这个角度出发去写的话，算法就不一样了。从上向下我们可以直接递归访问即可，从下向上我们只需要借助栈也可以轻易做到。
整个过程大概是这样：

![binary-tree-traversal-preorder](../assets/thinkings/binary-tree-traversal-preorder.png)

这种思路解题有点像我总结过的一个解题思路`backtrack` - 回溯法。这种思路有一个好处就是
可以`统一三种遍历的思路`. 这个很重要，如果不了解的朋友，希望能够记住这一点。

## 中序遍历

相关问题[94.binary-tree-inorder-traversal](../problems/94.binary-tree-inorder-traversal.md)

中序遍历的顺序是 `左-根-右`，根节点不是先输出，这就有一点点复杂了。

1. 根节点入栈

2. 判断有没有左节点，如果有，则入栈，直到叶子节点

> 此时栈中保存的就是所有的左节点和根节点。

3. 出栈，判断有没有右节点，有则入栈，继续执行 2

值得注意的是，中序遍历一个二叉查找树（BST）的结果是一个有序数组，利用这个性质有些题目可以得到简化，
比如[230.kth-smallest-element-in-a-bst](../problems/230.kth-smallest-element-in-a-bst.md)，
以及[98.validate-binary-search-tree](../problems/98.validate-binary-search-tree.md)

## 后序遍历

相关问题[145.binary-tree-postorder-traversal](../problems/145.binary-tree-postorder-traversal.md)

后序遍历的顺序是 `左-右-根`

这个就有点难度了，要不也不会是 leetcode 困难的 难度啊。

其实这个也是属于根节点先不输出，并且根节点是最后输出。 这里可以采用一种讨巧的做法，
就是记录当前节点状态，如果 1. 当前节点是叶子节点或者 2.当前节点的左右子树都已经遍历过了，那么就可以出栈了。

对于 1. 当前节点是叶子节点，这个比较好判断，只要判断 left 和 rigt 是否同时为 null 就好。

对于 2. 当前节点的左右子树都已经遍历过了， 我们只需要用一个变量记录即可。最坏的情况，我们记录每一个节点的访问状况就好了，空间复杂度 O(n)
但是仔细想一下，我们使用了栈的结构，从叶子节点开始输出，我们记录一个当前出栈的元素就好了，空间复杂度 O(1)， 具体请查看上方链接。

## 层次遍历

层次遍历的关键点在于如何记录每一层次是否遍历完成， 我们可以用一个标识位来表式当前层的结束。

![binary-tree-traversal-bfs](../assets/thinkings/binary-tree-traversal-bfs.gif)

(图片来自 https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/breadth-first-search)

具体做法：

1. 根节点入队列， 并入队列一个特殊的标识位，此处是 null

2. 出队列

3. 判断是不是 null， 如果是则代表本层已经结束。我们再次判断是否当前队列为空，如果不为空继续入队一个 null，否则说明遍历已经完成，我们什么都不不用做

4. 如果不为 null，说明这一层还没完，则将其左右子树依次入队列。

相关问题[102.binary-tree-level-order-traversal](../problems/102.binary-tree-level-order-traversal.md)
