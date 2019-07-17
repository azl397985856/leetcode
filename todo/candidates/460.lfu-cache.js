/*
 * @lc app=leetcode id=460 lang=javascript
 *
 * [460] LFU Cache
 */
/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
  this.capacity = capacity;

  this.cache = {};
  this.size = 0;
  this.freq = {};
  this.minFreq = null;
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  const hit = this.cache[key];
  if (hit === void 0) return -1;

  // 删除
  this.freq[hit.count] = this.freq[hit.count].filter(k => k !== key);

  // 更新
  hit.count++;
  if (this.freq[hit.count] === void 0) {
    this.freq[hit.count] = [];
  }
  this.freq[hit.count].push(key);
  // increament
  if (this.freq[this.minFreq].length === 0) this.minFreq++;

  return hit.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.capacity === 0) return;

  if (this.get(key) !== -1) {
    return (this.cache[key].value = value);
  }

  if (this.size === this.capacity) {
    // 删除
    const evictedKey = this.freq[this.minFreq][0];
    // console.log(this.freq[this.minFreq]);
    delete this.cache[evictedKey];
    this.size--;
    this.freq[this.minFreq].shift();
  }
  this.size++;

  this.cache[key] = {
    value,
    count: 1
  };

  // 更新
  if (this.freq[1] === void 0) {
    this.freq[1] = [];
  }
  this.freq[1].push(key);
  this.minFreq = 1;
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
