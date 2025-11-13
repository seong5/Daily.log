import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

type PreviewImagesProps = {
  urls: string[]
  onPressImage?: (url: string) => void
}

export default function PreviewImages({ urls, onPressImage }: PreviewImagesProps) {
  if (!urls || urls.length === 0) {
    return null
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {urls.map((url, index) => (
            <Pressable key={index} onPress={() => onPressImage?.(url)}>
              <Image source={{ uri: url }} style={styles.image} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
})
