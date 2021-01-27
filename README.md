# oxmsg

write Microsoft .msg Outlook Item files.

## MSG Outlook Items
These are compound files in cfb format, which is a simplified 
filesystem-in-a-file with directories (called storages) and files (called streams).

msg can contain outlook appointments and emails, they consist of a property stream in the top-level storage and several
sub-storages (ie for attachments).

Streams contain either raw data or a list of Properties of 16 bytes each. 
Properties consist of a 2 byte type (binary, boolean, long etc), 2 byte id (usage), 4 bytes of flags and 8 bytes of value.
Property tags (the first 4 bytes of a property) are defined in `lib/property_tags.js`.

## MsgKit
[MsgKit](https://github.com/Sicos1977/MsgKit) is the C# library oxmsg was based on. 

### Emails
When creating a new Email instance, oxmsg will prepare the data structure to store all attributes, 
like a list of attachments, a list of recipients, and so on. These can be filled by adding the items to the Email object.

The final .msg will be created by calling .msg() on the Email, at which point the Email object will serialize itself into 
a cfb compound file provided by [`cfb`](https://www.npmjs.com/package/cfb), which is then written to an Uint8Array.
Example usage in examples/node.js.

### Appointments
MsgKit also supports exporting Outlook Appointments to msg, but those parts are not translated yet.

## TODO
- The library currently works in node, but could be made to work in the browser if it's shrunk and the dependencies that rely on node Buffers are replaced (mainly the parsers in lib/mime/header/ that use iconv-lite). BigInt would need to be polyfilled and bigint literals removed
- it would probably be good to generate/provide an `index.d.ts` type definition file, which should not be too hard since the actual API surface is tiny.
- The library has the capability to parse email headers if that should be necessary (`lib/mime/header/`), but that's not
done yet.
- There's also code to read .msg files into an Email object that's not useful yet

The next steps would include using the library to export mails and figure out if the api makes sense and if the timestamps match expectations.

## Docs & Tools

- [OxMsg Spec](https://interoperability.blob.core.windows.net/files/MS-OXMSG/%5bMS-OXMSG%5d.pdf)
- [CFB Spec](https://winprotocoldoc.blob.core.windows.net/productionwindowsarchives/MS-CFB/%5bMS-CFB%5d.pdf)

### CFB viewer
[online cfb viewer](https://oss.sheetjs.com/cfb-editor/#/cfb-editor/)

This online tool (made by the developers of the `cfb` library) shows the contents of a .msg file, consisting of all storages with their names, and streams with their contents (in hex and ASCII).

### Comparer
`examples/comparer.js` is a small utility that takes two cfb files and shows the differences between them. It will show streams/storages that are contained in only one of them, and if the element is contained in both but has different contents, it will show the difference.

Example (run with `-a` after the files to compare to show identical elements as well): 
```
$ node examples/comparer.js test/testOut_attach.msg test/msgKitOut_attach.msg -a

MISSING: 4 Root Entry/Sh33tJ5 not in /home/nils/Projects/repositories/oxmsg/test/msgKitOut_attach.msg
tag: undefined
0000: 37 32 36 32
7262

SAME: size: 38 Root Entry/__substg1.0_0E1D001F
tag: PR_NORMALIZED_SUBJECT_W

DIFFERENCE: 72:72 Root Entry/__substg1.0_0FFF0102 type 2
tag: PR_ENTRYID
test/testOut_attach.msg                               || test/msgKitOut_attach.msg
no tag                                                || no tag                                               
0000: 65 00 65 00 36 00 62 00 30 00 34 00 35 00 62 00 || 64 00 35 00 66 00 62 00 36 00 38 00 61 00 35 00
no tag                                                || no tag                                               
0010: 2d 00 61 00 31 00 64 00 63 00 2d 00 34 00 64 00 || 2d 00 30 00 37 00 37 00 66 00 2d 00 34 00 63 00
no tag                                                || no tag                                               
0020: 38 00 62 00 2d 00 38 00 34 00 31 00 65 00 2d 00 || 36 00 66 00 2d 00 38 00 66 00 66 00 31 00 2d 00
no tag                                                || no tag                                               
0030: 63 00 34 00 35 00 36 00 38 00 39 00 63 00 37 00 || 38 00 61 00 34 00 38 00 35 00 32 00 39 00 37 00
no tag                                                || no tag                                               
0040: 63 00 36 00 36 00 33 00                         || 30 00 63 00 31 00 61 00
ee6b045b-a1dc-4d8b-841e-c45689c7c663
d5fb68a5-077f-4c6f-8ff1-8a4852970c1a

DIFFERENCE: 644:644 Root Entry/__properties_version1.0 type 2
tag: undefined
test/testOut_attach.msg                               || test/msgKitOut_attach.msg
PR_CLIENT_SUBMIT_TIME                                 || PR_CLIENT_SUBMIT_TIME                                
00c0: 40 00 39 00 06 00 00 00 00 00 00 00 00 00 00 00 || 40 00 39 00 06 00 00 00 00 3f cf 4e 90 4d d2 01
PR_CREATION_TIME                                      || PR_CREATION_TIME                                     
0140: 40 00 07 30 06 00 00 00 00 00 00 00 00 00 00 00 || 40 00 07 30 06 00 00 00 9c 93 95 53 cc ce d6 01
PR_LAST_MODIFICATION_TIME                             || PR_LAST_MODIFICATION_TIME                            
0150: 40 00 08 30 06 00 00 00 00 00 00 00 00 00 00 00 || 40 00 08 30 06 00 00 00 9c 93 95 53 cc ce d6 01
no tag                                                || no tag                                               
0270: 03 00 08 0e 06 00 00 00 00 00 00 00 00 00 00 00 || 03 00 08 0e 06 00 00 00 64 fa 03 00 00 00 00 00
4848

    ????
        @9???7((=p(@00? 
```
This is part of the result of comparing MsgKit Output and oxmsg output with the same contents.
- It's reporting that the stream `Root Entry/Sh33tJ` is in the oxmsg output, but not added by MsgKit (that's a "maker's mark" added by the devs of `cfb` that doesn't impact functionality). The `4` means that the stream contains 4 bytes, `tag: undefined` means that there's no meaningful part of a .msg file associated with the stream name and `0000: 37 32 36 32` | `7262` are the contents of the stream in hex and ascii. `type 2` just means it's a stream and not a storage.
- The stream `Root Entry/__substg1.0_0E1D001F` is contained in both files and identical. Its name is associated with the property tag `PR_NORMALIZED_SUBJECT_W` (which can be searched in the code to find out about it) and 38 bytes long.
- `Root Entry/__substg1.0_0FFF0102` is contained in both, but different. `72:72` means that both streams are 72 bytes long (if they don't have the same length, it's likely that the content listing below won't line up). The name is associated with `PR_ENTRYID` which, if looked up in `lib/property_tags.js`, contains binary data (a GUID in ascii, to be precise, which should be different).
- `Root Entry/__properties_version1.0` is the top-level properties stream, which doesn't have an associated property tag. It contains several different properties that are different. The `PR_CLIENT_SUBMIT_TIME` property at offset `00c0` is different between the two files (`oxmsg` set it to 0), as is the creation time and the last modification time. The property at `0270` is a checksum at the end of the stream.
