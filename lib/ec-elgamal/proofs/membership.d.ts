import BN = require('bn.js');
import { Cipher, CurvePoint, SystemParameters, SystemParametersSerialized } from '../index';
import { MembershipProof } from './models';
export declare const generateChallenge: (n: BN, id: string, c1: CurvePoint, c2: CurvePoint, a1: CurvePoint, a2: CurvePoint, b1: CurvePoint, b2: CurvePoint) => BN;
export declare const generateYesProof: (encryptedVote: Cipher, params: SystemParameters | SystemParametersSerialized, publicKey: CurvePoint | string, id: string) => MembershipProof;
export declare const generateNoProof: (encryptedVote: Cipher, params: SystemParameters | SystemParametersSerialized, publicKey: CurvePoint | string, id: string) => MembershipProof;
export declare const verify: (encryptedVote: Cipher, proof: MembershipProof, params: SystemParameters | SystemParametersSerialized, publicKey: CurvePoint | string, id: string) => boolean;
