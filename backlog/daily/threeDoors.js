// true 代表换之后赢了
// false 代表换了之后输了
function threeDoors() {
  const doors = [0, 0, 1];
  const random = Math.random() * doors.length;
  const pos = Math.floor(random);
  if (doors[pos]) return false;
  console.count(pos);
  return true;
}

const times = 1000000;
for(let i = 0; i < times; i++) {
    const win = threeDoors();
    console.count(win);
}
