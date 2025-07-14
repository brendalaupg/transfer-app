import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './store'
import { AccountState } from './types'

const account = (state: RootState) => state.account

const AccountSelectors = {
    balance: createSelector(
        [account],
        (account: AccountState) => account.balanceAmount
    ),
    accountNumber: createSelector(
        [account],
        (account: AccountState) => account.accountNumber
    ),
}

export default AccountSelectors
