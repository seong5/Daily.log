import React from 'react'
import { Image, Pressable, ScrollView, View } from 'react-native'

type PreviewImagesProps = {
  url: string | null
  onPressImage?: (url: string) => void
}

export default function PreviewImages({ url, onPressImage }: PreviewImagesProps) {
  if (!url) {
    return null
  }

  return (
    <View>
      <ScrollView>
        <Pressable onPress={() => onPressImage?.(url)}>
          <Image source={{ uri: url }} />
        </Pressable>
      </ScrollView>
    </View>
  )
}
