/*
 * @lc app=leetcode id=217 lang=javascript
 *
 * [217] Contains Duplicate
 *
 * https://leetcode.com/problems/contains-duplicate/description/
 *
 * algorithms
 * Easy (50.92%)
 * Total Accepted:    324K
 * Total Submissions: 628.5K
 * Testcase Example:  '[1,2,3,1]'
 *
 * Given an array of integers, find if the array contains any duplicates.
 * 
 * Your function should return true if any value appears at least twice in the
 * array, and it should return false if every element is distinct.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,2,3,1]
 * Output: true
 * 
 * Example 2:
 * 
 * 
 * Input: [1,2,3,4]
 * Output: false
 * 
 * Example 3:
 * 
 * 
 * Input: [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 * 
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    // 1. 暴力两层循环两两比较， 时间复杂度O(n^2) 空间复杂度O(1)

    // 2. 先排序，之后比较前后元素是否一致即可，一层循环即可，如果排序使用的比较排序的话时间复杂度O(nlogn) 空间复杂度O(1)

    // 3. 用hashmap ，时间复杂度O(n) 空间复杂度O(n)
    const visited = {};
    for(let i = 0; i < nums.length; i++) {
        if (visited[nums[i]]) return true;
        visited[nums[i]] = true;
    }
    return false;
};

