/*
 * @lc app=leetcode id=543 lang=javascript
 *
 * [543] Diameter of Binary Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function maxDepth(root, res) {
  if (root === null) return 0;

  const l = maxDepth(root.left, res);
  const r = maxDepth(root.right, res);
  res.val = Math.max(res.val, l + r);
  return 1 + Math.max(l, r);
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  // 如果不计算max， 直接1+ Math.max(maxLeft, maxRight)， 得到的结果实际上是经过root节点的最大值，并不一定是总体最大值
  // 题目也做了说明， ”最大值不一定经过root“
  if (root === null) return 0;
  const res = {
      val: 0
  };

  maxDepth(root, res);

  return res.val;
};
