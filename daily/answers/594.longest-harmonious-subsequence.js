/*
 * @lc app=leetcode id=594 lang=javascript
 *
 * [594] Longest Harmonious Subsequence
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
  // Input: [1,3,2,2,5,2,3,7]
  // Output: 5
  // Explanation: The longest harmonious subsequence is [3,2,2,2,3].
  if (nums.length === 0) return 0;
  const counts = {};
  let res = 0;

  for (let i = 0; i < nums.length; i++) {
    if (!counts[nums[i]]) {
      counts[nums[i]] = 1;
    } else {  
      counts[nums[i]] += 1;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (counts[nums[i] + 1]) {
      res = Math.max(res, counts[nums[i]] + counts[nums[i] + 1]);
    }
  }

  return res;
};
