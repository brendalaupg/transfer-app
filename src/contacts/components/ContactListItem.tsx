import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import * as ExpoContacts from 'expo-contacts'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'

interface ContactListItemProps {
    contact: ExpoContacts.Contact
    index: number
    onPress?: (contact: ExpoContacts.Contact) => void
}

const ContactListItem = (props: ContactListItemProps) => {
    const { contact, index, onPress } = props

    const renderPhoneNumber = () => (
        <>
            {contact.phoneNumbers?.length ? (
                <Text style={styles.phone}>
                    {contact.phoneNumbers[0].number}
                </Text>
            ) : (
                <Typography
                    style={styles.phone}
                    variant={'body'}
                    size={'medium'}
                >
                    {''}
                </Typography>
            )}
        </>
    )

    return (
        <TouchableOpacity
            onPress={() => onPress?.(contact)}
            testID={`contact-item-${index}`}
        >
            <View style={styles.container}>
                <Typography
                    style={styles.name}
                    variant={'label'}
                    size={'medium'}
                >
                    {contact.name}
                </Typography>
                {renderPhoneNumber()}
            </View>
        </TouchableOpacity>
    )
}

export default memo(ContactListItem)

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    name: {
        color: COLORS.textPrimary,
    },
    phone: {
        color: COLORS.textSecondary,
    },
})
