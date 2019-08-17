/*
 * @lc app=leetcode id=540 lang=javascript
 *
 * [540] Single Element in a Sorted Array
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
  //   if (nums.length === 1) return nums[0]
  //   nums.sort();
  //   for (let i = 0; i < nums.length; i++) {
  //     if (nums[i] === nums[i + 1]) {
  //       i++;
  //     } else {
  //         return nums[i];
  //     }
  //   }

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = start + ((end - start) >> 1);
    if (nums[mid] === nums[mid + 1]) {
      if (mid % 2 === 0) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    } else if (nums[mid] === nums[mid - 1]) {
      if (mid % 2 === 0) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      return nums[mid];
    }
  }
};
