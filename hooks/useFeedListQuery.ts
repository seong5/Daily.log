import { supabase } from '@/libs/supabase'
import { FeedPost } from '@/types'
import { useQuery } from '@tanstack/react-query'

type PostRow = {
  id: string
  title: string
  description: string
  created_at: string
  user_id: string
}

export const useFeedListQuery = () => {
  return useQuery<FeedPost[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const rows = data as PostRow[]

      const mapped: FeedPost[] = rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        title: row.title,
        description: row.description,
        createdAt: row.created_at,
        author: {
          id: row.user_id,
          nickname: 'dd',
          imageUri: '',
        },
        imageUris: [],
      }))
      return mapped
    },
  })
}
