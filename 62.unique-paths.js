/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 *
 * https://leetcode.com/problems/unique-paths/description/
 *
 * algorithms
 * Medium (46.53%)
 * Total Accepted:    277K
 * Total Submissions: 587.7K
 * Testcase Example:  '3\n2'
 *
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in
 * the diagram below).
 *
 * The robot can only move either down or right at any point in time. The robot
 * is trying to reach the bottom-right corner of the grid (marked 'Finish' in
 * the diagram below).
 *
 * How many possible unique paths are there?
 *
 *
 * Above is a 7 x 3 grid. How many possible unique paths are there?
 *
 * Note: m and n will be at most 100.
 *
 * Example 1:
 *
 *
 * Input: m = 3, n = 2
 * Output: 3
 * Explanation:
 * From the top-left corner, there are a total of 3 ways to reach the
 * bottom-right corner:
 * 1. Right -> Right -> Down
 * 2. Right -> Down -> Right
 * 3. Down -> Right -> Right
 *
 *
 * Example 2:
 *
 *
 * Input: m = 7, n = 3
 * Output: 28
 *
 *   START
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  // backtracking
  const dp = [];
  for (let i = 0; i < m + 1; i++) {
    dp[i] = [];
    dp[i][0] = 0;
  }
  for (let i = 0; i < n + 1; i++) {
    dp[0][i] = 0;
  }
  for (let i = 1; i < m + 1; i++) {
    for(let j = 1; j < n + 1; j++) {
        dp[i][j] = j === 1 ? 1 : dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m][n];
};
