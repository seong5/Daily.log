import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>설정</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
})
