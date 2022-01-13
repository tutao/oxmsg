import {PropertyTags} from "./property_tags.js"
import {generateInstanceKey, generateRecordKey} from "./utils/mapi.js"
import {fileNameToDosFileName, getPathExtension, isNullOrEmpty} from "./utils/utils.js"
import {getMimeType} from "./utils/mime.js"
import {Properties} from "./properties.js"
import {AttachmentFlags, AttachmentType, MapiObjectType, PropertyFlag, StoreSupportMaskConst} from "./enums.js"
import {CFBStorage} from "./cfb_storage";

export class Attachment {
    readonly data: Uint8Array
    readonly fileName: string
    readonly type: AttachmentType
    readonly contentId: string
    readonly renderingPosition: number
    readonly isContactPhoto: boolean

    constructor(
        data: Uint8Array, // was: Stream
        fileName: string,
        contentId: string = "",
        type: AttachmentType = AttachmentType.ATTACH_BY_VALUE,
        renderingPosition: number = -1,
        isContactPhoto: boolean = false,
    ) {
        this.data = data
        this.fileName = fileName
        this.type = type
        this.renderingPosition = renderingPosition
        this.contentId = contentId
        this.isContactPhoto = isContactPhoto
    }

    writeProperties(storage: CFBStorage, index: number): number {
        const attachmentProperties = new Properties()
        attachmentProperties.addProperty(PropertyTags.PR_ATTACH_NUM, index, PropertyFlag.PROPATTR_READABLE)
        attachmentProperties.addBinaryProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey(), PropertyFlag.PROPATTR_READABLE)
        attachmentProperties.addBinaryProperty(PropertyTags.PR_RECORD_KEY, generateRecordKey(), PropertyFlag.PROPATTR_READABLE)
        attachmentProperties.addProperty(PropertyTags.PR_RENDERING_POSITION, this.renderingPosition, PropertyFlag.PROPATTR_READABLE)
        attachmentProperties.addProperty(PropertyTags.PR_OBJECT_TYPE, MapiObjectType.MAPI_ATTACH)

        if (!isNullOrEmpty(this.fileName)) {
            attachmentProperties.addProperty(PropertyTags.PR_DISPLAY_NAME_W, this.fileName)
            attachmentProperties.addProperty(PropertyTags.PR_ATTACH_FILENAME_W, fileNameToDosFileName(this.fileName))
            attachmentProperties.addProperty(PropertyTags.PR_ATTACH_LONG_FILENAME_W, this.fileName)
            attachmentProperties.addProperty(PropertyTags.PR_ATTACH_EXTENSION_W, getPathExtension(this.fileName))

            if (!isNullOrEmpty(this.contentId)) {
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_CONTENT_ID_W, this.contentId)
            }

            // TODO: get mimetype from user.
            attachmentProperties.addProperty(PropertyTags.PR_ATTACH_MIME_TAG_W, getMimeType(this.fileName))
        }

        attachmentProperties.addProperty(PropertyTags.PR_ATTACH_METHOD, this.type)

        switch (this.type) {
            case AttachmentType.ATTACH_BY_VALUE:
            case AttachmentType.ATTACH_EMBEDDED_MSG:
                attachmentProperties.addBinaryProperty(PropertyTags.PR_ATTACH_DATA_BIN, this.data)
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_SIZE, this.data.length)
                break

            case AttachmentType.ATTACH_BY_REF_ONLY:
            case AttachmentType.ATTACH_BY_REFERENCE:
            case AttachmentType.ATTACH_BY_REF_RESOLVE:
            case AttachmentType.NO_ATTACHMENT:
            case AttachmentType.ATTACH_OLE:
                throw new Error(`Attachment type "${AttachmentType[this.type]} is not supported`)
        }

        if (this.contentId) {
            attachmentProperties.addProperty(PropertyTags.PR_ATTACHMENT_HIDDEN, true)
            attachmentProperties.addProperty(PropertyTags.PR_ATTACH_FLAGS, AttachmentFlags.ATT_MHTML_REF)
        }

        attachmentProperties.addDateProperty(PropertyTags.PR_CREATION_TIME, new Date())
        attachmentProperties.addDateProperty(PropertyTags.PR_LAST_MODIFICATION_TIME, new Date())
        attachmentProperties.addProperty(PropertyTags.PR_STORE_SUPPORT_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE)
        return attachmentProperties.writeProperties(storage, buf => {
            // Reserved (8 bytes): This field MUST be set to
            // zero when writing a .msg file and MUST be ignored when reading a .msg file.
            buf.writeUint64(0)
        })
    }
}