import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const PageTransition = ({ children }) => {
  const router = useRouter()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
