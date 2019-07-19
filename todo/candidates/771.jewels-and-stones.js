/*
 * @lc app=leetcode id=771 lang=javascript
 *
 * [460] LFU Cache
 */
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 * @description 思路：正则把石头里的宝石replace掉，长度相减，就是结果
 */
var numJewelsInStones = function(J, S) {
  let newS = S
  for (let i = 0; i < J.length; i++) {
    newS = newS.replace(new RegExp(J[i], 'g'), '')
  }
  return S.length - newS.length
}
