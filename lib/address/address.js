// @flow

import type {AddressType} from "../enums"
import {isNullOrWhiteSpace} from "../utils/utils"

export class Address {
    addressType: AddressType
    email: string
    displayName: string

    constructor(email: string, displayName: string, addressType: AddressType = 'SMTP') {
        this.email = email
        this.displayName = isNullOrWhiteSpace(this.displayName)
            ? email
            : displayName
        this.addressType = addressType;
    }
}