// @flow
import {byteBufferAsUint8Array, makeByteBuffer} from "../utils/utils";

/**
 * The PidTagReportTag property ([MS-OXPROPS] section 2.917) contains the data that is used to correlate the report
 * and the original message. The property can be absent if the sender does not request a reply or response to the
 * original e-mail message. If the original E-mail object has either the PidTagResponseRequested property (section
 * 2.2.1.46) set to 0x01 or the PidTagReplyRequested property (section 2.2.1.45) set to 0x01, then the property is set
 * on the original E-mail object by using the following format.
 * See https://msdn.microsoft.com/en-us/library/ee160822(v=exchg.80).aspx
 */
export class ReportTag {
    // (9 bytes): A null-terminated string of nine characters used for validation; set to "PCDFEB09".
    cookie: string = "PCDFEB09\0"

    // (4 bytes): This field specifies the version. If the SearchFolderEntryId field is present, this field MUST be set to
    // 0x00020001; otherwise, this field MUST be set to 0x00010001.
    version: number = 0x00010001

    // (4 bytes): Size of the StoreEntryId field.
    storeEntryIdSize: number = 0x00000000

    // (Variable length of bytes): This field specifies the entry ID of the mailbox that contains the original message. If
    // the value of the
    // StoreEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, this field is filled with
    // the number of bytes specified by the StoreEntryIdSize field.
    storeEntryId: Uint8Array

    // (4 bytes): Size of the FolderEntryId field.
    folderEntryIdSize: number = 0x00000000

    // (Variable): This field specifies the entry ID of the folder that contains the original message. If the value of the
    // FolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the field is filled with
    // the number of bytes specified by the FolderEntryIdSize field.
    folderEntryId: number = 0

    // (4 bytes): Size of the MessageEntryId field.
    messageEntryIdSize: number = 0x00000000

    // (Variable): This field specifies the entry ID of the original message. If the value of the MessageEntryIdSize field
    // is 0x00000000, this field is omitted. If the value is not zero, the field is filled with the number of bytes
    // specified by the MessageEntryIdSize field.
    messageEntryId: number = 0

    // (4 bytes): Size of the SearchFolderEntryId field.
    searchFolderEntryIdSize: number = 0x00000000

    // (Variable): This field specifies the entry ID of an alternate folder that contains the original message. If the
    // value of the SearchFolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the
    // field is filled with the number of bytes specified by the SearchFolderEntryIdSize field.
    searchFolderEntryId: Uint8Array

    // (4 bytes): Size of the MessageSearchKey field.
    messageSearchKeySize: number = 0x00000000

    // (variable): This field specifies the search key of the original message. If the value of the MessageSearchKeySize
    // field is 0x00000000, this field is omitted. If the value is not zero, the MessageSearchKey field is filled with the
    // number of bytes specified by the MessageSearchKeySize field.
    messageSearchKey: Uint8Array

    // (4 bytes): Number of characters in the ANSI Text field.
    ansiTextSize: number = this.ansiText.length

    // (Variable): The subject of the original message. If the value of the ANSITextSize field is 0x00000000, this field
    // is omitted. If the value is not zero, the field is filled with the number of bytes specified by the ANSITextSize
    // field.
    ansiText: string

    constructor(ansiText: string) {
        this.ansiText = ansiText
    }

    /**
     * Returns this object as a byte array
     */
    toByteArray(): Uint8Array {
        const buf = makeByteBuffer()
        // Cookie (9 bytes): A null-terminated string of nine characters used for validation; set to "PCDFEB09".
        // TODO:
        buf.writeUTF8String(this.cookie)

        // Version (4 bytes): This field specifies the version. If the SearchFolderEntryId field is present,
        // this field MUST be set to 0x00020001; otherwise, this field MUST be set to 0x00010001.
        buf.writeUint32(this.version)

        // (4 bytes): Size of the StoreEntryId field.
        buf.writeUint32(this.storeEntryIdSize)

        // (Variable length of bytes): This field specifies the entry ID of the mailbox that contains the original message. If
        // the value of the StoreEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, this field
        // is filled with the number of bytes specified by the StoreEntryIdSize field.
        //buf.append(this.storeEntryId);

        // (4 bytes): Size of the FolderEntryId field.
        buf.writeUint32(this.folderEntryIdSize)

        // (Variable): This field specifies the entry ID of the folder that contains the original message. If the value of the
        // FolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the field is filled with
        // the number of bytes specified by the FolderEntryIdSize field.
        //buf.append(this.folderEntryId)

        // (4 bytes): Size of the MessageEntryId field.
        buf.writeUint32(this.messageEntryIdSize)

        // (Variable): This field specifies the entry ID of the original message. If the value of the MessageEntryIdSize field
        // is 0x00000000, this field is omitted. If the value is not zero, the field is filled with the number of bytes
        // specified by the MessageEntryIdSize field.
        //buf.append(this.messageEntryId)

        // (4 bytes): Size of the SearchFolderEntryId field.
        buf.writeUint32(this.searchFolderEntryIdSize)

        // (Variable): This field specifies the entry ID of an alternate folder that contains the original message. If the
        // value of the SearchFolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the
        // field is filled with the number of bytes specified by the SearchFolderEntryIdSize field.
        //buf.append(this.searchFolderEntryId)

        // (4 bytes): Size of the MessageSearchKey field.
        buf.writeUint32(this.messageSearchKeySize)

        // (variable): This field specifies the search key of the original message. If the value of the MessageSearchKeySize
        // field is 0x00000000, this field is omitted. If the value is not zero, the MessageSearchKey field is filled with the
        // number of bytes specified by the MessageSearchKeySize field.
        //buf.append(this.messageSearchKey)

        // (4 bytes): Number of characters in the ANSI Text field.
        buf.writeUint32(this.ansiTextSize)

        // (Variable): The subject of the original message. If the value of the ANSITextSize field is 0x00000000, this field
        // is omitted. If the value is not zero, the field is filled with the number of bytes specified by the ANSITextSize
        // field.
        buf.writeUTF8String(this.ansiText)

        return byteBufferAsUint8Array(buf)
    }
}