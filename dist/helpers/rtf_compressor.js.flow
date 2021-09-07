// @flow
import ByteBuffer from 'bytebuffer'
import {byteBufferAsUint8Array, makeByteBuffer, stringToUtf8Array} from "../utils/utils"
import {Crc32} from "./crc32"

const INIT_DICT_SIZE: number = 207
const MAX_DICT_SIZE: number = 4096
const COMP_TYPE: string = "LZFu"
const HEADER_SIZE: number = 16

type MatchInfo = {|
    dictionaryOffset: number,
    length: number,
|}

function getInitialDict(): ByteBuffer {
    const builder = []
    builder.push('{\\rtf1\\ansi\\mac\\deff0\\deftab720{\\fonttbl;}')
    builder.push('{\\f0\\fnil \\froman \\fswiss \\fmodern \\fscript ')
    builder.push('\\fdecor MS Sans SerifSymbolArialTimes New RomanCourier{\\colortbl\\red0\\green0\\blue0')
    builder.push('\r\n')
    builder.push('\\par \\pard\\plain\\f0\\fs20\\b\\i\\u\\tab\\tx')
    const res = builder.join('')
    let initialDictionary = makeByteBuffer(null, stringToUtf8Array(res))
    initialDictionary.ensureCapacity(MAX_DICT_SIZE)
    initialDictionary.limit = MAX_DICT_SIZE
    initialDictionary.offset = INIT_DICT_SIZE
    return initialDictionary
}

/**
 * find the longest match of the start of the current input in the dictionary.
 * finds the length of the longest match of the start of the current input in the dictionary and
 * the position of it in the dictionary.
 * @param dictionary {ByteBuffer} part of the MS-OXRTFCP spec.
 * @param inputBuffer {ByteBuffer} pointing at the input data
 * @returns {MatchInfo} object containing dictionaryOffset, length
 */
function findLongestMatch(dictionary: ByteBuffer, inputBuffer: ByteBuffer): MatchInfo {

    const positionData: MatchInfo = {
        length: 0,
        dictionaryOffset: 0
    }
    if (inputBuffer.offset >= inputBuffer.limit) return positionData
    inputBuffer.mark()
    dictionary.mark() // previousWriteOffset
    let matchLength = 0
    let dictionaryIndex = 0


    while (true) {
        const inputCharacter = inputBuffer.readUint8()
        const dictCharacter = dictionary.readUint8(dictionaryIndex % MAX_DICT_SIZE)
        if (dictCharacter === inputCharacter) {
            matchLength += 1
            if (matchLength <= 17 && matchLength > positionData.length) {
                positionData.dictionaryOffset = dictionaryIndex - matchLength + 1
                dictionary.writeUint8(inputCharacter)
                dictionary.offset = dictionary.offset % MAX_DICT_SIZE
                positionData.length = matchLength
            }
            if (inputBuffer.offset >= inputBuffer.limit) break
        } else {
            inputBuffer.reset()
            inputBuffer.mark()
            matchLength = 0
            if (inputBuffer.offset >= inputBuffer.limit) break
        }

        dictionaryIndex += 1
        if (dictionaryIndex >= dictionary.markedOffset + positionData.length) break
    }
    inputBuffer.reset()
    return positionData
}

/**
 * Takes in input, compresses it using LZFu by Microsoft. Can be viewed in the [MS-OXRTFCP].pdf document.
 * https://msdn.microsoft.com/en-us/library/cc463890(v=exchg.80).aspx. Returns the input as a byte array.
 * @param input {Uint8Array} the input to compress
 * @returns {Uint8Array} compressed input
 */
