// @flow
import {CFBStorage} from "./cfb_storage"
import type {MessageClassEnum, MessageIconIndexEnum} from "./enums"
import {MessageClass, PropertyFlag} from "./enums"
import type {PropertyTag} from "./property_tags"
import {PropertyTagLiterals, PropertyTags} from "./property_tags"
import {TopLevelProperties} from "./streams/top_level_properties"
import {NamedProperties} from "./streams/named_properties"

/**
 * base class for all MSG files
 */
export class Message {
    _saved: boolean = false
    iconIndex: MessageIconIndexEnum
    _topLevelProperties: TopLevelProperties
    _namedProperties: NamedProperties
    _storage: CFBStorage
    _messageClass: MessageClassEnum = MessageClass.Unknown
    _messageSize: number

    constructor() {
        this._storage = new CFBStorage()

        // In the preceding figure, the "__nameid_version1.0" named property mapping storage contains the
        // three streams  used to provide a mapping from property ID to property name
        // ("__substg1.0_00020102", "__substg1.0_00030102", and "__substg1.0_00040102") and various other
        // streams that provide a mapping from property names to property IDs.
        // if (!CompoundFile.RootStorage.TryGetStorage(PropertyTags.NameIdStorage, out var nameIdStorage))
        // nameIdStorage = CompoundFile.RootStorage.AddStorage(PropertyTags.NameIdStorage);

        const nameIdStorage = this._storage.addStorage(PropertyTagLiterals.NameIdStorage)

        nameIdStorage.addStream(PropertyTagLiterals.EntryStream, Uint8Array.of());
        nameIdStorage.addStream(PropertyTagLiterals.StringStream, Uint8Array.of());
        nameIdStorage.addStream(PropertyTagLiterals.GuidStream, Uint8Array.of());

        this._topLevelProperties = new TopLevelProperties();
        this._namedProperties = new NamedProperties(this._topLevelProperties);
    }

    _save() {
        this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_CLASS_W, this._messageClass)
        this._topLevelProperties.writeProperties(this._storage, () => {
        }, this._messageSize)
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

    addProperty(
        propertyTag: PropertyTag,
        value: any,
        flags: number = PropertyFlag.PROPATTR_WRITABLE
    ) {
        if (this._saved) throw new Error("Message is already saved!")
        this._topLevelProperties.addOrReplaceProperty(propertyTag, value, flags)
    }
}