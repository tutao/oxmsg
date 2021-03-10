// @flow

import {Attachment} from "./attachment"
import {X8} from "./utils/utils"
import {PropertyTagLiterals} from "./property_tags"

export class Attachments extends Array<Attachment> {

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

	attach(attachment: Attachment): void {
		if (this.length >= 2048) throw new Error("length > 2048 => too many attachments!")
		this.push(attachment)
	}
}