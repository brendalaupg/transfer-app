import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReviewTransferScreen from '../screens/ReviewTransferScreen'
import SuccessTransferScreen from '../screens/SuccessTransferScreen'
import TransferScreen from '../screens/TransferScreen'
import FailedTransferScreen from '../screens/FailedTransferScreen'
import { TransferStackParamList } from '../types'
import CloseButtonHeader from '../../common/CloseButtonHeader'
import BackButtonHeader from '../../common/BackButtonHeader'
import { View } from 'react-native'
import PasscodeScreen from '../screens/PasscodeScreen'
import { ContactSelectionScreen } from '../../contacts/screens/ContactListScreen'

const Stack = createNativeStackNavigator<TransferStackParamList>()

export default function TransferStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'TransferScreen'}
                component={TransferScreen}
                options={{
                    headerLeft: () => <CloseButtonHeader />,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name={'ReviewTransferScreen'}
                component={ReviewTransferScreen}
                options={{
                    headerLeft: () => <BackButtonHeader />,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name={'PasscodeScreen'}
                component={PasscodeScreen}
                options={{
                    headerLeft: () => <CloseButtonHeader />,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name={'SuccessTransferScreen'}
                component={SuccessTransferScreen}
                options={{
                    headerLeft: () => <View />,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name={'FailedTransferScreen'}
                component={FailedTransferScreen}
                options={{
                    headerLeft: () => <View />,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name={'ContactSelectionScreen'}
                component={ContactSelectionScreen}
                options={{
                    headerLeft: () => <BackButtonHeader />,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    )
}
