

## setup tools

react-native is used as a submodule


## Expo uses a fork of RN for development

use a fork of `react-native` in this repo; this fork is located at `react-native-lab/react-native`.

## build folder is commited

All of the package's `build/` code should be committed. This is because it is simpler to reproduce issues if all contributors are running the same code and so we don't need to rebuild dozen of packages locally on every git pull or git checkout operation.

## Scripts and tooling in `expo-module-scripts`

We use a unified set of basic Bash scripts and configs called expo-module-scripts to ensure everything runs smoothly (TypeScript, Babel, Jest, etc...).

