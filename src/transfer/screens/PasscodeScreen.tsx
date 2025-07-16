import React, { memo, useEffect, useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native'
import { Icon } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
    authenticateWithBiometrics,
    transferMoney,
} from '../transferAsyncThunk'
import { Transfer, TransferStackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useBiometrics from '../components/useBiometrics'

/** Since this is a demo app, the pin is mocked */
const HARD_CODED_PIN: string = '000000'

const MAX_LENGTH: number = 6

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '']

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'PasscodeScreen'
>

const PasscodeScreen = (props: NavigationProp) => {
    const { navigation, route } = props
    const newTransfer = route.params.transfer

    const [passcode, setPasscode] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { biometricType, checkBiometricsHardware } = useBiometrics()

    const handleBiometrics = async () => {
        try {
            const result = await dispatch(authenticateWithBiometrics()).unwrap()

            if (result) {
                processTransfer()
            } else {
                throw Error('Error, failed to authenticate')
            }
        } catch {
            handleFailure()
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Checks if there's biometrics available.
     * if so, we initiate biometrics auth for secure user convenience
     * */
    const initiateBiometrics = async () => {
        try {
            const result = await checkBiometricsHardware()
            if (result) {
                handleBiometrics()
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        initiateBiometrics()
    }, [])

    const handleKeyPress = (key: string) => {
        if (passcode.length < MAX_LENGTH) {
            setPasscode((prev) => prev + key)
        }
    }

    const onPressBackspace = () => {
        setPasscode((prev) => prev.slice(0, -1))
    }

    const renderInputDot = (isFilled: boolean, index: number) => (
        <View
            key={index}
            style={[
                styles.dot,
                {
                    backgroundColor: isFilled
                        ? COLORS.contentPrimary
                        : COLORS.contentDisabled,
                },
            ]}
        />
    )

    const renderInputDots = () => (
        <View style={styles.dotsContainer}>
            {Array.from({ length: MAX_LENGTH }).map((_, index) => {
                const isFilled = index < passcode.length
                return renderInputDot(isFilled, index)
            })}
        </View>
    )

    const renderKeypad = () => (
        <View style={styles.keypadContainer}>
            {KEYS.map((key, index) => {
                if (key === '') {
                    return <View key={index} style={styles.spacerKey} />
                }

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleKeyPress(key)}
                        style={styles.key}
                    >
                        <Typography variant={'header'} size={'extra-large'}>
                            {key}
                        </Typography>
                    </TouchableOpacity>
                )
            })}
        </View>
    )

    const biometricsIcon = () => {
        switch (biometricType) {
            case 'face_recognition':
                return 'face-recognition'
            case 'fingerprint':
                return 'fingerprint'
            case 'iris':
                return 'eye'
        }
    }

    const handleFailure = () => {
        navigation.navigate('FailedTransferScreen', {
            transferInfo: newTransfer,
            error: 'Transfer failed. Please try again later.',
        })
    }

    const handleSuccess = (transferInfo: Transfer) => {
        navigation.navigate('SuccessTransferScreen', {
            transferInfo,
        })
    }

    const processTransfer = async () => {
        try {
            const transfer = await dispatch(transferMoney(newTransfer)).unwrap()
            handleSuccess(transfer)
        } catch {
            handleFailure()
        }
    }

    useEffect(() => {
        if (passcode.length !== MAX_LENGTH) {
            return
        }

        if (passcode === HARD_CODED_PIN) {
            processTransfer()
        } else {
            handleFailure()
        }
    }, [passcode])

    const renderPasscodeBottomBar = () => (
        <View style={styles.bottomBar}>
            <TouchableOpacity onPress={() => handleBiometrics()}>
                <Icon source={biometricsIcon()} size={30} />
            </TouchableOpacity>
            <View style={{ width: 30 }} />
            <TouchableOpacity onPress={() => onPressBackspace()}>
                <Icon source={'backspace-outline'} size={30} />
            </TouchableOpacity>
        </View>
    )

    const renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} />
        </View>
    )

    const renderHeader = () => (
        <Typography style={styles.title} variant={'header'} size={'large'}>
            {'Enter Passcode'}
        </Typography>
    )

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.flexSpacer} />
                {renderHeader()}
                {renderInputDots()}
                <View style={styles.flexSpacer} />
                {renderKeypad()}
                {renderPasscodeBottomBar()}
            </SafeAreaView>
            {isLoading && renderLoading()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 120,
        paddingHorizontal: 32,
        backgroundColor: COLORS.backgroundPrimary,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 32,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
        alignItems: 'center',
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.contentSecondary,
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20,
        paddingHorizontal: 40,
        marginTop: 24,
        maxWidth: '80%',
        alignItems: 'center',
    },
    key: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.accentSecondary,
    },
    spacerKey: {
        width: 50,
        height: 50,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center',
        width: '80%',
        paddingHorizontal: 40,
        height: 50,
    },
    flexSpacer: {
        flex: 1,
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

export default memo(PasscodeScreen)
