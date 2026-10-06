# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Android production APK with EAS

The `production-apk` profile builds a signed Android APK for direct installation and sharing. It uses EAS internal distribution and does not require a Google Play Console account. An Expo account is still required. This does not publish the app to an app store.

1. Create or sign in to an account at [expo.dev](https://expo.dev).
2. From the project root, log in and verify the project association:

   ```bash
   npx eas-cli@latest login
   npx eas-cli@latest whoami
   npx eas-cli@latest project:info
   ```

3. Start the Android build:

   ```bash
   npx eas-cli@latest build --platform android --profile production-apk
   ```

   On the first build, allow EAS to create and manage the Android signing keystore. Keep that keystore associated with this app for future builds so installed updates remain compatible. When the build finishes, use its EAS build page or installation link to download and install the APK.

The regular `production` profile remains an Android App Bundle intended for a future app-store release. Submitting to Google Play requires a Google Play Developer account and Play Console setup; the APK profile is for direct distribution instead.

### Version control for releases

Keep build configuration and app source in Git, and keep signing keys, service-account JSON files, and local secrets out of the repository. Before building a release, review and commit the intended changes, then build from that commit:

```bash
git status
git switch -c feat/eas-android-apk
git add app.json eas.json package.json package-lock.json README.md
git commit -m "Configure EAS Android APK release"
npx eas-cli@latest build --platform android --profile production-apk
```

Use a different branch name if `feat/eas-android-apk` already exists. For later releases, update the app's user-facing version in `app.json` when appropriate; EAS manages and increments the Android build version remotely for these profiles.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
