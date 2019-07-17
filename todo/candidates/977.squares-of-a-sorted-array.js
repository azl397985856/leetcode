/*
 * @lc app=leetcode id=977 lang=javascript
 *
 * [977] Squares of a Sorted Array
 */
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  let start = 0;
  let end = A.length - 1;
  const res = [];
  let cur = 0;

  while (start <= end) {
    if (Math.abs(A[start]) === Math.abs(A[end])) {
      cur++;
      res[A.length - cur] = A[start] * A[start];
      cur++
      res[A.length - cur] = A[end] * A[end];
      start++;
      end--;
    } else if (Math.abs(A[start]) > Math.abs(A[end])) {
      cur++;
      res[A.length - cur] = A[start] * A[start];
      start++;
    } else {
      cur++;
      res[A.length - cur] = A[end] * A[end];
      end--;
    }
  }

  return res;
};
