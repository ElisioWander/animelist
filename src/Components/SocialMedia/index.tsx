import { ReactNode } from 'react'

interface SocialMediaProps {
  url: string
  icon: ReactNode
}

export function SocialMedia({ icon, url }: SocialMediaProps) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {icon}
    </a>
  )
}
