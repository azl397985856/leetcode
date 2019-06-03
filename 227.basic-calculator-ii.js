/*
 * @lc app=leetcode id=227 lang=javascript
 *
 * [227] Basic Calculator II
 */
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
  const chars = s.split('').filter(q => q);

  const stack = [];
  for(let c of chars) {
    if (!isNaN(c)) {
        stack.push(c);
    } else {
        const a  = stack.pop();
        const b  = stack.pop();

        if (c === '+') {
            stack.push(b + a);
        } else if (c === '-') {
            stack.push(b - a);
        } else if (c === '*') {
            stack.push(b * a);
        } else if (c === '/') {
            stack.push(Math.floor(b / a));
        }
    }
  }

  return stack.pop();

};

