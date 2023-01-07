# Run code and Huffman code

## Hu Hucode (哈 Hucode)

The basic idea of Huffman encoding is to use short encoding to represent characters with high frequency of occurrence, and long encoding to represent characters with low frequency of occurrence. This reduces the average length of the encoded string and the expected value of the length, so as to achieve the purpose of compression. Therefore, Huffman coding is widely used in the field of lossless compression. It can be seen that Huffman encoding is a variable encoding, not a fixed-length encoding.

The Huffman coding process consists of two main parts：

-Build a Huffman tree based on input characters -Traverse the Huffman tree and assign the nodes of the tree to characters

As mentioned above, his basic principle is to 'use short encodings to represent characters with high frequency of occurrence, and long encodings to represent characters with low frequency of occurrence`. Therefore, the first thing to do is to count the frequency of occurrence of characters, and then build a Huffman tree (also known as an optimal binary tree) based on the statistical frequency.

![Huffman-tree](. . /assets/thinkings/huffman-tree. webp)

As shown in the figure, the **Huffman tree is a binary tree**. Among them, the path of the left child node of the node is represented by 0, and the right child node is represented by 1. The value of the node represents its weight. The greater the weight, the smaller the depth. The depth is actually the length of the code. Usually we use the frequency of occurrence of characters as the weight. When encoding is actually performed, it is similar to a dictionary tree. Nodes are not used for encoding, and the paths of nodes are used for encoding.

> If the computer uses ternary instead of binary, then the Huffman tree should be a three-pronged tree.

## Example

For example, the result of our frequency statistics for a string is as follows：

| character | frequency |
| :-------: | :-------: |
|     a     |     5     |
|     b     |     9     |
|     c     |    12     |
|     d     |    13     |
|     e     |    16     |
|     f     |    45     |

-Construct each element into a node, that is, a tree with only one element. And build a minimum heap that contains all the nodes. The algorithm uses the minimum heap as the priority queue.

-'select two nodes with the smallest weights` and add a node with a weight of 5+9=14 as their parent node. And 'update the smallest heap`, now the smallest heap contains 5 nodes, of which 4 trees are still the original nodes, and the nodes with weights of 5 and 9 are merged into one.

The result is like this：

![huffman-example](https://p.ipic.vip/1wqdu2.jpg)

| character | frequency | encoding |
| :-------: | :-------: | :------: |
|     a     |     5     |   1100   |
|     b     |     9     |   1101   |
|     c     |    12     |   100    |
|     d     |    13     |   101    |
|     e     |    16     |   111    |
|     f     |    45     |    0     |

##run-length encode (run-length encoding)

Run-range encoding is a relatively simple compression algorithm. Its basic idea is to describe characters that are repeated and appear multiple times in a row (the number of consecutive occurrences, a certain character).

For example, a string：

```text
AAAAABBBBCCC
```

Using run code, it can be described as：

```text
5A4B3C
```

5A means that there are 5 consecutive A'S in this place, similarly 4B means that there are 4 consecutive B's, 3C means that there are 3 consecutive C's, and so on in other cases.

But in fact, the situation can be very complicated. We can encode a single character or multiple characters. Therefore, how to extract the sub-sequence is a problem. This is not as simple as it seems. Taking the above example as an example, we can also treat "AAAAABBBBCCC" as a whole as a sequence, so that the length of the encoding is encoded. Which method to use depends on the compression time and compression ratio. There are many more complicated situations, and no extensions will be made here.

It is more suitable for compressing files because there are a large number of consecutive duplicates of binaries in the file. A classic example is a BMP image with a large area of color blocks. Because BMP is not compressed, what you see is what the binary looks like when it is stored.

> This is also when our pictures tend to be solid colors, compression will have a good effect

Think about a question, if we store two pictures on a CDN, and the two pictures are almost exactly the same, can we optimize them? Although this is an issue that CDN manufacturers should be more concerned about, this issue still has a great impact on us and is worth thinking about.

## Summary

Both run-time encoding and Huffman are lossless compression algorithms, that is, the decompression process will not lose any content of the original data. In actual practice, we first encode it with a run, and then use Huffman to encode it again. They are used in almost all lossless compression formats, such as PNG, GIF, PDF, ZIP, etc.

For lossy compression, colors that cannot be recognized by humans, hearing frequency ranges, etc. are usually removed. In other words, the original data was lost. But since humans cannot recognize this part of the information, it is worthwhile in many cases. This kind of encoding that removes content that humans cannot perceive, we call it “perceptual encoding” (perhaps a new term created by ourselves), such as JPEG, MP3, etc. Regarding lossy compression is not the scope of discussion in this article. If you are interested, you can search for relevant information.

In fact, the principle of video compression is similar, except that video compression uses some additional algorithms, such as “time redundancy”, which means that only the changed parts are stored, and for the unchanging parts, it is enough to store once.

## Related topics

[900.rle-iterator](../problems/900.rle-iterator.md)
