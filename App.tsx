import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNavigator from './src/navigators/MainStackNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { rootStore } from './src/app/store'

export default function App() {
    return (
        <ReduxProvider store={rootStore}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <MainStackNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </ReduxProvider>
    )
}
