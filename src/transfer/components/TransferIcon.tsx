import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'
import { COLORS } from '../../constants/colors'

interface TransferIconProps {
    isOutgoing: boolean
    iconSize: number
    containerSize: number
}

const TransferIcon = (props: TransferIconProps) => (
    <View
        style={[
            styles.leadingIcon,
            {
                backgroundColor: props.isOutgoing
                    ? COLORS.accentSecondary
                    : COLORS.accentPrimary,
                height: props.containerSize,
                width: props.containerSize,
                borderRadius: props.containerSize / 2,
            },
        ]}
    >
        <Icon
            size={props.iconSize}
            source={props.isOutgoing ? 'call-made' : 'call-received'}
            color={
                props.isOutgoing
                    ? COLORS.contentOnSecondary
                    : COLORS.contentOnPrimary
            }
        />
    </View>
)

export default memo(TransferIcon)

const styles = StyleSheet.create({
    leadingIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
