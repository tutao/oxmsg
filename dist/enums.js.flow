// @flow
export const MessageImportance = Object.freeze({
	IMPORTANCE_LOW: 0,
	IMPORTANCE_NORMAL: 1,
	IMPORTANCE_HIGH: 2
})
export type MessageImportanceEnum = $Values<typeof MessageImportance>

export const MessageIconIndex = Object.freeze({
	NewMail: 0x00000000,
	Post: 0x00000001,
	Other: 0x00000003,
	ReadMail: 0x00000100,
	UnreadMail: 0x00000101,
	SubmittedMail: 0x00000102,
	UnsentMail: 0x00000103,
	ReceiptMail: 0x00000104,
	RepliedMail: 0x00000105,
	ForwardedMail: 0x00000106,
	RemoteMail: 0x00000107,
	DeliveryReceipt: 0x00000108,
	ReadReceipt: 0x00000109,
	NondeliveryReport: 0x0000010A,
	NonReadReceipt: 0x0000010B,
	RecallSMail: 0x0000010C,
	RecallFMail: 0x0000010D,
	TrackingMail: 0x0000010E,
	OutOfOfficeMail: 0x0000011B,
	RecallMail: 0x0000011C,
	TrackedMail: 0x00000130,
	Contact: 0x00000200,
	DistributionList: 0x00000202,
	StickyNoteBlue: 0x00000300,
	StickyNoteGreen: 0x00000301,
	StickyNotePink: 0x00000302,
	StickyNoteYellow: 0x00000303,
	StickyNoteWhite: 0x00000304,
	SingleInstanceAppointment: 0x00000400,
	RecurringAppointment: 0x00000401,
	SingleInstanceMeeting: 0x00000402,
	RecurringMeeting: 0x00000403,
	MeetingRequest: 0x00000404,
	Accept: 0x00000405,
	Decline: 0x00000406,
	Tentatively: 0x00000407,
	Cancellation: 0x00000408,
	InformationalUpdate: 0x00000409,
	TaskTask: 0x00000500,
	UnassignedRecurringTask: 0x00000501,
	AssigneesTask: 0x00000502,
	AssignersTask: 0x00000503,
	TaskRequest: 0x00000504,
	TaskAcceptance: 0x00000505,
	TaskRejection: 0x00000506,
	JournalConversation: 0x00000601,
	JournalEmailMessage: 0x00000602,
	JournalMeetingRequest: 0x00000603,
	JournalMeetingResponse: 0x00000604,
	JournalTaskRequest: 0x00000606,
	JournalTaskResponse: 0x00000607,
	JournalNote: 0x00000608,
	JournalFax: 0x00000609,
	JournalPhoneCall: 0x0000060A,
	JournalLetter: 0x0000060C,
	JournalMicrosoftOfficeWord: 0x0000060D,
	JournalMicrosoftOfficeExcel: 0x0000060E,
	JournalMicrosoftOfficePowerPoint: 0x0000060F,
	JournalMicrosoftOfficeAccess: 0x00000610,
	JournalDocument: 0x00000612,
	JournalMeeting: 0x00000613,
	JournalMeetingCancellation: 0x00000614,
	JournalRemoteSession: 0x00000615
})
export type MessageIconIndexEnum = $Values<typeof MessageIconIndex>

export type AddressType = ''
	| 'EX'
	| 'SMTP'
	| 'FAX'
	| 'MHS'
	| 'PROFS'
	| 'X400'

export const MapiObjectType = Object.freeze({
	// Address book container object
	MAPI_ABCONT: 4,
	// Address book object
	MAPI_ADDRBOOK: 2,
	// Message attachment object
	MAPI_ATTACH: 7,
	// Distribution list object
	MAPI_DISTLIST: 8,
	// Folder object
	MAPI_FOLDER: 3,
	// Form object
	MAPI_FORMINFO: 12,
	// Messaging user object
	MAPI_MAILUSER: 6,
	// Message object
	MAPI_MESSAGE: 5,
	// Profile section object
	MAPI_PROFSECT: 9,
	// Session object
	MAPI_SESSION: 11,
	// Status object
	MAPI_STATUS: 10,
	// Message store object
	MAPI_STORE: 1
})
export type MapiObjectTypeEnum = $Values<typeof MapiObjectType>

