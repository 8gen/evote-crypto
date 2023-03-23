import BN = require('bn.js');
export interface SystemParameters {
    p: BN;
    q: BN;
    g: BN;
}
export declare function isSystemParameters(object: any): object is SystemParameters;
export interface KeyPair {
    h: BN;
    sk: BN;
}
export declare function isKeyPair(object: any): object is KeyPair;
export interface Cipher {
    a: BN;
    b: BN;
    r?: BN;
}
export declare function isCipher(object: any): object is Cipher;
