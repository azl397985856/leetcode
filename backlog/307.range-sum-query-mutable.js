/*
 * @lc app=leetcode id=307 lang=javascript
 *
 * [307] Range Sum Query - Mutable
 */
/**
 * @param {number[]} nums
 */
// var NumArray = function(nums) {
//   this.nums = nums;
// };

// /**
//  * @param {number} i
//  * @param {number} val
//  * @return {void}
//  */
// NumArray.prototype.update = function(i, val) {
//   this.nums[i] = val;
// };

// /**
//  * @param {number} i
//  * @param {number} j
//  * @return {number}
//  */
// NumArray.prototype.sumRange = function(i, j) {
//   let res = 0;
//   for (let k = i; k < j + 1; k++) {
//     res += this.nums[k];
//   }

//   return res;
// };

/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  this.nums = nums;

  // Init array representation of segment tree.
  this.segmentTree = [];

  const l = 0;
  const r = this.nums.length - 1;
  const cur = 0;
  this.buildTreeRecursively(l, r, cur);
};

NumArray.prototype.buildTreeRecursively = function(l, r, cur) {
  // If low input index and high input index are equal that would mean
  // the we have finished splitting and we are already came to the leaf
  // of the segment tree. We need to copy this leaf value from input
  // array to segment tree.
  if (l === r) {
    return (this.segmentTree[cur] = this.nums[r]);
  }

  // Split input array on two halves and process them recursively.
  const m = Math.floor((l + r) / 2);
  // Process left half of the input array.
  this.buildTreeRecursively(l, m, this.getLeftChildIndex(cur));
  // Process right half of the input array.
  this.buildTreeRecursively(m + 1, r, this.getRightChildIndex(cur));

  // Once every tree leaf is not empty we're able to build tree bottom up using
  // provided operation function.
  this.segmentTree[cur] = this.operation(
    this.segmentTree[this.getLeftChildIndex(cur)],
    this.segmentTree[this.getRightChildIndex(cur)]
  );
};

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(i, val) {
  this.nums[i] = val;
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  const l = 0;
  const r = this.nums.length - 1;
  const cur = 0;

  return this.rangeQueryRecursive(i, j, l, r, cur);
};

NumArray.prototype.rangeQueryRecursive = function(i, j, l, r, cur) {
  if (i <= l && j >= r) {
    // Total overlap.
    return this.segmentTree[cur];
  }

  if (i > r || j < l) {
    // No overlap.
    return this.operationFallback;
  }

  // Partial overlap.
  const m = Math.floor((l + r) / 2);

  const leftOperationResult = this.rangeQueryRecursive(
    i,
    j,
    l,
    m,
    this.getLeftChildIndex(cur)
  );

  const rightOperationResult = this.rangeQueryRecursive(
    i,
    j,
    m + 1,
    r,
    this.getRightChildIndex(cur)
  );

  return this.sumRange(leftOperationResult, rightOperationResult);
};

NumArray.prototype.getLeftChildIndex = function (parentIndex) {
    return (2 * parentIndex) + 1;
}

NumArray.prototype.getRightChildIndex = function (parentIndex) {
    return (2 * parentIndex) + 2;
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */
