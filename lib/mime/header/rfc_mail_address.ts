import * as rfc2822Parser from "address-rfc2822"
import type {MailAddress} from "address-rfc2822"
import {splitAtUnquoted} from "../../utils/utils"
import {decode as decodeRfc2047} from "./rfc2047"
// This class is used for RFC compliant email addresses.
// The class cannot be instantiated from outside the library.
// The MailAddress does not cover all the possible formats
// for RFC 5322 section 3.4 compliant email addresses.
// This class is used as an address wrapper to account for that deficiency.
export class RfcMailAddress {
    // A string representation of the <see cref="RfcMailAddress" /> object
    // <returns>Returns the string representation for the object</returns>
    toString(): string {
        if (!!this.mailAddress && this.hasValidMailAddress()) return this.mailAddress.format()
        else return this.raw
    }

    ///     The email address of this <see cref="RfcMailAddress" /><br />
    ///     It is possibly string.Empty since RFC mail addresses does not require an email address specified.
    ///     Example header with email address:<br />
    ///     To: <c>Test test@mail.com</c><br />
    ///     Address will be <c>test@mail.com</c><br />
    ///     Example header without email address:<br />
    ///     To: <c>Test</c><br />
    ///     Address will be <see cref="string.Empty" />.
    address: string
    ///     The display name of this <see cref="RfcMailAddress" /><br />
    ///     It is possibly <see cref="string.Empty" /> since RFC mail addresses does not require a display name to be
    ///     specified.
    //
    ///     Example header with display name:<br />
    ///     To: <c>Test test@mail.com</c><br />
    ///     DisplayName will be <c>Test</c>
    //
    ///     Example header without display name:
    ///     To: <c>test@test.com</c>
    ///     DisplayName will be ""
    displayName: string
    // This is the Raw string used to describe the RfcMailAddress
    raw: string
    ///     The mailAddress associated with the rfcMailAddress
    ///     The value of this property can be null in instances where the mailAddress
    ///     represent the address properly.
    ///     Use hasValidMailAddress property to see if this property is valid.
    mailAddress: MailAddress | null | undefined

    /// <summary>
    ///     Specifies if the object contains a valid <see cref="MailAddress" /> reference.
    /// </summary>
    hasValidMailAddress(): boolean {
        return this.mailAddress != null
    }

    /// <summary>
    ///     Constructs an <see cref="RfcMailAddress" /> object from a <see cref="MailAddress" /> object.<br />
    ///     This constructor is used when we were able to construct a <see cref="MailAddress" /> from a string.
    /// </summary>
    /// <param name="mailAddress">The address that <paramref name="raw" /> was parsed into</param>
    /// <param name="raw">The raw unparsed input which was parsed into the <paramref name="mailAddress" /></param>
    /// <exception cref="ArgumentNullException">
    ///     If <paramref name="mailAddress" /> or <paramref name="raw" /> is
    ///     <see langword="null" />
    /// </exception>
    constructor(mailAddress: MailAddress | null | undefined, raw: string) {
        if (!raw) throw new Error("raw is null!")
        this.mailAddress = mailAddress
        this.raw = raw

        if (!mailAddress) {
            this.address = ""
            this.displayName = raw
        } else {
            this.address = mailAddress.address
            this.displayName = mailAddress.name()
        }
    }

    ///     Parses an email address from a MIME header<br />
    ///     <br />
    ///     Examples of input:
    ///     <c>Eksperten mailrobot &lt;noreply@mail.eksperten.dk&gt;</c><br />
    ///     <c>"Eksperten mailrobot" &lt;noreply@mail.eksperten.dk&gt;</c><br />
    ///     <c>&lt;noreply@mail.eksperten.dk&gt;</c><br />
    ///     <c>noreply@mail.eksperten.dk</c><br />
    ///     It might also contain encoded text, which will then be decoded.
    /// <param name="input">The value to parse out and email and/or a username</param>
    /// <returns>A <see cref="RfcMailAddress" /></returns>
    /// <exception cref="ArgumentNullException">If <paramref name="input" /> is <see langword="null" /></exception>
    //
    ///     <see href="http://tools.ietf.org/html/rfc5322#section-3.4">RFC 5322 section 3.4</see> for more details on email
    ///     syntax.<br />
    ///     <see cref="EncodedWord.Decode">For more information about encoded text</see>.
    static parseMailAddress(input: string): RfcMailAddress {
        if (input == null) throw new Error("input was null!")
        input = decodeRfc2047(input.trim())
        //Remove any redundant sets of angle brackets around the email address
        const lastOpenAngleBracketIdx = input.lastIndexOf("<")
        const lastCloseAngleBracketIdx = input.lastIndexOf(">")
        //Find the index of the first angle bracket in this series of angle brackets, e.g "a>b" <<blah@email.com>> wouldn't find the angle bracket in the display name
        let firstOpenAngleBracketIdx = lastOpenAngleBracketIdx
        let firstCloseAngleBracketIdx = lastCloseAngleBracketIdx

        while (
            firstOpenAngleBracketIdx > 0 && //There is a character before the last open angle bracket
            input[firstOpenAngleBracketIdx - 1] === "<" && //The character before the last open angle bracket is another open angle bracket
            input[firstCloseAngleBracketIdx - 1] === ">" //The character before the last close angle bracket is another close angle bracket
        ) {
            //Update the first angle bracket indices
            firstOpenAngleBracketIdx--
            firstCloseAngleBracketIdx--
        }

        //If the email address in the input string is enclosed in multiple angle brackets
        if (firstOpenAngleBracketIdx !== lastOpenAngleBracketIdx) {
            //Part before any angle brackets (display name if there is one)
            const dpn = input.substring(0, firstOpenAngleBracketIdx)
            //actual email address, including one angle bracket either side
            const ma = input.substring(lastOpenAngleBracketIdx, firstCloseAngleBracketIdx + 1)
            input = dpn + ma
        }

        try {
            const result = rfc2822Parser.parse(input)[0]
            return new RfcMailAddress(result, input)
        } catch (e) {
            // It could be that the format used was simply a name
            // which is indeed valid according to the RFC
            // Example:
            // Eksperten mailrobot
        }

        return new RfcMailAddress(null, input)
    }

    //     Parses input of the form<br />
    //     <c>Eksperten mailrobot &lt;noreply@mail.eksperten.dk&gt;, ...</c><br />
    //     to a list of RFCMailAddresses
    // <param name="input">The input that is a comma-separated list of EmailAddresses to parse</param>
    // <returns>A List of RfcMailAddress objects extracted from the input parameter.</returns>
    // <exception cref="ArgumentNullException">If <paramref name="input" /> is <see langword="null" /></exception>
    static parseMailAddresses(input: string): Array<RfcMailAddress> {
        if (input == null) throw new Error("input is null!")
        return splitAtUnquoted(input, ",").map(RfcMailAddress.parseMailAddress)
    }
}