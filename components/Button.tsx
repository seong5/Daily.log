import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'

interface ButtonProps extends PressableProps {
  label: string
  size?: 'md' | 'lg'
  variant?: 'primary'
}

export default function Button({ label, size = 'lg', variant = 'primary', ...props }: ButtonProps) {
  const sizeClass = size === 'lg' ? 'w-full h-11' : 'px-4 py-2'
  const variantClass = variant === 'primary' ? 'bg-[#b0a0e3]' : ''

  return (
    <Pressable
      {...props}
      className={`
        rounded-lg justify-center items-center 
        ${sizeClass} 
        ${variantClass}
        active:opacity-80
      `}
    >
      <Text className="text-[#eeeeee] text-[16px] font-semibold">{label}</Text>
    </Pressable>
  )
}
