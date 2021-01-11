// @flow

import {Attachment} from "./attachment"
import {X8} from "./utils/utils"
import {AttachmentType} from "./enums"
import {PropertyTagLiterals} from "./property_tags"
import type {AttachmentTypeEnum} from "./enums";

export class Attachments extends Array<Attachment> {

    /**
     * checks if fileName already exists in this object
     * @param fileName {string} the name to check.
     * @param contentId {string} the contentId of the file
     * @private
     */
    _checkAttachmentFileName(fileName: string, contentId: string) {
        //const file = Path.GetFileName(fileName).toLowerCase()
        const cid = contentId.toLowerCase()

        if (this.some(attachment => attachment.fileName.toLowerCase() === fileName && attachment.contentId.toLowerCase() === cid)) {
            throw new Error("The attachment with the name '" + fileName + "' already exists")
        }
    }

    /**
     * Writes the Attachment objects to the given storage and sets all the needed properties
     * @param rootStorage
     * @returns {number} the total size of the written attachment objects and their properties
     */
    writeToStorage(rootStorage: any): number {
        let size = 0

        for (let i = 0; i < this.length; i++) {
            const attachment = this[i]
            const storage = rootStorage.addStorage(PropertyTagLiterals.AttachmentStoragePrefix + X8(i))
            size += attachment.writeProperties(storage, i)
        }

        return size
    }

    /**
     * adds an Attachment by AttachmentType.ATTACH_BY_VALUE (default)
     * @param data {Uint8Array} data to add as attachment
     * @param fileName {string} file to add with full path
     * @param creationTime {number} file creation time
     * @param lastModificationTime {number} file modification time
     * @param type {AttachmentTypeEnum} how to attach the attachment
     * @param renderingPosition {number} how to display in a rich text message
     * @param isInline {boolean} set to true to add the attachment inline
     * @param contentId {string} the id for the inline attachment if isInline is true
     * @param isContactPhoto {boolean} if the attachment is a contact photo
     */
    add(
        data: Uint8Array,
        fileName: string,
        creationTime: number,
        lastModificationTime: number,
        type: AttachmentTypeEnum = AttachmentType.ATTACH_BY_VALUE,
        renderingPosition: number = -1,
        isInline: boolean = false,
        contentId: string = "",
        isContactPhoto: boolean = false
    ): void {
        if (this.length >= 2048) throw new Error("length > 2048 => too many attachments!")
        this._checkAttachmentFileName(fileName, contentId)
        const a = new Attachment(...arguments)
        this.push(a)
    }
}