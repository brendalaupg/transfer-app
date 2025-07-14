import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { rootStore } from './src/app/store'
import AppStackNavigator from './src/app/AppStackNavigator'
import { PaperProvider } from 'react-native-paper'
import { APP_THEME } from './src/constants/paperTheme'

export default function App() {
    return (
        <ReduxProvider store={rootStore}>
            <PaperProvider theme={APP_THEME}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AppStackNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PaperProvider>
        </ReduxProvider>
    )
}
