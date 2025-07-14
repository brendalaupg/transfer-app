import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Transfer, TransferState } from './types'

const transfer = (state: RootState) => state.transfer

const TransferSelectors = {
    history: createSelector(
        [transfer],
        (transfer: TransferState) => transfer.transferHistory
    ),

    historyByDate: createSelector([transfer], (transfer: TransferState) => {
        const history = transfer.transferHistory
        const groupedByDate: { [key: string]: Transfer[] } = {}

        history.forEach((transfer) => {
            const date = new Date(transfer.createdAt).toLocaleDateString()
            if (!groupedByDate[date]) {
                groupedByDate[date] = []
            }
            groupedByDate[date].push(transfer)
        })

        return Object.entries(groupedByDate).map(([title, data]) => ({
            title,
            data,
        }))
    }),
}

export default TransferSelectors
