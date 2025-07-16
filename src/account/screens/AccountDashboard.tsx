import React, { memo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { AppStackParamList } from '../../app/AppStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AccountSummary from '../components/AccountSummary'
import AccountActionsView from '../components/AccountActionsView'
import AccountSelectors from '../accountSelectors'
import { useSelector } from 'react-redux'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'

type NavigationProp = NativeStackNavigationProp<
    AppStackParamList,
    'AccountDashboard'
>

const AccountDashboard = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const displayName = useSelector(AccountSelectors.name)

    const onPressTransfer = () => {
        navigate('TransferStack')
    }

    const onPressContact = () => {
        navigate('ContactListScreen')
    }

    const onPressHistory = () => {
        navigate('TransferHistoryScreen')
    }

    const renderHeader = () => (
        <>
            <Typography variant={'header'} size={'extra-large'}>
                {'Welcome back'}
            </Typography>
            <Typography variant={'label'} size={'large'}>
                {displayName}
            </Typography>
        </>
    )

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                {renderHeader()}
                <AccountSummary />
                <AccountActionsView
                    onPressTransfer={onPressTransfer}
                    onPressContact={onPressContact}
                    onPressHistory={onPressHistory}
                />
            </ScrollView>
        </View>
    )
}

export default memo(AccountDashboard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        gap: 12,
        margin: 16,
        backgroundColor: COLORS.backgroundPrimary,
    },
})
