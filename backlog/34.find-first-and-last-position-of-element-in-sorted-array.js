/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  // 题目要求时间复杂度为O(logn)因此很自然想到二分法
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const mid = start + ((end - start) >> 1);

    if (nums[mid] === target) {
      let left = 0;
      let right = 0;

      while (nums[mid - left] === target) {
        left++;
      }
      while (nums[mid + right] === target) {
        right++;
      }
      return [mid - left + 1, mid + right - 1];
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return [-1, -1];
};
