import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const PageTransition = ({ children }) => {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Ensure the page is ready before starting the animation
    const handleReady = () => setIsReady(true)
    handleReady()
  }, [])

  if (!isReady) return null // Prevent rendering until ready

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        style={{ willChange: 'opacity, transform' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
