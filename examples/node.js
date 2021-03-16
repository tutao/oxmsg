import fs from "fs";

import {Attachment, Email} from "../dist/oxmsg.js";

const email = new Email()
const attachment = new Attachment(Uint8Array.from(fs.readFileSync('./test/canvas.png')), 'canvas.png')

email.subject("This is the subject")
	 .bodyText("")
	 .bodyHtml("This is a message")
	 .to("crocodile@neverland.com")
	 .attach(attachment)
	 .sender("peterpan@neverland.com")
email.iconIndex = 0x00000103
const content = email.msg()


fs.writeFileSync('./test/testOut.msg', content)

// const {CFB} = require('../build/oxmsg.develop.js')
//
// const storageSorted = CFB.parse(content).FileIndex
// const testStorage = CFB.parse(fs.readFileSync('./test/test.msg')).FileIndex
//
// console.log(storageSorted, testStorage)

// const f = CFB.utils.cfb_new()
//
// const entry = CFB.utils.cfb_add(f, "/hello", Uint8Array.of(1, 2, 3, 4, 5, 6))
// const entry2 = CFB.utils.cfb_add(f, "some/deeper/nesting/going/on", Uint8Array.of(1,3,3,7))
// const entry3 = CFB.utils.cfb_add(f, "some/deeper/nesting/going/on", Uint8Array.of(1,3,3,8))
// console.log(entry, entry2, entry3)
// console.log(f)
