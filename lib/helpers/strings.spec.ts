import o from "ospec"
import {Strings} from "./strings"
import fs from "fs"
// big list of naughty strings converted with MsgKit
const inStrings = JSON.parse(fs.readFileSync("test/blns.json", {encoding: "utf8"}))
const outStrings = JSON.parse(fs.readFileSync("test/blns.out.json", {encoding: "utf8"}))
const suite = inStrings.map((s, i) => ({
    label: i.toString(),
    pre: s,
    post: outStrings[i],
}))
const tests = [
    {
        label: "ansi",
        pre: "Hello World",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 Hello World }}",
    },
    {
        label: "ascii",
        pre: "°^â",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 \\'b0^\\'e2 }}",
    },
    {
        label: "escaped rtf chars",
        pre: "{}\\",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 \\{\\}\\\\ }}",
    },
    {
        label: "unicode",
        // contains unicode vegetable
        pre: "TEST 🍆 € ￥ TEST",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 TEST \\u55356?\\u57158? \\u8364? \\u65509? TEST }}",
    },
]
o.spec("Strings", function () {
    tests.concat(suite).forEach(t => {
        o(t.label, function () {
            o(Strings.escapeRtf(t.pre)).equals(t.post)
        })
    })
})