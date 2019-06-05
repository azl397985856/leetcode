/*
 * @lc app=leetcode id=84 lang=javascript
 *
 * [84] Largest Rectangle in Histogram
 */
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  // 木桶原理
  // 暴力求解法 时间复杂度O(n^2) 空间复杂度O(1)
  // if (heights.length === 1) return heights[0];

  // let min = null;
  // let max = 0;

  // for (let i = 0; i < heights.length; i++) {
  //   min = heights[i];
  //   for (let j = i; j < heights.length; j++) {
  //     min = Math.min(min, heights[j]);
  //     max = Math.max((j - i + 1) * min, max);
  //   }
  // }

  // return max;
  // 上面的暴力求解，其实可以做一个小优化，就是通过取局部最大值来减少一部分重复计算，但是时间复杂度还是O(n^2)

  // 关键点： 1. 单调栈（Monotone Stack）,线性复杂度,因为所有元素只会进入栈一次，并且出栈后再也不会进栈了 2.如果用暴力求解的话，你要会找出所有组合的方法（大部分题目都是两两组合，如果是任意组合的情况，暴力的话复杂度是2^n，
  // 这种情况，暴力求解通常不不取，需要考虑别的思路）
  // 当前题目就是两两组合 ，时间复杂度是O(n^2)，在可以接受的范围

  // 社区中流行的一种解法: 单调栈,  在这里我们需要使用单调递增栈
  // 时间复杂度O(n) 空间复杂度O(n)
  // const ascStack = [];
  // let max = 0;
  // heights.push(0); // hack, 为了使最后一个柱子也参与运算

  // for (let i = 0; i < heights.length; i++) {
  //   let p = i;

  //   while (
  //     ascStack.length > 0 &&
  //     heights[i] < heights[ascStack[ascStack.length - 1]]
  //   ) {
  //     // 由于是递增栈， height[p]一定是最小的，一定是短板
  //     p = ascStack.pop();
     
  //     max = Math.max(max, heights[p] * (ascStack.length === 0 ? i : i - p));
  //   }

  //   ascStack.push(i);
  // }

  // return max;

  // 相关题目： 雨水收集

  // 直方图矩形面积要最大的话，需要尽可能的使得连续的矩形多，并且最低一块的高度要高
};
