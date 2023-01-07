# I have almost finished brushing all the tree questions of Lixu, and I found these things. 。 。

![](https://p.ipic.vip/cwv5zz.jpg)

Let's start with the outline of this article. This is a brain map drawn by me with mindmap. After that, I will continue to improve it and gradually improve other topics.

> You can also use vscode blink-mind to open the source file to view. There are some notes in it that you can click to view. The source file can be obtained by replying to the brain map on my official account "Force Buckle Plus", and the brain map will continue to be updated with more content in the future. vscode plug-in address:https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

This series contains the following topics：

-[I have almost finished swiping all the linked topics of Lixu, and I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/08/linked-list/) -After almost brushing all the tree questions of Li Ke, I found these things. 。 。 (This is the article)

##A little bit of chatter

First light up the protagonist of this article-tree (my makeup technique is okay ^\_^)：

![](https://p.ipic.vip/5lkkd6.jpg)

[Tree Tag](https://leetcode-cn.com/tag/tree /"Tree tag") There are a total of 175 questions in leetcode. In order to prepare for this topic, I spent a few days brushing almost all the tree topics of leetcode.

![](https://p.ipic.vip/bdo0jv.jpg)

Except for 35 locked ones, 1 question that cannot be done (1628 questions, I don't know why I can't do it), and 4 questions that are labeled with trees but are pictures. I have brushed all the others. By focusing on these questions, I found some interesting information, and I will share it with you today.

## Edible Guide

Hello everyone, this is lucifer. What I bring to you today is the topic "Tree". In addition, in order to keep the focus and practicality of the chapters, some content is omitted, such as Huffman trees, prefix trees, balanced binary trees (red and black trees, etc.), and binary piles. These contents are relatively not that practical. If you are also interested in these contents, you can pay attention to my warehouse [leetcode algorithm problem solving](https://github.com/azl397985856/leetcode "leetcode algorithm problem solving"), if you have any content you want to see, you can also leave a message to tell me~

In addition, it is important to inform everyone in advance that many of the contents of this article depend on recursion. Regarding the recursion exercise, I recommend that you draw the recursion process on paper and manually substitute it several times. After the brain is familiar with recursion, it doesn't have to work so hard. Students who are really too lazy to draw pictures can also find a visual recursion website, such as https://recursion.now.sh /. After you have a certain understanding of recursion, take a closer look at the various traversal methods of the tree, then finish reading this article, and finally do the topic at the end of the article. It's not a big problem to fix recursion.

> Later in the article, in the "Two Basic Points-depth-first Traversal" section, I also proposed a method for how to practice the recursive thinking of tree traversal.

Finally, it should be emphasized that this article is only a common routine to help you solve the tree questions, but it does not mean that all the test centers involved in the tree questions will talk about it. For example, tree DP is not within the scope of discussion in this article, because this kind of question focuses more on DP. If you don't understand DP, most of them can't be done. What you need is to learn tree DP and DP before learning tree DP. If you are interested in these contents, you can look forward to my follow-up topics.

## Foreword

When it comes to trees, everyone is more familiar with the trees in reality, and the trees in reality are like this：

![](https://p.ipic.vip/4vw7kq.jpg)

The tree in the computer is actually the reflection of the tree in reality.

![](https://p.ipic.vip/w7a1lt.jpg)

The data structure of a computer is an abstraction of the relationship between objects in the real world. For example, the family tree of the family, the organizational relationship of the personnel in the company structure, the folder structure in the computer, the dom structure of the html rendering, etc., These hierarchical structures are called trees in the computer field.

First of all, make it clear that a tree is actually a logical structure. For example, when the author usually writes complex recursion, even though the author's topic is not a tree, he will draw a recursion tree to help himself understand.

> Tree is an important thinking tool

Take the simplest calculation of the fibonacci sequence as an example：

```js
function fn(n) {
  if (n == 0 || n == 1) return n;

  return fn(n - 1) + fn(n - 2);
}
```

Obviously, its input parameters and return values are not trees, but they do not affect us to think with tree thinking.

Continue to go back to the above code, according to the above code, you can draw the following recursive tree.

![](https://p.ipic.vip/ikc4cu.jpg)

Where the edges of the tree represent the return value, and the tree nodes represent the values that need to be calculated, namely fn(n).

Taking the calculation of 5's fibbonacci as an example, the process is probably like this (animated demonstration)：

![](https://p.ipic.vip/y5iown.gif)

**This is actually the subsequent traversal of a tree. **, do you think the tree (logical tree) is very important? We will talk about the post-sequence traversal later, now everyone knows that this is the case.

You can also go to [this website](https://recursion.now.sh / "Recursive Visualization Website") View the single-step execution effect of the above algorithm. Of course, there are more animated demonstrations of algorithms on this website.

> The arrow directions in the figure above are for your convenience. In fact, the direction of the arrow becomes downward, which is the real tree structure.

A generalized tree is really useful, but its scope is too large. The topic of trees mentioned in this article is a relatively narrow tree, which refers to the topic where the input (parameter) or output (return value) is the tree structure.

<! -- more -->

### Basic Concept

> The basic concepts of trees are not very difficult. In order to save space, I will briefly describe them here. For points that you are not familiar with, please find relevant information by yourself. I believe that everyone is not here to see these things. Everyone should want to see something different, such as some routines for doing questions.

A tree is a non-linear data structure. The basic unit of tree structure is the node. The link between nodes is called a branch. Nodes and branches form a tree, and the beginning of the structure is called the root, or root node. Nodes other than the root node are called child nodes. Nodes that are not linked to other child nodes are called leaf nodes (leaf). The figure below is a typical tree structure：

![](https://p.ipic.vip/abgn4d.jpg)

Each node can be represented by the following data structure：

```c
Node {
Value: any; // The value of the current node
Children: Array<Node>; // Point to his son
}
```

Other important concepts：

-Tree height: The maximum value from node to leaf node is its height. -Tree depth: Height and depth are opposite, height is counted from bottom to top, and depth is counted from top to bottom. Therefore, the depth of the root node and the height of the leaf node are 0. -The layer of the tree: the root is defined from the beginning, the root is the first layer, and the child of the root is the second layer. -Binary tree, trigeminal tree,. 。 。 An N-tree can be determined by at most a few child nodes, and at most N is an N-tree.

### Binary tree

A binary tree is a kind of tree structure. Two forks mean that each node has only two child nodes at most. We are used to calling it the left node and the right node.

> Note that this is just a name, not the actual location.

Binary trees are also the most common kind of tree for us to do algorithm problems, so we spend a lot of time introducing it, and everyone has to spend a lot of time focusing on mastering it.

A binary tree can be represented by the following data structure：

```c
Node {
Value: any; // The value of the current node
Left: Node | null; // Left son
Right: Node | null; / / Right son
}
```

#### Binary Tree classification

-Complete binary tree -Full binary tree -Binary search tree -[Balanced Binary tree](https://github.com/azl397985856/leetcode/blob/master/thinkings/balanced-tree.md "Balanced Binary tree") -Red and black tree -. 。 。

#### Representation of binary tree

-Linked list storage -Array storage. Very suitable for complete binary trees

## How difficult is the tree question?

Many people find trees to be a difficult topic. In fact, as long as you master the trick, it is not that difficult.

Judging from the official difficulty label, there are a total of 14 difficult tree questions. Among them, there is also 1 question marked with a tree label but it is a picture question. Therefore, the difficulty rate is 13/175, which is about 7.4%. If you exclude the 5 locked channels, there are only 9 difficult channels. Most difficult questions, I believe you can also make them after reading the contents of this section.

Judging from the pass rate, the average pass rate for less than one-third of the topics is below 50%, and the pass rate for other (most topics) is above 50%. What is the concept of 50%? This is actually very high. For example, the average pass rate of BFS is almost 50%. However, the average pass rate of the more difficult binary method and dynamic planning is almost 40%.

Don't put pressure on trees. Trees, like linked lists, are relatively easy topics. Today Lucifer brings you a formula, one center, two basic points, three question types, four important concepts, and seven techniques to help you overcome the difficulty of trees.

## A center

A center refers to the traversal of the tree. There is only one central point in the traversal of the entire tree, and that is the traversal of the tree. Everyone must remember it firmly.

No matter what the topic is, the core is the traversal of the tree. This is the basis of everything. The traversal of the tree will be discussed later in vain.

In fact, the essence of tree traversal is to access every element in the tree (isn't this the case for traversing any data structure? ). But how did you access it? I can't directly access the leaf node. I have to access it from the root node, and then access the child node according to the child node pointer, but the child node has multiple directions (up to two in the binary tree), so there is the question of which one to access first, which has caused different traversal methods.

> The access order of the left and right child nodes is usually unimportant, and in very rare cases there will be some subtle differences. For example, if we want to access the bottom-left node of a tree, the order will have an impact, but there will be fewer such questions.

Traversal is not the purpose, traversal is for better processing. The processing here includes searching, modifying trees, etc. Although the tree can only be accessed from the root, we can choose whether to process it when we come back from the visit, or before the visit comes back. These two different methods are post-sequence traversal and pre-sequence traversal.

> Regarding the specific traversals, I will talk about them in detail later. Now you only need to know how these traversals come from.

However, tree traversal can be divided into two basic types, namely depth-first traversal and breadth-first traversal. These two traversal methods are not unique to the tree, but they accompany all the problems of the tree. It is worth noting that these two traversal methods are only a kind of logic, so the theory can be applied to any data structure, such as [365. Kettle problem) (https://github.com/azl397985856/leetcode/blob/master/problems/365.water-and-jug-problem.md "365. In the kettle problem"), you can use the breadth-first traversal of the state of the kettle, and the state of the kettle can be represented by a binary group of \*\*.

> Unfortunately, the breadth-first traversal solution of this question will time out when submitted on LeetCode.

### How to write tree traversal and iteration

Many children said that the recursive writing method of the front, middle and back sequence of a binary tree is no problem, but they can't write it iteratively. They asked me if there is any good way.

Here I will introduce to you a practical technique for writing iterative tree traversal, and unify the three tree traversal methods. You can't be wrong with the package. This method is called the two-color marking method. If you know this technique, then you can practice it normally... only recursively. Then during the interview, if you really need to use iteration or the kind of topic that has special requirements for performance, then you can just use my method. Let me talk about this method in detail.

We know that among the garbage collection algorithms, there is an algorithm called the three-color marking method. namely：

-Use white to indicate that it has not been accessed yet -Gray indicates that the child node has not been fully accessed -Black indicates that all child nodes are accessed

Then we can imitate its ideas and use the two-color marking method to unify the three colors.

Its core ideas are as follows：

-Use colors to mark the status of nodes. New nodes are white and visited nodes are gray. -If the encountered node is white, mark it as gray, and then add its right child node, itself, and left child node to the stack in turn. -If the encountered node is gray, the value of the node is output.

The middle-order traversal implemented using this method is as follows：

```python
class Solution:
def inorderTraversal(self, root: TreeNode) -> List[int]:
WHITE, GRAY = 0, 1
res = []
stack = [(WHITE, root)]
while stack:
color, node = stack. pop()
if node is None: continue
if color == WHITE:
stack. append((WHITE, node. right))
stack. append((GRAY, node))
stack. append((WHITE, node. left))
else:
res. append(node. val)
return res
```

It can be seen that in the implementation, White represents the first entry process in recursion, while Gray represents the process of returning from the leaf node in recursion. Therefore, this iterative writing method is closer to the essence of recursive writing.

If you want to implement preorder and postorder traversal, you only need to adjust the stacking order of the left and right child nodes, and there is no need to make any changes to the other parts.

![](https://p.ipic.vip/o9d4m4.jpg) (You only need to adjust the position of these three sentences to traverse the front, middle and back sequence)

> Note: The preface and preface of this schematic diagram are reversed

It can be seen that the three-color marking method is used, and its writing method is similar to the form of recursion, so it is easy to memorize and write.

Some students may say that every node here will enter and exit the stack twice, which is double the number of iterations entering and exiting the stack compared to ordinary iterations. Is this performance acceptable? What I want to say is that this increase in time and space is only an increase in constant terms, and in most cases it will not have much impact on the program. Except that sometimes the game will be more disgusting, it will be stuck often (card often refers to the optimization of code running speed through methods related to computer principles and unrelated to theoretical complexity). Conversely, most of the code written by everyone is recursion. You must know that recursion usually has worse performance than the two-color notation here due to the overhead of the memory stack. Then why not use one iteration of the stack? To be more extreme, why doesn't everyone use Morris traversal?

> Morris traversal is an algorithm that can complete the traversal of a tree with a constant spatial complexity.

I think that in most cases, people don't need to pay too much attention to such small differences. In addition, if this traversal method is fully mastered, it is not difficult to write an iteration into the stack based on the idea of recursion. It's nothing more than entering the stack when the function is called, and exiting the stack when the function returns. For more information about binary tree traversal, you can also visit the topic I wrote earlier ["Binary tree Traversal"](https://github.com/azl397985856/leetcode/blob/master/thinkings/binary-tree-traversal.md "Traversal of binary trees").

### Summary

To briefly summarize, one of the centers of the tree topic is the traversal of the tree. There are two types of tree traversal, namely depth-first traversal and breadth-first traversal. The iterative writing method of different depth-first traversal of trees (preorder, middleorder, and postorder traversal) is where most people are prone to making mistakes. Therefore, I introduced a method to unify the three traversals-the two-color marking method, so that you no longer have to be afraid of writing iterative trees in the future. Traversal in the first, middle, and last order. If you are thoroughly familiar with this writing method, you can memorize and practice one more time to enter the stack or even Morris traversal.

In fact, it is also very simple to implement recursion by iterating once in and out of the stack. It is nothing more than using the idea of recursion, except that you put the recursion body in the loop. It is easy to understand that you can look back after you are familiar with recursion. The recursion technique of deep traversal of trees, we will explain in the "Two Basic Points" section later.

## Two basic points

As mentioned above, there are two basic ways to traverse a tree, namely depth-first traversal (hereinafter referred to as DFS) and breadth-first traversal (hereinafter referred to as BFS). These are the two basic points. These two traversal methods will be subdivided into several methods below. For example, \*\*DFS is subdivided into front, middle and back sequence traversal, and BFS is subdivided into layered and unlinked layers.

**DFS is suitable for some violent enumeration topics. If DFS is implemented with the help of a function call stack, it can be easily implemented using recursion. **

### BFS is not hierarchical traversal

While BFS is suitable for seeking the shortest distance, this is not the same as hierarchical traversal, and many people confuse it. It is emphasized here that hierarchical traversal and BFS are completely different things.

Hierarchical traversal is to traverse the tree layer by layer and access it in the hierarchical order of the tree.

![](https://p.ipic.vip/7n2sg5.jpg) (Hierarchical traversal diagram)

\*\*The core of BFS is that it can be terminated early when the shortest time is required. This is its core value. Hierarchical traversal is a byproduct of BFS that does not require early termination. This early termination is different from the early termination of DFS pruning, but the early termination of finding the nearest target. For example, if I want to find the nearest target node, BFS can return directly after finding the target node. And DFS has to exhaustively list all possibilities to find the nearest one, which is the core value of BFS. In fact, we can also use DFS to achieve the effect of hierarchical traversal. With the help of recursion, the code will be even simpler.

> If you find any node that meets the conditions, it's fine. There is no need to be the nearest one, then there is not much difference between DFS and BFS. At the same time, in order to make writing simple, I usually choose DFS.

The above is a brief introduction to the two traversal methods. Below we will explain the two in detail.

### Depth first traversal

The Depth-First-Search algorithm (DFS) is an algorithm used to traverse a tree or graph. Traverse the nodes of the tree along the depth of the tree, and search for the branches of the tree as deep as possible. When the edge of node v has been explored, the search will go back to the starting node of the edge where Node V was found. This process continues until all nodes reachable from the source node have been found. If there are still undiscovered nodes, select one of them as the source node and repeat the above process. The entire process is repeated until all nodes are accessed, which is a blind search.

Depth-first search is a classic algorithm in graph theory. The depth-first search algorithm can be used to generate a corresponding topological sorting table for the target graph. The topological sorting table can be used to easily solve many related graph theory problems, such as the maximum path problem and so on. For inventing the "depth-first search algorithm", John Hopcroft and Robert Tayan jointly won the highest award in the field of computers: the Turing Award in 1986.

As of now (2020-02-21), there are 129 questions in the LeetCode for depth-first traversal. The question type in LeetCode is definitely a super big one. For tree problems, we can basically use DFS to solve them, and even we can do hierarchical traversal based on DFS, and since DFS can be done recursively, the algorithm will be more concise. In situations where performance is very demanding, I suggest you use iteration, otherwise try to use recursion, which is not only simple and fast to write, but also not error-prone.

DFS illustration：

![binary-tree-traversal-dfs](https://p.ipic.vip/7zo12v.gif)

(Picture from https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/tree/depth-first-search )

#### Algorithm flow

1. First put the root node in the **stack**.
2. Take the first node from _stack_ and verify whether it is the target. If the target is found, the search ends and the result is returned. Otherwise, add one of its direct child nodes that have not been tested to the stack.
3. Repeat Step 2.
4. If there is no direct child node that has not been detected. Add the previous node to the **stack**. Repeat Step 2.
5. Repeat step 4.
6. If **stack** is empty, it means that the entire picture has been checked-that is, there are no targets to search for in the picture. End the search and return “Target not found".

**The stack here can be understood as a stack implemented by oneself, or as a call stack. If it is recursion when calling the stack, it is recursion, and if it is a stack implemented by oneself, it is iteration. **

#### Algorithm Template

A typical general DFS template might look like this：

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

The visited above is to prevent endless loops caused by the presence of rings. And we know that trees do not have rings, so most of the topics of the tree do not need to be visited, unless you modify the structure of the tree, for example, the left pointer of the left subtree points to itself, and there will be a ring at this time. Another example is [138. Copy the linked list with random pointers](https://leetcode-cn.com/problems/copy-list-with-random-pointer /) This question needs to record the nodes that have been copied. There are very few questions for trees that need to record visited information.

Therefore, the DFS of a tree is more：

```js

function dfs(root) {
if (meet specific conditions) {
// Return result or exit search space
}
for (const child of root. children) {
dfs(child)
}
}
```

And almost all topics are binary trees, so the following template is more common.

```js
function dfs(root) {
if (meet specific conditions) {
// Return result or exit search space
}
dfs(root. left)
dfs(root. right)
}
```

In addition to if (which meets certain conditions), our different topics will also write some unique logic. These logic are written in different locations and have different effects. So what will be the impact of different locations, and when should I write where? Next, let's talk about two common DFS methods.

#### Two common categories

Preorder traversal and postorder traversal are the two most common DFS methods. Another traversal method (middle-order traversal) is generally used to balance binary trees. We will talk about the four important concepts in the next part.

##### Preorder traversal

If your code is probably written like this (pay attention to the location of the main logic)：

```js
function dfs(root) {
if (meet specific conditions) {
// Return result or exit search space
}
// Main logic
dfs(root. left)
dfs(root. right)
}
```

Then at this time we call it preorder traversal.

##### Back-order traversal

And if your code is probably written like this (pay attention to the location of the main logic)：

```js
function dfs(root) {
if (meet specific conditions) {
// Return result or exit search space
}
dfs(root. left)
dfs(root. right)
// Main logic
}
```

Then at this time we call it post-sequence traversal.

It is worth noting that we sometimes write code like this：

```js
function dfs(root) {
if (meet specific conditions) {
// Return result or exit search space
}
// Do something
dfs(root. left)
```
