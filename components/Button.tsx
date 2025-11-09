import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/constants/buttonStyles'
import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'

interface ButtonProps extends PressableProps {
  label: string
  size?: keyof typeof BUTTON_SIZES
  variant?: keyof typeof BUTTON_VARIANTS
}

export default function Button({ label, size = 'lg', variant = 'primary', ...props }: ButtonProps) {
  const sizeStyle = BUTTON_SIZES[size]
  const variantStyle = BUTTON_VARIANTS[variant]

  return (
    <Pressable
      {...props}
      className={`
        w-full rounded-lg justify-center items-center 
        ${sizeStyle.container} 
        ${variantStyle.container}
        active:opacity-80
      `}
    >
      <Text className={`font-semibold ${variantStyle.text} ${sizeStyle.text}`}>{label}</Text>
    </Pressable>
  )
}
