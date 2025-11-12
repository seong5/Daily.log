import { supabase } from '@/libs/supabase'
import type { FeedPost } from '@/types'
import {
  useInfiniteQuery,
  useQuery,
  type UseInfiniteQueryResult,
  type UseQueryResult,
} from '@tanstack/react-query'

const PAGE_SIZE = 10

type PostRow = {
  id: string
  title: string
  description: string
  created_at: string
  user_id: string
  image_url: string | null
}

const mapRowsToFeedPosts = async (rows: PostRow[]): Promise<FeedPost[]> => {
  const postsWithCommentCount = await Promise.all(
    rows.map(async (row) => {
      const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', row.id)
        .eq('is_deleted', false)

      if (error) {
        console.error('Error fetching comment count:', error)
        return {
          id: row.id,
          userId: row.user_id,
          title: row.title,
          description: row.description,
          createdAt: row.created_at,
          author: {
            id: row.user_id,
            nickname: '익명',
            imageUri: '',
          },
          imageUris: row.image_url
            ? [
                {
                  uri: row.image_url,
                },
              ]
            : [],
          commentCount: 0,
        }
      }

      return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        description: row.description,
        createdAt: row.created_at,
        author: {
          id: row.user_id,
          nickname: '익명',
          imageUri: '',
        },
        imageUris: row.image_url
          ? [
              {
                uri: row.image_url,
              },
            ]
          : [],
        commentCount: count ?? 0,
      }
    })
  )

  return postsWithCommentCount
}

type Mode = 'single' | 'infinite'

export function useFeedListQuery(options?: { mode?: 'single' }): UseQueryResult<FeedPost[], Error>
export function useFeedListQuery(options: {
  mode: 'infinite'
}): UseInfiniteQueryResult<FeedPost[], Error>

export function useFeedListQuery(options?: {
  mode?: Mode
}): UseQueryResult<FeedPost[], Error> | UseInfiniteQueryResult<FeedPost[], Error> {
  const mode: Mode = options?.mode ?? 'single'

  const singleQuery = useQuery<FeedPost[], Error>({
    queryKey: ['posts'],
    enabled: mode === 'single',
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      const rows = data as PostRow[]
      return await mapRowsToFeedPosts(rows)
    },
  })
  /* 무한스크롤 */
  const infiniteQuery = useInfiniteQuery<FeedPost[], Error, FeedPost[], ['posts'], number>({
    queryKey: ['posts'],
    enabled: mode === 'infinite',
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error
      const rows = data as PostRow[]
      return await mapRowsToFeedPosts(rows)
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  })
  return mode === 'single' ? singleQuery : infiniteQuery
}
