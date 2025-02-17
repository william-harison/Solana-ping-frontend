import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, TransactionInstruction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { airdropIfRequired } from '@solana-developers/helpers'

const PROGRAM_ID = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const DATA_ACCOUNT_PUBKEY = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

export const PingButton: FC = () => {

	const { connection } = useConnection()
	const { wallet, publicKey, sendTransaction } = useWallet()


    const onClick = async () => {
			if (!connection || !publicKey)
      	console.error('Wallet not connected or connection unavailable')
    	}

			try {
				const programId = new PublicKey(PROGRAM_ID)
				const programDataAccount = new PublicKey(DATA_ACCOUNT_PUBKEY)
				const transaction = new Transaction()

				const newBalance = await airdropIfRequired(
					connection,
					publicKey,
					1 * LAMPORTS_PER_SOL,
					0.5 * LAMPORTS_PER_SOL,
				);

				const instruction = new TransactionInstruction({
					keys: [
						{
							pubkey: programDataAccount,
							isSigner: false,
							isWritable: true
						}
					],
					programId,
				})

				transaction.add(instruction)

				const signature = await sendTransaction(transaction, connection)
				console.log('Transaction signature: ', signature)
			} catch(e) {
				console.log('Transaction Failed: ', e)
			}
    
	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			<button className={styles.button}>Ping!</button>
		</div>
	)
}

