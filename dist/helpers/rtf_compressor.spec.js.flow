import o from "ospec";
import {stringToUtf8Array} from "../utils/utils.js";

import {compress} from "./rtf_compressor.js";

import fs from "fs";

import {uint8ToBase16} from "../../test/utils.js";


// big list of naughty strings converted to escaped rtf
const inStrings = JSON.parse(fs.readFileSync('test/blns.out.json'))
// blns rtf compressed with MsgKit
const outStrings = JSON.parse(fs.readFileSync('test/blns.out.compressed.json'))


const suite = inStrings.map((s, i) => ({
	label: "rtf " + i.toString(),
	pre: stringToUtf8Array(s),
	post: Uint8Array.from(Buffer.from(outStrings[i], 'hex'))
}))

o.spec('RtfCompressor', function () {

	o("empty string", function () {
		const input = stringToUtf8Array("")
		const output = "0f000000000000004c5a467527d7ca10010cf0"
		o(uint8ToBase16(compress(input))).equals(output)
	})

	o("example 1 from spec", function () {
		const input = stringToUtf8Array("{\\rtf1\\ansi\\ansicpg1252\\pard hello world}\r\n")
		const output = "2d0000002b0000004c5a4675f1c5c7a703000a007263706731323542320af32068656c090020627705b06c647d0a800fa0"
		o(uint8ToBase16(compress(input))).equals(output)
	})

	o("example 2 from spec", function () {
		const input = stringToUtf8Array("{\\rtf1 WXYZWXYZWXYZWXYZWXYZ}")
		const output = "1a0000001c0000004c5a4675e2d44b51410004205758595a0d6e7d010eb0"
		o(uint8ToBase16(compress(input))).equals(output)
	})

	suite.forEach(t => {
		o(t.label, function () {
			o(uint8ToBase16(compress(t.pre))).equals(uint8ToBase16(t.post))
		})
	})
})