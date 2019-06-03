/*
 * @lc app=leetcode id=326 lang=javascript
 *
 * [326] Power of Three
 *
 * https://leetcode.com/problems/power-of-three/description/
 *
 * algorithms
 * Easy (41.43%)
 * Total Accepted:    178.8K
 * Total Submissions: 430.4K
 * Testcase Example:  '27'
 *
 * Given an integer, write a function to determine if it is a power of three.
 *
 * Example 1:
 *
 *
 * Input: 27
 * Output: true
 *
 *
 * Example 2:
 *
 *
 * Input: 0
 * Output: false
 *
 * Example 3:
 *
 *
 * Input: 9
 * Output: true
 *
 * Example 4:
 *
 *
 * Input: 45
 * Output: false
 *
 * Follow up:
 * Could you do it without using any loop / recursion?
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
  // tag: 数论
  // let i = 0;
  // while(Math.pow(3, i) < n) {
  //     i++;
  // }
  // return Math.pow(3, i) === n;

  // 巧用整除
  return n > 0 && Math.pow(3, 19) % n === 0;
};
// 扩展： 这个方法可以扩展到任意质数，合数则不行
