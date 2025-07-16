import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { TransferStackParamList } from '../types'
import { Button, Divider } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'
import TransferInfoCard from '../constants/TransferInfoCard'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'ReviewTransferScreen'
>

const ReviewTransferScreen = (props: NavigationProp) => {
    const { navigation, route } = props
    const newTransfer = route.params.transferInfo

    const onPressSubmit = async () => {
        navigation.navigate('PasscodeScreen', {
            transfer: newTransfer,
        })
    }

    const renderSubmitButton = () => (
        <View style={styles.buttonContainer}>
            <Divider />
            <Button mode={'contained'} onPress={() => onPressSubmit()}>
                {'Transfer'}
            </Button>
        </View>
    )

    return (
        <>
            <View style={styles.container}>
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
            </View>
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
        padding: 16,
        paddingBottom: 32,
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
