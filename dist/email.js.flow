// @flow
import {Message} from './message'
import {Recipients} from "./address/recipients"
import type {AttachmentTypeEnum, MessageEditorFormatEnum, MessageImportanceEnum, MessagePriorityEnum} from "./enums"
import {
	AttachmentType,
	MapiAccess,
	MapiObjectType,
	MessageClass,
	MessageEditorFormat, MessageFlags,
	MessageIconIndex,
	MessageImportance, MessagePriority, PropertyFlag,
	RecipientType, StoreSupportMaskConst
} from "./enums"
import {Receiving} from "./address/receiving"
import {isNullOrEmpty, isNullOrWhiteSpace, localeId, stringToUtf8Array} from "./utils/utils"
import {PropertyTags} from "./property_tags"
import type {MessageHeader} from "./mime/header/message_header"
import {Sender} from "./address/sender"
import {Representing} from "./address/representing"
import {Attachments} from "./attachments"
import {ReceivingRepresenting} from "./address/receiving_representing"
import {generateEntryId, generateInstanceKey} from "./utils/mapi"
import {Strings} from "./helpers/strings"
import {ReportTag} from "./structures/report_tag"
import {compress} from "./helpers/rtf_compressor"
import {dateToFileTime} from "./utils/time";
import {Attachment} from "./attachment";

// \D => not digit
const subjectPrefixRegex = /^(\D{1,3}:\s)(.*)$/

export type Recipient = { address: string, name?: string }

export class Email extends Message {
	recipients: Recipients
	replyToRecipients: Recipients
	attachments: Attachments
	_subject: string = ""
	_sender: Sender
	_representing: Representing
	_receiving: Receiving
	_receivingRepresenting: ReceivingRepresenting
	subjectPrefix: string
	_subjectNormalized: string
	priority: MessagePriorityEnum
	importance: MessageImportanceEnum
	_bodyText: string
	_bodyHtml: string
	_bodyRtf: string
	bodyRtfCompressed: boolean
	_sentOn: ?Date
	_receivedOn: ?Date // was: DateTime
	// Corresponds to the message ID field as specified in [RFC2822].
	// If set then this value will be used, when not set the value will be read from the
	// TransportMessageHeaders when this property is set
	internetMessageId: string
	internetReferences: string
	inReplyToId: string
	transportMessageHeadersText: ?string
	transportMessageHeaders: ?MessageHeader
	draft: boolean
	readReceipt: boolean
	messageEditorFormat: MessageEditorFormatEnum

	constructor(draft: boolean = false, readReceipt: boolean = false) {
		super()
		this.recipients = new Recipients()
		this.replyToRecipients = new Recipients()
		this.attachments = new Attachments()
		this.priority = MessagePriority.PRIO_NONURGENT
		this.importance = MessageImportance.IMPORTANCE_NORMAL
		this.iconIndex = MessageIconIndex.NewMail
		this.draft = draft
		this.readReceipt = readReceipt
		this._bodyHtml = ""
		this._bodyText = ""
		this._sentOn = null
		this._receivedOn = null

	}

	sender(address: string, displayName?: string): Email {
		this._sender = new Sender(address, displayName || "")
		return this
	}

	bodyHtml(html: string): Email {
		this._bodyHtml = html
		return this
	}

	bodyText(txt: string): Email {
		this._bodyText = txt
		return this
	}

	bodyFormat(fmt: MessageEditorFormatEnum): Email {
		this.messageEditorFormat = fmt
		return this
	}

	subject(subject: string): Email {
		this._subject = subject
		this._setSubject()
		return this
	}

	to(address: string, displayName?: string,): Email {
		this.recipients.addTo(address, displayName)
		return this
	}

	cc(address: string, displayName?: string): Email {
		this.recipients.addCc(address, displayName)
		return this
	}

	bcc(address: string, displayName?: string): Email {
		this.recipients.addBcc(address, displayName)
		return this
	}

	replyTo(address: string, displayName?: string): Email {
		this.replyToRecipients.addTo(address, displayName)
		return this
	}

