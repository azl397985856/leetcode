class Solution:
    def solve(self, days):
        # n = len(days)
        # prices = [2, 7, 25]
        # durations = [1, 7, 30]
        # dp = [float("inf")] * (n + 1)
        # # dp[i] 表示截止第 i + 1 天（包括）需要多少钱，因此答案就是 dp[n]
        # dp[0] = 0

        # for i in range(1, n + 1):
        #     for j in range(i, n + 1):
        #         for price, duration in zip(prices, durations):
        #             # [i-1, j-1] 闭区间  -> dp [i,j]  ->  dp[i-1]
        #             if days[j - 1] - days[i - 1] + 1 <= duration:
        #                 dp[j] = min(dp[j], dp[i - 1] + price)
        # return dp[-1]

        # m*n^2 => m*nlogn -> m*n   m = 3 n = len(days)

        # n = len(days)
        # prices = [2, 7, 25]
        # durations = [1, 7, 30]

        # @lru_cache(None)
        # def dp(i):
        #     if i >= n:
        #         return 0
        #     return min([price + dp(bisect.bisect_left(days, days[i] + duration)) for price, duration in zip(prices, durations)])

        # return dp(0)

        # n = len(days)
        # prices = [2, 7, 25]
        # durations = [1, 7, 30]
        # dp = [float("inf")] * (n + 1)
        # # dp[i] 表示截止第 i + 1 天（包括）需要多少钱，因此答案就是 dp[n]
        # dp[0] = 0

        # for i in range(1, n + 1):
        #     for j in range(i, n + 1):
        #         for price, duration in zip(prices, durations):
        #             if days[j - 1] - days[i - 1] + 1 <= duration:
        #                 dp[j] = min(dp[j], dp[i - 1] + price)
        #             elif price == 25:
        #                 break

        # return dp[-1]
        prices = [2, 7, 25]
        durations = [1, 7, 30]
        n = len(days)
        m = len(prices)
        dp = [float("inf")] * (n + 1)
        dp[0] = 0
        pointers = [0] * m
        # 上面 dp 的问题在于 prices 指针不断回溯，实际上没有必要。因为xxxx(上面的 break)，比如上一次 price 为 2 的时候内层（第二层）走到 5（j == 5）了，那么下一次 price 为 2 的时候从 5 开始就行了，前面不用看的，都不满足了。因此可使用一个数组记录指针，并保证指针只前进不回退，这样时间复杂度可减低到 m*n
        for i in range(1, n + 1):
            for j in range(m):
                while days[i - 1] - days[pointers[j]] >= durations[j]:
                    pointers[j] += 1
                dp[i] = min(dp[i], dp[pointers[j]] + prices[j])
        return dp[-1]
