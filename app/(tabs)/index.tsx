import Button from '@/components/Button'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>테스트</Text>
      <Button label="버튼" size="lg" variant="secondary" onPress={() => {}} />
      <Button label="테스트1" size="md" variant="primary" onPress={() => {}} />
      <Button label="테스트2" size="sm" onPress={() => {}} />
    </SafeAreaView>
  )
}
