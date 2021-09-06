// @flow
import {RfcMailAddress} from "./rfc_mail_address"
import {Received} from "./received"
import type {ContentTransferEncodingEnum, MailPriorityEnum} from "../../enums"
import {MailPriority} from "../../enums"
import {unquote} from "../../utils/utils"
import {decode as decodeRfc2047} from "./rfc2047"
import type {ContentDisposition, ContentType} from "./header_field_parser"
import {HeaderFieldParser} from "./header_field_parser"

type HeaderDict = {[string]: Array<string>}

// TODO
export function parseMessageHeaders(rawHeaders: string): HeaderDict {
	throw new Error("Message header parsing unsupported")
}

export class MessageHeader {
	/**    Contains all the headers as a map */
	raw: HeaderDict
	/// <summary>
	///     All headers which were not recognized and explicitly dealt with.<br />
	///     This should mostly be custom headers, which are marked as X-[name].<br />
	///     <br />
	///     This list will be empty if all headers were recognized and parsed.
	/// </summary>
	custom: HeaderDict
	/// <summary>
	///     A human readable description of the body<br />
	///     <br />
	///     <see langword="null" /> if no Content-Description header was present in the message.
	/// </summary>
	contentDescription: ?string
	/// <summary>
	///     ID of the content part (like an attached image). Used with MultiPart messages.<br />
	///     <br />
	///     <see langword="null" /> if no Content-ID header field was present in the message.
	/// </summary>
	/// <see cref="MessageId">For an ID of the message</see>
	contentId: ?string
	/// <summary>
	///     Message keywords<br />
	///     <br />
	///     The list will be empty if no Keywords header was present in the message
	/// </summary>
	keywords: Array<string>
	/// <summary>
	///     A List of emails to people who wishes to be notified when some event happens.<br />
	///     These events could be email:
	///     <list type="bullet">
	///         <item>deletion</item>
	///         <item>printing</item>
	///         <item>received</item>
	///         <item>...</item>
	///     </list>
	///     The list will be empty if no Disposition-Notification-To header was present in the message
	/// </summary>
	/// <remarks>See <a href="http://tools.ietf.org/html/rfc3798">RFC 3798</a> for details</remarks>
	dispositionNotificationTo: Array<RfcMailAddress>
	/// <summary>
	///     This is the Received headers. This tells the path that the email went.<br />
	///     <br />
	///     The list will be empty if no Received header was present in the message
	/// </summary>
	received: Array<Received>
	/// <summary>
	///     Importance of this email.<br />
	///     <br />
	///     The importance level is set to normal, if no Importance header field was mentioned or it contained
	///     unknown information. This is the expected behavior according to the RFC.
	/// </summary>
	importance: MailPriorityEnum

	/// <summary>
	///     This header describes the Content encoding during transfer.<br />
	///     <br />
	///     If no Content-Transfer-Encoding header was present in the message, it is set
	///     to the default of <see cref="Header.ContentTransferEncoding.SevenBit">SevenBit</see> in accordance to the RFC.
	/// </summary>
	/// <remarks>See <a href="http://tools.ietf.org/html/rfc2045#section-6">RFC 2045 section 6</a> for details</remarks>
	contentTransferEncoding: ContentTransferEncodingEnum
	/// <summary>
	///     Specifies who this mail was for<br />
	///     <br />
	///     The list will be empty if no To header was present in the message
	/// </summary>
	to: Array<RfcMailAddress>
	/// <summary>
	///     Carbon Copy. This specifies who got a copy of the message.<br />
	///     <br />
	///     The list will be empty if no Cc header was present in the message
	/// </summary>
	cc: Array<RfcMailAddress>
	/// <summary>
	///     Blind Carbon Copy. This specifies who got a copy of the message, but others
	///     cannot see who these persons are.<br />
	///     <br />
	///     The list will be empty if no Received Bcc was present in the message
	/// </summary>
	bcc: Array<RfcMailAddress>
	/// <summary>
	///     Specifies who sent the email<br />
	///     <br />
	///     <see langword="null" /> if no From header field was present in the message
	/// </summary>
	from: RfcMailAddress
	/// <summary>
	///     Specifies who a reply to the message should be sent to<br />
	///     <br />
	///     <see langword="null" /> if no Reply-To header field was present in the message
	/// </summary>
	replyTo: RfcMailAddress
	/// <summary>
	///     The message identifier(s) of the original message(s) to which the
	///     current message is a reply.<br />
	///     <br />
	///     The list will be empty if no In-Reply-To header was present in the message
	/// </summary>
	inReplyTo: Array<string>
	/// <summary>
	///     The message identifier(s) of other message(s) to which the current
	///     message is related to.<br />
	///     <br />
	///     The list will be empty if no References header was present in the message
	/// </summary>
	references: Array<string>
	/// <summary>
	///     This is the sender of the email address.<br />
	///     <br />
	///     <see langword="null" /> if no Sender header field was present in the message
	/// </summary>
	/// <remarks>
	///     The RFC states that this field can be used if a secretary
	///     is sending an email for someone she is working for.
	///     The email here will then be the secretary's email, and
	///     the Reply-To field would hold the address of the person she works for.<br />
	///     RFC states that if the Sender is the same as the From field,
	///     sender should not be included in the message.
	/// </remarks>
	sender: RfcMailAddress
	/// <summary>
	///     The Content-Type header field.<br />
	///     <br />
	///     If not set, the ContentType is created by the default "text/plain; charset=us-ascii" which is
	///     defined in <a href="http://tools.ietf.org/html/rfc2045#section-5.2">RFC 2045 section 5.2</a>.<br />
	///     If set, the default is overridden.
	/// </summary>
	contentType: ContentType
	/// <summary>
	///     Used to describe if a message part is to be displayed or to be though of as an attachment.<br />
	///     Also contains information about filename if such was sent.<br />
	///     <br />
	///     <see langword="null" /> if no Content-Disposition header field was present in the message
	/// </summary>
	contentDisposition: ContentDisposition

