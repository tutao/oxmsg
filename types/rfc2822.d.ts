declare module 'address-rfc2822' {
    declare class Address {
        address: string
        phrase: string
        comment: string

        name(): string

        format(): string

        user(): string

        host(): string
    }

    type StartAt =
        | "address"
        | "address-list"
        | "angle-addr"
        | "from"
        | "group"
        | "mailbox"
        | "mailbox-list"
        | "reply-to"
        | "sender"

    type ParseOpts = {
        startAt: StartAt,
        allowAtInDisplayName: boolean,
        allowCommaInDisplayName: boolean,
    }

    declare function parse(line: string, opts: Partial<ParseOpts> | null = null): Array<Address>
}
