import React from 'react'
import { COLORS } from '../../constants/colors'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../app/AppStackNavigator'
import TransferInfoCard from '../constants/TransferInfoCard'

type NavigationProp = NativeStackScreenProps<
    AppStackParamList,
    'TransferDetailScreen'
>

const TransferDetailScreen = (props: NavigationProp) => {
    const { route } = props
    const { transferInfo } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <TransferInfoCard item={transferInfo} />
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
})

export default TransferDetailScreen
