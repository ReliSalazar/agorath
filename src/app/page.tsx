import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from '@/app/components/auth-button-server'
import PostsList from '@/app/components/posts-list'
import { type Database } from '@/app/types/database'
import { type Post } from '@/app/types/posts'
import { ComposePost } from './components/compose-post'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        <ComposePost avatarUrl={session.user?.user_metadata.avatar_url} />
        <PostsList posts={posts as Post[]} />
      </section>
      <AuthButtonServer />
    </main>
  )
}
