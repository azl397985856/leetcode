# Prefixes and topics

It took me a few days to select five topics with the same idea from the link to help you solve the problem. If you think the article is useful to you, remember to like and share, so that I can see your approval and have the motivation to continue doing it.

- [467. Surround the unique sub-string in the string](https://leetcode-cn.com/problems/unique-substrings-in-wraparound-string /"467. Surround the unique sub-string in the string") (medium)
- [795. Number of interval subarrays](https://leetcode-cn.com/problems/number-of-subarrays-with-bounded-maximum /"795. Number of interval subarrays") (medium)
- [904. Fruit basket](https://leetcode-cn.com/problems/fruit-into-baskets / "904. Fruit basket") (medium)
- [992. Subarrays of K different integers](https://leetcode-cn.com/problems/subarrays-with-k-different-integers /"992. Subarrays of K different integers") (difficult)
- [1109. Flight booking statistics](https://leetcode-cn.com/problems/corporate-flight-bookings /"1109. Flight Booking Statistics") (medium)

The first four questions are all subtypes of sliding windows. We know that sliding windows are suitable for use when the topic requirements are continuous, and [prefix and](https://oi-wiki.org/basic/prefix-sum / "Prefix and") the same is true. In the continuous problem, the two are of great significance for optimizing the time complexity. Therefore, if you can solve a problem with violence, and the problem happens to have continuous restrictions, then techniques such as sliding windows and prefixing sums should be thought of.

In addition to these few questions, there are also many questions that are similar routines, which you can experience during the learning process. Today we will come and study together.

## Appetizer

Let's start with a simple question, identify the basic form and routine of this kind of question, and lay the foundation for the next four questions. After you understand this routine, you can do this kind of question directly afterwards.

It should be noted that the pre-knowledge of these four questions is `sliding window`. Students who are not familiar with it can first take a look at the [sliding window topic (ideas + templates)) I wrote earlier (https://github.com/azl397985856/leetcode/blob/master/thinkings/slide-window.md "Sliding window topic (ideas + templates)")

### 母题 0

There are N positive integers placed in array A. Now a new array B is required. The i-th number B[i] of the new array is the sum of the 0th to i-th numbers of the original array A.

This problem can be solved using the prefix sum. Prefix sum is an important kind of preprocessing, which can greatly reduce the time complexity of the query. We can simply understand it as “the sum of the first n items of the sequence”. This concept is actually very easy to understand, that is, in an array, the nth bit stores the sum of the first n digits of the array.

For [1,2,3,4,5,6], the prefix sum can be pre=[1,3,6,10,15,21]. We can use the formula pre[𝑖]=pre[𝑖-1]+nums[num] to get the value of each prefix sum, and then calculate and solve the problem accordingly through the prefix sum. In fact, the concept of prefix sum is very simple, but the difficulty is how to use prefix sum in the problem and how to use the relationship between prefix and sum to solve the problem.

Title recommendation: [1480. Dynamic sum of one-dimensional arrays](https://leetcode-cn.com/problems/running-sum-of-1d-array /)

### 母题 1

If you were asked to find the total number of consecutive subarrays of an array, how would you find it? Where continuous refers to the continuous index of the array. For example, [1,3,4], its continuous subarrays have：`[1], [3], [4], [1,3], [3,4] , [1,3,4]`， You need to return 6.

One idea is that the total number of consecutive subarrays is equal to: ** The number of subarrays ending with index 0 + the number of subarrays ending with index 1 +. . . + The number of subarrays ending with index n-1**, which is undoubtedly complete.

![](https://p.ipic.vip/gp8wlg.jpg)

At the same time, ** Use the prefix and idea of the subject 0 to sum while traversing. **

Reference code (JS)：

```js
function countSubArray(nums) {
  let ans = 0;
  let pre = 0;
  for (_ in nums) {
    pre += 1;
    ans += pre;
  }
  return ans;
}
```

**Complexity analysis**

-Time complexity:$O(N)$, where N is the length of the array. -Spatial complexity:$O(1)$

And since the number of subarrays ending in index i is i +1, this question can directly use the arithmetic sequence summation formula`(1 +n) * n / 2`, where n is the length of the array.

### 母题 2

Let me continue to modify the next topic. What if you ask you to find the total number of consecutive subarrays with an array with an adjacency difference of 1? In fact, when the index of ** is 1 different, the value is also 1 different. **

Similar to the above idea, it is nothing more than a judgment to increase the difference.

Reference code (JS)：

```js
function countSubArray(nums) {
  let ans = 1;
  let pre = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] == 1) {
      pre += 1;
    } else {
      pre = 0;
    }

    ans += pre;
  }
  return ans;
}
```

**Complexity analysis**

-Time complexity:$O(N)$, where N is the length of the array. -Spatial complexity:$O(1)$

What if the difference between my values is greater than 1? In fact, just change the symbol. Isn't this just to find the number of ascending sub-sequences? I won't continue to repeat them here, you can try it yourself.

### 母题 3

We continue to expand.

What if I ask you to find the number of subarrays that are not greater than k? Not greater than k refers to the fact that all elements of a subarray are not greater than K. For example, the [1,3,4] subarray has `[1], [3], [4], [1,3], [3,4] , [1,3,4]`， Subarrays that are not greater than 3 have `[1], [3], [1,3]` ， Then the number of subarrays of [1,3,4] that are not greater than 3 is 3. Implement the function atMostK(k, nums).

Reference code (JS):

```js
function countSubArray(k, nums) {
  let ans = 0;
  let pre = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= k) {
      pre += 1;
    } else {
      pre = 0;
    }

    ans += pre;
  }
  return ans;
}
```

**Complexity analysis**

-Time complexity:$O(N)$, where N is the length of the array. -Spatial complexity:$O(1)$

### 母题 4

What if I ask you to find out that the maximum value of the subarray is exactly the number of subarrays of k? For example, the [1,3,4] subarray has `[1], [3], [4], [1,3], [3,4] , [1,3,4]`， The maximum value of the subarray is exactly 3. The subarray has `[3], [1,3]` ， Then the number of subarrays with the maximum value of [1,3,4] subarrays that happen to be 3 is 2. Implement the function exactK(k, nums).

In fact, exactK can directly use atMostK, that is, atMostK(k)-atMostK(k-1). For the reason, see Part 5 of the subtitle below.

### 母题 5

What if I ask you to find that the maximum value of the subarray is exactly the number of subarrays between k1 and k2? Implement the function betweenK(k1, k2, nums).

In fact, betweenK can directly use atMostK, that is, atMostK(k1, nums)-atMostK(k2-1, nums), where k1> k2. The premise is that the values are discrete, for example, the questions I asked above are all integers. Therefore, I can directly subtract 1, because **1 is the smallest interval between two integers**.

![](https://p.ipic.vip/v5t94x.jpg)

As above, `an area less than or equal to 10` minus`an area less than 5` means`an area greater than or equal to 5 and less than or equal to 10'.

Note that I am talking about less than 5, not less than or equal to 5. Since the integers are discrete, the minimum interval is 1. Therefore, less than 5 is equivalent to less than or equal to 4 here. This is the reason why betweenK(k1, k2, nums) = atMostK(k1)-atMostK(k2-1).

Therefore, it is not difficult to see that exactK is actually a special form of betweenK. When k1 == k2, betweenK is equivalent to exactK.

Therefore, atMostK is the soul method. You must master it. If you don't understand, it is recommended to read it a few more times.

With the above foundation, let's take a look at the first question.

## 467. Surround the unique sub-string in the string (medium)

### Title description

```
Think of the string s as an infinite surround string of "abcdefghijklmnopqrstuvwxyz", so s looks like this: ". . . zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd. . . . ".

Now we have another string P. What you need is to find out how many unique non-empty sub-strings of p are in s, especially when your input is the string p, you need to output the number of different non-empty sub-strings of p in the string S.

Note: p is only composed of lowercase English letters, and the size of p may exceed 10,000.



Example 1:

Input: "a"
Output: 1
Explanation: There is only one "a" sub-character in the string S.


Example 2:

Enter: "cac"
Output: 2
Explanation: The string “cac” in the string S has only two sub-strings “a” and "c”. .


Example 3:

Enter: "zab"
Output: 6
Explanation: There are six sub-strings “z”, “a”, “b”, “za”, “ab”, and “zab” in the string S. .


```

### Pre-knowledge

-Sliding window

### Idea

The title is to let us find the number of non-empty sub-strings that p appears in s, and s is a fixed infinite loop string. Since the data range of p is 10^5, it takes 10^10 operations to find all the sub-strings violently, and it should time out. Moreover, a lot of information on the topic is useless, which is definitely wrong.

Take a closer look at the title and find that this is not a variant of the main theme 2? Without saying much, just go to the code to see how similar it is.

> In order to reduce judgment, I used a black technology here, and I added a `^` in front of P.

```py
class Solution:
def findSubstringInWraproundString(self, p: str) -> int:
p = '^' + p
w = 1
ans = 0
for i in range(1,len(p)):
if ord(p[i])-ord(p[i-1]) == 1 or ord(p[i])-ord(p[i-1]) == -25:
w += 1
else:
w = 1
ans += w
return ans
```

There is a problem with the above code. For example, `cac` will be calculated as 3, but it should actually be 2. The root cause is that c was miscalculated twice. Therefore, a simple idea is to use set to record the accessed sub-strings. For example：

```py
{
c,
abc,
ab,
abcd
}

```

And since the elements in the set must be continuous, the above data can also be stored in a hashmap.：

```
{
c: 3
d: 4
b: 1
}

```

The meaning is：

-The maximum length of a sub-string ending in b is 1, which is B. -The maximum length of a sub-string ending in c is 3, which is abc. -The maximum length of a sub-string ending in d is 4, which is abcd.

As for c, there is no need to save it. We can figure it out by way of theme 2.

Specific algorithm：

-Define a len_mapper. Key is the letter, and value is the length. The meaning is the length of the longest continuous sub-string ending in key.

> Keywords are: longest

-Use a variable w to record the length of consecutive sub-strings, and the traversal process updates len_mapper according to the value of w -Returns the sum of all values in len_mapper.

For example: abc, len_mapper at this time is:

```py
{
c: 3
b: 2
a: 1
}
```

Another example: abcab, len_mapper at this time is still the same.

Another example: abcazabc, len_mapper at this time：

```py
{
c: 4
b: 3
a: 2
z: 1
}
```

This achieves the purpose of deleveraging. This algorithm is not heavy or leaky, because the longest continuous sub-string must contain a continuous sub-string shorter than it. This idea is the same as [1297. Maximum number of occurrences of a sub-string](https://github.com/azl397985856/leetcode/issues/266 "1297. The maximum number of occurrences of a strand") The method of pruning is different and the same.

### Code (Python)

```py
class Solution:
def findSubstringInWraproundString(self, p: str) -> int:
p = '^' + p
len_mapper = collections. defaultdict(lambda: 0)
w = 1
for i in range(1,len(p)):
if ord(p[i])-ord(p[i-1]) == 1 or ord(p[i])-ord(p[i-1]) == -25:
w += 1
else:
w = 1
len_mapper[p[i]] = max(len_mapper[p[i]], w)
return sum(len_mapper. values())
```

**Complexity analysis**

-Time complexity:$O(N)$, where $N$ is the length of the string P. -Spatial complexity: Since up to 26 letters are stored, the space is actually constant, so the spatial complexity is $O(1)$.

## 795. Number of interval subarrays (medium)

### Title description

```

Given an array A whose elements are all positive integers, the positive integers L and R (L<=R).

Find the number of subarrays that are continuous, non-empty and whose largest element satisfies greater than or equal to L and less than or equal to R.

For example :
input:
A = [2, 1, 4, 3]
L = 2
R = 3
Output: 3
Explanation: subarrays that meet the conditions: [2], [2, 1], [3].
note:

L, R, and A[i] are all integers, ranging from [0,10^9].
The length range of array A is [1, 50000].

```

### Pre-knowledge

-Sliding window

### Idea

From the main topic 5, we know that **betweenK can directly use atMostK, namely atMostK(k1)-atMostK(k2-1), where k1>k2**.

From the matrix 2, we know how to find the number of subarrays that meet certain conditions (here are the elements that are less than or equal to R).

Combine these two and you can solve it.

### Code (Python)

> Is the code very similar?

```py
class Solution:
def numSubarrayBoundedMax(self, A: List[int], L: int, R: int) -> int:
def notGreater(R):
ans = cnt = 0
for a in A:
if a <= R: cnt += 1
else: cnt = 0
ans += cnt
return ans

return notGreater(R) - notGreater(L - 1)
```

**_Complexity analysis_**

-Time complexity:$O(N)$, where $N$ is the length of the array. -Spatial complexity:$O(1)$.

## 904. Fruit basket (medium)

### Title description

```
In a row of trees, the i-th tree produces fruit of type tree[i].
You can start with any tree of your choice, and then repeat the following steps：

Put the fruits from this tree in your basket. If you can't do it, stop.
Move to the next tree to the right of the current tree. If there are no trees on the right, stop.
Please note that after selecting a tree, you have no choice: you must perform Step 1, then perform Step 2, then return to step 1, then perform Step 2, and so on until it stops.

You have two baskets, each basket can carry any number of fruits, but you want each basket to carry only one type of fruit.

What is the maximum amount of fruit trees you can collect with this app?



Example 1：

Input: [1,2,1]
Output: 3
Explanation: We can collect [1,2,1].
Example 2：

Input: [0,1,2,2]
Output: 3
Explanation: We can collect [1,2,2]
If we start with the first tree, we will only be able to collect [0, 1].
Example 3：

Input: [1,2,3,2,2]
Output: 4
Explanation: We can collect [2,3,2,2]
If we start with the first tree, we will only be able to collect [1, 2].
Example 4：

Input: [3,3,3,1,2,1,1,2,3,3,4]
Output: 5
Explanation: We can collect [1,2,1,1,2]
If we start with the first tree or the eighth tree, we will only be able to collect 4 fruit trees.


prompt：

1 <= tree. length <= 40000
0 <= tree[i] < tree. length

```

### Pre-knowledge

-Sliding window

### Idea

The title is full of bells and whistles. Let's abstract it. It is to give you an array and let you select a subarray. This subarray has at most two kinds of numbers. The maximum number of this selected subarray can be.

Isn't this the same as Theme 3? It's just that k has become a fixed value of 2. In addition, since the title requires a maximum of two numbers in the entire window, wouldn't it be better if we use a hash table to save it?

> Set is no longer possible. Therefore, we not only need to know how many numbers are in the window, we also need to know the number of times each number appears, so that we can use the sliding window to optimize the time complexity.

### Code (Python)

```py
class Solution:
def totalFruit(self, tree: List[int]) -> int:
def atMostK(k, nums):
i = ans = 0
win = defaultdict(lambda: 0)
for j in range(len(nums)):
if win[nums[j]] == 0: k -= 1
win[nums[j]] += 1
while k < 0:
win[nums[i]] -= 1
if win[nums[i]] == 0: k += 1
i += 1
ans = max(ans, j - i + 1)
return ans

return atMostK(2, tree)
```

**Complexity analysis**

-Time complexity:$O(N)$, where $N$ is the length of the array. -Spatial complexity:$O(k)$.

## 992. Subarrays of K different integers (difficult)

### Title description

```
Given an array of positive integers A, if the number of different integers in a subarray of A happens to be K, then the continuous and not necessarily independent subarray of A is called a good subarray.

(For example, there are 3 different integers in [1,2,3,1,2]: 1, 2, and 3. ）

Returns the number of good subarrays in A.



Example 1：

Input: A = [1,2,1,2,3], K = 2
Output: 7
Explanation: A subarray composed of exactly 2 different integers：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
Example 2：

Input: A = [1,2,1,3,4], K = 3
Output: 3
Explanation: A subarray composed of exactly 3 different integers：[1,2,1,3], [2,1,3], [1,3,4].


prompt：

1 <= A. length <= 20000
1 <= A[i] <= A. length
1 <= K <= A. length



```

### Pre-knowledge

-Sliding window

### Idea

From the main topic 5, it is known that: exactK = atMostK(k)-atMostK(k-1), so the answer is about to come out. The other parts and the above title`904. Fruits are in a basket`.

> In fact, it is similar to all sliding window topics.

### Code (Python)

```py
class Solution:
def subarraysWithKDistinct(self, A, K):
return self. atMostK(A, K) - self. atMostK(A, K - 1)

def atMostK(self, A, K):
counter = collections. Counter()
res = i = 0
for j in range(len(A)):
if counter[A[j]] == 0:
K -= 1
counter[A[j]] += 1
while K < 0:
counter[A[i]] -= 1
if counter[A[i]] == 0:
K += 1
i += 1
res += j - i + 1
return res
```

**Complexity analysis**

-Time complexity:$O(N)$, where $N$ is the length of the array. -Spatial complexity:$O(k)$.

## 1109. Flight booking statistics (medium)

### Title description

```

There are n flights here, which are numbered from 1 to N.
```