export const RecipientRowDisplayType = Object.freeze({
	// A messaging user
	MessagingUser: 0x00,
	// A distribution list
	DistributionList: 0x01,
	// A forum, such as a bulletin board service or a public or shared folder
	Forum: 0x02,
	// An automated agent
	AutomatedAgent: 0x03,
	// An Address Book object defined for a large group, such as helpdesk, accounting, coordinator, or
	// department
	AddressBook: 0x04,
	// A private, personally administered distribution list
	PrivateDistributionList: 0x05,
	// An Address Book object known to be from a foreign or remote messaging system
	RemoteAddressBook: 0x06
})
export type RecipientRowDisplayTypeEnum = $Values<typeof RecipientRowDisplayType>

export const RecipientType = Object.freeze({
	// The recipient is the message originator
	Originator: 0x0000,
	// The recipient is a primary (To) recipient. Clients are required to handle primary recipients. All other types are optional.
	To: 0x0001,
	// The recipient is a carbon copy (CC) recipient, a recipient that receives a message in addition to the primary recipients.
	Cc: 0x0002,
	// The recipient is a blind carbon copy (BCC) recipient. Primary and carbon copy recipients are unaware of the existence of BCC recipients.
	Bcc: 0x0003,
	// The recipient is a resource (e.g. a room)
	Resource: 0x0004,
	// The recipient is a room (uses PR_RECIPIENT_TYPE_EXE) needs Exchange 2007 or higher
	Room: 0x0007
})
export type RecipientTypeEnum = $Values<typeof RecipientType>

// Specifies a bit field that describes the recipient status.
// See https://msdn.microsoft.com/en-us/library/office/cc815629.aspx
export const RecipientFlags = {
	// The recipient is a Sendable Attendee. This flag is only used in the dispidApptUnsendableRecips
	// (PidLidAppointmentUnsendableRecipients) property.
	RecipSendable: 0x00000001,

	// The RecipientRow on which this flag is set represents the meeting Organizer.
	RecipOrganizer: 0x0000002,

	// Indicates that the attendee gave a response for the exception on which this RecipientRow resides. This flag is only
	// used in a RecipientRow of an exception embedded message object of the organizer’s meeting object.
	RecipExceptionalResponse: 0x00000010,

	// Indicates that although the RecipientRow exists, it should be treated as if the corresponding recipient does not.
	// This flag is only used in a RecipientRow of an exception embedded message object of the organizer’s meeting object.
	RecipExceptionalDeleted: 0x00000020,

	// Indicates the recipient is an original attendee. This flag is only used in the dispidApptUnsendableRecips property.
	RecipOriginal: 0x00000100
}
export type RecipientFlagsEnum = $Values<typeof RecipientFlags>

