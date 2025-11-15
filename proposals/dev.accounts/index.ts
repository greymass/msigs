import type { Action } from '@wharfkit/antelope'
import { logProposalLink } from '$lib/utils'
import { makeSession, systemContract } from '$lib/wharf'
import { NETWORK_AUTHORITY, SYSTEM_ACCOUNT } from '../../lib/constants'

// 2-of-2 permission of development team
export const DEV_AUTHORITY = {
    threshold: 2,
    keys: [],
    accounts: [
        {
            weight: 1,
            permission: {
                actor: 'ahayrapetian', // Areg
                permission: 'active',
            },
        },
        {
            weight: 1,
            permission: {
                actor: 'aaron', // Aaron
                permission: 'active',
            },
        },
    ],
    waits: [],
}

const actions: Action[] = [
    // 1. Create the new distribution contract
    systemContract.action('newaccount', {
        active: NETWORK_AUTHORITY,
        creator: SYSTEM_ACCOUNT,
        name: 'dist.vaulta',
        owner: NETWORK_AUTHORITY,
    }),
    systemContract.action('buyrambytes', {
        bytes: 8192,
        payer: SYSTEM_ACCOUNT,
        receiver: 'dist.vaulta',
    }),

    // 2. Create the development team account
    systemContract.action('newaccount', {
        active: DEV_AUTHORITY,
        creator: SYSTEM_ACCOUNT,
        name: 'dev.vaulta',
        owner: NETWORK_AUTHORITY,
    }),
    systemContract.action('buyrambytes', {
        bytes: 8192,
        payer: SYSTEM_ACCOUNT,
        receiver: 'dev.vaulta',
    }),
]

const session = makeSession('eosio@active')
const result = await session.transact({ actions }, { broadcast: true })
logProposalLink(result, session)
