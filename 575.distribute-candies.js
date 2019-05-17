/*
 * @lc app=leetcode id=575 lang=javascript
 *
 * [575] Distribute Candies
 */
/**
 * @param {number[]} candies
 * @return {number}
 */
var distributeCandies = function(candies) {
    const count = new Set(candies);
    return Math.min(count.size, candies.length >> 1);
};

