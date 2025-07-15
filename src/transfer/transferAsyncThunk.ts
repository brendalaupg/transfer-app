import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateTransfer, Transfer } from './types'
import { TRANSFER_PREFIX } from './constants/transferConstants'

const TRANSFER_TIME_MS = 1000

export const transferMoney = createAsyncThunk(
    'transfer/transferMoney',
    async (data: CreateTransfer, { rejectWithValue }) => {
        try {
            // Simulate an API call to transfer funds
            const response: { success: boolean } = await new Promise(
                (resolve) => {
                    setTimeout(
                        () => resolve({ success: true }),
                        TRANSFER_TIME_MS
                    )
                }
            )

            if (response.success) {
                const newTransfer: Transfer = {
                    id: `${TRANSFER_PREFIX}${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    fromAccountNumber: '',
                    toAccountNumber: data.recipiant,
                    recipientName: data.recipiantName,
                    amount: data.amount,
                    note: data.note,
                }

                return newTransfer
            } else {
                return rejectWithValue('Transfer failed')
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
