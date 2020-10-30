# 回溯

回溯是 DFS 中的一种技巧。回溯法采用 [试错](https://zh.wikipedia.org/wiki/%E8%AF%95%E9%94%99) 的思想，它尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案。

通俗上讲，回溯是一种走不通就回头的算法。

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

## 题目推荐

- [39. 组合总和](../problems/39.combination-sum.md)
- [40. 组合总和 II](../problems/40.combination-sum-ii.md)
- [46. 全排列](../problems/46.permutations.md)
- [47. 全排列 II](../problems/47.permutations-ii.md)
- [78. 子集](../problems/78.subsets.md)
- [90. 子集 II](../problems/90.subsets-ii.md)
- [113. 路径总和 II](../problems/113.path-sum-ii.md)
- [131. 分割回文串](../problems/131.palindrome-partitioning.md)
- [1255. 得分最高的单词集合](../problems/1255.maximum-score-words-formed-by-letters.md)
