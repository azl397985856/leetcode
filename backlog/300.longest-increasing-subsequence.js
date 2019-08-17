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
  // 时间复杂度O(n^2)
  // if (nums.length === 0) return 0;
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

  // 参考： https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation
  // const tails = [];
  // for (let i = 0; i < nums.length; i++) {
  //   let left = 0;
  //   let right = tails.length;
  //   while (left < right) {
  //     const mid = left + (right - left) / 2; // 防止溢出
  //     if (tails[mid] < nums[i]) left = mid + 1;
  //     else right = mid;
  //   }
  //   // 说明nums[i] 比如tails中所有数字都大，我们直接push
  //   if (right === tails.length) tails.push(nums[i]);
  //   else tails[right] = nums[i]; // 否则我们修改tails[right]
  // }
  // return tails.length;
};
