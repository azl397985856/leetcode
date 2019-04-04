/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 *
 * https://leetcode.com/problems/coin-change/description/
 *
 * algorithms
 * Medium (29.25%)
 * Total Accepted:    175K
 * Total Submissions: 591.9K
 * Testcase Example:  '[1,2,5]\n11'
 *
 * You are given coins of different denominations and a total amount of money
 * amount. Write a function to compute the fewest number of coins that you need
 * to make up that amount. If that amount of money cannot be made up by any
 * combination of the coins, return -1.
 *
 * Example 1:
 *
 *
 * Input: coins = [1, 2, 5], amount = 11
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 *
 * Example 2:
 *
 *
 * Input: coins = [2], amount = 3
 * Output: -1
 *
 *
 * Note:
 * You may assume that you have an infinite number of each kind of coin.
 *
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// coinChange([1,2,5], 11) =
//   (coinChange([1,2], 6) + 1, coinChange([1,2], 1) + 2)
var coinChange = function(coins, amount) {
  //   if (amount === 0) {
  //     return 0;
  //   }
  //   if (amount < Math.min(...coins)) return -1;
  //   const dp = Array(amount + 1);
  //   for (let i = 0; i < dp.length; i++) {
  //     dp[i] = Number.MAX_VALUE;
  //   }
  //   dp[0] = 0;
  //   for (let i = 1; i < dp.length; i++) {
  //     for (let j = 0; j < coins.length; j++) {
  //       if (i - coins[j] >= 0) {
  //         dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
  //       }
  //     }
  //   }

  //   return dp[dp.length - 1] === Number.MAX_VALUE ? -1 : dp[dp.length - 1];
  // [186,419,83,408]\n6249
  if (amount === 0) return 0;

  const sortedCoins = coins.sort((a, b) => b - a);

  if (sortedCoins[sortedCoins.length - 1] > amount) return -1;

  const count = Math.floor(amount / sortedCoins[0]);
  const result = coinChange(
    sortedCoins.slice(1),
    amount - count * sortedCoins[0]
  );

  return count + (result === -1 ? 0 : result);
};
