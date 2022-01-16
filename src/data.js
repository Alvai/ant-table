export const data = (() => {
  const d = [];
  for (let i = 0; i < 1000; i++) {
    d.push({
      key: i,
      name: `Edward ${i % 2 === 0 ? "King" : "Kong"} ${i}`,
      age: i % 2 === 0 ? 32 : 57,
      address: `London, Park Lane no. ${i}`
    });
  }
  return d;
})();
