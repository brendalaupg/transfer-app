import React from 'react'
import { COLORS } from '../../constants/colors'
import { SafeAreaView, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../app/AppStackNavigator'

type NavigationProp = NativeStackScreenProps<
    AppStackParamList,
    'TransferDetailScreen'
>

const TransferDetailScreen = (props: NavigationProp) => {
    const { route } = props
    const { transferInfo } = route.params

    return <SafeAreaView style={styles.container} />
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
