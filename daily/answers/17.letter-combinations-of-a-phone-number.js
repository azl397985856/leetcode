/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */
function backtrack(list, tempList, digits, start, keys) {
  if (tempList.length === digits.length) {
    return list.push(tempList.join(''));
  }

  for (let i = start; i < digits.length; i++) {
    const chars = keys[digits[i]];
    for (let j = 0; j < chars.length; j++) {
      tempList.push(chars[j]);
      backtrack(list, tempList, digits, i + 1, keys);
      tempList.pop();
    }
  }
}
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (digits.length === 0) return [];
  // Input:Digit string "23"
  // Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
  const keys = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz"
  ];

  const list = [];
  backtrack(list, [], digits, 0, keys);
  return list;
};
