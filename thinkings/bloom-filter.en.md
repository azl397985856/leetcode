# Bloom filter

## Scene

Suppose you are dealing with such a problem now. You have a website and have `many` visitors. Whenever a user visits, you want to know if this ip is visiting your website for the first time.

## Is #hashtable okay?

An obvious answer is to store all the IPS in a hashtable, go to the hashtable to get them every time you visit, and then judge. But the title said that the website has `many` visitors. If there are 1 billion users who have visited, assuming that the IP is IPV4, then the length of each IP is 4 bytes, then you need a total of 4\*1000000000 = 4000000000bytes = 4G.

If it is to judge the URL blacklist, since each URL will be longer (probably much larger than the 4 bytes of the IPV4 address above), the space required may be much larger than you expect.

### bit

Another solution that is slightly difficult to think of is bit. We know that bit has two states of 0 and 1, so it is perfect to indicate that ** Exists** and \*\* does not exist.

If there are 1 billion IPS, you can use 1 billion bits to store them, then you need a total of 1 \* 1000000000 = (4000000000 / 8) Bytes = 128M, becomes 1/32 of the original. If you store a longer string like a URL, the efficiency will be higher. The question is, how do we associate IPV4 with the location of the bit?

For example, `192.168.1.1` should be denoted by the first digit, and `10.18.1.1` should be denoted by the first digit? The answer is to use a hash function.

Based on this idea, we only need two operations, set (ip) and has(ip), and a built-in function hash(ip) to map the IP to the bit table.

There are two very fatal disadvantages to doing this：

1. When the sample distribution is extremely uneven, it will cause a lot of waste of space.

> We can solve it by optimizing the hash function

2. When the element is not an integer (such as a URL), BitSet does not apply

> We can still use the hash function to solve it, or even hash a few more times

###Bloom filter

The Bloom filter is actually `bit + multiple hash functions`. The k-time hash (ip) will generate multiple indexes, and set the binary of its k index positions to 1.

-If the value of the k index positions is 1, then it is considered that there may be ** (because of the possibility of conflict). -If there is one that is not 1, then ** must not exist (the value of a value obtained by the hash function must be unique), which is also an important feature of the Bloom filter.

In other words, the Bloom filter answered: ** There may be ** and **There must be no ** questions.

![bloom-filter-url](https://p.ipic.vip/m7bvee.jpg)

As can be seen from the figure above, the Bloom filter is essentially composed of ** a long binary vector** and ** multiple hash functions**.

Since there is no 100% reliability of hashtable, this is essentially a practice of exchanging reliability for space. In addition to reliability, Bloom filters are also more troublesome to delete.

### False positive

The Bloom filter mentioned above answered: ** There may be ** and **There must be no ** questions. So what should you do when the answer is that **May exist**? Generally speaking, in order to kill a thousand by mistake rather than let one go, we think he exists. At this time, a false positive was generated.

The false positive rate is inversely proportional to the length of the binary vector.

### Application of Bloom filter

1. Web crawler

Determine whether a URL has been crawled

2. The K-V database determines whether a key exists

For example, each region of Hbase contains a BloomFilter, which is used to quickly determine whether a key exists in the region when querying.

3. Phishing site identification

Browsers sometimes warn users that the websites they visit are likely to be phishing websites, and this technique is used.

> From this algorithm, everyone can have a better understanding of tradeoff (trade-off).

4. Malicious website identification

In short, if you need to judge whether an item has appeared in a collection, and you need to be 100% sure that it has not appeared, or may have appeared, you can consider using the Bloom filter.

### Code

```java
public class MyBloomFilter {
private static final int DEFAULT_SIZE = 2 << 31 ;
private static final int[] seeds = new int [] {3,5,7,11,13,19,23,37 };
private BitSet bits = new BitSet(DEFAULT_SIZE);
private SimpleHash[] func = new SimpleHash[seeds. length];

public static void main(String[] args) {
//Use
String value = "www.xxxxx.com" ;
MyBloomFilter filter = new MyBloomFilter();
System. out. println(filter. contains(value));
filter. add(value);
System. out. println(filter. contains(value));
}
//Constructor
public MyBloomFilter() {
for ( int i = 0 ; i < seeds. length; i ++ ) {
func[i] = new SimpleHash(DEFAULT_SIZE, seeds[i]);
}
}
//Add website
public void add(String value) {
for (SimpleHash f : func) {
bits. set(f. hash(value), true );
}
}
//Determine whether suspicious websites exist
public boolean contains(String value) {
if (value == null ) {
return false ;
}
boolean ret = true ;
for (SimpleHash f : func) {
//The core is through the operation of "and"
ret = ret && bits. get(f. hash(value));
}
return ret;
}
}
```

## Summary

Bloom Filter answered: ** There may be ** and **There must be no ** questions. Essence is a trade-off between space and accuracy. There may be false positives in actual use. If your business can accept false positives, then using Bloom filters for optimization is a good choice.
