module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@gluestack-ui|@legendapp|nativewind|react-native-css-interop|react-native-reanimated|@rneui|@expo)/)',
  ],
};
