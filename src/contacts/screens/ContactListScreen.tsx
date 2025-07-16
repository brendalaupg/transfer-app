import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    FlatList,
    Linking,
} from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import Typography from '../../common/Typography'
import ListHeader from '../../common/ListHeader'
import ContactListItem from '../components/ContactListItem'

import { COLORS } from '../../constants/colors'
import { AppDispatch, RootState } from '../../app/store'
import { getContactPermission } from '../contactsAsyncThunk'
import { ContactItem, ContactScreenMode } from '../types'
import ContactSelectors from '../contactSelectors'
import { TransferStackParamList } from '../../transfer/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface ContactListProps {
    mode: ContactScreenMode
    onSelect?: (item: ContactItem) => void
}

const ContactScreen = (props: ContactListProps) => {
    const { mode, onSelect } = props

    const dispatch = useDispatch<AppDispatch>()
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const contacts = useSelector((state: RootState) =>
        ContactSelectors.contacts(state)
    )

    const isPermissionGranted = useSelector((state: RootState) =>
        ContactSelectors.isPermissionGranted(state)
    )

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const title = mode === 'list' ? 'Contact List' : 'Select a contact'

    const getContacts = async () => {
        try {
            setIsLoading(true)
            await dispatch(getContactPermission()).unwrap()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!isPermissionGranted) {
            getContacts()
        }
    }, [dispatch, isPermissionGranted])

    const handleOpenSettings = useCallback(() => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        } else {
            Linking.openSettings()
        }
    }, [])

    const keyExtractor = useCallback(
        (item: ContactItem) => `${item.id}-${item.phoneNumber}`,
        []
    )

    const onPressContact = useCallback(
        (contact: ContactItem) => {
            if (mode === 'list') {
                navigation.navigate('TransferStack', {
                    screen: 'TransferScreen',
                    params: {
                        prefill: {
                            name: contact.name,
                            phoneNumber: contact.phoneNumber,
                        },
                    },
                })
                return
            }

            onSelect?.(contact)
            navigation.goBack()
        },
        [navigation]
    )

    const renderItem = useCallback(
        ({ item, index }: { item: ContactItem; index: number }) => (
            <ContactListItem
                contact={item}
                index={index}
                mode={mode}
                onPress={onPressContact}
            />
        ),
        [onPressContact]
    )

    const listHeader = useMemo(
        () => <ListHeader title={title} testId={'contact-list-header'} />,
        []
    )

    const renderLoading = () => (
        <View style={styles.centeredContainer}>
            <ActivityIndicator size={'large'} />
            <Typography variant={'label'} size={'medium'}>
                {'Loading Contacts'}
            </Typography>
        </View>
    )

    const renderEmptyState = () => (
        <View style={styles.centeredContainer}>
            <Typography variant={'body'} size={'small'}>
                {'No contacts found'}
            </Typography>
        </View>
    )

    const renderPermissionDenied = () => (
        <View style={styles.centeredContainer}>
            <Typography variant={'body'} size={'small'}>
                {'Contact permission is required to show your contacts.'}
            </Typography>
            <Button onPress={handleOpenSettings}>{'Open Settings'}</Button>
        </View>
    )

    const renderContactList = () => (
        <FlatList
            data={contacts}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyState}
            ListHeaderComponent={listHeader}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            {isPermissionGranted
                ? isLoading
                    ? renderLoading()
                    : renderContactList()
                : renderPermissionDenied()}
        </SafeAreaView>
    )
}

export const ContactListScreen = () => {
    return <ContactScreen mode={'list'} />
}

type ContactSelectionScreenNavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'ContactSelectionScreen'
>

export const ContactSelectionScreen = (
    props: ContactSelectionScreenNavigationProp
) => {
    const onSelect = props.route.params?.onSelect

    return <ContactScreen mode={'selection'} onSelect={onSelect} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 8,
    },
})
