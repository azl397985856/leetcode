# Picture

Graph Theory is a branch of mathematics. It takes pictures as the research object. A graph in graph theory is a graph composed of a number of given points and lines connecting two points. This kind of graph is usually used to describe a specific relationship between certain things. Points are used to represent things, and lines connecting two points are used to indicate that there is such a relationship between the corresponding two things.

The following is a logical diagram structure：

![Logical diagram structure](https://p.ipic.vip/ygw8ii.jpg)

Graphs are one of the most complex data structures. The data structures mentioned earlier can be regarded as special cases of graphs. Then why don't you just use diagrams for all of them, and divide them into so many data structures?

This is because many times you don't need to use such complex functions, and many of the features of diagrams are not available. If they are all called diagrams in general, it is very detrimental to communication. If you want you to communicate with others, you can't say that this question is to investigate a special kind of diagram, this kind of diagram. 。 。 。 This is too long-winded, so I gave special names to the special pictures of other pictures, so that it is easy to communicate. Until we encounter a very complicated situation, we will not use the “real" picture.

As mentioned in the previous chapter, the data structure is for algorithm services, and the data structure is for storing data, and the purpose is to be more efficient. \*\* So when do you need to use graphs to store data, and where is the graph efficient in this case? The answer is very simple, that is, if you can't store it well with other simple data structures, you should use graphs. For example, if we need to store a two-way friend relationship, and this kind of friend relationship is many-to-many, then we must use graphs, because other data structures cannot be simulated.

## Basic Concept

### Undirected Graph & Directed Graph〔Directed Graph & Deriected Graph〕

As mentioned earlier, binary trees can realize other tree structures. Similarly, directed graphs can also realize undirected graphs and mixed graphs. Therefore, the study of directed graphs has always been the focus of investigation.

**All diagrams mentioned in this article are directed diagrams**.

As mentioned earlier, we use a line connecting two points to indicate that there is this relationship between the corresponding two things. Therefore, if the relationship between two things is directional, it is a directed graph, otherwise it is an undirected graph. For example: A knows B, then B does not necessarily know A. Then the relationship is one-way, and we need to use a directed graph to represent it. Because if it is represented by an undirected graph, we cannot distinguish whether the edges of A and B indicate whether A knows B or B knows A.

Traditionally, when we draw pictures, we use arrows to represent directed graphs, and arrows without arrows to represent undirected graphs.

### Right Graph & Right Graph〔 Weighted Graph & Unweighted Graph〕

If the edge is weighted, it is a weighted graph (or a weighted graph), otherwise it is a weighted graph (or a weighted graph). So what is the weight of authority? For example, the exchange rate is a kind of logic diagram with weight. If 1 currency A is exchanged for 5 currency B, then the weight of the sides of A and B is 5. And a relationship like a friend can be seen as a kind of figure without authority.

### In degree & Out degree [Indegree & Outdegree]

How many edges point to node A, then the degree of entry of node A is what. Similarly, how many edges are emitted from A, then the degree of exit of node A is what.

Still take the figure above as an example. The entry and exit degrees of all nodes in this figure are 1.

![](https://p.ipic.vip/w21lsl.jpg)

### Path & Ring [Path: Path]

-Cyclic Graph [Cyclic Graph] The graph above is a cyclic graph, because we trigger from a certain point in the graph and we can go back to the starting point. This is the same as the ring in reality. -Acircular Graph〔Acyclic Graph〕

I can transform the figure above into a loop-free diagram with a little modification. At this time, there is no loop.

![](https://p.ipic.vip/b0gk9e.jpg)

### Connectedness Diagram & Strong Connectedness Diagram

In an undirected graph, if ** Any two vertex ** i and j have paths ** communicating**, the undirected graph is called a connected graph.

In a directed graph, if any two vertices, i and j, have paths that are connected to each other, the directed graph is called a strongly connected graph.

### 生树树

The spanning tree of a connected graph refers to a connected subgraph that contains all n vertices in the graph, but only n-1 edges that are sufficient to form a tree. A spanning tree with n vertices has and only has n-1 edges. If another edge is added to the spanning tree, it must form a ring. Among all the spanning trees of the connected network, the one with the lowest cost and smallest cost of all edges is called the smallest cost tree, where the cost and cost refer to the sum of the weights of all edges.

## The establishment of the figure

The title of a general graph will not give you a ready-made graph data structure. When you know that this is a graph problem, the first step in solving the problem is usually to build a graph.

The above is all about the logical structure of diagrams, so how can diagrams in computers be stored?

We know that the graph is composed of edges and edges. In theory, we only need to store all the edge relationships in the graph, because the edges already contain the relationship between the two points.

Here I will briefly introduce two common mapping methods: adjacency matrix (commonly used, important) and adjacency table.

###Adjacency Matrix (common)〔Adjacency Matrixs〕

The first way is to use arrays or hash tables to store graphs. Here we use two-dimensional arrays to store graphs.

Use an n\*n matrix to describe the graph graph, which is a two-dimensional matrix, where graph[i][j] describes the relationship between edges.

Generally speaking, for all graphs, I use graph[i][j]=1 to indicate that there is an edge between vertex i and vertex j, and the direction of the edge is from i to J. Use graph[i][j]= 0 to indicate that there is no edge between vertex i and vertex J. For this graph, we can store other numbers, which represent weights.

![](https://p.ipic.vip/0fmltq.jpg)

It can be seen that the picture above is diagonally symmetrical, so we only need to look at half of it, which causes half of the space to be wasted.

The spatial complexity of this storage method is O(n ^2), where n is the number of vertices. If it is a sparse graph (the number of edges in the graph is much smaller than the number of vertices), it will be a waste of space. And if the graph is an undirected graph, there will always be at least 50% waste of space. The figure below also intuitively reflects this.

The main advantages of adjacency matrix are：

1. Intuitive and simple.

2. Determine whether the two vertices are connected, obtain the degree of entry and exit, and the degree of update. The time complexity is O(1).

Since it is relatively simple to use, all my topics that need to be mapped basically use this method.

For example, force buckle 743. Network delay time. Title description：

```
There are N network nodes, marked as 1 to N.

Given a list of times, it represents the transmission time of the signal through the directed edge. Times [i] = (u, v, w), where u is the source node, v is the target node, and w is the time when a signal is transmitted from the source node to the target node.

Now, we send a signal from a certain node K. How long will it take for all nodes to receive the signal? If all nodes cannot receive the signal, return -1.


example：

Input: times = [[2,1,1],[2,3,1],[3,4,1]], N= 4, K= 2
Output: 2


note:

The range of N is between [1, 100].
The range of K is between [1, N].
The length of times is between [1,6000].
All edges times [i]= (u, v, w) have 1 <= u, v <= N and 0 <= w <=100.

```

This is a typical graph question. For this question, how do we use the adjacency matrix to build a graph?

A typical drawing code：

Use hash table to build adjacency matrix：

```py
graph = collections. defaultdict(list)
for fr, to, w in times:
graph[fr - 1]. append((to - 1, w))
```

Use a two-dimensional array to build an adjacency matrix：

```py
graph=[[0]*n for _ in range(m)]#Create a new two-dimensional matrix of m*n

for fr, to, w in times:
graph[fr-1][to-1] = w
```

This constructs a critical matrix, and then we can traverse the graph based on this adjacency matrix.

###Adjacency List〔Adjacency List〕

For each point, a linked list is stored, which is used to point to all points directly connected to that point. For a linked graph, the value of the element in the linked list corresponds to the weight.

For example, in an undirected graph：

![graph-1](https://p.ipic.vip/j7nlpi.jpg) (Picture from https://zhuanlan.zhihu.com/p/25498681 )

It can be seen that in an undirected graph, the adjacency matrix is symmetrical about the diagonal, and the adjacency list always has two symmetrical edges.

And in a directed graph：

![graph-2](https://p.ipic.vip/o6jq46.jpg)

(Picture from https://zhuanlan.zhihu.com/p/25498681 )

Because adjacency tables are a bit troublesome to use, they are also not commonly used. In order to reduce the cognitive burden on beginners, I will not post codes.

## Traversal of the graph

The diagram is established, and the next step is to traverse it.

No matter what algorithm you use, you must traverse it. There are generally two methods: depth-first search and breadth-first search (other wonderful traversal methods are of little practical significance, and there is no need to learn).

No matter what kind of traversal it is, if the graph has a loop, it is necessary to record the access of nodes to prevent endless loops. Of course, you may not need to really use a collection to record the access of nodes. For example, use a data in-place tag outside the data range. The spatial complexity of this will be $O(1)$.

Here, take a directed graph as an example, and a directed graph is similar. I will not repeat them here.

> Regarding the search for pictures, the subsequent search topics will also be introduced in detail, so click here.

### Depth First traversal [Depth First Search, DFS]

The depth-first method of traversing the graph is to start from a certain vertex v in the graph and continue to visit the neighbors, and the neighbors of the neighbors until the access is complete.

![](https://p.ipic.vip/oso066.jpg)

As shown in the figure above, IF we use DFS and start from node A, **A possible** access order is: **A->C-> B-> D-> F->G->E**, Of course, it may also be **A->D->C->B->F->G->E**, etc., Depending on your code, but THEY are all depth-first.

### Breadth First Search [Breadth First Search, BFS]

Breadth-first search can be vividly described as "shallow and endless". It also requires a queue to maintain the order of the traversed apex so that the adjacent apex of these apex can be accessed in the order of dequeue.

![](https://p.ipic.vip/54jwlt.jpg)

As shown in the figure above, IF we use BFS and start from node A, ** A possible** access order is: ** A->B-> C-> F-> E->G-> D**, Of course, it may also be **A->B->F->E->C->G->D**, etc., Depending on your code, but they are all breadth-first.

It should be noted that DFS and BFS are only an algorithmic idea, not a specific algorithm. Therefore, it has strong adaptability, rather than being limited to characteristic data structures. The diagrams mentioned in this article can be used, and the trees mentioned earlier can also be used. In fact, as long as it is a non-linear data structure, it can be used.

## Common algorithms

The algorithm of the title of the figure is more suitable for a set of templates.

Here are several common board questions. The main ones are：

- Dijkstra
- Floyd-Warshall -Minimum spanning tree (Kruskal & Prim) This subsection has been deleted at present. I feel that what I wrote is not detailed enough. After the supplement is completed, it will be opened again. -A star pathfinding algorithm -Two-dimensional diagram (dyeing method) [Bipartitie] -Topological Sort〔 Topological Sort〕

The templates for common algorithms are listed below.

> All the templates below are based on adjacency matrix modeling.

It is strongly recommended that you learn the following classic algorithm after you have finished the search for special articles. You can test a few ordinary search questions, and if you can make them, you can learn more. Recommended topic: [Maximize the value of the path in a picture](https://leetcode-cn.com/problems/maximum-path-quality-of-a-graph / "Maximize the value of the path in a picture")

### Shortest distance, shortest path

#### Dijkstra algorithm

DIJKSTRA'S BASIC IDEA IS THAT BREADTH TAKES PRIORITY. In fact, the basic idea of the shortest circuit algorithm for search is that breadth takes first, but the specific expansion strategies are different.

THE DIJKSTRA ALGORITHM MAINLY SOLVES THE SHORTEST DISTANCE FROM ANY POINT IN THE GRAPH TO ANY OTHER POINT IN THE GRAPH, WHICH IS THE SHORTEST PATH OF A SINGLE SOURCE.

> The name Dijkstra is more difficult to remember. You can simply mark it as **DJ\***. Is it easy to remember a lot?

For example, give you several cities and the distance between them. Let you plan the shortest route from City a to City B.

For this problem, we can first map the distance between cities, and then use dijkstra to do it. So how exactly does dijkstra calculate the shortest path?

The basic idea of dj algorithm is greed. Starting from the starting point, start, traverse all neighbors every time, and find the smallest distance from it, which is essentially a kind of breadth-first traversal. Here we use the data structure of the heap to make it possible to find the point with the smallest cost in the time of $logN$.

> And if you use an ordinary queue, it is actually a special case where the weights of all edges in the graph are the same.

For example, we are looking for the shortest distance from point start to point end. We expect the dj algorithm to be used in this way.

For example, a picture looks like this：

```
E -- 1 --> B -- 1 --> C -- 1 --> D -- 1 --> F
\ /\
\ ||
-------- 2 ---------> G ------- 1 ------
```

We use the adjacency matrix to construct：

```py
G = {
"B": [["C", 1]],
"C": [["D", 1]],
"D": [["F", 1]],
"E": [["B", 1], ["G", 2]],
"F": [],
"G": [["F", 1]],
}

shortDistance = dijkstra(G, "E", "C")
print(shortDistance) # E -- 3 --> F -- 3 --> C == 6
```

Specific algorithm：

1. Initialize the heap. The data in the heap is the binary ancestor of (cost, v), which means “the distance from start to v is cost”. Therefore, in the initial case, tuples (0, start) are stored in the heap.
2. Pop out a (cost, v) from the heap, and the first pop out must be (0, start). If v has been accessed, then skip to prevent the ring from being generated.
3. If v is the end point we are looking for, return directly to cost. The cost at this time is the shortest distance from start to that point.
4. Otherwise, put the neighbors of v into the heap, and (neibor, cost + c) will be added to the heap soon. Where neibor is the neighbor of v, and c is the distance from v to neibor (that is, the cost of transfer).

Repeat 2-4 steps

Code template：

Python

```py
import heapq


def dijkstra(graph, start, end):
# The data in the heap is the binary ancestor of (cost, i), which means “the distance from start to i is cost”.
heap = [(0, start)]
visited = set()
while heap:
(cost, u) = heapq. heappop(heap)
if u in visited:
continue
visited. add(u)
if u == end:
return cost
for v, c in graph[u]:
if v in visited:
continue
next = cost + c
heapq. heappush(heap, (next, v))
return -1
```

JavaScript

```JavaScript
const dijkstra = (graph, start, end) => {
const visited = new Set()
const minHeap = new MinPriorityQueue();
//Note: Here new MinPriorityQueue() uses LC's built-in API, and its inqueue consists of two parts：
//Element and priority.
//The heap will be sorted by priority, and you can use element to record some content.
minHeap. enqueue(startPoint, 0)

while(! minHeap. isEmpty()){
const {element, priority} = minHeap. dequeue();
//The following two variables are not necessary, they are just easy to understand
const curPoint = element;
const curCost = priority;

if(curPoint === end) return curCost;
if(visited. has(curPoint)) continue;
visited. add(curPoint);

if(! graph[curPoint]) continue;
for(const [nextPoint, nextCost] of graph[curPoint]){
if(visited. has(nextPoint)) continue;
//Note that the distance in the heap must be from the startpoint to a certain point；
//The distance from curPoint to nextPoint is nextCost; but curPoint is not necessarily startPoint.
const accumulatedCost = nextCost + curCost;
minHeap. enqueue(nextPoint, accumulatedCost);
}
}
return -1
}
```

After knowing this algorithm template, you can go to AC 743. The network delay time is up.

The complete code is provided here for your reference：

Python

```py
class Solution:
def dijkstra(self, graph, start, end):
heap = [(0, start)]
visited = set()
while heap:
(cost, u) = heapq. heappop(heap)
if u in visited:
continue
visited. add(u)
if u == end:
return cost
for v, c in graph[u]:
if v in visited:
continue
next = cost + c
heapq. heappush(heap, (next, v))
return -1
def networkDelayTime(self, times: List[List[int]], N: int, K: int) -> int:
graph = collections. defaultdict(list)
for fr, to, w in times:
graph[fr - 1]. append((to - 1, w))
ans = -1
for to in range(N):
dist = self. dijkstra(graph, K - 1, to)
if dist == -1: return -1
ans = max(ans, dist)
return ans
```

JavaScript

```JavaScript
const networkDelayTime = (times, n, k) => {
//Ahem, this solution is not Dijkstra's best solution to this question
const graph = {};
for(const [from, to, weight] of times){
if(! graph[from]) graph[from] = [];
graph[from]. push([to, weight]);
}

let ans = -1;
for(let to = 1; to <= n; to++){
let dist = dikstra(graph, k, to)
if(dist === -1) return -1;
ans = Math. max(ans, dist);
}
return ans;
};

const dijkstra = (graph, startPoint, endPoint) => {
const visited = new Set()
const minHeap = new MinPriorityQueue();
//Note: Here new MinPriorityQueue() uses LC's built-in API, and its inqueue consists of two parts：
//Element and priority.
//The heap will be sorted by priority, and you can use element to record some content.
minHeap. enqueue(startPoint, 0)

while(! minHeap. isEmpty()){
const {element, priority} = minHeap. dequeue();
//The following two variables are not necessary, they are just easy to understand
const curPoint = element;
const curCost = priority;
if(visited. has(curPoint)) continue;
visited. add(curPoint)
if(curPoint === endPoint) return curCost;

if(! graph[curPoint]) continue;
for(const [nextPoint, nextCost] of graph[curPoint]){
```
