import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider, Icon, IconButton, Text } from 'react-native-paper'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'
import { ContactItem, ContactScreenMode } from '../types'

interface ContactListItemProps {
    contact: ContactItem
    index: number
    mode: ContactScreenMode
    onPress?: (contact: ContactItem) => void
}

const ContactListItem = (props: ContactListItemProps) => {
    const { contact, index, mode, onPress } = props

    const renderPhoneNumber = () => (
        <>
            {contact.phoneNumber ? (
                <Text style={styles.phone}>{contact.phoneNumber}</Text>
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

    const renderMetadata = () => (
        <View style={styles.metadata}>
            <IconButton
                icon={'send'}
                onPress={() => onPress?.(contact)}
                containerColor={COLORS.accentPrimary}
                iconColor={COLORS.textOnPrimary}
            />
            <Typography variant={'label'} size={'medium'}>
                {'Send'}
            </Typography>
        </View>
    )

    const renderSelectionMetadata = () => (
        <View style={styles.metadata}>
            <Icon
                source={'chevron-right'}
                size={32}
                color={COLORS.textSecondary}
            />
        </View>
    )

    const renderItemContent = () => (
        <View style={styles.itemContent}>
            <Typography style={styles.name} variant={'label'} size={'medium'}>
                {contact.name}
            </Typography>
            {renderPhoneNumber()}
        </View>
    )

    return (
        <TouchableOpacity
            onPress={() => onPress?.(contact)}
            testID={`contact-item-${index}`}
        >
            <View style={styles.container}>
                {renderItemContent()}
                {mode === 'list' ? renderMetadata() : renderSelectionMetadata()}
            </View>
            <Divider />
        </TouchableOpacity>
    )
}

export default memo(ContactListItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemContent: {
        gap: 4,
    },
    name: {
        color: COLORS.textPrimary,
    },
    phone: {
        color: COLORS.textSecondary,
    },
    metadata: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
