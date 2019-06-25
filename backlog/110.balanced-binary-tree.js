/*
 * @lc app=leetcode id=110 lang=javascript
 *
 * [110] Balanced Binary Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function maxDepth(root) {
    if (root == null) return 0;
    const l = maxDepth(root.left);
    const r = maxDepth(root.right);
    if (l === false || r === false) return false;
    if (Math.abs(l - r) > 1) return false;
    return 1 + Math.max(l, r);
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if (root === null) return true;
    return !!maxDepth(root)
};

