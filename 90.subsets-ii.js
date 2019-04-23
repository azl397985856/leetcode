/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 *
 * https://leetcode.com/problems/subsets-ii/description/
 *
 * algorithms
 * Medium (41.53%)
 * Total Accepted:    197.1K
 * Total Submissions: 469.1K
 * Testcase Example:  '[1,2,2]'
 *
 * Given a collection of integers that might contain duplicates, nums, return
 * all possible subsets (the power set).
 * 
 * Note: The solution set must not contain duplicate subsets.
 * 
 * Example:
 * 
 * 
 * Input: [1,2,2]
 * Output:
 * [
 * ⁠ [2],
 * ⁠ [1],
 * ⁠ [1,2,2],
 * ⁠ [2,2],
 * ⁠ [1,2],
 * ⁠ []
 * ]
 * 
 * 
 */
function backtrack(list, tempList, nums, start) {
    list.push([...tempList]);
    for(let i = start; i < nums.length; i++) {
        if (i > start && nums[i] === nums[i - 1]) continue;
        tempList.push(nums[i]);
        backtrack(list, tempList, nums, i + 1)
        tempList.pop();
    }
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const list = [];
    backtrack(list, [], nums.sort((a, b) => a - b), 0, [])
    return list;
};

