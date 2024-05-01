module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-native-vector-icons|@react-native-firebase)',
  ],
  moduleNameMapper: {
    '@react-native-firebase/firestore': '<rootDir>/__mocks__/@react-native-firebase/firestore.ts',
  }
};
