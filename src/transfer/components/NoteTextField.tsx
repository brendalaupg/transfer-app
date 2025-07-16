import React, { Dispatch, SetStateAction } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'

const MAX_LENGTH: number = 50

interface NoteTextFieldProps {
    note: string
    setNote: Dispatch<SetStateAction<string>>
}

const NoteTextField = (props: NoteTextFieldProps) => {
    const { note, setNote } = props

    const onChangeText = (text: string) => {
        if (text.length <= MAX_LENGTH) {
            setNote(text)
        }
    }

    const renderCharacterCount = () => (
        <Typography size={'small'} variant={'label'}>
            {`${note.length}/${MAX_LENGTH}`}
        </Typography>
    )

    return (
        <View style={styles.container}>
            <Typography size={'medium'} style={styles.title} variant={'label'}>
                {'Notes (optional)'}
            </Typography>
            <TextInput
                style={styles.textInput}
                value={note}
                onChangeText={onChangeText}
                multiline={true}
                placeholder={'whats the transfer for?'}
            />
            {renderCharacterCount()}
        </View>
    )
}

export default NoteTextField

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: COLORS.contentSecondary,
    },
    characterCount: {
        color: COLORS.contentSecondary,
        textAlign: 'right',
    },
    textInput: {
        height: 60,
    },
})
