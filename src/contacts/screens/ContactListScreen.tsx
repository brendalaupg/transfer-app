import React, { useCallback, useEffect, useMemo } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    FlatList,
    Linking,
} from 'react-native'
import { Button } from 'react-native-paper'
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
import { ContactItem } from '../types'
import ContactSelectors from '../contactSelectors'

const ContactListScreen = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const contacts = useSelector((state: RootState) =>
        ContactSelectors.contacts(state)
    )
    const isLoading = useSelector((state: RootState) =>
        ContactSelectors.isContactsLoading(state)
    )
    const isPermissionGranted = useSelector((state: RootState) =>
        ContactSelectors.isPermissionGranted(state)
    )

    useEffect(() => {
        if (!isPermissionGranted) {
            dispatch(getContactPermission())
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
            navigation.navigate('TransferStack', {
                screen: 'TransferScreen',
                params: {
                    prefill: {
                        name: contact.name,
                        phoneNumber: contact.phoneNumber,
                    },
                },
            })
        },
        [navigation]
    )

    const renderItem = useCallback(
        ({ item, index }: { item: ContactItem; index: number }) => (
            <ContactListItem
                contact={item}
                index={index}
                onPress={onPressContact}
            />
        ),
        [onPressContact]
    )

    const listHeader = useMemo(
        () => <ListHeader title="Contact List" testId="contact-list-header" />,
        []
    )

    const renderLoading = () => (
        <View style={styles.centered}>
            <Typography variant="body" size="small">
                Loading contacts...
            </Typography>
        </View>
    )

    const renderEmptyState = () => (
        <View style={styles.centered}>
            <Typography variant="body" size="small">
                No contacts found.
            </Typography>
        </View>
    )

    const renderPermissionDenied = () => (
        <View style={styles.centered}>
            <Typography variant="body" size="small">
                Contact permission is required to show your contacts.
            </Typography>
            <Button onPress={handleOpenSettings}>Open Settings</Button>
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
            removeClippedSubviews
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

export default ContactListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
})
