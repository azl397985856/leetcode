/*
 * @lc app=leetcode id=151 lang=javascript
 *
 * [151] Reverse Words in a String
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s
    .split(" ")
    .filter(Boolean)
    .map(str => String.prototype.trim.call(str))
    .reverse()
    .join(" ");
};
