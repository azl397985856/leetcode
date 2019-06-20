/*
 * @lc app=leetcode id=744 lang=javascript
 *
 * [744] Find Smallest Letter Greater Than Target
 */
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    let start = 0;
    let end = letters.length - 1;

    while(start < end) {
        const mid = start + ((end - start) >> 1);
        if (letters[mid] <= target) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }
    // 题目要求找不到的时候，就返回第一个元素(好诡异啊)
    return letters[end] > target ? letters[end] : letters[0];
};

