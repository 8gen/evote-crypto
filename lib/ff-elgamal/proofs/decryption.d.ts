import BN = require('bn.js');
import { Cipher, SystemParameters } from '../index';
import { DecryptionProof } from './models';
export declare const generate: (cipher: Cipher, sp: SystemParameters, sk: BN, uniqueID: string) => DecryptionProof;
export declare const verify: (cipher: Cipher, proof: DecryptionProof, sp: SystemParameters, pk: BN, uniqueID: string) => boolean;
