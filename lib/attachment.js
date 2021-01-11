// @flow

import type {AttachmentTypeEnum} from "./enums"
import {AttachmentFlags, AttachmentType, MapiObjectType, PropertyFlag, StoreSupportMaskConst} from "./enums"
import {AttachmentProperties} from "./streams/attachment_properties"
import {PropertyTags} from "./property_tags"
import {generateInstanceKey, generateRecordKey} from "./utils/mapi"
import {fileNameToDosFileName, getPathExtension, isNullOrEmpty, isNullOrWhiteSpace} from "./utils/utils"
import {getMimeType} from "./utils/mime"

export class Attachment {
    _file: any
    data: Uint8Array
    fileName: string
    type: AttachmentTypeEnum
    renderingPosition: number
    isInline: boolean
    contentId: string
    isContactPhoto: boolean
    creationTime: number // was: DateTime
    lastModificationTime: number // TODO

    constructor(
        data: Uint8Array, // was: Stream
        fileName: string,
        creationTime: number,
        lastModificationTime: number,
        type: AttachmentTypeEnum = AttachmentType.ATTACH_BY_VALUE,
        renderingPosition: number = -1,
        isInline: boolean = false,
        contentId: string = "",
        isContactPhoto: boolean = false
    ) {
        this.data = data
        this.fileName = fileName
        this.creationTime = creationTime
        this.lastModificationTime = lastModificationTime
        this.type = type
        this.renderingPosition = renderingPosition
        this.isInline = isInline
        this.contentId = contentId
        this.isContactPhoto = isContactPhoto

        if (isInline && isNullOrWhiteSpace(contentId)) {
            throw new Error("contentId can't be empty if isInline is true.")
        }
    }

    writeProperties(storage: any, index: number): number {
        const attachmentProperties = new AttachmentProperties()
        attachmentProperties.addProperty(PropertyTags.PR_ATTACH_NUM, index, PropertyFlag.PROPATTR_READABLE)
        attachmentProperties.addProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey(), PropertyFlag.PROPATTR_READABLE)
        attachmentProperties.addProperty(PropertyTags.PR_RECORD_KEY, generateRecordKey(), PropertyFlag.PROPATTR_READABLE)
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
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_DATA_BIN, this.data)
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_SIZE, this.data.length)
                break

            case AttachmentType.ATTACH_BY_REF_ONLY:
                // TODO:
                throw new Error("attach_by_ref_only not implemented!")
                // $FlowFixMe[unreachable-code]
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_DATA_BIN, new Uint8Array(0))
                // $FlowFixMe[unreachable-code]
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_SIZE, this._file.length)
                // $FlowFixMe[unreachable-code]
                attachmentProperties.addProperty(PropertyTags.PR_ATTACH_LONG_PATHNAME_W, this._file.FullName)
                // $FlowFixMe[unreachable-code]
                break

            //case AttachmentType.ATTACH_EMBEDDED_MSG:
            //    var msgStorage = storage.AddStorage(PropertyTags.PR_ATTACH_DATA_BIN.Name)
            //    var cf = new CompoundFile(Stream)
            //    Storage.Copy(cf.RootStorage, msgStorage)
            //    propertiesStream.AddProperty(PropertyTags.PR_ATTACH_SIZE, Stream.Length)
            //    propertiesStream.AddProperty(PropertyTags.PR_ATTACH_ENCODING, 0)
            //    break

            case AttachmentType.ATTACH_BY_REFERENCE:
            case AttachmentType.ATTACH_BY_REF_RESOLVE:
            case AttachmentType.NO_ATTACHMENT:
            case AttachmentType.ATTACH_OLE:
                throw new Error("AttachByReference, AttachByRefResolve, NoAttachment and AttachOle are not supported")
        }

        if (this.isInline) {
            attachmentProperties.addProperty(PropertyTags.PR_ATTACHMENT_HIDDEN, true)
            attachmentProperties.addProperty(PropertyTags.PR_ATTACH_FLAGS, AttachmentFlags.ATT_MHTML_REF)
        }

        // TODO: DateTime
        const now = Date.now()
        attachmentProperties.addProperty(PropertyTags.PR_CREATION_TIME, now)
        attachmentProperties.addProperty(PropertyTags.PR_LAST_MODIFICATION_TIME, now)
        attachmentProperties.addProperty(PropertyTags.PR_STORE_SUPPORT_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE)

        return attachmentProperties.writeProperties(storage, () => {
        })
    }
}
