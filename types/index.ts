interface User {
  id: number
  nickname: string
  imageUri?: string
}

interface Profile extends User {
  email: string
  introduce?: string
  hatId: string
  handId: string
  skinId: string
  topId: string
  faceId: string
  bottomId: string
  background: string
}

interface ImageUri {
  id?: number
  uri: string
}

interface CreatePostDto {
  title: string
  description: string
  imageUris: ImageUri[]
}

interface CreateCommentDto {
  content: string
  postId: number
  parentCommentId?: number
}

interface Comment {
  id: number
  content: string
  createdAt: string
  user: User
  isDeleted: boolean
}

interface FeedPost {
  id: number
  userId: number
  title: string
  description: string
  createdAt: string
  author: User
  imageUris: ImageUri[]
}

export type { Comment, CreateCommentDto, CreatePostDto, FeedPost, ImageUri, Profile }
