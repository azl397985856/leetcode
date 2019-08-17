/*
 * @lc app=leetcode id=647 lang=javascript
 *
 * [647] Palindromic Substrings
 */

function isPalindromic(s) {
  let start = 0;
  let end = s.length - 1;

  while (start < end && s[start] === s[end]) {
    start++;
    end--;
  }

  return start >= end;
}

/**
 *
 * @param {对称点1} i
 * @param {对称点2} j
 * @param {原始字符串} s
 * @return {以i，j为对称点的字符串s有多少回文串} count
 */
function extendPalindromic(i, j, s) {
  const n = s.length;
  let count = 0;
  let start = i;
  let end = j;
  while (s[start] === s[end] && (start >= 0) && (end < n)) {
    start--;
    end++;
    count++;
  }

  return count;
}
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  // "aaa"
  // "abc"
  // // 暴力法，空间复杂度O(1) 时间复杂度O(n^3)
  // let count = s.length;

  // for(let i = 0; i < s.length - 1; i++) {
  //     for(let j = i + 1; j < s.length; j++) {
  //         if (isPalindromic(s.substring(i, j + 1))) {
  //             count++;
  //         }
  //     }
  // }

  // return count;

  // 中心扩展法(运用回文的对称性)
  // 时间复杂度O(n^2) 空间复杂度O(1)
  const n = s.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    // 以 字符s[i]为对称点，一共有多少回文字串
    count += extendPalindromic(i, i, s);
    // 以 字符s[i]和s[i+1]为对称点，一共有多少回文字串
    count += extendPalindromic(i, i + 1, s);
  }

  return count;
};
