export function uint8ToBase16(u8Arr) {
    return Buffer.from(u8Arr).toString('hex')
}