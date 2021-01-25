import o from "ospec/ospec.js"
import * as time from "./time"
import {dateToFileTime, fileTimeToDate} from "./time"

o.spec("time", function () {
	o.only("test round trip", function () {
		let dates = [
			new Date(Date.parse("01 Jan 1970 00:00:00 UTC")),
			new Date(Date.parse("01 Jan 1601 00:00:00 UTC")),
			new Date(Date.parse("25 Jan 2021 16:44:00 UTC")),
			new Date(Date.parse("31 Dec 1999 23:59:59 UTC")),
			new Date()
		]

		for (let date of dates) {
			const {lower, upper} = dateToFileTime(date)
			const roundTripDate = fileTimeToDate(lower, upper)
			o(roundTripDate).deepEquals(date)
		}
	})

	o.only("fileTimeToDate", function () {
		const fileTimeZeroDate = fileTimeToDate(0, 0)
		o(fileTimeZeroDate.getTime()).equals(-11644473600)


	})

	o.only("dateToFileTime", function () {
		const fileTimeZero = dateToFileTime(new Date(-11644473600))
		o(fileTimeZero).deepEquals({lower: 0, upper: 0})

	})
})