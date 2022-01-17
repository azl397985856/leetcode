# String problem

There are many string problems, from simple implementation of substr, recognition of palindromes, to more complex common sub-strings/sub-sequences. In fact, strings are essentially arrays of characters, so
Many data ideas and methods can also be used on string issues, and they can play a good role in some cases.

There are also many algorithms that specialize in processing strings, such as trie, horse-drawn cart algorithm, run-time coding, Huffman tree, and so on.


## Some native methods for implementing strings

This kind of topic should be the most straightforward topic. The ambiguity of the topic is relatively small and the difficulty is relatively small, so it is also good for electronic surfaces and other forms.

-[28.Implementation-str-str](https://leetcode.com/problems/implement-strstr /)
- [344. Reverse string](. . /Backlog/344. Reverse string. js）

## Palindrome

A palindrome string is a string where both forward reading and reverse reading are the same. The "level" or "noon" in the string, etc. are palindrome strings.

The general method for determining whether a palindrome is a palindrome is a double pointer, see Title 125 below for details. The idea of judging the longest palindrome is mainly two words "extension"，
If you can make full use of the characteristics of palindromes, you can reduce a lot of unnecessary calculations, a typical example is the "Horse-drawn cart Algorithm".


### Related questions

-[5.Longest palindrome sub-string](../question/5.Longest palindrome sub-string.md)

-[125.valid-palindrome](../question/125.valid-palindrome.md)

-[131.Palindrome-partition](../Question/131.Palindrome-partition.md)

-[Shortest palindrome](https://leetcode.com/problems/shortest-palindrome /)

-[516.Longest palindrome sequence](../Question/516.Longest palindrome sequence.md)


## Prefix problem

The prefix tree is the most intuitive way to deal with this kind of problem, but it also has disadvantages, such as memory consumption when there are few common prefixes.

### Related topics

-[14. Longest-common-prefix](. . /14. The longest common prefix. js）
-[208.implement-trie-prefix-tree]（../problems/208.implement-trie-prefix-tree.md）


## Other questions

-[139.word-break](../question/139.word-break.md)