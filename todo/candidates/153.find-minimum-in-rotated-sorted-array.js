/*
 * @lc app=leetcode id=153 lang=javascript
 *
 * [153] Find Minimum in Rotated Sorted Array
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let start = 0;
  let end = nums.length - 1;
  let mid = 0;

  while (start <= end) {
    mid = start + ((end - start) >> 1);
    if (nums[mid] > nums[mid + 1]) return nums[mid + 1];
    else if (nums[mid] > nums[start] && nums[start] < nums[end]) return nums[start];
    // 在左边的有序部分
    else if (nums[mid] > nums[start]) start = mid + 1;
    else if (nums[mid] < nums[mid - 1]) return nums[mid] // 在右边的有序部分
    else end = mid - 1;
  }

  return nums[mid];
};
