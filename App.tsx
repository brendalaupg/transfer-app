import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { rootStore } from './src/app/store'
import AppStackNavigator from './src/app/AppStackNavigator'

export default function App() {
    return (
        <ReduxProvider store={rootStore}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AppStackNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </ReduxProvider>
    )
}
