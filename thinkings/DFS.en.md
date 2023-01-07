# Depth first traversal

## Introduction

Depth-First-Search (DFS) is an algorithm used to traverse or search a tree or graph. Traverse the nodes of the tree along the depth of the tree, and search for the branches of the tree as deep as possible. When the edge of node v has been explored, the search will go back to the starting node of the edge where Node V was found. This process continues until all nodes reachable from the source node have been found. If there are still undiscovered nodes, select one of them as the source node and repeat the above process. The entire process is repeated until all nodes are accessed. It is a blind search.

Depth-first search is a classic algorithm in graph theory. The depth-first search algorithm can be used to generate a corresponding topological sorting table for the target graph. The topological sorting table can be used to easily solve many related graph theory problems, such as the maximum path problem and so on.

For inventing the "depth-first search algorithm", John Hopcroft and Robert Tayan jointly won the highest award in the field of computers: the Turing Award in 1986.

As of now (2020-02-21), there are 129 questions in the LeetCode for depth-first traversal. The question type in LeetCode is definitely a super big one. For tree problems, we can basically use DFS to solve them, and even we can do breadth-first traversal based on DFS. It does not necessarily mean that DFS cannot do BFS (breadth-first traversal). And since we can usually do DFS based on recursion, the algorithm will be more concise. In situations where performance is very important, I suggest you use iteration, otherwise try to use recursion, which is not only simple and fast to write, but also not error-prone.

In addition, in-depth priority traversal can be linked by combining backtracking topics. It is recommended to put these two topics together to learn.

The concept of DFS comes from graph theory, but there are still some differences between DFS in search and DFS in graph theory. DFS in search generally refers to violent enumeration through recursive functions.

## Algorithm flow

1. First put the root node in the **stack**.
2. Take the first node from _stack_ and verify whether it is the target. If the target is found, the search ends and the result is returned. Otherwise, add one of its direct child nodes that have not been tested to the stack.
3. Repeat Step 2.
4. If there is no direct child node that has not been detected. Add the previous node to the **stack**. Repeat Step 2.
5. Repeat step 4.
6. If **stack** is empty, it means that the entire picture has been checked-that is, there are no targets to search for in the picture. End the search and return “Target not found".

> The stack here can be understood as a self-implemented stack, or as a call stack

## Algorithm Template

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

## Topic recommendation

These are a few DFS topics that I recently summarized, and will continue to be updated in the future~

- [200. Number of islands](https://leetcode-cn.com/problems/number-of-islands/solution/mo-ban-ti-dao-yu-dfspython3-by-fe-lucifer-2 /) Medium

- [695. The largest area of the island](https://leetcode-cn.com/problems/max-area-of-island/solution/mo-ban-ti-dao-yu-dfspython3-by-fe-lucifer /) Medium
- [979. Allocate coins in a binary tree](https://leetcode-cn.com/problems/distribute-coins-in-binary-tree/solution/tu-jie-dfspython3-by-fe-lucifer /) Medium
