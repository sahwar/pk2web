const TRIM_RX = /(^\s+|\s+$)/g;
const DUPL_SLASH_RX = /\/{2,}/g;

/**
 * Equivalente function for "atoi".
 *
 * @param str
 */
export function str2num(str: string): number {
    const num = Number(str);
    
    if (isNaN(num))
        throw new Error(`Failed parsing "${ str }" as a number.`);
    
    return num;
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function minmax(n: number, min: number, max: number): number {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

export function trim(str: string) {
    return str.replace(TRIM_RX, '');
}

export function cloneStruct(object: any) {
    return JSON.parse(JSON.stringify(object));
}

export function pathJoin(...segments: string[]): string {
    let out = '';
    
    for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        
        out += trim(segment).replace(DUPL_SLASH_RX, '/');
        
        // Add final slash
        if (i < segments.length - 1 && segment.lastIndexOf('/') !== segment.length - 1) {
            out += '/';
        }
    }
    
    return out;
}

export function ab2str(ab) {
    return String.fromCharCode.apply(null, new Uint8Array(ab));
}