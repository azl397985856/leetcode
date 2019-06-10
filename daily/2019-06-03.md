## 每日一题 - Longest Common Prefix

### 信息卡片

- 时间：2019-06-03
- 题目链接：https://leetcode.com/problems/longest-common-prefix/
- tag：`trie` `binary search`

### 题目描述

```
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:
Input: ["flower","flow","flight"]
Output: "fl"

Example 2:
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

Note:
All given inputs are in lowercase letters a-z.
```

### 参考答案

#### 二分法
- 找到字符串数组中长度最短字符串
- longest common prefix 长度范围 0 ~ minLength
- 运用`binary search`

参考代码
```javascript
/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 */

function isCommonPrefix(strs, middle) {
  const prefix = strs[0].substring(0, middle);
  for (let i = 1; i < strs.length; i++) {
    if (!strs[i].startsWith(prefix)) return false;
  }

  return true;
}
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // trie 解法
  // 时间复杂度O(m) 空间复杂度O(m * n)

  // tag: 二分法
  // 时间复杂度 O(n*logm)  空间复杂度O(1)
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];

  let minLen = Number.MAX_VALUE;

  for (let i = 0; i < strs.length; i++) {
    minLen = Math.min(minLen, strs[i].length);
  }

  let low = 0;
  let high = minLen;

  while (low <= high) {
    const middle = (low + high) >> 1;
    if (isCommonPrefix(strs, middle)) low = middle + 1;
    else high = middle - 1;
  }

  return strs[0].substring(0, (low + high) >> 1);
};
```
#### trie树
以LeetCode另一道题[Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/description/)的解法作为本题的参考思路, 具体代码可以自行补充完善

- 建立 Trie
- 遍历到有一个children有超过一个子元素为止


Trie实现参考代码
```javascript
/*
 * @lc app=leetcode id=208 lang=javascript
 *
 * [208] Implement Trie (Prefix Tree)
 *
 * https://leetcode.com/problems/implement-trie-prefix-tree/description/
 *
 * algorithms
 * Medium (36.93%)
 * Total Accepted:    172K
 * Total Submissions: 455.5K
 * Testcase Example:  '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]'
 *
 * Implement a trie with insert, search, and startsWith methods.
 *
 * Example:
 *
 *
 * Trie trie = new Trie();
 *
 * trie.insert("apple");
 * trie.search("apple");   // returns true
 * trie.search("app");     // returns false
 * trie.startsWith("app"); // returns true
 * trie.insert("app");
 * trie.search("app");     // returns true
 *
 *
 * Note:
 *
 *
 * You may assume that all inputs are consist of lowercase letters a-z.
 * All inputs are guaranteed to be non-empty strings.
 *
 *
 */
function TrieNode(val) {
  this.val = val;
  this.children = [];
  this.isWord = false;
}

function computeIndex(c) {
  return c.charCodeAt(0) - "a".charCodeAt(0);
}
/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = new TrieNode(null);
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let ws = this.root;
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    const current = computeIndex(c);
    if (!ws.children[current]) {
      ws.children[current] = new TrieNode(c);
    }
    ws = ws.children[current];
  }
  ws.isWord = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let ws = this.root;
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    const current = computeIndex(c);
    if (!ws.children[current]) return false;
    ws = ws.children[current];
  }
  return ws.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let ws = this.root;
  for (let i = 0; i < prefix.length; i++) {
    const c = prefix[i];
    const current = computeIndex(c);
    if (!ws.children[current]) return false;
    ws = ws.children[current];
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```
#### 暴力法

比较常规的一种解法, 大部分人采用的做法, 这里就不再赘述

### 其他优秀解答
```
暂无
```
