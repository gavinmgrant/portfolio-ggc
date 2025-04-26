import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const PageTransition = ({ children }) => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Apply page-level animation only on first load
  if (!isClient) {
    return <div className="page-content">{children}</div>
  }

  // Use Framer Motion for subsequent navigation
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
