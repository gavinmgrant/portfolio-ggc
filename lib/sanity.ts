import { createClient } from 'next-sanity'
// import type { SanityClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = '2022-03-25'

export function getClient(previewToken?: string): any {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !previewToken,
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
    perspective: previewToken ? 'drafts' : 'published',
    stega: {
      enabled: previewToken ? true : false,
      studioUrl: '/studio',
    },
    token: previewToken,
  })
}
