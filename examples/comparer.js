const fs = require('fs')
const path = require('path')
const CFB = require('cfb')
const inPath = path.join(process.cwd(), process.argv[2])
const inPath2 = path.join(process.cwd(), process.argv[3])
const compoundFileA = CFB.parse(fs.readFileSync(inPath))
const compoundFileB = CFB.parse(fs.readFileSync(inPath2))
const {getTagFromStreamName, getTag} = require('./propertytags')

const toHex = b => b && b.length > 0
    ? b.toString('hex')
        .match(/.{1,32}/g)
        .map((s, i) => (i * 16).toString(16).padStart(4, "0") + ": " + s.match(/.{1,2}/g).join(" "))
        .join('\n')
    : "NULL"

const toString = b => b ? Array.from(b).map(c => c > 128 ? "?" : String.fromCharCode(c)).join('') : "REALLY NULL"

const zipIndex = cf => cf.FileIndex.map((f, i) => Object.assign({}, f, {
    index: i,
    p: cf.FullPaths[i]
}))

const withIndexA = zipIndex(compoundFileA)
const withIndexB = zipIndex(compoundFileB)

withIndexA.forEach(fA => {
    const fB = withIndexB.find(f => f.p === fA.p)

    const contentA = toHex(fA.content)

    if (!fB) {
        console.log()
        console.log("MISSING:", fA.size, fA.p, "not in", inPath2)
        console.log("tag:", getTagFromStreamName(fA.name))
        console.log(contentA)
        console.log(toString(fA.content))
        return
    }

    const contentB = toHex(fB.content)
    if (contentA !== contentB) {
        console.log()
        console.log("DIFFERENCE:", fA.size + ":" + fB.size, fA.p, "type", fA.type)
        console.log("tag:", getTagFromStreamName(fB.name))

        console.log(process.argv[2].padEnd(53, " "), '||', process.argv[3])
        const bSplit = contentB.split('\n')
        contentA.split('\n')
            .forEach((l, i) => {
                if (bSplit[i] === l) return
                const ltag = getTag(l.slice(6, 17)) || "no tag"
                const rtag = getTag(bSplit[i].slice(6, 17)) || "no tag"
                console.log(ltag.padEnd(53, " "), '||', rtag.padEnd(53, " "))
                console.log(l.padEnd(53, " "), "||", bSplit[i].split(" ").slice(1).join(' '))
            })
        console.log(toString(fA.content))
        console.log(toString(fB.content))
        return
    }
    if (!process.argv.includes('-a')) return
    console.log()
    console.log('SAME: size:', fA.size, fA.p)
    console.log("tag:", getTagFromStreamName(fB.name))
    console.log("content:",)
    console.log(contentA)
    console.log(toString(fB.content))
})

withIndexB.forEach(fB => {
    const fA = withIndexA.find(f => f.p === fB.p)
    const contentB = toHex(fB.content)
    if (!fA) {
        console.log()
        console.log("MISS:", fB.size, fB.p, "not in", inPath)
        console.log("tag:", getTagFromStreamName(fB.name))
        console.log(contentB)
        console.log(toString(fB.content))
    }
})