/*
 * @lc app=leetcode id=958 lang=javascript
 *
 * [958] Check Completeness of a Binary Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function(root) {
    if (root === null) return root;
    let cur = root;
    const queue = [];

    while(cur !== null) {
        queue.push(cur.left);
        queue.push(cur.right);
        cur = queue.shift();
    }

    return queue.filter(Boolean).length === 0;
};

