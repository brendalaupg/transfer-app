import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountDashboard from '../account/screens/AccountDashboard'
import TransferStackNavigator from '../transfer/navigator/TransferStackNavigator'
import TransferHistoryScreen from '../transfer/screens/TransferHistoryScreen'
import BackButtonHeader from '../common/BackButtonHeader'
import ContactListScreen from '../contacts/screens/ContactListScreen'
import TransferDetailScreen from '../transfer/screens/TransferDetailScreen'
import { Transfer } from '../transfer/types'

export type AppStackParamList = {
    AccountDashboard: undefined
    TransferStack: undefined
    TransferHistoryScreen: undefined
    TransferDetailScreen: { transferInfo: Transfer }
    ContactListScreen: undefined
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
                    headerLeft: () => <BackButtonHeader />,
                }}
            />
            <Stack.Screen
                name={'TransferDetailScreen'}
                component={TransferDetailScreen}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => <BackButtonHeader />,
                }}
            />
            <Stack.Screen
                name={'ContactListScreen'}
                component={ContactListScreen}
                options={{
                    headerLeft: () => <BackButtonHeader />,
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
        </Stack.Navigator>
    )
}
