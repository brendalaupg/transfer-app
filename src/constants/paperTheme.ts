import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper'
import { COLORS } from './colors'

export const APP_THEME: MD3Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: COLORS.accentPrimary,
        secondary: COLORS.accentSecondary,
        background: COLORS.backgroundPrimary,
        error: COLORS.error,
    },
}
