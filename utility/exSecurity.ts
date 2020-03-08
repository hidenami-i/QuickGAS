import { ExError } from "./exError";

/**
 * Security extension class.
 */
export class ExSecurity {

    /**
     * Converts value parameter to MD5 hash.
     * @param {string} value 
     * @param {boolean} isUpperCase 
     * @returns {string} md5 hash.
     */
    public static MD5(value: string, isUpperCase: boolean = true): string {
        let txtHash: string = "";
        let rawHash: number[] = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, value, Utilities.Charset.UTF_8);

        ExError.throwIfNullOrUndefined(value);

        for (let i = 0; i < rawHash.length; i++) {
            let hashValue: number = rawHash[i];
            if (hashValue < 0) {
                hashValue += 256;
            }
            if (hashValue.toString(16).length == 1) {
                txtHash += '0';
            }
            txtHash += hashValue.toString(16);
        }

        if (isUpperCase) {
            return txtHash.toUpperCase();
        } else {
            return txtHash.toLowerCase();
        }
    }
}