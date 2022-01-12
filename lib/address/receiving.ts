import type {AddressType} from "../enums"
import {Address} from "./address"
import {TopLevelProperties} from "../streams/top_level_properties"
import {PropertyTags} from "../property_tags"

export class Receiving extends Address {
    constructor(email: string, displayName: string, addressType: AddressType = "SMTP") {
        super(email, displayName, addressType)
    }

    writeProperties(stream: TopLevelProperties) {
        stream.addProperty(PropertyTags.PR_RECEIVED_BY_EMAIL_ADDRESS_W, this.email)
        stream.addProperty(PropertyTags.PR_RECEIVED_BY_NAME_W, this.displayName)
        stream.addProperty(PropertyTags.PR_RECEIVED_BY_ADDRTYPE_W, this.addressType)
    }
}