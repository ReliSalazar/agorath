import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PostsList from '@/app/components/posts-list'
import { type Database } from '@/app/types/database'
import { type Post } from '@/app/types/posts'
import { ComposePost } from '@/app/components/compose-post'
import AuthButtonServer from '@/app/components/auth-button-server'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } =
    (await supabase
      .from('posts')
      .select('*, user:users(name, user_name, avatar_url)')
      .order('created_at', { ascending: false })) ?? []

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-between bg-gray-900">
      <section className="w-full max-w-xl mx-auto border-l border-r border-gray-800 min-h-screen">
        <header className="flex items-center justify-between px-3 py-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Home</h1>
          <AuthButtonServer />
        </header>

        <ComposePost avatarUrl={session.user?.user_metadata.avatar_url} />
        <PostsList posts={posts as Post[]} />
      </section>
    </main>
  )
}