	tos(recipients: Array<Recipient>): Email {
		recipients.forEach(r => this.to(r.address, r.name))
		return this
	}

	ccs(recipients: Array<Recipient>): Email {
		recipients.forEach(r => this.cc(r.address, r.name))
		return this
	}

	bccs(recipients: Array<Recipient>): Email {
		recipients.forEach(r => this.bcc(r.address, r.name))
		return this
	}

	replyTos(recipients: Array<Recipient>): Email {
		recipients.forEach(r => this.replyTo(r.address, r.name))
		return this
	}

	sentOn(when: ?Date): Email {
		this._sentOn = when
		return this
	}

	receivedOn(when: ?Date): Email {
		this._receivedOn = when
		return this
	}

	attach(attachment: Attachment): Email {
		this.attachments.attach(attachment)
		return this
	}

	/**
	 * the raw transport headers
	 * @param headers
	 */
	headers(headers: string): Email {
		this.transportMessageHeadersText = headers

		// TODO: parse the headers into a MessageHeader, if we think we need to
		// this.transportMessageHeaders = new MessageHeader(parseMessageHeaders(headers))

		return this
	}

	msg(): Uint8Array {
		this._writeToStorage()
		return super.saveToBuffer()
	}

	_setSubject() {
		if (!isNullOrEmpty(this.subjectPrefix)) {
			if (this._subject.startsWith(this.subjectPrefix)) {
				this._subjectNormalized = this._subject.slice(this.subjectPrefix.length)
			} else {
				const match = this._subject.match(subjectPrefixRegex)
				if (match != null) {
					this.subjectPrefix = match[1]
					this._subjectNormalized = match[2]
				}

			}
		} else if (!isNullOrEmpty(this._subject)) {
			this._subjectNormalized = this._subject
			const match = this._subject.match(subjectPrefixRegex)
			if (match != null) {
				this.subjectPrefix = match[1]
				this._subjectNormalized = match[2]
			}
		} else {
			this._subjectNormalized = this._subject
		}
		if (!this.subjectPrefix) this.subjectPrefix = ""
	}

	/**
	 * write to the cfb of the underlying message
	 */
	_writeToStorage(): void {
		const rootStorage = this._storage

		if (this._messageClass === MessageClass.Unknown) this._messageClass = MessageClass.IPM_Note
		this._messageSize += this.recipients.writeToStorage(rootStorage)
		this._messageSize += this.attachments.writeToStorage(rootStorage)

		const recipientCount = this.recipients.length
		const attachmentCount = this.attachments.length
		this._topLevelProperties.recipientCount = recipientCount
		this._topLevelProperties.attachmentCount = attachmentCount
		this._topLevelProperties.nextRecipientId = recipientCount
		this._topLevelProperties.nextAttachmentId = attachmentCount

		this._topLevelProperties.addProperty(PropertyTags.PR_ENTRYID, generateEntryId())
		this._topLevelProperties.addProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey())
		this._topLevelProperties.addProperty(PropertyTags.PR_STORE_SUPPORT_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE)
		this._topLevelProperties.addProperty(PropertyTags.PR_STORE_UNICODE_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE)
		this._topLevelProperties.addProperty(PropertyTags.PR_ALTERNATE_RECIPIENT_ALLOWED, true, PropertyFlag.PROPATTR_READABLE)
		this._topLevelProperties.addProperty(PropertyTags.PR_HASATTACH, attachmentCount > 0)


		if (this.transportMessageHeadersText) {
			this._topLevelProperties.addProperty(PropertyTags.PR_TRANSPORT_MESSAGE_HEADERS_W, this.transportMessageHeadersText)
		}

		const transportHeaders = this.transportMessageHeaders
		if (transportHeaders) {

			if (!isNullOrWhiteSpace(transportHeaders.messageId)) {
				this._topLevelProperties.addProperty(PropertyTags.PR_INTERNET_MESSAGE_ID_W, transportHeaders.messageId)
			}

			const refCount = transportHeaders.references.length
			if (refCount > 0) {
				this._topLevelProperties.addProperty(PropertyTags.PR_INTERNET_REFERENCES_W, transportHeaders.references[refCount
				- 1])
			}

			const replCount = transportHeaders.inReplyTo.length
			if (replCount > 0) {
				this._topLevelProperties.addProperty(PropertyTags.PR_IN_REPLY_TO_ID_W, transportHeaders.inReplyTo[replCount
				- 1])
			}
		}

