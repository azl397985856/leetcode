/*
 * @lc app=leetcode id=347 lang=javascript
 *
 * [347] Top K Frequent Elements
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  // 这个算法的瓶颈在于排序算法，时间复杂度基本上是O(nlogn) 空间复杂度是O(n)

  const hashtable = {};
  const n = nums.length;
  const res = [];

  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (hashtable[num] !== void 0) {
      hashtable[num + ""] += 1;
    } else {
      hashtable[num + ""] = 1;
    }
  }
  // sort desc
  const list = Object.entries(hashtable);
  list.sort(([, countA], [, countB]) => countB - countA);

  for (let i = 0; i < k; i++) {
    res.push(list[i][0]);
  }

  return res;
};
