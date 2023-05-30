import { assert, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { AppSolana } from './app'
import { ClientSolana } from './client'
import { SOLANA_NETWORK, TEST_APP_INITIALIZE, sleep } from './utils'
import { Connect } from 'base'
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js'

// Edit an assertion and save to see HMR in action
const alice_keypair = Keypair.generate()
describe('Base Client tests', () => {
  let app: AppSolana
  let client: ClientSolana
  beforeAll(async () => {
    app = await AppSolana.build(TEST_APP_INITIALIZE)
    expect(app).toBeDefined()
    assert(app.sessionId !== '')
    client = await ClientSolana.create({ wsUrl: 'ws://localhost:6969' })
  })
  beforeEach(async () => {
    await sleep(5)
  })
  test('#getInfo()', async () => {
    const info = await client.getInfo(app.sessionId)
    expect(info).toBeDefined()
    assert(info.additionalInfo === TEST_APP_INITIALIZE.additionalInfo)
    assert(info.appDescription === TEST_APP_INITIALIZE.appDescription)
    assert(info.appIcon === TEST_APP_INITIALIZE.appIcon)
    assert(info.appName === TEST_APP_INITIALIZE.appName)
    assert(info.network === SOLANA_NETWORK)
    // assert(info.version === testAppBaseInitialize.version)
  })
  test('#connect()', async () => {
    const msg: Connect = {
      publicKeys: ['1', '2'],
      sessionId: app.sessionId
    }
    await client.connect(msg)
  })
  test('#on("signTransactions")', async () => {
    const RECEIVER = Keypair.generate()
    const ix = SystemProgram.transfer({
      fromPubkey: alice_keypair.publicKey,
      lamports: LAMPORTS_PER_SOL,
      toPubkey: RECEIVER.publicKey
    })
    const tx = new Transaction().add(ix)
    tx.feePayer = alice_keypair.publicKey
    tx.recentBlockhash = 'E6wypnGQkndknX5Urd5yXV8yxAkbHwD5MJ1aaNKWZBd5'

    client.on('signTransactions', async (e) => {
      const tx = e.transactions[0]
      tx.sign([alice_keypair])
      // resolve
      await client.resolveSignTransaction({
        requestId: e.requestId,
        signedTransactions: [tx]
      })
    })
    // // sleep(100)
    await sleep(0)
    const signed = await app.signTransaction(tx)
    // Transform to Transaction cuz idk how to verify VersionedTransaction
    const signed_transaction = Transaction.from(signed.serialize())
    assert(signed_transaction.verifySignatures())
  })
})