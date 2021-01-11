// @flow

import {Properties} from "../properties"
import type ByteBuffer from "bytebuffer"

export class AttachmentProperties extends Properties {

    /**
     * Writes all properties either as a CFStream or as a collection in
     * a PropertyTags.PropertiesStreamName stream to the given storage, this depends
     * on the PropertyType
     * See theProperties class it's Properties.WriteProperties method for the logic
     * that is used to determine this
     * @param storage cfb storage to write into
     * @param prefix
     * @param messageSize
     * @returns {number} total size of written Properties
     */
    writeProperties(storage: any, prefix: ByteBuffer=> void, messageSize?: number): number {
        const attachmentPropertyPrefix = (buf) => {
            prefix(buf)
            // Reserved (8 bytes): This field MUST be set to
            // zero when writing a .msg file and MUST be ignored when reading a .msg file.
            buf.writeUint64(0)
        }
        return super.writeProperties(storage, attachmentPropertyPrefix, messageSize)
    }
}