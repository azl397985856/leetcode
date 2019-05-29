/*
 * @lc app=leetcode id=300 lang=javascript
 *
 * [300] Longest Increasing Subsequence
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0;
  //   const dp = Array(nums.length).fill(1);
  //   let max = 1;

  //   for (let i = 0; i < nums.length; i++) {
  //     for (let j = 0; j < i; j++) {
  //       if (nums[i] > nums[j]) {
  //         dp[i] = Math.max(dp[j] + 1, dp[i]);
  //       }
  //       max = Math.max(max, dp[i]);
  //     }
  //   }

  //   return max;

  // [ 10, 9, 2, 5, 3, 7, 101, 18 ]
  // [ 2, 3, 5, 7, 9, 10, 18, 101 ]
};
