module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      // Expo 기본 프리셋 + NativeWind JSX 설정
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      // NativeWind용 프리셋
      'nativewind/babel',
    ],
    plugins: [
      // expo-router용 플러그인
      require.resolve('expo-router/babel'),
    ],
  }
}
