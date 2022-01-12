import {splitAtUnquoted, unquote} from "../../utils/utils"
import {decode as decodeRfc2047} from "../header/rfc2047"
export type KeyValueList = Array<{
    key: string
    value: string
}>

/**
 * This class is responsible for decoding parameters that has been encoded with:
 * Continuation:
 *         This is where a single parameter has such a long value that it could
 *         be wrapped while in transit. Instead multiple parameters is used on each line.
 *
 *         Example:
 *         From: Content-Type: text/html; boundary="someVeryLongStringHereWhichCouldBeWrappedInTransit"
 *         To:
 *         Content-Type: text/html; boundary*0="someVeryLongStringHere" boundary*1="WhichCouldBeWrappedInTransit"
 * Encoding:
 *         Sometimes other characters then ASCII characters are needed in parameters.
 *         The parameter is then given a different name to specify that it is encoded.
 *         Example:
 *         From: Content-Disposition attachment; filename="specialCharsÆØÅ"
 *         To: Content-Disposition attachment; filename*="ISO-8859-1'en-us'specialCharsC6D8C0"
 *         This encoding is almost the same as EncodedWord encoding, and is used to decode the value.
 *
 * Continuation and Encoding:
 *         Both Continuation and Encoding can be used on the same time.
 *         Example:
 *         From: Content-Disposition attachment; filename="specialCharsÆØÅWhichIsSoLong"
 *         To:
 *             Content-Disposition attachment; filename*0*="ISO-8859-1'en-us'specialCharsC6D8C0";
 *             filename*1*="WhichIsSoLong"
 *         This could also be encoded as:
 *         To:
 *             Content-Disposition attachment; filename*0*="ISO-8859-1'en-us'specialCharsC6D8C0";
 *             filename*1="WhichIsSoLong"
 *         Notice that filename*1 does not have an * after it - denoting it IS NOT encoded.
 *         There are some rules about this:
 *             1. The encoding must be mentioned in the first part (filename*0*), which has to be encoded.
 *             2. No other part must specify an encoding, but if encoded it uses the encoding mentioned in the
 *                 first part.
 *            3. Parts may be encoded or not in any order.
 *
 * More information and the specification is available in RFC 2231 (http://tools.ietf.org/html/rfc2231)
 */
