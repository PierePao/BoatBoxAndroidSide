# Boatbox - SMS Location Tracker

This React Native application tracks SMS messages, extracts location data from them, and displays the latest known location on a map. It is designed to work on Android devices, including those with dual SIMs.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
  - [1. Install Node.js and Yarn](#1-install-nodejs-and-yarn)
  - [2. Install Java Development Kit (JDK)](#2-install-java-development-kit-jdk)
  - [3. Install Android Studio](#3-install-android-studio)
  - [4. Configure Android SDK and NDK](#4-configure-android-sdk-and-ndk)
- [Project Setup](#project-setup)
- [Building and Running the App](#building-and-running-the-app)
- [Testing the App](#testing-the-app)
  - [Using an Emulator](#using-an-emulator)
  - [Using a Physical Device](#using-a-physical-device)
- [Debugging and Logging](#debugging-and-logging)

## Prerequisites

- A Windows, macOS, or Linux machine.
- A physical Android device or an Android emulator.

## Environment Setup

Follow these steps to set up your development environment.

### 1. Install Node.js and Yarn

- Install **Node.js** version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
- Install **Yarn** for package management (optional but recommended):
  ```shell
  npm install -g yarn
  ```

### 2. Install Java Development Kit (JDK)

- The project requires **JDK 17**. You can install it using a package manager like Chocolatey (Windows) or Homebrew (macOS), or download it directly from a provider like [Adoptium](https://adoptium.net/).

  **Windows (with Chocolatey):**
  ```shell
  choco install temurin17jdk
  ```

### 3. Install Android Studio

- Download and install [Android Studio](https://developer.android.com/studio).
- During the setup wizard, make sure to install the following components:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device

### 4. Configure Android SDK and NDK

This project requires specific versions of the Android SDK and NDK.

1.  Open Android Studio.
2.  Go to **Settings/Preferences** > **Appearance & Behavior** > **System Settings** > **Android SDK**.
3.  In the **SDK Platforms** tab, check the box for **Android 15.0 ("VanillaIceCream")** (API Level 35) and click "Apply" to install it.
4.  Go to the **SDK Tools** tab.
5.  Check **Show Package Details** in the bottom right corner.
6.  Under **NDK (Side by side)**, select version **29.0.13599879**.
7.  Under **Android SDK Build-Tools**, select version **35.0.0**.
8.  Click "Apply" to download and install the selected components.

## Project Setup

1.  **Clone the repository:**
    ```shell
    git clone <repository-url>
    cd Boatbox
    ```

2.  **Install project dependencies:**
    ```shell
    npm install
    ```
    or if you are using Yarn:
    ```shell
    yarn install
    ```

## Building and Running the App

1.  **Connect a device or start an emulator:**
    - **Physical Device:** Enable USB Debugging on your Android device and connect it to your computer via USB.
    - **Emulator:** Open Android Studio, go to the **Virtual Device Manager**, and start an emulator.

2.  **Run the application:**
    Open a terminal in the project's root directory and run:
    ```shell
    npx react-native run-android
    ```
    This command will build the Android app, install it on your device/emulator, and start the Metro bundler.

## Testing the App

To test the SMS tracking functionality, you need to send an SMS to the device/emulator running the app. The message must contain coordinates in one of the following formats:

- `Latitude: 40.7128 Longitude: -74.0060`
- `(lat,lon): 40.7128,-74.0060`

### Using an Emulator

1.  Click the **three dots** (...) in the emulator's side panel to open the Extended Controls.
2.  Go to the **Phone** section.
3.  Enter a sender number and the message text with coordinates.
4.  Click **Send Message**.

### Using a Physical Device

- Use another phone to send an SMS with the correctly formatted coordinates to the device running the app.

## Debugging and Logging

To view real-time logs from the application, including logs from the native Android code (`SMSReceiver`), use the `log-android` command.

1.  Make sure the app is running on a device or emulator.
2.  Open a new terminal in the project's root directory.
3.  Run the following command:
    ```shell
    npx react-native log-android
    ```
This will stream logs from the device, which is useful for debugging SMS reception, message parsing, and other native functionalities.
