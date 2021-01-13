# Trie（来自公众号力扣加加的活动《91天学算法》的讲义）

## 简介

字典树也叫前缀树、Trie。它本身就是一个树型结构，也就是一颗多叉树，学过树的朋友应该非常容易理解，它的核心操作是插入，查找。删除很少使用，因此这个讲义不包含删除操作。

截止目前（2020-02-04） [前缀树（字典树）](https://leetcode-cn.com/tag/trie/) 在 LeetCode 一共有 17 道题目。其中 2 道简单，8 个中等，7 个困难。

## 前缀树的特点

简单来说， 前缀树就是一个树。前缀树一般是将一系列的单词记录到树上， 如果这些单词没有公共前缀，则和直接用数组存没有任何区别。而如果有公共前缀， 则公共前缀仅会被存储一次。可以想象，如果一系列单词的公共前缀很多， 则会有效减少空间消耗。

而前缀树的意义实际上是空间换时间，这和哈希表，动态规划等的初衷是一样的。

其原理也很简单，正如我前面所言，其公共前缀仅会被存储一次，因此如果我想在一堆单词中找某个单词或者某个前缀是否出现，我无需进行完整遍历，而是遍历前缀树即可。本质上，使用前缀树和不使用前缀树减少的时间就是公共前缀的数目。也就是说，一堆单词没有公共前缀，使用前缀树没有任何意义。

知道了前缀树的特点，接下来我们自己实现一个前缀树。关于实现可以参考 [0208.implement-trie-prefix-tree](https://github.com/azl397985856/leetcode/blob/b8e8fa5f0554926efa9039495b25ed7fc158372a/problems/208.implement-trie-prefix-tree.md)

## 应用场景及分析

正如上面所说，前缀树的核心思想是用空间换时间，利用字符串的公共前缀来降低查询的时间开销。

比如给你一个字符串 query，问你这个**字符串**是否在**字符串集合**中出现过，这样我们就可以将字符串集合建树，建好之后来匹配 query 是否出现，那有的朋友肯定会问，之前讲过的 hashmap 岂不是更好？

我们想一下用百度搜索时候，打个“一语”，搜索栏中会给出“一语道破”，“一语成谶(四声的 chen)”等推荐文本，这种叫模糊匹配，也就是给出一个模糊的 query，希望给出一个相关推荐列表，很明显，hashmap 并不容易做到模糊匹配，而 Trie 可以实现基于前缀的模糊搜索。

> 注意这里的模糊搜索也仅仅是基于前缀的。比如还是上面的例子，搜索“道破”就不会匹配到“一语道破”，而只能匹配“道破 xx”

因此，这里我的理解是：上述精确查找只是模糊查找一个特例，模糊查找 hashmap 显然做不到，并且如果在精确查找问题中，hashmap 出现过多冲突，效率还不一定比 Trie 高，有兴趣的朋友可以做一下测试，看看哪个快。

再比如给你一个长句和一堆敏感词，找出长句中所有敏感词出现的所有位置（想下，有时候我们口吐芬芳，结果发送出去却变成了\*\*\*\*，懂了吧）

> 小提示：实际上 AC 自动机就利用了 trie 的性质来实现敏感词的匹配，性能非常好。以至于很多编辑器都是用的 AC 自动机的算法。

还有些其他场景，这里不过多讨论，有兴趣的可以 google 一下。

## 基本概念

一个前缀树大概是这个样子：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghlug87vyfj30mz0gq406.jpg)

如图每一个节点存储一个字符，然后外加一个控制信息表示是否是单词结尾，实际使用过程可能会有细微差别，不过变化不大。

接下来，我们看下 Trie 里面的概念 - 节点。

- 根结点无实际意义
- 每一个节点代表一个字符
- 每个节点中的数据结构可以自定义，如 isWord(是否是单词)，count(该前缀出现的次数)等，需实际问题实际分析需要什么。

## API

自己实现前缀树，首先要知道它的 api 有哪些，以及具体功能是什么。

前缀树的 api 主要有以下几个：

- `insert(word)`: 插入一个单词
- `search(word)`：查找一个单词是否存在
- `startWith(word)`： 查找是否存在以 word 为前缀的单词

其中 startWith 是前缀树最核心的用法，其名称前缀树就从这里而来。大家可以先拿 208 题开始，熟悉一下前缀树，然后再尝试别的题目。

### Trie 的插入

- 假定给出几个单词如[she,he,her,good,god]构造出一个 Trie 如下图：

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmlx7lukrmj30gb0abt9w.jpg)

