import { useState } from 'react'
import { Input, Button, Form } from '@heroui/react'
import { useTagManager } from '@/hooks/useTagManager'

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState({ success: null, message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { fireEvent } = useTagManager()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ success: null, message: '' })

    if (!email.trim()) {
      setStatus({ success: false, message: 'Please enter your email address.' })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: honeypot }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        fireEvent('newsletter_subscribe', { email: email.trim() })
        setEmail('')
        setStatus({
          success: true,
          message: 'You are subscribed. Thanks for reading!',
        })
      } else {
        setStatus({
          success: false,
          message: data.error || 'Something went wrong. Please try again.',
        })
      }
    } catch {
      setStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-2xl font-semibold sm:text-3xl">
        Build better, more resilient interfaces
      </h3>
      <p className="mb-3 text-sm">
        I share practical engineering deep-dives on React, Next.js, and performance optimization for complex web apps. Join me to sharpen your frontend craft and solve the architectural challenges that matter.
      </p>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          isRequired
          aria-label="Email address"
          radius="sm"
        />
        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          className="shrink-0 w-full sm:w-auto"
          radius="sm"
        >
          Subscribe
        </Button>
      </Form>
      {status.message ? (
        <p
          className={`mt-2 text-xs ${status.success
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
            }`}
          role="status"
        >
          {status.message}
        </p>
      ) : null}
    </div>
  )
}
