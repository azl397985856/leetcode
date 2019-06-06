/*
 * @lc app=leetcode id=134 lang=javascript
 *
 * [134] Gas Station
 */

function getIndex(index, n) {
  if (index > n - 1) {
    return index - n;
  }
  return index;
}
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
  // bad 时间复杂度O(n^2)
  //   let remain = 0;
  //   const n = gas.length;
  //   for (let i = 0; i < gas.length; i++) {
  //     remain += gas[i];
  //     remain -= cost[i];
  //     let count = 0;
  //     while (remain >= 0) {
  //       count++;
  //       if (count === n) return i;
  //       remain += gas[getIndex(i + count, n)];
  //       remain -= cost[getIndex(i + count, n)];
  //     }
  //     remain = 0;
  //   }
  //   return -1;
  // better solution 时间复杂度O(n)

  const n = gas.length;
  let total = 0;
  let remain = 0;
  let start = 0;

  for(let i = 0; i < n; i++) {
    total += gas[i];
    total -= cost[i];

    remain += gas[i];
    remain -= cost[i];
    
    // 如果remain < 0, 说明从start到i走不通
    // 并且从start到i走不通，那么所有的solution中包含start到i的肯定都走不通
    // 因此我们重新从i + 1开始作为start
    if (remain < 0) {
        remain = 0;
        start = i + 1;
    }
  }
  // 事实上，我们遍历一遍，也就确定了每一个元素作为start是否可以走完一圈

  // 如果cost总和大于gas总和，无论如何也无法走到终点
  return total >= 0 ? start :  -1;
};
