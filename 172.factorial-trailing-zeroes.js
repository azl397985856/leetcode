/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    // tag: 数论
    // 只有 2 和 5 相乘才等于 10
    // if (n === 0) return n;

    // return Math.floor(n / 5)  + trailingZeroes(Math.floor(n / 5));
    let count = 0;
    while(n >= 5) {
        count += Math.floor(n / 5);
        n = Math.floor(n / 5);
    }
    return count;
};

