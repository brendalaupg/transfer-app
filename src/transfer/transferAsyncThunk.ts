import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateTransfer, Transfer } from './types'
import { TRANSFER_PREFIX } from './constants/transferConstants'
import * as LocalAuthentication from 'expo-local-authentication'

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

export const authenticateWithBiometrics = createAsyncThunk(
    'transfer/authenticateWithBiometrics',
    async (_, { rejectWithValue }) => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync()
            if (!hasHardware) {
                return false
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync()
            if (!isEnrolled) {
                return false
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to proceed with transfer',
                fallbackLabel: 'Use Passcode',
            })

            if (result.success) {
                return true
            } else {
                return rejectWithValue('Authentication failed')
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
