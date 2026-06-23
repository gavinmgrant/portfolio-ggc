import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@heroui/react'
import { IconCopy, IconCheck } from '@tabler/icons-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function CodeBlock({ code, language = 'javascript' }) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6">
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        aria-label={copied ? 'Copied' : 'Copy code'}
        onPress={handleCopy}
        className="absolute right-2 top-2 z-10 min-w-8"
      >
        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? materialDark : materialLight}
        customStyle={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          paddingTop: '2.5rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
