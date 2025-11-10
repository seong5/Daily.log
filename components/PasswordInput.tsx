import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Input from './common/Input'

export default function PasswordInput() {
  const { control } = useFormContext()

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return '비밀번호는 8자 이상 입력해주세요.'
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
          secureTextEntry
          error={error?.message}
        />
      )}
    />
  )
}
