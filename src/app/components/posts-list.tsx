'use client'

import PostCard from '@/app/components/post-card'
import { type Post } from '@/app/types/posts'

export default function PostsList ({ posts }: { posts: Post[] | null }) {
  return (
    <>
      {posts?.map((post) => {
        const { id, content, user } = post
        const {
          name: userFullName,
          user_name: userName,
          avatar_url: avatarUrl
        } = user

        return (
          <PostCard
            avatarUrl={avatarUrl}
            content={content}
            key={id}
            userFullName={userFullName}
            userName={userName}
          />
        )
      })}
    </>
  )
}
