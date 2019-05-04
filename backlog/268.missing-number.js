/*
 * @lc app=leetcode id=268 lang=javascript
 *
 * [268] Missing Number
 *
 * https://leetcode.com/problems/missing-number/description/
 *
 * algorithms
 * Easy (47.60%)
 * Total Accepted:    267.7K
 * Total Submissions: 556.2K
 * Testcase Example:  '[3,0,1]'
 *
 * Given an array containing n distinct numbers taken from 0, 1, 2, ..., n,
 * find the one that is missing from the array.
 * 
 * Example 1:
 * 
 * 
 * Input: [3,0,1]
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [9,6,4,2,3,5,7,0,1]
 * Output: 8
 * 
 * 
 * Note:
 * Your algorithm should run in linear runtime complexity. Could you implement
 * it using only constant extra space complexity?
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    // 缺失的数字一定是 0 到 n 之间的一个数字

    // 这是一道数论的题目
    // 这里用到了一条性质： sum([1,n]) = n * (n+1) / 2
    let sum = 0;
    for(let num of nums)
        sum += num;
        
    return (nums.length * (nums.length + 1) )/ 2 - sum;
};