// The type of a property in the properties stream
/// </summary>
export const PropertyType = Object.freeze({
	// Any: this property type value matches any type; a server MUST return the actual type in its response. Servers
	// MUST NOT return this type in response to a client request other than NspiGetIDsFromNames or the
	// RopGetPropertyIdsFromNamesROP request ([MS-OXCROPS] section 2.2.8.1). (PT_UNSPECIFIED)
	PT_UNSPECIFIED: 0x0000,
	// None: This property is a placeholder. (PT_NULL)
	PT_NULL: 0x0001,
	// 2 bytes; a 16-bit integer (PT_I2, i2, ui2)
	PT_SHORT: 0x0002,
	// 4 bytes; a 32-bit integer (PT_LONG, PT_I4, int, ui4)
	PT_LONG: 0x0003,
	// 4 bytes; a 32-bit floating point number (PT_FLOAT, PT_R4, float, r4)
	PT_FLOAT: 0x0004,
	// 8 bytes; a 64-bit floating point number (PT_DOUBLE, PT_R8, r8)
	PT_DOUBLE: 0x0005,
	// 8 bytes; a 64-bit floating point number in which the whole number part represents the number of days since
	// December 30, 1899, and the fractional part represents the fraction of a day since midnight (PT_APPTIME)
	PT_APPTIME: 0x0007,
	// 4 bytes; a 32-bit integer encoding error information as specified in section 2.4.1. (PT_ERROR)
	PT_ERROR: 0x000A,
	// 1 byte; restricted to 1 or 0 (PT_BOOLEAN. bool)
	PT_BOOLEAN: 0x000B,
	// The property value is a Component Object Model (COM) object, as specified in section 2.11.1.5. (PT_OBJECT)
	PT_OBJECT: 0x000D,
	// 8 bytes; a 64-bit integer (PT_LONGLONG, PT_I8, i8, ui8)
	PT_I8: 0x0014,
	// 8 bytes; a 64-bit integer (PT_LONGLONG, PT_I8, i8, ui8)
	PT_LONGLONG: 0x0014,
	// Variable size; a string of Unicode characters in UTF-16LE format encoding with terminating null character
	// (0x0000). (PT_UNICODE, string)
	PT_UNICODE: 0x001F,
	// Variable size; a string of multibyte characters in externally specified encoding with terminating null
	// character (single 0 byte). (PT_STRING8) ... ANSI format
	PT_STRING8: 0x001E,
	// 8 bytes; a 64-bit integer representing the number of 100-nanosecond intervals since January 1, 1601
	// (PT_SYSTIME, time, datetime, datetime.tz, datetime.rfc1123, Date, time, time.tz)
	PT_SYSTIME: 0x0040,
	// 16 bytes; a GUID with Data1, Data2, and Data3 fields in little-endian format (PT_CLSID, UUID)
	PT_CLSID: 0x0048,
	// Variable size; a 16-bit COUNT field followed by a structure as specified in section 2.11.1.4. (PT_SVREID)
	PT_SVREID: 0x00FB,
	// Variable size; a byte array representing one or more Restriction structures as specified in section 2.12.
	// (PT_SRESTRICT)
	PT_SRESTRICT: 0x00FD,
	// Variable size; a 16-bit COUNT field followed by that many rule (4) action (3) structures, as specified in
	// [MS-OXORULE] section 2.2.5. (PT_ACTIONS)
	PT_ACTIONS: 0x00FE,
	// Variable size; a COUNT field followed by that many bytes. (PT_BINARY)
	PT_BINARY: 0x0102,
	// Variable size; a COUNT field followed by that many PT_MV_SHORT values. (PT_MV_SHORT, PT_MV_I2, mv.i2)
	PT_MV_SHORT: 0x1002,
	// Variable size; a COUNT field followed by that many PT_MV_LONG values. (PT_MV_LONG, PT_MV_I4, mv.i4)
	PT_MV_LONG: 0x1003,
	// Variable size; a COUNT field followed by that many PT_MV_FLOAT values. (PT_MV_FLOAT, PT_MV_R4, mv.float)
	PT_MV_FLOAT: 0x1004,
	// Variable size; a COUNT field followed by that many PT_MV_DOUBLE values. (PT_MV_DOUBLE, PT_MV_R8)
	PT_MV_DOUBLE: 0x1005,
	// Variable size; a COUNT field followed by that many PT_MV_CURRENCY values. (PT_MV_CURRENCY, mv.fixed.14.4)
	PT_MV_CURRENCY: 0x1006,
	// Variable size; a COUNT field followed by that many PT_MV_APPTIME values. (PT_MV_APPTIME)
	PT_MV_APPTIME: 0x1007,
	// Variable size; a COUNT field followed by that many PT_MV_LONGLONGvalues. (PT_MV_I8, PT_MV_I8)
	PT_MV_LONGLONG: 0x1014,
	// Variable size; a COUNT field followed by that many PT_MV_UNICODE values. (PT_MV_UNICODE)
	PT_MV_TSTRING: 0x101F,
	// Variable size; a COUNT field followed by that many PT_MV_UNICODE values. (PT_MV_UNICODE)
	PT_MV_UNICODE: 0x101F,
	// Variable size; a COUNT field followed by that many PT_MV_STRING8 values. (PT_MV_STRING8, mv.string)
	PT_MV_STRING8: 0x101E,
	// Variable size; a COUNT field followed by that many PT_MV_SYSTIME values. (PT_MV_SYSTIME)
	PT_MV_SYSTIME: 0x1040,
	// Variable size; a COUNT field followed by that many PT_MV_CLSID values. (PT_MV_CLSID, mv.uuid)
	PT_MV_CLSID: 0x1048,
	// Variable size; a COUNT field followed by that many PT_MV_BINARY values. (PT_MV_BINARY, mv.bin.hex)
	PT_MV_BINARY: 0x1102,
})

export type PropertyTypeEnum = $Values<typeof PropertyType>

