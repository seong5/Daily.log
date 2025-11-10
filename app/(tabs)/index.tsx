import Button from '@/components/common/Button'
import FeedList from '@/components/FeedList'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Button label="버튼" onPress={() => router.push('/auth')} />
      <FeedList />
    </SafeAreaView>
  )
}
