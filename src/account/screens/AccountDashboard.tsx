import React, { memo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { AppStackParamList } from '../../app/AppStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AccountSummary from '../components/AccountSummary'
import AccountActionsView from '../components/AccountActionsView'
import { Text } from 'react-native-paper'
import AccountSelectors from '../accountSelectors'
import { useSelector } from 'react-redux'

type NavigationProp = NativeStackNavigationProp<
    AppStackParamList,
    'AccountDashboard'
>

// TODO: Setup and UI
const AccountDashboard = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const displayName = useSelector(AccountSelectors.name)

    const onPressTransfer = () => {
        navigate('TransferStack')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text
                    style={styles.welcomeLabel}
                >{`Welcome back, ${displayName}`}</Text>
                <AccountSummary />
                <AccountActionsView onPressTransfer={onPressTransfer} />
                {/* TODO: add transfer list here */}
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
    welcomeLabel: {
        fontWeight: 600,
        fontSize: 16,
    },
})
