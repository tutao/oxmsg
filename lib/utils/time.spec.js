import o from "ospec/ospec.js"
import * as time from "./time"
import {dateToFileTime, FILE_TIME_UNIX_EPOCH_DIFF_MS, fileTimeToDate, MS_TO_100_NS} from "./time"

o.spec("time", function () {
	o.only("test round trip", function () {
		let dates = [
			new Date(Date.parse("01 Jan 1601 00:00:00 UTC")),
			new Date(Date.parse("04 Feb 1962 01:02:03 UTC")),
			new Date(Date.parse("20 Apr 1969 00:00:00 UTC")),
			new Date(Date.parse("01 Jan 1970 00:00:00 UTC")),
			new Date(Date.parse("31 Dec 1999 23:59:59 UTC")),
			new Date(Date.parse("23 Aug 2013 11:11:11 UTC")),
			new Date(Date.parse("25 Jan 2021 16:44:00 UTC")),
			new Date(Date.parse("08 Jun 2029 12:21:10 UTC")),
			new Date(Date.parse("01 Jan 3000 00:00:00 UTC")),
			new Date()
		]

		for (let date of dates) {
			const fileTime = dateToFileTime(date)
			const roundTripDate = fileTimeToDate(fileTime)
			o(roundTripDate).deepEquals(date)
		}
	})

	o.only("fileTimeToDate", function () {
		const fileTimeZeroDate = fileTimeToDate(0n)
		o(fileTimeZeroDate.getTime()).equals(-Number(FILE_TIME_UNIX_EPOCH_DIFF_MS))

		const unixTimeZeroDate = fileTimeToDate(FILE_TIME_UNIX_EPOCH_DIFF_MS * MS_TO_100_NS)
		o(unixTimeZeroDate.getTime()).equals(0)
	})

	o.only("dateToFileTime", function () {
		const fileTimeZero = dateToFileTime(new Date(-Number(FILE_TIME_UNIX_EPOCH_DIFF_MS)))
		o(fileTimeZero).deepEquals(0n)

		const unixTimeZero = dateToFileTime(new Date(0))
		o(unixTimeZero).deepEquals(FILE_TIME_UNIX_EPOCH_DIFF_MS * MS_TO_100_NS)

	})
})