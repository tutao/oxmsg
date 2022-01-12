/**
 * Class that holds information about one "Received:" header line.
 * Visit these RFCs for more information:
 * RFC 5321 section 4.4
 * RFC 4021 section 3.6.7
 * RFC 2822 section 3.6.7
 * RFC 2821 section 4.4
 */
export class Received {
    ///     The date of this received line.
    ///     Is <see cref="DateTime.MinValue" /> if not present in the received header line.
    date: number // TODO: DateTime

    ///     A dictionary that contains the names and values of the
    ///     received header line.<br />
    ///     If the received header is invalid and contained one name
    ///     multiple times, the first one is used and the rest is ignored.
    //
    ///     If the header lines looks like:
    ///     <code>
    /// from sending.com (localMachine [127.0.0.1]) by test.net (Postfix)
    /// </code>
    ///     then the dictionary will contain two keys: "from" and "by" with the values
    ///     "sending.com (localMachine [127.0.0.1])" and "test.net (Postfix)".$
    names: Record<string, string>
    ///     The raw input string that was parsed into this class.
    raw: string

    ///     Parses a Received header value.
    /// </summary>
    /// <param name="headerValue">The value for the header to be parsed</param>
    /// <exception cref="ArgumentNullException">
    ///     <exception cref="ArgumentNullException">If <paramref name="headerValue" /> is <see langword="null" /></exception>
    /// </exception>
    constructor(headerValue: string) {
        if (headerValue == null) throw new Error("headerValue must be a string!")
        this.raw = headerValue
        this.date = 0

        if (headerValue.includes(";")) {
            const semiIdx = headerValue.lastIndexOf(";")
            const datePart = headerValue.substring(semiIdx + 1)
            this.date = Date.parse(datePart)
        }

        this.names = Received.parseValue(headerValue)
    }

    /**
     * Parses the Received header name-value-list into a dictionary.
     * @param headerValue {string} The full header value for the Received header
     * @returns {{[string]: string}}
     */
    static parseValue(headerValue: string): Record<string, string> {
        const dict = {}
        const semiIdx = headerValue.lastIndexOf(";")
        headerValue = headerValue.replace(/\s+/, " ")
        const headerValueWithoutDate = semiIdx > -1 ? headerValue.substring(0, semiIdx) : headerValue
        // The regex below should capture the following:
        // The name consists of non-whitespace characters followed by a whitespace and then the value follows.
        // There are multiple cases for the value part:
        //   1: Value is just some characters not including any whitespace
        //   2: Value is some characters, a whitespace followed by an unlimited number of
        //      parenthesized values which can contain whitespaces, each delimited by whitespace
        //
        // Cheat sheet for regex:
        // \s means every whitespace character
        // [^\s] means every character except whitespace characters
        // +? is a non-greedy equivalent of +
        //const string pattern = @"(?<name>[^\s]+)\s(?<value>[^\s]+(\s\(.+?\))*)";
        const pattern = /(?<name>[^\s]+)\s(?<value>[^\s]+(\s\(.+?\))*)/
        // Find each match in the string
        const matches = headerValueWithoutDate.matchAll(pattern)

        for (let match of matches) {
            // Add the name and value part found in the matched result to the dictionary
            if (match.groups == null) throw new Error("unreachable!")
            const name = match.groups["name"]
            const value = match.groups["value"]
            // Check if the name is really a comment.
            // In this case, the first entry in the header value
            // is a comment
            if (name.startsWith("(")) continue
            // Only add the first name pair
            // All subsequent pairs are ignored, as they are invalid anyway
            if (dict[name] != null) continue
            dict[name] = value
        }

        return dict
    }
}