'use client'

import { useState, useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Input, Textarea, Button, Form } from '@heroui/react'
import { motion } from 'motion/react'
import { IconCalendarEvent } from '@tabler/icons'
import { useTagManager } from '@/hooks/useTagManager'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    honeypot: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({ success: null, message: '' })

  const { fireEvent } = useTagManager()

  useEffect(() => {
    const getCal = async () => {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#171717' },
          dark: { 'cal-brand': '#ffffff' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }
    getCal()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ success: null, message: '' })

    const requiredFields = ['firstName', 'lastName', 'email', 'message']
    const isFormValid = requiredFields.every((field) => formData[field].trim())
    if (!isFormValid) {
      setStatus({
        success: false,
        message: 'Please fill in all of the fields above.',
      })
      return
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ firstName: '', lastName: '', email: '', message: '' })
        setStatus({
          success: true,
          message:
            'Thank you, your message has been sent! I will get back to you as soon as possible.',
        })
        fireEvent('contact_form_submission', {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
        })
      } else {
        const errorData = await response.json()
        setStatus({
          success: false,
          message: errorData.message || 'Failed to send your message.',
        })
      }
    } catch (error) {
      setStatus({ success: false, message: 'An unexpected error occurred.' })
    }
  }

  return (
    <div className="light-border w-[900px] rounded-xl border-[0.5px] px-4 pb-4 pt-4 sm:px-6 sm:py-6 lg:mt-20">
      <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between lg:mb-4">
        <h2 className="heading-size">Contact me</h2>
        <button
          className="light-border rounded-lg border-2 px-3 py-2.5 transition-all duration-300 ease-in-out hover:scale-105"
          data-cal-namespace="30min"
          data-cal-link="gavingrant/30min"
          data-cal-config='{"layout":"month_view"}'
        >
          <div className="flex items-center gap-2">
            <IconCalendarEvent className="shrink-0" />{' '}
            <span className="font-semibold">Book a meeting</span>
          </div>
        </button>
      </div>

      <div className="mb-6">
        <div className="space-y-2">
          <p className="p-0 text-sm lg:text-base">
            Do you need a website or web app built? Do you need a front-end
            software engineer?
          </p>
          <p className="p-0 text-sm lg:text-base">
            Send me a message, so we can talk about it.
          </p>
        </div>
      </div>

      <Form className="relative space-y-3" onSubmit={handleSubmit}>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            className="hidden"
            label="Honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
          />

          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            isRequired
            fullWidth
            radius="sm"
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            isRequired
            fullWidth
            radius="sm"
          />
        </div>
        <Input
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isRequired
          fullWidth
          radius="sm"
        />
        <Textarea
          label="Message"
          name="message"
          value={formData.message}
          minRows={6}
          onChange={handleChange}
          isRequired
          fullWidth
          radius="sm"
        />
        <div className="mt-4 flex h-12 w-full items-center justify-center">
          <motion.div
            className="mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Button
              type="submit"
              className="w-full sm:w-auto"
              color="primary"
              radius="sm"
              size="lg"
            >
              Send Message
            </Button>
          </motion.div>
        </div>
        {status.success !== null && (
          <motion.div
            className="!mt-0 flex w-full items-center justify-center !pt-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p
              className={`text-sm ${
                status.success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status.message}
            </p>
          </motion.div>
        )}
      </Form>
    </div>
  )
}
