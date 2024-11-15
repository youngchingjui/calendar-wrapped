import { auth } from '@/auth'
import { getCalendarData } from '@/lib/calendarApi'
import WrappedCardContent from '@/components/WrappedCardContent'
import { redirect } from 'next/navigation'


export default async function Page() {

    const session = await auth();
    
    if (!session) {
        redirect('/')
    }
    
    const calendarData = await getCalendarData(session.accessToken);

    if (!calendarData) {
        return <div>No calendar data found</div>
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <WrappedCardContent calendarData={calendarData.items} />
    </div>
  )
}