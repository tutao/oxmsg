import {Properties} from "../properties.js"
import type ByteBuffer from "bytebuffer"
import type {CFBStorage} from "../cfb_storage.js"

/**
 * The properties stream contained inside the top level of the .msg file, which represents the Message object itself.
 */
export class TopLevelProperties extends Properties {
    nextRecipientId!: number
    nextAttachmentId!: number
    recipientCount!: number
    attachmentCount!: number

    // TODO: add constructor to read in existing CFB stream

    /**
     *
     * @param storage
     * @param prefix
     * @param messageSize
     */
    override writeProperties(storage: CFBStorage, prefix: (arg0: ByteBuffer) => void, messageSize?: number): number {
        // prefix required by the standard: 32 bytes
        const topLevelPropPrefix = (buf: ByteBuffer) => {
            prefix(buf)
            // Reserved(8 bytes): This field MUST be set to zero when writing a .msg file and MUST be ignored
            // when reading a.msg file.
            buf.writeUint64(0)
            // Next Recipient ID(4 bytes): The ID to use for naming the next Recipient object storage if one is
            // created inside the .msg file. The naming convention to be used is specified in section 2.2.1.If
            // no Recipient object storages are contained in the.msg file, this field MUST be set to 0.
            buf.writeUint32(this.nextRecipientId)
            // Next Attachment ID (4 bytes): The ID to use for naming the next Attachment object storage if one
            // is created inside the .msg file. The naming convention to be used is specified in section 2.2.2.
            // If no Attachment object storages are contained in the.msg file, this field MUST be set to 0.
            buf.writeUint32(this.nextAttachmentId)
            // Recipient Count(4 bytes): The number of Recipient objects.
            buf.writeUint32(this.recipientCount)
            // Attachment Count (4 bytes): The number of Attachment objects.
            buf.writeUint32(this.attachmentCount)
            // Reserved(8 bytes): This field MUST be set to 0 when writing a msg file and MUST be ignored when
            // reading a msg file.
            buf.writeUint64(0)
        }

        return super.writeProperties(storage, topLevelPropPrefix, messageSize)
    }
}