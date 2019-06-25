/*
 * @lc app=leetcode id=287 lang=javascript
 *
 * [287] Find the Duplicate Number
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  // Input: [1,3,4,2,2]
  // Output: 2
  nums.sort();

  for(let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) return nums[i];
  }
};
