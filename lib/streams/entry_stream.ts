import {byteBufferAsUint8Array, makeByteBuffer} from "../utils/utils.js"
import {PropertyTagLiterals} from "../property_tags.js"
import type ByteBuffer from "bytebuffer"
import {PropertyKind} from "../enums.js"
import {CFBStorage} from "../cfb_storage.js"

/**
 * The entry stream MUST be named "__substg1.0_00030102" and consist of 8-byte entries, one for each
 * named property being stored. The properties are assigned unique numeric IDs (distinct from any property
 * ID assignment) starting from a base of 0x8000. The IDs MUST be numbered consecutively, like an array.
 * In this stream, there MUST be exactly one entry for each named property of the Message object or any of
 * its subobjects. The index of the entry for a particular ID is calculated by subtracting 0x8000 from it.
 * For example, if the ID is 0x8005, the index for the corresponding 8-byte entry would be 0x8005 – 0x8000 = 5.
 * The index can then be multiplied by 8 to get the actual byte offset into the stream from where to start
 * reading the corresponding entry.
 *
 * see: https://msdn.microsoft.com/en-us/library/ee159689(v=exchg.80).aspx
 */
export class EntryStream extends Array<EntryStreamItem> {
    /**
     * creates this object and reads all the EntryStreamItems from
     * the given storage
     */
    constructor(storage?: CFBStorage) {
        super()
        if (storage == null) return
        const stream = storage.getStream(PropertyTagLiterals.EntryStream)

        if (stream.byteLength <= 0) {
            storage.addStream(PropertyTagLiterals.EntryStream, Uint8Array.of())
        }

        const buf = makeByteBuffer(undefined, stream)

        while (buf.offset < buf.limit) {
            const entryStreamItem = EntryStreamItem.fromBuffer(buf)
            this.push(entryStreamItem)
        }
    }

    /**
     * writes all the EntryStreamItems as a stream to the storage
     */
    write(storage: CFBStorage, streamName: string = PropertyTagLiterals.EntryStream): void {
        const buf = makeByteBuffer()
        this.forEach(entry => entry.write(buf))
        storage.addStream(streamName, byteBufferAsUint8Array(buf))
    }
}

/**
 * Represents one item in the EntryStream
 */
export class EntryStreamItem {
    /**
     * the Property Kind subfield of the Index and Kind Information field), this value is the LID part of the
     * PropertyName structure, as specified in [MS-OXCDATA] section 2.6.1. If this property is a string named
     * property, this value is the offset in bytes into the strings stream where the value of the Name field of
     * the PropertyName structure is located.
     * was ushort
     * */
    readonly nameIdentifierOrStringOffset: number
    readonly nameIdentifierOrStringOffsetHex: string

    /**
     * The following structure specifies the stream indexes and whether the property is a numerical
     * named property or a string named property
     * @type {IndexAndKindInformation}
     */
    readonly indexAndKindInformation: IndexAndKindInformation

    /**
     * creates this objcet and reads all the properties from the given buffer
     * @param buf {ByteBuffer}
     */
    static fromBuffer(buf: ByteBuffer): EntryStreamItem {
        const nameIdentifierOrStringOffset = buf.readUint16()
        const indexAndKindInformation = IndexAndKindInformation.fromBuffer(buf)
        return new EntryStreamItem(nameIdentifierOrStringOffset, indexAndKindInformation)
    }

    /**
     * creates this object from the properties
     * @param nameIdentifierOrStringOffset {number}
     * @param indexAndKindInformation {IndexAndKindInformation}
     */
    constructor(nameIdentifierOrStringOffset: number, indexAndKindInformation: IndexAndKindInformation) {
        this.nameIdentifierOrStringOffset = nameIdentifierOrStringOffset
        this.nameIdentifierOrStringOffsetHex = nameIdentifierOrStringOffset.toString(16).toUpperCase().padStart(4, "0")
        this.indexAndKindInformation = indexAndKindInformation
    }

    /**
     * write all the internal properties to the given buffer
     * @param buf {ByteBuffer}
     */
    write(buf: ByteBuffer): void {
        buf.writeUint32(this.nameIdentifierOrStringOffset)
        const packed = (this.indexAndKindInformation.guidIndex << 1) | this.indexAndKindInformation.propertyKind
        buf.writeUint16(packed)
        buf.writeUint16(this.indexAndKindInformation.propertyIndex) //Doesn't seem to be the case in the spec.
        // Fortunately section 3.2 clears this up.
    }
}
export class IndexAndKindInformation {
    // System.Uint16
    readonly propertyIndex: number
    readonly guidIndex: number
    // 1 byte
    readonly propertyKind: PropertyKind

    static fromBuffer(buf: ByteBuffer): IndexAndKindInformation {
        const propertyIndex = buf.readUint16()
        const packedValue = buf.readUint16()
        const guidIndex = (packedValue >>> 1) & 0xffff
        const propertyKind = packedValue & 0x07
        if (![0xff, 0x01, 0x00].includes(propertyKind)) throw new Error("invalid propertyKind:" + propertyKind)
        return new IndexAndKindInformation(propertyIndex, guidIndex, propertyKind)
    }

    constructor(propertyIndex: number, guidIndex: number, propertyKind: PropertyKind) {
        this.guidIndex = guidIndex
        this.propertyIndex = propertyIndex
        this.propertyKind = propertyKind
    }

    write(buf: ByteBuffer): void {
        buf.writeUint16(this.propertyIndex)
        buf.writeUint32(this.guidIndex + this.propertyKind)
    }
}