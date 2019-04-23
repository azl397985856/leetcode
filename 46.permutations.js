/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 *
 * https://leetcode.com/problems/permutations/description/
 *
 * algorithms
 * Medium (53.60%)
 * Total Accepted:    344.6K
 * Total Submissions: 642.9K
 * Testcase Example:  '[1,2,3]'
 *
 * Given a collection of distinct integers, return all possible permutations.
 * 
 * Example:
 * 
 * 
 * Input: [1,2,3]
 * Output:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 * 
 * 
 */
function backtrack(list, tempList, nums) {
    if (tempList.length === nums.length) return list.push([...tempList]);
    for(let i = 0; i < nums.length; i++) {
        if (tempList.includes(nums[i])) continue;
        tempList.push(nums[i]);
        backtrack(list, tempList, nums);
        tempList.pop();
    }
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const list = [];
    backtrack(list, [], nums)
    return list
};

