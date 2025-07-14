import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TransferScreen from '../screens/TransferScreen'
import ReviewTransferScreen from '../screens/ReviewTransferScreen'

export type TransferStackParamList = {
    TransferScreen: undefined
    ReviewTransferScreen: undefined
    SuccessTransferScreen: undefined
    ErrorTransferScreen: undefined
}

const Stack = createNativeStackNavigator<TransferStackParamList>()

export default function TransferStackNavigator() {
    return (
        <Stack.Navigator initialRouteName={'TransferScreen'}>
            <Stack.Screen name={'TransferScreen'} component={TransferScreen} />
            <Stack.Screen
                name={'ReviewTransferScreen'}
                component={ReviewTransferScreen}
            />
            <Stack.Screen
                name={'SuccessTransferScreen'}
                component={TransferScreen}
            />
            <Stack.Screen
                name={'ErrorTransferScreen'}
                component={TransferScreen}
            />
        </Stack.Navigator>
    )
}
