// @flow
import type {PropertyTagsEnum} from "./property_tags"
import {PropertyTagLiterals, PropertyTags} from "./property_tags"
import {PropertyFlag, PropertyType, propertyTypeName} from "./enums"
import {Property} from "./property"
import ByteBuffer from "bytebuffer"
import {
	bigInt64ToParts,
	byteBufferAsUint8Array,
	makeByteBuffer,
	stringToAnsiArray,
	stringToUtf16LeArray,
	stringToUtf8Array
} from "./utils/utils"
import type {CFBStorage} from "./cfb_storage"
import {dateToFileTime} from "./utils/time";
import type {PropertyTypeEnum} from "./enums";

const DEFAULT_FLAGS = PropertyFlag.PROPATTR_READABLE | PropertyFlag.PROPATTR_WRITABLE

export class Properties extends Array<Property> {

	/**
	 * add a prop it it doesn't exist, otherwise replace it
	 */
	addOrReplaceProperty(tag: PropertyTagsEnum, obj: any, flags: number = PropertyFlag.PROPATTR_READABLE | PropertyFlag.PROPATTR_WRITABLE) {
		const index = this.findIndex(p => p.id === tag.id)
		if (index >= 0) this.splice(index, 1)
		this.addProperty(tag, obj, flags)
	}

	_expectPropertyType(expected: PropertyTypeEnum, actual: PropertyTypeEnum) {
		if (actual !== expected) {
			throw new Error(`Invalid PropertyType "${propertyTypeName(actual)}". Expected "${propertyTypeName(expected)}"`)
		}
	}

	addDateProperty(tag: PropertyTagsEnum,
					value: Date,
					flags: number = DEFAULT_FLAGS) {
		this._expectPropertyType(PropertyType.PT_SYSTIME, tag.type)
		this._addProperty(tag, dateToFileTime(value), flags)
	}

	addBinaryProperty(tag: PropertyTagsEnum,
					  data: Uint8Array,
					  flags: number = DEFAULT_FLAGS) {
		this._expectPropertyType(PropertyType.PT_BINARY, tag.type);
		this._addProperty(tag, data, flags)
	}

	// TODO use this internally, replace all calls to addProperty with methods that can actually be typechecked, maybe even make this typecheckable somehow
	_addProperty(tag: PropertyTagsEnum, value: any, flags: number): void {
		return this.addProperty(tag, value, flags)
	}

	/**
	 * @deprecated use typed addPropertyFunctions instead (or make one if it doesn't exist). replace this method with _addProperty and only use it internally
	 * @param tag
	 * @param value
	 * @param flags
	 */
	addProperty(
		tag: PropertyTagsEnum,
		value: any,
		flags: number = DEFAULT_FLAGS
	): void {
		if (value == null) return
		let data = new Uint8Array(0)
		let view
		switch (tag.type) {
			case PropertyType.PT_APPTIME:
				data = new Uint8Array(8)
				view = new DataView(data.buffer)
				view.setFloat64(0, value, true)
				break

			case PropertyType.PT_SYSTIME:
				data = new Uint8Array(8)
				view = new DataView(data.buffer)
				const {upper, lower} = bigInt64ToParts(value)
				view.setInt32(0, lower, true)
				view.setInt32(4, upper, true)
				break

			case PropertyType.PT_SHORT:
				data = new Uint8Array(2)
				view = new DataView(data.buffer)
				view.setInt16(0, value, true)
				break

			case PropertyType.PT_ERROR:
			case PropertyType.PT_LONG:
				data = new Uint8Array(4)
				view = new DataView(data.buffer)
				view.setInt32(0, value, true)
				break

			case PropertyType.PT_FLOAT:
				data = new Uint8Array(4)
				view = new DataView(data.buffer)
				view.setFloat32(0, value, true)
				break

			case PropertyType.PT_DOUBLE:
				data = new Uint8Array(8)
				view = new DataView(data.buffer)
				view.setFloat64(0, value, true)
				break

			//case PropertyType.PT_CURRENCY:
			//    data = (byte[]) obj
			//    break

			case PropertyType.PT_BOOLEAN:
				data = Uint8Array.from([value ? 1 : 0])
				break

			case PropertyType.PT_I8:
				// TODO:
				throw new Error("PT_I8 property type is not supported (64 bit ints)!")
			// data = BitConverter.GetBytes((long)obj)

			case PropertyType.PT_UNICODE:
				data = stringToUtf16LeArray(value)
				break;

			case PropertyType.PT_STRING8:
				data = stringToAnsiArray(value)
				break

			case PropertyType.PT_CLSID:
				// GUIDs should be Uint8Arrays already
				data = value
				break;

			case PropertyType.PT_BINARY:
				// TODO: make user convert object to Uint8Array and just assign.
				if (value instanceof Uint8Array) {
					data = value
					break
				}
				const objType = typeof value

				switch (objType) {
					case "boolean":
						data = Uint8Array.from(value)
						break
					case "string":
						data = stringToUtf8Array(value)
						break
					default:
						throw new Error(`PT_BINARY property of type '${objType}' not supported!`)
				}
				break
			case PropertyType.PT_NULL:
				break
			case PropertyType.PT_ACTIONS:
				throw new Error("PT_ACTIONS property type is not supported")
			case PropertyType.PT_UNSPECIFIED:
				throw new Error("PT_UNSPECIFIED property type is not supported")
			case PropertyType.PT_OBJECT:
				// TODO: Add support for MSG
				break
			case PropertyType.PT_SVREID:
				throw new Error("PT_SVREID property type is not supported")
			case PropertyType.PT_SRESTRICT:
				throw new Error("PT_SRESTRICT property type is not supported")
			default:
				throw new Error("type is out of range!")
		}

		this.push(new Property({
			id: tag.id,
			type: tag.type,
			flags,
			data
		}))
	}

