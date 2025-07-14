import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { AccountState } from './types'

const account = (state: RootState) => state.account

const AccountSelectors = {
    name: createSelector([account], (account: AccountState) => {
        return account.name
    }),
    balance: createSelector([account], (account: AccountState) => {
        return account.balance
    }),
    accountNumber: createSelector(
        [account],
        (account: AccountState) => account.accountNumber
    ),
}

export default AccountSelectors
