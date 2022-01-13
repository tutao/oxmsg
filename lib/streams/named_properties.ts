import {TopLevelProperties} from "./top_level_properties"
import {PropertyKind, PropertyType} from "../enums"
import {PropertyTagLiterals} from "../property_tags"
import {EntryStream, EntryStreamItem, IndexAndKindInformation} from "./entry_stream"
import {GuidStream} from "./guid_stream"
import {StringStream} from "./string_stream"

type NamedProperty = {
    nameIdentifier: number
    kind: PropertyKind
    nameSize: number
    name: string
    guid: Uint8Array
}
type NamedPropertyTag = {
    id: number
    name: string
    guid: Uint8Array
    propertyType: PropertyType
}

export class NamedProperties extends Array<NamedProperty> {
    private readonly _topLevelProperties: TopLevelProperties

    constructor(topLevelProperties: TopLevelProperties) {
        super()
        this._topLevelProperties = topLevelProperties
    }

    /**
     * adds a NamedPropertyTag. Only support for properties by ID for now.
     * @param mapiTag {NamedProperty}
     * @param obj {any}
     */
    addProperty(mapiTag: NamedPropertyTag, obj: any): void {
        throw new Error("Not implemented")
    }

    /**
     * Writes the properties to the storage. Unfortunately this is going to have to be used after we already written the top level properties.
     * @param storage {any}
     * @param messageSize {number}
     */
    writeProperties(storage: any, messageSize: number = 0): void {
        // Grab the nameIdStorage, 3.1 on the SPEC
        storage = storage.getStorage(PropertyTagLiterals.NameIdStorage)
        const entryStream = new EntryStream(storage)
        const stringStream = new StringStream(storage)
        const guidStream = new GuidStream(storage)
        const entryStream2 = new EntryStream(storage)
        // TODO:
        const guids = this.map(np => np.guid).filter(
            /* TODO: unique*/
            () => {
                throw new Error()
            },
        )
        guids.forEach(g => guidStream.push(g))
        this.forEach((np, propertyIndex) => {
            // (ushort) (guids.IndexOf(namedProperty.Guid) + 3);
            const guidIndex = guids.indexOf(np.guid) + 3
            // Depending on the property type. This is doing name.
            entryStream.push(new EntryStreamItem(np.nameIdentifier, new IndexAndKindInformation(propertyIndex, guidIndex, PropertyKind.Lid))) //+3 as per spec.

            entryStream2.push(new EntryStreamItem(np.nameIdentifier, new IndexAndKindInformation(propertyIndex, guidIndex, PropertyKind.Lid)))
            //3.2.2 of the SPEC [MS-OXMSG]
            entryStream2.write(storage, NamedProperties._generateStreamString(np.nameIdentifier, guidIndex, np.kind))
            // 3.2.2 of the SPEC Needs to be written, because the stream changes as per named object.
            entryStream2.splice(0, entryStream2.length)
        })
        guidStream.write(storage)
        entryStream.write(storage)
        stringStream.write(storage)
    }

    /**
     * generates the stream strings
     * @param nameIdentifier {number} was uint
     * @param guidTarget {number} was uint
     * @param propertyKind {PropertyKind} 1 byte
     */
    static _generateStreamString(nameIdentifier: number, guidTarget: number, propertyKind: PropertyKind): string {
        switch (propertyKind) {
            case PropertyKind.Lid:
                const number = ((4096 + ((nameIdentifier ^ (guidTarget << 1)) % 0x1f)) << 16) | 0x00000102
                return "__substg1.0_" + number.toString(16).toUpperCase().padStart(8, "0")

            default:
                throw new Error("not implemented!")
        }
    }
}