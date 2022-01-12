import CFB from "cfb"
import {CFBStorage} from "./cfb_storage"
import {MessageClass, MessageIconIndex, PropertyFlag} from "./enums"
import type {PropertyTag} from "./property_tags"
import {PropertyTagLiterals, PropertyTags} from "./property_tags"
import {TopLevelProperties} from "./streams/top_level_properties"
import {NamedProperties} from "./streams/named_properties"
// Setting the RootStorage CLSID to this will cause outlook to parse the msg file and import the full email contents,
// rather than just storing it as a file/inserting it as an attachment
// *I am unclear on whether this behaviour can be relied upon, or if it is a fluke*. Will outlook always use this CLSID? will it always interpret an MSG purely based on the CLSID?
// these are questions we should answer, even though it's working now.
// I've inspected MSG files that were exported from outlook on two different machines, and they both have the same CLSID (this one), so maybe it's a safe bet?
// - John Feb 2021
const OUTLOOK_CLSID = "0b0d020000000000c000000000000046"

/**
 * base class for all MSG files
 */
export class Message {
    _saved: boolean = false
    iconIndex: MessageIconIndex
    _topLevelProperties: TopLevelProperties
    _namedProperties: NamedProperties
    _storage: CFBStorage
    _messageClass: MessageClass = MessageClass.Unknown
    _messageSize: number

    constructor() {
        this._storage = new CFBStorage(
            CFB.utils.cfb_new({
                CLSID: OUTLOOK_CLSID,
            }),
        )

        // In the preceding figure, the "__nameid_version1.0" named property mapping storage contains the
        // three streams  used to provide a mapping from property ID to property name
        // ("__substg1.0_00020102", "__substg1.0_00030102", and "__substg1.0_00040102") and various other
        // streams that provide a mapping from property names to property IDs.
        // if (!CompoundFile.RootStorage.TryGetStorage(PropertyTags.NameIdStorage, out var nameIdStorage))
        // nameIdStorage = CompoundFile.RootStorage.AddStorage(PropertyTags.NameIdStorage);
        const nameIdStorage = this._storage.addStorage(PropertyTagLiterals.NameIdStorage)

        nameIdStorage.addStream(PropertyTagLiterals.EntryStream, Uint8Array.of())
        nameIdStorage.addStream(PropertyTagLiterals.StringStream, Uint8Array.of())
        nameIdStorage.addStream(PropertyTagLiterals.GuidStream, Uint8Array.of())
        this._topLevelProperties = new TopLevelProperties()
        this._namedProperties = new NamedProperties(this._topLevelProperties)
    }

    _save() {
        this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_CLASS_W, this._messageClass)

        this._topLevelProperties.writeProperties(this._storage, () => {}, this._messageSize)

        this._namedProperties.writeProperties(this._storage, 0)

        this._saved = true
        this._messageSize = 0
    }

    /**
     * writes the Message to an underlying CFB
     * structure and returns a serialized
     * representation
     *
     */
    saveToBuffer(): Uint8Array {
        this._save()

        return this._storage.toBytes()
    }

    addProperty(propertyTag: PropertyTag, value: any, flags: number = PropertyFlag.PROPATTR_WRITABLE) {
        if (this._saved) throw new Error("Message is already saved!")

        this._topLevelProperties.addOrReplaceProperty(propertyTag, value, flags)
    }
}