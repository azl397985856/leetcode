## 前缀树问题

截止目前（2020-02-04） [前缀树（字典树）](https://leetcode-cn.com/tag/trie/) 在 LeetCode 一共有 17 道题目。其中 2 道简单，8 个中等，7 个困难。

这里总结了四道题，弄懂这几道， 那么前缀树对你应该不是大问题， 希望这个专题可以帮到正在学习前缀树 的你。

前缀树的 api 主要有以下几个：

- `insert(word)`: 插入一个单词
- `search(word)`：查找一个单词是否存在
- `startWith(word)`： 查找是否存在以 word 为前缀的单词

其中 startWith 是前缀树最核心的用法，其名称前缀树就从这里而来。大家可以先拿 208 题开始，熟悉一下前缀树，然后再尝试别的题目。

一个前缀树大概是这个样子：

![](https://github.com/azl397985856/leetcode/raw/b8e8fa5f0554926efa9039495b25ed7fc158372a/assets/problems/208.implement-trie-prefix-tree-1.png)

如图每一个节点存储一个字符，然后外加一个控制信息表示是否是单词结尾，实际使用过程可能会有细微差别，不过变化不大。

以下是本专题的四道题目的题解，内容会持续更新，感谢你的关注～

- [0208.implement-trie-prefix-tree](https://github.com/azl397985856/leetcode/blob/b8e8fa5f0554926efa9039495b25ed7fc158372a/problems/208.implement-trie-prefix-tree.md)
- [0211.add-and-search-word-data-structure-design](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/211.add-and-search-word-data-structure-design.md)
- [0212.word-search-ii](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/212.word-search-ii.md)
- [0472.concatenated-words](https://github.com/azl397985856/leetcode/blob/master/problems/472.concatenated-words.md)
- [0820.short-encoding-of-words](https://github.com/azl397985856/leetcode/blob/master/problems/820.short-encoding-of-words.md)
