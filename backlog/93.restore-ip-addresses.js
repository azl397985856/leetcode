/*
 * @lc app=leetcode id=93 lang=javascript
 *
 * [93] Restore IP Addresses
 */
function backtrack(list, tempList, s, start) {
  if (tempList.length === 4 && tempList.join("") === s && !list.includes(tempList.join("."))) {
    list.push(tempList.join("."));
  }
  if (tempList.length > 4) return;

  for (let i = start; i < s.length; i++) {
    for (let j = 0; j < 3; j++) {
      const r = s.slice(i, i + j + 1);
      if (+r > 255) continue;
      if (r[0] === '0' && r.length > 1) continue;
      tempList.push(r);
      backtrack(list, tempList, s, i + j + 1);
      tempList.pop();
    }
  }
}
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  // Given "25525511135",
  // return ["255.255.11.135", "255.255.111.35"].
  if (s.length > 3 * 4) return [];
  const list = [];
  backtrack(list, [], s, 0);
  return list;
};
