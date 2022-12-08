const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const data = require('./07-data')

const totalDiskSpace = 70000000
const requiredSpace = 30000000

const tree = {}
const pos = []

const cmd_cd = arg => {    
    switch(arg) {
        case '..':
          pos.pop()
          break;
        case '\\':
          while(pos.length) {
            pos.pop();
          } 
          break;
        default:
            pos.push(arg)
          break;
    }
} 

const getFullDirName = pos => {
    return pos.reduce((res, curr) => {
        if(res === '/') {
            return curr
        }
        return `${res}/${curr}`


    }, '/')
}

const parseLine = (line) => {
    const split = line.split(' ')
    const fullName = getFullDirName(pos);

    switch(split[0]) {
        case '$':
            if(split[1] === 'ls') {
                break;
            }
            if(split[1] === 'cd') {
                if(!split[2]) {
                    throw new Error(
                     'invalid directory'
                    )
                }
                cmd_cd(split[2])
                break;
            }
            case 'dir':
                if(Object.hasOwn(tree, fullName)) {
                    tree[fullName].push(split[1])
                    break;
                }
                tree[fullName] = [split[1]]
                break;
            default:
                if(Object.hasOwn(tree, fullName)) {
                    tree[fullName].push({[split[1]]: split[0]})
                    break;
                }
                tree[fullName] = [{[split[1]]:split[0]}]
    }
}

const parsedData = data.split('\n');
parsedData.forEach(line => {
    parseLine(line)
});
            
const getTotalFileSize = (dir, dirName) => {
    count = 0;
    if(!dir?.length) {
        return count;
    }
    dir.forEach(file => {
        if (typeof file === 'object') {
            count += parseInt(Object.values(file)[0], 10)
        } else {
            count += getTotalFileSize(dirName === '/' ? tree[file] : tree[`${dirName}/${file}`], `${dirName}/${file}`)
    }})


    return count
}

const folderSizes = {}
Object.keys(tree).forEach(key => folderSizes[key] = getTotalFileSize(tree[key], key))

console.log(folderSizes)

console.log(tree)

const sizes = Object.values(folderSizes)

console.log(sizes);

console.log(sizes.reduce((res, curr) => res+curr))

const rootFileSize = tree['/'].filter(item => typeof item === 'object').map((i) => parseInt(Object.values(i)[0]), 10).reduce((a, b) => a+b)

console.log('rfc', rootFileSize)
const used = Object.entries(folderSizes)
  .filter(([key, ]) => !key.includes('/'))
  .map(([_, count]) => count )
  .reduce((a, b) => a+b) + rootFileSize

console.log('total space    =', totalDiskSpace)
console.log('used space     =', used)
console.log('required space =', requiredSpace)
console.log('free space     =', totalDiskSpace-used)
console.log('missing space  =', requiredSpace-(totalDiskSpace-used))

console.log(Object.values(folderSizes).filter(size => size >= requiredSpace-(totalDiskSpace-used)).sort((a,b) => b-a))



