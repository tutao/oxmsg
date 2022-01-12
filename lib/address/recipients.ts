import {Address} from "./address"
import {AddressType, MapiObjectType, RecipientRowDisplayType, RecipientType} from "../enums"
import {PropertyTagLiterals, PropertyTags} from "../property_tags"
import {generateEntryId, generateInstanceKey, generateSearchKey} from "../utils/mapi"
import {RecipientProperties} from "../streams/recipient_properties"
import {X8} from "../utils/utils"
import type {CFBStorage} from "../cfb_storage"

/**
 * Wrapper around a list of recipients
 */
export class Recipients extends Array<Recipient> {
    /**
     * add a new To-Recipient to the list
     * @param email email address of the recipient
     * @param displayName display name of the recipient (optional)
     * @param addressType address type of the recipient (default SMTP)
     * @param objectType mapiObjectType of the recipient (default MAPI_MAILUSER)
     * @param displayType recipientRowDisplayType of the recipient (default MessagingUser)
     */
    addTo(
        email: string,
        displayName: string = "",
        addressType: AddressType = "SMTP",
        objectType: MapiObjectType = MapiObjectType.MAPI_MAILUSER,
        displayType: RecipientRowDisplayType = RecipientRowDisplayType.MessagingUser,
    ) {
        this.push(new Recipient(this.length, email, displayName, addressType, RecipientType.To, objectType, displayType))
    }

    /**
     * add a new Cc-Recipient to the list
     * @param email email address of the recipient
     * @param displayName display name of the recipient (optional)
     * @param addressType address type of the recipient (default SMTP)
     * @param objectType mapiObjectType of the recipient (default MAPI_MAILUSER)
     * @param displayType recipientRowDisplayType of the recipient (default MessagingUser)
     */
    addCc(
        email: string,
        displayName: string = "",
        addressType: AddressType = "SMTP",
        objectType: MapiObjectType = MapiObjectType.MAPI_MAILUSER,
        displayType: RecipientRowDisplayType = RecipientRowDisplayType.MessagingUser,
    ) {
        this.push(new Recipient(this.length, email, displayName, addressType, RecipientType.Cc, objectType, displayType))
    }

    addBcc(
        email: string,
        displayName: string = "",
        addressType: AddressType = "SMTP",
        objectType: MapiObjectType = MapiObjectType.MAPI_MAILUSER,
        displayType: RecipientRowDisplayType = RecipientRowDisplayType.MessagingUser,
    ) {
        this.push(new Recipient(this.length, email, displayName, addressType, RecipientType.Bcc, objectType, displayType))
    }

    writeToStorage(rootStorage: CFBStorage): number {
        let size = 0

        for (let i = 0; i < this.length; i++) {
            const recipient = this[i]
            const storage = rootStorage.addStorage(PropertyTagLiterals.RecipientStoragePrefix + X8(i))
            size += recipient.writeProperties(storage)
        }

        return size
    }
}
export class Recipient extends Address {
    _rowId: number
    recipientType: RecipientType
    _displayType: RecipientRowDisplayType
    _objectType: MapiObjectType

    constructor(
        rowId: number,
        email: string,
        displayName: string,
        addressType: AddressType,
        recipientType: RecipientType,
        objectType: MapiObjectType,
        displayType: RecipientRowDisplayType,
    ) {
        super(email, displayName, addressType)
        this._rowId = rowId
        this.recipientType = recipientType
        this._displayType = displayType
        this._objectType = objectType
    }

    writeProperties(storage: any): number {
        const propertiesStream = new RecipientProperties()
        propertiesStream.addProperty(PropertyTags.PR_ROWID, this._rowId)
        propertiesStream.addProperty(PropertyTags.PR_ENTRYID, generateEntryId())
        propertiesStream.addProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey())
        propertiesStream.addProperty(PropertyTags.PR_RECIPIENT_TYPE, this.recipientType)
        propertiesStream.addProperty(PropertyTags.PR_ADDRTYPE_W, this.addressType)
        propertiesStream.addProperty(PropertyTags.PR_EMAIL_ADDRESS_W, this.email)
        propertiesStream.addProperty(PropertyTags.PR_OBJECT_TYPE, this._objectType)
        propertiesStream.addProperty(PropertyTags.PR_DISPLAY_TYPE, this._displayType)
        propertiesStream.addProperty(PropertyTags.PR_DISPLAY_NAME_W, this.displayName)
        propertiesStream.addProperty(PropertyTags.PR_SEARCH_KEY, generateSearchKey(this.addressType, this.email))
        return propertiesStream.writeProperties(storage, () => {})
    }
}