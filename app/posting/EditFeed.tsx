import Button from '@/components/common/Button'
import DescriptionText from '@/components/DescriptionText'
import ImageUpload from '@/components/ImageUpload'
import TitleText from '@/components/TitleText'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { supabase } from '@/libs/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'

type PostFormValues = {
  title: string
  description: string
  imageUrls: string[]
}

export default function EditFeedScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: session } = useAuthQuery()

  const postForm = useForm<PostFormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUrls: [],
    },
    mode: 'onChange',
  })

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      const { data, error } = await supabase
        .from('post')
        .select('title, description, user_id, image_url')
        .eq('id', id)
        .single()

      if (error) {
        Alert.alert('게시글을 불러오는데 실패')
        router.back()
        return
      }

      // image_url이 JSON 배열인지 단일 문자열인지 확인
      let imageUrls: string[] = []
      if (data.image_url) {
        try {
          const parsed = JSON.parse(data.image_url)
          imageUrls = Array.isArray(parsed) ? parsed : [data.image_url]
        } catch {
          // JSON 파싱 실패 시 단일 문자열로 처리
          imageUrls = [data.image_url]
        }
      }

      postForm.reset({
        title: data.title,
        description: data.description,
        imageUrls,
      })
    }
    fetchPost()
  }, [id, session?.user?.id, router, postForm])

  const onSubmit = async (values: PostFormValues) => {
    if (!id) return
    const { title, description, imageUrls } = values

    const imageUrl = imageUrls.length > 0 ? JSON.stringify(imageUrls) : null

    const { error } = await supabase
      .from('post')
      .update({ title, description, image_url: imageUrl })
      .eq('id', id)

    if (error) {
      Alert.alert('게시물 수정 실패', error.message)
      return
    }
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    Alert.alert('게시물 수정 성공', '', [{ text: '확인', onPress: () => router.push('/') }])
  }

  return (
    <View style={styles.container}>
      <FormProvider {...postForm}>
        <TitleText />
        <DescriptionText />
        <Controller
          name="imageUrls"
          control={postForm.control}
          defaultValue={[]}
          render={({ field: { value, onChange } }) => (
            <ImageUpload value={value} onChange={onChange} />
          )}
        />
        <Button label="수정하기" onPress={postForm.handleSubmit(onSubmit)} />
      </FormProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    gap: 25,
  },
})
