// @flow

declare module 'uuid' {
	declare var v4: (opts: ?{ random?: Uint8Array, rng?: ()=>Uint8Array }, buffer?: Uint8Array | Buffer, offset?: number) => Uint8Array
	declare var stringify: Uint8Array => string
}

declare module 'cfb' {
	declare type CFBEntry = {
		/** Case-sensitive internal name */
		name: string,
		/** 1 = dir, 2 = file, 5 = root ; see [MS-CFB] 2.6.1 */
		type: number,
		/** Raw Content */
		content: Buffer | number[] | Uint8Array,
		/** Creation Time */
		ct?: Date,
		/** Modification Time */
		mt?: Date,
		/** Content-Type (for MAD) */
		ctype?: string,
		/** CLSID - OLE file type identifier **/
		clsid: string
	}

	declare type CFBContainer = {
		/** file data */
		FileIndex: Array<CFBEntry>,
		/** list of files/dirs in the cfb */
		FullPaths: Array<string>,
	}

	declare type CFBOptions = {
		/** TODO: what's this? */
		CLSID?: string
	}

	/** options for CFB.utils.cfb_new(), can have the structure of a CFBContainer */
	declare type CFBNewOptions = CFBOptions & {
		/** name of the root storage */
		root?: string,
		/** file data */
		FileIndex?: Array<CFBEntry>,
		/** list of files/dirs in the cfb */
		FullPaths?: Array<string>,
	}

	/** options for CFB.utils.cfb_add() */
	declare type CFBAddOptions = CFBOptions & {
		/** toggle existence check */
		unsafe?: boolean,
		/** creation time */
		ct?: Date,
		/** modification time */
		mt?: Date,
	}

	declare var utils: {
		cfb_new(opts: ?CFBNewOptions): CFBContainer,
		cfb_add(container: CFBContainer, name: string, content: ?Uint8Array, opts: ?CFBAddOptions): CFBEntry,
		cfb_del(container: CFBContainer, name: string): boolean,
		cfb_mov(container: CFBContainer, old_name: string, new_name: string): boolean,
		use_zlib(zlib: any): void, // use a zlib instance
	}

	declare type CFBWriteOptions = {
		/** encoding of the output file */
		type?: "base64" | "binary" | "file" | "array" | "buffer",
		/** output file type. default cfb */
		fileType?: "cfb" | "zip" | 'mad',
		/** enable DEFLATE compression for zip file type*/
		compression?: boolean
	}

	declare var write: (container: CFBContainer, opts?: CFBWriteOptions) => Buffer | Array<number> | string
}

declare interface BigIntType {
	/**
	 * Returns a string representation of an object.
	 * @param radix Specifies a radix for converting numeric values to strings.
	 */
	toString(radix?: number): string;

	/** Returns a string representation appropriate to the host environment's current locale. */
	toLocaleString(): string;

	/** Returns the primitive value of the specified object. */
	// $FlowFixMe[bigint-unsupported]
	valueOf(): bigint;

	[Symbol.toStringTag]: "BigInt";
}

declare interface BigIntConstructor {
	// $FlowFixMe[bigint-unsupported]
	(value?: any): bigint;

	prototype: BigIntType;

	/**
	 * Interprets the low bits of a BigInt as a 2's-complement signed integer.
	 * All higher bits are discarded.
	 * @param bits The number of low bits to use
	 * @param int The BigInt whose bits to extract
	 */
	// $FlowFixMe[bigint-unsupported]
	asIntN(bits: number, int: bigint): bigint;

	/**
	 * Interprets the low bits of a BigInt as an unsigned integer.
	 * All higher bits are discarded.
	 * @param bits The number of low bits to use
	 * @param int The BigInt whose bits to extract
	 */
	// $FlowFixMe[bigint-unsupported]
	asUintN(bits: number, int: bigint): bigint;
}

declare var BigInt: BigIntConstructor;

declare module 'lcid' {
	declare var to: (string) => number
}

declare module 'iconv-lite' {
	declare var encodingExists: (string) => boolean
	declare var decode: (Buffer, string) => string
}

declare module 'address-rfc2822' {
	declare type MailAddress = MailAddressClass

	declare class MailAddressClass {
		address: string,
		phrase: string,
		comment: string,
		name: () => string,
		format: () => string,
		user: () => string,
		host: () => string,
	}

	declare var parse: (string) => Array<MailAddress>
}

declare module 'bytebuffer' {
	declare class Long {
	}

	declare export default class ByteBuffer {
	constructor(capacity: number, littleEndian?: boolean, noassert?: boolean): ByteBuffer;
		// statics
	static DEFAULT_NOASSERT: boolean;
	static DEFAULT_ENDIAN: boolean;
	static LITTLE_ENDIAN: boolean;
	static BIG_ENDIAN: boolean;
	static VERSION: string;
	static METRICS_CHARS: number;
	static METRICS_BYTES: number;
	static MAX_VARINT64_BYTES: number;
	static MAX_VARINT32_BYTES: number;
	static DEFAULT_CAPACITY: number;
	static Long: Long;
	static allocate: (capacity: number, littleEndian: boolean, noassert: boolean) => ByteBuffer;
	static atob: (b64: string) => string;
	static btoa: (binary: string) => string;
	static calculateUTF8Bytes: (string) => number;
	static calculateUTF8Chars: (string) => number;
	static concat: (buffers: Array<ByteBuffer>, encoding: string, littleEndian: boolean, noAssert: boolean) => ByteBuffer;
	static wrap: (ByteBuffer | ArrayBuffer | Uint8Array | string, encoding?: "utf8" | "base64" | "hex" | "binary" | null, littleEndian?: boolean, noAssert?: boolean) => ByteBuffer;

		// instance methods
	toBuffer: (forceCopy: ?boolean) => Uint8Array;
	writeByte: (value: number, offset?: number) => this;
	writeDouble: (value: number, offset?: number) => this;
	writeFloat: (value: number, offset?: number) => this;
	writeIString: (value: string, offset?: number) => this | number;
	writeInt: (value: number, offset?: number) => this;
	writeInt8: (value: number, offset?: number) => this;
	writeInt16: (value: number, offset?: number) => this;
	writeInt32: (value: number, offset?: number) => this;
	writeInt64: (value: number | Long, offset?: number) => this;
	writeUTF8String: (value: string, offset?: number) => this;
	writeUint8: (value: number, offset?: number) => this;
	writeUint16: (value: number, offset?: number) => this;
	writeUint32: (value: number, offset?: number) => this;
	writeUint64: (value: number | Long, offset?: number) => this;
	readUint8: (offset?: number) => number;
	readUint16: (offset?: number) => number;
	readUint32: (offset?: number) => number;
	readUTF8String: (offset?: number) => string;
	reset: () => this;
	append: (source: ByteBuffer | Uint8Array | ArrayBuffer | string, encoding?: string | number, offset?: number) => this;
	ensureCapacity: (number) => this;
	mark: (offset?: number) => this;
	clear: () => this;
	/**
	 * return a cloned instance backed by the same buffer
	 * with offset = begin and limit = end
	 * @param start {number} defaults to offset
	 * @param end {number} defaults to limit
	 */
	slice: (start: number, end: number) => ByteBuffer;
	toArrayBuffer: (forceCopy?: boolean) => ArrayBuffer;

		//instance fields
	offset: number;
	limit: number;
	markedOffset: number;
	}
}