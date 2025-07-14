import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountDashboard from '../account/screens/AccountDashboard'
import TransferStackNavigator from '../transfer/navigator/TransferStackNavigator'

export type AppStackParamList = {
    AccountDashboard: undefined
    TransferStack: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export default function AppStackNavigator() {
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
