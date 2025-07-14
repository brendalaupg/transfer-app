import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TransferStackParamList } from '../types'
import TransferInfoItem from '../components/TransferInfoItem'
import { formatToRM } from '../../common/stringUtils'
import { Divider } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'ReviewTransferScreen'
>

// TODO: Setup and UI
const ReviewTransferScreen = (props: NavigationProp) => {
    const { route } = props
    const transferInfo = route.params.transferInfo

    const { navigation } = useNavigation<NavigationProp>()

    const onPressFailed = () => {
        navigation.navigate('FailedTransferScreen')
    }

    const onPressSuccess = () => {
        navigation.navigate('SuccessTransferScreen')
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
                title={transferInfo.recipiantName}
                value={transferInfo.recipiant}
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
                <Typography variant={'header'} size={'extra-large'}>
                    {'Review your transfer'}
                </Typography>
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
