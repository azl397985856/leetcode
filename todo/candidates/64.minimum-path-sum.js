/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
// 时间复杂度和空间复杂度都是 O (m * n);
  if (grid.length === 0) return 0;
  const dp = [];
  const rows = grid.length;
  const cols = grid[0].length;
  // 实际上你也可以无差别全部填充为MAX_VALUE，对结果没影响,代码还会更少
  // 只是有点不专业而已
  for (let i = 0; i < rows + 1; i++) {
    dp[i] = [];
    // 初始化第一列
    dp[i][0] = Number.MAX_VALUE;
    for (let j = 0; j < cols + 1; j++) {
      // 初始化第一行
      if (i === 0) {
        dp[i][j] = Number.MAX_VALUE;
      }
    }
  }

  // tricky
  dp[0][1] = 0;

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      // state transition
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i - 1][j - 1];
    }
  }

  return dp[rows][cols];
};

