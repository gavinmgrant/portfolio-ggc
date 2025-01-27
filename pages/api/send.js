import { ContactEmailTemplate } from '../../components/ContactEmailTemplate'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = 'gavingrant.com'

export default async (req, res) => {
  if (req.body.honeypot) {
    return res.status(400).json({ message: 'Spam detected.' })
  }

  if (!req.headers.referer || !req.headers.referer.includes(domain)) {
    return res.status(400).json({ message: 'Invalid referer.' })
  }

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const message = req.body.message

  const { data, error } = await resend.emails.send({
    from: 'Gavin Grant Consulting <gavin@gavingrant.com>',
    to: ['gavingrant@gmail.com'],
    subject: 'New Gavin Grant Consulting Contact',
    react: ContactEmailTemplate({ firstName, lastName, email, message }),
  })

  if (error) {
    return res.status(400).json(error)
  }

  res.status(200).json(data)
}
