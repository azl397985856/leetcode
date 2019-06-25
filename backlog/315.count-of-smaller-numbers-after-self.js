/*
 * @lc app=leetcode id=315 lang=javascript
 *
 * [315] Count of Smaller Numbers After Self
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {
  // Input: [5,2,6,1]
  // Output: [2,1,1,0]
  // 暴力法：
  //   const res = Array(nums.length).fill(0);
  //   for (let i = 0; i < nums.length - 1; i++) {
  //     for (let j = i; j < nums.length; j++) {
  //       if (nums[i] > nums[j]) {
  //         res[i] += 1;
  //       }
  //     }
  //   }

  //   return res;
  //  归并排序
  const res = Array(nums.length).fill(0);

  function merge(arr, l, m, r, res) {
    let i, j, k;
    const n1 = m - l + 1;
    const n2 = r - m;

    /* create temp arrays */
    const L = Array(n1);
    const R = Array(n2);

    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; // Initial index of first subarray
    j = 0; // Initial index of second subarray
    k = l; // Initial index of merged subarray
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        res[k] += 1;
        j++;
      }
      k++;
    }

    /* Copy the remaining elements of L[], if there 
       are any */
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    /* Copy the remaining elements of R[], if there 
       are any */
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  }
  function mergeSort(arr, l, r, res) {
    if (l < r) {
      const m = l + ((r - l) >> 1);

      mergeSort(arr, l, m, res);
      mergeSort(arr, m + 1, r, res);

      merge(arr, l, m, r, res);
    }
    return res;
  }

  return mergeSort(nums, 0, nums.length - 1, res);
};
