import {Address} from "./address"
import type {AddressType} from "../enums"
import {MessageFormat} from "../enums"
import {byteBufferAsUint8Array, makeByteBuffer, stringToUtf16LeArray} from "../utils/utils"
export class OneOffEntryId extends Address {
    _messageFormat: MessageFormat
    _canLookupEmailAddress: boolean

    constructor(
        email: string,
        displayName: string,
        addressType: AddressType = "SMTP",
        messageFormat: MessageFormat = MessageFormat.TextAndHtml,
        canLookupEmailAddress: boolean = false,
    ) {
        super(email, displayName, addressType)
        this._messageFormat = messageFormat
        this._canLookupEmailAddress = canLookupEmailAddress
    }

    toByteArray(): Uint8Array {
        const buf = makeByteBuffer()
        // Flags (4 bytes): This value is set to 0x00000000. Bits in this field indicate under what circumstances
        // a short-term EntryID is valid. However, in any EntryID stored in a property value, these 4 bytes are
        // zero, indicating a long-term EntryID.
        buf.writeUint32(0)
        // ProviderUID (16 bytes): The identifier of the provider that created the EntryID. This value is used to
        // route EntryIDs to the correct provider and MUST be set to %x81.2B.1F.A4.BE.A3.10.19.9D.6E.00.DD.01.0F.54.02.
        buf.append(Uint8Array.from([0x81, 0x2b, 0x1f, 0xa4, 0xbe, 0xa3, 0x10, 0x19, 0x9d, 0x6e, 0x00, 0xdd, 0x01, 0x0f, 0x54, 0x02]))
        // Version (2 bytes): This value is set to 0x0000.
        buf.writeUint16(0)
        let bits = 0x0000

        // Pad(1 bit): (mask 0x8000) Reserved.This value is set to '0'.
        // bits |= 0x00 << 0
        // MAE (2 bits): (mask 0x0C00) The encoding used for Macintosh-specific data attachments, as specified in
        // [MS-OXCMAIL] section 2.1.3.4.3. The values for this field are specified in the following table.
        // Name        | Word value | Field value | Description
        // BinHex        0x0000       b'00'         BinHex encoded.
        // UUENCODE      0x0020       b'01'         UUENCODED.Not valid if the message is in Multipurpose Internet Mail
        //                                          Extensions(MIME) format, in which case the flag will be ignored and
        //                                          BinHex used instead.
        // AppleSingle   0x0040      b'10'          Apple Single encoded.Allowed only when the message format is MIME.
        // AppleDouble   0x0060      b'11'          Apple Double encoded.Allowed only when the message format is MIME.
        // bits |= 0x00 << 1
        // bits |= 0x00 << 2
        // Format (4 bits): (enumeration, mask 0x1E00) The message format desired for this recipient (1), as specified
        // in the following table.
        // Name        | Word value | Field value | Description
        // TextOnly      0x0006       b'0011'       Send a plain text message body.
        // HtmlOnly      0x000E       b'0111'       Send an HTML message body.
        // TextAndHtml   0x0016       b'1011'       Send a multipart / alternative body with both plain text and HTML.
        switch (this._messageFormat) {
            case MessageFormat.TextOnly:
                //bits |= 0x00 << 3
                //bits |= 0x00 << 4
                bits |= 0x01 << 5
                bits |= 0x01 << 6
                break

            case MessageFormat.HtmlOnly:
                //bits |= 0x00 << 3
                bits |= 0x01 << 4
                bits |= 0x01 << 5
                bits |= 0x01 << 6
                break

            case MessageFormat.TextAndHtml:
                bits |= 0x01 << 3
                //bits |= 0x00 << 4
                bits |= 0x01 << 5
                bits |= 0x01 << 6
                break
        }

        // M (1 bit): (mask 0x0100) A flag that indicates how messages are to be sent. If b'0', indicates messages are
        // to be sent to the recipient (1) in Transport Neutral Encapsulation Format (TNEF) format; if b'1', messages
        // are sent to the recipient (1) in pure MIME format.
        bits |= 0x01 << 7
        // U (1 bit): (mask 0x0080) A flag that indicates the format of the string fields that follow. If b'1', the
        // string fields following are in Unicode (UTF-16 form) with 2-byte terminating null characters; if b'0', the
        // string fields following are multibyte character set (MBCS) characters terminated by a single 0 byte.
        bits |= 0x01 << 8

        // R (2 bits): (mask 0x0060) Reserved. This value is set to b'00'.
        //bits |= 0x00 << 9
        //bits |= 0x00 << 10
        // L (1 bit): (mask 0x0010) A flag that indicates whether the server can look up an address in the address
        // book. If b'1', server cannot look up this user's email address in the address book. If b'0', server can
        // look up this user's email address in the address book.
        if (this._canLookupEmailAddress) {
            bits |= 0x01 << 11
        }

        // Pad (4 bits): (mask 0x000F) Reserved. This value is set to b'0000'.
        // bits |= 0x01 << 12
        // bits |= 0x01 << 13
        // bits |= 0x01 << 14
        // bits |= 0x01 << 15
        // if (BitConverter.IsLittleEndian) {
        //     bits = bits.Reverse().ToArray();
        //     binaryWriter.Write(bits);
        // } else {
        //     binaryWriter.Write(bits);
        // }
        buf.writeUint8((bits >>> 8) & 0xff)
        buf.writeUint8(bits & 0xff)
        //Strings.WriteNullTerminatedUnicodeString(binaryWriter, DisplayName);
        buf.append(stringToUtf16LeArray(this.displayName))
        buf.writeUint16(0)
        buf.append(stringToUtf16LeArray(this.addressType))
        buf.writeUint16(0)
        buf.append(stringToUtf16LeArray(this.email))
        buf.writeUint16(0)
        return byteBufferAsUint8Array(buf)
    }
}