		if (!isNullOrWhiteSpace(this.internetMessageId)) {
			this._topLevelProperties.addOrReplaceProperty(PropertyTags.PR_INTERNET_MESSAGE_ID_W, this.internetMessageId)
		}

		if (!isNullOrWhiteSpace(this.internetReferences)) {
			this._topLevelProperties.addOrReplaceProperty(PropertyTags.PR_INTERNET_REFERENCES_W, this.internetReferences)
		}

		if (!isNullOrWhiteSpace(this.inReplyToId)) {
			this._topLevelProperties.addOrReplaceProperty(PropertyTags.PR_IN_REPLY_TO_ID_W, this.inReplyToId)
		}

		let messageFlags = MessageFlags.MSGFLAG_UNMODIFIED

		if (attachmentCount > 0) messageFlags |= MessageFlags.MSGFLAG_HASATTACH

		// int Encoding.UTF8.CodePage == 65001
		this._topLevelProperties.addProperty(PropertyTags.PR_INTERNET_CPID, 65001)

		this._topLevelProperties.addProperty(PropertyTags.PR_BODY_W, this._bodyText)

		if (!isNullOrEmpty(this._bodyHtml) && !this.draft) {
			this._topLevelProperties.addProperty(PropertyTags.PR_HTML, this._bodyHtml)
			this._topLevelProperties.addProperty(PropertyTags.PR_RTF_IN_SYNC, false)
		} else if (isNullOrWhiteSpace(this._bodyRtf) && !isNullOrWhiteSpace(this._bodyHtml)) {
			this._bodyRtf = Strings.escapeRtf(this._bodyHtml)
			this.bodyRtfCompressed = true
		}

		if (!isNullOrWhiteSpace(this._bodyRtf)) {
			this._topLevelProperties.addProperty(PropertyTags.PR_RTF_COMPRESSED, compress(stringToUtf8Array(this._bodyRtf)))
			this._topLevelProperties.addProperty(PropertyTags.PR_RTF_IN_SYNC, this.bodyRtfCompressed)
		}

		if (this.messageEditorFormat !== MessageEditorFormat.EDITOR_FORMAT_DONTKNOW) {
			this._topLevelProperties.addProperty(PropertyTags.PR_MSG_EDITOR_FORMAT, this.messageEditorFormat)
		}

		if (this._sentOn == null) this._sentOn = new Date()

		if (this._receivedOn != null) {
			this._topLevelProperties.addDateProperty(PropertyTags.PR_MESSAGE_DELIVERY_TIME, this._receivedOn)
		}

		// was SentOn.Value.ToUniversalTime()
		this._topLevelProperties.addDateProperty(PropertyTags.PR_CLIENT_SUBMIT_TIME, this._sentOn)
		this._topLevelProperties.addProperty(PropertyTags.PR_ACCESS, MapiAccess.MAPI_ACCESS_DELETE | MapiAccess.MAPI_ACCESS_MODIFY
			| MapiAccess.MAPI_ACCESS_READ)
		this._topLevelProperties.addProperty(PropertyTags.PR_ACCESS_LEVEL, MapiAccess.MAPI_ACCESS_MODIFY)
		this._topLevelProperties.addProperty(PropertyTags.PR_OBJECT_TYPE, MapiObjectType.MAPI_MESSAGE)

		this._setSubject()
		this._topLevelProperties.addProperty(PropertyTags.PR_SUBJECT_W, this._subject)
		this._topLevelProperties.addProperty(PropertyTags.PR_NORMALIZED_SUBJECT_W, this._subjectNormalized)
		this._topLevelProperties.addProperty(PropertyTags.PR_SUBJECT_PREFIX_W, this.subjectPrefix)
		this._topLevelProperties.addProperty(PropertyTags.PR_CONVERSATION_TOPIC_W, this._subjectNormalized)

