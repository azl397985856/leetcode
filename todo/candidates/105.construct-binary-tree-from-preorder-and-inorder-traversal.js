/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function helper(preorder, pStart, pEnd, inorder, iStart, iEnd) {
  if (pStart > pEnd || iStart > iEnd) return null;
  const root = new TreeNode(preorder[pStart]);

  let i = iStart;
 
  while (inorder[i] !== root.val) {
    i++;
  }
  const len = i - iStart;
  root.left = helper(preorder, pStart + 1, pStart + len, inorder, iStart, i - 1);
  root.right = helper(preorder, pStart + len + 1, pEnd, inorder, i + 1, iEnd);
  return root;
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  // tag: `tree`, `dfs`
  if (preorder.length !== inorder.length) return null;
  return helper(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
};
