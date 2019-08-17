/*
 * @lc app=leetcode id=337 lang=javascript
 *
 * [337] House Robber III
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function helper(root) {
    if (root === null) return [0, 0];
    // 0: rob 1: notRob
    const l = helper(root.left);
    const r = helper(root.right);
  
    const robed = root.val + l[1] + r[1];
    const notRobed = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
  
    return [robed, notRobed];
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
  //   if (root === null) return 0;
  //   const notRobed = rob(root.left) + rob(root.right);
  //   const robed =
  //     root.val +
  //     rob(root.left && root.left.left) +
  //     rob(root.left && root.left.right) +
  //     rob(root.right && root.right.left) +
  //     rob(root.right && root.right.right);

  //   return Math.max(notRobed, robed);

  // dp
  const [robed, notRobed] = helper(root);
  return Math.max(robed, notRobed);
};
