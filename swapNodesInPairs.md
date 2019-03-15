## 题目地址
https://leetcode.com/problems/swap-nodes-in-pairs/description/

## 题目描述
Given a linked list, swap every two adjacent nodes and return its head.

You may not modify the values in the list's nodes, only nodes itself may be changed.

 

Example:

Given 1->2->3->4, you should return the list as 2->1->4->3.
## 思路

设置一个dummy 节点简化操作。  

1. 初始化first为第一个节点
2. 初始化second为第二个节点
3. 初始化current为dummy
4. first.next = second.next
5. second.next = first
6. current 移动两格
7. 重复

![24.swap-nodes-in-pairs](./assets/24.swap-nodes-in-pairs.gif)

(图片来自： https://github.com/MisterBooo/LeetCodeAnimation)

## 关键点解析

1. 链表这种数据结构的特点和使用

2. dummyHead简化操作

## 代码
```js
/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
 *
 * https://leetcode.com/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (43.33%)
 * Total Accepted:    287.2K
 * Total Submissions: 661.3K
 * Testcase Example:  '[1,2,3,4]'
 *
 * Given a linked list, swap every two adjacent nodes and return its head.
 *
 * You may not modify the values in the list's nodes, only nodes itself may be
 * changed.
 *
 *
 *
 * Example:
 *
 *
 * Given 1->2->3->4, you should return the list as 2->1->4->3.
 *
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
 * @return {ListNode}
 */
var swapPairs = function(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;
  while (current.next != null && current.next.next != null) {
    // 初始化双指针
    const first = current.next;
    const second = current.next.next;
    
    // 更新双指针和current指针
    first.next = second.next;
    second.next = first;
    current.next = second;

    // 更新指针
    current = current.next.next;
  }
  return dummy.next;
};

```
