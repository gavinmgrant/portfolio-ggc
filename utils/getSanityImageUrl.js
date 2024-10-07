export const getSanityImageUrl = (imgRef) => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  let imageRef

  if (imgRef.includes('image-')) {
    imageRef = imgRef.replace('image-', '')
  }
  if (imageRef.includes('-jpg')) {
    imageRef = imageRef.replace('-jpg', '.jpg')
  }
  if (imageRef.includes('-png')) {
    imageRef = imageRef.replace('-png', '.png')
  }
  if (imageRef.includes('-webp')) {
    imageRef = imageRef.replace('-webp', '.webp')
  }
  if (imageRef.includes('-jpeg')) {
    imageRef = imageRef.replace('-jpeg', '.jpeg')
  }
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageRef}`;
};