	/**
	 * writes the properties structure to a cfb stream in storage
	 * @param storage
	 * @param prefix a function that will be called with the buffer before the properties get written to it.
	 * @param messageSize
	 * @returns {number}
	 */
	writeProperties(storage: CFBStorage, prefix: ByteBuffer=> void, messageSize?: number): number {
		const buf = makeByteBuffer()
		prefix(buf)
		let size = 0

		// The data inside the property stream (1) MUST be an array of 16-byte entries. The number of properties,
		// each represented by one entry, can be determined by first measuring the size of the property stream (1),
		// then subtracting the size of the header from it, and then dividing the result by the size of one entry.
		// The structure of each entry, representing one property, depends on whether the property is a fixed length
		// property or not.
		for (let property of this) {
			// property tag: A 32-bit value that contains a property type and a property ID. The low-order 16 bits
			// represent the property type. The high-order 16 bits represent the property ID.
			buf.writeUint16(property.type) // 2 bytes
			buf.writeUint16(property.id) // 2 bytes
			buf.writeUint32(property._flags) // 4 bytes
			switch (property.type) {
				//case PropertyType.PT_ACTIONS:
				//    break

				case PropertyType.PT_I8:
				case PropertyType.PT_APPTIME:
				case PropertyType.PT_SYSTIME:
				case PropertyType.PT_DOUBLE:
					buf.append(property._data)
					break

				case PropertyType.PT_ERROR:
				case PropertyType.PT_LONG:
				case PropertyType.PT_FLOAT:
					buf.append(property._data)
					buf.writeUint32(0)
					break

				case PropertyType.PT_SHORT:
					buf.append(property._data)
					buf.writeUint32(0)
					buf.writeUint16(0)
					break

				case PropertyType.PT_BOOLEAN:
					buf.append(property._data)
					buf.append(new Uint8Array(7))
					break

				//case PropertyType.PT_CURRENCY:
				//    binaryWriter.Write(property.Data)
				//    break

				case PropertyType.PT_UNICODE:
					// Write the length of the property to the propertiesstream
					buf.writeInt32(property._data.length + 2)
					buf.writeUint32(0)
					storage.addStream(property.name(), property._data)
					size += property._data.length
					break

				case PropertyType.PT_STRING8:
					// Write the length of the property to the propertiesstream
					buf.writeInt32(property._data.length + 1)
					buf.writeUint32(0)
					storage.addStream(property.name(), property._data)
					size += property._data.length
					break

				case PropertyType.PT_CLSID:
					buf.append(property._data)
					break

				//case PropertyType.PT_SVREID:
				//    break

				//case PropertyType.PT_SRESTRICT:
				//    storage.AddStream(property.Name).SetData(property.Data)
				//    break

				case PropertyType.PT_BINARY:
					// Write the length of the property to the propertiesstream
					buf.writeInt32(property._data.length)
					buf.writeUint32(0)
					storage.addStream(property.name(), property._data)
					size += property._data.length
					break

				case PropertyType.PT_MV_SHORT:
					break
				case PropertyType.PT_MV_LONG:
					break

				case PropertyType.PT_MV_FLOAT:
					break

				case PropertyType.PT_MV_DOUBLE:
					break

				case PropertyType.PT_MV_CURRENCY:
					break

				case PropertyType.PT_MV_APPTIME:
					break

				case PropertyType.PT_MV_LONGLONG:
					break

				case PropertyType.PT_MV_UNICODE:
					// PropertyType.PT_MV_TSTRING
					break

				case PropertyType.PT_MV_STRING8:
					break

				case PropertyType.PT_MV_SYSTIME:
					break

				//case PropertyType.PT_MV_CLSID:
				//    break

				case PropertyType.PT_MV_BINARY:
					break

				case PropertyType.PT_UNSPECIFIED:
					break

				case PropertyType.PT_NULL:
					break

				case PropertyType.PT_OBJECT:
					// TODO: Adding new MSG file
					break
			}
		}

		if (messageSize != null) {
			buf.writeUint16(PropertyTags.PR_MESSAGE_SIZE.type)  // 2 bytes
			buf.writeUint16(PropertyTags.PR_MESSAGE_SIZE.id)    // 2 bytes
			buf.writeUint32(PropertyFlag.PROPATTR_READABLE | PropertyFlag.PROPATTR_WRITABLE) // 4 bytes
			buf.writeUint64(messageSize + size + 8)
			buf.writeUint32(0)
		}

		// Make the properties stream
		size += buf.offset
		storage.addStream(PropertyTagLiterals.PropertiesStreamName, byteBufferAsUint8Array(buf))
		// if(!storage.TryGetStream(PropertyTags.PropertiesStreamName, out var propertiesStream))
		// propertiesStream = storage.AddStream(PropertyTags.PropertiesStreamName);
		// TODO: is this the written length?
		return size
	}
}