import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import FeedCard from './FeedCard'

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: '테스트제목입니다.',
    description: '테스트본문입니다.',
    createdAt: '2025-11-10',
    imageUris: [],
    author: {
      id: 1,
      nickname: '성5',
      imageUri: '',
    },
  },
  {
    id: 2,
    userId: 1,
    title: '테스트제목2입니다.',
    description: '테스트본문2입니다.',
    createdAt: '2025-11-09',
    imageUris: [],
    author: {
      id: 1,
      nickname: '성5',
      imageUri: '',
    },
  },
  {
    id: 3,
    userId: 1,
    title: '테스트제목3입니다.',
    description: '테스트본문3입니다.',
    createdAt: '2025-11-08',
    imageUris: [],
    author: {
      id: 1,
      nickname: '성5',
      imageUri: '',
    },
  },
]

export default function FeedList() {
  return (
    <FlatList
      data={dummyData}
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
