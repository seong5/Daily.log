import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface InputProps {
  label?: string
}

export default function Input({ label }: InputProps) {
  return (
    <View>
      <Text>{label}</Text>
      <View>
        <TextInput />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
