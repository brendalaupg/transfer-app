import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountDashboard from '../account/screens/AccountDashboard'
import TransferStackNavigator from '../transfer/navigator/TransferStackNavigator'
import TransferHistoryScreen from '../transfer/screens/TransferHistoryScreen'

export type AppStackParamList = {
    AccountDashboard: undefined
    TransferStack: undefined
    TransferHistoryScreen: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export default function AppStackNavigator() {
    return (
        <Stack.Navigator initialRouteName={'AccountDashboard'}>
            <Stack.Screen
                name={'AccountDashboard'}
                component={AccountDashboard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'TransferStack'}
                component={TransferStackNavigator}
                options={{
                    headerShown: false,
                    presentation: 'fullScreenModal',
                }}
            />
            <Stack.Screen
                name={'TransferHistoryScreen'}
                component={TransferHistoryScreen}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
        </Stack.Navigator>
    )
}
