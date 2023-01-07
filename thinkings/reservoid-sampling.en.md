# Reservoir Sampling

The official label for the sampling question of the reservoir in the force buckle is 2 questions. According to my question-making situation, there may be three or four questions. The proportion is relatively low, and you can choose to master it according to your actual situation.

The algorithmic thinking of reservoir sampling is very clever, and the code is simple and easy to understand. Even if you don't master it, it is very good to understand it.

## Problem description

To give a data stream, we need to randomly select k numbers in this data stream. Due to the large length of this data stream, it needs to be processed while traversing, and it cannot be loaded into memory all at once.

Please write a random selection algorithm so that all data in the data stream is selected with equal probability.

There are many forms of expression for this kind of question. For example, let you randomly extract k points from a rectangle, randomly extract k words from a word list, etc., and ask you to wait for the probability to be randomly selected. No matter how the description changes, it is essentially the same. Today we will take a look at how to do this kind of question.

## Algorithm description

This algorithm is called reservoir sampling algorithm (reservoir sampling).

The basic idea is：

-Construct an array of size k and put the first k elements of the data stream into the array. -No processing is performed on the first k digits of the data stream. -Starting from the k+1st number of the data stream, choose a number rand between [1, i], where i means that it is currently the first number. -If rand is greater than or equal to k, do nothing -If rand is less than k, exchange rand and i, that is to say, select the current number instead of the selected number (spare tire). -Finally return to the surviving spare tire

The core of this algorithm is to first select a number with a certain probability, and then replace the previously selected number with another probability in the subsequent process. Therefore, in fact, the probability of each number being finally selected is ** The probability of being selected \* The probability of not being replaced **.

Pseudo code：

> A certain algorithm book referenced by the pseudo-code, with slight modifications.

```py
Init : a reservoir with the size： k
for i= k+1 to N
if(random(1, i) < k) {
SWAP the Mth value and ith value
}
```

Can this guarantee that the selected number is equal to the probability? The answer is yes.

-When i <=k, the probability of i being selected is 1. -At the k+1st number, the probability of the k+1st number being selected (the probability of walking into the if branch above) is $\frac{k}{k+1}$, at the k+2nd number, the probability of the k+2nd number being selected (the probability of walking into the if branch above) is $\frac{k}{k+2}$, and so on. Then the probability of the nth number being selected is $\frac{k}{n}$ -The probability of being selected is analyzed above, and the probability of not being replaced is analyzed next. When the k+1st number is reached, the probability of the first k numbers being replaced is $\frac{1}{k}$. When the first k+2 numbers are reached, the probability of the k+2 number being replaced is $\frac{1}{k}$, and so on. In other words, the probability of all being replaced is $\frac{1}{k}$. Knowing the probability of being replaced, the probability of not being replaced is actually 1-the probability of being replaced.

Therefore, for the first k numbers, the probability of being selected in the end is 1\* The probability of not being replaced by k+1\* The probability of not being replaced by k+2\*. . . The probability of not being replaced by n, that is, 1\* (1-probability of being replaced by k+ 1) \* (1-probability of being replaced by k+ 2)\*. . . (1-the probability of being replaced by n), that is, $1\times (1-\frac{k}{k+1} \times \frac{1}{k}) \times (1-\frac{k}{k+2} \times \frac{1}{k}) \times. . . \times (1-\frac{k}{n} \times \frac{1}{k}) = \frac{k}{n} $.

For the ith (i> k) number, the probability of being selected in the end is the probability of being selected in step I. The probability that it will not be replaced by step i+1 is the probability that it will not be replaced by Step i+1. . . \* The probability of not being replaced by step n, that is, $\frac{k}{k+1} \times(1-\frac{k}{k+2} \times \frac{1}{k}) \times. . . \times (1-\frac{k}{n} \times \frac{1}{k}) = \frac{k}{n} $.

In short, no matter which number it is, the probability of being selected is $\frac{k}{n}$, which satisfies the requirement of equal probability.

## Related topics

- [382. Random nodes in the linked list](https://leetcode-cn.com/problems/linked-list-random-node /"382. "Random nodes")
- [398. Random Number Index)(https://leetcode-cn.com/problems/random-pick-index /"398. Random number index")
- [497. Random points in non-overlapping rectangles](https://leetcode-cn.com/problems/random-point-in-non-overlapping-rectangles /"497. Random points in non-overlapping rectangles")

## Summary

The core code of the reservoir sampling algorithm is very simple. But it's not easy to think of, especially if you haven't seen it before. The core point is that the probability of each number being finally selected is ** The probability of being selected \* The probability of not being replaced **. So we can adopt a certain dynamic method, so that there is a probability of selecting and replacing some numbers in each round. Above, we have given a proof process with equal probability. You may wish to try to prove it yourself. After that, combine the relevant topics at the end of the article to practice, the effect will be better.
