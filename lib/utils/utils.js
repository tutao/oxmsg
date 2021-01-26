// @flow
import type {PropertyTag} from "../property_tags"
import {PropertyTagLiterals} from "../property_tags"
import type {Property} from "../property"
import ByteBuffer from "bytebuffer"
import * as lcid from "./lcid"

function Xp(n: number, p: number): string {
	return n.toString(16).padStart(p, '0').toUpperCase()
}

function xp(n: number, p: number): string {
	return n.toString(16).padStart(p, '0')
}

export function x2(n: number): string {
	return xp(n, 2)
}

/**
 * get an uppercase hex string of a number zero-padded to 2 digits
 * @param n {number}
 * @returns {string}
 */
export function X2(n: number): string {
	return Xp(n, 2)
}

/**
 * get an uppercase hex string of a number zero-padded to 4 digits
 * @param n {number} the number
 * @returns {string} 4-digit uppercase hex representation of the number
 */
export function X4(n: number): string {
	return Xp(n, 4)
}

/**
 * get an uppercase hex string of a number zero-padded to 8 digits
 * @param n {number} the number
 * @returns {string}
 */
export function X8(n: number): string {
	return Xp(n, 8)
}


export function name(tag: PropertyTag | Property): string {
	return PropertyTagLiterals.SubStorageStreamPrefix + X4(tag.id) + X4(tag.type)
}

export function shortName(tag: PropertyTag | Property): string {
	return X4(tag.id)
}

/**
 * convert UTF-8 Uint8Array to string
 * @param array {Uint8Array}
 * @returns {string}
 */
export function utf8ArrayToString(array: Uint8Array): string {
	return new TextDecoder().decode(array)
}

/**
 * convert string to UTF-8 Uint8Array
 * @param str {string}
 * @returns {Uint8Array}
 */
export function stringToUtf8Array(str: string): Uint8Array {
	return new TextEncoder().encode(str)
}

/**
 * convert string to UTF-16LE Uint8Array
 * @param str {string}
 * @returns {Uint8Array|Uint8Array}
 */
export function stringToUtf16LeArray(str: string): Uint8Array {
	const u16 = Uint16Array.from(str.split('').map(c => c.charCodeAt(0)))
	return new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength)
}

/**
 * convert UTF-16LE Uint8Array to string
 * @param u8 {Uint8Array} raw bytes
 * @returns {string}
 */
export function utf16LeArrayToString(u8: Uint8Array): string {
	const u16 = new Uint16Array(u8.buffer, u8.byteOffset, u8.byteLength)
	// mapping directly over u16 insists on converting the result to Uint16Array again.
	return Array.from(u16).map(c => String.fromCharCode(c)).join('')
}

/**
 * convert a string to a Uint8Array with terminating 0 byte
 * @throws if the string contains characters not in the ANSI range (0-255)
 * @param str
 */
export function stringToAnsiArray(str: string): Uint8Array {
	const codes = str.split('').map(c => c.charCodeAt(0))
	if (codes.findIndex(c => c > 255) > -1) throw new Error("can't encode ansi string with char codes > 255!")
	codes.push(0)
	return Uint8Array.from(codes)
}

/**
 * decode a string from a Uint8Array with terminating 0, interpreting the values as
 * ANSI characters.
 * @throws if the array does not have a terminating 0
 * @param u8 {Uint8Array}
 * @returns {string}
 */
export function ansiArrayToString(u8: Uint8Array): string {
	if (u8.length === 0 || u8[u8.length - 1] !== 0) throw new Error("can't decode ansi array without terminating 0 byte!")
	return Array.from(new Uint8Array(u8.buffer, u8.byteOffset, u8.byteLength - 1))
				.map(c => String.fromCharCode(c))
				.join('')
}

/**
 * convert a file name to its DOS 8.3 version.
 * @param fileName {string} a file name (not a path!)
 */
export function fileNameToDosFileName(fileName: string): string {
	const parts = fileName.split(".")
	let name, extension
	if (parts.length < 2) {
		name = parts[0]
		extension = null
	} else {
		name = parts.slice(0, -1).join('')
		extension = parts[parts.length - 1]
	}
	if (name !== "") {
		name = (name.length > 8 ? name.substring(0, 6) + "~1" : name).toUpperCase()
	}
	if (extension != null) {
		name += "." + (
			extension.length > 3
				? extension.substring(0, 3)
				: extension
		).toUpperCase()
	}

	return name
}

