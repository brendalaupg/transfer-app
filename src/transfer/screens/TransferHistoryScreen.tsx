import React from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../../constants/colors'
import TransferSelectors from '../transferSelectors'
import { StyleSheet, SectionList, SafeAreaView, View } from 'react-native'
import { Transfer } from '../types'
import Typography from '../../common/Typography'
import TransferItem from '../components/TransferItem'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../app/AppStackNavigator'
import ListHeader from '../../common/ListHeader'

type NavigationProp = NativeStackNavigationProp<
    AppStackParamList,
    'TransferHistoryScreen'
>

const TransferHistoryScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()
    const history = useSelector(TransferSelectors.historyByDate)

    const SectionHeader = ({ title }: { title: string }) => (
        <View style={styles.sectionHeader}>
            <Typography
                style={styles.sectionHeaderText}
                variant={'label'}
                size={'medium'}
            >
                {title}
            </Typography>
        </View>
    )

    const onPressTransferItem = (transfer: Transfer) => {
        navigate('TransferDetailScreen', {
            transferInfo: transfer,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                ListHeaderComponent={
                    <ListHeader
                        title={'Transfer History'}
                        testId={'history-header'}
                    />
                }
                sections={history}
                keyExtractor={(item, index) => item.id + index}
                renderItem={({ item, index }) => (
                    <TransferItem
                        item={item}
                        index={index}
                        onPress={onPressTransferItem}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionHeader title={title} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
    },
    sectionHeaderText: {
        color: COLORS.textPrimary,
    },
    sectionHeader: {
        padding: 16,
        backgroundColor: COLORS.backgroundPrimary,
    },
})

export default TransferHistoryScreen
