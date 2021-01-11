import o from "ospec";

import {byteBufferAsUint8Array, fileNameToDosFileName, makeByteBuffer} from "./utils.js";

o.spec('utils', function () {

	o("makeByteBuffer", function () {
		const anotherBuf = makeByteBuffer(16)
		anotherBuf.writeUint64(123)
		anotherBuf.writeString("hello")
		o(anotherBuf.littleEndian).equals(true)
		o(makeByteBuffer(null).toDebug())
			.equals("<00>")
		o(makeByteBuffer().toDebug())
			.equals("<00>")
		o(makeByteBuffer(null, null).toDebug())
			.equals("<00>")
		o(makeByteBuffer(0, null).toDebug())
			.equals('<00>')
		o(() => makeByteBuffer(-1))
			.throws(Error)
		o(makeByteBuffer(null, anotherBuf).toDebug())
			.equals("7B 00 00 00 00 00 00 00 68 65 6C 6C 6F<00 00 00>")
		o(makeByteBuffer(null, anotherBuf).littleEndian)
			.equals(true)
	})

	o("byteBufferToUint8Array", function () {
		const buf = makeByteBuffer(16)
		buf.writeUint64(123)
		buf.writeString("hello")
		const arr = byteBufferAsUint8Array(buf)

		o(arr.toString()).equals("123,0,0,0,0,0,0,0,104,101,108,108,111")
		o(arr.length).equals(13)
		o(arr instanceof Uint8Array).equals(true)
	})

	o("fileNameToDosFileName", function () {
		o(fileNameToDosFileName("canvas.png")).equals("CANVAS.PNG")
		o(fileNameToDosFileName('somelongname.png')).equals("SOMELO~1.PNG")
		o(fileNameToDosFileName('somelongnamewithLongext.jpeg')).equals("SOMELO~1.JPE")
		o(fileNameToDosFileName('z12.stf.txt')).equals("Z12STF.TXT")
		o(fileNameToDosFileName('.jpeg')).equals(".JPE")
		o(fileNameToDosFileName('.png')).equals(".PNG")
		o(fileNameToDosFileName('blabla')).equals("BLABLA")
		o(fileNameToDosFileName('blablabla')).equals("BLABLA~1")
	})
})