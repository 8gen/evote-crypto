import BN = require('bn.js');
import { Cipher, SystemParameters } from '../index';
import { MembershipProof } from './models';
export declare const generateYesProof: (cipher: Cipher, sp: SystemParameters, pk: BN, uniqueID: string) => MembershipProof;
export declare const generateNoProof: (cipher: Cipher, sp: SystemParameters, pk: BN, uniqueID: string) => MembershipProof;
export declare const verify: (cipher: Cipher, proof: MembershipProof, sp: SystemParameters, pk: BN, uniqueID: string) => boolean;
