export {}
import { ElGamal, ELGamalZKP } from '../../src/index'

const random = require('random')
const { expect } = require('chai')

describe('ElGamal ZKP Proof', () => {
  it.only('create and verify proof', () => {
    const uniqueID = '0xAd4E7D8f03904b175a1F8AE0D88154f329ac9329'

    for (let i = 0; i < 10; i++) {
      const prnt = false

      // suitable pairs found so far:
      // (p,q,g) = (11,5,3), (23,11,6)
      const [pk, sk] = ElGamal.generateKeys(11, 3)

      const yesVote = 1

      const m_enc = ElGamal.encrypt(yesVote, pk, prnt)
      prnt && console.log(m_enc)
      const proof = ELGamalZKP.generateProof(m_enc, pk, uniqueID)

      const verifiedProof = ELGamalZKP.verifyProof(proof, pk)
      expect(verifiedProof).to.be.true

      const m_d1 = ElGamal.decrypt1(m_enc, sk, pk, prnt)
      const m_d2 = ElGamal.decrypt2(m_enc, sk, pk, prnt)

      expect(m_d1.toNumber()).to.equal(yesVote)
      expect(m_d2.toNumber()).to.equal(yesVote)
      expect(m_d1.eq(m_d2)).to.be.true
    }
  })
})
