# 前缀树问题

## 介绍

截止目前（2020-02-04） [前缀树（字典树）](https://leetcode-cn.com/tag/trie/) 在 LeetCode 一共有 17 道题目。其中 2 道简单，8 个中等，7 个困难。

这里总结了六道题，弄懂这几道， 那么前缀树对你应该不是大问题， 希望这个专题可以帮到正在学习前缀树的你。

简单来说， 前缀树就是一个树。前缀树一般是将一系列的单词记录到树上， 如果这些单词没有公共前缀，则和直接用数组存没有任何区别。而如果有公共前缀， 则公共前缀仅会被存储一次。可以想象，如果一系列单词的公共前缀很多， 则会有效减少空间消耗。

而前缀树的意义实际上是空间换时间，这和哈希表，动态规划等的初衷是一样的。

其原理也很简单，正如我前面所言，其公共前缀仅会被存储一次，因此如果我想在一堆单词中找某个单词或者某个前缀是否出现，我无需进行完整遍历，而是遍历前缀树即可。本质上，使用前缀树和不使用前缀树减少的时间就是公共前缀的数目。也就是说，一堆单词没有公共前缀，使用前缀树没有任何意义。

知道了前缀树的作用和使用场景，接下来我们自己实现一个前缀树。关于实现可以参考 [0208.implement-trie-prefix-tree](https://github.com/azl397985856/leetcode/blob/b8e8fa5f0554926efa9039495b25ed7fc158372a/problems/208.implement-trie-prefix-tree.md)

## API

自己实现前缀树，首先要知道它的 api 有哪些，以及具体功能是什么。

前缀树的 api 主要有以下几个：

- `insert(word)`: 插入一个单词
- `search(word)`：查找一个单词是否存在
- `startWith(word)`： 查找是否存在以 word 为前缀的单词

其中 startWith 是前缀树最核心的用法，其名称前缀树就从这里而来。大家可以先拿 208 题开始，熟悉一下前缀树，然后再尝试别的题目。

## 图解

一个前缀树大概是这个样子：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlug87vyfj30mz0gq406.jpg)

如图每一个节点存储一个字符，然后外加一个控制信息表示是否是单词结尾，实际使用过程可能会有细微差别，不过变化不大。

以下是本专题的六道题目的题解，内容会持续更新，感谢你的关注～

- [0208.实现 Trie (前缀树)](https://github.com/azl397985856/leetcode/blob/b8e8fa5f0554926efa9039495b25ed7fc158372a/problems/208.implement-trie-prefix-tree.md)
- [0211.添加与搜索单词 - 数据结构设计](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/211.add-and-search-word-data-structure-design.md)
- [0212.单词搜索 II](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/212.word-search-ii.md)
- [0472.连接词](https://github.com/azl397985856/leetcode/blob/master/problems/472.concatenated-words.md)
- [0820.单词的压缩编码](https://github.com/azl397985856/leetcode/blob/master/problems/820.short-encoding-of-words.md)
- [1032.字符流](../problems/1032.stream-of-characters.md)

## 相关题目

- [648. 单词替换](https://leetcode-cn.com/problems/replace-words/) (换皮题)
