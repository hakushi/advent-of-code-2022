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
return backpacks
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

const compareGroups = (packs) => 
    packs[0].split('').find(item => packs[1].includes(item) && packs[2].includes(item))

    const joinGroups = (data) => {
        let counter = 0;
        let group = [];
    
        return data.reduce((res, curr) => {
          
            group.push(curr);        
            if(counter === 2) {
                counter = 0;
                const copy = [...group]
                group = [];
                return [...res, copy]
            }
    
            counter++
            return res
        }, [])
    }
    

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const data = require('./03-data.js')

const parsedData = parseData(data)

const totalPriority = joinGroups(parsedData).reduce((res, curr) => {

    return res += charToPriority(compareGroups(curr))
},0)

console.log(totalPriority)


