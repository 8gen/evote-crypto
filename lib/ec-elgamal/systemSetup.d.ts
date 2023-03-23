import BN = require('bn.js');
import { CurvePoint, KeyPair, SystemParameters } from './index';
export declare const generateSystemParameters: () => SystemParameters;
export declare const generateKeyPair: () => KeyPair;
export declare const combinePublicKeys: (publicKeyShares: CurvePoint[]) => CurvePoint;
export declare const combinePrivateKeys: (params: SystemParameters, privateKeyShares: BN[]) => BN;
