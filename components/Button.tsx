import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface ButtonProps {
  label: string
  size?: 'md' | 'lg'
  variant?: 'primary'
}

function Button({ label, size = 'lg', variant = 'primary' }: ButtonProps) {
  return (
    <Pressable style={[styles.container, styles[size], styles[variant]]}>
      <Text>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lg: {
    width: '100%',
    height: 44,
  },
  md: {},
  primary: { backgroundColor: '#b0a0e3', fontSize: 14, fontWeight: 'semibold', color: '#eeeeee' },
})

export default Button
