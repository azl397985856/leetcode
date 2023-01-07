# How do I use the ** Greatest common divisor** spike algorithm problem

There is a special study on the greatest common divisor. Although in LeetCode, there is no problem that directly allows you to solve the greatest common divisor. But there are some problems that indirectly require you to solve the greatest common divisor.

For example：

- [914. Card grouping](https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/solution/python3-zui-da-gong-yue-shu-914-qia-pai-fen-zu-by -/ "914. Card grouping")
- [365. Kettle problem) (https://leetcode-cn.com/problems/water-and-jug-problem/solution/bfszui-da-gong-yue-shu-by-fe-lucifer /"365. Kettle problem")
- [1071. The greatest common factor of a string](https://leetcode-cn.com/problems/greatest-common-divisor-of-strings/solution/1071-zi-fu-chuan-de-zui-da-gong-yin-zi-zui-da-gong / "1071. The greatest common factor of the string")

Therefore, how to solve the greatest common divisor is important.

## How to find the greatest common divisor?

### Definition method

```python
def GCD(a: int, b: int) -> int:
smaller = min(a, b)
while smaller:
if a % smaller == 0 and b % smaller == 0:
return smaller
smaller -= 1
```

**Complexity analysis**

-Time complexity: The best case scenario is to execute a loop body, and the worst case scenario is to loop to a smaller of 1, so the total time complexity is $O(N)$, where N is the smaller number in a and B. -Spatial complexity:$O(1)$.

### Tossing and dividing

If we need to calculate the greatest common divisor of a and b, use the tossing and turning division method. First, we first calculate the remainder c of a divided by b, and transform the problem into the greatest common divisor of b and c; then calculate the remainder d of b divided by c, and transform the problem into the greatest common divisor of c and d; then calculate the remainder e of c divided by d, and transform the problem into the greatest common divisor of d and E. . . . . . And so on, gradually convert the operation between the two larger integers into the operation between the two smaller integers until the two numbers are divisible by.

```python
def GCD(a: int, b: int) -> int:
return a if b == 0 else GCD(b, a % b)
```

**Complexity analysis**

-Time complexity:$O(log(max(a,b)))$ -Spatial complexity: Spatial complexity depends on the depth of recursion, so the spatial complexity is $O(log(max(a, b)))$

### More phase derogation technique

If the tossing and turning division method is large when a and b are both large, the performance of a % b will be lower. In China, the "Nine Chapters of Arithmetic" mentions a kind of [more subtraction technique] similar to tossing and Turning Subtraction method (https://zh.wikisource.org/wiki/%E4%B9%9D%E7%AB%A0%E7%AE%97%E8%A1%93#-.7BA.7Czh-hans:.E5.8D.B7.3Bzh-hant:.E5.8D.B7.7D-.E7.AC.AC.E4.B8.80.E3.80.80.E6.96.B9.E7.94.B0.E4.BB.A5.E5.BE.A1.E7.94.B0.E7.96.87.E7.95.8C.E5.9F.9F "More derogatory technique"). Its principle is: `For two positive integers a and b (a>b), their greatest common divisor is equal to the difference c of a-b and the greatest common divisor of the smaller number B. `.

```python
def GCD(a: int, b: int) -> int:
if a == b:
return a
if a < b:
return GCD(b - a, a)
return GCD(a - b, b)
```

The above code will report a stack overflow. The reason is that if the difference between a and b is relatively large, the number of recursions will increase significantly, which is much greater than the recursion depth of tossing and dividing, and the worst time complexity is O(max(a, b))). At this time, we can combine the "tossing and turning division method" and the "more phase derogation technique", so that we can obtain better performance in various situations.

## Visualize and explain

Below we will give a graphic explanation of the above process. In fact, this is also the explanation method in the textbook. I just copied it and added my own understanding. Let's use an example to explain：

If we have a piece of land of 1680 meters \*640 meters, we want to talk about land divided into squares, and we want to make the side length of the square land as large as possible. How should we design the algorithm?

In fact, this is an application scenario for the greatest common divisor. Our goal is to solve the greatest common divisor of 1680 and 640.

![](https://p.ipic.vip/6ylclm.jpg)

Dividing 1680 meters\*640 meters of land is equivalent to dividing 400 meters\*640 meters of land. Why? If the side length of a square divided by 400 meters\*640 meters is x, then there is 640% x==0, then it will definitely satisfy the remaining two pieces of 640 meters\*640 meters.

![](https://p.ipic.vip/k1j1uf.jpg)

We continue to divide the above：

![](https://p.ipic.vip/djdnpp.jpg)

Until the side length is 80, there is no need to proceed.

![](https://p.ipic.vip/hveyzl.jpg)

## Instance analysis

### Title description

```
To give you three numbers a, b, and c, you need to find the value of the nth ordered sequence (n starts from 0). This ordered sequence is composed of integer multiples of a, b, and C.

For example：
n = 8
a = 2
b = 5
c = 7

Since the ordered sequence composed of integer multiples of 2, 5, and 7 is [1, 2, 4, 5, 6, 7, 8, 10, 12, . . . ], so we need to return 12.

Note: We agree that the first of the ordered sequence will always be 1.
```

### Idea

You can go through [this website](https://binarysearch.com/problems/Divisible-Numbers "binary search") Online verification.

A simple idea is to use a heap to do it. The only thing to pay attention to is the deletions. We can use a hash table to record the numbers that have appeared in order to achieve the purpose of deletions.

code：

```py
ss Solution:
def solve(self, n, a, b, c):
seen = set()
h = [(a, a, 1), (b, b, 1), (c, c, 1)]
heapq. heapify(h)

while True:
cur, base, times = heapq. heappop(h)
if cur not in seen:
n -= 1
seen. add(cur)
if n == 0:
return cur
heapq. heappush(h, (base * (times + 1), base, times + 1))
```

If you don't understand this solution, you can first take a look at what I wrote before [After almost brushing all the piles of questions, I found these things. 。 。 (Second bullet)](https://lucifer . ren/blog/2021/01/19/ heap-2/ "I have almost finished brushing all the piles of questions, and I found these things. 。 。 (Second bullet)")

However, the time complexity of this approach is too high. Is there a better approach?

In fact, we can divide the search space. First think about a problem. If a number x is given, there are several values less than or equal to x in an ordered sequence.

Is the answer x// a + x// b + x// c?

> / / Is the floor except

Unfortunately, it is not. For example, a= 2, b= 4, n= 4, the answer is obviously not 4 // 2 + 4 // 4 = 3， But 2. The reason for the error here is that 4 is calculated twice, one time it is $2 * 2 = 4$, and the other time it is $4 * 1 = 4$.

In order to solve this problem, we can use the knowledge of set theory.

Gather a little bit of knowledge：

-If the set of values in the ordered sequence that are less than or equal to x can be divisible by x and are multiples of A is SA, the size of the set is A -If the set of values in the ordered sequence that are less than or equal to x can be divisible by x and are multiples of B is SB, the size of the set is B -If the set of values in an ordered sequence that are less than or equal to x that can be divisible by x and are multiples of C is SC, the size of the set is C

Then the final answer is the number of numbers in the large set (which needs to be duplicated) composed of SA, SB, and SC, that is,：

$$
A + B + C - sizeof(SA \cap SB) - sizeof(SB \cap SC) - sizeof(SA \cap SC) + sizeof(SA \cap SB \cap SC)
$$

The question is transformed into how to find the number of intersections of sets A and B?

> The method of finding the intersection of A and B, B and C, A and C, and even A, B, and C is the same.

In fact, the number of intersections of SA and SB is x//lcm(A, B), where lcm is the least common multiple of A and B. The least common multiple can be calculated by the greatest common divisor：

```py
def lcm(x, y):
return x * y // gcd(x, y)

```

The next step is the two-part routine. If you can't understand the two-part part, please take a look at my [two-part topic](https://github.com/azl397985856/leetcode/blob/master/91/binary-search.md "Two-part special").

### Code (Python3)

```py
class Solution:
def solve(self, n, a, b, c):
def gcd(x, y):
if y == 0:
return x
return gcd(y, x % y)

def lcm(x, y):
return x * y // gcd(x, y)

def possible(mid):
return (mid // a + mid // b + mid // c - mid // lcm(a, b) - mid // lcm(b, c) - mid // lcm(a, c) + mid // lcm(a, lcm(b, c))) >= n

l, r = 1, n * max(a, b, c)
while l <= r:
mid = (l + r) // 2
if possible(mid):
r = mid - 1
else:
l = mid + 1
return l

```

**Complexity analysis**

-Time complexity:$logn$. -Spatial complexity: The depth of the recursive tree of gcd and lcm is basically negligible.

## Summary

Through this article, we not only understand the concept of the greatest common divisor and the method of finding it. It also visually perceives the **principle** of the calculation of the greatest common divisor. The greatest common divisor and the least common multiple are two similar concepts. There are not many questions about the greatest common divisor and the least common multiple in Li Buckle. You can find these questions through the Mathematics tab. For more information about mathematics knowledge in algorithms, you can refer to this article [Summary of mathematics test points necessary for brushing algorithm questions](https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247485590&idx=1&sn=e3f13aa02fed4d4132146e193eb17cdb&chksm=eb88c48fdcff4d99b44d537459396589b8987f89a8c21085a945ca8d5e2b0b140c13aef81d91&token=1223087516&lang=zh_CN#rd "Summary of math test points necessary for brushing algorithm questions")

> The second part of this article will also be released soon.
