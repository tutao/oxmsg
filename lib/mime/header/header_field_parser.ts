import {ContentTransferEncoding, MailPriority} from "../../enums"
import {isNullOrEmpty, unquote} from "../../utils/utils"
import {decode as decodeRfc2047} from "./rfc2047"
import {SizeParser} from "../decode/size_parser"
import {Rfc2231Decoder} from "../decode/rfc2231decoder"

export type ContentType = {
    mediaType: string
    boundary: string
    charset: string
    name: string
    parameters: Record<string, string>
}

export type ContentDisposition = {
    dispositionType: string
    fileName: string
    creationDate: number
    modificationDate: number
    readDate: number
    size: number
    parameters: Record<string, string>
}

export class HeaderFieldParser {
    /**
     * Parses the Content-Transfer-Encoding header.
     * @param value {string} the value for the header to be parsed
     * @returns {string} a ContentTransferEncoding
     */
    static parseContentTransferEncoding(value: string): ContentTransferEncoding {
        if (value == null) throw new Error("value must not be null!")
        const normalized = value.trim().toLowerCase();
        return normalized in ContentTransferEncoding ? ContentTransferEncoding[normalized as keyof typeof ContentTransferEncoding] : ContentTransferEncoding.SevenBit
    }

    /**
     * Parses an ImportanceType from a given Importance header value.
     * @param value {string} the value to be parsed
     * @returns {number} a mail priority, defaulting to normal if value is not recognized
     */
    static parseImportance(value: string): MailPriority {
        if (value == null) throw new Error("value must not be null!")

        switch (value.toUpperCase()) {
            case "5":
            case "HIGH":
                return MailPriority.High

            case "3":
            case "NORMAL":
                return MailPriority.Normal

            case "1":
            case "LOW":
                return MailPriority.Low

            default:
                return MailPriority.Normal
        }
    }

    /**
     * parses the value for the content-type header into an object
     * @param value {string} the value to be parsed
     * @returns {ContentType}
     */
    static parseContentType(value: string): ContentType {
        if (value == null) throw new Error("value must not be null!")
        // We create an empty Content-Type which we will fill in when we see the value
        const contentType: ContentType = {
            mediaType: "",
            boundary: "",
            charset: "",
            name: "",
            parameters: {},
        }
        // Now decode the parameters
        const parameters = Rfc2231Decoder.decode(value)
        parameters.forEach(kvp => {
            let key = kvp.key.toUpperCase().trim()
            let value = unquote(kvp.value.trim())

            switch (key) {
                case "":
                    // This is the MediaType - it has no key since it is the first one mentioned in the
                    // headerValue and has no = in it.
                    // Check for illegal content-type
                    // const v = value.ToUpperCase().trim('\0')
                    const v = value
                        .toUpperCase()
                        .replace(/^[\x00]/, "")
                        .replace(/[\x00]$/, "")
                    contentType.mediaType = v === "TEXT" || v === "TEXT/" ? "text/plain" : value
                    break

                case "BOUNDARY":
                    contentType.boundary = value
                    break

                case "CHARSET":
                    contentType.charset = value
                    break

                case "NAME":
                    contentType.name = decodeRfc2047(value)
                    break

                default:
                    // We add the unknown value to our parameters list
                    // "Known" unknown values are:
                    // - title
                    // - report-type
                    contentType.parameters[key] = value
                    break
            }
        })
        return contentType
    }

    /**
     * Parses a the value for the header Content-Disposition to an object
     * @param value {string} the header value to decode
     * @returns {ContentDisposition}
     */
    static parseContentDisposition(value: string): ContentDisposition {
        if (value == null) throw new Error("value must not be null!")
        // See http://www.ietf.org/rfc/rfc2183.txt for RFC definition
        // Create empty ContentDisposition - we will fill in details as we read them
        const contentDisposition: ContentDisposition = {
            dispositionType: "",
            fileName: "",
            creationDate: 0,
            modificationDate: 0,
            readDate: 0,
            size: 0,
            parameters: {},
        }
        // Now decode the parameters
        const parameters = Rfc2231Decoder.decode(value)
        parameters.forEach(kvp => {
            let key = kvp.key.toUpperCase().trim()
            let value = unquote(kvp.value.trim())

            switch (key) {
                case "":
                    // This is the DispisitionType - it has no key since it is the first one
                    // and has no = in it.
                    contentDisposition.dispositionType = value
                    break

                // The correct name of the parameter is filename, but some emails also contains the parameter
                // name, which also holds the name of the file. Therefore we use both names for the same field.
                case "NAME":
                case "FILENAME":
                    // The filename might be in quotes, and it might be encoded-word encoded
                    contentDisposition.fileName = decodeRfc2047(value)
                    break

                case "CREATION-DATE":
                    // Notice that we need to create a new DateTime because of a failure in .NET 2.0.
                    // The failure is: you cannot give contentDisposition a DateTime with a Kind of UTC
                    // It will set the CreationDate correctly, but when trying to read it out it will throw an exception.
                    // It is the same with ModificationDate and ReadDate.
                    // This is fixed in 4.0 - maybe in 3.0 too.
                    // Therefore we create a new DateTime which have a DateTimeKind set to unspecified
                    // new DateTime(Rfc2822DateTime.StringToDate(value).Ticks);
                    contentDisposition.creationDate = Date.parse(value)
                    break

                case "MODIFICATION-DATE":
                    // var midificationDate = new DateTime(Rfc2822DateTime.StringToDate(value).Ticks);
                    contentDisposition.modificationDate = Date.parse(value)
                    break

                case "READ-DATE":
                    // var readDate = new DateTime(Rfc2822DateTime.StringToDate(value).Ticks);
                    contentDisposition.readDate = Date.parse(value)
                    break

                case "SIZE":
                    contentDisposition.size = SizeParser.parse(value)
                    break

                case "CHARSET": // ignoring invalid parameter in Content-Disposition

                case "VOICE":
                    break

                default:
                    if (!key.startsWith("X-")) throw new Error("Unknown parameter in Content-Disposition. Ask developer to fix! Parameter: " + key)
                    contentDisposition.parameters[key] = value
                    break
            }
        })
        return contentDisposition
    }

    /**
     * Parses an ID like Message-Id and Content-Id.
     * Example:
     *    <test@test.com>
     * into
     *    test@test.com
     *
     * @param value {string} the id to parse
     * @returns {string} a parsed id
     */
    static parseId(value: string): string {
        // Remove whitespace in front and behind since
        // whitespace is allowed there
        // Remove the last > and the first <
        return value.trim().replace(/[>]+$/, "").replace(/^[<]+/, "")
    }

    /**
     * parses multiple ids from a single string like In-Reply-To
     * @param value {string} the value to parse
     */
    static parseMultipleIds(value: string): Array<string> {
        // Split the string by >
        // We cannot use ' ' (space) here since this is a possible value:
        // <test@test.com><test2@test.com>
        return value
            .trim()
            .split(">")
            .filter(s => !isNullOrEmpty(s))
            .map(HeaderFieldParser.parseId)
    }
}