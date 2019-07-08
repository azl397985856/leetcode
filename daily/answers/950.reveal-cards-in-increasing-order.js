/*
 * @lc app=leetcode id=950 lang=javascript
 *
 * [950] Reveal Cards In Increasing Order
 */
/**
 * @param {number[]} deck
 * @return {number[]}
 */
var deckRevealedIncreasing = function(deck) {
  const hand = [];
  const table = deck.sort((a, b) => a - b);

  let handTurn = true;
  while (table.length > 0) {
    if (handTurn) {
      hand.unshift(table.pop());
    } else {
      hand.unshift(hand.pop());
    }
    handTurn = !handTurn;
  }
  return hand;
};
