import JournalInput from '@/components/JournalInput'
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function NewEntry() {


    const session = useSession();
    const userId = session.data?.user?.id;

    const queryParams = useSearchParams()
    const diaryId = queryParams.get('diary')
    const selectedDate = queryParams.get('date')

    if (!dayjs().isSame(selectedDate, 'day')) {
        // fetch entries for selected date and diary

    }


    return (
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
            <JournalInput userId={userId} />

        </div>
    )
}
