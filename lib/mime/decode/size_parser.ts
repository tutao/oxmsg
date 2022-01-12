const unitsToMultiplicator = {
    "": 1,
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
}

/**
 * Thanks to http://stackoverflow.com/a/7333402/477854 for inspiration
 * This class can convert from strings like "104 kB" (104 kilobytes) to bytes.
 * It does not know about differences such as kilobits vs kilobytes.
 */
export class SizeParser {
    static parse(value: string): number {
        value = value.trim()
        const unit = SizeParser.extractUnit(value)
        const valueWithoutUnit = value.substring(0, value.length - unit.length).trim()
        const multiplicatorForUnit = SizeParser.multiplicatorForUnit(unit)
        const size = parseFloat(valueWithoutUnit)
        return Math.floor(multiplicatorForUnit * size)
    }

    static extractUnit(sizeWithUnit: string): string {
        // start right, end at the first digit
        const lastChar = sizeWithUnit.length - 1
        let unitLength = 0

        while (
            unitLength <= lastChar &&
            sizeWithUnit[lastChar - unitLength] !== " " && // stop when a space
            !SizeParser.isDigit(sizeWithUnit[lastChar - unitLength]) // or digit is found
        )
            unitLength++

        return sizeWithUnit.substring(sizeWithUnit.length - unitLength).toUpperCase()
    }

    static isDigit(value: string): boolean {
        return value >= "0" && value <= "9"
    }

    static multiplicatorForUnit(unit: string): number {
        unit = unit.toUpperCase()
        if (unitsToMultiplicator[unit] == null) throw new Error("illegal or unknown unit:" + unit)
        return unitsToMultiplicator[unit]
    }
}