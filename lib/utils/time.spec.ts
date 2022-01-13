import o from "ospec/ospec.js"
import * as time from "./time.js"
import {dateToFileTime, fileTimeToDate} from "./time.js"

o.spec("time", function () {
    const dateAndLabel = dateStr => [new Date(Date.parse(dateStr)), dateStr]

    const filetimeDateMap = [
        [0n, ...dateAndLabel("01 Jan 1601 00:00:00 UTC")],
        [116444736000000000n, ...dateAndLabel("01 Jan 1970 00:00:00 UTC")],
        [132586423320000000n, ...dateAndLabel("24 Feb 2021 12:12:12 UTC")],
        [124155180000000000n, ...dateAndLabel("08 Jun 1994 03:00:00 UTC")],
        [132533279990000000n, ...dateAndLabel("24 Dec 2020 23:59:59 UTC")],
        [125690437230000000n, ...dateAndLabel("20 Apr 1999 01:02:03 UTC")],
    ]
    o("dateToFileTime", function () {
        for (let [fileTime, date, label] of filetimeDateMap) {
            const result = dateToFileTime(date)
            o(result).equals(fileTime)(`dateToFileTime(${date.toISOString()}) = ${result}, expected: ${fileTime}, difference:  ${result - fileTime}`)
        }
    })
    o("fileTimeToDate", function () {
        for (let [fileTime, date, label] of filetimeDateMap) {
            const result = fileTimeToDate(fileTime)
            o(result.getTime()).equals(date.getTime())(`fileTimeToDate(${fileTime}) = ${result.toISOString()}, expected: ${label}`)
        }
    })
})