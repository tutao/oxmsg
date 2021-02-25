import o from "ospec/ospec.js"
import * as time from "./time"
import {dateToFileTime, fileTimeToDate} from "./time"

o.spec("time", function () {

	const dateAndLabel = dateStr => [new Date(Date.parse(dateStr)), dateStr]
	const filetimeDateMap = [
		[0n, ...dateAndLabel("1601-01-01T00:00:00")],
		[116444736000000000n, ...dateAndLabel("1970-01-01T00:00:00")],
		[132586423320000000n, ...dateAndLabel("2021-02-24T12:12:12")],
		[124155180000000000n, ...dateAndLabel("1994-06-08T03:00:00")],
		[132533279990000000n, ...dateAndLabel("2020-12-24T23:59:59")],
		[125690437230000000n, ...dateAndLabel("1999-04-20T01:02:03")],
	]

	o("fileTimeToDate", function () {
		for (let [fileTime, date, label] of filetimeDateMap) {
			const result = fileTimeToDate(fileTime);
			o(result.getTime()).equals(date.getTime())(`fileTimeToDate(${fileTime}) = ${result.toISOString()}, expected: ${label}`)
		}
	})

	o("dateToFileTime", function () {
		for (let [fileTime, date, label] of filetimeDateMap) {
			const result = dateToFileTime(date);
			o(result).equals(fileTime)(`dateToFileTime(${date.toISOString()}) = ${result}, expected: ${fileTime}`)
		}
	})
})