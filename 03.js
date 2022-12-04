const charToPriority = (char) => {
  const lc = 'abcdefghijklmnopqrstuvwxyz'
  const uc = lc.toUpperCase()

  const lcArray = lc.split('')
  const ucArray = uc.split('')

  let priority
  
  const match = lcArray.find((item, index) => {
    if (item === char) {
       priority = index+1
    }}) ?? ucArray.find((item, index) => {
      if (item === char) {
        priority = index+1+26
    }})   

    if(!priority) {
        throw new Error(
            'Unable to match character to priority'
        )
    }
  
    return priority
}

const parseData = (data) => {
const backpacks = data.split('\n')
const splitBackpacks = backpacks.map(pack => {
    const splitPack = [pack.slice(0, pack.length/2), pack.slice(pack.length/2, pack.length)]
    
    if(splitPack.join('') !== pack) {
        throw new Error('Error in splitting packs'
        )
    }
    
    return splitPack
  })

  return splitBackpacks
}

const comparePacks = (packs) => 
    packs[0].split('').find(item => packs[1].includes(item))



const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const data = require('./03-data.js')

const parsedData = parseData(data)

const totalPriority = parsedData.reduce((res, curr) => {

    return res += charToPriority(comparePacks(curr))
},0)

console.log(totalPriority)


