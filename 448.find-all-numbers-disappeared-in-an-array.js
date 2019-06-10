/*
 * @lc app=leetcode id=448 lang=javascript
 *
 * [448] Find All Numbers Disappeared in an Array
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    const res = [];
    let cur = 0;
    for(let i = 0; i < nums.length; i++) {
        res[nums[i]] = true;
    }

    for(let i = 0; i < nums.length; i++) {
        if (res[i + 1] === void 0) {
            res[cur++] = i + 1;
        }
    }

    res.length = cur;

    return res;
};

