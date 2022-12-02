const data = require(
'./02-data.js'
)


const rounds = data.split('\n'
).map(round => (round.split(' ')))

const score = rounds.reduce((res,curr) => {
    switch(curr[0]) {
        case 'A':
            switch (curr[1]) {
                case 'X':
                    return res + 3 + 0
                case 'Y':
                    return res + 1 + 3
                case 'Z': 
                    return res + 2 + 6
            }
        case 'B':
            switch (curr[1]) {
                case 'X':
                    return res + 1 + 0
                case 'Y':
                    return res + 2 + 3
                case 'Z': 
                    return res + 3 + 6
            }
        case 'C':
            switch (curr[1]) {
                case 'X':
                    return res + 2 + 0
                case 'Y':
                    return res + 3 + 3
                case 'Z': 
                    return res + 1 + 6
            }
    }
}, 0)

console.log('score', score)