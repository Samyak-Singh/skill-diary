'use client'

import { DayCalendarSkeleton, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import React from 'react';

export default function Calender(props: { selectedDate: any; setSelectedDate: any; }) {

    const { selectedDate, setSelectedDate } = props;

    const [name, setName] = React.useState('');


    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DateCalendar
                    renderLoading={() => <DayCalendarSkeleton />}
                    defaultValue={null}
                    disableFuture
                    value={selectedDate}
                    onChange={(newValue) => {
                        console.log(newValue)
                        setSelectedDate(newValue)
                    }}
                    views={['year', 'month', 'day']}

                /> */}
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    timezone='system'
                    value={selectedDate}
                    onChange={(newValue) => {
                        console.log(newValue)
                        setSelectedDate(newValue)
                    }}
                    views={['year', 'month', 'day']}
                    slotProps={{
                        toolbar: {
                            toolbarPlaceholder: '- -',
                            hidden: false,
                        },
                        actionBar: {
                            actions: ['today', 'clear'],
                        },
                    }}

                />
            </LocalizationProvider> 
        </>
    )
}
