import Link from 'next/link'

interface AnimesProps {
  url: string
  image: string
  title?: string
}

export function Animes({ image, url, title }: AnimesProps) {
  return (
    <li>
      <Link href={url}>
        <a>
          <img src={image} alt="anime banner" />
          {title && <span>{title}</span>}
        </a>
      </Link>
    </li>
  )
}
