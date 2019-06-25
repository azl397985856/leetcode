/*
 * @lc app=leetcode id=680 lang=javascript
 *
 * [680] Valid Palindrome II
 */
function isPalindrome(s, pos) {
    // deeee
    let start = 0;
    let end = s.length - 1;

    while(start <= end) {
        if (start === pos) {
            start++;
            continue;
        } else if (end === pos) {
            end--;
            continue;
        }
        if (s[start] !== s[end]) return false
        start++;
        end--;
    }
    return true;
}
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    // 时间复杂度O(n^2)
    let start = 0;
    let end = s.length - 1;
    for(let i = 0; i < s.length; i++) {
        if (s[start] !== s[end]) {
            return isPalindrome(s, start) || isPalindrome(s, end);
        }
        start++;
        end--;
    }
    return true;
};

