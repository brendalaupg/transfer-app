import { useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import { AuthenticationType } from 'expo-local-authentication'

type BiometricsType = 'fingerprint' | 'face_recognition' | 'iris'

const useBiometrics = () => {
    const [biometricType, setBiometricsType] = useState<
        BiometricsType | undefined
    >()

    const getBiometricsType = (types: AuthenticationType[]) => {
        if (
            types.find(
                (value) => value === AuthenticationType.FACIAL_RECOGNITION
            )
        ) {
            setBiometricsType('face_recognition')
            return AuthenticationType.FACIAL_RECOGNITION
        } else if (types.find((value) => value === AuthenticationType.IRIS)) {
            setBiometricsType('iris')
            return AuthenticationType.IRIS
        } else if (
            types.find((value) => value === AuthenticationType.FINGERPRINT)
        ) {
            setBiometricsType('fingerprint')
            return AuthenticationType.FINGERPRINT
        }
    }

    const checkBiometricsHardware = async () => {
        try {
            const result = await LocalAuthentication.hasHardwareAsync()
            if (!result) {
                return false
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync()
            if (!isEnrolled) {
                return false
            }

            const supportedBiometrics =
                await LocalAuthentication.supportedAuthenticationTypesAsync()
            return getBiometricsType(supportedBiometrics)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        biometricType,
        checkBiometricsHardware,
    }
}

export default useBiometrics
