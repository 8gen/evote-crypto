const EC = require('elliptic').ec
const curve25519 = new EC('alt_bn128')
export const curveDefinition = curve25519 // only used internally
export const curve = curveDefinition.curve // exported from crypto package