export function propertyTypeName(prop: PropertyTypeEnum): string {
	return (Object.entries(PropertyType).find(([name, value]) => prop === name): any)[0]
}

// Flags used to set on a <see cref="Structures.Property" />
// See https://msdn.microsoft.com/en-us/library/ee158556(v=exchg.80).aspx
export const PropertyFlag = Object.freeze({

	// If this flag is set for a property, that property MUST NOT be deleted from the .msg file
	// (irrespective of which storage it is contained in) and implementations MUST return an error
	// if any attempt is made to do so. This flag is set in circumstances where the implementation
	// depends on that property always being present in the .msg file once it is written there.
	PROPATTR_MANDATORY: 0x00000001,

	// If this flag is not set on a property, that property MUST NOT be read from the .msg file
	// and implementations MUST return an error if any attempt is made to read it. This flag is
	// set on all properties unless there is an implementation-specific reason to prevent a property
	// from being read from the .msg file.
	PROPATTR_READABLE: 0x00000002,

	// If this flag is not set on a property, that property MUST NOT be modified or deleted and
	// implementations MUST return an error if any attempt is made to do so. This flag is set in
	// circumstances where the implementation depends on the properties being writable.
	PROPATTR_WRITABLE: 0x00000004
})

// this doesn't include combination of the flags due to flow limitations.
// don't use.
type PropertyFlagEnum = $Values<typeof PropertyFlag>

export const MessageClass = Object.freeze({
	Unknown: null,
	IPM_Note: "IPM.Note",
	IPM_Note_SMIME: "IPM.Note.SMIME",
	IPM_Note_SMIME_MultipartSigned: "IPM.Note.SMIME.MultipartSigned",
	IPM_Note_Receipt_SMIME: "IPM.Note.Receipt.SMIME",
	IPM_Post: "IPM.Post",
	IPM_Octel_Voice: "IPM.Octel.Voice",
	IPM_Voicenotes: "IPM.Voicenotes",
	IPM_Sharing: "IPM.Sharing",
	REPORT_IPM_NOTE_NDR: "REPORT.IPM.NOTE.NDR",
	REPORT_IPM_NOTE_DR: "REPORT.IPM.NOTE.DR",
	REPORT_IPM_NOTE_DELAYED: "REPORT.IPM.NOTE.DELAYED",
	REPORT_IPM_NOTE_IPNRN: "*REPORT.IPM.NOTE.IPNRN",
	REPORT_IPM_NOTE_IPNNRN: "*REPORT.IPM.NOTE.IPNNRN",
	REPORT_IPM_SCHEDULE_MEETING_REQUEST_NDR: "REPORT.IPM.SCHEDULE. MEETING.REQUEST.NDR",
	REPORT_IPM_SCHEDULE_MEETING_RESP_POS_NDR: "REPORT.IPM.SCHEDULE.MEETING.RESP.POS.NDR",
	REPORT_IPM_SCHEDULE_MEETING_RESP_TENT_NDR: "REPORT.IPM.SCHEDULE.MEETING.RESP.TENT.NDR",
	REPORT_IPM_SCHEDULE_MEETING_CANCELED_NDR: "REPORT.IPM.SCHEDULE.MEETING.CANCELED.NDR",
	REPORT_IPM_NOTE_SMIME_NDR: "REPORT.IPM.NOTE.SMIME.NDR",
	REPORT_IPM_NOTE_SMIME_DR: "*REPORT.IPM.NOTE.SMIME.DR",
	REPORT_IPM_NOTE_SMIME_MULTIPARTSIGNED_NDR: "*REPORT.IPM.NOTE.SMIME.MULTIPARTSIGNED.NDR",
	REPORT_IPM_NOTE_SMIME_MULTIPARTSIGNED_DR: "*REPORT.IPM.NOTE.SMIME.MULTIPARTSIGNED.DR",
	IPM_Appointment: "IPM.Appointment",
	IPM_Task: "IPM.Task",
})

export type MessageClassEnum = $Values<typeof MessageClass>

export const MessageEditorFormat = Object.freeze({
	// The format for the editor to use is unknown.
	EDITOR_FORMAT_DONTKNOW: 0x00000000,
	// The editor should display the message in plain text format.
	EDITOR_FORMAT_PLAINTEXT: 0x00000001,
	// The editor should display the message in HTML format.
	EDITOR_FORMAT_HTML: 0x00000002,
	// The editor should display the message in Rich Text Format.
	EDITOR_FORMAT_RTF: 0x00000003,
})

