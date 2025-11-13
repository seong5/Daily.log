import Button from '@/components/common/Button'
import EmailInput from '@/components/EmailInput'
import PasswordInput from '@/components/PasswordInput'
import { supabase } from '@/libs/supabase'
import { useNavigation } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginScreen() {
  const navigation: any = useNavigation()
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: LoginFormValues) => {
    const { email, password } = values
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      Alert.alert('로그인 실패', error.message ?? '이메일 혹은 비밀번호를 확인해주세요.')
      return
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('id', data.user.id)
        .maybeSingle()

      if (!profile?.nickname) {
        const nickname = data.user.user_metadata?.nickname
        if (nickname) {
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            nickname: nickname,
          })

          if (profileError) {
            console.error('프로필 동기화 실패:', profileError)
          } else {
            console.log('프로필 동기화 성공:', { id: data.user.id, nickname })
          }
        }
      }
    }

    Alert.alert('로그인에 성공했습니다.', '홈으로 이동합니다.', [
      {
        text: '확인',
        onPress: () => {
          navigation.navigate('(tabs)')
        },
      },
    ])
  }

  const inset = useSafeAreaInsets()

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <View style={[styles.fixed, { paddingBottom: inset.bottom || 12 }]}>
        <Button label="로그인하기" variant="primary" onPress={loginForm.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 20,
  },
  fixed: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
})
