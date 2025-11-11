import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Input from './common/Input'

export default function PasswordConfirmInput() {
  const { control } = useFormContext()
  const passwordWatch = useWatch({ control, name: 'password' })

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data !== passwordWatch) {
            return '비밀번호가 일치하지 않습니다.'
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
          secureTextEntry
        />
      )}
    />
  )
}
