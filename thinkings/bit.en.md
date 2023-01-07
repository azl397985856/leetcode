# Bit Operation

Here I have summarized a few bit operation questions to share with you, namely 136 and 137, 260 and 645, which add up to four questions in total. All four questions are bit operation routines, if you want to practice bit operation, don't miss it~~

## Appetizer

Before we start, let's understand the XOR first, and we will use it later.

1. XOR nature

The result of XOR of two numbers "a^b" is the number obtained by calculating each binary bit of a and B. The logic of the operation is that if the number of the same digit is the same, it is 0, and if it is different, it is 1.

2. The law of XOR

-Any number that is XOR by itself is `0`

-Any number is different from 0 or `itself`

3. The XOR operation satisfies the law of exchange, that is,：

`a ^ b ^ c = a ^ c ^ b`

OK, let's take a look at these three questions.

## 136. The number 1 that appears only once

The title is to the effect that except for one number that appears once, all others have appeared twice. Let us find the number that appears once. We can perform a full XOR.

```python
class Solution:
def singleNumber(self, nums: List[int]) -> int:
single_number = 0
for num in nums:
single_number ^= num
return single_number
```

**_Complexity analysis_**

-Time complexity:$O(N)$, where N is the length of the array. -Spatial complexity:$O(1)$

## 137. The number 2 that appears only once

The title is to the effect that except for one number that appears once, the others have appeared three times. Let us find the number that appears once. Flexible use of bit operations is the key to this question.

Python3:

```python
class Solution:
def singleNumber(self, nums: List[int]) -> int:
res = 0
for i in range(32):
cnt= 0# Record how many 1s there are in the current bit
bit=1<<i# Record the current bit to be operated
for num in nums:
if num & bit ! = 0:
cnt += 1
if cnt % 3 ! = 0:
# Is not equal to 0, indicating that the only number that appears on this bit is 1
res |= bit

return res - 2 ** 32 if res > 2 ** 31 - 1 else res
```

-Why does Python need to judge the return value in the end?

If you don't, the test case is[-2,-2,1,1,-3,1,-3,-3,-4,-2] At that time, 4294967292 will be output. The reason is that Python is a dynamically typed language, in which case it treats 1 at the symbol position as a value, rather than as a symbol “negative number”. This is wrong. The correct answer should be -4, and the binary code of -4 is 1111. . . 100, it becomes 2^32-4=4294967292, the solution is to subtract 2\*\*32.

> The reason why this will not be a problem is that the range of arrays defined by the title will not exceed 2\*\*32

JavaScript:

```js
var singleNumber = function (nums) {
let res = 0;
for (let i = 0; i < 32; i++) {
let cnt = 0;
let bit = 1 << i;
for (let j = 0; j < nums. length; j++) {
if (nums[j] & bit) cnt++;
}
if (cnt % 3 ! = 0) res = res | bit;
}
return res;
};
```

**_Complexity analysis_**

-Time complexity:$O(N)$, where N is the length of the array. -Spatial complexity:$O(1)$

## 645. Collection of errors

And the above`137. The number 2'that only appears once has the same idea. There is no limit to the spatial complexity of this question, so it is no problem to store it directly in the hashmap. Needless to say, let's look at a solution with spatial complexity$O(1)$.

Due to and`137. The idea of the number 2'that only appears once is basically the same, I directly reused the code. The specific idea is to extract all the indexes of nums into an array idx, then the array composed of idx and nums constitutes the input of singleNumbers, and its output is the only two different numbers.

But we don't know which one is missing and which one is duplicated, so we need to traverse again to determine which one is missing and which one is duplicated.

```python
class Solution:
def singleNumbers(self, nums: List[int]) -> List[int]:
ret = 0# The result of XOR for all numbers
a = 0
b = 0
for n in nums:
ret ^= n
# Find the first one that is not 0
h = 1
while(ret & h == 0):
h <<= 1
for n in nums:
# Divide the bit into two groups according to whether it is 0
if (h & n == 0):
a ^= n
else:
b ^= n

return [a, b]

def findErrorNums(self, nums: List[int]) -> List[int]:
nums = [0] + nums
idx = []
for i in range(len(nums)):
idx. append(i)
a, b = self. singleNumbers(nums + idx)
for num in nums:
if a == num:
return [a, b]
return [b, a]

```

**_Complexity analysis_**

-Time complexity:$O(N)$ -Spatial complexity:$O(1)$

## 260. The number 3 that appears only once

The title is to the effect that except for two numbers that appear once, they all appear twice. Let us find these two numbers.

We perform an XOR operation, and the result we get is the XOR result of the two different numbers that only appear once.

We just talked about that there is a "any number and its own XOR is 0" in the law of Xor. Therefore, our idea is whether we can divide these two different numbers into two groups A and B. Grouping needs to meet two conditions.

1. Two unique numbers are divided into different groups

2. The same numbers are divided into the same groups

In this way, the two numbers can be obtained by XOR of each set of data.

The key point of the question is how do we group?

Due to the nature of XOR, if the same bit is the same, it is 0, and if it is different, it is 1. The result of our XOR of all numbers must not be 0, which means that at least one digit is 1.

Let's take any one, and the basis for grouping will come, that is, the one you take is divided into 1 group by 0, and the one that is 1 is divided into a group. This will definitely guarantee`2. The same numbers are divided into the same groups`, will different numbers be divided into different groups? Obviously, of course, we can, so we choose 1, which is Say that'two unique numbers` must be different in that one, so the two unique elements will definitely be divided into different groups.

```python
class Solution:
def singleNumbers(self, nums: List[int]) -> List[int]:
ret = 0# The result of XOR for all numbers
a = 0
b = 0
for n in nums:
ret ^= n
# Find the first one that is not 0
h = 1
while(ret & h == 0):
h <<= 1
for n in nums:
# Divide the bit into two groups according to whether it is 0
if (h & n == 0):
a ^= n
else:
b ^= n

return [a, b]
```

**_Complexity analysis_**

-Time complexity:$O(N)$, where N is the length of the array. -Spatial complexity:$O(1)$

## Related topics

- [190. Reverse binary bits](https://leetcode-cn.com/problems/reverse-bits /) (simple)
- [191. The number of digits 1](https://leetcode-cn.com/problems/number-of-1-bits /) (simple)
- [338. Bit count](https://leetcode-cn.com/problems/counting-bits /) (medium)
- [1072. Flip by column to get the maximum value and other rows](https://leetcode-cn.com/problems/flip-columns-for-maximum-number-of-equal-rows /) (medium)

For more questions, please visit my LeetCode questions warehouse:https://github.com/azl397985856/leetcode . There are already 38K stars.

Pay attention to the official account, work hard to restore the problem-solving ideas in clear and straightforward language, and there are a large number of diagrams to teach you how to recognize routines and brush questions efficiently.
