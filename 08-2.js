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

const getTopScore = (row, index) => {
    let isVisible = true
    let score = 0

    for(i = row-1; i>=0;i--) {
        if(isVisible) {
            score++
        }
        if(parsedData[i][index] >= parsedData[row][index]) {
            isVisible = false
        }

    }

    return score
}

const getBottomScore = (row, index) => {
    let score = 0
    let isVisible = true

    for(i = row+1; i<=parsedData.length-1;i++) {
        if(isVisible) {
            score++
        }

        if(parsedData[i][index] >= parsedData[row][index]) {
            isVisible = false
        }

    }

    return score;
}

const getLeftScore = (row, index) => {
    let isVisible = true
    let score = 0

    for(i = index-1;i>=0;i--) {
        if(isVisible) {
            score++
        }

        if(parsedData[row][i] >= parsedData[row][index]) {
            isVisible = false
        }
    }

    return score
}

const getRightScore = (row, index) => {
    let isVisible = true;
    let score = 0;

    for(j = index+1;j<=parsedData[row].length-1;j++) {
        if(isVisible) {
            score++
        }

        if(parsedData[row][j] >= parsedData[row][index]) {
            isVisible = false
        }
        
    }

    return score
}

const getScore = (row, index) => {
    if(isAtEdge(row, index)) {
        return 0
    }
    
    const topScore = getTopScore(row, index)
    const bottomScore = getBottomScore(row, index)
    const leftScore = getLeftScore(row, index)
    const rightScore = getRightScore(row, index)

    return topScore * bottomScore * leftScore * rightScore
}

console.log(parsedData)
const scenicScores = parsedData.map((row, rowIndex) => row.map((treeHeight, index) => getScore(rowIndex, index)))

console.log(scenicScores)
console.log(scenicScores.reduce((res, curr) => {
    return [...res, ...curr.reduce((res, curr) => {
        return  [...res, curr]
    }, [])]
}, []).sort((a,b) => b-a))
