const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

const rangeToArray = range => {
    const start = parseInt(range.split('-')[0], 10);
    const stop = parseInt(range.split('-')[1], 10);

    const array = []
    
    for(i = start; i<=stop; i++) {
        array.push(i)
    }

    return array;
}

const hasFullyContainedRange = (ranges) => {
    const rangeArrayA = rangeToArray(ranges.split(',')[0]);
    const rangeArrayB = rangeToArray(ranges.split(',')[1]);

    if(rangeArrayA.every(n => rangeArrayB.includes(n))) {
        return true
    }

    if(rangeArrayB.every(n => rangeArrayA.includes(n))) {
        return true
    }    

    return false
}

const data = require('./04-data.js')

const parsedData = data.split('\n')

console.log(parsedData.reduce((res, curr) => {
    return hasFullyContainedRange(curr) ? res+1 : res

}, 0))