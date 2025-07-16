import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { TransferStackParamList } from '../types'
import { Button, Divider, Icon, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import TransferInfoCard from '../constants/TransferInfoCard'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'SuccessTransferScreen'
>

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
        <View style={styles.container}>
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
        </View>
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
        padding: 16,
        paddingBottom: 32,
        gap: 8,
    },
    successLabel: {
        fontWeight: '700',
        fontSize: 28,
    },
})
