/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // 网上精妙的解法没看懂 
    // see : https://leetcode.com/problems/intersection-of-two-linked-lists/discuss/49789/My-accepted-simple-and-shortest-C%2B%2B-code-with-comments-explaining-the-algorithm.-Any-comments-or-improvements
    if (headA === null || headB === null) return null;
    let lenA = 0;
    let lenB = 0;

    let curA = headA;
    let curB = headB;

    while(curA) {
        curA = curA.next;
        lenA += 1;
    }
    while(curB) {
        curB = curB.next;
        lenB += 1;
    }

    const gap = Math.abs(lenA - lenB);
    let cur = 0;
    curA = headA;
    curB = headB;

    if (lenA > lenB) {
        while(cur < gap) {
            cur++;
            curA = curA.next;
        }
    } else {
        while(cur < gap) {
            cur++;
            curB = curB.next;
        }
    }

    while(curA !== curB) {
        curA = curA.next;
        curB = curB.next;
    }

    return curA;
};

