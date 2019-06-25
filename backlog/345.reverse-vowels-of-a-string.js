/*
 * @lc app=leetcode id=345 lang=javascript
 *
 * [345] Reverse Vowels of a String
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    const res = s.split('');

    let start = 0;
    let end = s.length - 1;
    while(start < end) {
        const startVowel = vowels.includes(s[start]);
        const endVowel = vowels.includes(s[end]);
        if (startVowel && endVowel) {
            const temp = res[start];
            res[start] = res[end];
            res[end] = temp;
            start++;
            end--;
        } else if (startVowel) {
            end--;
        } else if (endVowel) {
            start++
        } else {
            start++;
            end--;
        }
    }

    return res.join('');
};

