/*
 * @lc app=leetcode id=215 lang=javascript
 *
 * [215] Kth Largest Element in an Array
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxHeapify(nums) {
    nums.unshift(null);
  
    for (let i = nums.length - 1; i >> 1 > 0; i--) {
      // 自下往上堆化
      if (nums[i] > nums[i >> 1]) { // 如果子元素更大，则交换位置
        const temp = nums[i];
        nums[i] = nums[i >> 1];
        nums[i >> 1] = temp;
      }
    }
    nums.shift();
    return nums[0];
  }
var findKthLargest = function(nums, k) {
    // heap klogn
    let ret = null;
    for(let i = 0; i < k; i++) {
        ret = maxHeapify(nums);
        nums.shift();
    }
    return ret;
};

