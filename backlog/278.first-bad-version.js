/*
 * @lc app=leetcode id=278 lang=javascript
 *
 * [278] First Bad Version
 */
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let start = 0;
        let end = n;
        while(start <= end) {
            if (start === end) return start;
            const mid = start + ((end - start) >> 1);
            if (isBadVersion(mid)) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }
    };
};

