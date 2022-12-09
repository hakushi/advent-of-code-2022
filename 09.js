const testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const headPos = [0,0];
const tailPos = [0,0];
const visitedPositions = ['0, 0']
const data = require('./09-data')
const parsedData = data.split('\n')

const getDistance = (headPos, tailPos) => ([Math.abs(headPos[0]-tailPos[0]), Math.abs(headPos[1]-tailPos[1])])


const step = (direction) => {
    switch(direction) {
        case 'R':
            headPos[0]++
            break;
        case 'L':
            headPos[0]--
            break;
        case 'U':
            headPos[1]++
            break;
        case 'D':
            headPos[1]--
            break;
    }
}

const getTailPosString = () => `${tailPos[0]}, ${tailPos[1]}`

const pushToVisitedPositions = () => {
    const tailPosString = getTailPosString();
   
    if(!visitedPositions.includes(tailPosString)) {
        visitedPositions.push(tailPosString)
    }

}
parsedData.forEach(instruction => {
    const [direction, distance] = instruction.split(' ')
    
    for(i=0;i<parseInt(distance, 10);i++) {
        step(direction)

        if(Math.abs(headPos[0]-tailPos[0]) > 1) {
            tailPos[0] = direction === 'R' ? headPos[0]-1 : headPos[0]+1
            tailPos[1] = headPos[1]
        }

        if(Math.abs(headPos[1]-tailPos[1]) > 1) {
            tailPos[1] = direction === 'U' ? headPos[1]-1 : headPos[1]+1
            tailPos[0] = headPos[0]
        }

        pushToVisitedPositions();
    }
    
})

console.log('tail move count: ', visitedPositions.length)