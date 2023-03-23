import BN = require('bn.js');
import { Cipher, CurvePoint, SystemParameters, SystemParametersSerialized } from '../index';
import { DecryptionProof } from './models';
export declare const generateChallenge: (n: BN, id: string, a: CurvePoint, b: CurvePoint, a1: CurvePoint, b1: CurvePoint) => BN;
export declare const generate: (cipher: Cipher, params: SystemParameters | SystemParametersSerialized, sk: BN, id: string, log?: boolean) => DecryptionProof;
export declare const verify: (encryptedSum: Cipher, proof: DecryptionProof, params: SystemParameters | SystemParametersSerialized, pk: CurvePoint | string, id: string, log?: boolean) => boolean;
