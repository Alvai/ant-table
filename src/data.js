const data = (() => {
  const d = [];
  for (let i = 0; i < 100_000; i++) {
    d.push({
      key: i,
      name: `Edward ${i % 2 === 0 ? "King" : "Kong"} ${i}`,
      age: i % 2 === 0 ? 32 : 57,
      address: `London, Park Lane no. ${i}`
    });
  }
  return d;
})();


const fs = require('fs');
console.log(`${process.cwd()}/my_data.js`)
fs.writeFile(`${process.cwd()}/my_data.js`, JSON.stringify(data), function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!");
});