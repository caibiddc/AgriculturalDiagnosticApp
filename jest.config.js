module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@gluestack-ui|@legendapp|nativewind|react-native-css-interop|react-native-reanimated|react-redux|@reduxjs|@rneui|@expo)/)',
  ],
};