export type MessageEditorFormatEnum = $Values<typeof MessageEditorFormat>


export const MessageFormat = Object.freeze({
	TextOnly: 0,
	HtmlOnly: 1,
	TextAndHtml: 2,
})

export type MessageFormatEnum = $Values<typeof MessageFormat>

export const MessagePriority = Object.freeze({
	PRIO_NONURGENT: 0,
	PRIO_NORMAL: 1,
	PRIO_URGENT: 2
})

export type MessagePriorityEnum = $Values<typeof MessagePriority>

export const AttachmentType = Object.freeze({
	// There is no attachment
	NO_ATTACHMENT: 0x00000000,

	// The  PropertyTags.PR_ATTACH_DATA_BIN property contains the attachment data
	ATTACH_BY_VALUE: 0x00000001,

	// The "PropertyTags.PR_ATTACH_PATHNAME_W" or "PropertyTags.PR_ATTACH_LONG_PATHNAME_W"
	// property contains a fully qualified path identifying the attachment to recipients with access to a common file server
	ATTACH_BY_REFERENCE: 0x0002,

	// The "PropertyTags.PR_ATTACH_PATHNAME_W" or "PropertyTags.PR_ATTACH_LONG_PATHNAME_W"
	// property contains a fully qualified path identifying the attachment
	ATTACH_BY_REF_RESOLVE: 0x0003,

	// The "PropertyTags.PR_ATTACH_PATHNAME_W" or "PropertyTags.PR_ATTACH_LONG_PATHNAME_W"
	// property contains a fully qualified path identifying the attachment
	ATTACH_BY_REF_ONLY: 0x0004,

	// The "PropertyTags.PR_ATTACH_DATA_OBJ" (PidTagAttachDataObject) property contains an embedded object
	// that supports the IMessage interface
	ATTACH_EMBEDDED_MSG: 0x0005,

	// The attachment is an embedded OLE object
	ATTACH_OLE: 0x0006,
})

export type AttachmentTypeEnum = $Values<typeof AttachmentType>

export const AttachmentFlags = Object.freeze({
	// Indicates that this attachment is not available to HTML rendering applications and should be ignored in
	// Multipurpose Internet Mail Extensions (MIME) processing.
	ATT_INVISIBLE_IN_HTML: 0x00000001,

	// Indicates that this attachment is not available to applications rendering in Rich Text Format (RTF) and should be
	// ignored by MAPI.
	ATT_INVISIBLE_IN_RTF: 0x00000002,

	// The Attachment object is referenced and rendered within the HTML body of the associated Message object.
	ATT_MHTML_REF: 0x00000004,
})

