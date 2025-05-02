import { useState, useEffect } from 'react'

export const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        setScrollHeight(window.scrollY)
      }, 1500)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollHeight
}
