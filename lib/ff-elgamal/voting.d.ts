import BN = require('bn.js');
import { Summary } from '../index';
import { Cipher, SystemParameters } from './index';
export declare const generateYesVote: (sp: SystemParameters, pk: BN) => Cipher;
export declare const generateNoVote: (sp: SystemParameters, pk: BN) => Cipher;
export declare const generateBaseVote: () => Cipher;
export declare const addVotes: (votes: Cipher[], sp: SystemParameters) => Cipher;
export declare const tallyVotes: (sp: SystemParameters, sk: BN, votes: Cipher[]) => number;
export declare const getSummary: (total: number, tallyResult: number) => Summary;
