/*
 * @lc app=leetcode id=114 lang=javascript
 *
 * [114] Flatten Binary Tree to Linked List
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function preorderTraversal(root) {
  if (!root) return [];

  return [root]
    .concat(preorderTraversal(root.left))
    .concat(preorderTraversal(root.right));
}
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if (root === null) return root;
    const res = preorderTraversal(root);
    
    let curPos = 0;
    let curNode = null;

    while(curNode = res[curPos]) {
        curNode.left = null;
        curNode.right = res[++curPos];
    }
};
