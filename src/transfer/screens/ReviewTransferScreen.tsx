import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TransferStackParamList } from '../types'
import { MOCK_TRANSFER_LIST } from '../constants/transferConstants'
import TransferInfoItem from '../components/TransferInfoItem'
import { formatToRM } from '../../common/stringUtils'
import { Divider } from 'react-native-paper'
import { COLORS } from '../../constants/colors'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'ReviewTransferScreen'
>

// TODO: Setup and UI
const ReviewTransferScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const transferInfo = MOCK_TRANSFER_LIST[2]

    const onPressFailed = () => {
        navigate('FailedTransferScreen')
    }

    const onPressSuccess = () => {
        navigate('SuccessTransferScreen')
    }

    const renderTempButtons = () => (
        <>
            <Button
                title={'Go to Success screen'}
                onPress={() => onPressSuccess()}
            />
            <Button
                title={'Go to Failed screen'}
                onPress={() => onPressFailed()}
            />
        </>
    )

    const renderTransferDetails = () => (
        <View style={styles.transferDetailContainer}>
            <TransferInfoItem
                title={transferInfo.recipientName}
                value={transferInfo.toAccountNumber}
                key={'review-recipient-info'}
            />
            <Divider />
            <TransferInfoItem
                title={'Amount'}
                value={`${formatToRM(transferInfo.amount)}`}
                key={'review-amount'}
            />
            <Divider />
            <TransferInfoItem
                title={'Note'}
                value={transferInfo.note}
                key={'review-note'}
            />
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text style={styles.title}>{'Review your transfer'}</Text>
                {renderTransferDetails()}
                {renderTempButtons()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default memo(ReviewTransferScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
    },
    scrollViewContent: {
        gap: 12,
        margin: 16,
    },
    buttonContainer: {
        height: 70,
        paddingHorizontal: 16,
        paddingTop: 8,
        gap: 8,
    },
    transferDetailContainer: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: COLORS.backgroundSecondary,
        gap: 8,
        padding: 16,
    },
})
