## Trie

When this article is done (2020-07-13), there are 17 LeetCode problems about [Trie (Prefix Tree)](https://leetcode.com/tag/trie/). Among them, 2 problems are easy, 8 are medium, and 7 are hard.

Here we summarize four of them. Once you figure them out, `Trie` should not be a challenge to you anymore. Hope this article is helpful to you.

The main interface of a trie should include the following:

- `insert(word)`: Insert a word
- `search(word)`: Search for a word
- `startWith(prefix)`: Search for a word with the given prefix

Among all of the above, `startWith` is one of the most essential methods, which leads to the naming for 'Prefix Tree'. You can start with [208.implement-trie-prefix-tree](https://leetcode.com/problems/implement-trie-prefix-tree) to get yourself familiar with this data structure, and then try to solve other problems.

Here's the graph illustration of a trie: 
![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlug6ei8jj30lg0h0wfg.jpg)

As the graph shows, each node of the trie would store a character and a boolean `isWord`, which suggests whether the node is the end of a word. There might be some slight differences in the actual implementation, but they are essentially the same.

### Related Problems' Solutions in this Repo (To Be Updated)
- [0208.implement-trie-prefix-tree](https://github.com/azl397985856/leetcode/blob/b8e8fa5f0554926efa9039495b25ed7fc158372a/problems/208.implement-trie-prefix-tree.md)
- [0211.add-and-search-word-data-structure-design](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/211.add-and-search-word-data-structure-design.md)
- [0212.word-search-ii](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/212.word-search-ii.md)
- [0472.concatenated-words](https://github.com/azl397985856/leetcode/blob/master/problems/472.concatenated-words.md)
- [0820.short-encoding-of-words](https://github.com/azl397985856/leetcode/blob/master/problems/820.short-encoding-of-words.md)
