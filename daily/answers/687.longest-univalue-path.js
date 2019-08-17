/*
 * @lc app=leetcode id=687 lang=javascript
 *
 * [687] Longest Univalue Path
 */

// 返回经过root的且只能取左右一个节点的路径长度
function helper(node, res) {
    if (node === null) return 0;
    const l = helper(node.left, res);
    const r = helper(node.right, res);
    let lcnt = 0;
    let rcnt = 0;
    if (node.left && node.val === node.left.val) lcnt = lcnt + l + 1;
    if (node.right && node.val === node.right.val) rcnt = rcnt + r + 1;
    
    res.max = Math.max(res.max, lcnt + rcnt);
    
    return Math.max(lcnt, rcnt);
  }
  /**
   * Definition for a binary tree node.
   * function TreeNode(val) {
   *     this.val = val;
   *     this.left = this.right = null;
   * }
   */
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  var longestUnivaluePath = function(root) {
    const res = {
      max: 0
    };
    helper(root, res);
    return res.max;
  };