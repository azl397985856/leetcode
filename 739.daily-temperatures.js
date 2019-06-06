/*
 * @lc app=leetcode id=739 lang=javascript
 *
 * [739] Daily Temperatures
 */
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  // // 暴力  时间复杂度O(n^2), 空间复杂度O(1)
  // const res = [];
  // for(let i = 0; i < T.length; i++) {
  //     res[i] = 0;
  //     for(let j = i; j < T.length; j++) {
  //         if (T[j] > T[i]) {
  //             res[i] = j - i;
  //             break;
  //         }
  //     }
  // }

  // return res;

  // 递增栈/递减栈
  // 这里我们需要用到递减栈
  // 时间复杂度O(n), 空间复杂度O(n)
  // 典型的空间换时间
  const stack = [];
  const res = [];

  for (let i = 0; i < T.length; i++) {
    res[i] = 0;
    while (stack.length !== 0 && T[i] > T[stack[stack.length - 1]]) {
      const peek = stack.pop();
      res[peek] = i - peek;
    }
    stack.push(i);
  }

  return res;
};
