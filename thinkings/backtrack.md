# 回溯

回溯是 DFS 中的一种技巧。回溯法采用 [试错](https://zh.wikipedia.org/wiki/%E8%AF%95%E9%94%99) 的思想，它尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将**取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案**。

通俗上讲，回溯是一种走不通就回头的算法。

回溯的本质是穷举所有可能，尽管有时候可以通过剪枝去除一些根本不可能是答案的分支， 但是从本质上讲，仍然是一种暴力枚举算法。

回溯法可以抽象为树形结构，并且是是一颗高度有限的树（N 叉树）。回溯法解决的都是在集合中查找子集，集合的大小就是树的叉树，递归的深度，都构成的树的高度。

以求数组 [1,2,3] 的子集为例：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkau6ustfdj30v80igtag.jpg)

以上图来说， 我们会在每一个节点进行加入到结果集这一次操作。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkau9jceowj30uj0jrdhv.jpg)

对于上面的灰色节点， 加入结果集就是 [1]。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkauahh57bj30tj0j0wgg.jpg)

这个加入结果集就是 [1,2]。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkaub4scgij30uu0io40h.jpg)

这个加入结果集就是 [2,3]，以此类推。一共有六个子集，分别是 [1], [1,2], [1,2,3], [2], [2,3] 和 [3]。

而对于全排列问题则会在叶子节点加入到结果集，不过这都是细节问题。掌握了思想之后， 大家再去学习细节就会事半功倍。

下面我们来看下具体代码怎么写。

## 算法流程

1. 构造空间树。
2. 进行遍历。
3. 如遇到边界条件，即不再向下搜索，转而搜索另一条链。
4. 达到目标条件，输出结果。

## 算法模板

伪代码：

```js
const visited = {}
function dfs(i) {
	if (满足特定条件）{
		// 返回结果 or 退出搜索空间
	}

	visited[i] = true // 将当前状态标为已搜索
	dosomething(i) // 对i做一些操作
	for (根据i能到达的下个状态j) {
		if (!visited[j]) { // 如果状态j没有被搜索过
			dfs(j)
		}
	}
	undo(i) // 恢复i
}
```

## 剪枝

回溯题目的另外一个考点是剪枝， 通过恰当地剪枝，可以有效减少时间，比如我通过剪枝操作将**石子游戏 V**的时间从 900 多 ms 优化到了 500 多 ms。

剪枝在每道题的技巧都是不一样的， 不过一个简单的原则就是**避免根本不可能是答案的递归**。

## 笛卡尔积

一些回溯的题目，我们仍然也可以采用笛卡尔积的方式，将结果保存在返回值而不是路径中，这样就避免了回溯状态，并且由于结果在返回值中，因此可以使用记忆化递归， 进而优化为动态规划形式。

参考题目：

- [140. 单词拆分 II](https://github.com/azl397985856/leetcode/blob/master/problems/140.word-break-ii.md)
- [816. 模糊坐标](https://github.com/azl397985856/leetcode/blob/master/problems/816.ambiguous-coordinates.md)

这类问题不同于子集和全排列，其组合是有规律的，我们可以使用笛卡尔积公式，将两个或更多子集联合起来。

## 经典题目

- [39. 组合总和](../problems/39.combination-sum.md)
- [40. 组合总和 II](../problems/40.combination-sum-ii.md)
- [46. 全排列](../problems/46.permutations.md)
- [47. 全排列 II](../problems/47.permutations-ii.md)
- [52. N 皇后 II](../problems/52.N-Queens-II.md)
- [78. 子集](../problems/78.subsets.md)
- [90. 子集 II](../problems/90.subsets-ii.md)
- [113. 路径总和 II](../problems/113.path-sum-ii.md)
- [131. 分割回文串](../problems/131.palindrome-partitioning.md)
- [1255. 得分最高的单词集合](../problems/1255.maximum-score-words-formed-by-letters.md)

## 总结

回溯的本质就是暴力枚举所有可能。要注意的是，由于回溯通常结果集都记录在回溯树的路径上，因此如果不进行撤销操作， 则可能在回溯后状态不正确导致结果有差异， 因此需要在递归到底部往上冒泡的时候进行撤销状态。

如果你每次递归的过程都拷贝了一份数据，那么就不需要撤销状态，相对地空间复杂度会有所增加。
