import { curve } from 'elliptic';
import BN = require('bn.js');
export interface CurvePoint extends curve.short.ShortPoint {
}
export interface SystemParameters {
    p: BN;
    n: BN;
    g: CurvePoint;
}
export interface SystemParametersSerialized {
    p: string;
    n: string;
    g: string;
}
export interface KeyPair {
    h: CurvePoint;
    sk: BN;
}
export interface Cipher {
    a: CurvePoint;
    b: CurvePoint;
    r?: BN;
}
export declare const instanceOfSystemParametersSerialized: (object: any) => object is SystemParametersSerialized;
