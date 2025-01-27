import ContactForm from '../../components/ContactForm'

export default function Contact() {
  return (
    <div className="mx-auto w-full px-4 pt-20 sm:pt-24 lg:min-h-screen lg:max-w-6xl lg:pt-0">
      <div className="flex items-start justify-center lg:h-screen lg:items-center">
        <ContactForm />
      </div>
    </div>
  )
}
