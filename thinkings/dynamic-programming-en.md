# Recursion and Dynamic Programming

> WIP: the translation of `Recursive and Dynamic Programming` is on the way.

Dynamic Programming (DP) can be interpreted as the recursion of table look-up. Then, what is recursion?

## Recursion

Definition: The process in which a function calls itself directly or indirectly is called recursion and the corresponding function is called as recursive function.

In some algorithms, recursion can help to implement loop functions very easily. For example, the traverse of Binary Tree. Recursion is widely used in algorithms, including the increasingly popular Functional programming.

> In pure functional programming, there is no loops, but only recursion.

Now, let's going to talk about recursion. In layman's terms, A recursive solution solves a problem by solving a smaller instance of the same problem. It solves this new problem by solving an even smaller instance of the same problem. Eventually, the new problem will be so small that its solution will either be obvious or known. This solution will lead to the solution of the original problem.

### Three Key Factors of Recursion

1. Each recursive call should be on a smaller instance of the same problem, that is, a smaller subproblem.
2. The recursive calls must eventually reach a base case, which is solved without further recursion.

There are several questions which can be solved by using recursion easily:

- [sum by recursion](https://www.geeksforgeeks.org/sum-of-natural-numbers-using-recursion/)
- [Traverse Binary Tree](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
- [climbing stairs](https://leetcode.com/problems/climbing-stairs/)
- [tower of Hanoi](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/)

## Dynamic Programming (DP)

> If we say, recursion is a detivation from the solution to the problem which trying to shrinkthe problem and solve it. Then DP solves probems by starting from a small condition and extending it to the optimal substructure.

The thinking of recursion is intuitive. And it is easy to be implemented. But sometimes, with drawing a recursion tree to help analyse, we can find that recursion may bring extra computation during shriking the scale of the problem.
We are going to use recursion to solve [279.perfect-squares](../problems/279.perfect-squares.md) with using a buffer to store the intermediate result for reducing some computation. In fact, this is also the key idea in DP.

Here is an example of calculate the sum of all items in the given array.

code:

```js
function sum(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  return nums[0] + sum(nums.slice(1));
}
```

Let's review this problem intuitively with a recursion tree.

![dynamic-programming-1](../assets/thinkings/dynamic-programming-1.png)

This method works, but not quit good. Because there are certain costs in executing functions. Let's take JS as example.
For each time a function executed, it requires stack push operations, pre-processing and executing processes. So, recurse a function is easy to cause stack overflow.

> In browser, the JS exgine has limit to the length of code execution stack. The stack overflow exeption happens when the length of execution stack exceeds the limit.

Another example for recursion:

You are climbing a stair case. It takes n steps to reach to the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

code:

```js
function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
```

This question is just like the `fibnacci` series. Let's have a look at the recursion tree of `fibnacci` question again.

![dynamic-programming-2](../assets/thinkings/dynamic-programming-2.png)

Some results are calculated repeatedly. Just like the red nodes showing. If a structure like `hashtable` is used to store the intermedia results, the reduplicative calculations can be avoided.
Similarly, DP also uses "table look-up" to solve the problem of reduplicative calculation.

Now let's talk more about the DP.

How to start from a small condition to achieve the optimal substructure.

This is the solution to the previous question with using DP:

```js
function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  let a = 1;
  let b = 2;
  let temp;

  for (let i = 3; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return temp;
}
```

Here is the process of "table look-up" in DP:

![dynamic-programming-3](../assets/thinkings/dynamic-programming-3.png)

> dotted box is the "table look-up"

This question is the most simplest one in DP, bacause it only contains a single factor. If it comes down to multiple factors, the question will be much more complex, such as knapsack problem.

For one factor, we only need a one-dimentional array at most. But for knapsack problem, we may need two-dimentional or even higher dimentional array.

Sometimes, we don't even need a one-dimentional array, just like the climbing stairs question. Bacause, in this question, only the past two states are required. That's why two varibles are enough. But not all DP questions have the shortcut like this.

### Two Key Factors in DP

1. state transfer function
2. critical condition

In the previous question:

```
f(1) and f(2) are the critical conditions
f(n) = f(n-1) + f(n-2) is the state transfer function
```

### Why it is necessary to draw a table for solving DP questions

Drawing a table to solve DP questions is a effective and efficient way. 

Essentially, DP breaks a problem into similar subproblems and solve the problem by solving its all subproblems.

It is similar to recursion. But DP can reduce the time and space compexity by a way like table look-up.

Drawing a table can help to complete the state transfer function. Each cell in the table is a subproblem. The process of filling the table, is the way to solve all subproblems. After solving all subproblems, it is easy to find the solution to the original problem.

First, we solve the simplest subproblem which can be worked out directly. Then, with state transfer function, the adjacent cells can be worked out. Finnally, the last cell, generally at the low right corner of the table, is the solution to the problem.

For example, using DP to solve Backpack problem, it makes decision that which cell should be selected with considering the previous subproblems `A[i-1][j] A[i-1][w-wj]`. The question needs the max value. So, we can work out the value respectively for the two different condition and choose the larger one and update the new cell.

### Related Questions

- [0091.decode-ways](../problems/91.decode-ways.md)
- [0139.word-break](../problems/139.word-break.md)
- [0198.house-robber](../problems/0198.house-robber.md)
- [0309.best-time-to-buy-and-sell-stock-with-cooldown](../problems/309.best-time-to-buy-and-sell-stock-with-cooldown.md)
- [0322.coin-change](../problems/322.coin-change.md)
- [0416.partition-equal-subset-sum](../problems/416.partition-equal-subset-sum.md)
- [0518.coin-change-2](../problems/518.coin-change-2.md)

> there are much more related questions not presented.

## Summary

There are two important algorithms in this article: recursion and dynamic programming.

If recursion is a bottom-top process, then DP is a top-bottom process.
