const combineAndSort = (...args) => {
  const maybeCb =
    typeof args[args.length - 1] === "function" ? args.pop() : null;

  const combined = [].concat(...args); // spread/concat para achatar
  const allNumbers = combined.every((x) => typeof x === "number");
  const sorted = allNumbers ? combined.sort((a, b) => a - b) : combined.sort();

  if (maybeCb) {
    maybeCb(sorted);
    return;
  }
  return sorted;
};

combineAndSort([3, 1], [2, 10], (res) => console.log("Q04 números:", res));
console.log("Q04 strings:", combineAndSort(["b"], ["a", "c"]));
