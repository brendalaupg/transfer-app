import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { TransferState } from './types'

const transfer = (state: RootState) => state.transfer

const TransferSelectors = {
    history: createSelector(
        [transfer],
        (transfer: TransferState) => transfer.transferHistory
    ),
}

export default TransferSelectors
