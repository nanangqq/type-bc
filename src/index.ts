// console.log('hi')

// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }

// const p1: Human = {
//     name: 'k',
//     age: 33,
//     gender: 'male'
// }

// class Human {
//     public name: string
//     public age: number
//     public gender: string
//     constructor(name: string, age: number, gender: string) {
//         this.name=name
//         this.age=age
//         this.gender=gender
//     }
// }

// const p2 = new Human('mm', 22, 'female')

// const sayHi = (name:string, age:number, gender?:string):string => `Hello ${name}, ${age}, ${gender}!`
// const sayHi = (person: Human):string => `Hello ${person.name}, ${person.age}, ${person.gender}!`

// const name = 'a', age = 33, gender = 'male'
// console.log(sayHi(name, age))
// console.log(sayHi(name, age, gender))
// console.log(sayHi(p1))
// console.log(sayHi(p2))

import * as CryptoJS from 'crypto-js'

class Block {
    public index: number
    public hash: string
    public previousHash: string
    public data: string
    public timestamp:number

    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp:number
    ): string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString()

    static validateStructure = (aBlock: Block): boolean => {
        return (typeof aBlock.index === 'number' && 
        typeof aBlock.hash === 'string' && 
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string')
    }
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp:number
    ) {
        this.index = index,
        this.hash = hash,
        this.previousHash = previousHash,
        this.data = data,
        this.timestamp = timestamp
    }
}

const genesisBlock = new Block(0, 'aakkkssjifeosa', '', 'hey', 123455)

// let blockchain: [Block] = [genesisBlock]
let blockchain: Block[] = [genesisBlock]

console.log(blockchain)
console.log(Block.calculateBlockHash(blockchain[0].index, blockchain[0].previousHash, blockchain[0].data, blockchain[0].timestamp))

const getBlockchain = (): Block[] => blockchain
const getLastBlock = (): Block => blockchain[blockchain.length-1]
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLastBlock()
    const newIndex: number = previousBlock.index + 1
    const newTimestamp: number = getNewTimestamp()
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimestamp)
    
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp)
    addBlock(newBlock)

    return newBlock
}

// const appendBlockchain = (): void => {
//     const newBlock: Block = createNewBlock('hello')
//     console.log(newBlock)
//     blockchain.push(newBlock)
// }

// appendBlockchain()
// appendBlockchain()
// appendBlockchain()

const getHashOfABlock = (aBlock: Block): string => Block.calculateBlockHash(
    aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp
)

const isBlockValid =  (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false
    } else if (getHashOfABlock(candidateBlock) !== candidateBlock.hash) {
        return false
    } else {
        return true
    }
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLastBlock())) {
        blockchain.push(candidateBlock)
    }
}

createNewBlock('second')
createNewBlock('third')
createNewBlock('4th')

console.log(blockchain)

export {}
