/*
 * @lc app=leetcode id=524 lang=javascript
 *
 * [524] Longest Word in Dictionary through Deleting
 */
function isSequence(s, word) {
  if (word.length > s.length) return false;

  let i = 0;
  let j = 0;

  while(i < s.length && j < s.length) {
    if (word[i] === s[j]) i++;
    j++;
  }

  // 说明有s中有word.length个元素和word匹配（且顺序一致）
  // 换句话说就是word是s的子序列
  return i === word.length;
}
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
var findLongestWord = function(s, d) {
  // tag: `two pointer`

  // 求解subSequence的题目，可以用双指针解决
  // 比如在字符串a中查找b，那么快指针在a上，慢指针在b。 快指针一直更新，慢指针只有两个相等才更新
  // 最后比较慢指针是否走到底了即可
  let res = "";

  for (let word of d) {
    if (isSequence(s, word)) {
      if (word.length > res.length) res = word;
      else if (word.length === res.length && word.charAt(0) < res.charAt(0))
        res = word;
    }
  }

  return res;
};
