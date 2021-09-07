// @flow
import {makeByteBuffer} from "../utils/utils"
import {PropertyTagLiterals, PropertyTags} from "../property_tags"


/**
 * The GUID stream MUST be named "__substg1.0_00020102". It MUST store the property set GUID
 * part of the property name of all named properties in the Message object or any of its subobjects,
 * except for those named properties that have PS_MAPI or PS_PUBLIC_STRINGS, as described in [MSOXPROPS]
 * section 1.3.2, as their property set GUID.
 * The GUIDs are stored in the stream consecutively like an array. If there are multiple named properties
 * that have the same property set GUID, then the GUID is stored only once and all the named
 * properties will refer to it by its index
 */
export class GuidStream extends Array<Uint8Array> {

    /**
     * create this object
     * @param storage the storage that contains the PropertyTags.GuidStream
     */
    constructor(storage?: any) {
        super()
        if (storage == null) return
        const stream = storage.getStream(PropertyTagLiterals.GuidStream)

        const buf = makeByteBuffer(null, stream)
        while (buf.offset < buf.limit) {
            const guid = buf.slice(buf.offset, buf.offset + 16).toArrayBuffer(true)
            this.push(new Uint8Array(guid))
        }

    }

    /**
     * writes all the guids as a stream to the storage
     * @param storage
     */
    write(storage: any): void {
        const buf = makeByteBuffer()
        this.forEach(g => {
            buf.append(g)
            storage.addStream(PropertyTagLiterals.GuidStream, buf)
        })
    }
}