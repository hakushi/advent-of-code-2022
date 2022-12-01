const data = require('./01-data.js')

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const sorted = data.split('\n\n').map(item => item.split('\n').map(item => parseInt(item)).reduce((a, b) => a+b)).sort((a, b) => a-b)
console.log(sorted[sorted.length-1])