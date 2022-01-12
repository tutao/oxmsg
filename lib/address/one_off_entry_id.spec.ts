import o from "ospec"
import {OneOffEntryId} from "./one_off_entry_id"
import {uint8ToBase16} from "../../test/utils"
o.spec("OneOffEntryId", function () {
    o("test value serialization", function () {
        const ooei = new OneOffEntryId("peterpan@neverland.com", "", "SMTP", 2, false)
        const buf = ooei.toByteArray()
        const expect = (
            "00000000812b1fa4bea310199d6e00dd" +
            "010f5402000001e87000650074006500" +
            "7200700061006e0040006e0065007600" +
            "650072006c0061006e0064002e006300" +
            "6f006d00000053004d00540050000000" +
            "70006500740065007200700061006e00" +
            "40006e0065007600650072006c006100" +
            "6e0064002e0063006f006d000000"
        ).match(/.{1,2}/g)
        const actual = uint8ToBase16(buf).match(/.{1,2}/g)
        o(actual.length).equals(expect.length)
        expect.map((b, i) => o(actual[i]).equals(b)("at byte " + i))
    })
})