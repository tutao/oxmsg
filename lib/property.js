// @flow
import {fileTimeToDate, oADateToDate,} from "./utils/time"
import {bigInt64FromParts, name, utf8ArrayToString, X4} from './utils/utils'
import type {PropertyTypeEnum} from "./enums"
import {PropertyFlag, PropertyType} from "./enums"
import {v4} from 'uuid'

/**
 * A property inside the MSG file
 */
export class Property {
	id: number
	type: PropertyTypeEnum
	_flags: number
	_multiValue: boolean
	_data: Uint8Array

	constructor(obj: { id: number, type: PropertyTypeEnum, data: Uint8Array, multiValue?: boolean, flags?: number }) {
		this.id = obj.id
		this.type = obj.type
		this._data = obj.data
		this._multiValue = obj.multiValue == null ? false : obj.multiValue
		this._flags = obj.flags == null ? 0 : obj.flags
	}

	name(): string {
		return name(this)
	}

	shortName(): string {
		return X4(this.id)
	}

	flagsCollection(): Array<number> {
		const result = [];

		if ((this._flags & PropertyFlag.PROPATTR_MANDATORY) !== 0)
			result.push(PropertyFlag.PROPATTR_MANDATORY)

		if ((this._flags & PropertyFlag.PROPATTR_READABLE) !== 0)
			result.push(PropertyFlag.PROPATTR_READABLE)

		if ((this._flags & PropertyFlag.PROPATTR_WRITABLE) !== 0)
			result.push(PropertyFlag.PROPATTR_WRITABLE)

		return result
	}

	asInt(): number {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_SHORT:
				return view.getInt16(0, false)
			case PropertyType.PT_LONG:
				return view.getInt32(0, false)
			default:
				throw new Error("type is not PT_SHORT or PT_LONG")
		}
	}

	asSingle(): number {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_FLOAT:
				return view.getFloat32(0, false)
			default:
				throw new Error("type is not PT_FLOAT")
		}
	}

	asDouble(): number {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_FLOAT:
				return view.getFloat64(0, false)
			default:
				throw new Error("type is not PT_DOUBLE")
		}
	}

	asDecimal(): number {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_FLOAT:
				// TODO: is there a .Net decimal equivalent for js?
				return view.getFloat32(0, false)
			default:
				throw new Error("type is not PT_FLOAT")
		}
	}

	asDateTime(): Date {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_APPTIME:
				// msg stores .Net DateTime as OADate, number of days since 30 dec 1899 as a double value
				const oaDate = view.getFloat64(0, false)
				return oADateToDate(oaDate)
			case PropertyType.PT_SYSTIME:
				// https://docs.microsoft.com/de-de/office/client-developer/outlook/mapi/filetime
				const fileTimeLower = view.getUint32(0, false)
				const fileTimeUpper = view.getUint32(4, false)
				return fileTimeToDate(bigInt64FromParts(fileTimeLower, fileTimeUpper))
			default:
				throw new Error("type is not PT_APPTIME or PT_SYSTIME")
		}
	}

	asBool(): boolean {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_BOOLEAN:
				return Boolean(this._data[0])
			default:
				throw new Error("type is not PT_BOOLEAN")
		}
	}

	// TODO: this will fail for very large numbers
	asLong(): number {
		const view = new DataView(this._data.buffer, 0)
		switch (this.type) {
			case PropertyType.PT_LONG:
			case PropertyType.PT_LONGLONG:
				const val = view.getFloat64(0, false)
				if (val > Number.MAX_SAFE_INTEGER) throw new Error("implementation can't handle big longs yet")
				return parseInt(val)
			default:
				throw new Error("type is not PT_LONG")
		}
	}

	asString(): string {
		switch (this.type) {
			case PropertyType.PT_UNICODE:
				return utf8ArrayToString(this._data)
			case PropertyType.PT_STRING8:
				return String.fromCharCode(...this._data)
			default:
				throw new Error("Type is not PT_UNICODE or PT_STRING8");
		}
	}

	asGuid(): Uint8Array {
		switch (this.type) {
			case PropertyType.PT_CLSID:
				return v4({random: this._data.slice(0, 16)})
			default:
				throw new Error("Type is not PT_CLSID");
		}
	}

	asBinary(): Uint8Array {
		switch (this.type) {
			case PropertyType.PT_BINARY:
				return this._data.slice()
			default:
				throw new Error("Type is not PT_BINARY");
		}
	}
}