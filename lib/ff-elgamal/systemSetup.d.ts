import BN = require('bn.js');
import { KeyPair, SystemParameters } from './index';
export declare const generateSystemParameters: (p: number, g: number) => SystemParameters;
export declare const generateKeyPair: (sp: SystemParameters) => KeyPair;
export declare const generateSystemParametersAndKeys: (p: number, g: number) => [SystemParameters, KeyPair];
export declare const generateSystemParametersAndKeysZKP: (p: number, g: number) => [SystemParameters, KeyPair];
export declare const combinePublicKeys: (params: SystemParameters, publicKeyShares: BN[]) => BN;
export declare const combinePrivateKeys: (params: SystemParameters, privateKeyShares: BN[]) => BN;
