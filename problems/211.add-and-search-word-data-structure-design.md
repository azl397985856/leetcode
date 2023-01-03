## 题目地址（211. 添加与搜索单词 - 数据结构设计）

https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/

## 题目描述

```
请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

实现词典类 WordDictionary ：

WordDictionary() 初始化词典对象
void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。
 

示例：

输入：
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
输出：
[null,null,null,null,false,true,true,true]

解释：
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

提示：

1 <= word.length <= 500
addWord 中的 word 由小写英文字母组成
search 中的 word 由 '.' 或小写英文字母组成
最调用多 50000 次 addWord 和 search

```

## 前置知识

- [前缀树](../thinkings/trie.md)

## 公司

- 阿里
- 腾讯

## 思路

我们首先不考虑字符"."的情况。这种情况比较简单，我们 addWord 直接添加到数组尾部，search 则线性查找即可。

接下来我们考虑特殊字符“.”，其实也不难，只不过 search 的时候，判断如果是“.”, 我们认为匹配到了，继续往后匹配即可。

上面的代码复杂度会比较高，我们考虑优化。如果你熟悉前缀树的话，应该注意到这可以使用前缀树来进行优化。前缀树优化之后每次查找复杂度是$O(h)$, 其中 h 是前缀树深度，也就是最长的字符串长度。

关于前缀树，LeetCode 有很多题目。有的是直接考察，让你实现一个前缀树，有的是间接考察，比如本题。前缀树代码见下方，大家之后可以直接当成前缀树的解题模板使用。

![](https://p.ipic.vip/8ujt14.jpg)

由于我们这道题需要考虑特殊字符"."，因此我们需要对标准前缀树做一点改造，insert 不做改变，我们只需要改变 search 即可，代码(Python 3)：

```python
def search(self, word):
        """
        Returns if the word is in the trie.
        :type word: str
        :rtype: bool
        """
        curr = self.Trie
        for i, w in enumerate(word):
            if w == '.':
                wizards = []
                for k in curr.keys():
                    if k == '#':
                        continue
                    wizards.append(self.search(word[:i] + k + word[i + 1:]))
                return any(wizards)
            if w not in curr:
                return False
            curr = curr[w]
        return "#" in curr
```

标准的前缀树搜索我也贴一下代码，大家可以对比一下：

```python
def search(self, word):
        """
        Returns if the word is in the trie.
        :type word: str
        :rtype: bool
        """
        curr = self.Trie
        for w in word:
            if w not in curr:
                return False
            curr = curr[w]
        return "#" in curr
```

## 关键点

- 前缀树（也叫字典树），英文名 Trie（读作 tree 或者 try）

## 代码

- 语言支持：Python3

Python3 Code：

关于 Trie 的代码:

```python
class Trie:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.Trie = {}

    def insert(self, word):
        """
        Inserts a word into the trie.
        :type word: str
        :rtype: void
        """
        curr = self.Trie
        for w in word:
            if w not in curr:
                curr[w] = {}
            curr = curr[w]
        curr['#'] = 1

    def search(self, word):
        """
        Returns if the word is in the trie.
        :type word: str
        :rtype: bool
        """
        curr = self.Trie
        for i, w in enumerate(word):
            if w == '.':
                wizards = []
                for k in curr.keys():
                    if k == '#':
                        continue
                    wizards.append(self.search(word[:i] + k + word[i + 1:]))
                return any(wizards)
            if w not in curr:
                return False
            curr = curr[w]
        return "#" in curr
```

主逻辑代码：

```python
class WordDictionary:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.trie = Trie()

    def addWord(self, word: str) -> None:
        """
        Adds a word into the data structure.
        """
        self.trie.insert(word)

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
        """
        return self.trie.search(word)


# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)
```

## 相关题目

- [0208.implement-trie-prefix-tree](./208.implement-trie-prefix-tree.md)
- [0212.word-search-ii](./212.word-search-ii.md)
- [0472.concatenated-words](./problems/472.concatenated-words.md)
- [0820.short-encoding-of-words](https://github.com/azl397985856/leetcode/blob/master/problems/820.short-encoding-of-words.md)
