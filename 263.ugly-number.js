/*
 * @lc app=leetcode id=263 lang=javascript
 *
 * [263] Ugly Number
 */
/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
  // TAG: 数论
  if (num <= 0) return false;
  if (num === 1) return true;

  const list = [2, 3, 5];

  if (list.includes(num)) return true;

  for (let i of list) {
    if (num % i === 0) return isUgly(Math.floor(num / i));
  }
  return false;
};
