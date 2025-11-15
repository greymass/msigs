# Development Accounts Creation

> Initial setup of Vaulta core development team accounts

## Overview

This proposal creates the foundational accounts required for the Vaulta development infrastructure. It establishes two critical accounts: `dist.vaulta` for distribution and `dev.vaulta` for the development team's multi-signature operations.

This is being done in an independent step since msig proposals cannot create accounts and deploy contracts at the same time.

This simple proposal only creates these new accounts. Future msig proposals will need to be approved to complete this setup.

## Account Structure

### dist.vaulta
- **Purpose**: Distribution contract account
- **Owner Permission**: Network authority (`eosio@active`)
- **Active Permission**: Network authority (`eosio@active`)
- **RAM Allocation**: 8,192 bytes

### dev.vaulta
- **Purpose**: Development team multi-sig account
- **Owner Permission**: Network authority (`eosio@active`)
- **Active Permission**: 2-of-2 multi-signature
  - ahayrapetian@active (Areg) - weight: 1
  - aaron@active (Aaron) - weight: 1
  - threshold: 2
- **RAM Allocation**: 8,192 bytes

## Actions

### 1. Create dist.vaulta account

- [x] 1.1 Create new account `dist.vaulta`
- [x] 1.2 Purchase 8,192 bytes of RAM for `dist.vaulta`

**eosio::newaccount**
```json
{
    "creator": "eosio",
    "name": "dist.vaulta",
    "owner": {
        "threshold": 1,
        "keys": [],
        "accounts": [
            {
                "weight": 1,
                "permission": {
                    "actor": "eosio",
                    "permission": "active"
                }
            }
        ],
        "waits": []
    },
    "active": {
        "threshold": 1,
        "keys": [],
        "accounts": [
            {
                "weight": 1,
                "permission": {
                    "actor": "eosio",
                    "permission": "active"
                }
            }
        ],
        "waits": []
    }
}
```

**eosio::buyrambytes**
```json
{
    "payer": "eosio",
    "receiver": "dist.vaulta",
    "bytes": 8192
}
```

### 2. Create dev.vaulta account

- [x] 2.1 Create new account `dev.vaulta` with 2-of-2 multi-sig active permission
- [x] 2.2 Purchase 8,192 bytes of RAM for `dev.vaulta`

**eosio::newaccount**
```json
{
    "creator": "eosio",
    "name": "dev.vaulta",
    "owner": {
        "threshold": 1,
        "keys": [],
        "accounts": [
            {
                "weight": 1,
                "permission": {
                    "actor": "eosio",
                    "permission": "active"
                }
            }
        ],
        "waits": []
    },
    "active": {
        "threshold": 2,
        "keys": [],
        "accounts": [
            {
                "weight": 1,
                "permission": {
                    "actor": "ahayrapetian",
                    "permission": "active"
                }
            },
            {
                "weight": 1,
                "permission": {
                    "actor": "aaron",
                    "permission": "active"
                }
            }
        ],
        "waits": []
    }
}
```

**eosio::buyrambytes**
```json
{
    "payer": "eosio",
    "receiver": "dev.vaulta",
    "bytes": 8192
}
```

## Security Considerations

- Both accounts have their **owner** permission set to network authority (`eosio@active`) for maximum security
- The `dev.vaulta` **active** permission requires signatures from both development team members (2-of-2), ensuring no single person can execute transactions
- The `dist.vaulta` account is fully controlled by network authority, preventing unauthorized modifications to the distribution contract
