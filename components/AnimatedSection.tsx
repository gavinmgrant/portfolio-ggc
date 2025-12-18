import React from 'react'
import { motion } from 'motion/react'

type AnimatedSectionProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function AnimatedSection({
  children,
  delay = 0.5,
  className,
}: AnimatedSectionProps): React.ReactNode {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
