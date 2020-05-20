# Sliding Window Technique

I first encountered the term "sliding window" when learning about the sliding window protocols, which is used in Transmission Control Protocol (TCP) for packet-based data transimission. It is used to improved transmission efficiency in order to avoid congestions. The sender and the receiver each has a window size, w1 and w2, respectively. The window size may vary based on the network traffic flow. However, in a simpler implementation, the sizes are fixed, and they must be greater than 0 to perform any task.

The sliding window technique in algorithms is very similar, but it applies to more scenarios. Now, let's go over this technique.

## Introduction

Sliding window technique, also known as two pointers technique, can help reduce time complexity in problems that ask for "consecutive" or "contiguous" items. For example, [209. Minimum Size Subarray Sum](https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/209-chang-du-zui-xiao-de-zi-shu-zu-hua-dong-chua-2/). For more related problems, go to the `List of Problems` below.

## Common Types

This technique is mainly for solving problems ask about "consecutive substring" or "contiguous subarray". It would be helpful if you can relate these terms with this technique in your mind. Whether the technique solve the exact problem or not, it would come in handy.

There are mainly three types of application:

- Fixed window size
- Variable window size and looking for the maximum window size that meet the requirement
- Variable window size and looking for the minimum window size that meet the requirement (e.g. Problem#209 mentioned above)

The last two are catogorized as "variable window". Of course, they are all of the same essentially. It's all about the implementation details.

### Fixed Window Size

For fixed window size problem, we only need to keep track of the left pointer l and the right pointer r, which indicate the boundaries of a fixed window, and make sure that:

1. l is initialized to be 0
2. r is initialied such that the window's size = r - l + 1
3. Always move l and r simultaneously
4. Decide if the consecutive elements contained within the window satisfy the required conditions.
   - 4.1 If they satisfy, based on whether we need an optimal solution or not, we either return the solution or keep updating until we find the optimal one.
   - 4.2 Otherwise, we continue to find an appropriate window

![](https://tva1.sinaimg.cn/large/00831rSTly1gcw0pwdhmwj308z0d53yt.jpg)

### Variable Window Size

For variable window, we initialize the left and right pointers the same way. Then we need to make sure that:

1. Both l and r are initialized to 0
2. Move r to the right by one step
3. Decide if the consecutive elements contained within the window satisfy the required conditions
    - 3.1 If they satisfy
        - 3.1.1 and we need an optimal solution, we try moving the pointer l to minimize our window's size and repeat step 3.1
        - 3.1.2 else we return the current solution
   - 3.2 If they don't satisfy, we continue to find an appropriate window

If we view it another way, it's simply moving the pointer r to find an appropriate window and we only move the pointer l once we find an appropriate window to minimize the window and find an optimal solution.

![](https://tva1.sinaimg.cn/large/00831rSTly1gcw0ouuplaj30d90d50t3.jpg)

## Code Template

The following code snippet is a solution for problem #209 written in Python.

```python
class Solution:
    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        l = total = 0
        ans = len(nums) + 1
        for r in range(len(nums)):
            total += nums[r]
            while total >= s:
                ans = min(ans, r - l + 1)
                total -= nums[l]
                l += 1
        return  0 if ans == len(nums) + 1 else ans
```

## List of problems (Not Translated Yet)

Some problems here are intuitive that you know the sliding window technique would be useful while others need a second thought to realize that.

- [【Python，JavaScript】滑动窗口（3. 无重复字符的最长子串）](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/pythonjavascript-hua-dong-chuang-kou-3-wu-zhong-fu/)
- [76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/solution/python-hua-dong-chuang-kou-76-zui-xiao-fu-gai-zi-c/)
- [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/209-chang-du-zui-xiao-de-zi-shu-zu-hua-dong-chua-2/)
- [【Python】滑动窗口（438. 找到字符串中所有字母异位词）](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/solution/python-hua-dong-chuang-kou-438-zhao-dao-zi-fu-chua/)
- [【904. 水果成篮】（Python3）](https://leetcode-cn.com/problems/fruit-into-baskets/solution/904-shui-guo-cheng-lan-python3-by-fe-lucifer/)
- [【930. 和相同的二元子数组】（Java，Python）](https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/930-he-xiang-tong-de-er-yuan-zi-shu-zu-javapython-/)
- [【992. K 个不同整数的子数组】滑动窗口（Python）](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/solution/992-k-ge-bu-tong-zheng-shu-de-zi-shu-zu-hua-dong-c/)
- [【1004. 最大连续 1 的个数 III】滑动窗口（Python3）](https://leetcode-cn.com/problems/max-consecutive-ones-iii/solution/1004-zui-da-lian-xu-1de-ge-shu-iii-hua-dong-chuang/)
- [【1234. 替换子串得到平衡字符串】[Java/C++/Python] Sliding Window](https://leetcode.com/problems/replace-the-substring-for-balanced-string/discuss/408978/javacpython-sliding-window/367697)
- [【1248. 统计「优美子数组」】滑动窗口（Python）](https://leetcode-cn.com/problems/count-number-of-nice-subarrays/solution/1248-tong-ji-you-mei-zi-shu-zu-hua-dong-chuang-kou/)

## Further Readings

- [LeetCode Sliding Window Series Discussion](https://leetcode.com/problems/binary-subarrays-with-sum/discuss/186683/)（English）
