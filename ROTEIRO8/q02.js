const hasSameTypeAndValue = (...params) => {
  const maybeCb =
    typeof params[params.length - 1] === "function" ? params.pop() : null;

  const seen = new Set();
  let foundDuplicate = false;

  for (const value of params) {
    const type = typeof value;
    let serialized;
    try {
      serialized = JSON.stringify(value, Object.keys(value || {}).sort());
    } catch {
      serialized = String(value);
    }
    const key = `${type}:${serialized}`;
    if (seen.has(key)) {
      foundDuplicate = true;
      break;
    }
    seen.add(key);
  }

  if (maybeCb) maybeCb(foundDuplicate);
  return foundDuplicate;
};

hasSameTypeAndValue(1, "1", { a: 1 }, { a: 1 }, (r) =>
  console.log("Q02 (obj iguais?):", r)
);
console.log(
  "Q02 (sem duplicatas):",
  hasSameTypeAndValue(1, "1", { a: 1 }, [1])
);
console.log("Q02 (com duplicatas):", hasSameTypeAndValue(42, 42, "x"));
