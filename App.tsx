import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNavigator from './src/navigators/MainStackNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <MainStackNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
