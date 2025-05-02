import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { IconCalendarEvent } from '@tabler/icons-react'
import { useTheme } from 'next-themes'

export default function BookAMeetingButton() {
  const { theme } = useTheme()

  useEffect(() => {
    if (!theme) return
    const getCal = async () => {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', {
        theme,
        backgroundColor: 'transparent',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#171717' },
          dark: { 'cal-brand': '#ffffff' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }
    getCal()
  }, [theme])

  return (
    <button
      className="light-border rounded-lg border px-3 py-2.5 transition-all duration-300 ease-in-out hover:scale-105"
      data-cal-namespace="30min"
      data-cal-link="gavingrant/30min"
      data-cal-config='{"layout":"month_view"}'
    >
      <div className="flex items-center gap-2">
        <IconCalendarEvent className="shrink-0" />{' '}
        <span className="font-semibold">Book a meeting</span>
      </div>
    </button>
  )
}
