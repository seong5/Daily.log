import FeedList from '@/components/FeedList'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FeedList />
    </SafeAreaView>
  )
}
