import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountDashboard from '../screens/AccountDashboard'
import TransferStackNavigator from './TransferStackNavigator'

export type MainStackParamList = {
    AccountDashboard: undefined
    TransferStack: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export default function MainStackNavigator() {
    return (
        <Stack.Navigator initialRouteName={'AccountDashboard'}>
            <Stack.Screen
                name={'AccountDashboard'}
                component={AccountDashboard}
            />
            <Stack.Screen
                name={'TransferStack'}
                component={TransferStackNavigator}
                options={{
                    headerShown: false,
                    presentation: 'fullScreenModal',
                }}
            />
        </Stack.Navigator>
    )
}
