import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { TransferStackParamList } from '../types'
import { Button, Divider, Icon, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import TransferInfoCard from '../constants/TransferInfoCard'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'SuccessTransferScreen'
>

// TODO: Setup and UI
const SuccessTransferScreen = (props: NavigationProp) => {
    const { route, navigation } = props
    const { transferInfo } = route.params

    const onPressDone = () => {
        const parent = navigation.getParent()

        if (parent && parent.canGoBack()) {
            parent.goBack()
        }
    }

    const renderBottomButtonContainer = () => (
        <View style={styles.buttonContainer}>
            <Divider />
            <Button mode={'contained'} onPress={() => onPressDone()}>
                {'Done'}
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
                    source={'check-circle-outline'}
                    size={100}
                    color={COLORS.success}
                />
                <Text style={styles.successLabel}>{'Transfer Successful'}</Text>
                <TransferInfoCard item={transferInfo} />
            </ScrollView>
            {renderBottomButtonContainer()}
        </SafeAreaView>
    )
}

export default memo(SuccessTransferScreen)

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
        gap: 8,
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
