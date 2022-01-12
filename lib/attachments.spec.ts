import o from "ospec"
import {Attachments} from "./attachments"
import CFB from "cfb"
import {uint8ToBase16} from "../test/utils"
import {Attachment} from "./attachment"
import {Email} from "./email"
import {CFBStorage} from "./cfb_storage"

o.spec("Attachments", function () {
    o("attach an attachment", function () {
        const data = new Uint8Array(Buffer.from("0123456789"))
        const email = new Email()
        email.attach(new Attachment(data, "data.txt"))
        const storage = new CFBStorage()
        const attachments = new Attachments()
        attachments.attach(new Attachment(data, "data.txt"))
        attachments.writeToStorage(storage)
        const bytes = storage.toBytes()
        const cfb = CFB.read(bytes, {
            type: "binary",
        })
        const attachmentStream = CFB.find(cfb, "__substg1.0_37010102")?.content
        o(uint8ToBase16(data)).equals(uint8ToBase16(attachmentStream || []))
    })
})