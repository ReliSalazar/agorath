'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GithubIcon } from './icons'

export function AuthButton () {
  const supabase = createClientComponentClient()

  const handlesignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handlesignout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header>
      <button
        onClick={handlesignin}
        type="button"
        className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2"
      >
        <GithubIcon />
        Sign in with Github
      </button>
      <button onClick={handlesignout}>Sign out</button>
    </header>
  )
}
