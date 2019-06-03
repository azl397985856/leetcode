/*
 * @lc app=leetcode id=338 lang=javascript
 *
 * [338] Counting Bits
 *
 * https://leetcode.com/problems/counting-bits/description/
 *
 * algorithms
 * Medium (64.04%)
 * Total Accepted:    163.1K
 * Total Submissions: 253K
 * Testcase Example:  '2'
 *
 * Given a non negative integer number num. For every numbers i in the range 0
 * ≤ i ≤ num calculate the number of 1's in their binary representation and
 * return them as an array.
 *
 * Example 1:
 *
 *
 * Input: 2
 * Output: [0,1,1]
 *
 * Example 2:
 *
 *
 * Input: 5
 * Output: [0,1,1,2,1,2]
 *
 *
 * Follow up:
 *
 *
 * It is very easy to come up with a solution with run time
 * O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a
 * single pass?
 * Space complexity should be O(n).
 * Can you do it like a boss? Do it without using any builtin function like
 * __builtin_popcount in c++ or in any other language.
 *
 */
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  // tag: bit dp
  // Time complexity: O(n)
  // Space complexity: O(n)
  const res = [];
  res[0] = 0;

  // 10000100110101
  for (let i = 1; i <= num; i++) {
    if ((i & 1) === 0) {
      // 偶数
      // 偶数最后一位是0，因此右移一位对结果没有影响
      res[i] = res[i >> 1];
    } else {
      // 奇数
      // 奇数最后一位是1，i - 1 的 位数 + 1 就是结果
      res[i] = res[i - 1] + 1;
    }
  }

  return res;
};
