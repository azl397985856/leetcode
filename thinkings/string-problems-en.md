# Problems about String

There are many problems about string, including `substr` implementation, validating palindrome and common substring and so on. Essentially, a string is also an array of characters. So, many ideas of array can be used to solve the problems of string.

There are many algorithms which specifically used for handle strings. Such as `trie`, `huffman tree`, `Manacher` and so on.

## Problems about Implementing Build-in Functions of String

This kind of questions are the most direct ones with less ambiguous meanings and less challenging. So, it is always be used in the phone interviews.

- [28.implement-str-str](https://leetcode.com/problems/implement-strstr/)
- [344.reverse-string](../backlog/344.reverse-string.js)

## Palindrome

A palindrome is a word, number, phrase, or other sequence of characters which reads the same backward as forward. Like "level" and "noon".

There is universal method to check whether a string is palindrome or not which uses two pointers, one at the begining and the other at the end, to move to the middle together step by step. You can check the following question `125`for more detials.
For finding the longest palindrome, it is possible to reduce many meaningless algorithms if we take full advantage of the feature of palindrome. Manacher's algorithm is a typical example.

### Related Questions

- [5.longest-palindromic-substring](../problems/5.longest-palindromic-substring.md)

- [125.valid-palindrome](../problems/125.valid-palindrome.md)

- [131.palindrome-partitioning](../problems/131.palindrome-partitioning.md)

- [shortest-palindrome](https://leetcode.com/problems/shortest-palindrome/)

- [516.longest-palindromic-subsequence](../problems/516.longest-palindromic-subsequence.md)

## Prefix Questions

It is intuitive to use prefix tree to handle this kind of questions. But it also has some disadvantages. For example, if there are less common prefix, using prefix tree may cost more RAMs.

### Related Questions

-[14.longest-common-prefix](../14.longest-common-prefix.js)
-[208.implement-trie-prefix-tree](../problems/208.implement-trie-prefix-tree.md)

## Other Questions

- [139.word-break](../problems/139.word-break.md)
