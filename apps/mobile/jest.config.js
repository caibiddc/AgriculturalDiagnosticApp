module.exports = {
  preset: 'react-native',
  // React Native UI dependencies ship modern ESM/JSX source.
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@gluestack-ui|@legendapp|nativewind|react-native-css-interop|react-native-reanimated|@rneui|@expo)/)',
  ],
};
