# I have almost finished brushing all the linked topics of Lixu, and I found these things. 。 。

![](https://p.ipic.vip/y32bsg.jpg)

Let's start with the outline of this article. This is a brain map drawn by me with mindmap. After that, I will continue to improve it and gradually improve other topics.

> You can also use vscode blink-mind to open the source file to view. There are some notes in it that you can click to view. The source file can be obtained by replying to the brain map on my official account "Force Buckle Plus", and the brain map will continue to be updated with more content in the future. vscode plug-in address:https://marketplace.visualstudio.com/items?itemName=awehook.vscode-blink-mind

Hello everyone, this is lucifer. The topic that I bring to you today is "Linked List". Many people find this to be a difficult topic. In fact, as long as you master the trick, it is not that difficult. Next, let's talk about it.

[Linked List Tag](https://leetcode-cn.com/tag/linked-list /"Linked list tag") There are a total of ** 54 questions** in leetcode. In order to prepare for this topic, I spent a few days brushing almost all the linked list topics of leetcode.

![](https://p.ipic.vip/fdv0l4.jpg)

It can be seen that except for the six locked ones, I have brushed all the others. In fact, these six locked ones are not difficult, and they are even similar to the other 48 questions.

By focusing on these questions, I found some interesting information, and I will share it with you today.

<! -- more -->

## Introduction

Various data structures, whether they are linear data structures such as queues and stacks, or non-linear data structures such as trees and graphs, are fundamentally arrays and linked lists. Whether you are using an array or a linked list, you are using computer memory. Physical memory is composed of memory units of the same size, as shown in the figure.：

![](https://p.ipic.vip/4toqem.jpg)

(Figure 1. Physical memory)

Although arrays and linked lists use physical memory, they are very different in their physical use, as shown in the figure.：

![](https://p.ipic.vip/8e68pn.jpg)

(Figure 2. Physical storage diagram of arrays and linked lists)

It is not difficult to see that arrays and linked lists are just two ways to use physical memory.

Arrays are contiguous memory spaces, and usually the size of each unit is fixed, so they can be accessed randomly by pressing the label. The linked list is not necessarily continuous, so its lookup can only rely on other methods. Generally, we use a pointer called next to traverse the lookup. A linked list is actually a structure. For example, the definition of a possible single-linked list can be：

```ts
interface ListNode<T> {
  data: T;
  next: ListNode<T>;
}
```

Data is the data field that stores data, and next is a pointer to the next node.

A linked list is a kind of non-continuous, non-sequential storage structure on a physical storage unit. The logical order of data elements is realized by the order of pointers in the linked list. The linked list is composed of a series of nodes (each element in the linked list is called a node), and the nodes can be dynamically generated at runtime.

From the physical structure diagram above, it can be seen that an array is a contiguous space, and each item of the array is closely connected, so it is troublesome to perform insert and delete operations. The logarithm of Group Head of insertion and deletion time complexity is$O(N)$, while the average complexity is$O(N)$, only the tail of the Insert and delete is$O(1)$。 Simply put” "arrays are particularly friendly to queries, but unfriendly to deletions and additions“" In order to solve this problem, there is a data structure like a linked list. Linked lists are suitable for scenarios where data needs to be in a certain order, but frequent additions, deletions and deletions are required. For details, please refer to the "Basic Operations of Linked Lists" subsection later.

![](https://p.ipic.vip/kqyqnr.jpg)

(Figure 3. A typical logical representation of a linked list)

> All the following diagrams are based on the logical structure, not the physical structure

The linked list has only one back-drive node, next, and if it is a two-way linked list, there will be a front-drive node, pre.

> Have you ever wondered why there is only a binary tree instead of a one-pronged tree. In fact, a linked list is a special tree, that is, a tree.

## Basic operation of linked list

If you want to write the topic of linked lists, it is necessary to be familiar with the various basic operations and complexity of linked lists.

### Insert

Insertion only needs to consider the location of the precursor node and the successor node to be inserted (in the case of a two-way linked list, the successor node needs to be updated). Other nodes are not affected, so the operation time complexity of insertion with a given pointer is <code>O(1)</code>. The pointer in the given pointer here refers to the precursor node at the insertion position.

Pseudo code：

```

temp = the precursor node at the position to be inserted. next
The precursor node at the position to be inserted. Next = Pointer to be inserted
The pointer to be inserted. next = temp

```

If no pointer is given, we need to traverse to find the node first, so the worst case time complexity is <code>O(N)</code>.

> Tip 1: Consider the case of head-to-tail pointers.

> Tip 2: It is recommended for novices to draw pictures before writing code. After you are proficient, you naturally don't need to draw pictures.

### Delete

You only need to correct the next pointer of the precursor pointer of the node that needs to be deleted to its next node, and pay attention to the boundary conditions.

Pseudo code：

```
The precursor node of the location to be deleted. Next = The precursor node of the location to be deleted. next. next
```

> Tip 1: Consider the case of head-to-tail pointers.

> Tip 2: It is recommended for novices to draw pictures before writing code. After you are proficient, you naturally don't need to draw pictures.

### Traversing

Traversing is relatively simple, go directly to the pseudo-code.

Iterative pseudo-code：

```
Current pointer = header pointer
While the current node is not empty {
print (current node)
Current pointer = current pointer. next
}

```

A recursive pseudo-code for preorder traversal：

```jsx
dfs(cur) {
If the current node is empty return
print(cur. val)
return dfs(cur. next)
}
```

## How big is the difference between a linked list and an array?

Friends who are familiar with me should often hear me say a sentence, that is, arrays and linked lists are also linear array structures. The two are the same in many ways, only there are differences in subtle operations and usage scenarios. However, the usage scenarios are difficult to investigate directly in the topic.

> In fact, usage scenarios can be memorized by rote.

Therefore, for our questions, the differences between the two are usually just minor operational differences. So everyone may not feel strongly enough, let me give you a few examples.

Traversal of arrays：

```java

for(int i = 0; i < arr. size();i++) {
print(arr[i])
}

```

Traversing the linked list：

```java
for (ListNode cur = head; cur ! = null; cur = cur. next) {
print(cur. val)
}
```

Is it very similar?

**It can be seen that the logic of the two is the same, but the subtle operations are different. **For example：

-The array is an index ++ -The linked list is cur = cur. next

What if we need to traverse in reverse order?

```java
for(int i = arr. size() - 1; i > - 1;i--) {
print(arr[i])
}
```

If it is a linked list, it usually requires the help of a two-way linked list. However, two-way linked lists have very few topics in force deduction, so most of them you can't get the precursor node, which is why many times you record a precursor node pre by yourself.

```java
for (ListNode cur = tail; cur ! = null; cur = cur. pre) {
print(cur. val)
}
```

If you add an element to the end of the array, it means：

```java
arr. push(1)
```

In the case of linked lists, many languages do not have built-in array types. For example, force buckle usually uses the following classes to simulate.

```java
public class ListNode {
int val;
ListNode next;
ListNode() {}
ListNode(int val) { this. val = val; }
ListNode(int val, ListNode next) { this. val = val; this. next = next; }
}
```

We cannot directly call the push method. Think about it, if you are allowed to achieve this, what do you do? You can think about it for yourself before looking down.

3. . . 2. . . 1

ok, it's actually very simple.

```java
// Suppose tail is the tail node of the linked list
tail. next = new ListNode('lucifer')
tail = tail. next
```

After the above two lines of code, tail still points to the tail node. Isn't it very simple, have you learned it?

What's the use of this? For example, some topics require you to copy a new linked list. Do you need to open up a new linked list header, and then keep splicing (pushing) the copied nodes? This is used.

The same is true for the bottom layer of arrays. A possible array is implemented at the bottom level.：

```java
arr. length += 1
arr[arr. length - 1] = 'lucifer'
```

To sum up, there are many logical similarities between arrays and linked lists. The difference is only some usage scenarios and operation details. For doing questions, we usually pay more attention to the operation details. Regarding the details, I will introduce it to you next. This subsection mainly lets you know that the two are similar in thought and logic.

Some friends do linked list questions, first replace the linked list with an array, and then use an array to do it. I do not recommend this approach. This is tantamount to denying the value of linked lists. Children should not imitate it.

## How difficult is the linked list question?

This question is really not difficult. It is not difficult to say that there is evidence. Taking the LeetCode platform as an example, there are only two difficult topics.

![](https://p.ipic.vip/5h1s19.jpg)

Among them, Question 23 basically has no linked list operation. A conventional "merge and sort" can be done, and merging two ordered linked lists is a simple question. If you know how to merge and sort arrays and merge two ordered linked lists, you should easily win this question.

> Merging two ordered arrays is also a simple problem, and the difficulty of the two is almost the same.

For Question 25, I believe you can make it out after reading the contents of this section.

However, despite that, many children still told me that ”the pointer faints when it goes around“ and ”it's always in an endless loop.“ 。 。 。 。 。 Is this topic really that difficult? How do we crack it? Lucifer has prepared a formula, one principle, two question types, three precautions, and four techniques for everyone, so that you can easily solve the linked list questions and never be afraid of tearing the linked list by hand. Let's take a look at the content of this formula in turn.

## A principle

One principle is to draw pictures, especially for novices. Whether it is a simple question or a difficult problem, you must draw a picture. This is a criterion that runs through the linked list of questions.

Drawing pictures can reduce our cognitive burden. This is actually the same as drawing drafts and memorizing memoranda. Put the things that exist in your mind on paper. An inappropriate example is that your brain is the CPU, and your brain's memory is the register. The capacity of the register is limited. We need to put the things that are not used so frequently into the memory and use the register where it should be used. This memory is everything you can draw on paper or a computer tablet.

It doesn't matter if the painting looks good or not, just be able to see it clearly. Just sketch it with a pen, and it's enough to see the relationship.

## Two test centers

I did the linked list of force buttons all over. An interesting phenomenon was found, that is, there are very single test centers in the United States. Except for design questions, there are no two points in the test center.：

-Pointer modification -Splicing of linked lists

### Pointer modification

Among them, the most typical pointer modification is the reversal of the linked list. In fact, isn't the reversal of the linked list just modifying the pointer?

For arrays, a data structure that supports random access, inversion is easy, as long as the head and tail are constantly exchanged.

```js
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
  return arr;
}
```

For linked lists, it is not that easy. There are simply not too many questions about reversing the linked list.

Today I wrote one of the most complete list inversions for everyone, and I can use it directly when I come across it in the future. Of course, the premise is that everyone must understand before setting it up.

Next, I want to implement an inversion of any linked list.\*\*

```py
Reverse (self, head: ListNode, tail: ListNode).
```

Where head refers to the head node that needs to be reversed, and tail refers to the tail node that needs to be reversed. It is not difficult to see that if head is the head of the entire linked list and tail is the end of the entire linked list, then the entire linked list is reversed, otherwise the local linked list is reversed. Next, let's implement it.

First of all, all we have to do is draw pictures. I have talked about this in the **A Principle** section.

As shown in the figure below, is the part of the linked list that we need to reverse：

![](https://p.ipic.vip/zjpjco.jpg)

And we expect it to look like this after reversal：

![](https://p.ipic.vip/8trs7c.jpg)

It is not difficult to see that ** Can finally return to tail**.

Due to the recursiveness of the linked list, in fact, we only need to reverse the two adjacent ones, and the rest can be done in the same way.

> Linked lists are a kind of recursive data structure, so using the idea of recursion to consider it often does more with half the effort. Thinking about linked lists recursively will be expanded in the "Three Notes" section later.

![](https://p.ipic.vip/ev3ox7.jpg)

For the two nodes, we only need to modify the pointer once, which seems not difficult.

```java
cur. next = pre
```

![](https://p.ipic.vip/g8cwne.jpg)

It is this operation that not only abruptly has a ring, but also makes you cycle endlessly. They also let them part ways that shouldn't be cut off.

It is not difficult to solve the problem of parting ways. We only need to record the next node before reversing.：

```java
next = cur. next
cur. next = pre

cur = next
```

![](https://p.ipic.vip/ejtmfc.jpg)

What about the ring? In fact, the ring does not need to be solved. Because if we traverse from front to back, then in fact, the previous linked list has been reversed, so my picture above is wrong. The correct picture should be：

![](https://p.ipic.vip/uuyodd.jpg)

So far, we can write the following code：

```py
# Flip a sub-linked list and return a new head and tail
def reverse(self, head: ListNode, tail: ListNode):
cur = head
pre = None
while cur ! = tail:
# Leave contact information
next = cur. next
# Modify pointer
cur. next = pre
# Keep going down
pre = cur
cur = next
# The new head and tail nodes after reversal are returned
return tail, head
```

If you look closely, you will find that our tail has not actually been reversed. The solution is very simple, just pass in the node after tail as a parameter.

```py
class Solution:
# Flip a sub-linked list and return a new header and tail
def reverse(self, head: ListNode, tail: ListNode, terminal:ListNode):
cur = head
pre = None
while cur ! = terminal:
# Leave contact information
next = cur. next
# Modify pointer
cur. next = pre

# Keep going down
pre = cur
cur = next
# The new head and tail nodes after reversal are returned
return tail, head
```

I believe you already have a certain understanding of inverted linked lists. We will explain this issue in more detail later, so please leave an impression first.

### Splicing of linked lists

Have you found that I always like to wear (stitching) things around? For example, reverse the linked list II, and then merge the ordered linked list.

Why do you always like to wear it around? In fact, this is the value of the existence of the linked list, and this is the original intention of designing it!

The value of linked lists lies in the fact that they ** do not require the continuity of physical memory, and are friendly to insertion and deletion**. This can be seen in the physical structure diagram of the linked list and array at the beginning of the article.

Therefore, there are many splicing operations on the linked list. If you know the basic operation of the linked list I mentioned above, I believe it can't beat you. Except for rings, boundaries, etc. 。 。 ^\_^. We will look at these questions later.

## Three notes

The most error-prone place of linked lists is where we should pay attention. 90% of the most common errors in linked lists are concentrated in the following three situations：

-A ring appeared, causing an endless loop. -The boundary cannot be distinguished, resulting in an error in the boundary condition. -Don't understand what to do recursively

Next, let's take a look one by one.

### Ring

There are two test centers in the ring：

-The topic may have a ring, allowing you to judge whether there is a ring and the location of the ring. -The list of topics has no ring, but the ring has been rounded out by your operation pointer.

Here we will only discuss the second one, and the first one can use the \*\*speed pointer algorithm we mentioned later.

The simplest and most effective measure to avoid the appearance of rings is to draw a picture. If two or more linked list nodes form a ring, it is easy to see through the picture. Therefore, a simple practical technique is to draw a picture first, and then the operation of the pointer is reflected in the picture.

But the list is so long, it is impossible for me to draw it all. In fact, it is not necessary at all. As mentioned above, linked lists are recursive data structures. Many linked list problems are inherently recursive, such as reversing linked lists, so just draw a substructure. **This knowledge, we will explain it in the **preface\*\*part later.

### Boundary

What many people are wrong is that they do not consider boundaries. One technique for considering boundaries is to look at the topic information.

-If the head node of the topic may be removed, then consider using a virtual node, so that the head node becomes an intermediate node, and there is no need to make special judgments for the head node. -The title asks you to return not the original head node, but the tail node or other intermediate nodes. At this time, pay attention to the pointer changes.

The specific content of the above two parts, we will explain in the virtual head part that we will talk about later. As an old rule, everyone can leave an impression.

### Preface

Ok, it's time to fill the pit. As mentioned above, the linked list structure is inherently recursive, so using recursive solutions or recursive thinking will help us solve problems.

In [binary tree traversal](https://github.com/azl397985856/leetcode/blob/master/thinkings/binary-tree-traversal.md) In the part, I talked about the three popular traversal methods of binary trees, namely pre-sequence traversal, middle-sequence traversal, and post-sequence traversal.

The front, middle and back order actually refers to the processing order of the current node relative to the child nodes. If the current node is processed first and then the child nodes are processed, then it is the preamble. If you process the left node first, then the current node, and finally the right node, it is a middle-order traversal. The subsequent traversal is naturally the final processing of the current node.

In the actual process, we will not buckle and die like this. For example：

```py
def traverse(root):
print('pre')
traverse(root. left)
traverse(root. righ)
print('post')

```

As in the above code, we have logic both before entering the left and right nodes, and after exiting the left and right nodes. What kind of traversal method is this? In a general sense, I am used to only looking at the position of the main logic. If your main logic is in the back, it will be traversed in the back order, and the main logic will be traversed in the front order. This is not the point. It will not help us solve the problem much. What will help us solve the problem is what we will talk about next.

> Most topics are single-linked lists, and single-linked lists have only one successor pointer. Therefore, there are only preorder and postorder, and there is no middle order traversal.

Let's take the classic inverted linked list mentioned above. If it is a preorder traversal, our code looks like this：

```py
def dfs(head, pre):
if not head: return pre
next = head. next
## The main logic (change pointer) is behind
head. next = pre
dfs(next, head)

dfs(head, None)
```

The code for subsequent traversal looks like this：

```py

def dfs(head):
if not head or not head. next: return head
res = dfs(head. next)
# The main logic (changing the pointer) is after entering the subsequent node, that is, the process of recursively returning will be executed to
head. next. next = head
head. next = None

return res
```

It can be seen that these two writing methods are not the same regardless of boundaries, input parameters, or code. Why is there such a difference?

It is not difficult to answer this question. Everyone only needs to remember a very simple sentence, that is, if it is a preorder traversal, then you can imagine that the previous linked list has been processed, and it doesn't matter how it is processed. Accordingly, if it is a back-order traversal, then you can imagine that the subsequent linked lists have been processed, and it doesn't matter how they are processed. There is no doubt about the correctness of this sentence.

The figure below is the picture we should draw when traversing the preface. Just focus on the box (substructure) in the middle, and pay attention to two points at the same time.

1. The previous one has been processed
2. The rest hasn't been processed yet

![](https://p.ipic.vip/o6vkeo.jpg)

Accordingly, it is not difficult for us to write the following recursive code. The code comments are very detailed. Just look at the comments.

```py
def dfs(head, pre):
if not head: return pre
# Leave the contact information (since the latter ones have not been processed, you can use head. Next Navigate to the next)
next = head. next
# The main logic (changing the pointer) is in front of entering the back node (since the previous ones have been processed, there will be no ring)
head. next = pre
dfs(next, head)

dfs(head, None)
```

What if it is a back-order traversal? The old rule, adhering to one of our principles, **Draw a picture first**.

![](https://p.ipic.vip/w9qk6z.jpg)

It is not difficult to see that we can pass head. Next gets the next element, and then points the next of the next element to itself to complete the reversal.

It is expressed in code:

```py
head. next. next = head
```

![](https://p.ipic.vip/6ttbmh.jpg)
