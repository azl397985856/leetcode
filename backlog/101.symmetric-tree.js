/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function traversal(root) {
    if (!root) return [null];

    return [root.val].concat(traversal(root.left)).concat(traversal(root.right));
}

function reversedTraversal(root) {
    if (!root) return [null];

    return [root.val].concat(reversedTraversal(root.right)).concat(reversedTraversal(root.left));
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (root === null) return true;

    const left = traversal(root.left);
    const right = reversedTraversal(root.right);

    // 判断left 和 right 是否一致
    if (left.length !== right.length) return false;
    for(let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) return false;
    }
    return true;
};

