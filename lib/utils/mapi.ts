import {v4} from "uuid"
import {stringToUtf16LeArray} from "./utils"

/// contains MAPI related helper methods
function makeUUIDBuffer(): Uint8Array {
    return v4({}, new Uint8Array(16), 0)
}

let instanceKey = null
// A search key is used to compare the data in two objects. An object's search key is stored in its
// <see cref="PropertyTags.PR_SEARCH_KEY" /> (PidTagSearchKey) property. Because a search key
// represents an object's data and not the object itself, two different objects with the same data can have the same
// search key. When an object is copied, for example, both the original object and its copy have the same data and the
// same search key. Messages and messaging users have search keys. The search key of a message is a unique identifier
// of  the message's data. Message store providers furnish a message's <see cref="PropertyTags.PR_SEARCH_KEY" />
// property at message creation time.The search key of an address book entry is computed from its address type(
// <see cref="PropertyTags.PR_ADDRTYPE_W" /> (PidTagAddressType)) and address
// (<see cref="PropertyTags.PR_EMAIL_ADDRESS_W" /> (PidTagEmailAddress)). If the address book entry is writable,
// its search key might not be available until the address type and address have been set by using the
// IMAPIProp::SetProps method and the entry has been saved by using the IMAPIProp::SaveChanges method.When these
// address properties change, it is possible for the corresponding search key not to be synchronized with the new
// values until the changes have been committed with a SaveChanges call. The value of an object's record key can be
// the same as or different than the value of its search key, depending on the service provider. Some service providers
// use the same value for an object's search key, record key, and entry identifier.Other service providers assign unique
// values for each of its objects identifiers.
export function generateSearchKey(addressType: string, emailAddress: string): Uint8Array {
    return stringToUtf16LeArray(addressType + emailAddress)
}
// A record key is used to compare two objects. Message store and address book objects must have record keys, which
// are stored in their <see cref="PropertyTags.PR_RECORD_KEY" /> (PidTagRecordKey) property. Because a record key
// identifies an object and not its data, every instance of an object has a unique record key. The scope of a record
// key for folders and messages is the message store. The scope for address book containers, messaging users, and
// distribution lists is the set of top-level containers provided by MAPI for use in the integrated address book.
// Record keys can be duplicated in another resource. For example, different messages in two different message stores
// can have the same record key. This is different from long-term entry identifiers; because long-term entry
// identifiers contain a reference to the service provider, they have a wider scope.A message store's record key is
// similar in scope to a long-term entry identifier; it should be unique across all message store providers. To ensure
// this uniqueness, message store providers typically set their record key to a value that is the combination of their
// <see cref="PropertyTags.PR_MDB_PROVIDER" /> (PidTagStoreProvider) property and an identifier that is unique to the
// message store.
export function generateRecordKey(): Uint8Array {
    return makeUUIDBuffer()
}
// This property is a binary value that uniquely identifies a row in a table view. It is a required column in most
// tables. If a row is included in two views, there are two different instance keys. The instance key of a row may
// differ each time the table is opened, but remains constant while the table is open. Rows added while a table is in
// use do not reuse an instance key that was previously used.
// message store.
export function generateInstanceKey(): Uint8Array {
    if (instanceKey == null) {
        instanceKey = makeUUIDBuffer().slice(0, 4)
    }

    return instanceKey
}
// The PR_ENTRYID property contains a MAPI entry identifier used to open and edit properties of a particular MAPI
// object.
// The PR_ENTRYID property identifies an object for OpenEntry to instantiate and provides access to all of its
// properties through the appropriate derived interface of IMAPIProp. PR_ENTRYID is one of the base address properties
// for all messaging users. The PR_ENTRYID for CEMAPI always contains long-term identifiers.
// - Required on folder objects
// - Required on message store objects
// - Required on status objects
// - Changed in a copy operation
// - Unique within entire world
export function generateEntryId(): Uint8Array {
    // Encoding.Unicode.GetBytes(Guid.NewGuid().ToString());
    const val = v4()
    // v4 without args gives a string
    return stringToUtf16LeArray(val as any)
}