export const StoreSupportMask = Object.freeze({
	// The message store supports properties containing ANSI (8-bit) characters.
	STORE_ANSI_OK: 0x00020000,

	// The message store supports attachments (OLE or non-OLE) to messages.
	STORE_ATTACH_OK: 0x00000020,

	// The message store supports categorized views of tables.
	STORE_CATEGORIZE_OK: 0x00000400,

	// The message store supports creation of new messages.
	STORE_CREATE_OK: 0x00000010,

	// Entry identifiers for the objects in the message store are unique, that is, never reused during the life of the
	// store.
	STORE_ENTRYID_UNIQUE: 0x00000001,

	// The message store supports HTML messages, stored in the <see cref="PropertyTags.PR_HTML" /> (PidTagBodyHtml)
	// property. Note that STORE_HTML_OK is not defined in versions of MAPIDEFS.H that are included with Microsoft Exchange
	// 2000 Server and earlier. If your development environment uses a MAPIDEFS.H file that does not include STORE_HTML_OK,
	// use the value 0x00010000 instead.
	STORE_HTML_OK: 0x00010000,

	// In a wrapped PST store, indicates that when a new message arrives at the store, the store does rules and spam
	// filter processing on the message separately. The store calls IMAPISupport::Notify, setting fnevNewMail in the
	// NOTIFICATION structure that is passed as a parameter, and then passes the details of the new message to the
	// listening client. Subsequently, when the listening client receives the notification, it does not process rules on
	// the message.
	STORE_ITEMPROC: 0x00200000,

	// This flag is reserved and should not be used.
	STORE_LOCALSTORE: 0x00080000,

	// The message store supports modification of its existing messages.
	STORE_MODIFY_OK: 0x00000008,

	// The message store supports multivalued properties, guarantees the stability of value order in a multivalued
	// property throughout a save operation, and supports instantiation of multivalued properties in tables.
	STORE_MV_PROPS_OK: 0x00000200,

	// The message store supports notifications.
	STORE_NOTIFY_OK: 0x00000100,

	// The message store supports OLE attachments. The OLE data is accessible through an IStorage interface, such as that
	// available through the PR_ATTACH_DATA_OBJ (PidTagAttachDataObject) property
	STORE_OLE_OK: 0x00000040,

	// The folders in this store are public (multi-user), not private (possibly multi-instance but not multi-user).
	STORE_PUBLIC_FOLDERS: 0x00004000,

	// The MAPI Protocol Handler will not crawl the store, and the store is responsible to push any changes through
	// notifications to the indexer to have messages indexed.
	STORE_PUSHER_OK: 0x00800000,

	// All interfaces for the message store have a read-only access level.
	STORE_READONLY: 0x00000002,

	// The message store supports restrictions.
	STORE_RESTRICTION_OK: 0x00001000,

	// The message store supports Rich Text Format (RTF) messages, usually compressed, and the store itself keeps
	// <see cref="PropertyTags.PR_BODY_W" /> and <see cref="PropertyTags.PR_RTF_COMPRESSED" /> synchronized.
	STORE_RTF_OK: 0x00000800,

	// The message store supports search-results folders.
	STORE_SEARCH_OK: 0x00000004,

	// The message store supports sorting views of tables.
	STORE_SORT_OK: 0x00002000,

	// The message store supports marking a message for submission.
	STORE_SUBMIT_OK: 0x00000080,

	// The message store supports storage of RTF messages in uncompressed form. An uncompressed RTF stream is identified
	// by the value dwMagicUncompressedRTF in the stream header. The dwMagicUncompressedRTF value is defined in the
	// RTFLIB.H file
	STORE_UNCOMPRESSED_RTF: 0x00008000,

	// The message store supports properties containing Unicode characters.
	STORE_UNICODE_OK: 0x00040000
})

export const StoreSupportMaskConst
	= StoreSupportMask.STORE_ATTACH_OK
	// | StoreSupportMask.STORE_CATEGORIZE_OK
	| StoreSupportMask.STORE_CREATE_OK
	//StoreSupportMask.STORE_ENTRYID_UNIQUE
	| StoreSupportMask.STORE_MODIFY_OK
	// | StoreSupportMask.STORE_MV_PROPS_OK
	// | StoreSupportMask.STORE_OLE_OK
	// | StoreSupportMask.STORE_RTF_OK
	| StoreSupportMask.STORE_HTML_OK
	| StoreSupportMask.STORE_UNICODE_OK

// system.net.mail.MailPriority
export const MailPriority = Object.freeze({
	High: 2,
	Low: 1,
	Normal: 0
})

export type MailPriorityEnum = $Values<typeof MailPriority>

export const ContentTransferEncoding = Object.freeze({
	SevenBit: "7bit",
	EightBit: "8bit",
	QuotedPrintable: "quoted-printable",
	Base64: "base64",
	Binary: "binary"
})

export type ContentTransferEncodingEnum = $Values<typeof ContentTransferEncoding>

/**
 *      Contains a bitmask of flags that indicate the origin and current state of a message.
 *
 *      See https://msdn.microsoft.com/en-us/library/cc839733(v=office.15).aspx
 *      This property is a nontransmittable message property exposed at both the sending and receiving ends of a
 *      transmission, with different values depending upon the client application or store provider involved. This property
 *      is initialized by the client or message store provider when a message is created and saved for the first time and
 *      then updated periodically by the message store provider, a transport provider, and the MAPI spooler as the message
 *      is processed and its state changes.
 *      This property exists on a message both before and after submission, and on all copies of the received
 *      message. Although it is not a recipient property, it is exposed differently to each recipient according to whether
 *      it has been read or modified by that recipient.
 */
