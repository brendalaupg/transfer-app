import React, { memo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { AppStackParamList } from '../../app/AppStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AccountSummary from '../components/AccountSummary'
import AccountActionsView from '../components/AccountActionsView'

type NavigationProp = NativeStackNavigationProp<
    AppStackParamList,
    'AccountDashboard'
>

// TODO: Setup and UI
const AccountDashboard = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const onPressTransfer = () => {
        navigate('TransferStack')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <AccountSummary />
                <AccountActionsView onPressTransfer={onPressTransfer} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default memo(AccountDashboard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        gap: 12,
        margin: 16,
    },
})