- 也就是说从根结点出发到某一粉色节点所经过的字符组成的单词，在单词列表中出现过，当然我们也可以给树的每个节点加个 count 属性，代表根结点到该节点所构成的字符串前缀出现的次数

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmlx7whonvj30g709nwfl.jpg)

可以看出树的构造非常简单，插入新单词的时候就从根结点出发一个字符一个字符插入，有对应的字符节点就更新对应的属性，没有就创建一个！

### Trie 的查询

查询更简单了，给定一个 Trie 和一个单词，和插入的过程类似，一个字符一个字符找

- 若中途有个字符没有对应节点 →Trie 不含该单词
- 若字符串遍历完了，都有对应节点，但最后一个字符对应的节点并不是粉色的，也就不是一个单词 →Trie 不含该单词

## Trie 模版

了解了 Trie 的使用场景以及基本的 API， 那么最后就是用代码来实现了。

这里我提供了 Python 和 Java 两种语言的代码。

Java:

```java
class Trie {

    TrieNode root;

    public Trie() {

        root = new TrieNode();
    }

    public void insert(String word) {

        TrieNode node = root;

        for (int i = 0; i < word.length(); i++) {

            if (node.children[word.charAt(i) - 'a'] == null)
                node.children[word.charAt(i) - 'a'] = new TrieNode();

            node = node.children[word.charAt(i) - 'a'];
            node.preCount++;
        }

        node.count++;
    }

    public boolean search(String word) {

        TrieNode node = root;

        for (int i = 0; i < word.length(); i++) {

            if (node.children[word.charAt(i) - 'a'] == null)
                return false;

            node = node.children[word.charAt(i) - 'a'];
        }

        return node.count > 0;
    }

    public boolean startsWith(String prefix) {

        TrieNode node = root;

        for (int i = 0; i < prefix.length(); i++) {

            if (node.children[prefix.charAt(i) - 'a'] == null)
                return false;
            node = node.children[prefix.charAt(i) - 'a'];
        }

        return node.preCount > 0;
    }

    private class TrieNode {

        int count; //表示以该处节点构成的串的个数
        int preCount; //表示以该处节点构成的前缀的字串的个数
        TrieNode[] children;

        TrieNode() {

            children = new TrieNode[26];
            count = 0;
            preCount = 0;
        }
    }
}
```

Python:

```python
class TrieNode:
    def __init__(self):
        self.count = 0
        self.preCount = 0
        self.children = {}

class Trie:

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
            node.preCount += 1
        node.count += 1

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.count > 0

    def startsWith(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.preCount > 0
```

**复杂度分析**

- 插入和查询的时间复杂度自然是$O(len(key))$，key 是待插入(查找)的字串。

- 建树的最坏空间复杂度是$O(m^{n})$, m 是字符集中字符个数，n 是字符串长度。

## 题目推荐

以下是本专题的六道题目的题解，内容会持续更新，感谢你的关注～

- [0208.实现 Trie (前缀树)](https://github.com/azl397985856/leetcode/blob/b8e8fa5f0554926efa9039495b25ed7fc158372a/problems/208.implement-trie-prefix-tree.md)
- [0211.添加与搜索单词 - 数据结构设计](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/211.add-and-search-word-data-structure-design.md)
- [0212.单词搜索 II](https://github.com/azl397985856/leetcode/blob/b0b69f8f11dace3a9040b54532105d42e88e6599/problems/212.word-search-ii.md)
- [0472.连接词](https://github.com/azl397985856/leetcode/blob/master/problems/472.concatenated-words.md)
- [648. 单词替换](https://leetcode-cn.com/problems/replace-words/)
- [0820.单词的压缩编码](https://github.com/azl397985856/leetcode/blob/master/problems/820.short-encoding-of-words.md)
- [1032.字符流](https://github.com/azl397985856/leetcode/blob/master/problems/1032.stream-of-characters.md)

## 总结

前缀树的核心思想是用空间换时间，利用字符串的公共前缀来降低查询的时间开销。因此如果题目中公共前缀比较多，就可以考虑使用前缀树来优化。

前缀树的基本操作就是插入和查询，其中查询可以完整查询，也可以前缀查询，其中基于前缀查询才是前缀树的灵魂，也是其名字的来源。

最后给大家提供了两种语言的前缀树模板，大家如果需要用，直接将其封装成标准 API 调用即可。

基于前缀树的题目变化通常不大， 使用模板就可以解决。如何知道该使用前缀树优化是一个难点，不过大家只要牢牢记一点即可，那就是**算法的复杂度瓶颈在字符串查找，并且字符串有很多公共前缀，就可以用前缀树优化**。