	/// <summary>
	///     The Date when the email was sent.<br />
	///     This is the raw value. <see cref="DateSent" /> for a parsed up <see cref="DateTime" /> value of this field.<br />
	///     <br />
	///     <see langword="DateTime.MinValue" /> if no Date header field was present in the message or if the date could not be
	///     parsed.
	/// </summary>
	/// <remarks>See <a href="http://tools.ietf.org/html/rfc5322#section-3.6.1">RFC 5322 section 3.6.1</a> for more details</remarks>
	date: string

	/// <summary>
	///     The Date when the email was sent.<br />
	///     This is the parsed equivalent of <see cref="Date" />.<br />
	///     Notice that the <see cref="TimeZone" /> of the <see cref="DateTime" /> object is in UTC and has NOT been converted
	///     to local <see cref="TimeZone" />.
	/// </summary>
	/// <remarks>See <a href="http://tools.ietf.org/html/rfc5322#section-3.6.1">RFC 5322 section 3.6.1</a> for more details</remarks>
	dateSent: number

	/// <summary>
	///     An ID of the message that is SUPPOSED to be in every message according to the RFC.<br />
	///     The ID is unique.<br />
	///     <br />
	///     <see langword="null" /> if no Message-ID header field was present in the message
	/// </summary>
	messageId: string;

	/// <summary>
	///     The Mime Version.<br />
	///     This field will almost always show 1.0<br />
	///     <br />
	///     <see langword="null" /> if no Mime-Version header field was present in the message
	/// </summary>
	mimeVersion: string

	/// <summary>
	///     A single <see cref="RfcMailAddress" /> with no username inside.<br />
	///     This is a trace header field, that should be in all messages.<br />
	///     Replies should be sent to this address.<br />
	///     <br />
	///     <see langword="null" /> if no Return-Path header field was present in the message
	/// </summary>
	returnPath: RfcMailAddress

	/// <summary>
	///     The subject line of the message in decoded, one line state.<br />
	///     This should be in all messages.<br />
	///     <br />
	///     <see langword="null" /> if no Subject header field was present in the message
	/// </summary>
	subject: string

	_clear(): void {
		this.raw = {}
		this.custom = {}
		this.keywords = []
		this.dispositionNotificationTo = []
		this.received = []
		this.importance = MailPriority.Normal
		this.contentTransferEncoding = "7bit"
		this.to = []
		this.cc = []
		this.bcc = []
		this.inReplyTo = []
		this.references = []
	}

	constructor(rawHeaders: HeaderDict) {
		if (rawHeaders == null) throw new Error("rawHeaders must not be null!")
		this._clear()
		this.raw = rawHeaders
		this._parseHeaders(rawHeaders)
	}

	_parseHeaders(raw: HeaderDict): void {
		if (raw == null) throw new Error("raw must not be null!")
		for (let name of Object.keys(raw)) {
			const values = raw[name]
			for (let value of values) {
				if (value == null) continue
				this._parseHeader(name, value)
			}
		}
	}

