import BN = require('bn.js');
import { CurvePoint, KeyPair, SystemParameters } from '../index';
import { KeyGenerationProof } from './index';
export declare const generateChallenge: (n: BN, uniqueID: string, h_: CurvePoint, b: CurvePoint) => BN;
export declare const generate: (params: SystemParameters, share: KeyPair, id: string) => KeyGenerationProof;
export declare const verify: (params: SystemParameters, proof: KeyGenerationProof, h_: CurvePoint, id: string) => boolean;
