# I have almost finished brushing all the piles of questions, and I found these things. 。 。 (Second bullet)

## A little digression

Last time I did a small survey for everyone on my public account, "Vote for the programming language you want to solve~". The following are the results of the survey：

![Voting results](https://p.ipic.vip/j4yrg2.jpg)

Regarding others, most of them are in the Go language.

![What did the other people who voted for write?](https://p.ipic.vip/fe8utj.jpg)

Since the proportion of Java and Python has exceeded 60%, this time I will try to write in both Java and Python. Thank you @ CaptainZ for providing the Java code. At the same time, in order to prevent the article from being stinky and long, I put all the code (Java and Python) of this article in Java on the official website of Likujiajia\*\*, website address:https://leetcode-solution.cn/solution-code

> If you don't surf the Internet scientifically, it may be very slow to open.

## Body

![](https://p.ipic.vip/4r5oeh.jpg)

Hello everyone, this is lucifer. What I bring to you today is the topic of "Heap". Let's start with the outline of this article. This is a brain map drawn by me with mindmap. After that, I will continue to improve it and gradually improve other topics.

> You can also use vscode blink-mind to open the source file to view. There are some notes in it that you can click to view. The source file can be obtained by replying to the brain map on my official account "Force Buckle Plus", and the brain map will continue to be updated with more content in the future. vscode plug-in address:https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

This series contains the following topics：

-[I have almost finished swiping all the linked topics of Lixu, and I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/08/linked-list/) -[After almost brushing all the tree questions of Li Buckle, I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/23/tree/) -[After almost brushing all the piles of questions, I found these things. 。 。 (First bullet)](https://lucifer . ren/blog/2020/12/26/heap/)

<! -- more -->

This time it is the next article. Students who have not read the previous article strongly recommend reading the previous article first. [After almost brushing all the piles of questions, I found these things. 。 。 (First bullet)](https://lucifer . ren/blog/2020/12/26/heap/)

This is the second part, and the content later is more dry goods, namely **Three techniques** and **Four major applications**. These two topics are dedicated to teaching you how to solve problems. After mastering it, most of the heap topics in Lixu are not a cinch (of course, I only refer to the part of the heap that is involved in the topic).

Warning: The topics in this chapter are basically of hard difficulty. This is because many of the topics in this chapter are not difficult to mark. This point has also been introduced earlier.

## A little explanation

Before serving the main course, I will give you an appetizer.

Here are two concepts to introduce to you, namely **tuple** and **Simulation big top heap**. The reason for these instructions is to prevent everyone from not understanding them later.

### Tuple

Using the heap, you can not only store a single value. For example, 1, 2, 3, and 4 of [1, 2, 3, 4] are all single values. In addition to single values, composite values, such as objects or tuples, can also be stored.

Here we introduce a way to store tuples. This technique will be widely used later. Please be sure to master it. For example [(1,2,3), (4,5,6), (2,1,3),(4,2,8)]。

```py
h = [(1,2,3), (4,5,6), (2,1,3),(4,2,8)]
heapq. heappify(h) # heappify(small top heap)

heapq. heappop() #Pop up(1,2,3)
heapq. heappop() #Pop up(2,1,3)
heapq. heappop() #Pop up(4,2,8)
heapq. heappop() #Pop up(4,5,6)
```

Using a diagram to represent the heap structure is as follows：

![Use a small top heap of tuples](https://p.ipic.vip/wioiow.jpg)

Briefly explain the execution result of the above code.

Using tuples, the first value of the tuple is compared as a key by default. If the first one is the same, continue to compare the second one. For example, the above (4,5,6) and (4,2,8), since the first value is the same, continue to compare the latter one, and because 5 is larger than 2, (4,2,8) comes out of the heap first.

Using this technique has two effects：

1. Carry some additional information. For example, if I want to find the kth decimal number in a two-dimensional matrix, of course, the value is used as the key. However, the processing process also needs to use its row and column information, so it is appropriate to use tuples, such as (val, row, col).

2. I want to sort according to two keys, one primary key and one secondary key. There are two typical usages here，

2.1 One is that both are in the same order, for example, both are in order or both are in reverse order.

2.2 The other is to sort in two different orders, that is, one is in reverse order and the other is in order.

Due to the length of the question, the details will not be discussed here. You can pay attention to it during the usual question-making process. If you have the opportunity, I will open a separate article to explain.

> If the programming language you are using does not have a heap or the implementation of the heap does not support tuples, then you can also make it support by simple transformation, mainly by customizing the comparison logic.

### Simulate the big top pile

Since Python does not have a big top heap. Therefore, I used a small top heap for simulation implementation here. I am about to take all the original numbers to the opposite number. For example, if the original number is 5, -5 will be added to the pile. After this treatment, the small top pile can be used as a large top pile. However, it should be noted that when you pop it out, \*\* Remember to reverse it and restore it back.

Code example：

```py
h = []
A = [1,2,3,4,5]
for a in A:
heapq. heappush(h, -a)
-1 * heapq. heappop(h) # 5
-1 * heapq. heappop(h) # 4
-1 * heapq. heappop(h) # 3
-1 * heapq. heappop(h) # 2
-1 * heapq. heappop(h) # 1
```

It is shown in the figure as follows：

![Small top pile simulates big top pile](https://p.ipic.vip/226haf.jpg)

That's it for laying the groundwork, and then we will get to the point.

## Three skills

### Technique 1-Fixed Heap

This technique refers to fixing the size of the heap k unchanged, which can be achieved in the code by pushing one in every time one pops out. And since the initial heap may be 0, we just need to push into the heap one by one at the beginning to achieve the size of the heap is k, so strictly speaking, it should be ** To maintain that the size of the heap is not greater than k**.

A typical application of a fixed heap is to find the k-th smallest number. In fact, the simplest way to find the kth smallest number is to build a small top heap, put all the numbers into the heap first, and then out of the heap one by one, a total of k times. The last time it came out of the pile was the kth smallest number.

However, we don't need to put them all into the heap first, but build a large top heap (note that it is not the small top heap above), and maintain the size of the heap at k. If the size of the heap is greater than k after the new number is added to the heap, you need to compare the number at the top of the heap with the new number, and remove the larger number. This guarantees that the number in the heap is the smallest k of all numbers, and the largest of the smallest k (that is, the top of the heap) is not the kth smallest? This is the reason for choosing to build a large top stack instead of a small top stack.

![Fix the 5th smallest number on the big top stack](https://p.ipic.vip/okcn10.jpg)

The summary in a simple sentence is that \*\* Fixing a large top heap of size k can quickly find the k-th smallest number, on the contrary, fixing a small top heap of size k can quickly find the k-th largest number. For example, the third question of the weekly competition on 2020-02-24 [5663. Find the kth largest XOR coordinate value](https://leetcode-cn.com/problems/find-kth-largest-xor-coordinate-value /"5663. Find out the kth largest XOR coordinate value") You can use the fixed small top heap technique to achieve it (this question allows you to find the kth largest number).

So maybe your feelings are not strong. Next, I will give you two examples to help you deepen your impression.

#### 295. The median of the data stream

##### Title description

```
The median is the number in the middle of an ordered list. If the length of the list is even, the median is the average of the two numbers in the middle.

For example，

The median of [2,3,4] is 3

The median of [2,3] is (2 + 3) / 2 = 2.5

Design a data structure that supports the following two operations：

Void addNum (int num)-add an integer from the data stream to the data structure.
Double findMedian()-returns the median of all current elements.
example：

addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3)
findMedian() -> 2
Advanced:

If all the integers in the data stream are in the range of 0 to 100, how would you optimize your algorithm?
If 99% of the integers in the data stream are in the range of 0 to 100, how would you optimize your algorithm?
```

##### Idea

This question can actually be seen as a special case of finding the k-th smallest number.

-If the length of the list is odd, then k is (n + 1) / 2, and the median is the kth number. For example, n is 5 and k is (5 + 1)/ 2 = 3。 -If the length of the list is even, then k is (n +1) / 2 and (n +1) / 2 + 1, and the median is the average of these two numbers. For example, n is 6, and k is (6 +1)/2 = 3 and (6 + 1) / 2 + 1 = 4。

Thus we can maintain two fixed heap, fixed stack size is $(n + 1) \div 2$ and $n - (n + 1)\div2$, that is, both the size of the heap**up**a difference of 1, and more specifically that $ 0 <= (n + 1) \div 2 - (n - (n + 1) \div 2) <= 1$。

Based on the knowledge mentioned above, we can：

-Build a large top heap and store the smallest number of $(n +1) \div 2$, so that the number at the top of the heap is the smallest number of $(n +1) \div 2$, which is the median in odd cases. -Build a small top heap and store the largest number of n- $(n +1) \div 2$, so that the number at the top of the heap is the largest number of n- $(n +1) \div 2$, combined with the large top heap above, the median of even cases can be obtained.

With such knowledge, all that remains is how to maintain the size of the two heaps.

-If the number of large top piles is smaller than that of small top piles, then transfer the smallest of the small top piles to the large top piles. And since the small top stack maintains the largest number of k, and the large top stack maintains the smallest number of k, the top of the small top stack must be greater than or equal to the top of the large top stack, and the two top stacks are the median of **\***. -If the number of large top piles is 2 more than the number of small top piles, then the largest of the large top piles will be transferred to the small top piles. The reason is the same as above.

At this point, you may have understood why two heaps are built separately, and you need a large top heaps and a small top heaps. The reason for this is as described above.

The common application of fixed heaps is more than that. Let's continue to look at a topic.

##### Code

```py
class MedianFinder:
def __init__(self):
self. min_heap = []
self. max_heap = []
def addNum(self, num: int) -> None:
if not self. max_heap or num < -self. max_heap[0]:
heapq. heappush(self. max_heap, -num)
else:
heapq. heappush(self. min_heap, num)
if len(self. max_heap) > len(self. min_heap) + 1:
heappush(self. min_heap, -heappop(self. max_heap))
elif len(self. min_heap) > len(self. max_heap):
heappush(self. max_heap, -heappop(self. min_heap))
def findMedian(self) -> float:
if len(self. min_heap) == len(self. max_heap): return (self. min_heap[0] - self. max_heap[0]) / 2
return -self. max_heap[0]
```

(Code 1.3.1)

#### 857. The lowest cost of hiring K workers

##### Title description

```
There are N workers. The i-th worker's work quality is quality[i], and his minimum expected salary is wage[i].

Now we want to hire K workers to form a wage group. When hiring a group of K workers, we must pay them wages in accordance with the following rules：

For each worker in the wage group, wages shall be paid in proportion to the quality of their work and the quality of other workers in the same group.
Every worker in the wage group should receive at least their minimum expected salary.
Return how much it costs to form a salary group that meets the above conditions.



Example 1：

Input: quality = [10,20,5], wage = [70,50,30], K = 2
Output: 105.00000
Explanation: We pay 70 to Worker No. 0 and 35 to worker No. 2.
Example 2：

Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], K = 3
Output: 30.66667
Explanation: We pay 4 to worker No. 0 and 13.33333 to Worker No. 2 and Worker No. 3 respectively.


prompt：

1 <= K <=N<=10000, where N=quality. length = wage. length
1 <= quality[i] <= 10000
1 <= wage[i] <= 10000
Answers with an error of within 10^-5 from the correct answer will be considered correct.

```

##### Idea

The topic requires us to choose k individuals to pay wages in proportion to the quality of their work and the quality of work of other workers in the same group, and each worker in the wage group should receive at least their minimum expected salary.

In other words, the quality of work and salary ratio of k individuals in the same group are a fixed value to make the minimum salary paid. Please understand this sentence first. The following content is based on this premise.

We might as well set an indicator ** work efficiency**, the value of which is equal to q/W. As mentioned earlier, the q /w of these k people is the same in order to guarantee the minimum salary, and this q /w must be the lowest (short board) of these k people, otherwise there will be people who will not get the minimum expected salary.

So we can write the following code：

```py
class Solution:
def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:
eff = [(q / w, q, w) for a, b in zip(quality, wage)]
eff. sort(key=lambda a: -a[0])
ans = float('inf')
for i in range(K-1, len(eff)):
h = []
k = K - 1
rate, _, total = eff[i]
# Find out the k people whose work efficiency is higher than it, and the salary of these k people is as low as possible.
# Since the work efficiency has been arranged in reverse order, the previous ones are all higher than it, and then you can get the k lowest wages by using the heap.
for j in range(i):
heapq. heappush(h, eff[j][1] / rate)
while k > 0:
total += heapq. heappop(h)
k -= 1
ans = min(ans, total)
return ans
```

(Code 1.3.2)

This approach pushes a lot every time and pops k times. It does not make good use of the **dynamic** characteristics of the heap, but only takes advantage of its ** extreme value** characteristics.

A better practice is to use the fixed heap technique.

This question can be thought of from a different perspective. In fact, isn't this question asking us to choose k people, take the lowest work efficiency ratio among them, and calculate the total salary based on this lowest work efficiency, and find the lowest total salary? Therefore, this question can fix a large top pile with a size of K. Through certain operations, it is guaranteed that the top pile is the kth smallest (the operation is similar to the previous question).

And in the previous solution, triples (q /w, q, w) are also used, which is actually not necessary. Because two of them are known, the other one can be derived, so it is enough to store two, and because we need to compare the keys of the heap according to the work efficiency, we can choose any q or W. Here I chose q, which is to store the binary group (q/2, q).

Specifically, it is: the total salary of k individuals with rate as the lowest work efficiency ratio = $\displaystyle\sum_{n=1}^{k}{q}_{n}/rate$, where the rate is the current q/w, and it is also the minimum value of k individuals' q/W.

##### Code

```py
class Solution:
def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:
effs = [(q / w, q) for q, w in zip(quality, wage)]
effs. sort(key=lambda a: -a[0])
ans = float('inf')
h = []
total = 0
for rate, q in effs:
heapq. heappush(h, -q)
total += q
if len(h) > K:
total += heapq. heappop(h)
if len(h) == K:
ans = min(ans, total / rate)
return ans
```

(Code 1.3.3)

### Technique 2-Multiple Mergers

This technique was actually mentioned earlier when talking about super ugly numbers, but it didn't give this type of topic a name.

In fact, this technique may be more appropriate to be called multi-pointer optimization, but the name is too simple and easy to confuse with double pointers, so I gave ta a chic name-Multi-channel merge.

-Multiple routes are reflected in: there are multiple candidate routes. In the code, we can use multiple pointers to represent it. -The merger is reflected in: the result may be the longest or shortest of multiple candidate routes, or it may be the kth, etc. Therefore, we need to compare the results of multiple routes, and discard or select one or more routes according to the topic description.

This description is more abstract. Next, let's deepen everyone's understanding through a few examples.

Here I have carefully prepared four questions with a difficulty of hard\*\* for everyone. After mastering this routine, you can answer these four questions happily.

#### 1439. The k-th smallest array in an ordered matrix and

##### Title description

```
Give you a matrix mat of m*n, and an integer K. Each row in the matrix is arranged in a non-decreasing order.

You can select 1 element from each row to form an array. Returns the kth smallest array sum of all possible arrays.



Example 1：

Input: mat = [[1,3,11],[2,4,6]], k = 5
Output: 7
Explanation: Select an element from each row, the first k and smallest arrays are：
[1,2], [1,4], [3,2], [3,4], [1,6]。 The sum of the 5th one is 7.
Example 2：

Input: mat = [[1,3,11],[2,4,6]], k = 9
Output: 17
Example 3：

Input: mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
Output: 9
Explanation: Select an element from each row, the first k and smallest arrays are：
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]。 The sum of the 7th one is 9.
Example 4：

Input: mat = [[1,1,10],[2,2,9]], k = 7
Output: 12


prompt：

m == mat. length
n == mat. length[i]
1 <= m, n <= 40
1 <= k <= min(200, n ^ m)
1 <= mat[i][j] <= 5000
mat[i] is a non-decreasing array

```

##### Idea

In fact, this question is to give you m one-dimensional arrays of the same length. Let us select a number from these m arrays, that is, select a total of m numbers, and find that the sum of these m numbers is The kth smallest among all selection possibilities.

![](https://p.ipic.vip/xi03t7.jpg)

A simple idea is to use multiple pointers to solve. For this question, it is to use m pointers to point to m one-dimensional arrays. The position of the pointers indicates that the first few in the one-dimensional array are currently selected.

Take the'mat in the title = [[1,3,11],[2,4,6]], Take k = 5` as an example.

-First initialize two pointers p1 and p2, which point to the beginning of two one-dimensional arrays. The code indicates that they are all initialized to 0. -At this time, the sum of the numbers pointed to by the two pointers is 1 + 2 = 3, which is the first smallest sum. -Next, we move one of the pointers. At this time, we can move p1 or p2. -Then the second smallest value must be the smaller value of the two cases of moving p1 and moving p2. And here moving p1 and p2 will actually get 5, which means that the sum of the second and third small ones is 5.

It has been forked here, and two situations have occurred (pay attention to the bold position, the bold indicates the position of the pointer)：

1. [1,**3**,11],[**2**,4,6] Sum to 5
2. [**1**,3,11],[2,**4**,6] Sum to 5

Next, these two situations should go hand in hand and proceed together.

For Case 1, there are two more cases of moving next.

1. [1,3,**11**],[**2**,4,6] Sum to 13
2. [1,**3**,11],[2,**4**,6] Sum to 7

For Case 2, there are also two cases of moving next.

1. [1,**3**,11],[2,**4**,6] Sum to 7
2. [**1**,3,11],[2,4,**6**] Sum to 7
