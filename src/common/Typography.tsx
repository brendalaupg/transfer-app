import React from 'react'
import { Text, TextProps } from 'react-native-paper'
import { StyleProp, TextStyle } from 'react-native'

type TypographyVariant =
    | 'header'
    | 'title'
    | 'subtitle'
    | 'body'
    | 'caption'
    | 'overline'
    | 'label'

type TypographySize = 'small' | 'medium' | 'large' | 'extra-large'

interface TypographyProps extends Omit<TextProps<never>, 'style' | 'variant'> {
    variant: TypographyVariant
    size: TypographySize
    style?: StyleProp<TextStyle>
    children: React.ReactNode
}

const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    size = 'medium',
    children,
    style,
    ...props
}) => {
    // Define font weights for different text hierarchy levels
    const getFontWeight = (
        variant: TypographyVariant
    ): TextStyle['fontWeight'] => {
        switch (variant) {
            case 'header':
                return '700' as const // Bold
            case 'title':
                return '600' as const // Semi-bold
            case 'subtitle':
                return '500' as const // Medium
            case 'body':
                return '400' as const // Normal
            case 'caption':
                return '400' as const // Normal
            case 'overline':
                return '500' as const // Medium
            case 'label':
                return '500' as const // Medium
            default:
                return '400' as const // Normal
        }
    }

    // Define font sizes for different size variants
    const getFontSize = (size: TypographySize): number => {
        switch (size) {
            case 'small':
                return 12
            case 'medium':
                return 16
            case 'large':
                return 20
            case 'extra-large':
                return 28
            default:
                return 16
        }
    }

    // Combine the font weight, size, and any existing styles
    const combinedStyle: StyleProp<TextStyle> = [
        {
            fontWeight: getFontWeight(variant),
            fontSize: getFontSize(size),
        },
        style,
    ]

    return (
        <Text style={combinedStyle} {...props}>
            {children}
        </Text>
    )
}

export default Typography
