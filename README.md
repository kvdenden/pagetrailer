# Pagetrailer

Easy document version management

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Install dependencies with `yarn install` followed by `yarn install-app-deps`

Open 2 terminals and run webpack server in one terminal with `yarn start` and run electron in other terminal with `yarn electron`.

You need to restart the electron process after you make changes to files in the `./public` folder.

## Building

Run `yarn electron-pack`. This will create binaries and installers for windows and macos in the `./dist` folder.
