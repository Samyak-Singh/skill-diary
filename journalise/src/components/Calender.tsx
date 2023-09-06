'use client'

import { DayCalendarSkeleton, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calender(props: { selectedDate: any; setSelectedDate: any; }) {

    const { selectedDate, setSelectedDate } = props;

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    renderLoading={() => <DayCalendarSkeleton />}
                    defaultValue={null}
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    views={['year', 'month', 'day']}
                />
            </LocalizationProvider>
        </>
    )
}
