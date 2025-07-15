import { createAsyncThunk } from '@reduxjs/toolkit'
import * as ExpoContacts from 'expo-contacts'

export const getContactPermission = createAsyncThunk(
    'contact/getPermission',
    async (_, { rejectWithValue }) => {
        try {
            const { status } = await ExpoContacts.requestPermissionsAsync()
            if (status !== 'granted') {
                return rejectWithValue('Permission denied')
            }

            const { data } = await ExpoContacts.getContactsAsync({
                fields: [
                    ExpoContacts.Fields.Name,
                    ExpoContacts.Fields.PhoneNumbers,
                ],
            })
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
