import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Transfer, TransferStackParamList } from '../types'
import { ActivityIndicator, Button, Divider } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'
import { AppDispatch } from '../../app/store'
import { useDispatch } from 'react-redux'
import {
    authenticateWithBiometrics,
    transferMoney,
} from '../transferAsyncThunk'
import TransferInfoCard from '../constants/TransferInfoCard'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'ReviewTransferScreen'
>

// TODO: Setup and UI
const ReviewTransferScreen = (props: NavigationProp) => {
    const { navigation, route } = props
    const newTransfer = route.params.transferInfo

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const onPressFailed = () => {
        navigation.navigate('FailedTransferScreen', {
            transferInfo: newTransfer,
            error: 'Transfer failed. Please try again later.',
        })
    }

    const onPressSuccess = (transferInfo: Transfer) => {
        navigation.navigate('SuccessTransferScreen', {
            transferInfo,
        })
    }

    const onPressSubmit = async () => {
        try {
            const result = await dispatch(authenticateWithBiometrics()).unwrap()
            if (!result) {
                console.error(
                    'Biometric authentication failed or not available'
                )
                // default to pin
                return
            }

            console.log('Biometric authentication successful')

            setIsLoading(true)
            const transfer = await dispatch(transferMoney(newTransfer)).unwrap()
            onPressSuccess(transfer)
        } catch {
            onPressFailed()
            return
        } finally {
            setIsLoading(false)
        }
    }

    const renderSubmitButton = () => (
        <View style={styles.buttonContainer}>
            <Divider />
            <Button mode={'contained'} onPress={() => onPressSubmit()}>
                {'Transfer'}
            </Button>
        </View>
    )

    const renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} />
        </View>
    )

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <Typography variant={'header'} size={'extra-large'}>
                        {'Review your transfer'}
                    </Typography>
                    <TransferInfoCard item={newTransfer} />
                </ScrollView>
                {renderSubmitButton()}
            </SafeAreaView>
            {isLoading && renderLoading()}
        </>
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
    loadingContainer: {
        position: 'absolute',
        backgroundColor: COLORS.overlay,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
