/*
 * @lc app=leetcode id=516 lang=javascript
 *
 * [516] Longest Palindromic Subsequence
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    // bbbab 返回4 
    // tag : dp
    const dp = [];

    for(let i = s.length - 1; i >= 0; i--) {
        dp[i] = Array(s.length).fill(0);
        for(let j = i; j < s.length; j++) {
            if (i - j === 0) dp[i][j] = 1;
            else if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i][j -1], dp[i +1][j]);
            }
        }
    }

    return dp[0][s.length - 1]
};

