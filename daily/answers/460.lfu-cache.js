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
  this.size = 0;
  this.cache = {};
  this.timestamp = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  const hit = this.cache[key];

  if (hit === void 0) {
    return -1;
  }
  hit.count += 1;
  hit.timestamp = this.timestamp++;

  return hit.value;
};

// 时间复杂度O(n)   n其实就是capacity
LFUCache.prototype.evicted = function() {
  // evicted lfu
  let leastCountKey = null;
  let min = Number.MAX_VALUE;

  for (const k in this.cache) {
    const item = this.cache[k];
    if (item.count < min) {
      leastCountKey = k;
      min = item.count;
    } else if (
      item.count === min &&
      item.timestamp < this.cache[leastCountKey].timestamp
    ) {
      leastCountKey = k;
      min = item.count;
    }
  }

  delete this.cache[leastCountKey];
  this.size--;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.capacity === 0) return;
  const hit = this.cache[key];

  if (hit === void 0) {
    if (this.capacity === this.size) {
      this.evicted();
    }
    this.size++;
    return (this.cache[key] = {
      value,
      timestamp: this.timestamp++,
      count: 1
    });
  }

  this.cache[key].value = value;
  this.cache[key].timestamp = this.timestamp++;
  return (this.cache[key].count += 1);
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
