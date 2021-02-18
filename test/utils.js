// @flow

export function uint8ToBase16(u8Arr: Uint8Array | Array<number>): string {
	return Buffer.from(u8Arr).toString('hex')
}