export const MessageFlags = Object.freeze({
	// The message is marked as having been read. This can occur as the result of a call at any time to
	// IMessage::SetReadFlag or IMAPIFolder::SetReadFlags. Clients can also set this flag by calling a message's
	// IMAPIProp::SetProps method before the message has been saved for the first time. This flag is ignored if the
	// ASSOCIATED flag is set.
	MSGFLAG_READ: 0x0001,
	// The outgoing message has not been modified since the first time that it was saved; the incoming message has not
	// been modified since it was delivered.
	MSGFLAG_UNMODIFIED: 0x0002,
	// The message is marked for sending as a result of a call to IMessage::SubmitMessage. Message store providers set
	// this flag; the client has read-only access.
	MSGFLAG_SUBMIT: 0x0004,
	// The message is still being composed. It is saved, but has not been sent. The client or provider has read/write
	// access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter. If a client doesn't set
	// this flag by the time the message is sent, the message store provider sets it when IMessage::SubmitMessage is
	// called. Typically, this flag is cleared after the message is sent.
	MSGFLAG_UNSENT: 0x0008,
	// The message has at least one attachment. This flag corresponds to the message's PR_HASATTACH (PidTagHasAttachments)
	// property. The client has read-only access to this flag.
	MSGFLAG_HASATTACH: 0x0010,
	// The messaging user sending was the messaging user receiving the message. The client or provider has read/write
	// access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter. This flag is meant to be
	// set by the transport provider.
	MSGFLAG_FROMME: 0x0020,
	// The message is an associated message of a folder. The client or provider has read-only access to this flag. The
	// READ flag is ignored for associated messages, which do not retain a read/unread state.
	MSGFLAG_ASSOCIATED: 0x040,
	// The message includes a request for a resend operation with a nondelivery report. The client or provider has
	// read/write access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter.
	MSGFLAG_RESEND: 0x0080,
	// A read report needs to be sent for the message. The client or provider has read-only access to this flag.
	MSGFLAG_NOTIFYREAD: 0x100,
	// A nonread report needs to be sent for the message. The client or provider has read-only access to this flag.
	MSGFLAG_NOTIFYUNREAD: 0x0200,
	// The message has been read at least once. This flag is set or cleared by the server whenever the MSGFLAG_READ flag
	// is set or cleared.
	MSGFLAG_EVERREAD: 0x0400,
	// The incoming message arrived over an X.400 link. It originated either outside the organization or from a source the
	// gateway cannot consider trusted. The client should display an appropriate message to the user. Transport providers
	// set this flag; the client has read-only access.
	MSGFLAG_ORIGIN_X400: 0x1000,
	// The incoming message arrived over the Internet. It originated either outside the organization or from a source the
	// gateway cannot consider trusted. The client should display an appropriate message to the user. Transport providers
	// set this flag; the client has read-only access.
	MSGFLAG_ORIGIN_INTERNET: 0x2000,
	// The incoming message arrived over an external link other than X.400 or the Internet. It originated either outside
	// the organization or from a source the gateway cannot consider trusted. The client should display an appropriate
	// message to the user. Transport providers set this flag; the client has read-only access.
	MSGFLAG_ORIGIN_MISC_EXT: 0x8000
})

/**
 * Contains a bitmask of flags indicating the operations that are available to the client for the object.
 * See https://msdn.microsoft.com/en-us/library/office/cc979218.aspx
 * This property is read-only for the client. It must be a bitwise OR of zero or more values from the following table.
 */
export const MapiAccess = Object.freeze({
	// write
	MAPI_ACCESS_MODIFY: 0x00000001,

	// read
	MAPI_ACCESS_READ: 0x00000002,

	// delete
	MAPI_ACCESS_DELETE: 0x00000004,

	// Create subfolders in the folder hierarchy
	MAPI_ACCESS_CREATE_HIERARCHY: 0x00000008,

	// Create content messages
	MAPI_ACCESS_CREATE_CONTENTS: 0x00000010,

	// Create associated content messages
	MAPI_ACCESS_CREATE_ASSOCIATED: 0x00000020
})

/**
 * Kind (1 byte): The possible values for the Kind field are in the following table.
 */
export const PropertyKind = Object.freeze({
	// The property is identified by the LID field (numerical named property)
	Lid: 0x00,
	// The property is identified by the Name field (string named property)
	Name: 0x01,
	// The property does not have an associated PropertyName field.
	NotAssociated: 0xFF
})

export type PropertyKindEnum = $Values<typeof PropertyKind>