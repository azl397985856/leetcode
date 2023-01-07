# How difficult is dynamic programming?

dynamic programming is a term borrowed from other industries.

Its general meaning is to divide a thing into several stages first, and then achieve the goal through the transfer between stages. Since there are usually multiple transfer directions, it is necessary to make a decision at this time to choose which specific transfer direction.

The task to be solved by dynamic programming is usually to accomplish a specific goal, and this goal is often the optimal solution. and：

1. There can be transfer between stages, which is called dynamic.
2. Reaching a feasible solution (target stage) requires continuous transfer, so how can the transfer achieve the optimal solution? This is called planning.

Each stage is abstract as a state (represented by a circle), and transitions may occur between states (represented by arrows). You can draw a picture similar to the following：

![State transition diagram](https://p.ipic.vip/9bx82f.jpg)

Then what kind of decision sequence should we make to make the result optimal? In other words, it is how each state should be selected to the next specific state and finally reach the target state. This is the problem of dynamic programming research.

Each decision actually does not consider subsequent decisions, but only the previous state. \*\* From an image point of view, it is actually the short-sighted thinking of taking a step by step. Why can this kind of shortsightedness be used to solve the optimal solution? That's because：

1. We simulated all the possible transfers, and finally picked an optimal solution.
2. No backward nature (we'll talk about this later, let's sell a Guanzi first)

> And if you don't simulate all the possibilities, but go directly to an optimal solution, it is the greedy algorithm.

That's right, dynamic programming was here to find the optimal solution at the beginning. It's just that sometimes you can find other things such as the total number of plans by the way, which is actually a byproduct of dynamic programming.

Well, let's break dynamic programming into two parts and explain them separately. Maybe you know what dynamic programming is. But this does not help you to do the question. What exactly is dynamic programming in algorithms?

In terms of algorithms, dynamic programming has many similarities with the recursion of look-up tables (also known as memorized recursion). I suggest you start with memorization recursion. This article also starts with memorization recursion, and gradually explains to dynamic programming.

## Memorize recursion

So what is recursion? What is a look-up table (memorization)? Let's take a look.

### What is recursion?

Recursion refers to the method of calling the function itself in a function.

Meaningful recursion usually breaks down the problem into similar sub-problems that are reduced in scale. When the sub-problem is shortened to ordinary, we can directly know its solution. Then the original problem can be solved by establishing a connection (transfer) between recursive functions.

> Is it a bit like partition? Partition refers to dividing a problem into multiple solutions, and then merging multiple solutions into one. And that's not what it means here.

To solve a problem using recursion, there must be a recursion termination condition (the algorithm is exhaustive), which means that recursion will gradually shrink to ordinary size.

Although the following code is also recursive, it is not an effective algorithm because it cannot end.：

```py
def f(x):
return x + f(x - 1)
```

The above code will be executed forever and will not stop unless the outside world intervenes.

Therefore, more cases should be：

```py
def f(n):
if n == 1: return 1
return n + f(n - 1)
```

Using recursion can usually make the code shorter and sometimes more readable. The use of recursion in the algorithm can **Very simply** complete some functions that are not easy to implement with loops, such as left-center-right sequence traversal of binary trees.

Recursion is widely used in algorithms, including functional programming, which is becoming increasingly popular.

> Recursion has a high status in functional programming. There is no loop in pure functional programming, only recursion.

In fact, except for recursion through function calls themselves in coding. We can also define recursive data structures. For example, the well-known trees, linked lists, etc. are all recursive data structures.

```c
Node {
Value: any; // The value of the current node
Children: Array<Node>; // Point to his son
}
```

The above code is the definition form of a multi-prong tree. It can be seen that children are the collection class of Node, which is a kind of ** recursive data structure**.

### Not just ordinary recursive functions

The recursive functions in memorized recursion mentioned in this article actually refer to special recursive functions, that is, the following conditions are met on ordinary recursive functions：

1. Recursive functions do not rely on external variables
2. Recursive functions do not change external variables

> What is the use of meeting these two conditions? This is because we need the function to give parameters, and its return value is also determined. In this way, we can memorize. Regarding memorization, we will talk about it later.

If you understand functional programming, in fact, recursion here is strictly speaking a function in functional programming. It doesn't matter if you don't understand it, the recursive function here is actually a function in mathematics.

Let's review the functions in mathematics：

```
In a process of change, suppose there are two variables x and Y. If there is a uniquely determined y corresponding to any x, then x is said to be an independent variable and y is a function of X. The range of values of x is called the domain of this function, and the range of values of the corresponding y is called the range of functions.
```

And**All recursion mentioned in this article refers to functions in mathematics. **

For example, the recursive function above：

```py
def f(x):
if x == 1: return 1
return x + f(x - 1)
```

-x is the independent variable, and the set of all possible return values of x is the domain. -f(x) is a function. The set of all possible return values of -f(x) is the value range.

There can be multiple independent variables, and there can be multiple parameters corresponding to recursive functions, such as f(x1, x2, x3).

**Describing problems through functions, and describing the relationship between problems through the calling relationship of functions, is the core content of memorization recursion. **

Every dynamic programming problem can actually be abstract as a mathematical function. The set of arguments of this function is all the values of the question, and the range of values is all the possibilities of the answers required by the question. Our goal is actually to fill in the contents of this function so that given the independent variable x, it can be uniquely mapped to a value Y. (Of course, there may be multiple independent variables, and there may be multiple parameters corresponding to recursive functions)

Solving the dynamic programming problem can be seen as filling the black box of functions so that the numbers in the defined domain are correctly mapped to the value range.

![Mathematical functions vs Dynamic programming](https://p.ipic.vip/ga40ge.jpg)

Recursion is not an algorithm, it is a programming method corresponding to iteration. It's just that we usually use recursion to decompose problems. For example, we define a recursive function f(n) and use f(n) to describe the problem. It is the same as using ordinary dynamic programming f[n] to describe the problem. Here f is a dp array.

### What is memorization?

In order for everyone to better understand the contents of this section, we will cut into it through an example.：

A person who climbs stairs can only climb 1 or 2 steps at a time. Assuming there are n steps, how many different ways does this person climb stairs?

Ideas：

Since the n-th step must have come from the n-1 step or the n-2 step, the number of steps to the n-th step is `the number of steps to the n-1 step plus the number of steps to the n-2 step`.

Recursive code：

```js
function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
```

We use a recursive tree to intuitively feel the following (each circle represents a sub-problem)：

![Overlapping sub-issues](https://p.ipic.vip/5ipuui.jpg)

Red indicates repeated calculations. That is, both Fib(N-2) and Fib(N-3) have been calculated twice, in fact, one calculation is enough. For example, if the value of Fib(N-2) is calculated for the first time, then the next time you need to calculate Fib(N-2) again, you can directly return the result of the last calculation. The reason why this can be done is precisely as mentioned earlier. Our recursive function is a function in mathematics, that is to say, if the parameter is certain, then the return value must not change. Therefore, if we encounter the same parameter next time, we can return the value calculated last time directly without having to recalculate. The time saved in this way is equivalent to the number of overlapping sub-problems.

**Taking this question as an example, it originally needed to calculate $2^n 次 times, but if memorization is used, it only needs to be calculated n times, which is so magical. **

In the code, we can use a hashtable to cache intermediate calculation results, eliminating unnecessary calculations.

We use memorization to transform the above code：

```py
memo = {}
def climbStairs(n):
if n == 1:return 1
if n == 2: return 2
if n in memo: return memo[n]
ans = func(n - 1) + func(n-2)
memo[n] = ans
return ans
climbStairs(10)
```

Here I use a hash table named ** memo to store the return value of the recursive function, where key is the parameter and value is the return value of the recursive function. **

![Hash indicates intent](https://p.ipic.vip/gdpa5k.jpg)

> The form of key is (x, y), which represents an ancestor. Usually there are multiple parameters for dynamic programming, so we can use the ancestor method to memorize them. Or it can take the form of a multidimensional array. For the figure above, a two-dimensional array can be used to represent it.

You can feel the effect of memorization by deleting and adding memos in the code.

### Summary

The advantage of using recursive functions is that the logic is simple and clear, and the disadvantage is that too deep calls can cause stack overflow. Here I have listed a few algorithm questions. These algorithm questions can be easily written recursively.：

-Recursively implement sum

-Traversal of binary trees

-Problem with taking stairs

-Hannota problem

-Yang Hui Triangle

In recursion, if there is double-counting (we have overlapping sub-problems, which will be discussed below), it is one of the powerful signals of using memorized recursion (or dynamic programming) to solve problems. It can be seen that the core of dynamic programming is to use memorization to eliminate the calculation of repetitive sub-problems. If the scale of this repetitive sub-problem is exponential or higher, then the benefits of memorization recursion (or dynamic programming) will be very large.

In order to eliminate this kind of double calculation, we can use the look-up table method. That is, recursively use a “record table” (such as a hash table or array) to record the situation that we have already calculated. When we encounter it again next time, if it has been calculated before, then just return it directly, thus avoiding double calculations. The DP array in dynamic programming, which will be discussed below, actually has the same function as the “record table” here.

If you are just starting to come into contact with recursion, it is recommended that you practice recursion first and then look back. A simple way to practice recursion is to change all the iterations you write to a recursive form. For example, if you write a program with the function of "outputting a string in reverse order”, it will be very easy to write it out using iteration. Can you write it out recursively? Through such exercises, you can gradually adapt to using recursion to write programs.

When you have adapted to recursion, then let us continue to learn dynamic programming!

## dynamic programming

After talking about recursion and memorization for so many years, it is finally time for our protagonist to appear.

### Basic concepts of dynamic programming

Let's first learn the two most important concepts of dynamic programming: optimal substructure and non-validity.

Among them：

- The non-validity determines whether dynamic programming can be used to solve it. -The optimal substructure determines how to solve it.

#### Optimal substructure

Dynamic programming is often applied to problems with overlapping sub-problems and optimal substructure properties. The overlapping sub-problem was mentioned earlier, so what is the optimal substructure? This is the definition I found from Wikipedia：

```
If the solution of the sub-problem contained in the optimal solution of the problem is also optimal, we call the problem to have optimal substructure properties (that is, it satisfies the optimization principle). The nature of the optimal substructure provides important clues for dynamic programming algorithms to solve problems.
```

For example: If the score in the exam is defined as f, then this question can be broken down into sub-questions such as Chinese, mathematics, and English. Obviously, when the sub-problem is optimal, the solution to the big problem of total score is also optimal.

Another example is the 01 backpack problem: define f (weights, values, capicity). If we want to ask for f([1,2,3], [2,2,4], 10) The optimal solution. Consider whether to add each item to the backpack from left to right. We can divide it into the following sub-problems：

-`Do not put the third item in the backpack (that is, only consider the first two items)`, that is, f([1,2], [2,2], 10) -And `put the third item in the backpack`, which is f([1,2,3], [2,2,4], 10) ( That is, a backpack with a full capacity of 10-3 = 7 when only the first two pieces are considered) is equivalent to 4 + f([1,2], [2,2], 7)， Among them, 4 is the value of the third item, and 7 is the remaining available space after the third item is installed. Since we only consider the first three items, the first two items must be filled with 10-3 = 7.

> Obviously, these two problems are still complicated, and we need to disassemble them further. However, this is not about how to disassemble.

Original question f([1,2,3], [2,2,4], 10) Equal to the maximum value of the above two sub-problems. Only when the two sub-problems are both optimal, the whole is optimal, because the sub-problems will not affect each other.

#### No effect

That is, once the solution of the sub-problem is determined, it will no longer change, and will not be affected by the decision-making of the larger problem that contains it after that.

Continue with the above two examples.

-High scores in mathematics cannot affect English (reality may actually affect, for example, if you spend a certain amount of time and invest more in English, there will be less in other subjects). -Backpack problem in f([1,2,3], [2,2,4], 10) Choosing whether to take the third item should not affect whether to take the previous item. For example, the title stipulates that after taking the third item, the value of the second item will become lower or higher). This situation is not satisfied with non-recoil.

### Three elements of dynamic programming

#### Status definition

What is the central point of dynamic programming? If you let me say something, it is to define the state.

The first step in dynamic programming to solve problems is to define the state. After defining the state, you can draw a recursive tree, focus on the optimal substructure and write the transfer equation. That's why I said that the state definition is the core of dynamic programming, and the state of the dynamic programming problem is indeed not easy to see.

But once you can define the state, you can draw a recursive tree along the way. After drawing the recursive tree, just focus on the optimal substructure. However, the premise of being able to draw a recursive tree is: to divide the problem, professionally speaking, it is to define the state. Then how can we define the state?

Fortunately, the definition of status has characteristic routines. For example, the state of a string is usually dp[i], which means that the string s ends with I. . . . 。 For example, the state of two strings is usually dp[i][j], which means that the string s1 ends in i and s2 ends in J. . . . 。

In other words, there are usually different routines for the definition of status, and you can learn and summarize them in the process of doing the questions. But there are many such routines, so how can I fix them?

To be honest, I can only practice more and summarize the routines during the practice. For specific routines, refer to the part of the question type of dynamic programming that follows. After that, everyone can think about the general state definition direction for different question types.

**Two examples**

Regarding the definition of state, it is so important that I list it as the core of dynamic programming. Therefore, I think it is necessary to give a few examples to illustrate. I am directly from Li Buckle's [dynamic programming topic](https://leetcode-cn.com/tag/dynamic-programming/problemset / "dynamic programming Topics") The first two questions are selected to tell you about them.

![Topic of dynamic programming of Force Buckle](https://p.ipic.vip/r7b7xv.jpg)

The first question: "5. The Longest Palindrome Strand" Medium difficulty

```
Give you a string s and find the longest palindrome sub-string in S.



Example 1：

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also the answer that meets the meaning of the question.
Example 2：

Input: s = "cbbd"
Output: "bb"
Example 3：

Input: s = "a"
Output: "a"
Example 4：

Input: s = "ac"
Output: "a"


prompt：

1 <= s. length <= 1000
s consists only of numbers and English letters (uppercase and/or lowercase)

```

**The input parameter of this question is a string. Then we have to transform it into a smaller sub-question. That is undoubtedly the problem of the string becoming shorter. The critical condition should also be an empty string or one character. **

therefore：

-One way to define the state is f(s1), which means the longest palindrome sub-string of the string s1, where s1 is the sub-string of the string s in the question, then the answer is f(s). -Since the smaller size refers to the shorter string, we can also use two variables to describe the string, which actually saves the overhead of opening up the string. The two variables can be ** Starting point index + strand length**, it can also be ** end point index + strand length**, it can also be ** starting point coordinates + end point coordinates**. As you like, here I will use ** starting point coordinates + end point coordinates**. Then the state definition is f(start, end), which means the longest palindrome sub-string of the sub-string s[start:end+1], then the answer is f(0, len(s)- 1)

> s[start: end+1] refers to a continuous sub-string that contains s[start] but does not contain s[end+1].

This is undoubtedly a way to define the state, but once we define it like this, we will find that the state transition equation will become difficult to determine (in fact, many dynamic programs have this problem, such as the longest ascending sequence problem). So how exactly do you define the state? I will continue to complete this question later in the state transition equation. Let's take a look at the next question first.

The second question: "10. Regular Expression Matching》 Difficult Difficulty

```
Give you a string s and a character p, please implement a support'. The regular expressions of' and'*' match.

'. 'Matches any single character
'*' matches zero or more previous elements
The so-called matching is to cover the entire string s, not part of the string.


Example 1：

Input: s = "aa" p = "a"
Output: false
Explanation: "a" cannot match the entire string of "aa".
Example 2:

Input: s= "aa" p= "a*"
Output: true
Explanation: Because "*" means that it can match zero or more previous elements, the previous element here is "a". Therefore, the string "aa" can be regarded as repeating "a" once.
Example 3：

Input: s = "ab" p = ". *"
Output: true
Explanation: ". *"means that it can match zero or more ('*') arbitrary characters ('. ').
Example 4：

Input: s = "aab" p = "c*a*b"
Output: true
Explanation: Because '*' means zero or more, here 'c' is 0, and 'a' is repeated once. Therefore, the string "aab" can be matched.
Example 5：

Input: s= "mississippi" p= "mis*is*p*. "
Output: false


prompt：

0 <= s. length <= 20
0 <= p. length <= 30
s may be empty and only contains lowercase letters from a to Z.
P may be empty, and only contains lowercase letters from a to z, as well as characters. And *.
Ensure that every time the character * appears, a valid character is matched in front of it

```

There are two entries for this question, one is s and the other is P. Following the above idea, we have two ways to define the state.

-One way to define the state is f(s1, p1), which means whether p1 can match the string s1, where s1 is a sub-string of the string s in the question, and p1 is a sub-string of the string p in the question, then the answer is f(s, p). -The other is f(s_start, s_end, p_start, p_end), which means whether the sub-string p1[p_start: p_end+1] can match the string s[s_start: s_end+1], then the answer is f(0, len(s)-1, 0, len(p)-1)

In fact, we can also use a simpler way of state definition for this question, but the basic ideas are similar. I still sell a Guanzi, and the transfer equation will be revealed later.

After completing the state definition, you will find that the complexity of time and space has become obvious. This is why I have repeatedly emphasized that state definition is the core of dynamic programming.

How can the complexity of time and space be obvious?

First of all, the spatial complexity, I just said that dynamic programming is actually a violent method of looking up tables, so the spatial complexity of dynamic programming is based on the size of the table. A more straightforward point is the size of the memo in the hash table above. And the size of **memo** is basically the number of states. What is the number of states? Doesn't it depend on how you define your status? For example, f(s1, p1) above. What is the status? Obviously it is the Cartesian product of the range of values of each parameter. All possible values of s1 have len(s) species, and all possible values of p1 have len(p) species, then the total state size is len(s)\* len(p). Then the spatial complexity is $O(m*n)$, where m and n are the sizes of s and p, respectively.

> I said that the spatial complexity is based on the number of states. Here, the state compression situation will not be considered for the time being.

The second is the time complexity. The time complexity is more difficult to say. However, since we **have to enumerate all states**in any case, the time complexity base is the total number of states\**. In the above state definition method, the time complexity is based on$O(m*n)$.

If you enumerate every state and need to calculate it with every character of s, then the time complexity is $O(m^2*n)$.

Taking the example of climbing stairs above, we define that the state f(n) represents the number of ways to reach the nth step. Then the total number of states is n, and the spatial complexity and time complexity are based on $n$. (Still not considering scrolling array optimization)

Take another example: [62. Different paths) (https://github.com/azl397985856/leetcode/blob/master/problems/62.unique-paths.md )

```
A robot is located in the upper left corner of an m x n grid (the starting point is marked as “Start” in the picture below).

The robot can only move down or right one step at a time. The robot tries to reach the lower right corner of the grid (marked as “Finish” in the picture below).

Q How many different paths are there in total?
```

This question is very similar to the stair climbing above, but it has changed from one-dimensional to two-dimensional. I call it two-dimensional stair climbing. There are many similar skin-changing questions, and everyone will slowly appreciate them.

In this question, I define the state as f(i,j), which represents the total number of paths for the robot to reach the point (i,j). Then the total number of states is the Cartesian product of the values of i and j, which is m\*N.

![Two-dimensional stair climbing](https://p.ipic.vip/yz1l42.jpg)

In general, the spatial and time complexity of dynamic programming is based on the number of states, and the number of states is usually the Cartesian product of parameters, which is determined by the non-backward nature of dynamic programming.

**Critical conditions are the easiest to compare**

When you have defined the state, there are only three things left：

1. Critical condition

2. State transition equation

3. Enumeration status

In the stair climbing problem explained above, if we use f(n) to indicate how many ways there are to climb n steps, then：

```
f(1) and f(2) are [boundaries]
f(n) = f(n-1) + f(n-2) is the [state transition formula]

```

Let me express it in the form of dynamic programming：

```
dp[0] and dp[1] are [boundary]
dp[n] = dp[n-1] + dp[n-2] is the [state transition equation]
```

It can be seen how similar memorized recursion and dynamic programming are.

In fact, the critical conditions are relatively simple. Everyone can only feel it by brushing a few more questions. The difficulty is to find the state transition equation and enumerate the states. These two core points are based on the fact that the state has been abstract. For example, for the problem of climbing stairs, if we use f(n) to indicate how many ways there are to climb n steps, then f(1), f(2),. . . It is each **independent state**.

Having completed the definition of state, let's take a look at the state transition equation.

#### State transition equation

The state of the current stage in dynamic programming is often the result of the state of the previous stage and the decision-making of the previous stage. There are two keywords here, namely ：

-Previous stage status -Decision-making in the previous stage

In other words, if the state s[k] of the k-th stage and the decision choice (s[k]) are given, the state s[k+1] of the k+1 stage is completely determined. It is expressed by the formula: s[k]+ choice (s[k])-> s[k+1], which is the state transition equation. It should be noted that there may be multiple choices, so there will be multiple states s[k+1] for each stage.
