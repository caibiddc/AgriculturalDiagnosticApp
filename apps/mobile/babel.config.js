module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: ['react-native-reanimated/plugin', ["module-resolver", {
    root: ["./"],
    extensions: [".js", ".ts", ".tsx", ".jsx"],

    alias: {
      "@": "./",
      "tailwind.config": "./tailwind.config.js"
    }
  }]],
};
