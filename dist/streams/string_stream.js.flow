// @flow

import {PropertyTagLiterals, PropertyTags} from "../property_tags"
import {makeByteBuffer} from "../utils/utils"
import type ByteBuffer from "bytebuffer"
import type {CFBStorage} from '../cfb_storage'

/**
 * The string stream MUST be named "__substg1.0_00040102". It MUST consist of one entry for each
 * string named property, and all entries MUST be arranged consecutively, like in an array.
 * As specified in section 2.2.3.1.2, the offset, in bytes, to use for a particular property is stored in the
 * corresponding entry in the entry stream.That is a byte offset into the string stream from where the
 * entry for the property can be read.The strings MUST NOT be null-terminated. Implementers can add a
 * terminating null character to the string
 * See https://msdn.microsoft.com/en-us/library/ee124409(v=exchg.80).aspx
 */
export class StringStream extends Array<StringStreamItem> {

    /**
     * create StringStream and read all the StringStreamItems from the given storage, if any.
     */
    constructor(storage?: CFBStorage) {
        super()
        if (storage == null) return
        const stream = storage.getStream(PropertyTagLiterals.StringStream)
        const buf = makeByteBuffer(null, stream)
        while (buf.offset < buf.limit) {
            this.push(StringStreamItem.fromBuffer(buf))
        }
    }

    /**
     * write all the StringStreamItems as a stream to the storage
     * @param storage
     */
    write(storage: any): void {
        const buf = makeByteBuffer()
        this.forEach(s => s.write(buf))
        storage.addStream(PropertyTagLiterals.StringStream, buf)
    }
}

/**
 * Represents one Item in the StringStream
 */
export class StringStreamItem {


    /**
     * the length of the following name field in bytes
     * was uint
     * @type number
     */
    length: number

    /**
     * A Unicode string that is the name of the property. A new entry MUST always start
     * on a 4 byte boundary; therefore, if the size of the Name field is not an exact multiple of 4, and
     * another Name field entry occurs after it, null characters MUST be appended to the stream after it
     * until the 4-byte boundary is reached.The Name Length field for the next entry will then start at
     * the beginning of the next 4-byte boundary
     * @type {string}
     */
    name: string

    /**
     * create a StringStreamItem from a byte buffer
     * @param buf {ByteBuffer}
     */
    static fromBuffer(buf: ByteBuffer): StringStreamItem {
        const length = buf.readUint32()
        // Encoding.Unicode.GetString(binaryReader.ReadBytes((int) Length)).Trim('\0');
        const name = buf.readUTF8String(length)
        const boundary = StringStreamItem.get4BytesBoundary(length)
        buf.offset = buf.offset + boundary
        return new StringStreamItem(name)
    }

    constructor(name: string) {
        this.length = name.length
        this.name = name
    }

    /**
     * write this item to the ByteBuffer
     * @param buf {ByteBuffer}
     */
    write(buf: ByteBuffer): void {
        buf.writeUint32(this.length)
        buf.writeUTF8String(this.name)
        const boundary = StringStreamItem.get4BytesBoundary(this.length)
        for (let i = 0; i < boundary; i++) {
            buf.writeUint8(0)
        }
    }

    /**
     * Extract 4 from the given <paramref name="length"/> until the result is smaller
     * than 4 and then returns this result
     * @param length {number} was uint
     */
    static get4BytesBoundary(length: number): number {
        if (length === 0) return 4
        while (length >= 4) length -= 4
        return length
    }
}