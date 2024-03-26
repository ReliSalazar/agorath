'use client'

import { Avatar } from '@nextui-org/react'
import { ComposePostButton } from '@/app/components/compose-post-button'
import { useRef } from 'react'
import { addPost } from '@/app/actions/add-post-action'

export function ComposePost ({ avatarUrl }: { avatarUrl: string }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addPost(formData)
        formRef.current?.reset()
      }}
      className="flex flex-row gap-x-3 p-3 border-b border-gray-800"
    >
      <Avatar radius="full" size="md" src={avatarUrl} />
      <div className="flex flex-1 flex-col gap-y-4">
        <textarea
          name="content"
          rows={4}
          className="w-full text-xl bg-gray-900 placeholder-gray-500 p-2"
          placeholder="What's on your mind?"
        ></textarea>
        <ComposePostButton />
      </div>
    </form>
  )
}
