export const getDisplayDate = (date: string) => {
  const formattedDate = `${date}T17:00:00Z`
  return new Date(formattedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