export class Rfc2231Decoder {
    /**
     * Decodes a string of the form:
     *
     * value0; key1=value1; key2=value2; key3=value3
     *
     * The returned List of key value pairs will have the key as key and the decoded value as value.
     * The first value0 will have a key of ""
     *
     * If continuation is used, then multiple keys will be merged into one key with the different values
     * decoded into on big value for that key.
     * Example:
     *   title*0=part1
     *   title*1=part2
     * will have key and value of:
     *
     * title=decode(part1)decode(part2)
     *
     * @param input {string} the string to decode
     * @returns {Array<{key: string, value: string}>} a list of decoded key-value-pairs
     */
    static decode(input: string): KeyValueList {
        if (input == null) throw new Error("input must not be null!")
        // Normalize the input to take account for missing semicolons after parameters.
        // Example
        // text/plain; charset="iso-8859-1" name="somefile.txt" or
        // text/plain;  charset="iso-8859-1"    name="somefile.txt"
        // is normalized to
        // text/plain; charset="iso-8859-1"; name="somefile.txt"
        // Only works for parameters inside quotes
        // \s = matches whitespace
        const normalizeRegexp = /=\s*"(?<value>[^"]*)"\s/g
        input = input.replace(normalizeRegexp, (match, grp) => `=\"${grp}\"; `)
        // Normalize
        // Since the above only works for parameters inside quotes, we need to normalize
        // the special case with the first parameter.
        // Example:
        // attachment filename="foo"
        // is normalized to
        // attachment; filename="foo"
        // ^ = matches start of line (when not inside square bracets [])
        const normalizeFirstRegexp = /^(?<first>[^;s]+)s(?<second>[^;s]+)/
        input = input.replace(normalizeFirstRegexp, (match, first, second) => `${first}; ${second}`)
        // Split by semicolon, but only if not inside quotes
        const parts = splitAtUnquoted(input.trim(), ";").map(part => part.trim())
        const collection = []
        for (let part of parts) {
            // Empty strings should not be processed
            if (part.length === 0) return
            const eqIdx = part.indexOf("=")
            if (eqIdx === -1)
                collection.push({
                    key: "",
                    value: part,
                })
            else
                collection.push({
                    key: part.slice(0, eqIdx),
                    value: part.slice(eqIdx),
                })
        }
        return Rfc2231Decoder.decodePairs(collection)
    }

    /**
     * Decodes the list of key value pairs into a decoded list of key value pairs.<br />
     * There may be less keys in the decoded list, but then the values for the lost keys will have been appended
     * to the new key.
     * @param pairs {Array<{key: string, value: string}>} the pairs to decode
     * @returns {Array<{key: string, value: string}>} the decoded pairs
     */
    static decodePairs(pairs: KeyValueList): KeyValueList {
        if (pairs == null) throw new Error("pairs must not be null!")
        const resultPairs = []
        const pairsCount = pairs.length

        for (let i = 0; i < pairsCount; i++) {
            const currentPair = pairs[i]
            let key = currentPair.key
            let value = unquote(currentPair.value)

            // Is it a continuation parameter? (encoded or not)
            if (key.endsWith("*0") || key.endsWith("*0*")) {
                // This encoding will not be used if we get into the if which tells us
                // that the whole continuation is not encoded
                let encoding = "notEncoded - Value here is never used"

                // Now lets find out if it is encoded too.
                if (key.endsWith("*0*")) {
                    // It is encoded.
                    // Fetch out the encoding for later use and decode the value
                    // If the value was not encoded as the email specified
                    // encoding will be set to null. This will be used later.
                    encoding = Rfc2231Decoder.detectEncoding(value)
                    value = Rfc2231Decoder.decodeSingleValue(value, encoding)
                    // Find the right key to use to store the full value
                    // Remove the start *0 which tells is it is a continuation, and the first one
                    // And remove the * afterwards which tells us it is encoded
                    key = key.replace("*0*", "")
                } else {
                    // It is not encoded, and no parts of the continuation is encoded either
                    // Find the right key to use to store the full value
                    // Remove the start *0 which tells is it is a continuation, and the first one
                    key = key.replace("*0", "")
                }

                // The StringBuilder will hold the full decoded value from all continuation parts
                const builder = []
                // Append the decoded value
                builder.push(value)

                // Now go trough the next keys to see if they are part of the continuation
                for (let j = i + 1, continuationCount = 1; j < pairsCount; j++, continuationCount++) {
                    const jKey = pairs[j].key
                    let valueJKey = unquote(pairs[j].value)

                    if (jKey === key + "*" + continuationCount) {
                        // This value part of the continuation is not encoded
                        // Therefore remove qoutes if any and add to our stringbuilder
                        builder.push(valueJKey)
                        // Remember to increment i, as we have now treated one more KeyValuePair
                        i++
                    } else if (jKey === key + "*" + continuationCount + "*") {
                        // We will not get into this part if the first part was not encoded
                        // Therefore the encoding will only be used if and only if the
                        // first part was encoded, in which case we have remembered the encoding used
                        // Sometimes an email creator says that a string was encoded, but it really
                        // `was not. This is to catch that problem.
                        if (encoding != null) valueJKey = Rfc2231Decoder.decodeSingleValue(valueJKey, encoding)
                        builder.push(valueJKey)
                        // Remember to increment i, as we have now treated one more KeyValuePair
                        i++
                    } else {
                        // No more keys for this continuation
                        break
                    }
                }

                // Add the key and the full value as a pair
                value = builder.join("")
                resultPairs.push({
                    key,
                    value,
                })
            } else if (key.endsWith("*")) {
                // This parameter is only encoded - it is not part of a continuation
                // We need to change the key from "<key>*" to "<key>" and decode the value
                // To get the key we want, we remove the last * that denotes
                // that the value hold by the key was encoded
                key = key.replace("*", "")
                // Decode the value
                let enc = Rfc2231Decoder.detectEncoding(value)
                value = Rfc2231Decoder.decodeSingleValue(value, enc)
                // Now input the new value with the new key
                resultPairs.push({
                    key,
                    value,
                })
            } else {
                // Fully normal key - the value is not encoded
                // Therefore nothing to do, and we can simply pass the pair
                // as being decoded now
                resultPairs.push(currentPair)
            }
        }

        return resultPairs
    }

    static detectEncoding(input: string): string | null | undefined {
        if (input == null) throw new Error("input must not be null!")
        const quoteIdx = input.indexOf("'")
        if (quoteIdx === -1) return null
        return input.substring(0, quoteIdx)
    }

    /**
   and encodingUsed will be set to null
   * @param input {string} the value to decode
   * @returns {{decoded:string, encodingUsed: string}} decoded value and used encoding (for later use)
   */

    /**
     * This will decode a single value of the form: ISO-8859-1'en-us'%3D%3DIamHere
     * Which is basically a EncodedWord form just using % instead of =
     * Notice that 'en-us' part is not used for anything.
     *
     * If the single value given is not on the correct form, it will be returned without
     * being decoded
     *
     * @param input {string} the value to decode
     * @param encoding {string} the encoding used to decode with
     * @returns {string} decoded value corresponding to input
     */
    static decodeSingleValue(input: string, encoding: string | null | undefined): string {
        if (input == null) throw new Error("input must not be null!")
        if (encoding == null) return input
        // The encoding used is the same as QuotedPrintable, we only
        // need to change % to =
        // And otherwise make it look like the correct EncodedWord encoding
        input = "=?" + encoding + "?Q?" + input.replace("%", "=") + "?="
        return decodeRfc2047(input)
    }
}