# GotItAndroid

Android app for GotIt project.

The server is Free and Open Source, too:
https://github.com/MidnightThings/GotIt

## Guide for Windows 
(unfortunately, I cannot offer guides for unix based systems)

## Prerequisites:
1. Install Android Studio
2. Once Android Studio is running, navigate to SDK Manager and install (at least) Android SDK 28. Install any other versions you like (e.g. 30)
3. Install npm package manager (best way is by installing node.js)
4. Install cordova globally: npm install -g cordova
5. Install typescript globally: npm install -g typescript

## Setup and run Project:
1. Copy /src/appConfigExample.json to /src/appConfig.json and add your local server ip
2. Go into project root and issue in terminal: npm install
3. Change directory to /src-cordova (command: cd src-cordova) and issue in terminal: npm install

To run your code in emulator, issue: npm run serve
