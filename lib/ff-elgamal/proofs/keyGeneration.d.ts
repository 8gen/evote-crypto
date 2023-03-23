import BN = require('bn.js');
import { KeyPair, SystemParameters } from '../index';
import { KeyGenerationProof } from './index';
export declare const generate: (params: SystemParameters, keyPair: KeyPair, id: string) => KeyGenerationProof;
export declare const verify: (params: SystemParameters, proof: KeyGenerationProof, h: BN, id: string) => boolean;
