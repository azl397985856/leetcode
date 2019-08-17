/*
 * @lc app=leetcode id=409 lang=javascript
 *
 * [409] Longest Palindrome
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  // abccccdd
  let res = 0;
  let hasOdd = false;
  const counts = Array("z".charCodeAt(0) + 1).fill(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i)] += 1;
  }

  for (let i = 0; i < counts.length; i++) {
    if (counts[i] % 2 === 0) {
      res += counts[i];
    } else {
      hasOdd = true;
      res += counts[i] - 1;
    }
  }

  return hasOdd ? res + 1 : res;
};
