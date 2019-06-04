## 字符串问题

字符串问题有很多，从简单的实现substr，识别回文，到复杂一点的公共子串/子序列。其实字符串本质上也是字符数组，因此
很多数据的思想和方法也可以用在字符串问题上，并且在有些时候能够发挥很好的作用。

专门处理字符串的算法也很多，比如trie，马拉车算法，游程编码，huffman树等等。


## 实现字符串的一些原生方法

这类题目应该是最直接的题目了，题目歧义比较小, 难度也是相对较小，因此用于电面等形式也是不错的。

- [28.implement-str-str](https://leetcode.com/problems/implement-strstr/)
- [344.reverse-string](../backlog/344.reverse-string.js)

## 回文

回文串就是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。

判断是否回文的通用方法是首尾双指针，具体可以见下方125号题目。 判断最长回文的思路主要是两个字"扩展"，
如果可以充分利用回文的特点，则可以减少很多无谓的计算，典型的是《马拉车算法》。


### 相关问题

- [5.longest-palindromic-substring](../problems/5.longest-palindromic-substring.md)

- [125.valid-palindrome](../problems/125.valid-palindrome.md)

- [131.palindrome-partitioning](../problems/131.palindrome-partitioning.md)

- [shortest-palindrome](https://leetcode.com/problems/shortest-palindrome/)

- [516.longest-palindromic-subsequence](../problems/516.longest-palindromic-subsequence.md)


## 前缀问题

前缀树用来处理这种问题是最符合直觉的，但是它也有缺点，比如公共前缀很少的情况下，比较费内存。

### 相关题目

-[14.longest-common-prefix](../14.longest-common-prefix.js)
-[208.implement-trie-prefix-tree](../problems/208.implement-trie-prefix-tree.md)


## 其他问题

- [139.word-break](../problems/139.word-break.md)