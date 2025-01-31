'use client'

import { useState } from 'react'
import { Input, Textarea, Button, Form } from '@heroui/react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    honeypot: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({ success: null, message: '' })

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
    <div className="light-border w-[900px] rounded-xl border-[0.5px] px-4 pb-14 pt-4 sm:px-6 sm:pt-6 lg:mt-20">
      <h2 className="mb-4 text-3xl">Contact me</h2>
      <div className="mb-6 sm:mb-8 space-y-2">
        <p className="p-0 text-sm lg:text-base">
          Do you need a website or web app built? Do you need a front-end
          software engineer?
        </p>
        <p className="p-0 text-sm lg:text-base">Send me a message, so we can talk about it.</p>
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
        <div className="h-12 w-full flex items-center justify-center mt-4">
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
            className="absolute -bottom-10 flex w-full items-center justify-center"
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
