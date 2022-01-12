import {Address} from "./address"
import type {AddressType} from "../enums"
import {TopLevelProperties} from "../streams/top_level_properties"
import {PropertyTags} from "../property_tags"

export class ReceivingRepresenting extends Address {
    constructor(email: string, displayName: string, addressType: AddressType = "SMTP") {
        super(email, displayName, addressType)
    }

    writeProperties(stream: TopLevelProperties) {
        stream.addProperty(PropertyTags.PR_RCVD_REPRESENTING_EMAIL_ADDRESS_W, this.email)
        stream.addProperty(PropertyTags.PR_RCVD_REPRESENTING_NAME_W, this.displayName)
        stream.addProperty(PropertyTags.PR_RCVD_REPRESENTING_ADDRTYPE_W, this.addressType)
    }
}