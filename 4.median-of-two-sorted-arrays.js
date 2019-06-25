/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findKth(nums1, nums2, k) {
  if (nums1.length === 0) return nums2[k - 1];
  if (nums2.length === 0) return nums1[k - 1];
  if (k == 1) return Math.min(nums1[0], nums2[0]);
  let i = Math.min(k >> 1, nums1.length);
  let j = Math.min(k >> 1, nums2.length);
  if (nums1[i - 1] > nums2[j - 1]) {
    return findKth(nums1, nums2.slice(j), k - j);
  }

  return findKth(nums1.slice(i), nums2, k - i);
}
var findMedianSortedArrays = function(nums1, nums2) {
  // 1 
  // 2 3 4 5
  const m = nums1.length,
    n = nums2.length;
  return (
    (findKth(nums1, nums2, (m + n + 1) >> 1) +
      findKth(nums1, nums2, (m + n + 2) >> 1)) /
    2.0
  );
};
