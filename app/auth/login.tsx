import Button from '@/components/common/Button'
import EmailInput from '@/components/EmailInput'
import PasswordInput from '@/components/PasswordInput'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginScreen() {
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (loginFormValues: LoginFormValues) => {
    console.log('loginFormValues', loginFormValues)
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
