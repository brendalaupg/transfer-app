import React from 'react'
import { COLORS } from '../../constants/colors'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
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

type TransferDetailNavigationProp = NativeStackScreenProps<
    AppStackParamList,
    'TransferDetailScreen'
>

const TransferDetailScreen = (props: TransferDetailNavigationProp) => {
    const { route } = props
    const { transferInfo } = route.params

    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const createTransfer = () => {
        const transfer: CreateTransfer = {
            recipiant: transferInfo.toAccountNumber,
            recipiantName: transferInfo.recipientName,
            amount: transferInfo.amount,
            note: transferInfo.note,
        }

        navigation.navigate('TransferStack', {
            screen: 'TransferScreen',
            params: {
                prefill: transfer,
            },
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Typography variant={'header'} size={'extra-large'}>
                    {'Transfer Details'}
                </Typography>
                <TransferInfoCard item={transferInfo} />
                <Button onPress={() => createTransfer()}>
                    {'Transfer Again'}
                </Button>
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
})

export default TransferDetailScreen
