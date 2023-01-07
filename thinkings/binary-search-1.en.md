# I have almost finished brushing all the two-point questions of Lixiu, and I found these things. 。 。 (Part 1)

## Foreword

![](https://p.ipic.vip/6roqnw.jpg)

Hello everyone, this is lucifer. What I bring to you today is the topic of "Two Points". Let's start with the outline of this article. This is a brain map drawn by me with mindmap. After that, I will continue to improve it and gradually improve other topics.

> You can also use vscode blink-mind to open the source file to view. There are some notes in it that you can click to view. The source file can be obtained by replying to the brain map on my official account "Force Buckle Plus", and the brain map will continue to be updated with more content in the future. vscode plug-in address:https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

This series contains the following topics：

-[I have almost finished swiping all the linked topics of Lixu, and I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/08/linked-list/) -[After almost brushing all the tree questions of Li Buckle, I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/23/tree/) -[After almost brushing all the piles of questions, I found these things. 。 。 (Part 1))(https://lucifer . ren/blog/2020/12/26/heap/) -[After almost brushing all the piles of questions, I found these things. 。 。 (Part 2))(https://lucifer . ren/blog/2021/01/19/heap-2/)

<! -- more -->

This topic is expected to be divided into two parts. The first part mainly talks about **Basic concepts** and **a center**. With these basic knowledge, in the second part, we will continue to learn the two types of binary types and the four major applications.

The content of this article has been synchronized to the RoadMap of my question-brushing plug-in. Combined with the question-brushing plug-in, it tastes better to eat~ The way to obtain the plug-in can be viewed by replying to the plug-in on my public account.

![Swipe question plug-in](https://p.ipic.vip/d62pjf.jpg)

> If you find the article useful, please like and leave a message to forward it, so that I can continue to do it.

## Foreword

In order to prepare for this topic, I not only finished all the binary questions of Lixiu, but also all the binary questions of another OJ website-Binary Search, with a total of more than 100 questions. If you find it useful after reading it, you can tell me by likes and retweets. If there are many people who like it, I will continue to publish the next article as soon as possible~

Binary search is also known as the `half-fold search algorithm`. In a narrow sense, binary search is a search algorithm for finding a specific element in an ordered array. This is also a saying that most people know. In fact, the broad binary search is to reduce the scale of the problem to half of the original one. Similarly, the three-point method is to reduce the scale of the problem to 1/3 of the original.

The content that this article brings to you is `binary search in a narrow sense". If you want to understand other binary search in a broad sense, you can check out a blog post I wrote earlier [looking at the binary method from the problem of mouse drug testing](https://lucifer . ren/blog/2019/12/11/ laoshushidu/ "The binary method from the perspective of drug testing in mice")

> Although the basic idea of binary search is relatively simple, the details can be overwhelming. . . —Gartner

When Jon Bentley assigned binary search questions to students in professional programming classes, 90% of the students were still unable to give correct answers after spending several hours, mainly because these erroneous programs could not run when facing boundary values, or returned incorrect results. A study conducted in 1988 showed that only 5 out of 20 textbooks correctly implemented binary search. Not only that, Bentley's own binary search algorithm in the book "Programming Zhuji" published in 1986 has the problem of integer overflow, which has not been discovered for more than 20 years. The same overflow problem in the binary search algorithm implemented by the Java language library has existed for more than nine years before it was fixed.

It can be seen that binary search is not simple. This article will try to take you closer to ta, understand the underlying logic of ta, and provide templates to help you write bug-free binary search codes. After reading the lecture notes, it is recommended that you combine [LeetCode Book two-way search](https://leetcode-cn.com/leetbook/read/binary-search "LeetCode Book Binary Search") Practice it.

## Basic Concept

First of all, we need to know a few basic concepts. These concepts play a very important role in learning Chinese. After encountering these concepts, we will not talk about them anymore. By default, everyone has mastered them.

### Solution space

Solution space refers to ** The collection of all possible deconstructions of the topic**. For example, all solutions to a question may be 1,2,3,4,5, but in a certain case it can only be one of them (that is, it can be one of 1,2,3,4,5** a number**). Then the solution space here is a collection of 1,2,3,4,5. In a specific case, it may be any one of these values. Our goal is to determine which one it is in a specific case. If all possibilities are enumerated linearly, the time complexity of the enumeration part is $O(n)$.

Gave an example：

If you are asked to find target in an array nums, the corresponding index is returned if it exists, and -1 is returned if it does not exist. So what is the solution space for this question?

Obviously, the solution space is the interval [-1, n-1], where n is the length of nums.

It should be noted that the solution space of the above topic can only be an integer between the intervals [-1, n-1]. And decimals such as 1.2 cannot exist. This is actually the case for most people. However, there are also a small number of problems whose solution space includes decimals. If the solution space includes decimals, it may involve accuracy issues, which everyone needs to pay attention to.

For example, if you ask for the square root of a number x, the answer error is considered correct to the power of $10^-6$. It is easy to know here that the size of the solution space can be defined as [1,x](of course, it can be defined more precisely, we will discuss this issue later), where the solution space should include all real numbers in the interval, not just integers. At this time, the problem-solving ideas and code have not changed much, the only thing that needs to be changed is：

1. Update the step size of the answer. For example, the previous update was `l=mid+1`, but now **may**will not work, so this **may**will miss the correct solution, for example, the correct solution happens to be a certain decimal within the interval [mid, mid+1].
2. Errors need to be considered when judging conditions. Due to the problem of accuracy, the end condition of the judgment may have to become ** The error with the answer is within a certain range**.

For **search questions**, the solution space must be limited, otherwise the problem cannot be solved. For search problems, the first step is to clarify the solution space so that you can search within the solution space. This technique is not only applicable to the binary method, but can be used as long as it is a search problem, such as DFS, BFS, and backtracking. It's just that for the dichotomy, it is more important to clarify the solution space. It doesn't matter if you don't understand this sentence yet, maybe you will understand it after reading this article.

One principle when defining the solution space is: it can be large but not small. Because if the solution space is too large (as long as it is not infinite), it is nothing more than doing a few more operations, and if the solution space is too small, the correct solution may be missed, resulting in incorrect results. For example, I mentioned earlier to find the square root of X. Of course, we can define the solution space smaller, for example, as [1, x/2], which can reduce the number of operations. However, if the setting is too small, the correct solution may be missed. This is one of the easy points for novices to make mistakes.

Some classmates may say that I can't tell what to do. I think it doesn't matter if you are really not sure. For example, if you find the square root of x, you can even set it to [1,x]. Just let it do a few more operations. I suggest you **set a wide range for the upper and lower boundaries**. After you gradually understand the two points, you can...the card is a little bit deadlier...

### Orderly sequence

I am talking about sequences here, not arrays, linked lists, etc. In other words, the binary method usually requires an ordered sequence, not necessarily an array, a linked list, or other data structures. In addition, some **Orderly sequence** topics are directly mentioned, which will be easier. While some are hidden in the title information. At first glance, the title does not have the keyword "Order", but order is actually hidden between the lines. For example, the title gives the array nums, and does not limit nums to be ordered, but restricts nums to be non-negative. In this way, if you prefix nums with and or prefix or (bit operation or), you can get an ordered sequence.

> More skills are expanded in the four application sections.

Although the binary method does not mean that the sequence needs to be ordered, most binary topics have the distinctive feature of being ordered. It's just：

-Some topics directly limit the order. This kind of topic is usually not difficult, and it is easy to think of using two points. -Some require you to construct an ordered sequence by yourself. This type of topic is usually not difficult, and requires everyone to have a certain ability to observe.

For example, [Triple Inversion](https://binarysearch.com/problems/Triple-Inversion "Triple Inversion"). The title description is as follows：

```
Given a list of integers nums, return the number of pairs i < j such that nums[i] > nums[j] * 3.

Constraints： n ≤ 100,000 where n is the length of nums
Example 1
Input：
nums = [7, 1, 2]
Output：
2
Explanation：
We have the pairs (7, 1) and (7, 2)

```

This question does not limit that the array nums is ordered, but we can construct an ordered sequence d, and then do a binary on D. code：

```py
class Solution:
def solve(self, A):
d = []
ans = 0

for a in A:
i = bisect. bisect_right(d, a * 3)
ans += len(d) - i
bisect. insort(d, a)
return ans
```

It doesn't matter if you don't understand the code for the time being. Let's leave an impression first and know that there is such a type of question. You can go back to this question after reading all the contents of this chapter (the next two articles).

### Extreme value

Similar to me in [Heap topic](https://lucifer . ren/blog/2020/12/26/ heap/ "heap topic") The extreme value mentioned. It's just that the extremes here are **static**, not dynamic. The extreme value here usually refers to the k-th largest (or k-th smallest) number. \*\*

A very important use of heaps is to find the k-th largest number, and the binary method can also find the k-th largest number, but the ideas of the two are completely different. I have explained in detail the idea of using heaps to find the kth largest heap in the heaps topic mentioned earlier. What about the two points? Here we use an example to feel it: This question is [Kth Pair Distance](https://binarysearch.com/problems/Kth-Pair-Distance "Kth Pair Distance"), the title description is as follows：

```
Given a list of integers nums and an integer k, return the k-th (0-indexed) smallest abs(x - y) for every pair of elements (x, y) in nums. Note that (x, y) and (y, x) are considered the same pair.

Constraints:n ≤ 100,000 where n is the length of nums
Example 1
Input:
nums = [1, 5, 3, 2]
k = 3
Output:
2
Explanation:

Here are all the pair distances:

abs(1 - 5) = 4
abs(1 - 3) = 2
abs(1 - 2) = 1
abs(5 - 3) = 2
abs(5 - 2) = 3
abs(3 - 2) = 1

Sorted in ascending order we have [1, 1, 2, 2, 3, 4].
```

In simple terms, the title is to give an array of nums, which allows you to find the absolute value of the difference between any two numbers with the kth largest nums. Of course, we can use heaps to do it, but the time complexity of using heaps will be very high, making it impossible to pass all test cases. We can use the binary method to reduce the dimension of this question.

For this question, the solution space is the difference from 0 to the maximum and minimum values in the array nums, which is expressed in intervals as [0, max(nums)-min(nums)]. After we have a clear understanding of the space, we need to divide the solution space. For this question, you can choose the intermediate value mid of the current solution space, and then calculate the absolute value of the difference between any two numbers that are less than or equal to this intermediate value. There are several. We might as well make this number X.

-If x is greater than k, then the number greater than or equal to mid in the solution space cannot be the answer, so it can be discarded. -If x is less than k, then the numbers in the solution space that are less than or equal to mid cannot be the answer, so they can be discarded. -If x is equal to k, then mid is the answer.

Based on this, we can use two points to solve it. This kind of question type, I summarize it as **Counting two points**. I will focus on the four major application parts later.

code：

```py

class Solution:
def solve(self, A, k):
A. sort()
def count_not_greater(diff):
i = ans = 0
for j in range(1, len(A)):
while A[j] - A[i] > diff:
i += 1
ans += j - i
return ans
l, r = 0, A[-1] - A[0]

while l <= r:
mid = (l + r) // 2
if count_not_greater(mid) > k:
r = mid - 1
else:
l = mid + 1
return l
```

It doesn't matter if you don't understand the code for the time being. Let's leave an impression first and know that there is such a type of question. You can go back to this question after reading all the contents of this chapter (the next two articles).

## A center

Everyone must remember the center of the dichotomy. Others (such as orderly sequence, left and right pointers) are the hands and feet of the binary method. They are all appearances, not essences, and half-fold is the soul of the binary method.

The concept of space has been clearly understood by everyone earlier. And the halving here is actually the halving of the solution space.

For example, at the beginning, the solution space is [1, n](n is an integer greater than n). By **Some way**, we are sure that the [1, m] interval** cannot be the answer**. Then the solution space becomes (m, n), and the solution space becomes trivial (directly solvable) after continuing this process.

> Note that the left side of the interval (m,n] is open, which means that m is impossible to get.

Obviously, the difficulty of halving is **Which step part to abandon according to what conditions**. There are two keywords here:

1. What conditions
2. Which part to abandon

The difficulties of almost all bisections are on these two points. If these two points are clarified, almost all binary problems can be solved. Fortunately, the answers to these two questions are usually limited, and the questions are often those that are investigated. This is actually the so-called question-making routine. Regarding these routines, I will introduce them in detail in the next four application sections.

## Two-way summary of the previous article

The previous article is mainly to show you a few concepts. These concepts are extremely important for problem solving, so please be sure to master them. Next, I explained the center of the binary method-half fold. This center requires everyone to put any binary in their minds.

If I were to summarize the binary method in one sentence, I would say that the binary method is an algorithm that makes the unknown world inorganic. That is, we can abandon half of the solution in any case of the binary method, that is, we can cut the solution space in half in any case. The difficulty is the two points mentioned above: **What conditions** and **Which part to abandon**. This is the problem to be solved at the core of the dichotomy.

The above are all the contents of "Two-part Topic (Part 1)". If you find the article useful, please like and leave a message to forward it, so that I will be motivated to continue with the next episode.

## Preview of the next episode

The previous episode introduced the basic concepts. In the next episode, we will introduce the two types of bisections and the applications of the four bisections.

Table of Contents for the next episode：

-Two types

-Insert leftmost

-Insert on the far right

-Four major applications

-Ability to detect two points

-Prefix and binary

-Insertion sort (not the insertion sort you understand)

-Count two points

The main solutions of the two types (leftmost and rightmost insertion) are: ** The solution space has been clarified, how to use the code to find the specific solution**.

The four major applications mainly solve: ** How to construct the solution space**. More often, it is how to construct an ordered sequence.

These two parts are very practical content. While understanding the content of these two parts, please keep in mind one center. Half off. Then I'll see you in the next chapter~
