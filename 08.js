const testData = `30373
25512
65332
33549
35390`

const data = require('./08-data')
const parsedData = data.split('\n').map(row => row.split('').map(height => parseInt(height, 10)))
const isAtEdge = (row, index) => {
    if(index === 0) {
        return true
    }

    if(index === parsedData[row].length-1) {
        return true
    }

    if(row === 0) {
        return true
    }

    if(row === parsedData.length-1) {
        return true
    }

    return false
}

const isVisibleLeft = (row, index) => {
    let isVisible = true

    for(i = index-1;i>=0;i--) {
        if(parsedData[row][i] >= parsedData[row][index]) {
            isVisible = false
        }
    }

    return isVisible
} 

const isVisibleRight = (row, index) => {
    let isVisible = true;

    for(j = index+1;j<=parsedData[row].length-1;j++) {
        
        if(parsedData[row][j] >= parsedData[row][index]) {
            isVisible = false
        }
        
    }

    return isVisible
}

const isVisibleTop = (row, index) => {
    let isVisible = true

    for(i = row-1; i>=0;i--) {
        if(parsedData[i][index] >= parsedData[row][index]) {
            isVisible = false
        }

    }

    return isVisible
}

const isVisibleBottom = (row, index) => {
    let isVisible = true

    for(i = row+1; i<=parsedData.length-1;i++) {
        if(parsedData[i][index] >= parsedData[row][index]) {
            isVisible = false
        }

    }

    return isVisible
}

const isVisible = (row, index) => {
  return isAtEdge(row, index) 
    || isVisibleTop(row, index)
    || isVisibleBottom(row, index)
    || isVisibleLeft(row, index)
    || isVisibleRight(row, index)
}

console.log(parsedData)
const visibleTrees = parsedData.map((row, rowIndex) => row.map((treeHeight, index) => isVisible(rowIndex, index) ? '🌲' : '  '))

console.log(isVisible(2, 2) ? 'true' : 'false')
console.log(isVisible(0, 2) ? 'true' : 'false')
console.log(isVisible(1, 4) ? 'true' : 'false')
console.log(visibleTrees)
console.log(visibleTrees.reduce((res, curr) => {
    return res + curr.reduce((res, curr) => {
        return curr === '🌲' ? res+1 : res
    }, 0)
}, 0))