export function compress(input: Uint8Array): Uint8Array {
    let matchData: MatchInfo = {
        length: 0,
        dictionaryOffset: 0
    }

    const inputBuffer = makeByteBuffer(null, input)

    const dictionary = getInitialDict()
    const tokenBuffer = makeByteBuffer(16)
    const resultBuffer = makeByteBuffer(17)
    // The writer MUST set the input cursor to the first byte in the input buffer.
    // The writer MUST set the output cursor to the 17th byte (to make space for the compressed header).
    resultBuffer.offset = HEADER_SIZE

    // (1) The writer MUST (re)initialize the run by setting its
    // Control Byte to 0 (zero), its control bit to 0x01, and its token offset to 0 (zero).
    let controlByte = 0
    let controlBit = 0x01
    while (true) {

        // (3) Locate the longest match in the dictionary for the current input cursor,
        // as specified in section 3.3.4.2.1. Note that the dictionary is updated during this procedure.
        matchData = findLongestMatch(dictionary, inputBuffer)
        if (inputBuffer.offset >= inputBuffer.limit) {
            // (2) If there is no more input, the writer MUST exit the compression loop (by advancing to step 8).

            // (8) A dictionary reference (see section 2.2.1.5) MUST be created from an offset equal
            // to the current write offset of the dictionary and a length of 0 (zero), and inserted
            // in the token buffer as a big-endian word at the current token offset. The writer MUST
            // then advance the token offset by 2. The control bit MUST be ORed into the Control Byte,
            // thus setting the bit that corresponds to the current token to 1.

            let dictReference = (dictionary.offset & 0xFFF) << 4
            tokenBuffer.writeUint8(dictReference >>> 8 & 0xFF)
            tokenBuffer.writeUint8(dictReference >>> 0 & 0xFF)
            controlByte |= controlBit

            // (9) The writer MUST write the current run to the output by writing the BYTE Control Byte,
            // and then copying token offset number of BYTEs from the token buffer to the output.
            // The output cursor is advanced by token offset + 1 BYTE.
            resultBuffer.writeUint8(controlByte)
            tokenBuffer.limit = tokenBuffer.offset
            tokenBuffer.offset = 0
            resultBuffer.append(tokenBuffer)
            break
        }

        if (matchData.length <= 1) {
            // (4) If the match is 0 (zero) or 1 byte in length, the writer
            // MUST copy the literal at the input cursor to the Run's token
            // buffer at token offset. The writer MUST increment the token offset and the input cursor.
            const inputCharacter = inputBuffer.readUint8()
            if (matchData.length === 0) {
                dictionary.writeUint8(inputCharacter)
                dictionary.offset = dictionary.offset % dictionary.limit
            }
            tokenBuffer.writeUint8(inputCharacter)
        } else {
            // (5) If the match is 2 bytes or longer, the writer MUST create a dictionary
            // reference (see section 2.2.1.5) from the offset of the match and the length.
            // (Note: The value stored in the Length field in REFERENCE is length minus 2.)
            // The writer MUST insert this dictionary reference in the token buffer as a
            // big-endian word at the current token offset. The control bit MUST be bitwise
            // ORed into the Control Byte, thus setting the bit that corresponds to the
            // current token to 1. The writer MUST advance the token offset by 2 and
            // MUST advance the input cursor by the length of the match.
            let dictReference = (matchData.dictionaryOffset & 0xFFF) << 4 | (matchData.length - 2) & 0xF
            controlByte |= controlBit
            tokenBuffer.writeUint8(dictReference >>> 8 & 0xFF)
            tokenBuffer.writeUint8(dictReference >>> 0 & 0xFF)
            inputBuffer.offset = inputBuffer.offset + matchData.length
        }

        matchData.length = 0

        if (controlBit === 0x80) {
            // (7) If the control bit is equal to 0x80, the writer MUST write the run
            // to the output by writing the BYTE Control Byte, and then copying the
            // token offset number of BYTEs from the token buffer to the output. The
            // writer MUST advance the output cursor by token offset + 1 BYTEs.
            // Continue with compression by returning to step (1).
            resultBuffer.writeUint8(controlByte)
            tokenBuffer.limit = tokenBuffer.offset
            tokenBuffer.offset = 0
            resultBuffer.append(tokenBuffer)
            controlByte = 0
            controlBit = 0x01
            tokenBuffer.clear()
            continue
        }
        // (6) If the control bit is not 0x80, the control bit MUST be left-shifted by one bit and compression MUST
        // continue building the run by returning to step (2).
        controlBit <<= 1
    }

    // After the output has been completed by execution of step (9), the writer
    // MUST complete the output by filling the header, as specified in section 3.3.4.2.2.
    // The writer MUST fill in the header by using the following process:

    // 1.Set the COMPSIZE (see section 2.2.1.1) field of the header to the number of CONTENTS bytes in the output buffer plus 12.
    resultBuffer.limit = resultBuffer.offset
    resultBuffer.writeUint32(resultBuffer.limit - HEADER_SIZE + 12, 0)

    // 2.Set the RAWSIZE (see section 2.2.1.1) field of the header to the number of bytes read from the input.
    resultBuffer.writeUint32(input.length, 4)

    // 3.Set the COMPTYPE (see section 2.2.1.1) field of the header to COMPRESSED.
    resultBuffer.writeUTF8String(COMP_TYPE, 8)

    // 4.Set the CRC (see section 3.1.3.2) field of the header to the CRC (see section 3.1.1.1.2) generated from the CONTENTS bytes.
    resultBuffer.offset = HEADER_SIZE
    resultBuffer.writeUint32(Crc32.calculate(resultBuffer), 12)
    resultBuffer.offset = resultBuffer.limit
    return byteBufferAsUint8Array(resultBuffer)
}