import React from 'react'
import { COLORS } from '../../constants/colors'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../app/AppStackNavigator'
import TransferInfoCard from '../constants/TransferInfoCard'
import { Button } from 'react-native-paper'
import Typography from '../../common/Typography'
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
} from '@react-navigation/native'
import { CreateTransfer } from '../types'
import TransferIcon from '../components/TransferIcon'

type TransferDetailNavigationProp = NativeStackScreenProps<
    AppStackParamList,
    'TransferDetailScreen'
>

const TransferDetailScreen = (props: TransferDetailNavigationProp) => {
    const { route } = props
    const { transferInfo } = route.params

    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const isOutgoingTransfer = transferInfo.amount < 0

    const createTransfer = () => {
        const transfer: CreateTransfer = {
            recipiant: transferInfo.toAccountNumber,
            recipiantName: transferInfo.recipientName,
            amount: Math.abs(transferInfo.amount),
            note: transferInfo.note,
            fromAccountNumber: transferInfo.fromAccountNumber,
        }

        navigation.navigate('TransferStack', {
            screen: 'TransferScreen',
            params: {
                prefill: transfer,
            },
        })
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <Typography variant={'header'} size={'extra-large'}>
                {'Transfer Details'}
            </Typography>
            <TransferIcon
                isOutgoing={transferInfo.amount < 0}
                iconSize={36}
                containerSize={60}
            />
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                {renderHeader()}
                <TransferInfoCard item={transferInfo} />
                {isOutgoingTransfer && (
                    <Button
                        mode={'contained-tonal'}
                        onPress={() => createTransfer()}
                    >
                        {'Transfer Again'}
                    </Button>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 16,
        gap: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default TransferDetailScreen
