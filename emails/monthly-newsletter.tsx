import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { NewsletterPost } from '../types/newsletter'

export type MonthlyNewsletterEmailProps = {
  posts: NewsletterPost[]
  intro: string
  siteUrl: string
  monthLabel: string
}

function formatPublishDate(publishDate: string): string {
  const formattedDate = `${publishDate}T12:00:00Z`
  return new Date(formattedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function MonthlyNewsletterEmail({
  posts,
  intro,
  siteUrl,
  monthLabel,
}: MonthlyNewsletterEmailProps) {
  const previewText =
    posts.length === 1
      ? `New post: ${posts[0].title}`
      : `${posts.length} new posts from ${monthLabel}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Gavin Grant Consulting</Heading>
            <Text style={subheading}>Monthly blog digest — {monthLabel}</Text>
          </Section>

          <Text style={paragraph}>{intro}</Text>

          {posts.map((post) => (
            <Section key={post.slug} style={postSection}>
              {post.imageUrl ? (
                <Img
                  src={post.imageUrl}
                  alt={post.title}
                  width="560"
                  style={postImage}
                />
              ) : null}

              <Text style={postDate}>{formatPublishDate(post.publishDate)}</Text>

              {post.categories && post.categories.length > 0 ? (
                <Text style={categories}>
                  {post.categories.map((c) => c.title).join(' · ')}
                </Text>
              ) : null}

              <Heading as="h2" style={postTitle}>
                {post.title}
              </Heading>

              {post.description ? (
                <Text style={paragraph}>{post.description}</Text>
              ) : null}

              <Button href={post.url} style={button}>
                Read article
              </Button>
            </Section>
          ))}

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              <Link href={siteUrl} style={link}>
                gavingrant.com
              </Link>
            </Text>
            <Text style={footerText}>
              <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={link}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default MonthlyNewsletterEmail

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px 24px',
  maxWidth: '600px',
}

const header = {
  marginBottom: '24px',
}

const heading = {
  color: '#171717',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 8px',
}

const subheading = {
  color: '#525252',
  fontSize: '14px',
  margin: '0',
}

const paragraph = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 24px',
}

const postSection = {
  marginBottom: '32px',
}

const postImage = {
  borderRadius: '8px',
  marginBottom: '16px',
  maxWidth: '100%',
}

const postDate = {
  color: '#737373',
  fontSize: '13px',
  margin: '0 0 4px',
}

const categories = {
  color: '#525252',
  fontSize: '13px',
  fontWeight: '500',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

const postTitle = {
  color: '#171717',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 12px',
}

const button = {
  backgroundColor: '#171717',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 20px',
  textDecoration: 'none',
}

const hr = {
  borderColor: '#e5e5e5',
  margin: '32px 0',
}

const footer = {
  textAlign: 'center' as const,
}

const footerText = {
  color: '#737373',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '0 0 8px',
}

const link = {
  color: '#525252',
  textDecoration: 'underline',
}
