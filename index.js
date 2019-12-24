const fs = require('fs')


const textOut = `kakakkakakaka isso aí\n Created on ${Date.now().}`
fs.writeFileSync('./txt/output.txt', textOut)
const textIn =  fs.readFileSync('./txt/output.txt', 'utf-8')
console.log(textIn)