import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Linking,
    Platform,
} from 'react-native'
import * as ExpoContacts from 'expo-contacts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TransferStackParamList } from '../../transfer/types'
import ContactListItem from '../components/ContactListItem'
import { Button } from 'react-native-paper'
import Typography from '../../common/Typography'
import ContactListHeader from '../components/ContactListHeader'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'TransferHistoryScreen'
>

const ContactListScreen = () => {
    const [contacts, setContacts] = useState<ExpoContacts.Contact[]>([])
    const [permissionStatus, setPermissionStatus] = useState<
        'undetermined' | 'granted' | 'denied'
    >('undetermined')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getPermissionAndContacts = async () => {
            const { status } = await ExpoContacts.requestPermissionsAsync()
            setPermissionStatus(status)
            if (status === 'granted') {
                const { data } = await ExpoContacts.getContactsAsync({
                    fields: [
                        ExpoContacts.Fields.Name,
                        ExpoContacts.Fields.PhoneNumbers,
                    ],
                })
                setContacts(data)
            }
            setIsLoading(false)
        }
        getPermissionAndContacts()
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

    const keyExtractor = (item: ExpoContacts.Contact) =>
        item.id || item.name || item.phoneNumbers?.[0]?.number || 'unknown'

    const renderContactList = () => (
        <FlatList
            data={contacts}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
                <ContactListItem contact={item} index={index} />
            )}
            ListEmptyComponent={renderEmptyState}
            ListHeaderComponent={ContactListHeader}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            {permissionStatus === 'granted'
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
