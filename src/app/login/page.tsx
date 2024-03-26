import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GitHubButton from '@/app/login/github-button'

export const dynamic = 'force-dynamic'

export default async function Login () {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session !== null) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-between bg-gray-900">
      <section className="flex-1 flex justify-center items-center">
        <GitHubButton />
      </section>
    </main>
  )
}
