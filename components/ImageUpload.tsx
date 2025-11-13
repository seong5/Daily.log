import { supabase } from '@/libs/supabase'
import Feather from '@expo/vector-icons/Feather'
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system/legacy'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'

type ImageUploadProps = {
  value?: string[]
  onChange?: (urls: string[]) => void
}

const MAX_IMAGES = 3

export default function ImageUpload({ value = [], onChange }: ImageUploadProps) {
  const [imageUris, setImageUris] = useState<string[]>(value)

  useEffect(() => {
    if (value !== undefined) {
      setImageUris(value)
    }
  }, [value])

  const handleImagePicker = async () => {
    const remainingSlots = MAX_IMAGES - imageUris.length
    if (remainingSlots <= 0) {
      Alert.alert('이미지 업로드 제한', `최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`)
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: 'images',
      selectionLimit: remainingSlots,
    })

    if (result.canceled) {
      return
    }

    const selectedAssets = result.assets.slice(0, remainingSlots)
    const newImageUris: string[] = []

    try {
      for (const asset of selectedAssets) {
        const base64 = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: 'base64',
        })

        const arrayBuffer = decode(base64)

        const filePath = `uploads/${Date.now()}-${Math.random()}-${asset.fileName ?? 'image.jpg'}`
        const contentType = asset.mimeType ?? 'image/jpeg'

        const { error } = await supabase.storage
          .from('images')
          .upload(filePath, arrayBuffer, { cacheControl: '3600', upsert: false, contentType })

        if (error) throw error

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath)
        const publicUrl = urlData.publicUrl

        newImageUris.push(publicUrl)
      }

      const updatedUris = [...imageUris, ...newImageUris]
      setImageUris(updatedUris)
      onChange?.(updatedUris)
    } catch (err: any) {
      Alert.alert('이미지 업로드 실패', err.message)
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedUris = imageUris.filter((_, i) => i !== index)
    setImageUris(updatedUris)
    onChange?.(updatedUris)
  }

  return (
    <View>
      <Pressable onPress={handleImagePicker} style={styles.uploadButton}>
        <Feather name="image" size={40} color="black" />
        <Text style={styles.uploadText}>
          {imageUris.length > 0 ? `이미지 추가 (${imageUris.length}/${MAX_IMAGES})` : '이미지 선택'}
        </Text>
      </Pressable>
      {imageUris.length > 0 && (
        <View style={styles.imageList}>
          {imageUris.map((uri, index) => (
            <View key={index} style={styles.imageItem}>
              <Image source={{ uri }} style={styles.previewImage} />
              <Pressable style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                <Feather name="x" size={20} color="white" />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#333',
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  imageItem: {
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
