import { useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { AuthenticationType } from 'expo-local-authentication'

type BiometricsType = 'fingerprint' | 'face_recognition' | 'iris'

const useBiometrics = () => {
    const [biometricType, setBiometricsType] = useState<
        BiometricsType | undefined
    >()

    const checkBiometricsHardware = async () => {
        const result = await LocalAuthentication.hasHardwareAsync()
        if (!result) {
            return
        }

        const supportedBiometrics =
            await LocalAuthentication.supportedAuthenticationTypesAsync()
        // we prioritise face id first
        if (
            supportedBiometrics.find(
                (value) => value === AuthenticationType.FACIAL_RECOGNITION
            )
        ) {
            setBiometricsType('face_recognition')
            return AuthenticationType.FACIAL_RECOGNITION
        } else if (
            supportedBiometrics.find(
                (value) => value === AuthenticationType.IRIS
            )
        ) {
            setBiometricsType('iris')
            return AuthenticationType.IRIS
        } else if (
            supportedBiometrics.find(
                (value) => value === AuthenticationType.FINGERPRINT
            )
        ) {
            setBiometricsType('fingerprint')
            return AuthenticationType.FINGERPRINT
        }
    }

    return {
        biometricType,
        checkBiometricsHardware,
    }
}

export default useBiometrics
