// @flow
/** https://stackoverflow.com/a/15550284
 * Convert a Microsoft OADate to ECMAScript Date
 * Treat all values as local.
 * OADate = number of days since 30 dec 1899 as a double value
 * @param {string|number} oaDate - OADate value
 * @returns {Date}
 */
export function oADateToDate(oaDate: number): Date {
	// Treat integer part as whole days
	const days = parseInt(oaDate)
	// Treat decimal part as part of 24hr day, always +ve
	const ms = Math.abs((oaDate - days) * 8.64e7)
	// Add days and add ms
	return new Date(1899, 11, 30 + days, 0, 0, 0, ms)
}


/** https://stackoverflow.com/a/15550284
 * Convert an ECMAScript Date to a Microsoft OADate
 * Treat all dates as local.
 * @param {Date} date - Date to convert
 * @returns {Date}
 */
export function dateToOADate(date: Date): number {
	const temp = new Date(date)
	// Set temp to start of day and get whole days between dates,
	const days = Math.round((temp.setHours(0, 0, 0, 0) - new Date(1899, 11, 30)) / 8.64e7)
	// Get decimal part of day, OADate always assumes 24 hours in day
	const partDay = (Math.abs((date - temp) % 8.64e7) / 8.64e7)//.toFixed(10)
	return days + partDay//.substr(1)
}

// Date: milliseconds since 1. January 1970 (UTC)
// FileTime: unsigned 64 Bit, 100ns units since 1. January 1601 (UTC)
// ms between 01.01.1970 and 01.01.1601: 11644473600
export function fileTimeToDate(fileTimeLower: number, fileTimeUpper: number): Date {
	const filetime = BigInt(fileTimeLower) + BigInt(fileTimeUpper) * BigInt(2 ** 32)
	const filetimeMillis = filetime / BigInt(10000)
	const unixtime = filetimeMillis - BigInt(11644473600)
	return new Date(Number(unixtime))
}

export function dateToFileTime(date: Date): { fileTimeLower: number, fileTimeUpper: number } {
	// TODO this was also using bigints
	const unixtime = date.getTime()
	const filetime = BigInt(unixtime) + BigInt(11644473600) * BigInt(10000)
	const fileTimeLower = Number(filetime) & Number.MAX_SAFE_INTEGER
	const fileTimeUpper = Number(filetime) / (2 ** 32)
	return {fileTimeLower, fileTimeUpper}
}