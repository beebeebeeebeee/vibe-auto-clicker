const generateSuffix = (index: number): string => {
    if (index === 0) return '';

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let suffix = '';
    let value = index - 1; // -1 because we want 'a' to be the first suffix

    while (value >= 0) {
        // Get the current letter (remainder when divided by 26)
        const letterIndex = value % 26;
        suffix = alphabet[letterIndex] + suffix;
        // Move to the next position
        value = Math.trunc(value / 26) - 1;
    }

    return suffix;
};

// Constants for BigInt calculations
const THOUSAND = BigInt(1000);
const ZERO = BigInt(0);

export const formatNumber = (num: number | bigint): string => {
    // Convert to BigInt if it's not already
    const bigNum = typeof num === 'number' ? BigInt(Math.round(num)) : num;
    
    // Handle numbers less than 1000
    if (bigNum < THOUSAND) {
        return bigNum.toString();
    }

    // Calculate magnitude (how many times we can divide by 1000)
    let magnitude = 0;
    let scaled = bigNum;
    
    while (scaled >= THOUSAND) {
        scaled = scaled / THOUSAND;
        magnitude++;
    }

    // Convert back to number for final formatting
    // This is safe because after division by 1000^magnitude,
    // the number will be between 1 and 999.999...
    const scaledNum = Number(scaled);
    
    // Format with 1 decimal place if needed
    const formatted = scaledNum >= 100 ? 
        scaledNum.toString() : 
        scaledNum.toFixed(1).replace(/\.0$/, '');

    return formatted + generateSuffix(magnitude);
};

// Helper function to parse string to BigInt safely
export const parseBigNumber = (str: string): bigint => {
    try {
        // Remove any non-numeric characters except scientific notation
        const cleaned = str.replace(/[^\d.eE+-]/g, '');
        if (cleaned.includes('e') || cleaned.includes('E')) {
            // Handle scientific notation
            const [base, exponent] = cleaned.split(/[eE]/);
            const baseNum = parseFloat(base);
            const exp = parseInt(exponent);
            // Use Math.round instead of Math.floor for more accurate conversion
            return BigInt(Math.round(baseNum * Math.pow(10, exp)));
        }
        // Remove decimal part and convert to BigInt
        return BigInt(cleaned.split('.')[0]);
    } catch {
        return ZERO;
    }
}; 