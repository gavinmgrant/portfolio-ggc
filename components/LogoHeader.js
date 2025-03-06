import React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'

const LogoHeader = () => {
  return (
    <Link href="/">
      <div className="hover-color flex items-center gap-3 sm:gap-4">
        <div className="h-[24px] sm:h-[32px]">
          <svg
            className="h-full w-full"
            width="389"
            height="443"
            viewBox="0 0 389 443"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M194.63 21.1482L205.13 2.96166C198.633 -0.789629 190.627 -0.789629 184.13 2.96166L194.63 21.1482ZM21.4249 121.148L10.9249 102.962C4.42747 106.713 0.424896 113.646 0.424896 121.148C0.424896 128.651 4.42747 135.583 10.9249 139.335L21.4249 121.148ZM194.63 221.148L184.13 239.335C190.627 243.086 198.633 243.086 205.13 239.335L194.63 221.148ZM281.233 171.148L291.733 189.335C298.23 185.583 302.233 178.651 302.233 171.148C302.233 163.646 298.23 156.713 291.733 152.962L281.233 171.148ZM194.305 96.7117C184.261 90.9127 171.417 94.354 165.618 104.398C159.819 114.442 163.261 127.286 173.305 133.085L194.305 96.7117ZM184.13 39.3347L357.335 139.335L378.335 102.962L205.13 2.96166L184.13 39.3347ZM10.9249 139.335L184.13 239.335L205.13 202.962L31.9249 102.962L10.9249 139.335ZM270.733 152.962L184.13 202.962L205.13 239.335L291.733 189.335L270.733 152.962ZM31.9249 139.335L205.13 39.3347L184.13 2.96166L10.9249 102.962L31.9249 139.335ZM291.733 152.962L194.305 96.7117L173.305 133.085L270.733 189.335L291.733 152.962Z"
              fill="currentColor"
            />
            <path
              d="M194.63 221.148L21.4249 121.148V321.148L194.63 421.148V321.148L97.2021 264.898"
              stroke="currentColor"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M367.835 121.148L194.63 221.148V421.148L367.835 321.148"
              stroke="currentColor"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="m-0 flex h-6 items-center gap-1.5 p-0 text-[18px] !font-medium sm:h-[32px] sm:text-[22px]">
          <span className="z-10 bg-white dark:bg-neutral-900">GAVIN GRANT</span>
          <motion.span
            className="hidden !font-thin md:block"
            initial={{ x: -160 }}
            animate={{ x: 0 }}
            exit={{ x: -150 }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 32,
              delay: 1,
            }}
          >
            CONSULTING
          </motion.span>
        </h2>
      </div>
    </Link>
  )
}

export default LogoHeader
