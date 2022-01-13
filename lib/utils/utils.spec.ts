import o from "ospec"
import {
    bigInt64FromParts,
    bigInt64ToParts,
    byteBufferAsUint8Array,
    fileNameToDosFileName,
    makeByteBuffer
} from "./utils.js"

o.spec("utils", function () {
    o("makeByteBuffer", function () {
        const anotherBuf = makeByteBuffer(16)
        anotherBuf.writeUint64(123)
        anotherBuf.writeString("hello")
        o(anotherBuf.littleEndian).equals(true)
        o(makeByteBuffer(undefined).toDebug()).equals("<00>")
        o(makeByteBuffer().toDebug()).equals("<00>")
        o(makeByteBuffer(undefined).toDebug()).equals("<00>")
        o(makeByteBuffer(0).toDebug()).equals("<00>")
        o(() => makeByteBuffer(-1)).throws(Error)
        o(makeByteBuffer(undefined, anotherBuf).toDebug()).equals("7B 00 00 00 00 00 00 00 68 65 6C 6C 6F<00 00 00>")
        o(makeByteBuffer(undefined, anotherBuf).littleEndian).equals(true)
    })
    o("byteBufferToUint8Array", function () {
        const buf = makeByteBuffer(16)
        buf.writeUint64(123)
        buf.writeString("hello")
        const arr = byteBufferAsUint8Array(buf)
        o(arr.toString()).equals("123,0,0,0,0,0,0,0,104,101,108,108,111")
        o(arr.length).equals(13)
        o(arr instanceof Uint8Array).equals(true)
    })
    o("fileNameToDosFileName", function () {
        o(fileNameToDosFileName("canvas.png")).equals("CANVAS.PNG")
        o(fileNameToDosFileName("somelongname.png")).equals("SOMELO~1.PNG")
        o(fileNameToDosFileName("somelongnamewithLongext.jpeg")).equals("SOMELO~1.JPE")
        o(fileNameToDosFileName("z12.stf.txt")).equals("Z12STF.TXT")
        o(fileNameToDosFileName(".jpeg")).equals(".JPE")
        o(fileNameToDosFileName(".png")).equals(".PNG")
        o(fileNameToDosFileName("blabla")).equals("BLABLA")
        o(fileNameToDosFileName("blablabla")).equals("BLABLA~1")
    })
    let bigints = [
        [
            0n,
            {
                lower: 0,
                upper: 0,
            },
        ],
        [
            1n,
            {
                lower: 1,
                upper: 0,
            },
        ],
        [
            42n,
            {
                lower: 42,
                upper: 0,
            },
        ],
        [
            9001n,
            {
                lower: 9001,
                upper: 0,
            },
        ],
        [
            0x00000000ffffffffn,
            {
                lower: 0xffffffff,
                upper: 0,
            },
        ],
        [
            0x7000000000000000n,
            {
                lower: 0,
                upper: 0x70000000,
            },
        ],
        [
            0xffffffffffffffffn,
            {
                lower: 0xffffffff,
                upper: 0xffffffff,
            },
        ],
        [
            0xfedcba0987654321n,
            {
                lower: 0x87654321,
                upper: 0xfedcba09,
            },
        ],
        [
            0x2020202000000000n,
            {
                lower: 0,
                upper: 0x20202020,
            },
        ],
        [
            0x0000000020202020n,
            {
                lower: 0x20202020,
                upper: 0,
            },
        ],
        [
            0xdeadbeef0000bbbbn,
            {
                lower: 0x0000bbbb,
                upper: 0xdeadbeef,
            },
        ],
        [
            0x1234567890abcdefn,
            {
                lower: 0x90abcdef,
                upper: 0x12345678,
            },
        ],
    ] as const
    o("big int 64 to parts", function () {
        for (let [val, parts] of bigints) {
            const output = bigInt64ToParts(val)
            o(output).deepEquals(parts)
        }
    })
    o("parts to big int 64", function () {
        for (let [val, {lower, upper}] of bigints) {
            const output = bigInt64FromParts(lower, upper)
            o(output).equals(val)
        }
    })
})