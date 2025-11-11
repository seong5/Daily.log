import { useFeedListQuery } from '@/hooks/useFeedListQuery'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import FeedCard from './FeedCard'

export default function FeedList() {
  const { data: posts, isLoading, isError } = useFeedListQuery()

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  if (isError) {
    return (
      <View>
        <Text>피드를 불러오지 못했습니다.</Text>
      </View>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <View>
        <Text>피드가 없습니다.</Text>
      </View>
    )
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <FeedCard feed={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    gap: 10,
  },
})
