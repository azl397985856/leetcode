# 布隆过滤器

## 场景

假设你现在要处理这样一个问题，你有一个网站并且拥有`很多`访客，每当有用户访问时，你想知道这个 ip 是不是第一次访问你的网站。

### hashtable 可以么

一个显而易见的答案是将所有的 IP 用 hashtable 存起来，每次访问都去 hashtable 中取，然后判断即可。但是题目说了网站有`很多`访客，假如有 10 亿个用户访问过，假设 IP 是 IPV4， 那么每个 IP 的长度是 4 byte，那么你一共需要 4 \* 1000000000 = 4000000000Bytes = 4G 。

如果是判断 URL 黑名单，由于每个 URL 会更长（可能远大于上面 IPV4 地址的 4 byte），那么需要的空间可能会远远大于你的期望。

### bit

另一个稍微难想到的解法是 bit， 我们知道 bit 有 0 和 1 两种状态，那么用来表示**存在**与**不存在**再合适不过了。

假如有 10 亿个 IP，就可以用 10 亿个 bit 来存储，那么你一共需要 1 \* 1000000000 = (4000000000 / 8) Bytes = 128M, 变为原来的 1/32, 如果是存储 URL 这种更长的字符串，效率会更高。 问题是，我们怎么把 IPV4 和 bit 的位置关联上呢？

比如`192.168.1.1` 应该是用第几位表示，`10.18.1.1` 应该是用第几位表示呢？ 答案是使用哈希函数。

基于这种想法，我们只需要两个操作，set(ip) 和 has(ip)，以及一个内置函数 hash(ip) 用于将 IP 映射到 bit 表。

这样做有两个非常致命的缺点：

1. 当样本分布极度不均匀的时候，会造成很大空间上的浪费

> 我们可以通过优化散列函数来解决

2. 当元素不是整型（比如 URL）的时候，BitSet 就不适用了

> 我们还是可以使用散列函数来解决， 甚至可以多 hash 几次

### 布隆过滤器

布隆过滤器其实就是`bit + 多个散列函数`。k 次 hash(ip) 会生成多个索引，并将其 k 个索引位置的二进制置为 1。

- 如果经过 k 个索引位置的值都为 1，那么认为其**可能存在**(因为有冲突的可能)。
- 如果有一个不为 1，那么**一定不存在**（一个值经过散列函数得到的值一定是唯一的），这也是布隆过滤器的一个重要特点。

也就是说布隆过滤器回答了：**可能存在** 和 **一定不存在** 的问题。

![bloom-filter-url](https://p.ipic.vip/1aeqlp.jpg)

从上图可以看出， 布隆过滤器本质上是由**一个很长的二进制向量**和**多个哈希函数**组成。

由于没有 hashtable 的 100% 可靠性，因此这本质上是一种**可靠性换取空间的做法**。除了可靠性，布隆过滤器删除起来也比较麻烦。

### 误报

上面提到了布隆过滤器回答了：**可能存在** 和 **一定不存在** 的问题。 因此当回答是**可能存在**的时候你该怎么做？一般而言， 为了宁可错杀一千，也不放过一个，我们认为他存在。 这个时候就产生了**误报**。

误报率和二进制向量的长度成反比。

### 布隆过滤器的应用

1. 网络爬虫

判断某个 URL 是否已经被爬取过

2. K-V 数据库 判断某个 key 是否存在

比如 Hbase 的每个 Region 中都包含一个 BloomFilter，用于在查询时快速判断某个 key 在该 region 中是否存在。

3. 钓鱼网站识别

浏览器有时候会警告用户，访问的网站很可能是钓鱼网站，用的就是这种技术

> 从这个算法大家可以对 tradeoff(取舍) 有更入的理解。

4. 恶意网站识别

总之， 如果你需要判断**一个项目是否在一个集合中出现过，并且需要 100% 确定没有出现过，或者可能出现过**，就可以考虑使用布隆过滤器。

### 代码

```java
public   class  MyBloomFilter {
     private static final int DEFAULT_SIZE =  2 << 31 ;
     private static final int[] seeds = new int [] {3,5,7,11,13,19,23,37 };
     private  BitSet  bits = new BitSet(DEFAULT_SIZE);
     private  SimpleHash[] func  = new  SimpleHash[seeds.length];

     public   static   void  main(String[] args) {
        //使用
        String value = "www.xxxxx.com" ;
        MyBloomFilter filter = new MyBloomFilter();
        System.out.println(filter.contains(value));
        filter.add(value);
        System.out.println(filter.contains(value));
    }
    //构造函数
     public  MyBloomFilter() {
         for  ( int  i  =   0 ; i  <  seeds.length; i ++ ) {
            func[i]  =   new  SimpleHash(DEFAULT_SIZE, seeds[i]);
        }
    }
     //添加网站
     public   void  add(String value) {
         for  (SimpleHash f : func) {
            bits.set(f.hash(value),  true );
        }
    }
     //判断可疑网站是否存在
     public   boolean  contains(String value) {
         if  (value  ==   null ) {
             return   false ;
        }
         boolean  ret  =   true ;
         for  (SimpleHash f : func) {
            //核心就是通过“与”的操作
            ret  =  ret  &&  bits.get(f.hash(value));
        }
         return  ret;
    }
}
```

## 总结

布隆过滤器回答了：**可能存在** 和 **一定不存在** 的问题。本质是一种空间和准确率的一个取舍。实际使用可能会有误报的情况， 如果你的业务可以接受误报，那么使用布隆过滤器进行优化是一个不错的选择。