		// http://www.meridiandiscovery.com/how-to/e-mail-conversation-index-metadata-computer-forensics/
		// http://stackoverflow.com/questions/11860540/does-outlook-embed-a-messageid-or-equivalent-in-its-email-elements
		// propertiesStream.AddProperty(PropertyTags.PR_CONVERSATION_INDEX, Subject)

		// TODO: Change modification time when this message is opened and only modified
		const utcNow = new Date()
		this._topLevelProperties.addDateProperty(PropertyTags.PR_CREATION_TIME, utcNow)
		this._topLevelProperties.addDateProperty(PropertyTags.PR_LAST_MODIFICATION_TIME, utcNow)
		this._topLevelProperties.addProperty(PropertyTags.PR_PRIORITY, this.priority)
		this._topLevelProperties.addProperty(PropertyTags.PR_IMPORTANCE, this.importance)
		// was CultureInfo.CurrentCulture.LCID
		this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_LOCALE_ID, localeId())

		if (this.draft) {
			messageFlags |= MessageFlags.MSGFLAG_UNSENT
			this.iconIndex = MessageIconIndex.UnsentMail
		}

		if (this.readReceipt) {
			this._topLevelProperties.addProperty(PropertyTags.PR_READ_RECEIPT_REQUESTED, true)
			const reportTag = new ReportTag(this._subject)
			this._topLevelProperties.addProperty(PropertyTags.PR_REPORT_TAG, reportTag.toByteArray())

		}

		this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_FLAGS, messageFlags)
		this._topLevelProperties.addProperty(PropertyTags.PR_ICON_INDEX, this.iconIndex)

		if (!!this._sender) this._sender.writeProperties(this._topLevelProperties)
		if (!!this._receiving) this._receiving.writeProperties(this._topLevelProperties)
		if (!!this._receivingRepresenting) this._receivingRepresenting.writeProperties(this._topLevelProperties)
		if (!!this._representing) this._representing.writeProperties(this._topLevelProperties)

		if (recipientCount > 0) {
			const displayTo = []
			const displayCc = []
			const displayBcc = []

			for (const recipient of this.recipients) {
				switch (recipient.recipientType) {
					case RecipientType.To:
						if (!isNullOrWhiteSpace(recipient.displayName)) {
							displayTo.push(recipient.displayName)
						} else if (!isNullOrWhiteSpace(recipient.email)) {
							displayTo.push(recipient.email)
						}
						break

					case RecipientType.Cc:
						if (!isNullOrWhiteSpace(recipient.displayName)) {
							displayCc.push(recipient.displayName)
						} else if (!isNullOrWhiteSpace(recipient.email)) {
							displayCc.push(recipient.email)
						}
						break

					case RecipientType.Bcc:
						if (!isNullOrWhiteSpace(recipient.displayName)) {
							displayBcc.push(recipient.displayName)
						} else if (!isNullOrWhiteSpace(recipient.email)) {
							displayBcc.push(recipient.email)
						}
						break

					default:
						throw new Error('RecipientType out of Range: ' + recipient.recipientType)
				}
			}

			const replyToRecipients = []

			for (const recipient of this.replyToRecipients) {
				replyToRecipients.push(recipient.email)
			}

			this._topLevelProperties.addProperty(PropertyTags.PR_DISPLAY_TO_W, displayTo.join(';'), PropertyFlag.PROPATTR_READABLE)
			this._topLevelProperties.addProperty(PropertyTags.PR_DISPLAY_CC_W, displayCc.join(';'), PropertyFlag.PROPATTR_READABLE)
			this._topLevelProperties.addProperty(PropertyTags.PR_DISPLAY_BCC_W, displayBcc.join(';'), PropertyFlag.PROPATTR_READABLE)
			this._topLevelProperties.addProperty(PropertyTags.PR_REPLY_RECIPIENT_NAMES_W, replyToRecipients.join(';'), PropertyFlag.PROPATTR_READABLE)
		}
	}
}