/*
 * @lc app=leetcode id=141 lang=javascript
 *
 * [141] Linked List Cycle
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head === null) return false;
    if (head.next === null) return false;

    let fast = head.next;
    let slow = head;

    while(fast && fast.next) {
        if (fast === slow) return true;
        slow = slow.next;
        const next = fast.next;
        fast = next && next.next;
    }

    return false;
};

