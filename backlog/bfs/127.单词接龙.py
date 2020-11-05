#
# @lc app=leetcode.cn id=127 lang=python3
#
# [127] 单词接龙
#

# @lc code=start

# BFS + 预处理

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        queue = collections.deque()
        queue.append(beginWord)
        visited = set()
        steps = 1
        pre = collections.defaultdict(list)
        for word in wordList:
            for i in range(len(word)):
                pre[word[:i] + '*' + word[i + 1:]].append(word)
        while queue:
            for _ in range(len(queue)):
                cur = queue.popleft()
                visited.add(cur)
                if cur == endWord:
                    return steps
                for i in range(len(cur)):
                    if cur[:i] + '*' + cur[i + 1:] in pre:
                        for neighbor in pre[cur[:i] + '*' + cur[i + 1:]]:
                            if neighbor not in visited:
                                queue.append(neighbor)
            steps += 1
        return 0

        # @lc code=end
