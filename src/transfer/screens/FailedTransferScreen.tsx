import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { TransferStackParamList } from '../types'
import { COLORS } from '../../constants/colors'
import { Button, Divider, Icon, Text } from 'react-native-paper'
import TransferInfoCard from '../constants/TransferInfoCard'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'FailedTransferScreen'
>

const FailedTransferScreen = (props: NavigationProp) => {
    const { navigation, route } = props

    const transferInfo = route.params.transferInfo

    const onPressTryAgain = () => {
        navigation.navigate('TransferScreen', {
            prefill: transferInfo,
        })
    }

    const onPressClose = () => {
        const parent = navigation.getParent()
        if (parent) {
            parent.goBack()
        }
    }

    const renderBottomButtonContainer = () => (
        <View style={styles.buttonContainer}>
            <Divider />
            <Button mode={'contained'} onPress={() => onPressTryAgain()}>
                {'Try Again'}
            </Button>
            <Button mode={'contained-tonal'} onPress={() => onPressClose()}>
                {'Back to Account Dashboard'}
            </Button>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Icon
                    source={'close-outline'}
                    size={100}
                    color={COLORS.error}
                />
                <Text style={styles.successLabel}>{'Transfer Failed'}</Text>
                <TransferInfoCard item={transferInfo} />
            </ScrollView>
            {renderBottomButtonContainer()}
        </SafeAreaView>
    )
}

export default memo(FailedTransferScreen)

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
        alignItems: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
        gap: 16,
    },
    transferContainer: {
        flex: 1,
        width: '100%',
        gap: 12,
        backgroundColor: COLORS.backgroundSecondary,
        padding: 16,
        borderRadius: 16,
    },
    transactionInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 400,
    },
    label: {
        fontSize: 16,
        fontWeight: 600,
    },
    successLabel: {
        fontWeight: '700',
        fontSize: 28,
    },
})
