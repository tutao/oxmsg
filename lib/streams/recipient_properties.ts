import {Properties} from "../properties.js"
import type {CFBStorage} from "../cfb_storage.js"
import type ByteBuffer from "bytebuffer"

/**
 * The properties stream contained inside an Recipient storage object.
 */
export class RecipientProperties extends Properties {
    override writeProperties(storage: CFBStorage, prefix: (arg0: ByteBuffer) => void, messageSize?: number): number {
        const recipPropPrefix = (buf: ByteBuffer) => {
            prefix(buf)
            // Reserved(8 bytes): This field MUST be set to zero when writing a .msg file and MUST be ignored
            // when reading a.msg file.
            buf.writeUint64(0)
        }

        return super.writeProperties(storage, recipPropPrefix, messageSize)
    }
}