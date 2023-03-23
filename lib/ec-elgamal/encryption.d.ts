import BN = require('bn.js');
import { Cipher, CurvePoint } from './index';
export declare const encrypt: (message: CurvePoint, publicKey: CurvePoint, log?: boolean) => Cipher;
export declare const decrypt: (cipherText: Cipher, privateKey: BN, log?: boolean) => CurvePoint;
export declare const homomorphicAdd: (cipher0: Cipher, cipher1: Cipher) => Cipher;
export declare const decryptShare: (cipher: Cipher, secretKeyShare: BN) => CurvePoint;
export declare const combineDecryptedShares: (cipher: Cipher, decryptedShares: CurvePoint[]) => CurvePoint;
