'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import type { Session } from '@supabase/auth-helpers-nextjs'
import { Button } from '@nextui-org/react'
import { GithubIcon } from '@/app/components/icons'

export default function AuthButtonClient ({
  session
}: {
  session: Session | null
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <header>
      {session === null
        ? (
        <button
          onClick={handleSignIn}
          type="button"
          className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2"
        >
          <GithubIcon />
          Sign in with Github
        </button>
          )
        : (
        <Button onClick={handleSignOut}>Sign out</Button>
          )}
    </header>
  )
}