	_parseHeader(name: string, value: string) {
		if (name == null) throw new Error("name must not be null!")
		if (value == null) throw new Error("value must not be null!")

		switch (name.toUpperCase()) {       // See http://tools.ietf.org/html/rfc5322#section-3.6.3
			case "TO":
				this.to = RfcMailAddress.parseMailAddresses(value)
				break
			// See http://tools.ietf.org/html/rfc5322#section-3.6.3
			case "CC":
				this.cc = RfcMailAddress.parseMailAddresses(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.3
			case "BCC":
				this.bcc = RfcMailAddress.parseMailAddresses(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.2
			case "FROM":
				// There is only one MailAddress in the from field
				this.from = RfcMailAddress.parseMailAddress(value)
				break

			// http://tools.ietf.org/html/rfc5322#section-3.6.2
			// The implementation here might be wrong
			case "REPLY-TO":
				// This field may actually be a list of addresses, but no
				// such case has been encountered
				this.replyTo = RfcMailAddress.parseMailAddress(value)
				break

			// http://tools.ietf.org/html/rfc5322#section-3.6.2
			case "SENDER":
				this.sender = RfcMailAddress.parseMailAddress(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.5
			// RFC 5322:
			// The "Keywords:" field contains a comma-separated list of one or more
			// words or quoted-strings.
			// The field are intended to have only human-readable content
			// with information about the message
			case "KEYWORDS":
				this.keywords.concat(value.split(',')
				                          .map(String.prototype.trim.apply)
				                          .map(unquote))
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.7
			case "RECEIVED":
				// Simply add the value to the list
				this.received.push(new Received(value.trim()))
				break

			case "IMPORTANCE":
				// TODO:
				this.importance = HeaderFieldParser.parseImportance(value.trim())
				break

			// See http://tools.ietf.org/html/rfc3798#section-2.1
			case "DISPOSITION-NOTIFICATION-TO":
				this.dispositionNotificationTo = RfcMailAddress.parseMailAddresses(value)
				break

			case "MIME-VERSION":
				this.mimeVersion = value.trim()
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.5
			case "SUBJECT":
				this.subject = decodeRfc2047(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.7
			case "RETURN-PATH":
				// Return-paths does not include a username, but we
				// may still use the address parser
				this.returnPath = RfcMailAddress.parseMailAddress(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.4
			// Example Message-ID
			// <33cdd74d6b89ab2250ecd75b40a41405@nfs.eksperten.dk>
			case "MESSAGE-ID":
				// TODO:
				this.messageId = HeaderFieldParser.parseId(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.4
			case "IN-REPLY-TO":
				this.inReplyTo = HeaderFieldParser.parseMultipleIds(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.4
			case "REFERENCES":
				this.references = HeaderFieldParser.parseMultipleIds(value)
				break

			// See http://tools.ietf.org/html/rfc5322#section-3.6.1))
			case "DATE":
				this.date = value.trim()
				this.dateSent = Date.parse(this.date)
				break

			// See http://tools.ietf.org/html/rfc2045#section-6
			// See ContentTransferEncoding class for more details
			case "CONTENT-TRANSFER-ENCODING":
				// TODO:
				this.contentTransferEncoding = HeaderFieldParser.parseContentTransferEncoding(value.trim())
				break

			// See http://tools.ietf.org/html/rfc2045#section-8
			case "CONTENT-DESCRIPTION":
				// Human description of for example a file. Can be encoded
				this.contentDescription = decodeRfc2047(value.trim())
				break

			// See http://tools.ietf.org/html/rfc2045#section-5.1
			// Example: Content-type: text/plain; charset="us-ascii"
			case "CONTENT-TYPE":
				// tODO
				this.contentType = HeaderFieldParser.parseContentType(value)
				break

			// See http://tools.ietf.org/html/rfc2183
			case "CONTENT-DISPOSITION":
				// TODO
				this.contentDisposition = HeaderFieldParser.parseContentDisposition(value)
				break

			// See http://tools.ietf.org/html/rfc2045#section-7
			// Example: <foo4*foo1@bar.net>
			case "CONTENT-ID":
				// TODO
				this.contentId = HeaderFieldParser.parseId(value)
				break

			default:
				// This is an unknown header

				// Custom headers are allowed. That means headers
				// that are not mentioned in the RFC.
				// Such headers start with the letter "X"
				// We do not have any special parsing of such

				// Add it to custom headers
				if (this.custom[name] != null) {
					this.custom[name].push(value)
				} else {
					this.custom[name] = [value]
				}
				break

		}
	}
}