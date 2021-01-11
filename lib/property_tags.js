// @flow
import type {PropertyTypeEnum} from "./enums";
import {PropertyType} from "./enums";

export type PropertyTag = {| id: number, type: PropertyTypeEnum |}

export const PropertyTagLiterals = Object.freeze({
    // The prefix for a Recipient {OpenMcdf.CFStorage
    RecipientStoragePrefix: "__recip_version1.0_#",
    // The prefix for an Attachment OpenMcdf.CFStorage
    AttachmentStoragePrefix: "__attach_version1.0_#",
    // The prefix for a PropertyTag OpenMcdf.CFStream
    SubStorageStreamPrefix: "__substg1.0_",
    // The name for the properties stream
    PropertiesStreamName: "__properties_version1.0",
    // The name id storage (named property mapping storage)
    NameIdStorage: "__nameid_version1.0",
    // The EntryStream stream
    EntryStream: "__substg1.0_00030102",
    // The GuidStream stream
    GuidStream: "__substg1.0_00020102",
    // The Streams.StringStream stream
    StringStream: "__substg1.0_00040102",
})
export type PropertyTagLiteralsEnum = $Values<typeof PropertyTagLiterals>

export const PropertyTags: { [string]: PropertyTag } = Object.freeze({
    //property tag literals were here
    // Contains the identifier of the mode for message acknowledgment.
    PR_ACKNOWLEDGEMENT_MODE: {id: 0x0001, type: PropertyType.PT_LONG},
    // Contains TRUE if the sender permits auto forwarding of this message.
    PR_ALTERNATE_RECIPIENT_ALLOWED: {id: 0x0002, type: PropertyType.PT_BOOLEAN},
    // Contains a list of entry identifiers for users who have authorized the sending of a message.
    PR_AUTHORIZING_USERS: {id: 0x0003, type: PropertyType.PT_BINARY},
    // Contains a unicode comment added by the auto-forwarding agent.
    PR_AUTO_FORWARD_COMMENT_W: {id: 0x0004, type: PropertyType.PT_UNICODE},
    // Contains a comment added by the auto-forwarding agent.
    PR_AUTO_FORWARD_COMMENT_A: {id: 0x0004, type: PropertyType.PT_STRING8},
    // Contains TRUE if the client requests an X-MS-Exchange-Organization-AutoForwarded header field.
    PR_AUTO_FORWARDED: {id: 0x0005, type: PropertyType.PT_BOOLEAN},
    // Contains an identifier for the algorithm used to confirm message content confidentiality.
    PR_CONTENT_CONFIDENTIALITY_ALGORITHM_ID: {id: 0x0006, type: PropertyType.PT_BINARY},
    // Contains a value the message sender can use to match a report with the original message.
    PR_CONTENT_CORRELATOR: {id: 0x0007, type: PropertyType.PT_BINARY},
    // Contains a unicode key value that enables the message recipient to identify its content.
    PR_CONTENT_IDENTIFIER_W: {id: 0x0008, type: PropertyType.PT_UNICODE},
    // Contains a ANSI key value that enables the message recipient to identify its content.
    PR_CONTENT_IDENTIFIER_A: {id: 0x0008, type: PropertyType.PT_STRING8},
    // Contains a message length, in bytes, passed to a client application or service provider to determine if a message
    // of that length can be delivered.
    PR_CONTENT_LENGTH: {id: 0x0009, type: PropertyType.PT_LONG},
    // Contains TRUE if a message should be returned with a nondelivery report.
    PR_CONTENT_RETURN_REQUESTED: {id: 0x000A, type: PropertyType.PT_BOOLEAN},
    // Contains the conversation key used in Microsoft Outlook only when locating IPM.MessageManager messages, such as the
    // message that contains download history for a Post Office Protocol (POP3) account. This property has been deprecated
    // in Exchange Server.
    PR_CONVERSATION_KEY: {id: 0x000B, type: PropertyType.PT_BINARY},
    // Contains the encoded information types (EITs) that are applied to a message in transit to describe conversions.
    PR_CONVERSION_EITS: {id: 0x000C, type: PropertyType.PT_BINARY},
    // Contains TRUE if a message transfer agent (MTA) is prohibited from making message text conversions that lose
    // information.
    PR_CONVERSION_WITH_LOSS_PROHIBITED: {id: 0x000D, type: PropertyType.PT_BOOLEAN},
    // Contains an identifier for the types of text in a message after conversion.
    PR_CONVERTED_EITS: {id: 0x000E, type: PropertyType.PT_BINARY},
    // 	Contains the date and time when a message sender wants a message delivered.
    PR_DEFERRED_DELIVERY_TIME: {id: 0x000F, type: PropertyType.PT_SYSTIME},
    // Contains the date and time when the original message was delivered.
    PR_DELIVER_TIME: {id: 0x0010, type: PropertyType.PT_SYSTIME},
    // Contains a reason why a message transfer agent (MTA) has discarded a message.
    PR_DISCARD_REASON: {id: 0x0011, type: PropertyType.PT_LONG},
    // Contains TRUE if disclosure of recipients is allowed.
    PR_DISCLOSURE_OF_RECIPIENTS: {id: 0x0012, type: PropertyType.PT_BOOLEAN},
    // Contains a history showing how a distribution list has been expanded during message transmiss
    PR_DL_EXPANSION_HISTORY: {id: 0x0013, type: PropertyType.PT_BINARY},
    // Contains TRUE if a message transfer agent (MTA) is prohibited from expanding distribution lists.
    PR_DL_EXPANSION_PROHIBITED: {id: 0x0014, type: PropertyType.PT_BOOLEAN},
    // Contains the date and time when the messaging system can invalidate the content of a message.
    PR_EXPIRY_TIME: {id: 0x0015, type: PropertyType.PT_SYSTIME},
    // Contains the date and time when the messaging system can invalidate the content of a message.
    PR_IMPLICIT_CONVERSION_PROHIBITED: {id: 0x0016, type: PropertyType.PT_BOOLEAN},
    // Contains a value that indicates the message sender's opinion of the importance of a message.
    PR_IMPORTANCE: {id: 0x0017, type: PropertyType.PT_LONG},
    // The IpmId field represents a PR_IPM_ID MAPI property.
    PR_IPM_ID: {id: 0x0018, type: PropertyType.PT_BINARY},
    // Contains the latest date and time when a message transfer agent (MTA) should deliver a message.
    PR_LATEST_DELIVERY_TIME: {id: 0x0019, type: PropertyType.PT_SYSTIME},
    // Contains a text string that identifies the sender-defined message class, such as IPM.Note.
    PR_MESSAGE_CLASS_W: {id: 0x001A, type: PropertyType.PT_UNICODE},
    // Contains a text string that identifies the sender-defined message class, such as IPM.Note.
    PR_MESSAGE_CLASS_A: {id: 0x001A, type: PropertyType.PT_STRING8},
    // Contains a message transfer system (MTS) identifier for a message delivered to a client application.
    PR_MESSAGE_DELIVERY_ID: {id: 0x001B, type: PropertyType.PT_BINARY},
    // Contains a security label for a message.
    PR_MESSAGE_SECURITY_LABEL: {id: 0x001E, type: PropertyType.PT_BINARY},
    // Contains the identifiers of messages that this message supersedes.
    PR_OBSOLETED_IPMS: {id: 0x001F, type: PropertyType.PT_BINARY},
    // Contains the encoded name of the originally intended recipient of an autoforwarded message.
    PR_ORIGINALLY_INTENDED_RECIPIENT_NAME: {id: 0x0020, type: PropertyType.PT_BINARY},
    // Contains a copy of the original encoded information types (EITs) for message text.
    PR_ORIGINAL_EITS: {id: 0x0021, type: PropertyType.PT_BINARY},
    // Contains an ASN.1 certificate for the message originator.
    PR_ORIGINATOR_CERTIFICATE: {id: 0x0022, type: PropertyType.PT_BINARY},
    // Contains TRUE if a message sender requests a delivery report for a particular recipient from the messaging system
    // before the message is placed in the message store.
    PR_ORIGINATOR_DELIVERY_REPORT_REQUESTED: {id: 0x0023, type: PropertyType.PT_BOOLEAN},
    // Contains the binary-encoded return address of the message originator.
    PR_ORIGINATOR_RETURN_ADDRESS: {id: 0x0024, type: PropertyType.PT_BINARY},
    // Was originally meant to contain a value used in correlating conversation threads. No longer supported.
    PR_PARENT_KEY: {id: 0x0025, type: PropertyType.PT_BINARY},
    // Contains the relative priority of a message.
    PR_PRIORITY: {id: 0x0026, type: PropertyType.PT_LONG},
    // Contains a binary verification value enabling a delivery report recipient to verify the origin of the original
    // message.
    PR_ORIGIN_CHECK: {id: 0x0027, type: PropertyType.PT_BINARY},
    // Contains TRUE if a message sender requests proof that the message transfer system has submitted a message for
    // delivery to the originally intended recipient.
    PR_PROOF_OF_SUBMISSION_REQUESTED: {id: 0x0028, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if a message sender wants the messaging system to generate a read report when the recipient has read
    // a message.
    PR_READ_RECEIPT_REQUESTED: {id: 0x0029, type: PropertyType.PT_BOOLEAN},
    // Contains the date and time a delivery report is generated.
    PR_RECEIPT_TIME: {id: 0x002A, type: PropertyType.PT_SYSTIME},
    // Contains TRUE if recipient reassignment is prohibited.
    PR_RECIPIENT_REASSIGNMENT_PROHIBITED: {id: 0x002B, type: PropertyType.PT_BOOLEAN},
    // Contains information about the route covered by a delivered message.
    PR_REDIRECTION_HISTORY: {id: 0x002C, type: PropertyType.PT_BINARY},
    // Contains a list of identifiers for messages to which a message is related.
    PR_RELATED_IPMS: {id: 0x002D, type: PropertyType.PT_BINARY},
    // Contains the sensitivity value assigned by the sender of the first version of a message — that is, the message
    // before being forwarded or replied to.
    PR_ORIGINAL_SENSITIVITY: {id: 0x002E, type: PropertyType.PT_LONG},
    // Contains an ASCII list of the languages incorporated in a message. UNICODE compilation.
    PR_LANGUAGES_W: {id: 0x002F, type: PropertyType.PT_UNICODE},
    // Contains an ASCII list of the languages incorporated in a message. Non-UNICODE compilation.
    PR_LANGUAGES_A: {id: 0x002F, type: PropertyType.PT_STRING8},
    // Contains the date and time by which a reply is expected for a message.
    PR_REPLY_TIME: {id: 0x0030, type: PropertyType.PT_SYSTIME},
    // Contains a binary tag value that the messaging system should copy to any report generated for the message.
    PR_REPORT_TAG: {id: 0x0031, type: PropertyType.PT_BINARY},
    // Contains the date and time when the messaging system generated a report.
    PR_REPORT_TIME: {id: 0x0032, type: PropertyType.PT_SYSTIME},
    // Contains TRUE if the original message is being returned with a nonread report.
    PR_RETURNED_IPM: {id: 0x0033, type: PropertyType.PT_BOOLEAN},
    // Contains a flag that indicates the security level of a message.
    PR_SECURITY: {id: 0x0034, type: PropertyType.PT_LONG},
    // Contains TRUE if this message is an incomplete copy of another message.
    PR_INCOMPLETE_COPY: {id: 0x0035, type: PropertyType.PT_BOOLEAN},
    // Contains a value indicating the message sender's opinion of the sensitivity of a message.
    PR_SENSITIVITY: {id: 0x0036, type: PropertyType.PT_LONG},
    // Contains the full subject, encoded in Unicode standard, of a message.
    PR_SUBJECT_W: {id: 0x0037, type: PropertyType.PT_UNICODE},
    // Contains the full subject, encoded in ANSI standard, of a message.
    PR_SUBJECT_A: {id: 0x0037, type: PropertyType.PT_STRING8},
    // Contains a binary value that is copied from the message for which a report is being generated.
    PR_SUBJECT_IPM: {id: 0x0038, type: PropertyType.PT_BINARY},
    // Contains the date and time the message sender submitted a message.
    PR_CLIENT_SUBMIT_TIME: {id: 0x0039, type: PropertyType.PT_SYSTIME},
    // Contains the unicode display name for the recipient that should get reports for this message.
    PR_REPORT_NAME_W: {id: 0x003A, type: PropertyType.PT_UNICODE},
    // Contains the ANSI display name for the recipient that should get reports for this message.
    PR_REPORT_NAME_A: {id: 0x003A, type: PropertyType.PT_STRING8},
    // Contains the search key for the messaging user represented by the sender.
    PR_SENT_REPRESENTING_SEARCH_KEY: {id: 0x003B, type: PropertyType.PT_BINARY},
    // This property contains the content type for a submitted message.
    PR_X400_CONTENT_TYPE: {id: 0x003C, type: PropertyType.PT_BINARY},
    // Contains a unicode subject prefix that typically indicates some action on a messagE, such as "FW: " for forwarding.
    PR_SUBJECT_PREFIX_W: {id: 0x003D, type: PropertyType.PT_UNICODE},
    // Contains a ANSI subject prefix that typically indicates some action on a messagE, such as "FW: " for forwarding.
    PR_SUBJECT_PREFIX_A: {id: 0x003D, type: PropertyType.PT_STRING8},
    // Contains reasons why a message was not received that forms part of a non-delivery report.
    PR_NON_RECEIPT_REASON: {id: 0x003E, type: PropertyType.PT_LONG},
    // Contains the entry identifier of the messaging user that actually receives the message.
    PR_RECEIVED_BY_ENTRYID: {id: 0x003F, type: PropertyType.PT_BINARY},
    // Contains the display name of the messaging user that actually receives the message. UNICODE compilation.
    PR_RECEIVED_BY_NAME_W: {id: 0x0040, type: PropertyType.PT_UNICODE},
    // Contains the display name of the messaging user that actually receives the message. Non-UNICODE compilation.
    PR_RECEIVED_BY_NAME_A: {id: 0x0040, type: PropertyType.PT_STRING8},
    // Contains the entry identifier for the messaging user represented by the sender.
    PR_SENT_REPRESENTING_ENTRYID: {id: 0x0041, type: PropertyType.PT_BINARY},
    // Contains the display name for the messaging user represented by the sender. UNICODE compilation.
    PR_SENT_REPRESENTING_NAME_W: {id: 0x0042, type: PropertyType.PT_UNICODE},
    // Contains the display name for the messaging user represented by the sender. Non-UNICODE compilation.
    PR_SENT_REPRESENTING_NAME_A: {id: 0x0042, type: PropertyType.PT_STRING8},
    // Contains the display name for the messaging user represented by the receiving user. UNICODE compilation.
    PR_RCVD_REPRESENTING_NAME_W: {id: 0x0044, type: PropertyType.PT_UNICODE},
    // Contains the display name for the messaging user represented by the receiving user. Non-UNICODE compilation.
    PR_RCVD_REPRESENTING_NAME_A: {id: 0x0044, type: PropertyType.PT_STRING8},
    // Contains the entry identifier for the recipient that should get reports for this message.
    PR_REPORT_ENTRYID: {id: 0x0045, type: PropertyType.PT_BINARY},
    // Contains an entry identifier for the messaging user to which the messaging system should direct a read report for
    // this message.
    PR_READ_RECEIPT_ENTRYID: {id: 0x0046, type: PropertyType.PT_BINARY},
    // Contains a message transfer system (MTS) identifier for the message transfer agent (MTA).
    PR_MESSAGE_SUBMISSION_ID: {id: 0x0047, type: PropertyType.PT_BINARY},
    // Contains the date and time a transport provider passed a message to its underlying messaging system.
    PR_PROVIDER_SUBMIT_TIME: {id: 0x0048, type: PropertyType.PT_SYSTIME},
    // Contains the subject of an original message for use in a report about the message. UNICODE compilation.
    PR_ORIGINAL_SUBJECT_W: {id: 0x0049, type: PropertyType.PT_UNICODE},
    // Contains the subject of an original message for use in a report about the message. Non-UNICODE compilation.
    PR_ORIGINAL_SUBJECT_A: {id: 0x0049, type: PropertyType.PT_STRING8},
    // The obsolete precursor of the PR_DISCRETE_VALUES property. No longer supported.
    PR_DISC_VAL: {id: 0x004A, type: PropertyType.PT_BOOLEAN},
    // Contains the class of the original message for use in a report. UNICODE compilation.
    PR_ORIG_MESSAGE_CLASS_W: {id: 0x004B, type: PropertyType.PT_UNICODE},
    // Contains the class of the original message for use in a report. Non-UNICODE compilation.
    PR_ORIG_MESSAGE_CLASS_A: {id: 0x004B, type: PropertyType.PT_STRING8},
    // Contains the entry identifier of the author of the first version of a messagE, that is, the message before being
    // forwarded or replied to.
    PR_ORIGINAL_AUTHOR_ENTRYID: {id: 0x004C, type: PropertyType.PT_BINARY},
    // Contains the display name of the author of the first version of a messagE, that is, the message before being
    // forwarded or replied to. UNICODE compilation.
    PR_ORIGINAL_AUTHOR_NAME_W: {id: 0x004D, type: PropertyType.PT_UNICODE},
    // Contains the display name of the author of the first version of a messagE, that is, the message before being
    // forwarded or replied to. Non-UNICODE compilation.
    PR_ORIGINAL_AUTHOR_NAME_A: {id: 0x004D, type: PropertyType.PT_STRING8},
    // Contains the original submission date and time of the message in the report.
    PR_ORIGINAL_SUBMIT_TIME: {id: 0x004E, type: PropertyType.PT_SYSTIME},
    // Contains a sized array of entry identifiers for recipients that are to get a reply.
    PR_REPLY_RECIPIENT_ENTRIES: {id: 0x004F, type: PropertyType.PT_BINARY},
    // Contains a list of display names for recipients that are to get a reply. UNICODE compilation.
    PR_REPLY_RECIPIENT_NAMES_W: {id: 0x0050, type: PropertyType.PT_UNICODE},
    // Contains a list of display names for recipients that are to get a reply. Non-UNICODE compilation.
    PR_REPLY_RECIPIENT_NAMES_A: {id: 0x0050, type: PropertyType.PT_STRING8},
    // Contains the search key of the messaging user that actually receives the message.
    PR_RECEIVED_BY_SEARCH_KEY: {id: 0x0051, type: PropertyType.PT_BINARY},
    // Contains the search key for the messaging user represented by the receiving user.
    PR_RCVD_REPRESENTING_SEARCH_KEY: {id: 0x0052, type: PropertyType.PT_BINARY},
    // Contains a search key for the messaging user to which the messaging system should direct a read report for a
    // message.
    PR_READ_RECEIPT_SEARCH_KEY: {id: 0x0053, type: PropertyType.PT_BINARY},
    // Contains the search key for the recipient that should get reports for this message.
    PR_REPORT_SEARCH_KEY: {id: 0x0054, type: PropertyType.PT_BINARY},
    // Contains a copy of the original message's delivery date and time in a thread.
    PR_ORIGINAL_DELIVERY_TIME: {id: 0x0055, type: PropertyType.PT_SYSTIME},
    // Contains the search key of the author of the first version of a messagE, that is, the message before being
    // forwarded or replied to.
    PR_ORIGINAL_AUTHOR_SEARCH_KEY: {id: 0x0056, type: PropertyType.PT_BINARY},
    // Contains TRUE if this messaging user is specifically named as a primary (To) recipient of this message and is not
    // part of a distribution list.
    PR_MESSAGE_TO_ME: {id: 0x0057, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if this messaging user is specifically named as a carbon copy (CC) recipient of this message and is
    // not part of a distribution list.
    PR_MESSAGE_CC_ME: {id: 0x0058, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if this messaging user is specifically named as a primary (To), carbon copy (CC), or blind carbon
    // copy (BCC) recipient of this message and is not part of a distribution list.
    PR_MESSAGE_RECIP_ME: {id: 0x0059, type: PropertyType.PT_BOOLEAN},
    // Contains the display name of the sender of the first version of a messagE, that is, the message before being
    // forwarded or replied to. UNICODE compilation.
    PR_ORIGINAL_SENDER_NAME_W: {id: 0x005A, type: PropertyType.PT_UNICODE},
    // Contains the display name of the sender of the first version of a messagE, that is, the message before being
    // forwarded or replied to. Non-UNICODE compilation.
    PR_ORIGINAL_SENDER_NAME_A: {id: 0x005A, type: PropertyType.PT_STRING8},
    // Contains the entry identifier of the sender of the first version of a messagE, that is, the message before being
    // forwarded or replied to.
    PR_ORIGINAL_SENDER_ENTRYID: {id: 0x005B, type: PropertyType.PT_BINARY},
    // Contains the search key for the sender of the first version of a messagE, that is, the message before being
    // forwarded or replied to.
    PR_ORIGINAL_SENDER_SEARCH_KEY: {id: 0x005C, type: PropertyType.PT_BINARY},
    // Contains the display name of the messaging user on whose behalf the original message was sent. UNICODE compilation.
    PR_ORIGINAL_SENT_REPRESENTING_NAME_W: {id: 0x005D, type: PropertyType.PT_UNICODE},
    // Contains the display name of the messaging user on whose behalf the original message was sent. Non-UNICODE
    // compilation.
    PR_ORIGINAL_SENT_REPRESENTING_NAME_A: {id: 0x005D, type: PropertyType.PT_STRING8},
    // Contains the entry identifier of the messaging user on whose behalf the original message was sent.
    PR_ORIGINAL_SENT_REPRESENTING_ENTRYID: {id: 0x005E, type: PropertyType.PT_BINARY},
    // Contains the search key of the messaging user on whose behalf the original message was sent.
    PR_ORIGINAL_SENT_REPRESENTING_SEARCH_KEY: {id: 0x005F, type: PropertyType.PT_BINARY},
    // Contains the starting date and time of an appointment as managed by a scheduling application.
    PR_START_DATE: {id: 0x0060, type: PropertyType.PT_SYSTIME},
    // Contains the ending date and time of an appointment as managed by a scheduling application.
    PR_END_DATE: {id: 0x0061, type: PropertyType.PT_SYSTIME},
    // Contains an identifier for an appointment in the owner's schedule.
    PR_OWNER_APPT_ID: {id: 0x0062, type: PropertyType.PT_LONG},
    // Contains TRUE if the message sender wants a response to a meeting request.
    PR_RESPONSE_REQUESTED: {id: 0x0063, type: PropertyType.PT_BOOLEAN},
    // Contains the address type for the messaging user represented by the sender. UNICODE compilation.
    PR_SENT_REPRESENTING_ADDRTYPE_W: {id: 0x0064, type: PropertyType.PT_UNICODE},
    // Contains the address type for the messaging user represented by the sender. Non-UNICODE compilation.
    PR_SENT_REPRESENTING_ADDRTYPE_A: {id: 0x0064, type: PropertyType.PT_STRING8},
    // Contains the e-mail address for the messaging user represented by the sender. UNICODE compilation.
    PR_SENT_REPRESENTING_EMAIL_ADDRESS_W: {id: 0x0065, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address for the messaging user represented by the sender. Non-UNICODE compilation.
    PR_SENT_REPRESENTING_EMAIL_ADDRESS_A: {id: 0x0065, type: PropertyType.PT_STRING8},
    // Contains the address type of the sender of the first version of a messagE, that is, the message before being
    // forwarded or replied to. UNICODE compilation.
    PR_ORIGINAL_SENDER_ADDRTYPE_W: {id: 0x0066, type: PropertyType.PT_UNICODE},
    // Contains the address type of the sender of the first version of a messagE, that is, the message before being
    // forwarded or replied to. Non-UNICODE compilation.
    PR_ORIGINAL_SENDER_ADDRTYPE_A: {id: 0x0066, type: PropertyType.PT_STRING8},
    // Contains the e-mail address of the sender of the first version of a message, that is, the message before being
    // forwarded or replied to. UNICODE compilation.
    PR_ORIGINAL_SENDER_EMAIL_ADDRESS_W: {id: 0x0067, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address of the sender of the first version of a message, that is, the message before being
    // forwarded or replied to. Non-UNICODE compilation.
    PR_ORIGINAL_SENDER_EMAIL_ADDRESS_A: {id: 0x0067, type: PropertyType.PT_STRING8},
    // Contains the address type of the messaging user on whose behalf the original message was sent. UNICODE compilation.
    PR_ORIGINAL_SENT_REPRESENTING_ADDRTYPE_W: {id: 0x0068, type: PropertyType.PT_UNICODE},
    // Contains the address type of the messaging user on whose behalf the original message was sent. Non-UNICODE
    // compilation.
    PR_ORIGINAL_SENT_REPRESENTING_ADDRTYPE_A: {id: 0x0068, type: PropertyType.PT_STRING8},
    // Contains the e-mail address of the messaging user on whose behalf the original message was sent. UNICODE
    // compilation.
    PR_ORIGINAL_SENT_REPRESENTING_EMAIL_ADDRESS_W: {id: 0x0069, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address of the messaging user on whose behalf the original message was sent. Non-UNICODE
    // compilation.
    PR_ORIGINAL_SENT_REPRESENTING_EMAIL_ADDRESS_A: {id: 0x0069, type: PropertyType.PT_STRING8},
    // Contains the topic of the first message in a conversation thread. UNICODE compilation.
    PR_CONVERSATION_TOPIC_W: {id: 0x0070, type: PropertyType.PT_UNICODE},
    // Contains the topic of the first message in a conversation thread. Non-UNICODE compilation.
    PR_CONVERSATION_TOPIC_A: {id: 0x0070, type: PropertyType.PT_STRING8},
    // Contains a binary value that indicates the relative position of this message within a conversation thread.
    // See https://msdn.microsoft.com/en-us/library/office/cc842470.aspx
    PR_CONVERSATION_INDEX: {id: 0x0071, type: PropertyType.PT_BINARY},
    // Contains a binary value that indicates the relative position of this message within a conversation thread.
    PR_ORIGINAL_DISPLAY_BCC_W: {id: 0x0072, type: PropertyType.PT_UNICODE},
    // Contains the display names of any blind carbon copy (BCC) recipients of the original message. Non-UNICODE
    // compilation.
    PR_ORIGINAL_DISPLAY_BCC_A: {id: 0x0072, type: PropertyType.PT_STRING8},
    // Contains the display names of any carbon copy (CC) recipients of the original message. UNICODE compilation.
    PR_ORIGINAL_DISPLAY_CC_W: {id: 0x0073, type: PropertyType.PT_UNICODE},
    // Contains the display names of any carbon copy (CC) recipients of the original message. Non-UNICODE compilation.
    PR_ORIGINAL_DISPLAY_CC_A: {id: 0x0073, type: PropertyType.PT_STRING8},
    // Contains the display names of the primary (To) recipients of the original message. UNICODE compilation.
    PR_ORIGINAL_DISPLAY_TO_W: {id: 0x0074, type: PropertyType.PT_UNICODE},
    // Contains the display names of the primary (To) recipients of the original message. Non-UNICODE compilation.
    PR_ORIGINAL_DISPLAY_TO_A: {id: 0x0074, type: PropertyType.PT_STRING8},
    // Contains the e-mail address typE, such as SMTP, for the messaging user that actually receives the message. UNICODE
    // compilation.
    PR_RECEIVED_BY_ADDRTYPE_W: {id: 0x0075, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address typE, such as SMTP, for the messaging user that actually receives the message.
    // Non-UNICODE compilation.
    PR_RECEIVED_BY_ADDRTYPE_A: {id: 0x0075, type: PropertyType.PT_STRING8},
    // Contains the e-mail address for the messaging user that actually receives the message. UNICODE compilation.
    PR_RECEIVED_BY_EMAIL_ADDRESS_W: {id: 0x0076, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address for the messaging user that actually receives the message. Non-UNICODE compilation.
    PR_RECEIVED_BY_EMAIL_ADDRESS_A: {id: 0x0076, type: PropertyType.PT_STRING8},
    // Contains the address type for the messaging user represented by the user actually receiving the message. UNICODE
    // compilation.
    PR_RCVD_REPRESENTING_ADDRTYPE_W: {id: 0x0077, type: PropertyType.PT_UNICODE},
    // Contains the address type for the messaging user represented by the user actually receiving the message.
    // Non-UNICODE compilation.
    PR_RCVD_REPRESENTING_ADDRTYPE_A: {id: 0x0077, type: PropertyType.PT_STRING8},
    // Contains the e-mail address for the messaging user represented by the receiving user. UNICODE compilation.
    PR_RCVD_REPRESENTING_EMAIL_ADDRESS_W: {id: 0x0078, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address for the messaging user represented by the receiving user. Non-UNICODE compilation.
    PR_RCVD_REPRESENTING_EMAIL_ADDRESS_A: {id: 0x0078, type: PropertyType.PT_STRING8},
    // Contains the address type of the author of the first version of a message. That is — the message before being
    // forwarded or replied to. UNICODE compilation.
    PR_ORIGINAL_AUTHOR_ADDRTYPE_W: {id: 0x0079, type: PropertyType.PT_UNICODE},
    // Contains the address type of the author of the first version of a message. That is — the message before being
    // forwarded or replied to. Non-UNICODE compilation.
    PR_ORIGINAL_AUTHOR_ADDRTYPE_A: {id: 0x0079, type: PropertyType.PT_STRING8},
    // Contains the e-mail address of the author of the first version of a message. That is — the message before being
    // forwarded or replied to. UNICODE compilation.
    PR_ORIGINAL_AUTHOR_EMAIL_ADDRESS_W: {id: 0x007A, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address of the author of the first version of a message. That is — the message before being
    // forwarded or replied to. Non-UNICODE compilation.
    PR_ORIGINAL_AUTHOR_EMAIL_ADDRESS_A: {id: 0x007A, type: PropertyType.PT_STRING8},
    // Contains the address type of the originally intended recipient of an autoforwarded message. UNICODE compilation.
    PR_ORIGINALLY_INTENDED_RECIP_ADDRTYPE_W: {id: 0x007B, type: PropertyType.PT_UNICODE},
    // Contains the address type of the originally intended recipient of an autoforwarded message. Non-UNICODE
    // compilation.
    PR_ORIGINALLY_INTENDED_RECIP_ADDRTYPE_A: {id: 0x007B, type: PropertyType.PT_STRING8},
    // Contains the e-mail address of the originally intended recipient of an autoforwarded message. UNICODE compilation.
    PR_ORIGINALLY_INTENDED_RECIP_EMAIL_ADDRESS_W: {id: 0x007C, type: PropertyType.PT_UNICODE},
    // Contains the e-mail address of the originally intended recipient of an autoforwarded message. Non-UNICODE
    // compilation.
    PR_ORIGINALLY_INTENDED_RECIP_EMAIL_ADDRESS_A: {id: 0x007C, type: PropertyType.PT_STRING8},
    // Contains transport-specific message envelope information. Non-UNICODE compilation.
    PR_TRANSPORT_MESSAGE_HEADERS_A: {id: 0x007D, type: PropertyType.PT_STRING8},
    // Contains transport-specific message envelope information. UNICODE compilation.
    PR_TRANSPORT_MESSAGE_HEADERS_W: {id: 0x007D, type: PropertyType.PT_UNICODE},
    // Contains the converted value of the attDelegate workgroup property.
    PR_DELEGATION: {id: 0x007E, type: PropertyType.PT_BINARY},
    // Contains a value used to correlate a Transport Neutral Encapsulation Format (TNEF) attachment with a message
    PR_TNEF_CORRELATION_KEY: {id: 0x007F, type: PropertyType.PT_BINARY},
    // Contains the message text. UNICODE compilation.
    // These properties are typically used only in an interpersonal message (IPM).
    // Message stores that support Rich Text Format (RTF) ignore any changes to white space in the message text. When
    // PR_BODY is stored for the first timE, the message store also generates and stores the PR_RTF_COMPRESSED
    // (PidTagRtfCompressed) property, the RTF version of the message text. If the IMAPIProp::SaveChanges method is
    // subsequently called and PR_BODY has been modifieD, the message store calls the RTFSync function to ensure
    // synchronization with the RTF version. If only white space has been changeD, the properties are left unchanged. This
    // preserves any nontrivial RTF formatting when the message travels through non-RTF-aware clients and messaging
    // systems.
    // The value for this property must be expressed in the code page of the operating system that MAPI is running on.
    PR_BODY_W: {id: 0x1000, type: PropertyType.PT_UNICODE},
    // Contains the message text. Non-UNICODE compilation.
    // These properties are typically used only in an interpersonal message (IPM).
    // Message stores that support Rich Text Format (RTF) ignore any changes to white space in the message text. When
    // PR_BODY is stored for the first timE, the message store also generates and stores the PR_RTF_COMPRESSED
    // (PidTagRtfCompressed) property, the RTF version of the message text. If the IMAPIProp::SaveChanges method is
    // subsequently called and PR_BODY has been modifieD, the message store calls the RTFSync function to ensure
    // synchronization with the RTF version. If only white space has been changeD, the properties are left unchanged. This
    // preserves any nontrivial RTF formatting when the message travels through non-RTF-aware clients and messaging
    // systems.
    // The value for this property must be expressed in the code page of the operating system that MAPI is running on.
    PR_BODY_A: {id: 0x1000, type: PropertyType.PT_STRING8},
    // Contains optional text for a report generated by the messaging system. UNICODE compilation.
    PR_REPORT_TEXT_W: {id: 0x1001, type: PropertyType.PT_UNICODE},
    // Contains optional text for a report generated by the messaging system. NON-UNICODE compilation.
    PR_REPORT_TEXT_A: {id: 0x1001, type: PropertyType.PT_STRING8},
    // Contains information about a message originator and a distribution list expansion history.
    PR_ORIGINATOR_AND_DL_EXPANSION_HISTORY: {id: 0x1002, type: PropertyType.PT_BINARY},
    // Contains the display name of a distribution list where the messaging system delivers a report.
    PR_REPORTING_DL_NAME: {id: 0x1003, type: PropertyType.PT_BINARY},
    // Contains an identifier for the message transfer agent that generated a report.
    PR_REPORTING_MTA_CERTIFICATE: {id: 0x1004, type: PropertyType.PT_BINARY},
    // Contains the cyclical redundancy check (CRC) computed for the message text.
    PR_RTF_SYNC_BODY_CRC: {id: 0x1006, type: PropertyType.PT_LONG},
    // Contains a count of the significant characters of the message text.
    PR_RTF_SYNC_BODY_COUNT: {id: 0x1007, type: PropertyType.PT_LONG},
    // Contains significant characters that appear at the beginning of the message text. UNICODE compilation.
    PR_RTF_SYNC_BODY_TAG_W: {id: 0x1008, type: PropertyType.PT_UNICODE},
    // Contains significant characters that appear at the beginning of the message text. Non-UNICODE compilation.
    PR_RTF_SYNC_BODY_TAG_A: {id: 0x1008, type: PropertyType.PT_STRING8},
    // Contains the Rich Text Format (RTF) version of the message text, usually in compressed form.
    PR_RTF_COMPRESSED: {id: 0x1009, type: PropertyType.PT_BINARY},
    // Contains a count of the ignorable characters that appear before the significant characters of the message.
    PR_RTF_SYNC_PREFIX_COUNT: {id: 0x1010, type: PropertyType.PT_LONG},
    // Contains a count of the ignorable characters that appear after the significant characters of the message.
    PR_RTF_SYNC_TRAILING_COUNT: {id: 0x1011, type: PropertyType.PT_LONG},
    // Contains the entry identifier of the originally intended recipient of an auto-forwarded message.
    PR_ORIGINALLY_INTENDED_RECIP_ENTRYID: {id: 0x1012, type: PropertyType.PT_BINARY},
    // Contains the Hypertext Markup Language (HTML) version of the message text.
    // These properties contain the same message text as the <see cref="PR_BODY_CONTENT_LOCATION_W" />
    // (PidTagBodyContentLocation), but in HTML. A message store that supports HTML indicates this by setting the
    // <see cref="StoreSupportMask.STORE_HTML_OK" /> flag in its <see cref="PR_STORE_SUPPORT_MASK" />
    // (PidTagStoreSupportMask). Note <see cref="StoreSupportMask.STORE_HTML_OK" /> is not defined in versions of
    // Mapidefs.h included with Microsoft® Exchange 2000 Server and earlier. If <see cref="StoreSupportMask.STORE_HTML_OK" />
    // is undefined, use the value 0x00010000 instead.
    PR_BODY_HTML_A: {id: 0x1013, type: PropertyType.PT_STRING8},
    // Contains the message body text in HTML format.
    PR_HTML: {id: 0x1013, type: PropertyType.PT_BINARY},
    // Contains the value of a MIME Content-Location header field.
    // To set the value of these properties, MIME clients should write the desired value to a Content-Location header
    // field on a MIME entity that maps to a message body. MIME readers should copy the value of a Content-Location
    // header field on such a MIME entity to the value of these properties
    PR_BODY_CONTENT_LOCATION_A: {id: 0x1014, type: PropertyType.PT_STRING8},
    // Contains the value of a MIME Content-Location header field. UNICODE compilation.
    // To set the value of these properties, MIME clients should write the desired value to a Content-Location header
    // field on a MIME entity that maps to a message body. MIME readers should copy the value of a Content-Location
    // header field on such a MIME entity to the value of these properties
    PR_BODY_CONTENT_LOCATION_W: {id: 0x1014, type: PropertyType.PT_UNICODE},
    // Corresponds to the message ID field as specified in [RFC2822].
    // These properties should be present on all e-mail messages.
    PR_INTERNET_MESSAGE_ID_A: {id: 0x1035, type: PropertyType.PT_STRING8},
    // Corresponds to the message ID field as specified in [RFC2822]. UNICODE compilation.
    // These properties should be present on all e-mail messages.
    PR_INTERNET_MESSAGE_ID_W: {id: 0x1035, type: PropertyType.PT_UNICODE},
    // Contains the original message's PR_INTERNET_MESSAGE_ID (PidTagInternetMessageId) property value.
    // These properties must be set on all message replies.
    PR_IN_REPLY_TO_ID_A: {id: 0x1042, type: PropertyType.PT_STRING8},
    // Contains the original message's PR_INTERNET_MESSAGE_ID (PidTagInternetMessageId) property value. UNICODE compilation.
    // These properties should be present on all e-mail messages.
    PR_IN_REPLY_TO_ID_W: {id: 0x1042, type: PropertyType.PT_UNICODE},
    // Contains the value of a Multipurpose Internet Mail Extensions (MIME) message's References header field.
    // To generate a References header field, clients must set these properties to the desired value. MIME writers must copy
    // the value of these properties to the References header field. To set the value of these properties, MIME clients must
    // write the desired value to a References header field. MIME readers must copy the value of the References header field
    // to these properties. MIME readers may truncate the value of these properties if it exceeds 64KB in length.
    PR_INTERNET_REFERENCES_A: {id: 0x1039, type: PropertyType.PT_STRING8},
    // Contains the value of a Multipurpose Internet Mail Extensions (MIME) message's References header field. UNICODE compilation.
    // To generate a References header field, clients must set these properties to the desired value. MIME writers must copy
    // the value of these properties to the References header field. To set the value of these properties, MIME clients must
    // write the desired value to a References header field. MIME readers must copy the value of the References header field
    // to these properties. MIME readers may truncate the value of these properties if it exceeds 64KB in length.
    PR_INTERNET_REFERENCES_W: {id: 0x1039, type: PropertyType.PT_UNICODE},
    // Contains an ASN.1 content integrity check value that allows a message sender to protect message content from
    // disclosure to unauthorized recipients.
    PR_CONTENT_INTEGRITY_CHECK: {id: 0x0C00, type: PropertyType.PT_BINARY},
    // Indicates that a message sender has requested a message content conversion for a particular recipient.
    PR_EXPLICIT_CONVERSION: {id: 0x0C01, type: PropertyType.PT_LONG},
    // Contains TRUE if this message should be returned with a report.
    PR_IPM_RETURN_REQUESTED: {id: 0x0C02, type: PropertyType.PT_BOOLEAN},
    // Contains an ASN.1 security token for a message.
    PR_MESSAGE_TOKEN: {id: 0x0C03, type: PropertyType.PT_BINARY},
    // Contains a diagnostic code that forms part of a nondelivery report.
    PR_NDR_REASON_CODE: {id: 0x0C04, type: PropertyType.PT_LONG},
    // Contains a diagnostic code that forms part of a nondelivery report.
    PR_NDR_DIAG_CODE: {id: 0x0C05, type: PropertyType.PT_LONG},
    PR_NON_RECEIPT_NOTIFICATION_REQUESTED: {id: 0x0C06, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if a message sender wants notification of non-receipt for a specified recipient.
    PR_ORIGINATOR_NON_DELIVERY_REPORT_REQUESTED: {id: 0x0C08, type: PropertyType.PT_BOOLEAN},
    // Contains an entry identifier for an alternate recipient designated by the sender.
    PR_ORIGINATOR_REQUESTED_ALTERNATE_RECIPIENT: {id: 0x0C09, type: PropertyType.PT_BINARY},
    PR_PHYSICAL_DELIVERY_BUREAU_FAX_DELIVERY: {id: 0x0C0A, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if the messaging system should use a fax bureau for physical delivery of this message.
    PR_PHYSICAL_DELIVERY_MODE: {id: 0x0C0B, type: PropertyType.PT_LONG},
    // Contains the mode of a report to be delivered to a particular message recipient upon completion of physical message
    // delivery or delivery by the message handling system.
    PR_PHYSICAL_DELIVERY_REPORT_REQUEST: {id: 0x0C0C, type: PropertyType.PT_LONG},
    PR_PHYSICAL_FORWARDING_ADDRESS: {id: 0x0C0D, type: PropertyType.PT_BINARY},
    // Contains TRUE if a message sender requests the message transfer agent to attach a physical forwarding address for a
    // message recipient.
    PR_PHYSICAL_FORWARDING_ADDRESS_REQUESTED: {id: 0x0C0E, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if a message sender prohibits physical message forwarding for a specific recipient.
    PR_PHYSICAL_FORWARDING_PROHIBITED: {id: 0x0C0F, type: PropertyType.PT_BOOLEAN},
    // Contains an ASN.1 object identifier that is used for rendering message attachments.
    PR_PHYSICAL_RENDITION_ATTRIBUTES: {id: 0x0C10, type: PropertyType.PT_BINARY},
    // This property contains an ASN.1 proof of delivery value.
    PR_PROOF_OF_DELIVERY: {id: 0x0C11, type: PropertyType.PT_BINARY},
    // This property contains TRUE if a message sender requests proof of delivery for a particular recipient.
    PR_PROOF_OF_DELIVERY_REQUESTED: {id: 0x0C12, type: PropertyType.PT_BOOLEAN},
    // Contains a message recipient's ASN.1 certificate for use in a report.
    PR_RECIPIENT_CERTIFICATE: {id: 0x0C13, type: PropertyType.PT_BINARY},
    // This property contains a message recipient's telephone number to call to advise of the physical delivery of a
    // message. UNICODE compilation.
    PR_RECIPIENT_NUMBER_FOR_ADVICE_W: {id: 0x0C14, type: PropertyType.PT_UNICODE},
    // This property contains a message recipient's telephone number to call to advise of the physical delivery of a
    // message. Non-UNICODE compilation.
    PR_RECIPIENT_NUMBER_FOR_ADVICE_A: {id: 0x0C14, type: PropertyType.PT_STRING8},
    // Contains the recipient type for a message recipient.
    PR_RECIPIENT_TYPE: {id: 0x0C15, type: PropertyType.PT_LONG},
    // This property contains the type of registration used for physical delivery of a message.
    PR_REGISTERED_MAIL_TYPE: {id: 0x0C16, type: PropertyType.PT_LONG},
    // Contains TRUE if a message sender requests a reply from a recipient.
    PR_REPLY_REQUESTED: {id: 0x0C17, type: PropertyType.PT_BOOLEAN},
    // This property contains a binary array of delivery methods (service providers), in the order of a message sender's
    // preference.
    PR_REQUESTED_DELIVERY_METHOD: {id: 0x0C18, type: PropertyType.PT_LONG},
    // Contains the message sender's entry identifier.
    PR_SENDER_ENTRYID: {id: 0x0C19, type: PropertyType.PT_BINARY},
    // Contains the message sender's display name. UNICODE compilation.
    PR_SENDER_NAME_W: {id: 0x0C1A, type: PropertyType.PT_UNICODE},
    // Contains the message sender's display name. Non-UNICODE compilation.
    PR_SENDER_NAME_A: {id: 0x0C1A, type: PropertyType.PT_STRING8},
    // Contains additional information for use in a report. UNICODE compilation.
    PR_SUPPLEMENTARY_INFO_W: {id: 0x0C1B, type: PropertyType.PT_UNICODE},
    // Contains additional information for use in a report. Non-UNICODE compilation.
    PR_SUPPLEMENTARY_INFO_A: {id: 0x0C1B, type: PropertyType.PT_STRING8},
    // This property contains the type of a message recipient for use in a report.
    PR_TYPE_OF_MTS_USER: {id: 0x0C1C, type: PropertyType.PT_LONG},
    // Contains the message sender's search key.
    PR_SENDER_SEARCH_KEY: {id: 0x0C1D, type: PropertyType.PT_BINARY},
    // Contains the message sender's e-mail address type. UNICODE compilation.
    PR_SENDER_ADDRTYPE_W: {id: 0x0C1E, type: PropertyType.PT_UNICODE},
    // Contains the message sender's e-mail address type. Non-UNICODE compilation.
    PR_SENDER_ADDRTYPE_A: {id: 0x0C1E, type: PropertyType.PT_STRING8},
    // Contains the message sender's e-mail address, encoded in Unicode standard.
    PR_SENDER_EMAIL_ADDRESS_W: {id: 0x0C1F, type: PropertyType.PT_UNICODE},
    // Contains the message sender's e-mail address, encoded in Non-Unicode standard.
    PR_SENDER_EMAIL_ADDRESS_A: {id: 0x0C1F, type: PropertyType.PT_STRING8},
    // Was originally meant to contain the current version of a message store. No longer supported.
    PR_CURRENT_VERSION: {id: 0x0E00, type: PropertyType.PT_I8},
    // Contains TRUE if a client application wants MAPI to delete the associated message after submission.
    PR_DELETE_AFTER_SUBMIT: {id: 0x0E01, type: PropertyType.PT_BOOLEAN},
    // Contains an ASCII list of the display names of any blind carbon copy (BCC) message recipients, separated by
    // semicolons (;). UNICODE compilation.
    PR_DISPLAY_BCC_W: {id: 0x0E02, type: PropertyType.PT_UNICODE},
    // Contains an ASCII list of the display names of any blind carbon copy (BCC) message recipients, separated by
    // semicolons (;). Non-UNICODE compilation.
    PR_DISPLAY_BCC_A: {id: 0x0E02, type: PropertyType.PT_STRING8},
    // Contains an ASCII list of the display names of any carbon copy (CC) message recipients, separated by semicolons
    // (;). UNICODE compilation.
    PR_DISPLAY_CC_W: {id: 0x0E03, type: PropertyType.PT_UNICODE},
    // Contains an ASCII list of the display names of any carbon copy (CC) message recipients, separated by semicolons
    // (;). Non-UNICODE compilation.
    PR_DISPLAY_CC_A: {id: 0x0E03, type: PropertyType.PT_STRING8},
    // Contains a list of the display names of the primary (To) message recipients, separated by semicolons (;). UNICODE
    // compilation.
    PR_DISPLAY_TO_W: {id: 0x0E04, type: PropertyType.PT_UNICODE},
    // Contains a list of the display names of the primary (To) message recipients, separated by semicolons (;).
    // Non-UNICODE compilation.
    PR_DISPLAY_TO_A: {id: 0x0E04, type: PropertyType.PT_STRING8},
    // Contains the display name of the folder in which a message was found during a search. UNICODE compilation.
    PR_PARENT_DISPLAY_W: {id: 0x0E05, type: PropertyType.PT_UNICODE},
    // Contains the display name of the folder in which a message was found during a search. Non-UNICODE compilation.
    PR_PARENT_DISPLAY_A: {id: 0x0E05, type: PropertyType.PT_STRING8},
    // Contains the date and time a message was delivered.
    PR_MESSAGE_DELIVERY_TIME: {id: 0x0E06, type: PropertyType.PT_SYSTIME},
    // Contains a bitmask of flags indicating the origin and current state of a message.
    PR_MESSAGE_FLAGS: {id: 0x0E07, type: PropertyType.PT_LONG},
    // Contains the sum, in bytes, of the sizes of all properties on a message object.
    PR_MESSAGE_SIZE: {id: 0x0E08, type: PropertyType.PT_LONG},
    // Contains the entry identifier of the folder containing a folder or message.
    PR_PARENT_ENTRYID: {id: 0x0E09, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the folder where the message should be moved after submission.
    PR_SENTMAIL_ENTRYID: {id: 0x0E0A, type: PropertyType.PT_BINARY},
    // Contains TRUE if the sender of a message requests the correlation feature of the messaging system.
    PR_CORRELATE: {id: 0x0E0C, type: PropertyType.PT_BOOLEAN},
    // Contains the message transfer system (MTS) identifier used in correlating reports with sent messages.
    PR_CORRELATE_MTSID: {id: 0x0E0D, type: PropertyType.PT_BINARY},
    // Contains TRUE if a nondelivery report applies only to discrete members of a distribution list rather than the
    // entire list.
    PR_DISCRETE_VALUES: {id: 0x0E0E, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if some transport provider has already accepted responsibility for delivering the message to this
    // recipient, and FALSE if the MAPI spooler considers that this transport provider should accept responsibility.
    PR_RESPONSIBILITY: {id: 0x0E0F, type: PropertyType.PT_BOOLEAN},
    // Contains the status of the message based on information available to the MAPI spooler.
    PR_SPOOLER_STATUS: {id: 0x0E10, type: PropertyType.PT_LONG},
    // Obsolete MAPI spooler property. No longer supported.
    PR_TRANSPORT_STATUS: {id: 0x0E11, type: PropertyType.PT_LONG},
    // Contains a table of restrictions that can be applied to a contents table to find all messages that contain
    // recipient subobjects meeting the restrictions.
    PR_MESSAGE_RECIPIENTS: {id: 0x0E12, type: PropertyType.PT_OBJECT},
    // Contains a table of restrictions that can be applied to a contents table to find all messages that contain
    // attachment subobjects meeting the restrictions.
    PR_MESSAGE_ATTACHMENTS: {id: 0x0E13, type: PropertyType.PT_OBJECT},
    // Contains a bitmask of flags indicating details about a message submission.
    PR_SUBMIT_FLAGS: {id: 0x0E14, type: PropertyType.PT_LONG},
    // Contains a value used by the MAPI spooler in assigning delivery responsibility among transport providers.
    PR_RECIPIENT_STATUS: {id: 0x0E15, type: PropertyType.PT_LONG},
    // Contains a value used by the MAPI spooler to track the progress of an outbound message through the outgoing
    // transport providers.
    PR_TRANSPORT_KEY: {id: 0x0E16, type: PropertyType.PT_LONG},
    PR_MSG_STATUS: {id: 0x0E17, type: PropertyType.PT_LONG},
    // Contains a bitmask of property tags that define the status of a message.
    PR_MESSAGE_DOWNLOAD_TIME: {id: 0x0E18, type: PropertyType.PT_LONG},
    // Was originally meant to contain the message store version current at the time a message was created. No longer
    // supported.
    PR_CREATION_VERSION: {id: 0x0E19, type: PropertyType.PT_I8},
    // Was originally meant to contain the message store version current at the time the message was last modified. No
    // longer supported.
    PR_MODIFY_VERSION: {id: 0x0E1A, type: PropertyType.PT_I8},
    // When true then the message contains at least one attachment.
    PR_HASATTACH: {id: 0x0E1B, type: PropertyType.PT_BOOLEAN},
    // Contains a circular redundancy check (CRC) value on the message text.
    PR_BODY_CRC: {id: 0x0E1C, type: PropertyType.PT_LONG},
    // Contains the message subject with any prefix removed. UNICODE compilation.
    // See https://msdn.microsoft.com/en-us/library/office/cc815282.aspx
    PR_NORMALIZED_SUBJECT_W: {id: 0x0E1D, type: PropertyType.PT_UNICODE},
    // Contains the message subject with any prefix removed. Non-UNICODE compilation.
    PR_NORMALIZED_SUBJECT_A: {id: 0x0E1D, type: PropertyType.PT_STRING8},
    // Contains TRUE if PR_RTF_COMPRESSED has the same text content as PR_BODY for this message.
    PR_RTF_IN_SYNC: {id: 0x0E1F, type: PropertyType.PT_BOOLEAN},
    // Contains the sum, in bytes, of the sizes of all properties on an attachment.
    PR_ATTACH_SIZE: {id: 0x0E20, type: PropertyType.PT_LONG},
    // Contains a number that uniquely identifies the attachment within its parent message.
    PR_ATTACH_NUM: {id: 0x0E21, type: PropertyType.PT_LONG},
    // Contains a bitmask of flags for an attachment.
    // If the PR_ATTACH_FLAGS property is zero or absent, the attachment is to be processed by all applications.
    PR_ATTACH_FLAGS: {id: 0x3714, type: PropertyType.PT_LONG},
    // Contains TRUE if the message requires preprocessing.
    PR_PREPROCESS: {id: 0x0E22, type: PropertyType.PT_BOOLEAN},
    // Contains an identifier for the message transfer agent (MTA) that originated the message.
    PR_ORIGINATING_MTA_CERTIFICATE: {id: 0x0E25, type: PropertyType.PT_BINARY},
    // Contains an ASN.1 proof of submission value.
    PR_PROOF_OF_SUBMISSION: {id: 0x0E26, type: PropertyType.PT_BINARY},
    // The PR_ENTRYID property contains a MAPI entry identifier used to open and edit properties of a particular MAPI
    // object.
    PR_ENTRYID: {id: 0x0FFF, type: PropertyType.PT_BINARY},
    // Contains the type of an object
    PR_OBJECT_TYPE: {id: 0x0FFE, type: PropertyType.PT_LONG},
    // Contains a bitmap of a full size icon for a form.
    PR_ICON: {id: 0x0FFD, type: PropertyType.PT_BINARY},
    // Contains a bitmap of a half-size icon for a form.
    PR_MINI_ICON: {id: 0x0FFC, type: PropertyType.PT_BINARY},
    // Specifies the hexadecimal string representation of the value of the PR_STORE_ENTRYID (PidTagStoreEntryId) property
    // on the shared folder. This is a property of a sharing message.
    PR_STORE_ENTRYID: {id: 0x0FFB, type: PropertyType.PT_BINARY},
    // Contains the unique binary-comparable identifier (record key) of the message store in which an object resides.
    PR_STORE_RECORD_KEY: {id: 0x0FFA, type: PropertyType.PT_BINARY},
    // Contains a unique binary-comparable identifier for a specific object.
    PR_RECORD_KEY: {id: 0x0FF9, type: PropertyType.PT_BINARY},
    // Contains the mapping signature for named properties of a particular MAPI object.
    PR_MAPPING_SIGNATURE: {id: 0x0FF8, type: PropertyType.PT_BINARY},
    // Indicates the client's access level to the object.
    PR_ACCESS_LEVEL: {id: 0x0FF7, type: PropertyType.PT_LONG},
    // Contains a value that uniquely identifies a row in a table.
    PR_INSTANCE_KEY: {id: 0x0FF6, type: PropertyType.PT_BINARY},
    // Contains a value that indicates the type of a row in a table.
    PR_ROW_TYPE: {id: 0x0FF5, type: PropertyType.PT_LONG},
    // Contains a bitmask of flags indicating the operations that are available to the client for the object.
    PR_ACCESS: {id: 0x0FF4, type: PropertyType.PT_LONG},
    // Contains a number that indicates which icon to use when you display a group of e-mail objects.
    // This property, if it exists, is a hint to the client. The client may ignore the value of this property.
    PR_ICON_INDEX: {id: 0x1080, type: PropertyType.PT_LONG},
    // Specifies the last verb executed for the message item to which it is related.
    PR_LAST_VERB_EXECUTED: {id: 0x1081, type: PropertyType.PT_LONG},
    // Contains the time when the last verb was executed.
    PR_LAST_VERB_EXECUTION_TIME: {id: 0x1082, type: PropertyType.PT_SYSTIME},
    // Contains a unique identifier for a recipient in a recipient table or status table.
    PR_ROWID: {id: 0x3000, type: PropertyType.PT_LONG},
    // Contains the display name for a given MAPI object. UNICODE compilation.
    PR_DISPLAY_NAME_W: {id: 0x3001, type: PropertyType.PT_UNICODE},
    // Contains the value of the PR_DISPLAY_NAME_W (PidTagDisplayName) property. Non-UNICODE compilation.
    PR_RECIPIENT_DISPLAY_NAME_A: {id: 0x5FF6, type: PropertyType.PT_STRING8},
    // Contains the value of the PR_DISPLAY_NAME_W (PidTagDisplayName) property. UNICODE compilation.
    PR_RECIPIENT_DISPLAY_NAME_W: {id: 0x5FF6, type: PropertyType.PT_UNICODE},
    // Specifies a bit field that describes the recipient status.
    // This property is not required. The following are the individual flags that can be set.
    PR_RECIPIENT_FLAGS: {id: 0x5FFD, type: PropertyType.PT_LONG},
    // Contains the display name for a given MAPI object. Non-UNICODE compilation.
    PR_DISPLAY_NAME_A: {id: 0x3001, type: PropertyType.PT_STRING8},
    // Contains the messaging user's e-mail address type, such as SMTP. UNICODE compilation.
    // These properties are examples of the base address properties common to all messaging users.
    // It specifies which messaging system MAPI uses to handle a given message.
    // This property also determines the format of the address string in the PR_EMAIL_ADRESS(PidTagEmailAddress).
    // The string it provides can contain only the uppercase alphabetic characters from A through Z and the numbers
    // from 0 through 9.
    PR_ADDRTYPE_W: {id: 0x3002, type: PropertyType.PT_UNICODE},
    // Contains the messaging user's e-mail address type such as SMTP. Non-UNICODE compilation.
    PR_ADDRTYPE_A: {id: 0x3002, type: PropertyType.PT_STRING8},
    // Contains the messaging user's e-mail address. UNICODE compilation.
    PR_EMAIL_ADDRESS_W: {id: 0x3003, type: PropertyType.PT_UNICODE},
    // Contains the messaging user's SMTP e-mail address. Non-UNICODE compilation.
    PR_SMTP_ADDRESS_A: {id: 0x39FE, type: PropertyType.PT_STRING8},
    // Contains the messaging user's SMTP e-mail address. UNICODE compilation.
    PR_SMTP_ADDRESS_W: {id: 0x39FE, type: PropertyType.PT_UNICODE},
    // Contains the messaging user's 7bit e-mail address. Non-UNICODE compilation.
    PR_7BIT_DISPLAY_NAME_A: {id: 0x39FF, type: PropertyType.PT_STRING8},
    // Contains the messaging user's SMTP e-mail address. UNICODE compilation.
    PR_7BIT_DISPLAY_NAME_W: {id: 0x39FF, type: PropertyType.PT_UNICODE},
    // Contains the messaging user's e-mail address. Non-UNICODE compilation.
    PR_EMAIL_ADDRESS_A: {id: 0x3003, type: PropertyType.PT_STRING8},
    // Contains a comment about the purpose or content of an object. UNICODE compilation.
    PR_COMMENT_W: {id: 0x3004, type: PropertyType.PT_UNICODE},
    // Contains a comment about the purpose or content of an object. Non-UNICODE compilation.
    PR_COMMENT_A: {id: 0x3004, type: PropertyType.PT_STRING8},
    // Contains an integer that represents the relative level of indentation, or depth, of an object in a hierarchy table.
    PR_DEPTH: {id: 0x3005, type: PropertyType.PT_LONG},
    // Contains the vendor-defined display name for a service provider. UNICODE compilation.
    PR_PROVIDER_DISPLAY_W: {id: 0x3006, type: PropertyType.PT_UNICODE},
    // Contains the vendor-defined display name for a service provider. Non-UNICODE compilation.
    PR_PROVIDER_DISPLAY_A: {id: 0x3006, type: PropertyType.PT_STRING8},
    // Contains the creation date and time of a message.
    PR_CREATION_TIME: {id: 0x3007, type: PropertyType.PT_SYSTIME},
    // Contains the date and time when the object or subobject was last modified.
    PR_LAST_MODIFICATION_TIME: {id: 0x3008, type: PropertyType.PT_SYSTIME},
    // Contains a bitmask of flags for message services and providers.
    PR_RESOURCE_FLAGS: {id: 0x3009, type: PropertyType.PT_LONG},
    // Contains the base file name of the MAPI service provider dynamic-link library (DLL). UNICODE compilation.
    PR_PROVIDER_DLL_NAME_W: {id: 0x300A, type: PropertyType.PT_UNICODE},
    // Contains the base file name of the MAPI service provider dynamic-link library (DLL). Non-UNICODE compilation.
    PR_PROVIDER_DLL_NAME_A: {id: 0x300A, type: PropertyType.PT_STRING8},
    // Contains a binary-comparable key that identifies correlated objects for a search.
    PR_SEARCH_KEY: {id: 0x300B, type: PropertyType.PT_BINARY},
    // Contains a MAPIUID structure of the service provider that is handling a message.
    PR_PROVIDER_UID: {id: 0x300C, type: PropertyType.PT_BINARY},
    // Contains the zero-based index of a service provider's position in the provider table.
    PR_PROVIDER_ORDINAL: {id: 0x300D, type: PropertyType.PT_LONG},
    // Contains the version of a form. UNICODE compilation.
    PR_FORM_VERSION_W: {id: 0x3301, type: PropertyType.PT_UNICODE},
    // Contains the version of a form. Non-UNICODE compilation.
    PR_FORM_VERSION_A: {id: 0x3301, type: PropertyType.PT_STRING8},
    //    //// Contains the 128-bit Object Linking and Embedding (OLE) globally unique identifier (GUID) of a form.
    //    //PR_FORM_CLSID
    //{
    //    get { return new PropertyTag(0x3302, type: PropertyType.PT_CLSID); }
    //}
    // Contains the name of a contact for information about a form. UNICODE compilation.
    PR_FORM_CONTACT_NAME_W: {id: 0x3303, type: PropertyType.PT_UNICODE},
    // Contains the name of a contact for information about a form. Non-UNICODE compilation.
    PR_FORM_CONTACT_NAME_A: {id: 0x3303, type: PropertyType.PT_STRING8},
    // Contains the category of a form. UNICODE compilation.
    PR_FORM_CATEGORY_W: {id: 0x3304, type: PropertyType.PT_UNICODE},
    // Contains the category of a form. Non-UNICODE compilation.
    PR_FORM_CATEGORY_A: {id: 0x3304, type: PropertyType.PT_STRING8},
    // Contains the subcategory of a form, as defined by a client application. UNICODE compilation.
    PR_FORM_CATEGORY_SUB_W: {id: 0x3305, type: PropertyType.PT_UNICODE},
    // Contains the subcategory of a form, as defined by a client application. Non-UNICODE compilation.
    PR_FORM_CATEGORY_SUB_A: {id: 0x3305, type: PropertyType.PT_STRING8},
    // Contains a host map of available forms.
    PR_FORM_HOST_MAP: {id: 0x3306, type: PropertyType.PT_MV_LONG},
    // Contains TRUE if a form is to be suppressed from display by compose menus and dialog boxes.
    PR_FORM_HIDDEN: {id: 0x3307, type: PropertyType.PT_BOOLEAN},
    // Contains the display name for the object that is used to design the form. UNICODE compilation.
    PR_FORM_DESIGNER_NAME_W: {id: 0x3308, type: PropertyType.PT_UNICODE},
    // Contains the display name for the object that is used to design the form. Non-UNICODE compilation.
    PR_FORM_DESIGNER_NAME_A: {id: 0x3308, type: PropertyType.PT_STRING8},
    //    //// Contains the unique identifier for the object that is used to design a form.
    //    //PR_FORM_DESIGNER_GUID
    //{
    //    get { return new PropertyTag(0x3309, type: PropertyType.PT_CLSID); }
    //}
    // Contains TRUE if a message should be composed in the current folder.
    PR_FORM_MESSAGE_BEHAVIOR: {id: 0x330A, type: PropertyType.PT_LONG},
    // Contains TRUE if a message store is the default message store in the message store table.
    PR_DEFAULT_STORE: {id: 0x3400, type: PropertyType.PT_BOOLEAN},
    // Contains a bitmask of flags that client applications query to determine the characteristics of a message store.
    PR_STORE_SUPPORT_MASK: {id: 0x340D, type: PropertyType.PT_LONG},
    // Contains a flag that describes the state of the message store.
    PR_STORE_STATE: {id: 0x340E, type: PropertyType.PT_LONG},
    // Contains a bitmask of flags that client applications should query to determine the characteristics of a message store.
    PR_STORE_UNICODE_MASK: {id: 0x340F, type: PropertyType.PT_LONG},
    // Was originally meant to contain the search key of the interpersonal message (IPM) root folder. No longer supported
    PR_IPM_SUBTREE_SEARCH_KEY: {id: 0x3410, type: PropertyType.PT_BINARY},
    // Was originally meant to contain the search key of the standard Outbox folder. No longer supported.
    PR_IPM_OUTBOX_SEARCH_KEY: {id: 0x3411, type: PropertyType.PT_BINARY},
    // Was originally meant to contain the search key of the standard Deleted Items folder. No longer supported.
    PR_IPM_WASTEBASKET_SEARCH_KEY: {id: 0x3412, type: PropertyType.PT_BINARY},
    // Was originally meant to contain the search key of the standard Sent Items folder. No longer supported.
    PR_IPM_SENTMAIL_SEARCH_KEY: {id: 0x3413, type: PropertyType.PT_BINARY},
    // Contains a provider-defined MAPIUID structure that indicates the type of the message store.
    PR_MDB_PROVIDER: {id: 0x3414, type: PropertyType.PT_BINARY},
    // Contains a table of a message store's receive folder settings.
    PR_RECEIVE_FOLDER_SETTINGS: {id: 0x3415, type: PropertyType.PT_OBJECT},
    // Contains a bitmask of flags that indicate the validity of the entry identifiers of the folders in a message store.
    PR_VALID_FOLDER_MASK: {id: 0x35DF, type: PropertyType.PT_LONG},
    // Contains the entry identifier of the root of the IPM folder subtree in the message store's folder tree.
    PR_IPM_SUBTREE_ENTRYID: {id: 0x35E0, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the standard interpersonal message (IPM) Outbox folder.
    PR_IPM_OUTBOX_ENTRYID: {id: 0x35E2, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the standard IPM Deleted Items folder.
    PR_IPM_WASTEBASKET_ENTRYID: {id: 0x35E3, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the standard IPM Sent Items folder.
    PR_IPM_SENTMAIL_ENTRYID: {id: 0x35E4, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the user-defined Views folder.
    PR_VIEWS_ENTRYID: {id: 0x35E5, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the predefined common view folder.
    PR_COMMON_VIEWS_ENTRYID: {id: 0x35E6, type: PropertyType.PT_BINARY},
    // Contains the entry identifier for the folder in which search results are typically created.
    PR_FINDER_ENTRYID: {id: 0x35E7, type: PropertyType.PT_BINARY},
    // When TRUE, forces the serialization of SMTP and POP3 authentication requests such that the POP3 account is
    // authenticated before the SMTP account.
    PR_CE_RECEIVE_BEFORE_SEND: {id: 0x812D, type: PropertyType.PT_BOOLEAN},
    // Contains a bitmask of flags describing capabilities of an address book container.
    PR_CONTAINER_FLAGS: {id: 0x3600, type: PropertyType.PT_LONG},
    // Contains a constant that indicates the folder type.
    PR_FOLDER_TYPE: {id: 0x3601, type: PropertyType.PT_LONG},
    // Contains the number of messages in a folder, as computed by the message store.
    PR_CONTENT_COUNT: {id: 0x3602, type: PropertyType.PT_LONG},
    // Contains the number of unread messages in a folder, as computed by the message store.
    PR_CONTENT_UNREAD: {id: 0x3603, type: PropertyType.PT_LONG},
    // Contains an embedded table object that contains dialog box template entry identifiers.
    PR_CREATE_TEMPLATES: {id: 0x3604, type: PropertyType.PT_OBJECT},
    // Contains an embedded display table object.
    PR_DETAILS_TABLE: {id: 0x3605, type: PropertyType.PT_OBJECT},
    // Contains a container object that is used for advanced searches.
    PR_SEARCH: {id: 0x3607, type: PropertyType.PT_OBJECT},
    // Contains TRUE if the entry in the one-off table can be selected.
    PR_SELECTABLE: {id: 0x3609, type: PropertyType.PT_BOOLEAN},
    // Contains TRUE if a folder contains subfolders.
    PR_SUBFOLDERS: {id: 0x360A, type: PropertyType.PT_BOOLEAN},
    // Contains a 32-bit bitmask of flags that define folder status.
    PR_STATUS: {id: 0x360B, type: PropertyType.PT_LONG},
    // Contains a string value for use in a property restriction on an address book container contents table. UNICODE
    // compilation
    PR_ANR_W: {id: 0x360C, type: PropertyType.PT_UNICODE},
    // Contains a string value for use in a property restriction on an address book container contents table. Non-UNICODE
    // compilation
    PR_ANR_A: {id: 0x360C, type: PropertyType.PT_STRING8},
    // No longer supported
    PR_CONTENTS_SORT_ORDER: {id: 0x360D, type: PropertyType.PT_MV_LONG},
    // Contains an embedded hierarchy table object that provides information about the child containers.
    PR_CONTAINER_HIERARCHY: {id: 0x360E, type: PropertyType.PT_OBJECT},
    // Contains an embedded contents table object that provides information about a container.
    PR_CONTAINER_CONTENTS: {id: 0x360F, type: PropertyType.PT_OBJECT},
    // Contains an embedded contents table object that provides information about a container.
    PR_FOLDER_ASSOCIATED_CONTENTS: {id: 0x3610, type: PropertyType.PT_OBJECT},
    // Contains the template entry identifier for a default distribution list.
    PR_DEF_CREATE_DL: {id: 0x3611, type: PropertyType.PT_BINARY},
    // Contains the template entry identifier for a default messaging user object.
    PR_DEF_CREATE_MAILUSER: {id: 0x3612, type: PropertyType.PT_BINARY},
    // Contains a text string describing the type of a folder. Although this property is generally ignored, versions of
    // Microsoft® Exchange Server prior to Exchange Server 2003 Mailbox Manager expect this property to be present.
    // UNICODE compilation.
    PR_CONTAINER_CLASS_W: {id: 0x3613, type: PropertyType.PT_UNICODE},
    // Contains a text string describing the type of a folder. Although this property is generally ignored, versions of
    // Microsoft® Exchange Server prior to Exchange Server 2003 Mailbox Manager expect this property to be present.
    // Non-UNICODE compilation.
    PR_CONTAINER_CLASS_A: {id: 0x3613, type: PropertyType.PT_STRING8},
    // Unknown
    PR_CONTAINER_MODIFY_VERSION: {id: 0x3614, type: PropertyType.PT_I8},
    // Contains an address book provider's MAPIUID structure.
    PR_AB_PROVIDER_ID: {id: 0x3615, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of a folder's default view.
    PR_DEFAULT_VIEW_ENTRYID: {id: 0x3616, type: PropertyType.PT_BINARY},
    // Contains the count of items in the associated contents table of the folder.
    PR_ASSOC_CONTENT_COUNT: {id: 0x3617, type: PropertyType.PT_LONG},
    // was originally meant to contain an ASN.1 object identifier specifying how the attachment should be handled during
    // transmission. No longer supported.
    PR_ATTACHMENT_X400_PARAMETERS: {id: 0x3700, type: PropertyType.PT_BINARY},
    // Contains the content identification header of a MIME message attachment. This property is used for MHTML support.
    // It represents the content identification header for the appropriate MIME body part. UNICODE compilation.
    PR_ATTACH_CONTENT_ID_W: {id: 0x3712, type: PropertyType.PT_UNICODE},
    // Contains the content identification header of a MIME message attachment. This property is used for MHTML support.
    // It represents the content identification header for the appropriate MIME body part. Non-UNICODE compilation.
    PR_ATTACH_CONTENT_ID_A: {id: 0x3712, type: PropertyType.PT_STRING8},
    // Contains the content location header of a MIME message attachment. This property is used for MHTML support. It
    // represents the content location header for the appropriate MIME body part. UNICODE compilation.
    PR_ATTACH_CONTENT_LOCATION_W: {id: 0x3713, type: PropertyType.PT_UNICODE},
    // Contains the content location header of a MIME message attachment. This property is used for MHTML support. It
    // represents the content location header for the appropriate MIME body part. UNICODE compilation.
    PR_ATTACH_CONTENT_LOCATION_A: {id: 0x3713, type: PropertyType.PT_STRING8},
    // Contains an attachment object typically accessed through the OLE IStorage:IUnknown interface.
    PR_ATTACH_DATA_OBJ: {id: 0x3701, type: PropertyType.PT_OBJECT},
    // Contains binary attachment data typically accessed through the COM IStream:IUnknown interface.
    PR_ATTACH_DATA_BIN: {id: 0x3701, type: PropertyType.PT_BINARY},
    // Contains an ASN.1 object identifier specifying the encoding for an attachment.
    PR_ATTACH_ENCODING: {id: 0x3702, type: PropertyType.PT_BINARY},
    // Contains a filename extension that indicates the document type of an attachment. UNICODE compilation.
    PR_ATTACH_EXTENSION_W: {id: 0x3703, type: PropertyType.PT_UNICODE},
    // Contains a filename extension that indicates the document type of an attachment. Non-UNICODE compilation.
    PR_ATTACH_EXTENSION_A: {id: 0x3703, type: PropertyType.PT_STRING8},
    // Contains an attachment's base filename and extension, excluding path. UNICODE compilation.
    PR_ATTACH_FILENAME_W: {id: 0x3704, type: PropertyType.PT_UNICODE},
    // Contains an attachment's base filename and extension, excluding path. Non-UNICODE compilation.
    PR_ATTACH_FILENAME_A: {id: 0x3704, type: PropertyType.PT_STRING8},
    // Contains a MAPI-defined constant representing the way the contents of an attachment can be accessed.
    PR_ATTACH_METHOD: {id: 0x3705, type: PropertyType.PT_LONG},
    // Contains an attachment's long filename and extension, excluding path. UNICODE compilation.
    PR_ATTACH_LONG_FILENAME_W: {id: 0x3707, type: PropertyType.PT_UNICODE},
    // Contains an attachment's long filename and extension, excluding path. Non-UNICODE compilation.
    PR_ATTACH_LONG_FILENAME_A: {id: 0x3707, type: PropertyType.PT_STRING8},
    // Contains an attachment's fully qualified path and filename. UNICODE compilation.
    PR_ATTACH_PATHNAME_W: {id: 0x3708, type: PropertyType.PT_UNICODE},
    // Contains an attachment's fully qualified path and filename. Non-UNICODE compilation.
    PR_ATTACH_PATHNAME_A: {id: 0x3708, type: PropertyType.PT_STRING8},
    // Contains a Microsoft Windows metafile with rendering information for an attachment.
    PR_ATTACH_RENDERING: {id: 0x3709, type: PropertyType.PT_BINARY},
    // Contains an ASN.1 object identifier specifying the application that supplied an attachment.
    PR_ATTACH_TAG: {id: 0x370A, type: PropertyType.PT_BINARY},
    // Contains an offset, in characters, to use in rendering an attachment within the main message text.
    PR_RENDERING_POSITION: {id: 0x370B, type: PropertyType.PT_LONG},
    // Contains the name of an attachment file modified so that it can be correlated with TNEF messages. UNICODE
    // compilation.
    PR_ATTACH_TRANSPORT_NAME_W: {id: 0x370C, type: PropertyType.PT_UNICODE},
    // Contains the name of an attachment file modified so that it can be correlated with TNEF messages. Non-UNICODE
    // compilation.
    PR_ATTACH_TRANSPORT_NAME_A: {id: 0x370C, type: PropertyType.PT_STRING8},
    // Contains an attachment's fully qualified long path and filename. UNICODE compilation.
    PR_ATTACH_LONG_PATHNAME_W: {id: 0x370D, type: PropertyType.PT_UNICODE},
    // Contains an attachment's fully qualified long path and filename. Non-UNICODE compilation.
    PR_ATTACH_LONG_PATHNAME_A: {id: 0x370D, type: PropertyType.PT_STRING8},
    // Contains formatting information about a Multipurpose Internet Mail Extensions (MIME) attachment. UNICODE
    // compilation.
    PR_ATTACH_MIME_TAG_W: {id: 0x370E, type: PropertyType.PT_UNICODE},
    // Contains formatting information about a Multipurpose Internet Mail Extensions (MIME) attachment. Non-UNICODE
    // compilation.
    PR_ATTACH_MIME_TAG_A: {id: 0x370E, type: PropertyType.PT_STRING8},
    // Provides file type information for a non-Windows attachment.
    PR_ATTACH_ADDITIONAL_INFO: {id: 0x370F, type: PropertyType.PT_BINARY},
    // Contains a value used to associate an icon with a particular row of a table.
    PR_DISPLAY_TYPE: {id: 0x3900, type: PropertyType.PT_LONG},
    // Contains the PR_ENTRYID (PidTagEntryId), expressed as a permanent entry ID format.
    PR_TEMPLATEID: {id: 0x3902, type: PropertyType.PT_BINARY},
    // These properties appear on address book objects. Obsolete.
    PR_PRIMARY_CAPABILITY: {id: 0x3904, type: PropertyType.PT_BINARY},
    // Contains the type of an entry, with respect to how the entry should be displayed in a row in a table for the Global
    // Address List.
    PR_DISPLAY_TYPE_EX: {id: 0x3905, type: PropertyType.PT_LONG},
    // Contains the recipient's account name. UNICODE compilation.
    PR_ACCOUNT_W: {id: 0x3A00, type: PropertyType.PT_UNICODE},
    // Contains the recipient's account name. Non-UNICODE compilation.
    PR_ACCOUNT_A: {id: 0x3A00, type: PropertyType.PT_STRING8},
    // Contains a list of entry identifiers for alternate recipients designated by the original recipient.
    PR_ALTERNATE_RECIPIENT: {id: 0x3A01, type: PropertyType.PT_BINARY},
    // Contains a telephone number that the message recipient can use to reach the sender. UNICODE compilation.
    PR_CALLBACK_TELEPHONE_NUMBER_W: {id: 0x3A02, type: PropertyType.PT_UNICODE},
    // Contains a telephone number that the message recipient can use to reach the sender. Non-UNICODE compilation.
    PR_CALLBACK_TELEPHONE_NUMBER_A: {id: 0x3A02, type: PropertyType.PT_STRING8},
    // Contains TRUE if message conversions are prohibited by default for the associated messaging user.
    PR_CONVERSION_PROHIBITED: {id: 0x3A03, type: PropertyType.PT_BOOLEAN},
    // The DiscloseRecipients field represents a PR_DISCLOSE_RECIPIENTS MAPI property.
    PR_DISCLOSE_RECIPIENTS: {id: 0x3A04, type: PropertyType.PT_BOOLEAN},
    // Contains a generational abbreviation that follows the full name of the recipient. UNICODE compilation.
    PR_GENERATION_W: {id: 0x3A05, type: PropertyType.PT_UNICODE},
    // Contains a generational abbreviation that follows the full name of the recipient. Non-UNICODE compilation.
    PR_GENERATION_A: {id: 0x3A05, type: PropertyType.PT_STRING8},
    // Contains the first or given name of the recipient. UNICODE compilation.
    PR_GIVEN_NAME_W: {id: 0x3A06, type: PropertyType.PT_UNICODE},
    // Contains the first or given name of the recipient. Non-UNICODE compilation.
    PR_GIVEN_NAME_A: {id: 0x3A06, type: PropertyType.PT_STRING8},
    // Contains a government identifier for the recipient. UNICODE compilation.
    PR_GOVERNMENT_ID_NUMBER_W: {id: 0x3A07, type: PropertyType.PT_UNICODE},
    // Contains a government identifier for the recipient. Non-UNICODE compilation.
    PR_GOVERNMENT_ID_NUMBER_A: {id: 0x3A07, type: PropertyType.PT_STRING8},
    // Contains the primary telephone number of the recipient's place of business. UNICODE compilation.
    PR_BUSINESS_TELEPHONE_NUMBER_W: {id: 0x3A08, type: PropertyType.PT_UNICODE},
    // Contains the primary telephone number of the recipient's place of business. Non-UNICODE compilation.
    PR_BUSINESS_TELEPHONE_NUMBER_A: {id: 0x3A08, type: PropertyType.PT_STRING8},
    // Contains the primary telephone number of the recipient's home. UNICODE compilation.
    PR_HOME_TELEPHONE_NUMBER_W: {id: 0x3A09, type: PropertyType.PT_UNICODE},
    // Contains the primary telephone number of the recipient's home. Non-UNICODE compilation.
    PR_HOME_TELEPHONE_NUMBER_A: {id: 0x3A09, type: PropertyType.PT_STRING8},
    // Contains the initials for parts of the full name of the recipient. UNICODE compilation.
    PR_INITIALS_W: {id: 0x3A0A, type: PropertyType.PT_UNICODE},
    // Contains the initials for parts of the full name of the recipient. Non-UNICODE compilation.
    PR_INITIALS_A: {id: 0x3A0A, type: PropertyType.PT_STRING8},
    // Contains a keyword that identifies the recipient to the recipient's system administrator. UNICODE compilation.
    PR_KEYWORD_W: {id: 0x3A0B, type: PropertyType.PT_UNICODE},
    // Contains a keyword that identifies the recipient to the recipient's system administrator. Non-UNICODE compilation.
    PR_KEYWORD_A: {id: 0x3A0B, type: PropertyType.PT_STRING8},
    // Contains a value that indicates the language in which the messaging user is writing messages. UNICODE compilation.
    PR_LANGUAGE_W: {id: 0x3A0C, type: PropertyType.PT_UNICODE},
    // Contains a value that indicates the language in which the messaging user is writing messages. Non-UNICODE
    // compilation.
    PR_LANGUAGE_A: {id: 0x3A0C, type: PropertyType.PT_STRING8},
    // Contains the location of the recipient in a format that is useful to the recipient's organization. UNICODE
    // compilation.
    PR_LOCATION_W: {id: 0x3A0D, type: PropertyType.PT_UNICODE},
    // Contains the location of the recipient in a format that is useful to the recipient's organization. Non-UNICODE
    // compilation.
    PR_LOCATION_A: {id: 0x3A0D, type: PropertyType.PT_STRING8},
    // Contains TRUE if the messaging user is allowed to send and receive messages.
    PR_MAIL_PERMISSION: {id: 0x3A0E, type: PropertyType.PT_BOOLEAN},
    // Contains the common name of the message handling system. UNICODE compilation.
    PR_MHS_COMMON_NAME_W: {id: 0x3A0F, type: PropertyType.PT_UNICODE},
    // Contains the common name of the message handling system. Non-UNICODE compilation.
    PR_MHS_COMMON_NAME_A: {id: 0x3A0F, type: PropertyType.PT_STRING8},
    // Contains an organizational ID number for the contact, such as an employee ID number. UNICODE compilation.
    PR_ORGANIZATIONAL_ID_NUMBER_W: {id: 0x3A10, type: PropertyType.PT_UNICODE},
    // Contains an organizational ID number for the contact, such as an employee ID number. Non-UNICODE compilation.
    PR_ORGANIZATIONAL_ID_NUMBER_A: {id: 0x3A10, type: PropertyType.PT_STRING8},
    // Contains the last or surname of the recipient. UNICODE compilation.
    PR_SURNAME_W: {id: 0x3A11, type: PropertyType.PT_UNICODE},
    // Contains the last or surname of the recipient. Non-UNICODE compilation.
    PR_SURNAME_A: {id: 0x3A11, type: PropertyType.PT_STRING8},
    // Contains the original entry identifier for an entry copied from an address book to a personal address book or other
    // writeable address book.
    PR_ORIGINAL_ENTRYID: {id: 0x3A12, type: PropertyType.PT_BINARY},
    // Contains the original display name for an entry copied from an address book to a personal address book or other
    // writable address book. UNICODE compilation.
    PR_ORIGINAL_DISPLAY_NAME_W: {id: 0x3A13, type: PropertyType.PT_UNICODE},
    // Contains the original display name for an entry copied from an address book to a personal address book or other
    // writable address book. Non-UNICODE compilation.
    PR_ORIGINAL_DISPLAY_NAME_A: {id: 0x3A13, type: PropertyType.PT_STRING8},
    // Contains the original search key for an entry copied from an address book to a personal address book or other
    // writeable address book.
    PR_ORIGINAL_SEARCH_KEY: {id: 0x3A14, type: PropertyType.PT_BINARY},
    // Contains the recipient's postal address. UNICODE compilation.
    PR_POSTAL_ADDRESS_W: {id: 0x3A15, type: PropertyType.PT_UNICODE},
    // Contains the recipient's postal address. Non-UNICODE compilation.
    PR_POSTAL_ADDRESS_A: {id: 0x3A15, type: PropertyType.PT_STRING8},
    // Contains the recipient's company name. UNICODE compilation.
    PR_COMPANY_NAME_W: {id: 0x3A16, type: PropertyType.PT_UNICODE},
    // Contains the recipient's company name. Non-UNICODE compilation.
    PR_COMPANY_NAME_A: {id: 0x3A16, type: PropertyType.PT_STRING8},
    // Contains the recipient's job title. UNICODE compilation.
    PR_TITLE_W: {id: 0x3A17, type: PropertyType.PT_UNICODE},
    // Contains the recipient's job title. Non-UNICODE compilation.
    PR_TITLE_A: {id: 0x3A17, type: PropertyType.PT_STRING8},
    // Contains a name for the department in which the recipient works. UNICODE compilation.
    PR_DEPARTMENT_NAME_W: {id: 0x3A18, type: PropertyType.PT_UNICODE},
    // Contains a name for the department in which the recipient works. Non-UNICODE compilation.
    PR_DEPARTMENT_NAME_A: {id: 0x3A18, type: PropertyType.PT_STRING8},
    // Contains the recipient's office location. UNICODE compilation.
    PR_OFFICE_LOCATION_W: {id: 0x3A19, type: PropertyType.PT_UNICODE},
    // Contains the recipient's office location. Non-UNICODE compilation.
    PR_OFFICE_LOCATION_A: {id: 0x3A19, type: PropertyType.PT_STRING8},
    // Contains the recipient's primary telephone number. UNICODE compilation.
    PR_PRIMARY_TELEPHONE_NUMBER_W: {id: 0x3A1A, type: PropertyType.PT_UNICODE},
    // Contains the recipient's primary telephone number. Non-UNICODE compilation.
    PR_PRIMARY_TELEPHONE_NUMBER_A: {id: 0x3A1A, type: PropertyType.PT_STRING8},
    // Contains a secondary telephone number at the recipient's place of business. UNICODE compilation.
    PR_BUSINESS2_TELEPHONE_NUMBER_W: {id: 0x3A1B, type: PropertyType.PT_UNICODE},
    // Contains a secondary telephone number at the recipient's place of business. Non-UNICODE compilation.
    PR_BUSINESS2_TELEPHONE_NUMBER_A: {id: 0x3A1B, type: PropertyType.PT_STRING8},
    // Contains the recipient's cellular telephone number. UNICODE compilation.
    PR_MOBILE_TELEPHONE_NUMBER_W: {id: 0x3A1C, type: PropertyType.PT_UNICODE},
    // Contains the recipient's cellular telephone number. Non-UNICODE compilation.
    PR_MOBILE_TELEPHONE_NUMBER_A: {id: 0x3A1C, type: PropertyType.PT_STRING8},
    // Contains the recipient's radio telephone number. UNICODE compilation.
    PR_RADIO_TELEPHONE_NUMBER_W: {id: 0x3A1D, type: PropertyType.PT_UNICODE},
    // Contains the recipient's radio telephone number. Non-UNICODE compilation.
    PR_RADIO_TELEPHONE_NUMBER_A: {id: 0x3A1D, type: PropertyType.PT_STRING8},
    // Contains the recipient's car telephone number. UNICODE compilation.
    PR_CAR_TELEPHONE_NUMBER_W: {id: 0x3A1E, type: PropertyType.PT_UNICODE},
    // Contains the recipient's car telephone number. Non-UNICODE compilation.
    PR_CAR_TELEPHONE_NUMBER_A: {id: 0x3A1E, type: PropertyType.PT_STRING8},
    // Contains an alternate telephone number for the recipient. UNICODE compilation.
    PR_OTHER_TELEPHONE_NUMBER_W: {id: 0x3A1F, type: PropertyType.PT_UNICODE},
    // Contains an alternate telephone number for the recipient. Non-UNICODE compilation.
    PR_OTHER_TELEPHONE_NUMBER_A: {id: 0x3A1F, type: PropertyType.PT_STRING8},
    // Contains a recipient's display name in a secure form that cannot be changed. UNICODE compilation.
    PR_TRANSMITABLE_DISPLAY_NAME_W: {id: 0x3A20, type: PropertyType.PT_UNICODE},
    // Contains a recipient's display name in a secure form that cannot be changed. Non-UNICODE compilation.
    PR_TRANSMITABLE_DISPLAY_NAME_A: {id: 0x3A20, type: PropertyType.PT_STRING8},
    // Contains the recipient's pager telephone number. UNICODE compilation.
    PR_PAGER_TELEPHONE_NUMBER_W: {id: 0x3A21, type: PropertyType.PT_UNICODE},
    // Contains the recipient's pager telephone number. Non-UNICODE compilation.
    PR_PAGER_TELEPHONE_NUMBER_A: {id: 0x3A21, type: PropertyType.PT_STRING8},
    // Contains an ASN.1 authentication certificate for a messaging user.
    PR_USER_CERTIFICATE: {id: 0x3A22, type: PropertyType.PT_BINARY},
    // Contains the telephone number of the recipient's primary fax machine. UNICODE compilation.
    PR_PRIMARY_FAX_NUMBER_W: {id: 0x3A23, type: PropertyType.PT_UNICODE},
    // Contains the telephone number of the recipient's primary fax machine. Non-UNICODE compilation.
    PR_PRIMARY_FAX_NUMBER_A: {id: 0x3A23, type: PropertyType.PT_STRING8},
    // Contains the telephone number of the recipient's business fax machine. UNICODE compilation.
    PR_BUSINESS_FAX_NUMBER_W: {id: 0x3A24, type: PropertyType.PT_UNICODE},
    // Contains the telephone number of the recipient's business fax machine. Non-UNICODE compilation.
    PR_BUSINESS_FAX_NUMBER_A: {id: 0x3A24, type: PropertyType.PT_STRING8},
    // Contains the telephone number of the recipient's home fax machine. UNICODE compilation.
    PR_HOME_FAX_NUMBER_W: {id: 0x3A25, type: PropertyType.PT_UNICODE},
    // Contains the telephone number of the recipient's home fax machine. Non-UNICODE compilation.
    PR_HOME_FAX_NUMBER_A: {id: 0x3A25, type: PropertyType.PT_STRING8},
    // Contains the name of the recipient's country/region. UNICODE compilation.
    PR_COUNTRY_W: {id: 0x3A26, type: PropertyType.PT_UNICODE},
    // Contains the name of the recipient's country/region. Non-UNICODE compilation.
    PR_COUNTRY_A: {id: 0x3A26, type: PropertyType.PT_STRING8},
    // Contains the name of the recipient's locality, such as the town or city. UNICODE compilation.
    PR_LOCALITY_W: {id: 0x3A27, type: PropertyType.PT_UNICODE},
    // Contains the name of the recipient's locality, such as the town or city. Non-UNICODE compilation.
    PR_LOCALITY_A: {id: 0x3A27, type: PropertyType.PT_STRING8},
    // Contains the name of the recipient's state or province. UNICODE compilation.
    PR_STATE_OR_PROVINCE_W: {id: 0x3A28, type: PropertyType.PT_UNICODE},
    // Contains the name of the recipient's state or province. Non-UNICODE compilation.
    PR_STATE_OR_PROVINCE_A: {id: 0x3A28, type: PropertyType.PT_STRING8},
    // Contains the recipient's street address. UNICODE compilation.
    PR_STREET_ADDRESS_W: {id: 0x3A29, type: PropertyType.PT_UNICODE},
    // Contains the recipient's street address. Non-UNICODE compilation.
    PR_STREET_ADDRESS_A: {id: 0x3A29, type: PropertyType.PT_STRING8},
    // Contains the postal code for the recipient's postal address. UNICODE compilation.
    PR_POSTAL_CODE_W: {id: 0x3A2A, type: PropertyType.PT_UNICODE},
    // Contains the postal code for the recipient's postal address. Non-UNICODE compilation.
    PR_POSTAL_CODE_A: {id: 0x3A2A, type: PropertyType.PT_STRING8},
    // Contains the number or identifier of the recipient's post office box. UNICODE compilation.
    PR_POST_OFFICE_BOX_W: {id: 0x3A2B, type: PropertyType.PT_UNICODE},
    // Contains the number or identifier of the recipient's post office box. Non-UNICODE compilation.
    PR_POST_OFFICE_BOX_A: {id: 0x3A2B, type: PropertyType.PT_STRING8},
    // Contains the recipient's telex number. UNICODE compilation.
    PR_TELEX_NUMBER_W: {id: 0x3A2C, type: PropertyType.PT_UNICODE},
    // Contains the recipient's telex number. Non-UNICODE compilation.
    PR_TELEX_NUMBER_A: {id: 0x3A2C, type: PropertyType.PT_STRING8},
    // Contains the recipient's ISDN-capable telephone number. UNICODE compilation.
    PR_ISDN_NUMBER_W: {id: 0x3A2D, type: PropertyType.PT_UNICODE},
    // Contains the recipient's ISDN-capable telephone number. Non-UNICODE compilation.
    PR_ISDN_NUMBER_A: {id: 0x3A2D, type: PropertyType.PT_STRING8},
    // Contains the telephone number of the recipient's administrative assistant. UNICODE compilation.
    PR_ASSISTANT_TELEPHONE_NUMBER_W: {id: 0x3A2E, type: PropertyType.PT_UNICODE},
    // Contains the telephone number of the recipient's administrative assistant. Non-UNICODE compilation.
    PR_ASSISTANT_TELEPHONE_NUMBER_A: {id: 0x3A2E, type: PropertyType.PT_STRING8},
    // Contains a secondary telephone number at the recipient's home. UNICODE compilation.
    PR_HOME2_TELEPHONE_NUMBER_W: {id: 0x3A2F, type: PropertyType.PT_UNICODE},
    // Contains a secondary telephone number at the recipient's home. Non-UNICODE compilation.
    PR_HOME2_TELEPHONE_NUMBER_A: {id: 0x3A2F, type: PropertyType.PT_STRING8},
    // Contains the name of the recipient's administrative assistant. UNICODE compilation.
    PR_ASSISTANT_W: {id: 0x3A30, type: PropertyType.PT_UNICODE},
    // Contains the name of the recipient's administrative assistant. Non-UNICODE compilation.
    PR_ASSISTANT_A: {id: 0x3A30, type: PropertyType.PT_STRING8},
    // Contains TRUE if the recipient can receive all message content, including Rich Text Format (RTF) and Object Linking
    // and Embedding (OLE) objects.
    PR_SEND_RICH_INFO: {id: 0x3A40, type: PropertyType.PT_BOOLEAN},
    // Contains a list of identifiers of message store providers in the current profile.
    PR_STORE_PROVIDERS: {id: 0x3D00, type: PropertyType.PT_BINARY},
    // Contains a list of identifiers for address book providers in the current profile.
    PR_AB_PROVIDERS: {id: 0x3D01, type: PropertyType.PT_BINARY},
    // Contains a list of identifiers of transport providers in the current profile.
    PR_TRANSPORT_PROVIDERS: {id: 0x3D02, type: PropertyType.PT_BINARY},
    // Contains TRUE if a messaging user profile is the MAPI default profile.
    PR_DEFAULT_PROFILE: {id: 0x3D04, type: PropertyType.PT_BOOLEAN},
    // Contains a list of entry identifiers for address book containers that are to be searched to resolve names.
    PR_AB_SEARCH_PATH: {id: 0x3D05, type: PropertyType.PT_MV_BINARY},
    // Contains the entry identifier of the address book container to display first.
    PR_AB_DEFAULT_DIR: {id: 0x3D06, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of the address book container to use as the personal address book (PAB).
    PR_AB_DEFAULT_PAB: {id: 0x3D07, type: PropertyType.PT_BINARY},
    // The MAPI property PR_FILTERING_HOOKS.
    PR_FILTERING_HOOKS: {id: 0x3D08, type: PropertyType.PT_BINARY},
    // Contains the unicode name of a message service as set by the user in the MapiSvc.inf file.
    PR_SERVICE_NAME_W: {id: 0x3D09, type: PropertyType.PT_UNICODE},
    // Contains the ANSI name of a message service as set by the user in the MapiSvc.inf file.
    PR_SERVICE_NAME_A: {id: 0x3D09, type: PropertyType.PT_STRING8},
    // Contains the unicode filename of the DLL containing the message service provider entry point function to call for
    // configuration.
    PR_SERVICE_DLL_NAME_W: {id: 0x3D0A, type: PropertyType.PT_UNICODE},
    // Contains the ANSI filename of the DLL containing the message service provider entry point function to call for
    // configuration.
    PR_SERVICE_DLL_NAME_A: {id: 0x3D0A, type: PropertyType.PT_STRING8},
    // Contains the MAPIUID structure for a message service.
    PR_SERVICE_UID: {id: 0x3D0C, type: PropertyType.PT_BINARY},
    // Contains a list of MAPIUID structures that identify additional profile sections for the message service.
    PR_SERVICE_EXTRA_UIDS: {id: 0x3D0D, type: PropertyType.PT_BINARY},
    // Contains a list of identifiers of message services in the current profile.
    PR_SERVICES: {id: 0x3D0E, type: PropertyType.PT_BINARY},
    // Contains a ANSI list of the files that belong to the message service.
    PR_SERVICE_SUPPORT_FILES_W: {id: 0x3D0F, type: PropertyType.PT_MV_UNICODE},
    // Contains a ANSI list of the files that belong to the message service.
    PR_SERVICE_SUPPORT_FILES_A: {id: 0x3D0F, type: PropertyType.PT_MV_STRING8},
    // Contains a list of unicode filenames that are to be deleted when the message service is uninstalled.
    PR_SERVICE_DELETE_FILES_W: {id: 0x3D10, type: PropertyType.PT_MV_UNICODE},
    // Contains a list of filenames that are to be deleted when the message service is uninstalled.
    PR_SERVICE_DELETE_FILES_A: {id: 0x3D10, type: PropertyType.PT_MV_STRING8},
    // Contains a list of entry identifiers for address book containers explicitly configured by the user.
    PR_AB_SEARCH_PATH_UPDATE: {id: 0x3D11, type: PropertyType.PT_BINARY},
    // Contains the ANSI name of the profile.
    PR_PROFILE_NAME_A: {id: 0x3D12, type: PropertyType.PT_STRING8},
    // Contains the unicode name of the profile.
    PR_PROFILE_NAME_W: {id: 0x3D12, type: PropertyType.PT_UNICODE},
    // Contains the display name for a service provider's identity as defined within a messaging system. UNICODE
    // compilation.
    PR_IDENTITY_DISPLAY_W: {id: 0x3E00, type: PropertyType.PT_UNICODE},
    // Contains the display name for a service provider's identity as defined within a messaging system. Non-UNICODE
    // compilation.
    PR_IDENTITY_DISPLAY_A: {id: 0x3E00, type: PropertyType.PT_STRING8},
    // Contains the entry identifier for a service provider's identity as defined within a messaging system.
    PR_IDENTITY_ENTRYID: {id: 0x3E01, type: PropertyType.PT_BINARY},
    // Contains a bitmask of flags indicating the methods in the IMAPIStatus interface that are supported by the status
    // object.
    PR_RESOURCE_METHODS: {id: 0x3E02, type: PropertyType.PT_LONG},
    // Contains a value indicating the service provider type.
    PR_RESOURCE_TYPE: {id: 0x3E03, type: PropertyType.PT_LONG},
    // Contains a bitmask of flags indicating the current status of a session resource. All service providers set status
    // codes as does MAPI to report on the status of the subsystem, the MAPI spooler, and the integrated address book.
    PR_STATUS_CODE: {id: 0x3E04, type: PropertyType.PT_LONG},
    // Contains the search key for a service provider's identity as defined within a messaging system.
    PR_IDENTITY_SEARCH_KEY: {id: 0x3E05, type: PropertyType.PT_BINARY},
    // Contains the entry identifier of a transport's tightly coupled message store.
    PR_OWN_STORE_ENTRYID: {id: 0x3E06, type: PropertyType.PT_BINARY},
    // Contains a path to the service provider's server. UNICODE compilation.
    PR_RESOURCE_PATH_W: {id: 0x3E07, type: PropertyType.PT_UNICODE},
    // Contains a path to the service provider's server. Non-UNICODE compilation.
    PR_RESOURCE_PATH_A: {id: 0x3E07, type: PropertyType.PT_STRING8},
    // Contains an ASCII message indicating the current status of a session resource. UNICODE compilation.
    PR_STATUS_STRING_W: {id: 0x3E08, type: PropertyType.PT_UNICODE},
    // Contains an ASCII message indicating the current status of a session resource. Non-UNICODE compilation.
    PR_STATUS_STRING_A: {id: 0x3E08, type: PropertyType.PT_STRING8},
    // Was originally meant to contain TRUE if the message transfer system (MTS) allows X.400 deferred delivery
    // cancellation. No longer supported.
    PR_X400_DEFERRED_DELIVERY_CANCEL: {id: 0x3E09, type: PropertyType.PT_BOOLEAN},
    // Was originally meant to contain the entry identifier that a remote transport provider furnishes for its header
    // folder. No longer supported.
    PR_HEADER_FOLDER_ENTRYID: {id: 0x3E0A, type: PropertyType.PT_BINARY},
    // Contains a number indicating the status of a remote transfer.
    PR_REMOTE_PROGRESS: {id: 0x3E0B, type: PropertyType.PT_LONG},
    // Contains an ASCII string indicating the status of a remote transfer. UNICODE compilation.
    PR_REMOTE_PROGRESS_TEXT_W: {id: 0x3E0C, type: PropertyType.PT_UNICODE},
    // Contains an ASCII string indicating the status of a remote transfer. Non-UNICODE compilation.
    PR_REMOTE_PROGRESS_TEXT_A: {id: 0x3E0C, type: PropertyType.PT_STRING8},
    // Contains TRUE if the remote viewer is allowed to call the IMAPIStatus::ValidateState method.
    PR_REMOTE_VALIDATE_OK: {id: 0x3E0D, type: PropertyType.PT_BOOLEAN},
    // Contains a bitmask of flags governing the behavior of a control used in a dialog box built from a display table.
    PR_CONTROL_FLAGS: {id: 0x3F00, type: PropertyType.PT_LONG},
    // Contains a pointer to a structure for a control used in a dialog box.
    PR_CONTROL_STRUCTURE: {id: 0x3F01, type: PropertyType.PT_BINARY},
    // Contains a value indicating a control type for a control used in a dialog box.
    PR_CONTROL_TYPE: {id: 0x3F02, type: PropertyType.PT_LONG},
    // Contains the width of a dialog box control in standard Windows dialog units.
    PR_DELTAX: {id: 0x3F03, type: PropertyType.PT_LONG},
    // Contains the height of a dialog box control in standard Windows dialog units.
    PR_DELTAY: {id: 0x3F04, type: PropertyType.PT_LONG},
    // Contains the x coordinate of the starting position (the upper-left corner) of a dialog box control, in standard
    // Windows dialog units.
    PR_XPOS: {id: 0x3F05, type: PropertyType.PT_LONG},
    // Contains the y coordinate of the starting position (the upper-left corner) of a dialog box control, in standard
    // Windows dialog units.
    PR_YPOS: {id: 0x3F06, type: PropertyType.PT_LONG},
    // Contains a unique identifier for a control used in a dialog box.
    PR_CONTROL_ID: {id: 0x3F07, type: PropertyType.PT_BINARY},
    // Indicates the page of a display template to display first.
    PR_INITIAL_DETAILS_PANE: {id: 0x3F08, type: PropertyType.PT_LONG},
    // Contains the Windows LCID of the end user who created this message.
    PR_MESSAGE_LOCALE_ID: {id: 0x3F08, type: PropertyType.PT_LONG},
    // Indicates the code page used for <see cref="PropertyTags.PR_BODY_W" /> (PidTagBody) or
    // <see cref="PropertyTags.PR_HTML" /> (PidTagBodyHtml) properties.
    PR_INTERNET_CPID: {id: 0x3FDE, type: PropertyType.PT_LONG},
    // The creators address type
    PR_CreatorAddrType_W: {id: 0x4022, type: PropertyType.PT_UNICODE},
    // The creators e-mail address
    PR_CreatorEmailAddr_W: {id: 0x4023, type: PropertyType.PT_UNICODE},
    // The creators display name
    PR_CreatorSimpleDispName_W: {id: 0x4038, type: PropertyType.PT_UNICODE},
    // The senders display name
    PR_SenderSimpleDispName_W: {id: 0x4030, type: PropertyType.PT_UNICODE},
    // Indicates the type of Message object to which this attachment is linked.
    // Must be 0, unless overridden by other protocols that extend the
    // Message and Attachment Object Protocol as noted in [MS-OXCMSG].
    PR_ATTACHMENT_LINKID: {id: 0x7FFA, type: PropertyType.PT_LONG},
    // Indicates special handling for this Attachment object.
    // Must be 0x00000000, unless overridden by other protocols that extend the Message
    // and Attachment Object Protocol as noted in [MS-OXCMSG]
    PR_ATTACHMENT_FLAGS: {id: 0x7FFD, type: PropertyType.PT_LONG},
    // Indicates whether an attachment is hidden from the end user.
    PR_ATTACHMENT_HIDDEN: {id: 0x7FFE, type: PropertyType.PT_BOOLEAN},
    // Specifies the format for an editor to use to display a message.
    // By default, mail messages (with the message class IPM.Note or with a custom message
    // class derived from IPM.Note) sent from a POP3/SMTP mail account are sent in the Transport
    // Neutral Encapsulation Format (TNEF). The PR_MSG_EDITOR_FORMAT property can be used to enforce
    // only plain text, and not TNEF, when sending a message. If PR_MSG_EDITOR_FORMAT is set to
    // EDITOR_FORMAT_PLAINTEXT, the message is sent as plain text without TNEF. If PR_MSG_EDITOR_FORMAT
    // is set to EDITOR_FORMAT_RTF, TNEF encoding is implicitly enabled, and the message is sent by using
    // the default Internet format that is specified in the Outlook client.
    PR_MSG_EDITOR_FORMAT: {id: 0x5909, type: PropertyType.PT_LONG},
})
export type PropertyTagsEnum = $Values<typeof PropertyTags>
