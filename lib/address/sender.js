// @flow

import type {AddressType, MessageFormatEnum} from "../enums";
import {MessageFormat} from "../enums";
import {Address} from "./address";
import {PropertyTags} from "../property_tags";
import type {TopLevelProperties} from "../streams/top_level_properties";
import {OneOffEntryId} from "./one_off_entry_id";

export class Sender extends Address {
    _messageFormat: MessageFormatEnum
    _canLookupEmailAddress: boolean
    _senderIsCreator: boolean

    constructor(
        email: string,
        displayName: string,
        addressType: AddressType = "SMTP",
        messageFormat: MessageFormatEnum = MessageFormat.TextAndHtml,
        canLookupEmailAddress: boolean = false,
        senderIsCreator: boolean = true
    ) {
        super(email, displayName, addressType)
        this._messageFormat = messageFormat
        this._canLookupEmailAddress = canLookupEmailAddress
        this._senderIsCreator = senderIsCreator
    }

    writeProperties(stream: TopLevelProperties) {
        if (this._senderIsCreator) {
            stream.addProperty(PropertyTags.PR_CreatorEmailAddr_W, this.email)
            stream.addProperty(PropertyTags.PR_CreatorSimpleDispName_W, this.displayName)
            stream.addProperty(PropertyTags.PR_CreatorAddrType_W, this.addressType)
        }

        const senderEntryId = new OneOffEntryId(
            this.email,
            this.displayName,
            this.addressType,
            this._messageFormat,
            this._canLookupEmailAddress
        )
        stream.addProperty(PropertyTags.PR_SENDER_ENTRYID, senderEntryId.toByteArray())

        stream.addProperty(PropertyTags.PR_SENDER_EMAIL_ADDRESS_W, this.email)
        stream.addProperty(PropertyTags.PR_SENDER_NAME_W, this.displayName)
        stream.addProperty(PropertyTags.PR_SENDER_ADDRTYPE_W, this.addressType)
    }
}