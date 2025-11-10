import Button from '@/components/common/Button'
import { Link, router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AuthScreen() {
  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button label="이메일로 로그인하기" onPress={() => router.push('/auth/login')} />
        <Link href={'/auth/signup'} style={styles.signup}>
          이메일로 회원가입
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
  },
  signup: {
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})
