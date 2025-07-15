import React, { useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Linking,
    Platform,
} from 'react-native'
import ContactListItem from '../components/ContactListItem'
import { Button } from 'react-native-paper'
import Typography from '../../common/Typography'
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { getContactPermission } from '../contactsAsyncThunk'
import ContactSelectors from '../contactSelectors'
import { ContactItem } from '../types'
import ListHeader from '../../common/ListHeader'

const ContactListScreen = () => {
    const contacts = useSelector(ContactSelectors.contacts)
    const isLoading = useSelector(ContactSelectors.isContactsLoading)
    const isPermissionGranted = useSelector(
        ContactSelectors.isPermissionGranted
    )

    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (isPermissionGranted) {
            return
        }

        dispatch(getContactPermission())
    }, [])

    const handleOpenSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        } else {
            Linking.openSettings()
        }
    }

    const renderLoading = () => (
        <View style={styles.centered}>
            <Typography variant={'body'} size={'small'}>
                {'Loading contacts...'}
            </Typography>
        </View>
    )

    const renderEmptyState = () => (
        <View style={styles.centered}>
            <Text>{'No contacts found.'}</Text>
        </View>
    )

    const renderPermissionDenied = () => (
        <View style={styles.centered}>
            <Typography variant={'body'} size={'small'}>
                {'Contact permission is required to show your contacts.'}
            </Typography>
            <Button onPress={handleOpenSettings}>{'Open Settings'}</Button>
        </View>
    )

    const keyExtractor = (item: ContactItem) => `${item.id}-${item.phoneNumber}`

    const onPressContact = (contact: ContactItem) => {
        navigation.navigate('TransferStack', {
            screen: 'TransferScreen',
            params: {
                prefill: {
                    name: contact.name,
                    phoneNumber: contact.phoneNumber,
                },
            },
        })
    }

    const renderContactList = () => (
        <FlatList
            data={contacts}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
                <ContactListItem
                    contact={item}
                    index={index}
                    onPress={onPressContact}
                />
            )}
            ListEmptyComponent={renderEmptyState}
            ListHeaderComponent={
                <ListHeader
                    title={'Contact List'}
                    testId={'contact-list-header'}
                />
            }
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
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
