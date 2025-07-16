import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../../constants/colors'
import TransferSelectors from '../transferSelectors'
import { StyleSheet, SectionList, SafeAreaView, View } from 'react-native'
import { Transfer, TransferHistorySectionData } from '../types'
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

    const renderItem = useCallback(
        ({ item, index }: { item: Transfer; index: number }) => (
            <TransferItem
                item={item}
                index={index}
                onPress={onPressTransferItem}
            />
        ),
        [onPressTransferItem]
    )

    const renderSectionHeader = useCallback(
        ({ section }: { section: TransferHistorySectionData }) => (
            <SectionHeader title={section.title} />
        ),
        []
    )

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
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
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
        color: COLORS.contentPrimary,
    },
    sectionHeader: {
        padding: 16,
        backgroundColor: COLORS.backgroundPrimary,
    },
})

export default TransferHistoryScreen
