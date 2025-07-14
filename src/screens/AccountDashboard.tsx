import React, { memo } from 'react'
import { Button, Text, View } from 'react-native'
import { MainStackParamList } from '../navigators/MainStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AccountActions } from '../app/accountSlice'
import AccountSelectors from '../app/accountSelectors'

type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'AccountDashboard'
>

// TODO: Setup and UI
const AccountDashboard = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const accountBalance = useSelector(AccountSelectors.balance)

    const dispatch = useDispatch()

    const onPressTransfer = () => {
        navigate('TransferStack')
    }

    const onPressUpdateBalance = () => {
        dispatch(AccountActions.setAmount(10))
    }

    return (
        <View>
            <Text>{'Account Dashboard'}</Text>
            <Text>{`balance ${accountBalance}`}</Text>
            <Button
                title="Update Balance"
                onPress={() => onPressUpdateBalance()}
            />
            <Button
                title="To Transfer Screen"
                onPress={() => onPressTransfer()}
            />
        </View>
    )
}

export default memo(AccountDashboard)
