/*
 * @lc app=leetcode id=137 lang=javascript
 *
 * [137] Single Number II
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  // [1,1,1,2]
  let res = 0;
  // 前提是nums中数字都不大于2^31
  for (let i = 0; i < 32; i++) {
    let cnt = 0;
    let bit = 1 << i;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] & bit) cnt++;
    }
    if (cnt % 3 != 0) res = res | bit;
  }
  return res;
};
