import { useState } from 'react'
import { Input, Textarea, Button, Form } from '@heroui/react'
import { motion } from 'motion/react'
import { useTagManager } from '@/hooks/useTagManager'
import BookAMeetingButton from './BookAMeetingButton'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    honeypot: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({ success: null, message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const { fireEvent } = useTagManager()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ success: null, message: '' })

    const requiredFields = ['firstName', 'lastName', 'email', 'message']
    const isFormValid = requiredFields.every((field) => formData[field].trim())
    if (!isFormValid) {
      setStatus({
        success: false,
        message: 'Please fill in all of the fields above.',
      })
      setIsLoading(false)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="light-border w-full max-w-[900px] rounded-xl border-[0.5px] px-4 pb-4 pt-4 sm:px-6 sm:py-6 lg:mt-20">
      <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between lg:mb-4">
        <h2 className="heading-size-lg">Contact me</h2>
        <BookAMeetingButton />
      </div>

      <div className="mb-6 text-center md:text-left">
        <div className="space-y-2">
          <p className="p-0 text-sm lg:text-base">
            Need a skilled front-end engineer to enhance your team? I specialize
            in building fast, responsive, and user-friendly interfaces. Looking
            for a professional website or web app? I can design and develop a
            custom solution tailored to your needs.
          </p>
          <p className="p-0 text-sm lg:text-base">
            Send me a message below or check my availability to book a meeting.
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
              isLoading={isLoading}
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
