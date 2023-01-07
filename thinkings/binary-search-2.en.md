# I have almost finished brushing all the two-point questions of Lixiu, and I found these things. 。 。 (Part 2)

## Foreword

Hello everyone, this is lucifer. What I bring to you today is the topic of "Two Points". Let's start with the outline of this article. This is a brain map drawn by me with mindmap. After that, I will continue to improve it and gradually improve other topics.

> You can also use vscode blink-mind to open the source file to view. There are some notes in it that you can click to view. The source file can be obtained by replying to the brain map on my official account "Force Buckle Plus", and the brain map will continue to be updated with more content in the future. vscode plug-in address:https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

![](https://p.ipic.vip/wir7q1.jpg)

This series contains the following topics：

-[I have almost finished swiping all the linked topics of Lixu, and I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/08/linked-list/) -[After almost brushing all the tree questions of Li Buckle, I found these things. 。 。 ](https://lucifer. ren/blog/2020/11/23/tree/) -[After almost brushing all the piles of questions, I found these things. 。 。 (Part 1))(https://lucifer . ren/blog/2020/12/26/heap/) -[After almost brushing all the piles of questions, I found these things. 。 。 (Part 2))(https://lucifer . ren/blog/2021/01/19/heap-2/) -[After almost brushing all the two-point questions of Li Buckle, I found these things. 。 。 (Part 1))(https://lucifer . ren/blog/2021/03/08/binary-search-1/)

<! -- more -->

This topic is expected to be divided into two parts. The previous section mainly described the basic concepts and a center. In this section, we will continue to learn ** Two binary types** and **Four major applications**. If you haven't read the previous article, it is recommended to take a look at the previous article first. The address is above.

> If you find the article useful, please like and leave a message to forward it, so that I can continue to do it.

## Previous review

The previous article is mainly to show you a few concepts. These concepts are extremely important for problem solving, so please be sure to master them. Next, I explained the center of the binary method-half fold. This center requires everyone to put any binary in their minds.

The essence of the binary method, as mentioned at the beginning, the binary method is an algorithm that makes the unknown world inorganic. Regardless of the binary method, we can abandon half of the solution, that is, we can cut the solution space in half anyway. The difficulty is the two points mentioned above: **What conditions** and **Which part to abandon**.

Next, we will continue to the next article. The main content of the next note is two types and four major applications.

The main solutions of the two types are: my solution space for this question has been clarified, and how to use the code to find specific values. The four major applications mainly solve: how to construct the solution space (in more cases, how to construct an ordered sequence) and some variants.

These two parts are very practical content. Here I remind everyone that while understanding the contents of these two parts, please keep in mind one center.

## Two types

### Problem Definition

> The definition of the problem here is a narrow problem. And if you understand this problem, you can generalize this specific problem to adapt to more complex problems. Regarding promotion, we will talk about it later.

Given an ordered array of numbers nums, and give you a number target. Ask if there is a target in nums. If it exists, its index in nums is returned. If it does not exist, -1 is returned.

This is the simplest form of binary lookup. Of course, binary search also has many deformations. This is also the reason why binary search is prone to errors and difficult to grasp.

Common variants are：

-If there are multiple elements that meet the condition, return the index of the leftmost element that meets the condition. -If there are multiple elements that meet the condition, return the index of the rightmost element that meets the condition. -The array is not ordered as a whole. For example, ascending order first and then descending order, or descending order first and then ascending order. -Turn a one-dimensional array into a two-dimensional array. -. 。 。

Next, we will check it one by one.

### Premise

-The array is ordered (if it is unordered, we can also consider sorting, but pay attention to the complexity of sorting)

> This ordered array may be given directly by the topic, or it may be constructed by yourself. For example, if you find the inverse number of an array, you can do a binary on the ordered sequence you construct.

### Term

For the convenience of describing the problem later, it is necessary to introduce some conventions and terms.

Terms used in binary search：

-target-- the value to be found -index--current location -l and r-left and right pointers -mid--the midpoint of the left and right pointers, which is used to determine the index we should look to the left or the right (in fact, it is to shrink the solution space)

![Term illustration](https://p.ipic.vip/6qylgw.jpg)

It is worth noting that, except that the target is fixed, everything else changes dynamically. Where l and r refer to the upper and lower boundaries of the solution space, mid is the intermediate value of the upper and lower boundaries, and index is the traversal pointer, which is used to control the traversal process.

### Find a number

We have defined the problem earlier. Next, we need to analyze and solve the defined problem.

In order to better understand the next content, we solve the simplest type -** to find a specific value**.

Algorithm description：

-Start with the intermediate element of the array. If the intermediate element happens to be the element to be found, the search process ends.； -If the target element is greater than the intermediate element, then the values in the array that are smaller than the intermediate element can be excluded (since the array is ordered, it is equivalent to excluding all values on the left side of the array), and the solution space can be shrunk to [mid+1, r]. -If the target element is less than the intermediate element, then the values in the array that are greater than the intermediate element can be excluded (since the array is ordered, it is equivalent to excluding all values on the right side of the array), and the solution space can be shrunk to [l, mid-1]. -If the solution space is empty at a certain step, it means that it cannot be found.

Give a specific example to facilitate everyone to increase their sense of substitution. Suppose nums is`[1,3,4,6,7,8,10,13,14]' and the target is 4·.

-The element in the middle of the array at the beginning is 7 -7> 4, since the numbers on the right side of 7 are all greater than 7, it is impossible to be the answer. We have shortened the range to the left side of 7.

![Adjust solution space](https://p.ipic.vip/nfci5c.jpg)

-The solution space becomes [1,3,4,6], at which time the intermediate element is 3. -3 < 4, since the numbers on the left of 3 are all less than 3, it is impossible to be the answer. We have shortened the range to the right side of 3.

![Adjust the solution space again](https://p.ipic.vip/vxm7rh.jpg)

-The solution space becomes [4,6]. At this time, the intermediate element is 4, which is exactly what we are looking for. Just return its index 2.

**Complexity analysis**

Since this search algorithm reduces the search scope by half every time it is compared, it is a typical binary search.

-Average time complexity: $O(logN)$ -Worst time complexity: $O(logN)$ -Spatial complexity -Iteration: $O(1)$ -Recursion: $O(logN)$(elimination of tailless calls)

> The complexity of the latter is similar, and I will not repeat them.

#### Thinking framework

How to convert the above algorithm into executable code that is easy to understand?

Don't underestimate such an algorithm. Even if it is such a simple and unpretentious binary search, there are great differences in what different people write. If there is no ** thinking framework to guide you, you may write code that varies greatly at different times. In this case, the chance of making mistakes will be greatly increased. Here is an introduction to a thinking framework and code template that I often use. **

**First define the solution space as [left, right], note that the left and right are closed, and this point will be used later**

> You can define other solution space forms, but the following code should be adjusted accordingly. If you are interested, you can try other solution spaces.

-Since the defined solution space is [left,right], when left <=right, the solution space is not empty. At this time, we all need to continue searching. In other words, the search condition should be left <=right.

> It's easy to understand for an example. For example, for the interval [4,4], it contains an element 4, so the solution space is not empty and we need to continue searching (imagine that 4 happens to be the target we are looking for. If we don't continue searching, we will miss the correct answer). And when the solution space is [left, right), also for [4,4], the solution space is empty at this time, because there are no numbers· in such an interval.

-In the cycle, we constantly calculate the mid and compare nums[mid] with the target value. -If nums[mid] is equal to the target value, mid is returned in advance (only need to find one that meets the conditions) -If nums[mid] is less than the target value, it means that the target value is on the right side of mid. At this time, the solution space can be reduced to [mid + 1, right](mid and the numbers on the left side of mid are excluded by us) -If nums[mid] is greater than the target value, it means that the target value is on the left side of mid. At this time, the solution space can be reduced to [left, mid-1](mid and the numbers on the right side of mid are excluded by us)

- If it is not found at the end of the loop, it means that it is not found, and a return of -1 means that it is not found.

#### Code template

##### Java

```java
public int binarySearch(int[] nums, int target) {
//The interval that is closed on the left and right [l, r]
int left = 0;
int right = nums. length - 1;

while(left <= right) {
int mid = left + (right - left) / 2;
if(nums[mid] == target)
return mid;
if (nums[mid] < target)
// Solution space becomes [mid+1, right]
left = mid + 1;
if (nums[mid] > target)
//Solution space becomes [left, mid-1]
right = mid - 1;
}
return -1;
}
```

##### Python

```py
def binarySearch(nums, target):
#The interval that is closed on the left and right [l, r]
l, r = 0, len(nums) - 1
while l <= r:
mid = (left + right) >> 1
if nums[mid] == target: return mid
# Solution space becomes [mid+1, right]
if nums[mid] < target: l = mid + 1
#Solution space becomes [left, mid-1]
if nums[mid] > target: r = mid - 1
return -1

```

##### JavaScript

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) return mid;
    if (nums[mid] < target)
      // Solution space becomes [mid+1, right]
      left = mid + 1;
    if (nums[mid] > target)
      //Solution space becomes [left, mid-1]
      right = mid - 1;
  }
  return -1;
}
```

##### C++

```cpp
int binarySearch(vector<int>& nums, int target){
if(nums. size() == 0)
return -1;

int left = 0, right = nums. size() - 1;
while(left <= right){
int mid = left + ((right - left) >> 1);
if(nums[mid] == target){ return mid; }
// Solution space becomes [mid+1, right]
else if(nums[mid] < target)
left = mid + 1;
//Solution space becomes [left, mid-1]
else
right = mid - 1;
}
return -1;
}
```

### Find the leftmost insertion position

Above we talked about `finding values that meet the conditions`. If it is not found, return -1. What if instead of returning -1, it returns the position where it should be inserted, so that the list is still in order after insertion?

For example, for an array nums: [1,3,4], the target is 2. The position where we should insert it (note that it is not really inserted) is the position of index 1, that is, [1,**2**,3,4]。 Therefore, `looking for the leftmost insertion position` should return 1, while `looking for the position that meets the condition` should return -1.

In addition, if there are multiple values that meet the conditions, we return the leftmost one. For example, for an array nums: [1,2,2,2,3,4], the target is 2, and the position we should insert is 1.

#### Thinking framework

Specific algorithm：

-First define the solution space as [left, right], note that the left and right are closed, and this point will be used later.

> You can define other solution space forms, but the following code should be adjusted accordingly. If you are interested, you can try other solution spaces.

-Since the solution space we define is [left,right], when left <=right, the solution space is not empty. In other words, our termination search condition is left <=right.

-When A[mid]>=x, it means that a spare tire is found. We make r=mid-1 to exclude mid from the solution space, and continue to see if there is a better spare tire. -When A[mid] < x, it means that mid is not the answer at all. Directly update l = mid+ 1 to exclude mid from the solution space. -Finally, the l that solves the space is the best spare tire, and the spare tire turns positive.

#### Code template

##### Python

```py
def bisect_left(nums, x):
# Built-in api
bisect. bisect_left(nums, x)
# Handwriting
l, r = 0, len(A) - 1
while l <= r:
mid = (l + r) // 2
if A[mid] >= x: r = mid - 1
else: l = mid + 1
return l
```

### Find the rightmost insertion position

#### Thinking framework

Specific algorithm：

-First define the solution space as [left, right], note that the left and right are closed, and this point will be used later.

> You can define other solution space forms, but the following code should be adjusted accordingly. If you are interested, you can try other solution spaces.

-Since the solution space we define is [left,right], when left <=right, the solution space is not empty. In other words, our termination search condition is left <=right.

-When A[mid]> x, it means that a spare tire is found. We make r= mid-1 to exclude mid from the solution space, and continue to see if there is a better spare tire. -When A[mid]<= x, it means that mid is not the answer at all. Directly update l= mid+ 1 to exclude mid from the solution space. -Finally, the l that solves the space is the best spare tire, and the spare tire turns positive.

#### Code template

##### Python

```py

def bisect_right(nums, x):
# Built-in api
bisect. bisect_right(nums, x)
# Handwriting
l, r = 0, len(A) - 1
while l <= r:
mid = (l + r) // 2
if A[mid] <= x: l = mid + 1
else: r = mid - 1
return l
```

The above are the basic forms of the two bisections. In the actual code writing process, I will not use the template to find the value that meets the conditions, but directly use the template to insert the leftmost value or the rightmost value. Why? Because the latter contains the former, and there are functions that the former cannot achieve. For example, if I want to implement ** to find a value that meets the conditions**, I can directly use the ** leftmost insert** template to find the insert index i, but finally judge whether nums[i] is equal to target. If it is not equal, it will return -1, otherwise i will be returned. This is also the reason why I \*\* divide bisection into two types instead of three or even four.

In addition, the leftmost insertion and the rightmost insertion can be used in combination to obtain the number of numbers equal to the target in the ordered sequence, which is sometimes a test point. Code representation：

```py
nums = [1,2,2,2,3,4]
i = bisect. bisect_left(nums, 2) # get 1
j = bisect. bisect_right(nums, 2) # get 4
# j-i is the number of 2 in nums
```

For the convenience of description, I will refer to all the leftmost insertion binary in the future as **leftmost binary**, and use bisect directly in the code. bisect_left means, and I will refer to the rightmost insertion of two points as **rightmost two points**, and use bisect in the code. bisect_right or bisect. bisect stated.

### Summary

For binary questions, the solution space must first be clarified, and then according to certain conditions (usually compared with intermediate values), half of the solutions must be discarded. You can start by finding the binary of values that meet the conditions, and then learn the leftmost and rightmost binary. At the same time, everyone only needs to master the two points of leftmost and rightmost, because the latter function is greater than the former.

For the two points of leftmost and rightmost, simply summarize in two sentences：

1. The leftmost boundary continues to shrink the right boundary, and finally returns to the left boundary

2. The rightmost boundary continues to shrink the left boundary, and finally returns to the right boundary

## Four major applications

The basic knowledge is almost ready. Next, we start with dry goods skills.

What to talk about next：

-Ability detection and counting binary are similar in nature, and they are both generalizations of ordinary binary. -The essence of prefixing and sorting and inserting sorting and sorting is to build an ordered sequence.

Then let's get started.

### Ability to detect two points

The ability detection method is generally: define the function possible, the parameter is mid, and the return value is a boolean value. The outer layer adjusts the "solution space" according to the return value.

Sample code (take the leftmost binary as an example)：

```py
def ability_test_bs(nums):
def possible(mid):
pass
l, r = 0, len(A) - 1
while l <= r:
mid = (l + r) // 2
# Only here is different from the leftmost two points
if possible(mid): l = mid + 1
else: r = mid - 1
return l
```

Compared with the two most basic types of left-most and right-most binary, the ability detection binary only adjusts the if statement inside while into a function. Therefore, the ability detection system is also divided into two basic types, the leftmost and the rightmost.

Basically, everyone can use this mode to set it up. After clearly understanding the framework of the problem, let's finally take a look at what problems can be solved by the ability test method. Here are three questions to show you how to feel it. There are many similar questions. You can experience them by yourself after class.

#### 875. Keke who loves bananas (medium)

##### Title address

https://leetcode-cn.com/problems/koko-eating-bananas/description/

##### Title description

```
Keke likes to eat bananas. There are N piles of bananas here, and there are piles[i] bananas in the ith pile. The guards have left and will be back in H hours.

Keke can decide the speed at which she eats bananas K (unit: root/hour). Every hour, she will choose a bunch of bananas and eat K roots from them. If this pile of bananas is less than K roots, she will eat all the bananas in this pile, and then she will not eat more bananas within this hour.

Keke likes to eat slowly, but still wants to eat all the bananas before the guards come back.

Return the minimum speed K (K is an integer) at which she can eat all bananas in H hours.



Example 1：

Input: piles = [3,6,7,11], H = 8
Output: 4
Example 2：

Input: piles = [30,11,23,4,20], H = 5
Output: 30
Example 3：

Input: piles = [30,11,23,4,20], H = 6
Output: 23


prompt：

1 <= piles. length <= 10^4
piles. length <= H <= 10^9
1 <= piles[i] <= 10^9


```

##### Pre-knowledge

-Binary search

##### Company

-Byte

##### Idea

The title is Let us ask for the minimum speed at which we can eat all bananas within H hours.

It is intuitive to enumerate all possible speeds, find out all the speeds at which bananas can be eaten, and then choose the smallest speed. Since the minimum speed needs to be returned, it is better to choose to enumerate from small to large, because you can exit early. The time complexity of this solution is relatively high, and it is $O(N*M)$, where N is the length of piles and M is the largest number in piles (that is, the maximum value of the solution space).

It has been observed that the solution space that needs to be detected is an ordered sequence, and it should be thought that it may be possible to solve it using binary instead of linear enumeration. The key that can be solved by using two points is the same as the two-point problem that we simplified earlier. The key point is that if the speed k cannot eat all the bananas, then all solutions that are less than or equal to k can be ruled out. \*\*

The key to the two-way solution is：

-Clear solution space. For this question, the solution space is [1, max(piles)]. -How to shrink the solution space. The key point is that **If the speed k cannot finish eating all bananas, then all solutions that are less than or equal to k can be ruled out. **

In summary, we can use the leftmost boundary, that is, the right boundary is constantly shrinking.

![](https://p.ipic.vip/d69a7p.jpg)

> The upper limit of the number of bananas in the banana pile is 10^9. Keke is too edible, right?

##### Analysis of key points

-Binary search template

##### Code

Code support: Python, JavaScript

Python Code:

```py
class Solution:
def solve(self, piles, k):
def possible(mid):
t = 0
for pile in piles:
t += (pile + mid - 1) // mid
return t <= k

l, r = 1, max(piles)

while l <= r:
mid = (l + r) // 2
if possible(mid):
r = mid - 1
```
