import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider, Icon, IconButton } from 'react-native-paper'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'
import { ContactItem, ContactScreenMode } from '../types'
import { validateMYPhoneNumber } from '../../common/utils'

interface ContactListItemProps {
    contact: ContactItem
    index: number
    mode: ContactScreenMode
    onPress?: (contact: ContactItem) => void
}

const ContactListItem = (props: ContactListItemProps) => {
    const { contact, index, mode, onPress } = props

    const isMalaysianNumber = validateMYPhoneNumber(contact.phoneNumber)
    const renderSubtitle = () => (
        <>
            <Typography size={'medium'} variant={'label'} style={styles.phone}>
                {contact.phoneNumber}
            </Typography>
            {!isMalaysianNumber && (
                <Typography
                    size={'small'}
                    variant={'body'}
                    style={styles.unavailable}
                >
                    {'Not available on DuitNow'}
                </Typography>
            )}
        </>
    )

    const renderListMetadata = () => (
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
            {renderSubtitle()}
        </View>
    )

    const renderMetaData = () =>
        mode === 'list' ? renderListMetadata() : renderSelectionMetadata()

    const onPressItem = () => {
        if (!isMalaysianNumber) {
            return
        }

        onPress?.(contact)
    }

    return (
        <TouchableOpacity
            onPress={onPressItem}
            testID={`contact-item-${index}`}
        >
            <View style={styles.container}>
                {renderItemContent()}
                {isMalaysianNumber && renderMetaData()}
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
        height: 75,
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
    subtitleContainer: {
        flexDirection: 'row',
    },
    unavailable: {
        color: COLORS.error,
    },
})
