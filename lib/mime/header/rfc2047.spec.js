const o = require('ospec')
const rfc2047 = require('./rfc2047')

const expectEncoding = (input, output) => o(rfc2047.encode(input)).equals(output)
const expectDecoding = (input, output) => o(rfc2047.decode(input)).equals(output)
const expectRoundtrip = (input, output) => {
    expectEncoding(input, output)
    expectDecoding(output, input)
}

o.spec('rfc2047', function () {
    o.spec('#encode() and #decode()', function () {
        o('should handle the empty string', function () {
            expectRoundtrip('', '')
        })

        o('should handle a string only containing a space', function () {
            expectRoundtrip(' ', ' ')
        })

        o('should not encode an equals sign', function () {
            expectRoundtrip('=', '=')
        })

        o('should handle a string that does not need to be encoded', function () {
            expectRoundtrip(
                'Andreas Lind <andreas@one.com>',
                'Andreas Lind <andreas@one.com>'
            )
        })

        o('should handle a multi-word string where the middle word has to be encoded', function () {
            expectRoundtrip(
                'Andreas Lindø <andreas@one.com>',
                'Andreas =?utf-8?Q?Lind=C3=B8?= <andreas@one.com>'
            )
        })

        o('should use an UTF-8 encoded word when a character is not in iso-8859-1', function () {
            expectRoundtrip(
                'Mr. Smiley face aka ☺ <smiley@face.dk>',
                'Mr. Smiley face aka =?utf-8?Q?=E2=98=BA?= <smiley@face.dk>'
            )
        })

        o('should handle two neighbouring words that have to be encoded', function () {
            expectRoundtrip(
                '¡Hola, señor!',
                '=?utf-8?Q?=C2=A1Hola=2C?= =?utf-8?Q?_se=C3=B1or!?='
            )
            expectRoundtrip(
                'På lördag',
                '=?utf-8?Q?P=C3=A5?= =?utf-8?Q?_l=C3=B6rdag?='
            )
        })

        o('should not rely on the space between neighbouring encoded words to be preserved', function () {
            expectRoundtrip(
                '☺ ☺',
                '=?utf-8?Q?=E2=98=BA?= =?utf-8?Q?_=E2=98=BA?='
            )
        })

        o('should handle some dreamed up edge cases', function () {
            expectRoundtrip(
                'lördag',
                '=?utf-8?Q?l=C3=B6rdag?='
            )
        })

        o('should handle a multi-word string where the middle word has to be left unencoded', function () {
            expectRoundtrip(
                'Så er fødselen i gang',
                '=?utf-8?Q?S=C3=A5?= er =?utf-8?Q?f=C3=B8dselen?= i gang'
            )
        })

        o('should place leading quotes correctly', function () {
            expectRoundtrip(
                '"ÅÄÖ" <sss@example.com>',
                '"=?utf-8?Q?=C3=85=C3=84=C3=96?=" <sss@example.com>'
            )
        })

        o('should place trailing quotes correctly', function () {
            expectRoundtrip(
                '"TEST ÅÄÖ" <sss@example.com>',
                '"TEST =?utf-8?Q?=C3=85=C3=84=C3=96?=" <sss@example.com>'
            )
        })

        // Regression test for #2:
        o('should handle an emoji test case', function () {
            expectRoundtrip(
                '{"tags":"","fullName":"😬"}',
                '=?utf-8?Q?{=22tags=22=3A?=""=?utf-8?Q?=2C=22fullNa?= =?utf-8?Q?me=22=3A=22=F0=9F=98=AC=22?=}'
            )
        })

        o('should handle the replacement character', function () {
            expectRoundtrip(
                'test_�.docx',
                '=?utf-8?Q?test=5F=EF=BF=BD=2Ed?=ocx'
            )
        })
    })

    o.spec('#encode()', function () {
        o('should handle non-string values correctly', function () {
            expectEncoding(-1, '-1')
            expectEncoding(Infinity, 'Infinity')
            expectEncoding(false, 'false')
            expectEncoding(true, 'true')
            expectEncoding(/bla/, '/bla/')
            expectEncoding(undefined, '')
            expectEncoding(null, '')
        })

        o('should handle a tab character at the beginning of a word', function () {
            expectEncoding('\tfoo', ' foo')
        })

        o('should handle control chars', function () {
            expectEncoding('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f', '=?utf-8?Q?=00=01=02=03=04=05=06=07?= =?utf-8?Q?=08?=     =?utf-8?Q?_=0E=0F=10=11=12=13=14=15?= =?utf-8?Q?=16=17=18=19=1A=1B=1C=1D?= =?utf-8?Q?=1E=1F?='
            )
        })

        o('should handle a tab character at the end of a word', function () {
            expectEncoding('foo\t', 'foo ')
        })

        o('should handle a tab character with spaces around it', function () {
            expectEncoding('bar \t foo', 'bar   foo')
        })

        o('should not split a backslash from the doublequote it is escaping', function () {
            expectEncoding('"Öland\\""', '"=?utf-8?Q?=C3=96land?=\\""')
        })
    })

    o.spec('#decode()', function () {
        o('should handle non-string values correctly', function () {
            expectDecoding(-1, '-1')
            expectDecoding(Infinity, 'Infinity')
            expectDecoding(false, 'false')
            expectDecoding(true, 'true')
            expectDecoding(/bla/, '/bla/')
            expectDecoding(undefined, '')
            expectDecoding(null, '')
        })

        o('should decode encoded word with invalid quoted-printable, decodeURIComponent case', function () {
            expectDecoding('=?UTF-8?Q?=xxfoo?=', '=xxfoo')
        })

        o('should decode encoded word with invalid quoted-printable, unescape case', function () {
            expectDecoding('=?iso-8859-1?Q?=xxfoo?=', '=xxfoo')
        })

        o('should decode encoded word with invalid base64', function () {
            expectDecoding('=?iso-8859-1?B?\u0000``?=', '')
        })

        o('should decode separated encoded words', function () {
            expectDecoding(
                '=?utf-8?Q?One.com=E2=80?= =?utf-8?Q?=99s_=E2=80=9CDon=E2=80=99t_screw_it_up=E2=80=9D_?= =?utf-8?Q?code?=',
                'One.com’s “Don’t screw it up” code'
            )
        })

        o('should handle the test cases listed in RFC 2047', function () {
            expectDecoding(
                '=?ISO-8859-1?Q?Olle_J=E4rnefors?= <ojarnef@admin.kth.se>',
                'Olle Järnefors <ojarnef@admin.kth.se>'
            )
            expectDecoding(
                '=?ISO-8859-1?Q?Patrik_F=E4ltstr=F6m?= <paf@nada.kth.se>',
                'Patrik Fältström <paf@nada.kth.se>'
            )
            expectDecoding(
                'Nathaniel Borenstein <nsb@thumper.bellcore.com> (=?iso-8859-8?b?7eXs+SDv4SDp7Oj08A==?=)',
                'Nathaniel Borenstein <nsb@thumper.bellcore.com> (םולש ןב ילטפנ)'
            )
            expectDecoding('(=?ISO-8859-1?Q?a?=)', '(a)')
            expectDecoding('(=?ISO-8859-1?Q?a?= b)', '(a b)')
            expectDecoding('(=?ISO-8859-1?Q?a?= =?ISO-8859-1?Q?b?=)', '(ab)')
            expectDecoding('(=?ISO-8859-1?Q?a?=  =?ISO-8859-1?Q?b?=)', '(ab)')
            expectDecoding('(=?ISO-8859-1?Q?a_b?=)', '(a b)')
            expectDecoding('(=?ISO-8859-1?Q?a?= =?ISO-8859-2?Q?_b?=)', '(a b)')
        })

        o('should handle subject found in mail with X-Mailer: MailChimp Mailer', function () {
            expectDecoding(
                '=?utf-8?Q?Spar=2020=20%=20p=C3=A5=20de=20bedste=20businessb=C3=B8ger=20fra=20Gyldendal=21?=',
                'Spar 20 % på de bedste businessbøger fra Gyldendal!'
            )
            expectDecoding(
                '=?iso-8859-1?Q?Spar 20 %...?=',
                'Spar 20 %...'
            )
        })

        o('should handle multiple base64 encoded words issued by Thunderbird', function () {
            expectDecoding(
                '=?UTF-8?B?Rm9vw6YsIEZvbyDDpiwgw6bDuMOmw7jDpsO4w6bDuMOmw7jDpsO4LCA=?==?UTF-8?B?4pi6IE1y4pi6IOKYuuKYuuKYuuKYuuKYuuKYuuKYuuKYuuKYuuKYuuKYuuKYuuKYug==?= =?UTF-8?B?4pi64pi64pi64pi64pi64pi64pi6?=',
                'Fooæ, Foo æ, æøæøæøæøæøæø, ☺ Mr☺ ☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺'
            )
        })

        o('should handle two back-to-back UTF-8 encoded words from the subject in a raygun mail', function () {
            expectDecoding(
                '=?utf-8?B?d2VibWFpbCBwcm9kdWN0aW9uIC0gbmV3IGVycm9yIC0gR2XD?==?utf-8?B?p2Vyc2l6IGRlxJ9pxZ9rZW4u?=',
                'webmail production - new error - Geçersiz değişken.'
            )
        })

        o('should keep encoded words with partial sequences separate if there is text between them', function () {
            expectDecoding(
                '=?utf-8?B?d2VibWFpbCBwcm9kdWN0aW9uIC0gbmV3IGVycm9yIC0gR2XD?=foo=?utf-8?B?p2Vyc2l6IGRlxJ9pxZ9rZW4u?=',
                '=?utf-8?B?d2VibWFpbCBwcm9kdWN0aW9uIC0gbmV3IGVycm9yIC0gR2XD?=foo=?utf-8?B?p2Vyc2l6IGRlxJ9pxZ9rZW4u?='
            )
        })

        o('should decode a UTF-8 smiley (illegally) split up into 2 encoded words', function () {
            expectDecoding(
                '=?utf-8?Q?=E2=98?= =?utf-8?Q?=BA?=',
                '☺')
        })

        o('should decode a UTF-8 smiley (illegally) split up into 3 encoded words', function () {
            expectDecoding(
                '=?utf-8?Q?=E2?= =?utf-8?Q?=98?= =?utf-8?Q?=BA?=',
                '☺'
            )
        })

        o('should give up decoding a UTF-8 smiley (illegally) split up into 3 encoded words if there is regular text between the encoded words', function () {
            expectDecoding(
                '=?utf-8?Q?=E2?= =?utf-8?Q?=98?=a=?utf-8?Q?=BA?==?utf-8?Q?=BA?=a',
                '=?utf-8?Q?=E2?==?utf-8?Q?=98?=a=?utf-8?Q?=BA?==?utf-8?Q?=BA?=a'
            )
        })

        o('should decode an encoded word following a undecodable sequence of encoded words', function () {
            expectDecoding(
                '=?utf-8?Q?=E2?= =?utf-8?Q?=98?= =?iso-8859-1?Q?=A1?=Hola, se=?iso-8859-1?Q?=F1?=or!',
                '=?utf-8?Q?=E2?==?utf-8?Q?=98?=¡Hola, señor!'
            )
        })

        o('should handle test cases from the MIME tools package', function () {
            // From http://search.cpan.org/~dskoll/MIME-tools-5.502/lib/MIME/Words.pm:
            expectDecoding(
                '=?ISO-8859-1?Q?Keld_J=F8rn_Simonsen?= <keld@dkuug.dk>',
                'Keld Jørn Simonsen <keld@dkuug.dk>'
            )
            expectDecoding(
                '=?US-ASCII?Q?Keith_Moore?= <moore@cs.utk.edu>',
                'Keith Moore <moore@cs.utk.edu>'
            )
            expectDecoding(
                '=?ISO-8859-1?Q?Andr=E9_?= Pirard <PIRARD@vm1.ulg.ac.be>',
                'André  Pirard <PIRARD@vm1.ulg.ac.be>'
            )
            expectDecoding('=?iso-8859-1?Q?J=F8rgen_Nellemose?=', 'Jørgen Nellemose')
            expectDecoding(
                '=?ISO-8859-1?B?SWYgeW91IGNhbiByZWFkIHRoaXMgeW8=?==?ISO-8859-2?B?dSB1bmRlcnN0YW5kIHRoZSBleGFtcGxlLg==?==?US-ASCII?Q?.._cool!?=',
                'If you can read this you understand the example... cool!'
            )
        })

        o('should handle a file name found in a Korean mail', function () {
            expectDecoding(
                '=?ks_c_5601-1987?B?MTMwMTE3X8HWwvfA5V+1tcDlX7jetLq+8y5wZGY=?=',
                '130117_주차장_도장_메뉴얼.pdf'
            )
        })

        o('should handle bogus encoded words (spotted in the wild)', function () {
            expectDecoding('=?utf-8?Q??= <andreas@one.com>', ' <andreas@one.com>')
        })
    })
})