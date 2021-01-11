import {generateEntryId, generateInstanceKey, generateRecordKey, generateSearchKey} from "./mapi"

const o = require('ospec')

function uint8ToBase16(u8Arr){
    return Buffer.from(u8Arr).toString('hex')
}

o.spec("uuid generation", function () {

    o("generateEntryId", function () {
        const v = generateEntryId()
        o(v.byteLength).equals(72)
        o(v[16]).equals("-".charCodeAt(0))
        o(v[26]).equals("-".charCodeAt(0))
        o(v[36]).equals("-".charCodeAt(0))
        o(v[46]).equals("-".charCodeAt(0))
    })

    o("generateInstanceKey", function () {
        const v = generateInstanceKey()
        o(v.byteLength).equals(4)
        const v2 = generateInstanceKey()
        o(v).equals(v2)
    })

    o("generateRecordKey", function() {
        const v = generateRecordKey()
        o(v.byteLength).equals(16)
        o(v instanceof Uint8Array).equals(true)

    })

    o("generateSearchKey", function() {
        const addressType = "SMTP"
        const emailAddress = "crocodile@neverland.com"
        const v = generateSearchKey(addressType, emailAddress)
        o(v.byteLength).equals(54)
        o(uint8ToBase16(v)).equals("53004d0054005000630072006f0063006f00640069006c00650040006e0065007600650072006c0061006e0064002e0063006f006d00")
    })
})