/*
 * @lc app=leetcode id=633 lang=javascript
 *
 * [633] Sum of Square Numbers
 */
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    let start = 0;
    let end = Math.floor(Math.sqrt(c));

    while(start <= end) {
        const res = Math.pow(start, 2) + Math.pow(end, 2);
        if (res < c) {
            start++;
        } else if (res > c){
            end--;
        } else {
            return true;
        }
    }
    return false;
};