/**
 * turn a ByteBuffer into a Uint8Array, using the current offset as a limit.
 * buf.limit will change to buf.offset, and its buf.offset will be reset to 0.
 * @param buf {ByteBuffer} the buffer to convert
 * @returns {Uint8Array} a new Uint8Array containing the
 */
export function byteBufferAsUint8Array(buf: ByteBuffer): Uint8Array {
	buf.limit = buf.offset
	buf.offset = 0
	return new Uint8Array(buf.toBuffer(true))
}

/**
 * make an new byte buffer with the correct settings
 * @param otherBuffer {ByteBuffer | ArrayBuffer | Uint8Array} other buffer to wrap into a ByteBuffer
 * @param initCap {number?} initial capacity. ignored if otherBuffer is given.
 */
export function makeByteBuffer(initCap: ?number, otherBuffer?: ByteBuffer | ArrayBuffer | Uint8Array): ByteBuffer {
	if (initCap != null && initCap < 0) throw new Error("initCap must be non-negative!")
	return otherBuffer == null
		? new ByteBuffer(initCap || 1, ByteBuffer.LITTLE_ENDIAN)
		: ByteBuffer.wrap(otherBuffer, null, ByteBuffer.LITTLE_ENDIAN)
}

export function getPathExtension(p: string): string {
	if (!p.includes(".")) return ""
	const parts = p.split(".")
	return "." + parts[parts.length - 1]
}

export function isNullOrEmpty(str: ?string): boolean {
	return !str || str === ""
}

export function isNullOrWhiteSpace(str: ?string): boolean {
	return str == null || str.trim() === ""
}

export function splitAtUnquoted(input: string, sep: string): Array<string> {
	if (sep.length !== 1) throw new Error("sep needs to be a char!")
	const elements = []

	let lastSplitLocation = 0
	let insideQuote = false
	const characters = input.split("")

	for (let i = 0; i < characters.length; i++) {
		let character = characters[i]
		if (character === '\"') insideQuote = !insideQuote

		// Only split if we are not inside quotes
		if (character !== sep || insideQuote) continue
		// We need to split
		const length = i - lastSplitLocation
		elements.push(input.substring(lastSplitLocation, lastSplitLocation + length))

		// Update last split location
		// + 1 so that we do not include the character used to split with next time
		lastSplitLocation = i + 1
	}

	// Add the last part
	elements.push(input.substring(lastSplitLocation));

	return elements
}

export function unquote(input: string): string {
	if (input == null) throw new Error("text needs to be a string")
	return input.length > 1 && input[0] === '"' && input[input.length - 1] === '"'
		? input.substring(1, input.length - 1)
		: input
}

export function localeId(): number {
	return lcid.to(getLang())
}

function getLang(): string {
	if (typeof navigator != 'undefined')
		if (navigator.language != null) return navigator.language
		else return (navigator.languages || ["en_US"]) [0]
	else
		return "en_US"
}


/**
 * get the upper and lower 32 bits from a 64bit int in a bignum
 */
// $FlowIgnore[bigint-unsupported]
export function bigInt64ToParts(num: bigint): { lower: number, upper: number } {
	const u64 = BigInt.asUintN(64, num)
	// $FlowIgnore[bigint-unsupported]
	const lower = Number(u64 & (2n ** 32n - 1n))
	// $FlowIgnore[bigint-unsupported]
	const upper = Number((u64 / (2n ** 32n)) & (2n ** 32n - 1n))
	return {lower, upper}
}

/**
 * create a 64bit int in a bignum from two 32bit ints in numbers
 * @param lower
 * @param upper
 */
// $FlowIgnore[bigint-unsupported]
export function bigInt64FromParts(lower: number, upper: number): bigint {
	// $FlowIgnore[bigint-unsupported]
	return BigInt.asUintN(64, BigInt(lower) + (BigInt(upper) * (2n ** 32n)))

}