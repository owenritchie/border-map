import { useState } from 'react'

export default function Flag({ country, className }) {
  const [broken, setBroken] = useState(false)
  if (!country) return null
  if (broken || !country.code2) {
    return (
      <span className={className} aria-hidden="true">
        {country.flag}
      </span>
    )
  }
  return (
    <img
      className={className}
      src={`https://flagcdn.com/${country.code2}.svg`}
      alt=""
      loading="lazy"
      onError={() => setBroken(true)}
    />
  )
}
