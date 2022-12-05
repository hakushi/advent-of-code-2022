const testData =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const data = require('./05-data');

const stacks = data.split('\n\n')[0]
const instructions = data.split('\n\n')[1].split('\n')

const layers = stacks.split('\n').slice(0, stacks.split('\n').length-1)
const stackData = {}


const parseInstructions = instructions => instructions.map(instruction => ({
    amount: instruction.split('move ')[1].split(' from')[0],
    from: instruction.split('from ')[1].split(' to')[0],
    to: instruction.split('to ')[1]
  }))

const parsedInstructions = parseInstructions(instructions)


const pushLayerToStacks = (layer) => {
  for(i = 0; i<layer.length; i= i+4) {
    const item = layer.substring(i, i+4)
    const row = i

    if(item.includes('[')) {
        const value = item.split('[')[1].split(']')[0]
        const stackNo = (row/4)+1
        
        if(!!value && Object.hasOwn(stackData, stackNo)) {
            stackData[stackNo].push(value)
        } else if(!!value){
            stackData[stackNo] = [value]
        }
    }
  }
}


const constructStack = (layers) => {
    for(j = layers.length-1; j>=0;j--) {
        pushLayerToStacks(layers[j])
    }
}

constructStack(layers)

const getMessage = (stackData) => {
    return Object.values(stackData).reduce((res, curr) => {
        return [...res, curr[curr.length-1]]
    },[]).join('')
}


parsedInstructions.forEach((instruction) => {
        const len = stackData[instruction.from].length
        const from = stackData[instruction.from].slice(len-parseInt(instruction.amount, 10), len)
        // console.log('from', from)
        if(from === undefined) {
            throw new Error(
                'undefined from data'
            )
        }
        stackData[instruction.from] = stackData[instruction.from].slice(0, len-parseInt(instruction.amount, 10))
            stackData[instruction.to] = [...stackData[instruction.to], ...from]
})

// console.log(stackData)
const message = getMessage(stackData)
console.log(message)