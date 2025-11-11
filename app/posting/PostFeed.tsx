import DescriptionText from '@/components/DescriptionText'
import TitleText from '@/components/TitleText'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

type PostFormValues = {
  title: string
  description: string
}

export default function PostFeed() {
  const postForm = useForm<PostFormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  return (
    <View style={styles.container}>
      <FormProvider {...postForm}>
        <TitleText />
        <DescriptionText />
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
