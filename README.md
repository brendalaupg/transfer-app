## Description

This project demonstrates a secure payment transfer module, with biometrics prompt. Its running React Native 0.79.5 and Expo 53.

## Assumptions

-   Features has been scoped down to only transfering payment out of the current account
-   Currency is all in RM
-   Clicking on 'Transfer Again' Button in Transfer Details will prefill the New Transfer Screen with the previous values (e.g. recipiant, amount, note)
-   Selecting a contact from contact list will navigate to the New Transfer Screen, and prefill the contact
-   Each item in the contact list is unique by phone number. A contact that has multiple phone numbers will be listed as different items

### Scope

To keep the project focused, a few key details / structure is left out to meet timeline requirements:

-   the passcode and biometrics feature should be separated out of the transfer module
-   copies should be moved into a translation file and handled with i18n for langague switching
-   design system should be more comprehensive
-   secure pin should not be hardcoded, and properly set during the beginning of account creation

## High Level Flow

-   diagram
-   design decisions

## Demo Video

-   iOS
-   Android

## How to Setup

-   Development build needs to be setup since FaceID authentication is not supported on Expo Go

1. Install app dependencies with `npm install`
2. Start the Metro Server with `npm start`
3. press 's' to switch to development build
4. Start the Simulator / Emulator

-   For iOS, press i to open the iOS simulator
-   Alternatively, you may open the `xcworkspace` (found in ios subfolder) file Xcode directly, and start the active scheme by clicking on the "Run" button

-   Android, press a to open Android emulator

## Notes on Testing

-   The hardcode pin `000000`
-   there are 3 places to start a new transfer flow, from the Dashboard:

1.  Tap on Transfer (no prefill)
2.  Tap on Contact, and tap on a contact list item (prefill recipiant)
3.  Tap on History, and tap on a transfer item (thats transfering out). In the details screen click on the 'Tranfer Again' Button (prefill recipiant, amount and note)

## Troubleshotting

-   To re-install pods: for iOS, navigate to the ios folder and re-install `cd ios;pod install`
-   To clean the project:

    -   on Android Studio: Build -> Clean Project
    -   on Xcode: Product -> Clean Build Folder
    -   Restart metro development servers with `npm start`

-   Clear Cache: run the following command: `npm cache clean --force`
-   to rebuild the App (iOS): delete the node_modules folder, run `npm install && cd ios;pod install`, and rebuild the app
