/*
 * @lc app=leetcode id=204 lang=javascript
 *
 * [204] Count Primes
 *
 * https://leetcode.com/problems/count-primes/description/
 *
 * algorithms
 * Easy (28.33%)
 * Total Accepted:    229.8K
 * Total Submissions: 798.7K
 * Testcase Example:  '10'
 *
 * Count the number of prime numbers less than a non-negative number, n.
 * 
 * Example:
 * 
 * 
 * Input: 10
 * Output: 4
 * Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
 * 
 * 
 */
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    // tag: 数论
    // if (n <= 2) return 0;
    // let compositionCount = 0;
    // for(let i = 3; i < n; i++) {
    //     for(let j = i - 1; j > 1 ; j--) {
    //         if (i % j === 0) {
    //             compositionCount++;
    //             break; // 找到一个就可以证明它不是质数了
    //         }
    //     }
    // }
    // return n - compositionCount - 2; // 需要减去1和n这两个数字


    // 上面的方法会超时，因此我们需要进行优化
    // 数学角度来看，如果一个数字可以分解为两个数字相乘（这两个数字不包括0和它本身），那么它就是合数
    const compositions = []; // compositions[i] 表示i是否是合数
    let count = 0;
    for(let i = 2; i < n; i++) {
        if (!compositions[i]) count++;
        for(let j = 2; i * j < n; j++) {
            compositions[i * j] = true;
        }
    }

    return count;

};

