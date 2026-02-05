# TicTacToe

A simple tic-tac-toe game built with React Native and Expo.

## 📱 Features

- Two-player tic-tac-toe game
- Light and dark theme support
- Internationalization (multiple languages)
- Responsive design for different screen sizes
- Support for iOS, Android, and web browsers

## 🛠 Technologies

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Typed JavaScript
- **Tailwind CSS** - CSS framework
- **Zustand** - State management
- **i18next** - Internationalization
- **React Native Reanimated** - Animations

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm
- Expo CLI

### Installation

```bash
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Offline mode
pnpm dev:offline

# Web only
pnpm web

# Android
pnpm android

# iOS
pnpm ios
```

### Production Build

```bash
# Web
pnpm web:prod

# Android (release)
pnpm android:prod
```

## 📦 Android Release Builds

### Keystore Setup

For production Android builds, you need to create a release keystore:

1. **Generate keystore** (must be named `release.keystore` with alias `release-key`):

   ```bash
   cd android/app
   keytool -genkeypair -v -keystore release.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure environment** - Create `.env` file in project root:

   ```env
   # Android Keystore Passwords (only sensitive data)
   KEYSTORE_PASSWORD=your_keystore_password
   KEY_PASSWORD=your_key_password
   ```

   **Important**:
   - File must be named exactly `release.keystore`
   - Alias is hardcoded as `release-key`
   - Use passwords WITHOUT special characters (only letters and numbers)
   - Both passwords are usually the same if keytool didn't ask separately

### Build Commands

```bash
# Build APK (for sideloading/testing)
cd android && ./gradlew assembleRelease

# Build AAB (for Google Play Store)
cd android && ./gradlew bundleRelease -Pandroid.bundle=true
```

**Output locations:**

- APKs: `android/app/build/outputs/apk/release/`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
