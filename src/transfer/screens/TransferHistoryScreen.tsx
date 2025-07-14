import React from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../../constants/colors'
import TransferSelectors from '../transferSelectors'
import { StyleSheet, SectionList, SafeAreaView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TransferStackParamList } from '../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Typography from '../../common/Typography'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
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

    return (
        <SafeAreaView>
            <SectionList
                sections={history}
                keyExtractor={(item, index) => item.id + index}
                renderItem={({ item }) => (
                    <Typography variant={'label'} size={'medium'}>
                        {`${item.amount} from ${item.fromAccountNumber} to ${item.toAccountNumber}`}
                    </Typography>
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
    },
})

export default TransferHistoryScreen
